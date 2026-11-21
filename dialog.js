/* Диалоги по шаблону: письменная переписка по сценарию без ИИ.
   Ответ засчитывается, если совпал с образцом или содержит все ключевые слова шага. Данные — dialog-data.js. */
(() => {
  'use strict';
  const D = window.DW;
  const DIALOGS = Array.isArray(window.DE_DIALOGS) ? window.DE_DIALOGS : [];
  if (!D || !DIALOGS.length) return;
  const { esc } = D;
  const BY = Object.fromEntries(DIALOGS.map((d) => [d.id, d]));
  const LEVELS = ['A1', 'A2', 'B1'];
  const EXT_KEY = 'dlg';
  const UMLAUTS = ['ä', 'ö', 'ü', 'ß'];

  /* ---------- проверка ответа ---------- */
  const fold = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  const norm = (s) => ` ${fold(s).replace(/[^a-z0-9*]+/g, ' ').trim()} `;
  const keyRe = (kw) => new RegExp(` ${norm(kw).trim().split('*').map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[a-z0-9]*')} `);
  const hasKey = (text, kw) => keyRe(kw).test(text);

  /** Возвращает { kind: 'exact' | 'ok' | 'miss', missing: [подсказки] } для ответа на шаг. */
  function evaluate(answer, step) {
    const text = norm(answer.replace(/\*/g, ''));
    if (step.a.some((a) => norm(a) === text)) return { kind: 'exact', missing: [] };
    const missing = step.need.filter((group) => !group.some((kw) => hasKey(text, kw))).map((group) => group[0].replace(/\*$/, '…'));
    return { kind: missing.length ? 'miss' : 'ok', missing };
  }

  /* ---------- сохранённые результаты и настройки ---------- */
  const saved = () => D.getExt(EXT_KEY) || {};
  const savedBest = (id) => ((saved().best || {})[id]);
  const showTpl = () => saved().tpl !== false;
  function saveExt(patch) { D.setExt(EXT_KEY, { ...saved(), ...patch }); D.commit(); }

  /* ---------- состояние текущего диалога ---------- */
  let s = null;
  const partner = (d, i) => (i < d.steps.length ? { who: 'p', de: d.steps[i].p, ru: d.steps[i].pr } : { who: 'p', de: d.end.p, ru: d.end.pr });
  function start(id) {
    const d = BY[id];
    if (!d) return;
    s = { id, i: 0, log: [partner(d, 0)], tries: 0, hint: false, ok: 0, fb: null, draft: '', done: false };
  }
  const readDraft = () => { const el = document.getElementById('dlgInput'); return el ? el.value : (s ? s.draft : ''); };
  const scrollEnd = () => { const el = document.getElementById('dlgForm') || document.getElementById('dlgDone'); if (el) el.scrollIntoView({ block: 'end' }); };
  const rerender = () => { D.render(); scrollEnd(); };

  function advance(userText, note) {
    const d = BY[s.id];
    const i = s.i + 1;
    const clean = s.tries === 0 && note.kind !== 'model';
    const log = [...s.log, { who: 'u', de: userText }, note, partner(d, i)];
    const ok = s.ok + (clean ? 1 : 0);
    const done = i >= d.steps.length;
    s = { ...s, i, log, ok, tries: 0, hint: false, fb: null, draft: '', done };
    if (done) {
      const best = { ...(saved().best || {}) };
      best[d.id] = Math.max(best[d.id] || 0, ok);
      saveExt({ best });
    }
  }

  function submit() {
    if (!s || s.done) return;
    const step = BY[s.id].steps[s.i];
    const text = readDraft().trim().replace(/\s+/g, ' ');
    if (!text) return;
    const res = evaluate(text, step);
    if (res.kind === 'miss') {
      if (s.tries === 0) { D.countResult(false); D.commit(); }
      s = { ...s, tries: s.tries + 1, fb: res, draft: text };
      rerender();
      return;
    }
    if (s.tries === 0) { D.countResult(true); D.commit(); }
    const note = res.kind === 'exact' ? { who: 'n', kind: 'exact' } : { who: 'n', kind: 'ok', model: step.a[0] };
    advance(text, note);
    rerender();
  }

  function reveal() {
    if (!s || s.done) return;
    if (s.tries === 0) { D.countResult(false); D.commit(); }
    const step = BY[s.id].steps[s.i];
    advance(step.a[0], { who: 'n', kind: 'model', alt: step.a.slice(1) });
    rerender();
  }

  /* ---------- отрисовка ---------- */
  function bubble(m) {
    if (m.who === 'p') {
      return `<div class="bubble-ai"><div class="row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start"><p lang="de" style="flex:1">${esc(m.de)}</p>${D.speakBtn(m.de)}</div>
        <details class="dlg-tr"><summary>перевод</summary><span>${esc(m.ru)}</span></details></div>`;
    }
    if (m.who === 'u') return `<div class="bubble-me"><p lang="de">${esc(m.de)}</p></div>`;
    if (m.kind === 'exact') return '<div class="corr ok">Отлично, как в образце!</div>';
    if (m.kind === 'ok') return `<div class="corr ok">Принято. Образец: <span lang="de">${esc(m.model)}</span></div>`;
    const alt = m.alt && m.alt.length ? `<span class="small">Так тоже можно: <span lang="de">${m.alt.map(esc).join(' · ')}</span></span>` : '';
    return `<div class="corr"><span>Это образец ответа. Попробуйте запомнить его.</span>${alt}</div>`;
  }

  function renderTask(d) {
    const step = d.steps[s.i];
    const tplOpen = showTpl() || s.hint || s.tries > 0;
    const fb = s.fb ? `<div class="fb bad"><span class="verdict">Почти. Не хватает: ${s.fb.missing.map((w) => `<b lang="de">${esc(w)}</b>`).join(', ')}</span>
      <span class="small">Допишите ответ и проверьте ещё раз или посмотрите образец.</span></div>` : '';
    return `<form class="dlg-form stack" id="dlgForm" data-form="dlg">
        <div class="panel dlg-task stack" style="gap:6px"><span class="eyebrow">Ваш ответ · ${s.i + 1} из ${d.steps.length}</span>
          <b>${esc(step.task)}</b>
          ${tplOpen ? `<span class="dlg-tpl" lang="de">${esc(step.tpl)}</span>` : ''}
          ${fb}
          <div class="row" style="gap:6px">
            ${tplOpen ? '' : '<button type="button" class="btn ghost small" data-act="dlg-hint">Подсказка</button>'}
            <button type="button" class="btn ghost small" data-act="dlg-show">Показать образец</button></div></div>
        <div class="composer-row"><input id="dlgInput" data-uml autocomplete="off" autocapitalize="sentences" spellcheck="false" lang="de" placeholder="Напишите по-немецки…" aria-label="Ваш ответ" value="${esc(s.draft)}">
          <button class="btn primary small" type="submit">Ответить</button></div>
        <div class="umlauts">${UMLAUTS.map((c) => `<button type="button" data-act="pr-ins" data-c="${c}">${c}</button>`).join('')}</div>
      </form>`;
  }

  function renderDone(d) {
    const next = DIALOGS[DIALOGS.indexOf(d) + 1];
    return `<section class="panel hero stack dlg-form" id="dlgDone"><p class="eyebrow">Диалог завершён</p>
        <div class="row" style="align-items:baseline"><span class="num done-score">${s.ok}</span><span class="muted">из ${d.steps.length} ответов с первой попытки</span></div>
        <div class="row"><button class="btn primary" data-act="dlg-again">Ещё раз</button>
          ${next ? `<a class="btn" href="#dlg-${next.id}">Дальше: ${esc(next.t)}</a>` : ''}<a class="btn ghost" href="#dialog">Все диалоги</a></div></section>`;
  }

  function renderDialog(id) {
    const d = BY[id];
    if (!d) return renderList();
    if (!s || s.id !== id) start(id);
    return `<a class="back" href="#dialog">← Диалоги</a>
      <div class="page-head"><p class="eyebrow">${d.lvl} · <span lang="de">${esc(d.de)}</span></p><h1>${esc(d.t)}</h1><p class="muted">${esc(d.s)} Собеседник: <span lang="de">${esc(d.who)}</span>.</p></div>
      <section class="chat">${s.log.map(bubble).join('')}</section>
      ${s.done ? renderDone(d) : renderTask(d)}`;
  }

  function card(d) {
    const best = savedBest(d.id);
    const status = best === undefined ? `${d.steps.length} реплик` : `пройден · ${best} из ${d.steps.length} с первой попытки`;
    return `<a class="pane pack" href="#dlg-${d.id}"><span class="hub-dot" style="background:var(--${d.c})"></span>
      <span class="pane-big">${esc(d.t)}</span><span class="count"><span lang="de">${esc(d.de)}</span> · ${status}</span></a>`;
  }

  function renderList() {
    const tpl = showTpl();
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Диалоги</h1><p class="muted">Переписка по готовому сценарию. Собеседник пишет реплику, вы отвечаете по-немецки. У каждого ответа есть задание и шаблон. Ответ засчитывается, если в нём есть нужные слова, поэтому свои имена и детали писать можно. Работает без интернета и без ИИ.</p></div>
      <section class="panel stack" style="gap:10px"><h3>Шаблон ответа</h3>
        <div class="seg2" role="group"><button class="chip-t" data-act="dlg-tpl" data-id="1" aria-pressed="${tpl}">Показывать сразу</button><button class="chip-t" data-act="dlg-tpl" data-id="0" aria-pressed="${!tpl}">Только по кнопке</button></div></section>
      ${LEVELS.map((lv) => {
        const list = DIALOGS.filter((d) => d.lvl === lv);
        return list.length ? `<div class="sec-head"><h2>${lv}</h2></div><section class="packs">${list.map(card).join('')}</section>` : '';
      }).join('')}`;
  }

  D.register({
    views: { dialog: renderList, dlg: (id) => renderDialog(id || '') },
    prefixes: [['dlg-', 'dlg']],
    nav: { dialog: 'practice', dlg: 'practice' },
    actions: {
      'dlg-tpl': (el) => { saveExt({ tpl: el.dataset.id === '1' }); D.render(); },
      'dlg-hint': () => { s = { ...s, hint: true, draft: readDraft() }; D.render(); },
      'dlg-show': () => reveal(),
      'dlg-again': () => { start(s.id); D.render(); window.scrollTo(0, 0); },
    },
    hooks: {
      submit: (ev) => { if (ev.target.matches('[data-form="dlg"]')) { ev.preventDefault(); submit(); } },
      afterRender: () => {
        if (!location.hash.startsWith('#dlg-') || !s || s.done) return;
        const input = document.getElementById('dlgInput');
        if (input && s.log.length > 1) input.focus({ preventScroll: true });
      },
    },
  });

  /* Новый заход в диалог начинается заново. */
  window.addEventListener('hashchange', () => { if (s && location.hash !== `#dlg-${s.id}`) s = null; });
})();
