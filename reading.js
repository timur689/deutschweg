/* Чтение: тексты по уровням, перевод слова по нажатию, озвучка и вопросы. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc } = D;
  const TEXTS = window.DE_TEXTS || [];
  const aiTexts = () => (Array.isArray(D.getExt('aiTexts')) ? D.getExt('aiTexts') : []);
  const byId = (id) => TEXTS.find((t) => t.id === id) || aiTexts().find((t) => t.id === id);
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };

  /* Быстрый поиск слова в словаре курса: по существительному, словарной форме и мн. ч. */
  const INDEX = new Map();
  D.WORDS.forEach((w) => {
    const add = (k, v) => { if (k && !INDEX.has(k)) INDEX.set(k, v); };
    if (w.noun) add(w.noun.toLowerCase(), { w, note: '' });
    add(w.de.toLowerCase(), { w, note: '' });
    if (w.art && w.pl && w.pl !== '-' && w.pl !== 'Pl') add(w.pl.toLowerCase(), { w, note: ` (мн. ч.: die ${w.pl})` });
  });
  const glossOf = (t) => t.gl.map((s) => { const i = s.indexOf('='); return { de: s.slice(0, i), ru: s.slice(i + 1) }; });

  function lookup(text, token) {
    const t = token.toLowerCase();
    const gl = glossOf(text);
    const exact = gl.find((g) => g.de.toLowerCase() === t);
    if (exact) return { de: exact.de, ru: exact.ru, w: INDEX.get(t) ? INDEX.get(t).w : null };
    const part = gl.find((g) => g.de.toLowerCase().split(/[\s…]+/).includes(t));
    if (part) return { de: part.de, ru: part.ru, w: null };
    const hit = INDEX.get(t);
    if (hit) return { de: hit.w.de, ru: hit.w.ru + hit.note, w: hit.w };
    return { de: token, ru: null, w: null };
  }

  let rd = { id: null, picks: {}, pop: null };
  const scores = () => D.getExt('read') || {};

  /* ---------- новые тексты от ИИ ---------- */
  const AI_MAX = 12;
  const AI_LEN = { A1: '60–90', A2: '100–140', B1: '150–200' };
  const TOPIC_IDEAS = ['Wochenende', 'Einkaufen', 'Arbeit', 'Reisen', 'Familie', 'Gesundheit', 'Wohnen', 'Feste', 'Natur', 'Technik'];
  let gen = { level: null, topic: '', busy: false, err: '' };
  const genLevel = () => gen.level || (D.UNITS.find((u) => { const s = D.getState().units[u.id] || {}; return !(s.w && s.s); }) || { level: 'B1.2' }).level;

  function aiBlock() {
    if (D.STANDALONE) return '';
    const level = genLevel();
    const mine = aiTexts();
    return `<section class="panel stack ai-gen">
        <div class="step-head"><h2>Новый текст от ИИ</h2><span class="pill">${level}</span></div>
        <p class="small muted">ИИ напишет свежий текст на вашу тему: со словами уровня, вопросами и переводом по нажатию. Тексты сохраняются ниже.</p>
        <div class="levels lv-wide" role="group" aria-label="Уровень текста">${D.LEVELS.map((l) => `<button class="lv" data-act="rd-gen-level" data-id="${l.id}" aria-pressed="${l.id === level}">${l.id}</button>`).join('')}</div>
        <input id="genTopic" type="search" placeholder="Тема, например: поход к врачу, мой город, футбол" value="${esc(gen.topic)}" aria-label="Тема текста">
        <div class="seg2">${TOPIC_IDEAS.map((t) => `<button class="chip-t" data-act="rd-topic" data-id="${t}">${t}</button>`).join('')}</div>
        <div class="row"><button class="btn primary" data-act="rd-gen" ${gen.busy ? 'disabled' : ''}>${gen.busy ? 'Пишу текст…' : 'Создать текст'}</button>${gen.err ? `<span class="small muted">${esc(gen.err)}</span>` : ''}</div>
      </section>
      ${mine.length ? `<div class="lvl-head">Ваши тексты от ИИ <span>${mine.length} из ${AI_MAX}</span></div>
        <div class="rule-links">${mine.map((t) => listItem(t, true)).join('')}</div>` : ''}`;
  }

  function listItem(t, del) {
    const sc = scores()[t.id];
    const pill = sc === undefined ? '<span class="pill">не прочитано</span>' : `<span class="pill ${sc >= 0.6 ? 'ok' : ''}">${Math.round(sc * 100)}%</span>`;
    return `<div class="rule-link-wrap"><a class="rule-link" href="#read-${t.id}"><span>${del ? `<span class="eyebrow">${t.level}</span><br>` : ''}<b>${esc(t.t)}</b><br><span class="small muted">${t.text.split(/\s+/).length} слов · ${t.q.length} вопроса</span></span>${pill}</a>
      ${del ? `<button class="icon-btn" data-act="rd-del" data-id="${t.id}" aria-label="Удалить текст">✕</button>` : ''}</div>`;
  }

  function validText(r, level, topic) {
    if (!r || typeof r !== 'object' || typeof r.text !== 'string' || r.text.length < 80) return null;
    const gl = (Array.isArray(r.glossary) ? r.glossary : []).filter((g) => g && g.de && g.ru).slice(0, 20).map((g) => `${String(g.de).replace(/=/g, ' ')}=${String(g.ru)}`);
    const q = (Array.isArray(r.questions) ? r.questions : []).filter((x) => x && x.q && Array.isArray(x.options) && x.options.length >= 2 && Number.isInteger(x.answer) && x.answer >= 0 && x.answer < x.options.length)
      .slice(0, 5).map((x) => [String(x.q), x.options.slice(0, 4).map(String), x.answer]);
    if (!q.length) return null;
    return { id: `ai${Date.now().toString(36)}`, level, t: String(r.title || topic || 'Text').slice(0, 80), text: r.text.trim(), gl, q, ai: true };
  }

  async function generate() {
    const c = D.claude();
    const sample = c ? await c.use('sample') : null;
    if (!sample) { gen = { ...gen, err: 'Тексты от ИИ создаются в веб-версии Deutschweg внутри Claude.' }; rerender(); return; }
    const level = genLevel();
    const topicBox = document.getElementById('genTopic');
    const topic = (topicBox ? topicBox.value : gen.topic).trim() || TOPIC_IDEAS[Math.floor(Math.random() * TOPIC_IDEAS.length)];
    gen = { ...gen, topic, busy: true, err: '' };
    rerender();
    const prompt = `Напиши короткий текст для чтения на немецком языке для ученика уровня ${level} (родной язык ученика — русский).
Тема: ${topic}.
Требования: ${AI_LEN[level.slice(0, 2)]} слов; лексика и грамматика строго уровня ${level}; живой связный текст (история, письмо, статья или диалог); абзацы разделяй пустой строкой.
Верни только JSON:
{"title": "заголовок на немецком", "text": "текст", "glossary": [{"de": "слово или выражение из текста", "ru": "перевод"}], "questions": [{"q": "вопрос на немецком по содержанию", "options": ["вариант", "вариант", "вариант"], "answer": индекс верного варианта с 0}]}
В glossary — 8–12 самых трудных слов в той форме, как они стоят в тексте. Вопросов — 3 или 4.`;
    try {
      const r = await sample.json(prompt, { modelTier: 'default', cache: false });
      const t = validText(r, level, topic);
      if (!t) throw { code: 'invalid_json' };
      D.setExt('aiTexts', [t, ...aiTexts()].slice(0, AI_MAX));
      D.commit();
      gen = { ...gen, busy: false, topic: '' };
      location.hash = `read-${t.id}`;
    } catch (err) {
      const msg = { not_granted: 'Доступ к ИИ для этой страницы не разрешён.', rate_limited: 'Слишком много запросов. Попробуйте через минуту.' }[err && err.code] || 'Не получилось создать текст. Попробуйте ещё раз.';
      gen = { ...gen, busy: false, err: msg };
      rerender();
    }
  }


  function renderList() {
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Чтение</h1><p class="muted">Короткие тексты для каждого уровня. Нажмите на любое слово, чтобы увидеть перевод, и добавьте незнакомые слова в повторение.</p></div>
      ${aiBlock()}
      ${D.LEVELS.map((l) => {
        const list = TEXTS.filter((t) => t.level === l.id);
        if (!list.length) return '';
        return `<div class="lvl-head">${l.id} <span>${esc(l.title)}</span></div>
          <div class="rule-links">${list.map((t) => listItem(t, false)).join('')}</div>`;
      }).join('')}`;
  }

  function wordButtons(paragraph) {
    return paragraph.split(/([A-Za-zÄÖÜäöüß]+(?:-[A-Za-zÄÖÜäöüß]+)*)/).map((part, i) => (i % 2
      ? `<button class="tw" data-act="rd-word" data-w="${esc(part)}">${esc(part)}</button>`
      : esc(part).replace(/\n/g, '<br>'))).join('');
  }

  function renderText(id) {
    const t = byId(id);
    if (!t) return renderList();
    if (rd.id !== id) rd = { id, picks: {}, pop: null };
    const answered = Object.keys(rd.picks).length;
    const correct = t.q.filter((q, i) => rd.picks[i] === q[2]).length;
    const list = t.ai ? aiTexts() : TEXTS;
    const next = list[list.indexOf(t) + 1];
    const result = answered === t.q.length ? `<div class="fb ${correct / t.q.length >= 0.6 ? 'ok' : 'bad'}"><span class="verdict">Понимание: ${correct} из ${t.q.length}</span>
      <div class="row">${next ? `<a class="btn primary small" href="#read-${next.id}">Следующий текст</a>` : ''}<button class="btn small" data-act="rd-reset">Ответить заново</button></div></div>` : '';
    const pop = rd.pop ? `<div class="lookup" role="dialog" aria-label="Перевод слова">
        <div><span class="wd">${rd.pop.w ? D.wordHtml(rd.pop.w) : esc(rd.pop.de)}</span>
        <div class="small">${rd.pop.ru ? esc(rd.pop.ru) : '<span class="muted">Этого слова нет в словаре курса. Посмотрите «Слова к тексту» ниже.</span>'}</div>
        ${rd.pop.w ? `<div class="small muted">${D.wordExtra(rd.pop.w)}</div>` : ''}</div>
        <div class="row" style="gap:6px;flex-wrap:nowrap">${D.speakBtn(rd.pop.w ? rd.pop.w.de : rd.pop.de)}
          ${rd.pop.w ? (((D.getState().words[rd.pop.w.key] || {}).b > 0) ? '<span class="st l">учу</span>' : `<button class="btn primary small" data-act="rd-add" data-k="${esc(rd.pop.w.key)}">В повторение</button>`) : ''}
          <button class="icon-btn" data-act="rd-close" aria-label="Закрыть">✕</button></div></div>` : '';
    return `<a class="back" href="#reading">← Все тексты</a>
      <div class="page-head"><p class="eyebrow">${t.level} · Чтение</p><h1>${esc(t.t)}</h1></div>
      <section class="panel stack reader">
        <div class="row"><button class="btn primary small" data-act="rd-play">${PLAY} Прослушать</button><button class="btn small" data-act="rd-stop">Стоп</button><span class="small muted">Нажмите на слово — появится перевод</span></div>
        <div class="text">${t.text.split('\n\n').map((p) => `<p>${wordButtons(p)}</p>`).join('')}</div>
      </section>
      <section class="panel stack"><h3>Слова к тексту</h3>
        <div class="gloss">${glossOf(t).map((g) => `<div><b>${esc(g.de)}</b><span>${esc(g.ru)}</span></div>`).join('')}</div></section>
      <section class="panel stack"><h3>Вопросы к тексту</h3>
        <div class="quiz">${t.q.map((q, qi) => {
          const pick = rd.picks[qi];
          const done = pick !== undefined;
          return `<div class="qitem"><div class="qtext">${esc(q[0])}</div><div class="opts">${q[1].map((o, oi) => {
            let cls = '';
            if (done && oi === q[2]) cls = 'right'; else if (done && oi === pick) cls = 'wrong';
            return `<button class="opt ${cls}" data-act="rd-q" data-q="${qi}" data-o="${oi}" ${done ? 'disabled' : ''}>${esc(o)}</button>`;
          }).join('')}</div></div>`;
        }).join('')}</div>${result}</section>
      ${pop}`;
  }

  function answer(qi, oi) {
    const t = byId(rd.id);
    if (!t || rd.picks[qi] !== undefined) return;
    rd = { ...rd, picks: { ...rd.picks, [qi]: oi } };
    D.countResult(oi === t.q[qi][2]);
    if (Object.keys(rd.picks).length === t.q.length) {
      const sc = t.q.filter((q, i) => rd.picks[i] === q[2]).length / t.q.length;
      D.setExt('read', { ...scores(), [t.id]: Math.max(scores()[t.id] || 0, sc) });
    }
    D.commit();
    rerender();
  }

  D.register({
    views: { reading: renderList, read: (id) => renderText(id) },
    prefixes: [['read-', 'read']],
    nav: { reading: 'practice', read: 'practice' },
    hooks: { input: (ev) => { if (ev.target.id === 'genTopic') gen = { ...gen, topic: ev.target.value }; } },
    actions: {
      'rd-word': (el) => { const t = byId(rd.id); if (t) { rd = { ...rd, pop: lookup(t, el.dataset.w) }; rerender(); } },
      'rd-close': () => { rd = { ...rd, pop: null }; rerender(); },
      'rd-add': (el) => { D.addToReview(el.dataset.k); rerender(); },
      'rd-play': () => { const t = byId(rd.id); if (t) D.speak(t.text.replace(/\n+/g, ' '), { rate: 0.9 }); },
      'rd-stop': () => { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* нет озвучки */ } D.speak(' '); },
      'rd-q': (el) => answer(Number(el.dataset.q), Number(el.dataset.o)),
      'rd-reset': () => { rd = { ...rd, picks: {} }; rerender(); },
      'rd-gen-level': (el) => { gen = { ...gen, level: el.dataset.id }; rerender(); },
      'rd-topic': (el) => { gen = { ...gen, topic: el.dataset.id }; rerender(); },
      'rd-gen': () => generate(),
      'rd-del': (el) => { D.setExt('aiTexts', aiTexts().filter((t) => t.id !== el.dataset.id)); D.commit(); rerender(); },
    },
  });
})();
