/* «Самое нужное»: маленькие разделы с очевидными словами на каждый день
   (верх — низ, лево — право, время, цвета…). Подсказка, слова с озвучкой, примеры и мини-тест.
   Данные — basics-data.js. */
(() => {
  'use strict';
  const D = window.DW;
  const TOPICS = Array.isArray(window.DE_BASICS) ? window.DE_BASICS : [];
  if (!D || !TOPICS.length) return;
  const { esc, shuffle } = D;
  const BY = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  const EXT_KEY = 'bs';
  const QUIZ_SIZE = 6;
  const OPTIONS = 4;
  const SAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };

  /* ---------- сохранённые результаты ---------- */
  const saved = () => D.getExt(EXT_KEY) || {};
  const savedBest = (id) => (saved().best || {})[id];
  function saveBest(id, score) {
    const best = { ...(saved().best || {}) };
    best[id] = Math.max(best[id] || 0, score);
    D.setExt(EXT_KEY, { ...saved(), best });
    D.commit();
  }

  /* ---------- слова в повторение ---------- */
  const inReview = (de) => !!D.WORD[de] && ((D.getState().words[de] || {}).b > 0);
  function addToReview([de, ru]) {
    if (inReview(de)) return;
    if (D.WORD[de]) D.addToReview(de);
    else D.addCustomWord({ raw: `${de.replace(/\|/g, ' ')}||${ru.replace(/\|/g, ' ')}`, ex: '' });
  }

  /* ---------- мини-тест ---------- */
  let quiz = null; // { id, items: [{ ask, de, opts, right }], picks: [] }

  /** Для парных тем противоположность всегда среди вариантов — так тренируется именно разница. */
  function partnerOf(topic, idx) {
    if (!topic.pairs) return null;
    return topic.w[idx % 2 === 0 ? idx + 1 : idx - 1] || null;
  }

  function buildQuiz(id) {
    const topic = BY[id];
    const picked = shuffle(topic.w.map((w, idx) => ({ w, idx }))).slice(0, QUIZ_SIZE);
    const items = picked.map(({ w, idx }, k) => {
      const toDe = k % 2 === 0;
      const field = toDe ? 0 : 1;
      const partner = partnerOf(topic, idx);
      const others = shuffle(topic.w.filter((x) => x !== w && x !== partner));
      const wrong = [...(partner ? [partner] : []), ...others].slice(0, OPTIONS - 1).map((x) => x[field]);
      const opts = shuffle([w[field], ...wrong]);
      return { ask: toDe ? w[1] : w[0], de: !toDe, opts, right: opts.indexOf(w[field]) };
    });
    return { id, items, picks: [] };
  }

  function pick(qi, oi) {
    if (!quiz || quiz.picks[qi] !== undefined) return;
    const it = quiz.items[qi];
    const picks = [...quiz.picks];
    picks[qi] = oi;
    D.countResult(oi === it.right);
    D.commit();
    quiz = { ...quiz, picks };
    const answered = picks.filter((p) => p !== undefined).length;
    if (answered === quiz.items.length) saveBest(quiz.id, quiz.items.filter((x, i) => picks[i] === x.right).length);
  }

  /* ---------- отрисовка ---------- */
  const say = (de) => `<button class="bs-say" data-act="speak" data-text="${esc(de)}" lang="de" title="Послушать">${esc(de)}${SAY}</button>`;

  function pairsBlock(topic) {
    const rows = [];
    for (let i = 0; i < topic.w.length; i += 2) {
      const [a, b] = [topic.w[i], topic.w[i + 1]];
      rows.push(`<div class="bs-pair"><div class="bs-cell">${say(a[0])}<span class="small muted">${esc(a[1])}</span></div>
        <span class="bs-vs" aria-hidden="true">↔</span>
        <div class="bs-cell">${b ? `${say(b[0])}<span class="small muted">${esc(b[1])}</span>` : ''}</div></div>`);
    }
    return `<section class="bs-pairs">${rows.join('')}</section>`;
  }

  const listBlock = (topic) => `<section class="panel dict">${topic.w.map(([de, ru]) => `<div class="drow"><div class="wd" lang="de">${esc(de)}</div>
      <div class="ru small">${esc(ru)}</div><div class="acts">${D.speakBtn(de)}</div></div>`).join('')}</section>`;

  function examplesBlock(topic) {
    if (!topic.ex || !topic.ex.length) return '';
    return `<section class="stack" style="gap:10px"><h2>Примеры</h2><section class="panel dict">${topic.ex.map(([de, ru]) => `<div class="drow phrase"><div class="wd" lang="de">${esc(de)}</div>
      <div class="ru small">${esc(ru)}</div><div class="acts">${D.speakBtn(de)}</div></div>`).join('')}</section></section>`;
  }

  function quizItem(it, qi) {
    const p = quiz.picks[qi];
    const done = p !== undefined;
    return `<div class="qitem"><div class="qtext"${it.de ? ' lang="de"' : ''}>${esc(it.ask)}</div><div class="opts">
      ${it.opts.map((o, oi) => {
        const cls = done && oi === it.right ? 'right' : done && oi === p ? 'wrong' : '';
        return `<button class="opt ${cls}" data-act="bs-pick" data-q="${qi}" data-o="${oi}"${it.de ? '' : ' lang="de"'} ${done ? 'disabled' : ''}>${esc(o)}</button>`;
      }).join('')}</div></div>`;
  }

  function quizBlock(topic) {
    const head = '<div class="sec-head"><h2>Проверьте себя</h2></div>';
    if (!quiz || quiz.id !== topic.id) {
      const best = savedBest(topic.id);
      return `${head}<section class="panel stack" style="gap:10px"><span class="small muted">${QUIZ_SIZE} коротких вопросов: перевод в обе стороны.${best !== undefined ? ` Лучший результат: ${best} из ${QUIZ_SIZE}.` : ''}</span>
        <div><button class="btn primary" data-act="bs-quiz" data-id="${topic.id}">Начать тест</button></div></section>`;
    }
    const answered = quiz.picks.filter((p) => p !== undefined).length;
    const score = quiz.items.filter((x, i) => quiz.picks[i] === x.right).length;
    const result = answered === quiz.items.length
      ? `<div class="fb ${score === quiz.items.length ? 'ok' : 'bad'}" role="status"><span class="verdict">${score} из ${quiz.items.length}</span>
          <span class="small">${score === quiz.items.length ? 'Всё верно!' : 'Повторите слова выше и попробуйте ещё раз.'}</span>
          <div><button class="btn small" data-act="bs-quiz" data-id="${topic.id}">Ещё раз</button></div></div>` : '';
    return `${head}<section class="quiz">${quiz.items.map(quizItem).join('')}</section>${result}`;
  }

  function renderTopic(id) {
    const topic = BY[id];
    if (!topic) return renderList();
    const next = TOPICS[TOPICS.indexOf(topic) + 1];
    const missing = topic.w.filter(([de]) => !inReview(de)).length;
    return `<a class="back" href="#basics">← Самое нужное</a>
      <div class="page-head"><p class="eyebrow" lang="de">${esc(topic.de)}</p><h1>${esc(topic.t)}</h1></div>
      ${topic.tip ? `<section class="panel bs-tip"><span class="eyebrow">Главное</span><p>${topic.tip}</p></section>` : ''}
      ${topic.pairs ? pairsBlock(topic) : listBlock(topic)}
      <div class="row">${missing ? `<button class="btn small" data-act="bs-all" data-id="${topic.id}">Добавить слова в повторение</button>` : '<span class="pill ok">Все слова в повторении</span>'}</div>
      ${examplesBlock(topic)}
      ${quizBlock(topic)}
      ${next ? `<div class="row"><a class="btn" href="#bs-${next.id}">Дальше: ${esc(next.t)}</a></div>` : ''}`;
  }

  function renderList() {
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Самое нужное</h1><p class="muted">Маленькие разделы с очевидными словами, которые нужны каждый день: верх и низ, лево и право, время, частота, цвета. В каждом — главное правило, слова с озвучкой, примеры и короткий тест.</p></div>
      <section class="packs">${TOPICS.map((t) => {
        const best = savedBest(t.id);
        return `<a class="pane pack" href="#bs-${t.id}"><span class="hub-dot" style="background:var(--${t.c})"></span>
          <span class="pane-big">${esc(t.t)}</span><span class="count"><span lang="de">${esc(t.de)}</span> · ${t.w.length} слов${best !== undefined ? ` · тест ${best}/${QUIZ_SIZE}` : ''}</span></a>`;
      }).join('')}</section>`;
  }

  D.register({
    views: { basics: renderList, bs: (id) => renderTopic(id || '') },
    prefixes: [['bs-', 'bs']],
    nav: { basics: 'practice', bs: 'practice' },
    actions: {
      'bs-quiz': (el) => { if (BY[el.dataset.id]) { quiz = buildQuiz(el.dataset.id); rerender(); } },
      'bs-pick': (el) => { pick(Number(el.dataset.q), Number(el.dataset.o)); rerender(); },
      'bs-all': (el) => { const t = BY[el.dataset.id]; if (t) { t.w.forEach(addToReview); D.commit(); rerender(); } },
    },
  });

  /* Тест сбрасывается, когда уходите с темы. */
  window.addEventListener('hashchange', () => { if (quiz && location.hash !== `#bs-${quiz.id}`) quiz = null; });
})();
