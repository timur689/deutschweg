/* «Письма и e-mail»: как устроено письмо, фразы, тест по правилам, сборка письма по частям
   и задания «напишите сами» с проверкой без ИИ (letters-check.js). Данные — letters-data.js. */
(() => {
  'use strict';
  const D = window.DW;
  const L = window.DE_LETTERS;
  const CHECK = window.DE_letterCheck;
  if (!D || !L || !CHECK) return;
  const { esc, shuffle } = D;
  const TASKS = L.tasks;
  const TASK = Object.fromEntries(TASKS.map((t) => [t.id, t]));
  const EXT_KEY = 'lt';
  const QUIZ_SIZE = 10;
  const LEVELS = ['A1', 'A2', 'B1'];
  const UMLAUTS = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];
  const MARK = { ok: '✓', warn: '!', bad: '✗' };
  const REG = { f: 'на «Вы»', i: 'на «ты»' };
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };
  const lines = (s) => esc(s).replace(/\n/g, '<br>');

  /* ---------- сохранённое ---------- */
  const saved = () => D.getExt(EXT_KEY) || {};
  function save(patch) { D.setExt(EXT_KEY, { ...saved(), ...patch }); D.commit(); }
  const isDone = (id) => !!(saved().done || {})[id];
  const draftOf = (id) => (saved().drafts || {})[id] || '';
  const saveDraft = (id, text) => save({ drafts: { ...(saved().drafts || {}), [id]: text } });

  /* ---------- состояние страниц ---------- */
  let quiz = null;  // { items: [{ q, opts, right, why }], picks: [] }
  let ord = null;   // { i, pool: [индексы], placed: [индексы], checked }
  let wr = null;    // { id, text, res, hints, model }
  let phrReg = 'f';

  /* ================= список ================= */
  function renderHub() {
    const s = saved();
    const orderDone = Object.keys(s.order || {}).length;
    const card = (href, t, d, c) => `<a class="pane pack hub-card" href="${href}"><span class="hub-dot" style="background:var(--${c})"></span><span class="pane-big">${t}</span><span class="count">${d}</span></a>`;
    const tasks = LEVELS.map((lvl) => `<div class="sec-head"><h2>Напишите сами · ${lvl}</h2></div>
      <section class="packs">${TASKS.filter((t) => t.lvl === lvl).map((t) => `<a class="pane pack" href="#lt-w-${t.id}">
        <span class="hub-dot" style="background:var(--${t.reg === 'f' ? 'der' : 'die'})"></span>
        <span class="pane-big">${esc(t.t)}</span><span class="count">${t.exam ? 'экзамен · ' : ''}${REG[t.reg]} · ${t.points.length} пункта · ~${t.min} слов${isDone(t.id) ? ' · ✓ готово' : ''}</span></a>`).join('')}</section>`).join('');
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Письма и e-mail</h1><p class="muted">Как начать, о чём писать и как закончить письмо — другу и в официальное место. Сначала правила и готовые фразы, потом упражнения и свои письма с проверкой.</p></div>
      <section class="packs hub">
        ${card('#lt-rules', 'Как устроено письмо', 'Обращение, запятая, прощание, ты или Вы', 'das')}
        ${card('#lt-phrases', 'Фразы для писем', 'Начало, просьба, отказ, жалоба, конец', 'der')}
        ${card('#lt-quiz', 'Тест: правила письма', `${QUIZ_SIZE} вопросов${s.quiz !== undefined ? ` · лучший ${s.quiz}/${QUIZ_SIZE}` : ''}`, 'die')}
        ${card('#lt-order', 'Соберите письмо', `Расставьте части по порядку · ${orderDone} из ${L.order.length}`, 'das')}
      </section>${tasks}`;
  }

  /* ================= правила ================= */
  const roleLine = ([role, text]) => `<div class="lt-line"><span class="lt-role">${esc(L.roles[role] || role)}</span><span lang="de">${esc(text)}</span></div>`;
  function renderRules() {
    return `<a class="back" href="#letters">← Письма и e-mail</a>
      <div class="page-head"><h1>Как устроено письмо</h1><p class="muted">Восемь правил, которых хватает почти для любого письма.</p></div>
      ${L.rules.map((r, i) => `<section class="panel stack lt-rule" style="gap:6px"><h2>${i + 1}. ${esc(r.t)}</h2><p>${r.html}</p></section>`).join('')}
      <div class="sec-head"><h2>Два образца по частям</h2></div>
      ${L.samples.map((s) => `<section class="panel stack" style="gap:8px"><span class="eyebrow">${esc(s.t)}</span><div class="lt-sample">${s.parts.map(roleLine).join('')}</div></section>`).join('')}
      <div class="row"><a class="btn primary" href="#lt-quiz">Проверить себя</a><a class="btn" href="#lt-phrases">Фразы для писем</a></div>`;
  }

  /* ================= фразы ================= */
  function renderPhrases() {
    const tabs = [['f', 'Официально · Sie'], ['i', 'Другу · du']].map(([id, label]) => `<button class="lv" data-act="lt-reg" data-id="${id}" aria-pressed="${phrReg === id}">${label}</button>`).join('');
    return `<a class="back" href="#letters">← Письма и e-mail</a>
      <div class="page-head"><h1>Фразы для писем</h1><p class="muted">Готовые кирпичики: возьмите нужные и подставьте своё. Нажмите на значок, чтобы послушать.</p></div>
      <div class="levels lv-wide" role="group" aria-label="Тон письма">${tabs}</div>
      ${L.phrases.map((g) => `<section class="stack" style="gap:10px"><h2>${esc(g.t)}</h2><section class="panel dict">${(g[phrReg] || []).map(([de, ru]) => `<div class="drow phrase"><div class="wd" lang="de">${esc(de)}</div>
        <div class="ru small">${esc(ru)}</div><div class="acts">${D.speakBtn(de.replace(/…/g, ''))}</div></div>`).join('')}</section></section>`).join('')}`;
  }

  /* ================= тест ================= */
  function buildQuiz() {
    const items = shuffle(L.quiz).slice(0, QUIZ_SIZE).map((x) => {
      const opts = shuffle(x.o.map((o, i) => ({ o, ok: i === x.a })));
      return { q: x.q, opts: opts.map((p) => p.o), right: opts.findIndex((p) => p.ok), why: x.why };
    });
    return { items, picks: [] };
  }
  function pickQuiz(qi, oi) {
    if (!quiz || quiz.picks[qi] !== undefined || !quiz.items[qi]) return;
    const picks = [...quiz.picks];
    picks[qi] = oi;
    D.countResult(oi === quiz.items[qi].right);
    D.commit();
    quiz = { ...quiz, picks };
    if (picks.filter((p) => p !== undefined).length === quiz.items.length) {
      const score = quiz.items.filter((x, i) => picks[i] === x.right).length;
      save({ quiz: Math.max(saved().quiz || 0, score) });
    }
  }
  function quizItem(it, qi) {
    const p = quiz.picks[qi];
    const done = p !== undefined;
    return `<div class="qitem"><div class="qtext">${qi + 1}. ${esc(it.q)}</div><div class="opts lt-opts">
      ${it.opts.map((o, oi) => `<button class="opt ${done && oi === it.right ? 'right' : done && oi === p ? 'wrong' : ''}" data-act="lt-pick" data-q="${qi}" data-o="${oi}" lang="de" ${done ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>
      ${done ? `<span class="small ${p === it.right ? '' : 'muted'}">${p === it.right ? 'Верно. ' : ''}${esc(it.why)}</span>` : ''}</div>`;
  }
  function renderQuiz() {
    if (!quiz) quiz = buildQuiz();
    const answered = quiz.picks.filter((p) => p !== undefined).length;
    const score = quiz.items.filter((x, i) => quiz.picks[i] === x.right).length;
    const result = answered === quiz.items.length ? `<div class="fb ${score === quiz.items.length ? 'ok' : 'bad'}" role="status"><span class="verdict">${score} из ${quiz.items.length}</span>
        <span class="small">${score === quiz.items.length ? 'Всё верно!' : 'Перечитайте правила и попробуйте ещё раз — вопросы каждый раз другие.'}</span>
        <div class="row"><button class="btn small" data-act="lt-quiz">Ещё раз</button><a class="btn small ghost" href="#lt-rules">Правила</a></div></div>` : '';
    return `<a class="back" href="#letters">← Письма и e-mail</a>
      <div class="page-head"><h1>Тест: правила письма</h1><p class="muted">Обращение, запятые, прощание, «ты» или «Вы». После ответа — короткое объяснение.</p></div>
      <section class="quiz">${quiz.items.map(quizItem).join('')}</section>${result}`;
  }

  /* ================= соберите письмо ================= */
  function startOrder(i) {
    const n = L.order[i].parts.length;
    let pool = shuffle([...Array(n).keys()]);
    if (pool.every((x, k) => x === k)) pool = [...pool.slice(1), pool[0]];
    ord = { i, pool, placed: [], checked: false };
  }
  const orderRight = (letter, placed) => placed.length === letter.parts.length && placed.every((p, k) => letter.parts[p][0] === letter.parts[k][0]);
  function checkOrder() {
    const letter = L.order[ord.i];
    const ok = orderRight(letter, ord.placed);
    D.countResult(ok);
    D.commit();
    if (ok) save({ order: { ...(saved().order || {}), [ord.i]: true } });
    ord = { ...ord, checked: true };
  }
  function renderOrder() {
    if (!ord) startOrder(0);
    const letter = L.order[ord.i];
    const done = saved().order || {};
    const full = ord.placed.length === letter.parts.length;
    const ok = ord.checked && orderRight(letter, ord.placed);
    const tabs = L.order.map((o, i) => `<button class="lv" data-act="lt-ord" data-i="${i}" aria-pressed="${ord.i === i}">${i + 1}${done[i] ? ' ✓' : ''}<span>${o.lvl}</span></button>`).join('');
    const placed = ord.placed.map((p, k) => {
      const [role, text] = letter.parts[p];
      const state = ord.checked ? (role === letter.parts[k][0] ? 'right' : 'wrong') : '';
      return `<button class="lt-part placed ${state}" data-act="lt-unplace" data-k="${k}" ${ord.checked ? 'disabled' : ''} lang="de">
        ${ord.checked ? `<span class="lt-role">${esc(L.roles[role])}</span>` : ''}<span>${esc(text)}</span></button>`;
    }).join('');
    const pool = ord.pool.filter((p) => !ord.placed.includes(p)).map((p) => `<button class="lt-part" data-act="lt-place" data-p="${p}" lang="de">${esc(letter.parts[p][1])}</button>`).join('');
    const next = ord.i + 1 < L.order.length;
    const fb = ord.checked ? (ok
      ? `<div class="fb ok" role="status"><span class="verdict">Верно! Письмо собрано.</span><div class="row">${next ? '<button class="btn primary small" data-act="lt-ord-next">Следующее письмо</button>' : '<a class="btn primary small" href="#letters">Ко всем упражнениям</a>'}</div></div>`
      : `<div class="fb bad" role="status"><span class="verdict">Порядок не совсем верный</span><span class="small">Красным отмечены части не на своём месте. Подсказка: обращение → вступление → суть → просьба → завершение → прощание → имя (тема — в самом верху).</span>
          <div class="row"><button class="btn small" data-act="lt-ord-retry">Попробовать ещё раз</button><button class="btn small ghost" data-act="lt-ord-show">Показать правильно</button></div></div>`) : '';
    return `<a class="back" href="#letters">← Письма и e-mail</a>
      <div class="page-head"><h1>Соберите письмо</h1><p class="muted">Нажимайте на части в том порядке, в каком они стоят в письме. Ошиблись — нажмите на часть в письме, и она вернётся вниз.</p></div>
      <div class="levels lv-wide" role="group" aria-label="Письмо">${tabs}</div>
      <section class="panel stack" style="gap:10px"><span class="eyebrow">${ord.i + 1} из ${L.order.length} · ${esc(letter.t)}</span>
        <div class="lt-letter">${placed || '<span class="small muted">Здесь появится письмо…</span>'}</div></section>
      ${pool ? `<section class="lt-pool">${pool}</section>` : ''}
      ${full && !ord.checked ? '<div class="row"><button class="btn primary" data-act="lt-ord-check">Проверить</button></div>' : ''}
      ${fb}`;
  }

  /* ================= напишите сами ================= */
  const readText = () => { const el = document.getElementById('ltText'); return el ? el.value : (wr ? wr.text : ''); };
  const wordCount = (s) => s.split(/\s+/).filter((w) => /[A-Za-zÄÖÜäöüß0-9]/.test(w)).length;
  function openTask(id) { if (!wr || wr.id !== id) wr = { id, text: draftOf(id), res: null, hints: false, model: false }; }
  function syncText() { if (wr) wr = { ...wr, text: readText() }; }

  function checkTask() {
    syncText();
    const task = TASK[wr.id];
    const res = CHECK.checkLetter(wr.text, task);
    wr = { ...wr, res };
    saveDraft(task.id, wr.text);
    if (res.empty) return;
    const good = res.points.every(Boolean) && !res.checks.some((c) => c.lv === 'bad');
    D.countResult(good);
    if (good) save({ done: { ...(saved().done || {}), [task.id]: true } });
    else D.commit();
  }

  function hintsBlock(task) {
    return `<section class="panel stack lt-hints" style="gap:8px"><span class="eyebrow">Подсказки</span>
      <div class="lt-line"><span class="lt-role">Начало</span><span lang="de">${esc(CHECK.expectedAnrede(task))}</span></div>
      ${task.points.map((p) => `<div class="lt-line"><span class="lt-role">${esc(p.ru)}</span><span lang="de">${esc(p.tpl)}</span></div>`).join('')}
      <div class="lt-line"><span class="lt-role">Конец</span><span lang="de">${esc(CHECK.expectedGruss(task))}<br>${task.reg === 'f' ? 'Имя Фамилия' : 'Ваше имя'}</span></div>
      <a class="small" href="#lt-phrases">Все фразы для писем →</a></section>`;
  }

  function resultBlock(task) {
    const r = wr.res;
    if (!r) return '';
    if (r.empty) return '<div class="fb bad" role="status"><span class="verdict">Сначала напишите письмо.</span></div>';
    const pts = r.points.filter(Boolean).length;
    const bad = r.checks.some((c) => c.lv === 'bad');
    const good = pts === r.points.length && !bad;
    return `<div class="fb ${good ? 'ok' : 'bad'}" role="status"><span class="verdict">${good ? 'Хорошее письмо!' : 'Есть что поправить'} · пункты ${pts} из ${r.points.length}</span>
      <ul class="lt-checks">${task.points.map((p, i) => (r.points[i] ? '' : `<li class="bad"><b>✗</b><span>Не нашёл пункт: «${esc(p.ru)}». Например: <span lang="de">${esc(p.tpl)}</span></span></li>`)).join('')}
      ${r.checks.map((c) => `<li class="${c.lv}"><b>${MARK[c.lv]}</b><span>${esc(c.msg)}</span></li>`).join('')}</ul>
      <span class="small muted">Проверка смотрит на форму письма и ключевые слова. Грамматику целиком сверьте с образцом.</span></div>`;
  }

  function renderWrite(id) {
    const task = TASK[id];
    if (!task) return renderHub();
    openTask(id);
    const r = wr.res && !wr.res.empty ? wr.res : null;
    const next = TASKS[TASKS.indexOf(task) + 1];
    return `<a class="back" href="#letters">← Письма и e-mail</a>
      <div class="page-head"><p class="eyebrow">${task.exam ? `${esc(task.exam)} · ` : `${task.lvl} · `}${REG[task.reg]}${isDone(id) ? ' · ✓ готово' : ''}</p><h1>${esc(task.t)}</h1></div>
      <section class="panel stack" style="gap:8px"><p style="margin:0">${esc(task.s)}</p>
        <span class="eyebrow">В письме нужно</span>
        <ol class="lt-points">${task.points.map((p, i) => `<li class="${r ? (r.points[i] ? 'ok' : 'bad') : ''}">${r ? `<b>${r.points[i] ? '✓' : '✗'}</b> ` : ''}${esc(p.ru)}</li>`).join('')}</ol>
        <span class="small muted">Около ${task.min} слов. Обращение, прощание и подпись — обязательно.</span></section>
      <div class="row"><button class="btn small ghost" data-act="lt-hints" aria-expanded="${wr.hints}">${wr.hints ? 'Скрыть подсказки' : 'Подсказки'}</button></div>
      ${wr.hints ? hintsBlock(task) : ''}
      <textarea id="ltText" data-uml class="import lt-text" rows="11" lang="de" spellcheck="false" autocapitalize="sentences" placeholder="Напишите письмо по-немецки. Каждая часть — с новой строки." aria-label="Ваше письмо">${esc(wr.text)}</textarea>
      <div class="row" style="justify-content:space-between"><div class="umlauts">${UMLAUTS.map((c) => `<button type="button" data-act="pr-ins" data-c="${c}">${c}</button>`).join('')}</div>
        <span class="small muted" id="ltWords">${wordCount(wr.text)} слов</span></div>
      <div class="row"><button class="btn primary" data-act="lt-check">Проверить</button><button class="btn" data-act="lt-model">${wr.model ? 'Скрыть образец' : 'Показать образец'}</button></div>
      ${resultBlock(task)}
      ${wr.model ? `<section class="stack" style="gap:8px"><h2>Образец</h2><div class="exam-text" lang="de">${lines(task.model)}</div>
        <span class="small muted">Ваше письмо не обязано совпадать с образцом — главное, все пункты, верное обращение и прощание.</span></section>` : ''}
      ${next ? `<div class="row"><a class="btn" href="#lt-w-${next.id}">Дальше: ${esc(next.t)}</a></div>` : ''}`;
  }

  /* ================= маршрутизация ================= */
  function renderLt(id) {
    if (id === 'rules') return renderRules();
    if (id === 'phrases') return renderPhrases();
    if (id === 'quiz') return renderQuiz();
    if (id === 'order') return renderOrder();
    if (id.startsWith('w-')) return renderWrite(id.slice(2));
    return renderHub();
  }

  D.register({
    views: { letters: renderHub, lt: (id) => renderLt(id || '') },
    prefixes: [['lt-', 'lt']],
    nav: { letters: 'practice', lt: 'practice' },
    actions: {
      'lt-reg': (el) => { phrReg = el.dataset.id === 'i' ? 'i' : 'f'; rerender(); },
      'lt-quiz': () => { quiz = buildQuiz(); D.render(); window.scrollTo(0, 0); },
      'lt-pick': (el) => { pickQuiz(Number(el.dataset.q), Number(el.dataset.o)); rerender(); },
      'lt-ord': (el) => { const i = Number(el.dataset.i); if (L.order[i]) { startOrder(i); rerender(); } },
      'lt-ord-next': () => { startOrder(Math.min(ord.i + 1, L.order.length - 1)); D.render(); window.scrollTo(0, 0); },
      'lt-place': (el) => { const p = Number(el.dataset.p); if (ord && !ord.checked && !ord.placed.includes(p)) { ord = { ...ord, placed: [...ord.placed, p] }; rerender(); } },
      'lt-unplace': (el) => { const k = Number(el.dataset.k); if (ord && !ord.checked) { ord = { ...ord, placed: ord.placed.filter((x, j) => j !== k) }; rerender(); } },
      'lt-ord-check': () => { if (ord) { checkOrder(); rerender(); } },
      'lt-ord-retry': () => { if (ord) { ord = { ...ord, placed: [], checked: false }; rerender(); } },
      'lt-ord-show': () => { if (ord) { ord = { ...ord, placed: L.order[ord.i].parts.map((x, k) => k), checked: true }; rerender(); } },
      'lt-hints': () => { syncText(); wr = { ...wr, hints: !wr.hints }; rerender(); },
      'lt-model': () => { syncText(); wr = { ...wr, model: !wr.model }; rerender(); },
      'lt-check': () => { if (wr) { checkTask(); rerender(); } },
    },
    hooks: {
      input: (ev) => {
        if (ev.target.id !== 'ltText' || !wr) return;
        wr = { ...wr, text: ev.target.value };
        const out = document.getElementById('ltWords');
        if (out) out.textContent = `${wordCount(ev.target.value)} слов`;
      },
      change: (ev) => { if (ev.target.id === 'ltText' && wr) saveDraft(wr.id, ev.target.value); },
    },
  });

  /* Тест и сборка начинаются заново, когда уходите со страницы. */
  window.addEventListener('hashchange', () => {
    if (location.hash !== '#lt-quiz') quiz = null;
    if (location.hash !== '#lt-order') ord = null;
  });
})();
