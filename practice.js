/* Практика: раздел-хаб, диктант, спряжение, падежи, статистика и перенос прогресса. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc, shuffle, plural } = D;
  const ROUND = 12;
  const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  const $ = (s) => document.querySelector(s);
  const why = (ctx) => (window.DW_whyBtn ? window.DW_whyBtn(ctx) : '<span></span>');
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };
  const fold = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  const clean = (s) => s.trim().replace(/\s+/g, ' ');
  const umlautKeys = () => `<div class="umlauts">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((c) => `<button type="button" data-act="pr-ins" data-c="${c}">${c}</button>`).join('')}</div>`;

  function insertInto(id, c) {
    const input = document.getElementById(id) || document.querySelector('[data-uml]');
    if (!input) return;
    const a = input.selectionStart ?? input.value.length;
    const b = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, a) + c + input.value.slice(b);
    input.focus();
    input.setSelectionRange(a + 1, a + 1);
  }

  /** Уровни, до которых дошёл ученик (по первому незаконченному уроку). */
  function reachedLevels() {
    const started = D.UNITS.filter((u) => { const s = D.getState().units[u.id] || {}; return s.w || s.s; });
    const last = started.length ? started[started.length - 1].level : D.LEVELS[0].id;
    const idx = D.LEVELS.findIndex((l) => l.id === last);
    return D.LEVELS.slice(0, idx + 1).map((l) => l.id);
  }
  const levelChips = (current, act, extra = []) => `<div class="levels lv-wide" role="group" aria-label="Уровень">
    ${[...extra, ...D.LEVELS.map((l) => [l.id, l.id])].map(([id, label]) => `<button class="lv" data-act="${act}" data-id="${id}" aria-pressed="${current === id}">${label}</button>`).join('')}</div>`;

  /* ================= Хаб ================= */
  const HUB = [
    ['Слова', [
      ['cards', 'Быстрые карточки', 'Знаю / не знаю — свайпами', 'der'],
      ['articles', 'der · die · das', 'Быстрые раунды на артикли', 'die'],
      ['mywords', 'Мои слова', 'Слова и фразы из вашей жизни', 'das'],
      ['translate', 'Переводчик', 'С артиклями, склонением и объяснениями', 'die'],
      ['phrases', 'Разговорник', 'Готовые фразы для 10 ситуаций', 'der'],
    ]],
    ['Грамматика', [
      ['conj', 'Спряжение', 'Präsens, Präteritum, Perfekt', 'die'],
      ['cases', 'Падежи', 'Артикли и окончания в Nom, Akk, Dat', 'das'],
      ['errors', 'Найди ошибку', 'Одна ошибка в каждом предложении', 'der'],
      ['mistakes', 'Мои ошибки', 'Повторить задания с ошибками', 'die'],
    ]],
    ['Слушать, читать, говорить', [
      ['dictation', 'Диктант', 'Слушаете фразу — пишете её', 'das'],
      ['reading', 'Чтение', D.STANDALONE ? 'Тексты по уровням с вопросами' : 'Тексты по уровням и тексты от ИИ', 'der'],
      ...(D.STANDALONE ? [] : [['tutor', 'Собеседник', 'Разговор на немецком с исправлениями', 'die']]),
    ]],
    ['Проверка и прогресс', [
      ['placement', 'Тест на уровень', 'С какого урока начинать', 'das'],
      ['exam', 'Пробный экзамен', 'Lesen, Hören, Schreiben как на Goethe', 'der'],
      ['stats', 'Статистика', 'Ваш прогресс и трудные слова', 'die'],
      ['achievements', 'Достижения', 'Серии, слова, уровни и экзамены', 'das'],
      ...(D.STANDALONE ? [['install', 'Установить и поделиться', 'Значок на телефон и QR-код для друзей', 'der']] : []),
    ]],
  ];
  function renderHub() {
    const mist = Object.keys(D.getExt('mist') || {}).length;
    const due = D.dueWords().length;
    const extra = { mistakes: mist ? ` · сейчас ${mist}` : '', cards: due ? ` · ${due} к повторению` : '' };
    return `<div class="page-head"><h1>Практика</h1><p class="muted">Тренажёры, тексты и экзамен. Каждый ответ идёт в дневную цель.</p></div>
      ${HUB.map(([title, items]) => `<div class="sec-head"><h2>${title}</h2></div>
        <section class="packs hub">${items.map(([id, t, d, c]) => `<a class="pane pack hub-card" href="#${id}">
          <span class="hub-dot" style="background:var(--${c})"></span><span class="pane-big">${t}</span><span class="count">${d}${extra[id] || ''}</span></a>`).join('')}</section>`).join('')}`;
  }

  /* ================= Диктант ================= */
  let dict = { level: null, mode: 'sent', items: [], i: 0, phase: 'idle', typed: '', ok: 0, last: null };

  function dictSource(level, mode) {
    if (mode === 'words') return D.WORDS.filter((w) => w.level === level).map((w) => ({ de: w.de, ru: w.ru }));
    return D.UNITS.filter((u) => u.level === level).flatMap((u) => u.s.map(([de, ru]) => ({ de, ru })));
  }
  function startDictation() {
    const level = dict.level || reachedLevels().slice(-1)[0];
    const items = shuffle(dictSource(level, dict.mode)).slice(0, 10);
    dict = { ...dict, level, items, i: 0, phase: 'ask', typed: '', ok: 0, last: null };
    rerender();
    D.speak(items[0].de);
  }
  const normDict = (s) => clean(s.replace(/[.,!?;:„“"«»]/g, ' ')).toLowerCase();
  function diffWords(user, right) {
    const u = normDict(user).split(' ');
    const r = clean(right.replace(/[.!?]$/, '')).split(' ');
    return r.map((w, i) => {
      const okw = (u[i] || '') === normDict(w) || fold(u[i] || '') === fold(normDict(w));
      return `<span class="${okw ? 'dw-ok' : 'dw-bad'}">${esc(w)}</span>`;
    }).join(' ');
  }
  function checkDictation() {
    const input = $('#dictInput');
    if (!input) return;
    const item = dict.items[dict.i];
    const typed = input.value;
    const exact = normDict(typed) === normDict(item.de);
    const near = !exact && fold(normDict(typed)) === fold(normDict(item.de));
    const ok = exact || near;
    D.countResult(ok);
    D.commit();
    dict = { ...dict, phase: 'fb', typed, ok: dict.ok + (ok ? 1 : 0), last: { ok, near } };
    rerender();
    const nb = $('#dictNext');
    if (nb) nb.focus();
  }
  function nextDictation() {
    if (dict.i + 1 >= dict.items.length) { dict = { ...dict, phase: 'done' }; rerender(); return; }
    dict = { ...dict, i: dict.i + 1, phase: 'ask', typed: '', last: null };
    rerender();
    D.speak(dict.items[dict.i].de);
  }
  function renderDictation() {
    const level = dict.level || reachedLevels().slice(-1)[0];
    if (dict.phase === 'idle' || dict.phase === 'done') {
      const done = dict.phase === 'done';
      return `<a class="back" href="#practice">← Практика</a>
        <div class="page-head"><h1>Диктант</h1><p class="muted">Приложение произносит фразу — вы записываете её по-немецки. Тренирует слух и правописание. Можно прослушать ещё раз или медленнее.</p></div>
        ${done ? `<section class="panel hero"><p class="eyebrow">Результат</p><div class="row" style="align-items:baseline"><span class="num done-score">${dict.ok}</span><span class="muted">из ${dict.items.length} без ошибок</span></div></section>` : ''}
        <section class="panel stack">
          <h3>Что диктовать</h3>
          <div class="seg2" role="group"><button class="chip-t" data-act="dict-mode" data-id="sent" aria-pressed="${dict.mode === 'sent'}">Предложения</button><button class="chip-t" data-act="dict-mode" data-id="words" aria-pressed="${dict.mode === 'words'}">Слова</button></div>
          ${levelChips(level, 'dict-level')}
          <div class="row"><button class="btn primary" data-act="dict-start">${done ? 'Ещё раз' : 'Начать диктант'} ${ARROW}</button><span class="small muted">10 заданий</span></div>
        </section>`;
    }
    const item = dict.items[dict.i];
    const pct = Math.round((dict.i / dict.items.length) * 100);
    const fb = dict.phase === 'fb' ? `<div class="fb ${dict.last.ok ? 'ok' : 'bad'}"><span class="verdict">${dict.last.ok ? 'Верно!' : 'Есть ошибки'}</span>
        ${dict.last.near ? '<span class="small">Засчитано. Пишите умлауты: ä, ö, ü, ß.</span>' : ''}
        <span class="answer">${dict.last.ok ? esc(item.de) : diffWords(dict.typed, item.de)}</span><span class="small muted">${esc(item.ru)}</span></div>
        <div class="s-actions">${dict.last.ok ? '<span></span>' : why({ level: dict.level, task: 'Диктант: записать по-немецки услышанную фразу', user: dict.typed, right: item.de })}<button class="btn primary" id="dictNext" data-act="dict-next">Дальше ↵</button></div>` : '';
    return `<div class="session"><div class="s-top"><a class="icon-btn" href="#practice" aria-label="Завершить">✕</a>
        <div class="track"><i style="width:${pct}%"></i></div><span class="s-count">${dict.i + 1} / ${dict.items.length}</span></div>
      <p class="eyebrow">Диктант · ${esc(dict.level)}</p>
      <div class="card">
        <div class="prompt"><span class="muted small">Прослушайте и запишите</span>
          <div class="row"><button class="btn primary" data-act="dict-play">${PLAY} Прослушать</button><button class="btn" data-act="dict-slow">Медленнее</button></div></div>
        <form class="stack" style="gap:10px" data-form="dict">
          <div class="type-row"><input id="dictInput" data-uml autocomplete="off" autocapitalize="off" spellcheck="false" lang="de" aria-label="Что вы услышали" value="${esc(dict.typed)}" ${dict.phase === 'fb' ? 'disabled' : ''}>
            ${dict.phase === 'ask' ? '<button class="btn primary" type="submit">Проверить</button>' : ''}</div>
          ${dict.phase === 'ask' ? umlautKeys() : ''}
        </form>${fb}
      </div></div>`;
  }

  /* ================= Спряжение ================= */
  const VERBS = (window.DE_VERBS || []).map((s) => {
    const [inf, pres, prat, perf, ru, level] = s.split('|');
    return { inf, pres: pres.split(','), prat, perf, ru, level };
  });
  const AUX = { hat: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], ist: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'] };
  function pratForms(v) {
    const [head, ...rest] = v.prat.split(' ');
    const tail = rest.length ? ` ${rest.join(' ')}` : '';
    const weak = head.endsWith('e');
    const longDu = /[dtsßz]$/.test(head);
    const du = weak ? `${head}st` : `${head}${longDu ? 'est' : 'st'}`;
    const wir = weak ? `${head}n` : `${head}en`;
    const ihr = weak ? `${head}t` : `${head}${/[dt]$/.test(head) ? 'et' : 't'}`;
    return [head, du, head, wir, ihr, wir].map((f) => f + tail);
  }
  function perfForms(v) {
    const [aux, ...part] = v.perf.split(' ');
    return AUX[aux].map((a) => `${a} ${part.join(' ')}`);
  }
  const TENSES = { pres: 'Präsens', prat: 'Präteritum', perf: 'Perfekt' };
  const formsOf = (v, t) => (t === 'pres' ? v.pres : t === 'prat' ? pratForms(v) : perfForms(v));

  let conj = { tense: 'pres', level: 'A1', items: [], i: 0, phase: 'idle', typed: '', ok: 0, last: null, open: null };
  function startConj() {
    const pool = VERBS.filter((v) => v.level <= conj.level || conj.level === 'all');
    const tenses = conj.tense === 'mix' ? ['pres', 'prat', 'perf'] : [conj.tense];
    const items = Array.from({ length: ROUND }, () => {
      const v = pool[Math.floor(Math.random() * pool.length)];
      const t = tenses[Math.floor(Math.random() * tenses.length)];
      const p = t === 'prat' ? [0, 2, 3, 5][Math.floor(Math.random() * 4)] : Math.floor(Math.random() * 6);
      return { v, t, p };
    });
    conj = { ...conj, items, i: 0, phase: 'ask', typed: '', ok: 0, last: null };
    rerender();
  }
  function checkConj() {
    const input = $('#conjInput');
    if (!input) return;
    const it = conj.items[conj.i];
    const right = formsOf(it.v, it.t)[it.p];
    const typed = clean(input.value);
    const exact = typed.toLowerCase() === right.toLowerCase();
    const near = !exact && fold(typed) === fold(right);
    D.countResult(exact || near);
    D.commit();
    conj = { ...conj, phase: 'fb', typed, ok: conj.ok + (exact || near ? 1 : 0), last: { ok: exact || near, near, right } };
    rerender();
    const nb = $('#conjNext');
    if (nb) nb.focus();
  }
  function nextConj() {
    if (conj.i + 1 >= conj.items.length) { conj = { ...conj, phase: 'done' }; rerender(); return; }
    conj = { ...conj, i: conj.i + 1, phase: 'ask', typed: '', last: null };
    rerender();
  }
  function verbTable(v) {
    const cols = ['pres', 'prat', 'perf'].map((t) => formsOf(v, t));
    return `<div class="tbl"><table><tr><th></th><th>Präsens</th><th>Präteritum</th><th>Perfekt</th></tr>
      ${PRONOUNS.map((p, i) => `<tr><td class="muted">${p}</td>${cols.map((c) => `<td>${esc(c[i])}</td>`).join('')}</tr>`).join('')}</table></div>`;
  }
  function renderConj() {
    if (conj.phase === 'ask' || conj.phase === 'fb') {
      const it = conj.items[conj.i];
      const pct = Math.round((conj.i / conj.items.length) * 100);
      const fb = conj.phase === 'fb' ? `<div class="fb ${conj.last.ok ? 'ok' : 'bad'}"><span class="verdict">${conj.last.ok ? 'Верно!' : 'Не совсем'}</span>
          ${conj.last.near ? '<span class="small">Засчитано. Пишите умлауты: ä, ö, ü, ß.</span>' : ''}
          <span class="answer">${esc(PRONOUNS[it.p])} ${esc(conj.last.right)}</span></div>
          <details class="small"><summary>Вся таблица «${esc(it.v.inf)}»</summary>${verbTable(it.v)}</details>
          <div class="s-actions">${conj.last.ok ? '<span></span>' : why({ task: `Спряжение глагола «${it.v.inf}» (${it.v.ru}): ${TENSES[it.t]}, лицо «${PRONOUNS[it.p]}»`, user: conj.typed, right: conj.last.right })}<button class="btn primary" id="conjNext" data-act="conj-next">Дальше ↵</button></div>` : '';
      return `<div class="session"><div class="s-top"><a class="icon-btn" href="#practice" aria-label="Завершить" data-act="conj-exit">✕</a>
          <div class="track"><i style="width:${pct}%"></i></div><span class="s-count">${conj.i + 1} / ${conj.items.length}</span></div>
        <p class="eyebrow">Спряжение · ${TENSES[it.t]}</p>
        <div class="card"><div class="prompt"><span class="muted small">${TENSES[it.t]} · ${esc(it.v.ru)}</span>
          <span class="huge"><span class="muted">${esc(PRONOUNS[it.p])}</span> ___</span><span class="ru-big">${esc(it.v.inf)}</span></div>
          <form class="stack" style="gap:10px" data-form="conj"><div class="type-row"><input id="conjInput" data-uml autocomplete="off" autocapitalize="off" spellcheck="false" lang="de" aria-label="Форма глагола" value="${esc(conj.typed)}" ${conj.phase === 'fb' ? 'disabled' : ''}>
            ${conj.phase === 'ask' ? '<button class="btn primary" type="submit">Проверить</button>' : ''}</div>${conj.phase === 'ask' ? umlautKeys() : ''}
            ${it.t === 'perf' && conj.phase === 'ask' ? '<span class="small muted">Напишите вспомогательный глагол и причастие: например, «hat gemacht».</span>' : ''}</form>
          ${fb}</div></div>`;
    }
    const done = conj.phase === 'done';
    const levelOpts = [['A1', 'A1'], ['A2', 'до A2'], ['B1', 'до B1']];
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Спряжение глаголов</h1><p class="muted">${VERBS.length} самых нужных глаголов. Пишете форму по лицу и времени, после ответа видна вся таблица.</p></div>
      ${done ? `<section class="panel hero"><p class="eyebrow">Результат</p><div class="row" style="align-items:baseline"><span class="num done-score">${conj.ok}</span><span class="muted">из ${conj.items.length} верно</span></div></section>` : ''}
      <section class="panel stack">
        <h3>Время</h3>
        <div class="seg2" role="group">${[['pres', 'Präsens'], ['prat', 'Präteritum'], ['perf', 'Perfekt'], ['mix', 'Всё вместе']].map(([id, l]) => `<button class="chip-t" data-act="conj-tense" data-id="${id}" aria-pressed="${conj.tense === id}">${l}</button>`).join('')}</div>
        <h3>Глаголы</h3>
        <div class="seg2" role="group">${levelOpts.map(([id, l]) => `<button class="chip-t" data-act="conj-level" data-id="${id}" aria-pressed="${conj.level === id}">${l}</button>`).join('')}</div>
        <div class="row"><button class="btn primary" data-act="conj-start">${done ? 'Ещё раунд' : 'Начать'} ${ARROW}</button><span class="small muted">${ROUND} заданий</span></div>
      </section>
      <div class="sec-head"><h2>Таблицы глаголов</h2></div>
      <section class="panel dict">${VERBS.map((v, i) => `<details class="verb" ${conj.open === i ? 'open' : ''}><summary><span class="wd">${esc(v.inf)}</span><span class="small muted">${esc(v.ru)} · ${v.level}</span></summary>${verbTable(v)}</details>`).join('')}</section>`;
  }

  /* ================= Падежи ================= */
  const DEF = { Nom: { der: 'der', die: 'die', das: 'das' }, Akk: { der: 'den', die: 'die', das: 'das' }, Dat: { der: 'dem', die: 'der', das: 'dem' } };
  const INDEF = { Nom: { der: '', die: 'e', das: '' }, Akk: { der: 'en', die: 'e', das: '' }, Dat: { der: 'em', die: 'er', das: 'em' } };
  const ADJ_WEAK = { Nom: { der: 'e', die: 'e', das: 'e' }, Akk: { der: 'en', die: 'e', das: 'e' }, Dat: { der: 'en', die: 'en', das: 'en' } };
  const ADJ_MIXED = { Nom: { der: 'er', die: 'e', das: 'es' }, Akk: { der: 'en', die: 'e', das: 'es' }, Dat: { der: 'en', die: 'en', das: 'en' } };
  const ADJS = [['neu', 'новый'], ['alt', 'старый'], ['groß', 'большой'], ['klein', 'маленький'], ['schön', 'красивый']];
  const DETS = { def: 'der/die/das', ein: 'ein/eine', kein: 'kein/keine', mein: 'mein/meine' };
  const CASE_RU = { Nom: 'Nominativ (кто? что?)', Akk: 'Akkusativ (кого? что?)', Dat: 'Dativ (кому? чему?)' };
  const TEMPLATES = {
    Nom: ['Hier ist ___ {N}.', 'Wo ist ___ {N}?', 'Das ist ___ {N}.'],
    Akk: ['Ich sehe ___ {N}.', 'Wir brauchen ___ {N}.', 'Hast du ___ {N}?'],
    Dat: ['Ich komme mit ___ {N}.', 'Das liegt neben ___ {N}.', 'Wir warten hinter ___ {N}.'],
  };
  const N_DECL = /(e|ent|ant|ist|at|ot|oge)$/;
  const N_DECL_WORDS = new Set(['Mensch', 'Herr', 'Nachbar', 'Name', 'Bär', 'Bauer', 'Kunde']);
  function caseNouns() {
    return D.WORDS.filter((w) => w.art && !/\s/.test(w.noun) && w.pl !== 'Pl'
      && !/(Erwachsene|Bekannte|Verwandte|Vorgesetzte|Deutsche|Jugendliche)$/.test(w.noun)
      && !(w.art === 'der' && (N_DECL.test(w.noun) || N_DECL_WORDS.has(w.noun))));
  }
  function detForm(det, cas, g) {
    if (det === 'def') return DEF[cas][g];
    return det + INDEF[cas][g];
  }
  function phrase(det, cas, g, adj) {
    const d = detForm(det, cas, g);
    if (!adj) return d;
    const end = (det === 'def' ? ADJ_WEAK : ADJ_MIXED)[cas][g];
    return `${d} ${adj}${end}`;
  }
  let cases = { cas: 'mix', det: 'mix', adj: false, items: [], i: 0, phase: 'idle', ok: 0, pick: null };
  function makeCaseItem(pool) {
    const w = pool[Math.floor(Math.random() * pool.length)];
    const cas = cases.cas === 'mix' ? ['Nom', 'Akk', 'Dat'][Math.floor(Math.random() * 3)] : cases.cas;
    const uncountable = w.pl === '-';
    const detPool = cases.det === 'mix' ? (uncountable ? ['def', 'kein', 'mein'] : ['def', 'ein', 'kein', 'mein']) : [uncountable && cases.det === 'ein' ? 'def' : cases.det];
    const det = detPool[Math.floor(Math.random() * detPool.length)];
    const adj = cases.adj ? ADJS[Math.floor(Math.random() * ADJS.length)] : null;
    const right = phrase(det, cas, w.art, adj && adj[0]);
    const opts = new Set([right]);
    ['Nom', 'Akk', 'Dat'].forEach((c) => ['der', 'die', 'das'].forEach((g) => opts.add(phrase(det, c, g, adj && adj[0]))));
    const options = shuffle([right, ...shuffle([...opts].filter((o) => o !== right)).slice(0, 3)]);
    const tpl = TEMPLATES[cas][Math.floor(Math.random() * TEMPLATES[cas].length)];
    return { w, cas, det, adj, right, options, text: tpl.replace('{N}', w.noun) };
  }
  function startCases() {
    const pool = caseNouns().filter((w) => reachedLevels().includes(w.level));
    const src = pool.length >= 10 ? pool : caseNouns();
    cases = { ...cases, items: Array.from({ length: ROUND }, () => makeCaseItem(src)), i: 0, phase: 'ask', ok: 0, pick: null };
    rerender();
  }
  function pickCase(val) {
    if (cases.phase !== 'ask') return;
    const it = cases.items[cases.i];
    const ok = val === it.right;
    D.countResult(ok);
    D.commit();
    cases = { ...cases, phase: 'fb', pick: val, ok: cases.ok + (ok ? 1 : 0) };
    rerender();
    const nb = $('#caseNext');
    if (nb) nb.focus();
  }
  function nextCase() {
    if (cases.i + 1 >= cases.items.length) { cases = { ...cases, phase: 'done' }; rerender(); return; }
    cases = { ...cases, i: cases.i + 1, phase: 'ask', pick: null };
    rerender();
  }
  function renderCases() {
    if (cases.phase === 'ask' || cases.phase === 'fb') {
      const it = cases.items[cases.i];
      const pct = Math.round((cases.i / cases.items.length) * 100);
      const asking = cases.phase === 'ask';
      const sentence = esc(it.text).replace('___', `<span class="blank">${asking ? '?' : esc(it.right)}</span>`);
      const fb = asking ? '' : `<div class="fb ${cases.pick === it.right ? 'ok' : 'bad'}"><span class="verdict">${cases.pick === it.right ? 'Верно!' : 'Не совсем'}</span>
          <span class="small">${CASE_RU[it.cas]}, ${it.w.art === 'der' ? 'мужской' : it.w.art === 'die' ? 'женский' : 'средний'} род: ${D.wordHtml(it.w)}${it.adj ? ` + прилагательное «${it.adj[0]}»` : ''} → <b>${esc(it.right)}</b></span></div>
          <div class="s-actions">${cases.pick === it.right ? '<span></span>' : why({ level: it.w.level, task: `Вставить артикль${it.adj ? ' и прилагательное «' + it.adj[0] + '»' : ''}: «${it.text}» — ${it.cas}, слово ${it.w.de}`, user: cases.pick, right: it.right })}<button class="btn primary" id="caseNext" data-act="case-next">Дальше ↵</button></div>`;
      return `<div class="session"><div class="s-top"><a class="icon-btn" href="#practice" aria-label="Завершить">✕</a>
          <div class="track"><i style="width:${pct}%"></i></div><span class="s-count">${cases.i + 1} / ${cases.items.length}</span></div>
        <p class="eyebrow">Падежи · ${it.cas} · ${DETS[it.det]}</p>
        <div class="card"><div class="prompt"><span class="muted small">${esc(it.w.ru)}${it.adj ? ` · ${esc(it.adj[1])}` : ''}</span><span class="qtext" style="font-size:clamp(22px,5vw,30px)">${sentence}</span></div>
          <div class="choices">${it.options.map((o, i) => {
            let cls = '';
            if (!asking && o === it.right) cls = 'right'; else if (!asking && o === cases.pick) cls = 'wrong';
            return `<button class="opt ${cls}" data-act="case-pick" data-v="${esc(o)}" ${asking ? '' : 'disabled'}><kbd>${i + 1}</kbd>${esc(o)}</button>`;
          }).join('')}</div>${fb}</div></div>`;
    }
    const done = cases.phase === 'done';
    const seg = (key, act, opts) => `<div class="seg2" role="group">${opts.map(([id, l]) => `<button class="chip-t" data-act="${act}" data-id="${id}" aria-pressed="${cases[key] === id}">${l}</button>`).join('')}</div>`;
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Падежи и окончания</h1><p class="muted">Выбирайте правильную форму артикля (и прилагательного) в предложении. Слова берутся из уровней, которые вы проходите.</p></div>
      ${done ? `<section class="panel hero"><p class="eyebrow">Результат</p><div class="row" style="align-items:baseline"><span class="num done-score">${cases.ok}</span><span class="muted">из ${cases.items.length} верно</span></div></section>` : ''}
      <section class="panel stack">
        <h3>Падеж</h3>${seg('cas', 'case-cas', [['mix', 'Все'], ['Nom', 'Nominativ'], ['Akk', 'Akkusativ'], ['Dat', 'Dativ']])}
        <h3>Артикль</h3>${seg('det', 'case-det', [['mix', 'Все'], ['def', 'der/die/das'], ['ein', 'ein/eine'], ['kein', 'kein'], ['mein', 'mein']])}
        <label class="toggle"><input type="checkbox" id="caseAdj" ${cases.adj ? 'checked' : ''}> С прилагательным (der neue Tisch, einen neuen Tisch)</label>
        <div class="row"><button class="btn primary" data-act="case-start">${done ? 'Ещё раунд' : 'Начать'} ${ARROW}</button><span class="small muted">${ROUND} заданий</span></div>
      </section>
      <section class="panel rule-body"><h3>Шпаргалка</h3><div class="tbl"><table><tr><th></th><th>der</th><th>die</th><th>das</th></tr>
        ${['Nom', 'Akk', 'Dat'].map((c) => `<tr><td class="muted">${c}</td>${['der', 'die', 'das'].map((g) => `<td>${phrase('def', c, g, 'neu')} · ${phrase('ein', c, g, 'neu')}</td>`).join('')}</tr>`).join('')}</table></div></section>`;
  }

  /* ================= Статистика ================= */
  function renderStats() {
    const st = D.getState();
    const days = st.days || {};
    const okDays = st.ok || {};
    const totalAns = Object.values(days).reduce((a, b) => a + b, 0);
    const totalOk = Object.values(okDays).reduce((a, b) => a + b, 0);
    const words = st.words || {};
    const started = D.startedWords().length;
    const known = D.WORDS.filter((w) => (words[w.key] || {}).b >= D.KNOWN_BOX).length;
    const rulesPassed = Object.values(st.rules || {}).filter((v) => v >= 0.6).length;
    const lessonsDone = D.UNITS.filter((u) => { const s = st.units[u.id] || {}; return s.w && s.s && u.r.every((r) => (st.rules[r] || 0) >= 0.6); }).length;
    const N = 21;
    const today = D.startOfDay();
    const series = Array.from({ length: N }, (_, i) => { const t = D.addDays(today, i - N + 1); return { t, v: days[D.dayKey(t)] || 0 }; });
    const max = Math.max(D.DAILY_GOAL, ...series.map((d) => d.v));
    const W = 640; const H = 180; const P = 26; const bw = (W - P * 2) / N;
    const y = (v) => H - P - (v / max) * (H - P * 2);
    const chart = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ответы за ${N} дней">
      <line class="goal" x1="${P}" x2="${W - P}" y1="${y(D.DAILY_GOAL)}" y2="${y(D.DAILY_GOAL)}"/><text x="${W - P}" y="${y(D.DAILY_GOAL) - 6}" text-anchor="end">цель ${D.DAILY_GOAL}</text>
      ${series.map((d, i) => `<rect class="gbar ${d.v >= D.DAILY_GOAL ? 'hit' : ''}" x="${P + i * bw + 3}" y="${y(d.v)}" width="${bw - 6}" height="${Math.max(0, H - P - y(d.v))}" rx="5"><title>${new Date(d.t).toLocaleDateString('ru-RU')}: ${d.v}</title></rect>`).join('')}
      ${series.filter((_, i) => i % 7 === 0 || i === N - 1).map((d) => { const i = series.indexOf(d); return `<text x="${P + i * bw + bw / 2}" y="${H - 6}" text-anchor="middle">${new Date(d.t).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</text>`; }).join('')}
    </svg>`;
    const byLevel = D.LEVELS.map((l) => {
      const ws = D.WORDS.filter((w) => w.level === l.id);
      const s = ws.filter((w) => (words[w.key] || {}).b > 0).length;
      const k = ws.filter((w) => (words[w.key] || {}).b >= D.KNOWN_BOX).length;
      return { id: l.id, total: ws.length, s, k };
    });
    const hard = D.WORDS.filter((w) => (words[w.key] || {}).x > 0)
      .map((w) => ({ w, x: words[w.key].x, r: words[w.key].r || 0 }))
      .sort((a, b) => b.x - a.x || (a.r / (a.r + a.x)) - (b.r / (b.r + b.x))).slice(0, 20);
    const transfer = transferBlock();
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Статистика</h1><p class="muted">Как идут занятия и какие слова даются труднее всего. <a href="#achievements">Достижения →</a></p></div>
      <section class="wall wall4">
        <div class="pane"><span class="pane-title">Серия</span><span class="num big">${D.streak()}<small>${plural(D.streak(), 'день', 'дня', 'дней')}</small></span></div>
        <div class="pane"><span class="pane-title">Всего ответов</span><span class="num big">${totalAns}</span></div>
        <div class="pane"><span class="pane-title">Точность</span><span class="num big">${totalAns ? Math.round((totalOk / totalAns) * 100) : 0}<small>%</small></span></div>
        <div class="pane"><span class="pane-title">Выучено слов</span><span class="num big">${known}<small>/ ${started}</small></span></div>
      </section>
      <section class="panel stack"><div class="step-head"><h3>Ответы по дням</h3><span class="small muted">последние ${N} дней</span></div>${chart}</section>
      <section class="panel stack"><h3>Слова по уровням</h3>
        ${byLevel.map((l) => `<div class="lvrow"><b>${l.id}</b><div class="meter"><i class="m-s" style="width:${(l.s / l.total) * 100}%"></i><i class="m-k" style="width:${(l.k / l.total) * 100}%"></i></div><span class="small muted">${l.k} / ${l.s} / ${l.total}</span></div>`).join('')}
        <p class="small muted">Тёмная полоса — выучено, светлая — в работе, число справа — всего слов уровня.</p>
        <p class="small">Уроков пройдено: <b>${lessonsDone}</b> из ${D.UNITS.length} · правил сдано: <b>${rulesPassed}</b> из ${Object.keys(D.RULE).length}</p></section>
      <section class="panel stack"><div class="step-head"><h3>Трудные слова</h3>${hard.length ? '<button class="btn primary small" data-act="hard-train">Тренировать</button>' : ''}</div>
        ${hard.length ? `<div class="dict">${hard.map(({ w, x, r }) => `<div class="drow"><div>${D.wordHtml(w)}</div><div class="ru small">${esc(w.ru)}</div><div class="acts row" style="gap:6px;flex-wrap:nowrap"><span class="st">✗ ${x} · ✓ ${r}</span>${D.speakBtn(w.de)}</div></div>`).join('')}</div>`
          : '<p class="small muted">Здесь появятся слова, в которых вы ошибаетесь. Пока таких нет.</p>'}</section>
      ${transfer}`;
  }
  let transferMsg = '';
  function transferBlock() {
    return `<section class="panel stack"><h3>Перенос прогресса</h3>
      <p class="small muted">Скопируйте код и вставьте его на другом устройстве или в другой версии. Прогресс объединится: из двух берётся лучшее.</p>
      <div class="row"><button class="btn small" data-act="pr-copy">Скопировать код прогресса</button></div>
      <textarea id="importBox" class="import" rows="3" placeholder="Вставьте сюда код прогресса" aria-label="Код прогресса"></textarea>
      <div class="row"><button class="btn primary small" data-act="pr-import">Перенести</button>${transferMsg ? `<span class="small">${esc(transferMsg)}</span>` : ''}</div>
      ${D.STANDALONE ? '' : '<p class="small muted">Напоминания: в приложении для Mac выберите в меню <b>Deutschweg → Напоминание</b> удобное время.</p>'}</section>`;
  }
  async function copyProgress() {
    const code = D.exportState();
    try { await navigator.clipboard.writeText(code); transferMsg = 'Код скопирован.'; } catch (e) {
      const box = $('#importBox');
      if (box) { box.value = code; box.select(); }
      transferMsg = 'Не получилось скопировать автоматически — код выделен в поле, скопируйте его вручную.';
    }
    rerender();
  }
  function importProgress() {
    const box = $('#importBox');
    const raw = box ? box.value.trim() : '';
    if (!raw) { transferMsg = 'Сначала вставьте код.'; rerender(); return; }
    try {
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || !data.words) throw new Error('bad');
      D.importState(data);
      transferMsg = 'Готово: прогресс перенесён.';
    } catch (e) {
      transferMsg = 'Код не подошёл. Скопируйте его целиком и попробуйте снова.';
    }
    rerender();
  }
  function trainHard() {
    const words = D.getState().words;
    const list = D.WORDS.filter((w) => (words[w.key] || {}).x > 0).sort((a, b) => words[b.key].x - words[a.key].x).slice(0, 20);
    D.startWordSession(list, 'Трудные слова', '#stats');
  }

  /* ================= Регистрация ================= */
  D.register({
    views: { practice: renderHub, dictation: renderDictation, conj: renderConj, cases: renderCases, stats: renderStats },
    nav: { practice: 'practice', dictation: 'practice', conj: 'practice', cases: 'practice', stats: 'practice' },
    actions: {
      'pr-ins': (el) => insertInto(null, el.dataset.c),
      'dict-mode': (el) => { dict = { ...dict, mode: el.dataset.id }; rerender(); },
      'dict-level': (el) => { dict = { ...dict, level: el.dataset.id }; rerender(); },
      'dict-start': () => startDictation(),
      'dict-play': () => D.speak(dict.items[dict.i].de),
      'dict-slow': () => D.speak(dict.items[dict.i].de, { rate: 0.75 }),
      'dict-next': () => nextDictation(),
      'conj-tense': (el) => { conj = { ...conj, tense: el.dataset.id }; rerender(); },
      'conj-level': (el) => { conj = { ...conj, level: el.dataset.id }; rerender(); },
      'conj-start': () => startConj(),
      'conj-next': () => nextConj(),
      'conj-exit': () => { conj = { ...conj, phase: 'idle' }; },
      'case-cas': (el) => { cases = { ...cases, cas: el.dataset.id }; rerender(); },
      'case-det': (el) => { cases = { ...cases, det: el.dataset.id }; rerender(); },
      'case-start': () => startCases(),
      'case-pick': (el) => pickCase(el.dataset.v),
      'case-next': () => nextCase(),
      'hard-train': () => trainHard(),
      'pr-copy': () => copyProgress(),
      'pr-import': () => importProgress(),
    },
    hooks: {
      submit: (ev) => {
        if (ev.target.matches('[data-form="dict"]')) { ev.preventDefault(); if (dict.phase === 'ask') checkDictation(); }
        if (ev.target.matches('[data-form="conj"]')) { ev.preventDefault(); if (conj.phase === 'ask') checkConj(); }
      },
      change: (ev) => { if (ev.target.id === 'caseAdj') cases = { ...cases, adj: ev.target.checked }; },
      keydown: (ev) => {
        const inInput = ev.target.tagName === 'INPUT' || ev.target.tagName === 'TEXTAREA';
        if (ev.key === 'Enter' && !ev.target.closest('button') && !inInput) {
          const nb = $('#dictNext') || $('#conjNext') || $('#caseNext');
          if (nb) { ev.preventDefault(); nb.click(); }
        }
        if (!inInput && /^[1-4]$/.test(ev.key) && cases.phase === 'ask' && location.hash === '#cases') {
          const b = document.querySelectorAll('[data-act="case-pick"]')[Number(ev.key) - 1];
          if (b) { ev.preventDefault(); b.click(); }
        }
      },
      afterRender: () => {
        const h = location.hash;
        if (h === '#dictation' && dict.phase === 'ask') { const i = $('#dictInput'); if (i) i.focus(); }
        if (h === '#conj' && conj.phase === 'ask') { const i = $('#conjInput'); if (i) i.focus(); }
      },
    },
  });

  /* Сбрасываем незаконченные раунды при уходе со страницы. */
  window.addEventListener('hashchange', () => {
    const h = location.hash;
    if (h !== '#dictation' && dict.phase !== 'idle') dict = { ...dict, phase: 'idle' };
    if (h !== '#conj' && conj.phase !== 'idle') conj = { ...conj, phase: 'idle' };
    if (h !== '#cases' && cases.phase !== 'idle') cases = { ...cases, phase: 'idle' };
    transferMsg = '';
  });
})();
