/* «Строим предложение»: ученик собирает предложение по частям, а схема и подсказки
   показывают, что должно стоять на каждом месте и почему. Данные — builder-data.js. */
(() => {
  'use strict';
  const D = window.DW;
  const PATTERNS = Array.isArray(window.DE_BUILDER) ? window.DE_BUILDER : [];
  if (!D || !PATTERNS.length) return;
  const { esc, shuffle } = D;
  const BY = Object.fromEntries(PATTERNS.map((p) => [p.id, p]));
  const LEVELS = ['A1', 'A2', 'B1'];
  const EXT_KEY = 'sb';
  const MIX_SIZE = 8;
  const MIX_PREFIX = 'mix-';

  /* Роль части предложения: подпись в схеме и общая подсказка (если в схеме нет своей). */
  const ROLE = {
    s: ['Кто / что', 'Подлежащее — кто или что действует.'],
    v: ['Глагол', 'Спрягаемый глагол. В обычном предложении — на 2-м месте.'],
    e: ['Конец', 'Вторая часть глагола — в самом конце: инфинитив, причастие или приставка.'],
    f: ['Глагол в конце', 'В придаточном спрягаемый глагол уходит в самый конец.'],
    q: ['Вопрос', 'Вопросительное слово — на 1-м месте.'],
    c: ['Союз', 'Слово, которое начинает придаточное.'],
    z: ['Запятая', 'Запятая между частями предложения.'],
    t: ['Когда', 'Время: когда это происходит.'],
    k: ['Почему', 'Причина: почему.'],
    m: ['Как', 'Как, с кем, на чём, какой.'],
    p: ['Где / куда', 'Место или направление.'],
    o: ['Что / кого', 'Дополнение: что или кого.'],
    d: ['Кому', 'Кому — дательный падеж (Dativ).'],
    n: ['Отрицание', 'nicht или kein.'],
    r: ['Остальное', 'Остальная часть предложения.'],
  };
  const roleLabel = (r) => (ROLE[r] || ROLE.r)[0];
  const roleHint = (pattern, r) => (pattern.h && pattern.h[r]) || (ROLE[r] || ROLE.r)[1];

  /* ---------- сохранённые результаты и настройки ---------- */
  const saved = () => D.getExt(EXT_KEY) || {};
  const hintsAlways = () => saved().hints !== 'err';
  function saveExt(patch) { D.setExt(EXT_KEY, { ...saved(), ...patch }); D.commit(); }

  /* ---------- состояние раунда ---------- */
  let s = null;

  function roundItems(id) {
    if (id.startsWith(MIX_PREFIX)) {
      const lvl = id.slice(MIX_PREFIX.length);
      const all = PATTERNS.filter((p) => p.lvl === lvl).flatMap((p) => p.items.map((item) => ({ item, pid: p.id })));
      return shuffle(all).slice(0, MIX_SIZE);
    }
    const p = BY[id];
    return p ? shuffle(p.items.map((item) => ({ item, pid: p.id }))) : [];
  }

  function freshItem(entry) {
    const parts = entry.item.w.map(([t]) => ({ t, x: null, bad: false, used: false }));
    const fakes = (entry.item.x || []).map(([t, x]) => ({ t, x, bad: false, used: false }));
    return { placed: 0, bank: shuffle([...parts, ...fakes]), errs: 0, fb: null, more: false, peek: false };
  }

  function start(id) {
    const items = roundItems(id);
    if (!items.length) { s = null; return; }
    s = { id, items, i: 0, ok: 0, done: false, ...freshItem(items[0]) };
  }

  const current = () => s.items[s.i];
  const pattern = () => BY[current().pid];
  const parts = () => current().item.w;
  const complete = () => s.placed >= parts().length;
  const showHints = () => hintsAlways() || s.errs > 0 || s.peek;

  /** Предложение целиком: части через пробел, без пробела перед запятой, с заглавной буквы и знаком в конце. */
  function sentence(item) {
    const text = item.w.map(([t]) => t).join(' ').replace(/ ,/g, ',');
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}${item.end || '.'}`;
  }

  function finishItem(state) {
    const clean = state.errs === 0;
    D.countResult(clean);
    D.commit();
    return { ...state, ok: state.ok + (clean ? 1 : 0) };
  }

  /** Объяснение, почему выбранная часть не подходит на текущее место. */
  function wrongReason(chip) {
    if (chip.x) return chip.x;
    const want = parts()[s.placed];
    const later = parts().slice(s.placed).find(([t]) => t === chip.t);
    const role = later ? later[1] : 'r';
    const now = `Сейчас нужно другое: ${roleHint(pattern(), want[1])}`;
    if (role === want[1]) return `«${chip.t}» — тоже «${roleLabel(role).toLowerCase()}», но эта часть идёт позже. ${now}`;
    return `«${chip.t}» — это «${roleLabel(role).toLowerCase()}», эта часть понадобится позже. ${now}`;
  }

  function place(bankIdx) {
    const bank = s.bank.map((c, i) => (i === bankIdx ? { ...c, used: true } : c));
    const [, , note] = parts()[s.placed];
    const next = { ...s, bank, placed: s.placed + 1, more: false, fb: note ? { ok: true, text: note } : null };
    s = next.placed >= parts().length ? finishItem(next) : next;
  }

  function pick(idx) {
    if (!s || s.done || complete()) return;
    const chip = s.bank[idx];
    if (!chip || chip.used || chip.bad) return;
    if (chip.t === parts()[s.placed][0]) { place(idx); D.render(); return; }
    const bank = chip.x ? s.bank.map((c, i) => (i === idx ? { ...c, bad: true } : c)) : s.bank;
    s = { ...s, bank, errs: s.errs + 1, more: true, fb: { ok: false, text: wrongReason(chip) } };
    D.render();
  }

  function reveal() {
    if (!s || s.done || complete()) return;
    const want = parts()[s.placed][0];
    const idx = s.bank.findIndex((c) => !c.used && c.t === want);
    if (idx < 0) return;
    s = { ...s, errs: s.errs + 1 };
    place(idx);
    D.render();
  }

  function next() {
    if (!s || !complete()) return;
    const i = s.i + 1;
    if (i < s.items.length) {
      s = { ...s, i, ...freshItem(s.items[i]) };
    } else {
      const best = { ...(saved().best || {}) };
      best[s.id] = Math.max(best[s.id] || 0, s.ok);
      saveExt({ best });
      s = { ...s, done: true };
    }
    D.render();
    window.scrollTo(0, 0);
  }

  /* ---------- отрисовка ---------- */
  function scheme() {
    const show = showHints();
    return `<div class="sb-scheme" aria-label="Схема предложения">${parts().map(([t, r], i) => {
      const filled = i < s.placed;
      const cur = i === s.placed;
      const label = filled || show ? roleLabel(r) : '';
      const cls = `sb-box r-${r}${filled ? ' on' : ''}${cur ? ' cur' : ''}${r === 'z' ? ' z' : ''}`;
      return `<div class="${cls}"><small>${i + 1}${label && r !== 'z' ? ` · ${esc(label)}` : ''}</small><span lang="de">${filled ? esc(t) : '&nbsp;'}</span></div>`;
    }).join('')}</div>`;
  }

  function hintBox() {
    if (complete()) return '';
    const [, r, note] = parts()[s.placed];
    if (!showHints()) return '<div class="row"><button type="button" class="btn ghost small" data-act="sb-hint">Подсказка</button></div>';
    const how = note && s.more ? `<span class="small"><b>Как:</b> ${esc(note)}</span>` : '';
    const moreBtn = note && !s.more ? '<button type="button" class="btn ghost small" data-act="sb-more">Подробнее</button>' : '';
    return `<div class="sb-hint r-${r}"><span class="eyebrow">Место ${s.placed + 1} · ${esc(roleLabel(r))}</span>
      <span>${esc(roleHint(pattern(), r))}</span>${how}${moreBtn ? `<div>${moreBtn}</div>` : ''}</div>`;
  }

  function feedback() {
    if (!s.fb) return '';
    return `<div class="fb ${s.fb.ok ? 'ok' : 'bad'}" role="status"><span class="small">${s.fb.ok ? '✓ ' : ''}${esc(s.fb.text)}</span></div>`;
  }

  function bank() {
    return `<div class="bank" aria-label="Части предложения">${s.bank.map((c, i) => (c.used ? ''
      : `<button type="button" class="chip${c.bad ? ' sb-bad' : ''}" data-act="sb-pick" data-i="${i}" lang="de" ${c.bad ? 'disabled' : ''}>${esc(c.t)}</button>`)).join('')}</div>`;
  }

  function summary() {
    const item = current().item;
    const text = sentence(item);
    const notes = item.w.filter(([, , n]) => n).map(([t, , n]) => `<li><b lang="de">${esc(t)}</b> — ${esc(n)}</li>`).join('');
    const last = s.i + 1 >= s.items.length;
    return `<div class="fb ${s.errs ? 'bad' : 'ok'}" role="status">
        <span class="verdict">${s.errs ? `Собрано, ошибок: ${s.errs}` : 'Отлично, без ошибок!'}</span>
        <span class="answer"><span lang="de">${esc(text)}</span> ${D.speakBtn(text)}</span>
        <span class="small muted">${esc(item.ru)}</span></div>
      ${notes ? `<section class="stack" style="gap:6px"><span class="eyebrow">Что здесь важно</span><ul class="sb-notes">${notes}</ul></section>` : ''}
      <div class="s-actions"><span></span><button class="btn primary" data-act="sb-next" id="sbNext">${last ? 'Итог' : 'Дальше'} ↵</button></div>`;
  }

  function renderTask() {
    const item = current().item;
    const p = pattern();
    const mixed = s.id.startsWith(MIX_PREFIX);
    const body = complete() ? summary() : `${hintBox()}${bank()}${feedback()}
      <div class="s-actions"><button type="button" class="btn ghost small" data-act="sb-show">Подставить</button><span class="muted small">Нажимайте части по порядку</span></div>`;
    return `<div class="session">
      <div class="s-top"><a class="icon-btn" href="#builder" aria-label="Выйти">✕</a>
        <div class="track"><i style="width:${Math.round((s.i / s.items.length) * 100)}%"></i></div>
        <span class="s-count">${s.i + 1} / ${s.items.length}</span></div>
      ${mixed ? `<p class="eyebrow">${esc(p.lvl)} · ${esc(p.t)}</p>` : ''}
      <div class="card">
        <div class="prompt"><span class="muted small">Соберите по-немецки</span><span class="ru-big">${esc(item.ru)}</span></div>
        ${scheme()}
        ${body}
      </div></div>`;
  }

  function renderDone() {
    const total = s.items.length;
    const id = s.id;
    const list = PATTERNS;
    const nextP = BY[id] ? list[list.indexOf(BY[id]) + 1] : null;
    return `<section class="panel hero stack"><p class="eyebrow">Раунд завершён</p>
        <h1 class="done-title">${s.ok === total ? 'Все без ошибок!' : 'Готово!'}</h1>
        <div class="row" style="align-items:baseline"><span class="num done-score">${s.ok}</span><span class="muted">из ${total} предложений без ошибок</span></div>
        <div class="row"><button class="btn primary" data-act="sb-again">Ещё раз</button>
          ${nextP ? `<a class="btn" href="#sb-${nextP.id}">Дальше: ${esc(nextP.t)}</a>` : ''}<a class="btn ghost" href="#builder">Все схемы</a></div></section>`;
  }

  function ruleBlock(p) {
    return `<details class="panel stack sb-rule"${s.i === 0 && s.placed === 0 ? ' open' : ''}><summary>Правило: ${esc(p.t)}</summary><p>${p.rule}</p></details>`;
  }

  function renderRound(id) {
    if (!BY[id] && !(id.startsWith(MIX_PREFIX) && LEVELS.includes(id.slice(MIX_PREFIX.length)))) return renderList();
    if (!s || s.id !== id) start(id);
    if (!s) return renderList();
    if (s.done) return renderDone();
    const head = BY[id] ? `<div class="page-head"><p class="eyebrow">${esc(BY[id].lvl)} · <span lang="de">${esc(BY[id].de)}</span></p><h1>${esc(BY[id].t)}</h1></div>${ruleBlock(BY[id])}`
      : `<div class="page-head"><p class="eyebrow">${esc(id.slice(MIX_PREFIX.length))} · вперемешку</p><h1>Все схемы уровня</h1></div>`;
    return `${head}${renderTask()}`;
  }

  function card(p) {
    const best = (saved().best || {})[p.id];
    const status = best === undefined ? `${p.items.length} предложений` : `без ошибок: ${best} из ${p.items.length}`;
    return `<a class="pane pack" href="#sb-${p.id}"><span class="hub-dot" style="background:var(--der)"></span>
      <span class="pane-big">${esc(p.t)}</span><span class="count"><span lang="de">${esc(p.de)}</span> · ${status}</span></a>`;
  }

  function mixCard(lvl) {
    return `<a class="pane pack" href="#sb-${MIX_PREFIX}${lvl}"><span class="hub-dot" style="background:var(--gold)"></span>
      <span class="pane-big">Вперемешку</span><span class="count">${MIX_SIZE} случайных предложений ${lvl}</span></a>`;
  }

  function renderList() {
    const always = hintsAlways();
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Строим предложение</h1><p class="muted">Собирайте немецкое предложение по частям. Схема показывает, что стоит на каждом месте: подлежащее, глагол, время, конец… Подсказка объясняет, что нужно сейчас. Если ошибётесь, приложение скажет, почему этот вариант не подходит.</p></div>
      <section class="panel stack" style="gap:10px"><h3>Подсказки</h3>
        <div class="seg2" role="group"><button class="chip-t" data-act="sb-hints" data-id="on" aria-pressed="${always}">Показывать сразу</button><button class="chip-t" data-act="sb-hints" data-id="err" aria-pressed="${!always}">Только после ошибки</button></div></section>
      ${LEVELS.map((lv) => {
        const list = PATTERNS.filter((p) => p.lvl === lv);
        return list.length ? `<div class="sec-head"><h2>${lv}</h2></div><section class="packs">${list.map(card).join('')}${mixCard(lv)}</section>` : '';
      }).join('')}`;
  }

  D.register({
    views: { builder: renderList, sb: (id) => renderRound(id || '') },
    prefixes: [['sb-', 'sb']],
    nav: { builder: 'practice', sb: 'practice' },
    actions: {
      'sb-hints': (el) => { saveExt({ hints: el.dataset.id }); D.render(); },
      'sb-pick': (el) => pick(Number(el.dataset.i)),
      'sb-show': () => reveal(),
      'sb-more': () => { s = { ...s, more: true }; D.render(); },
      'sb-hint': () => { s = { ...s, peek: true }; D.render(); },
      'sb-next': () => next(),
      'sb-again': () => { start(s.id); D.render(); window.scrollTo(0, 0); },
    },
    hooks: {
      keydown: (ev) => {
        if (ev.key !== 'Enter' || ev.target.closest('button, input, textarea')) return;
        const btn = document.getElementById('sbNext');
        if (btn) { ev.preventDefault(); btn.click(); }
      },
    },
  });

  /* Новый заход в схему начинается заново. */
  window.addEventListener('hashchange', () => { if (s && location.hash !== `#sb-${s.id}`) s = null; });
})();
