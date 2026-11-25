/* «Строим предложение»: ученик сам пишет предложение по-немецки, а схема по ходу набора
   показывает, какие места уже заполнены верно, что нужно дальше и почему вариант не подходит.
   Проверка без ИИ — по частям из builder-data.js. */
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
  const UMLAUTS = ['ä', 'ö', 'ü', 'ß'];
  const TYPO_MIN_LEN = 4;
  const TYPO_MAX_DIST = 2;

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

  /* ---------- сравнение текста ---------- */
  const words = (text) => text.toLowerCase().replace(/[.,!?;:«»"„“]/g, ' ').split(/\s+/).filter(Boolean);
  const fold = (w) => w.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
  const startsWith = (list, at, part) => part.every((w, i) => list[at + i] === w);
  const capital = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const joinParts = (parts) => parts.map(([t]) => t).join(' ').replace(/ ,/g, ',');

  /** Расстояние Левенштейна — чтобы отличить опечатку от совсем другого слова. */
  function distance(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      let prev = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const tmp = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return row[b.length];
  }

  /** Части предложения без запятых: { t, role, note, w: [слова] }. */
  const slots = (item) => item.w.filter(([, r]) => r !== 'z').map(([t, role, note]) => ({ t, role, note, w: words(t) }));

  /** Сколько частей подряд с начала написано верно: { done, at — индекс первого непроверенного слова, typed }. */
  function match(item, text) {
    const typed = words(text);
    const list = slots(item);
    let at = 0;
    let done = 0;
    while (done < list.length && startsWith(typed, at, list[done].w)) { at += list[done].w.length; done += 1; }
    return { done, at, typed };
  }

  /** Почему слова с позиции m.at не подходят на следующее место. brief — без повтора подсказки к месту (она уже на экране). */
  function explain(item, pattern, m, brief = false) {
    const list = slots(item);
    const want = list[m.done];
    const need = brief ? `Сейчас нужно: ${roleLabel(want.role).toLowerCase()}.` : `Сейчас нужно: ${roleLabel(want.role).toLowerCase()}. ${roleHint(pattern, want.role)}`;
    const tip = want.note ? ` Подсказка: ${want.note}.` : '';
    const fake = (item.x || []).find(([t]) => startsWith(m.typed, m.at, words(t)));
    if (fake) return fake[1];
    const later = list.slice(m.done + 1).find((p) => startsWith(m.typed, m.at, p.w));
    if (later) return `«${later.t}» — это «${roleLabel(later.role).toLowerCase()}», эта часть идёт позже. ${need}`;
    const rest = m.typed.slice(m.at);
    const wrong = want.w.map((w, i) => [w, rest[i]]).find(([w, t]) => t !== undefined && t !== w);
    if (wrong) {
      const [w, t] = wrong;
      if (fold(w) === fold(t)) return `Почти: в «${t}» проверьте умлаут или ß.${tip}`;
      if (w.length >= TYPO_MIN_LEN && distance(w, t) <= TYPO_MAX_DIST) return `Почти: проверьте форму или написание «${t}».${tip}`;
    }
    return brief ? `Это слово сюда не подходит.${tip}` : `${need}${tip}`;
  }

  /** Те же слова, что в образце, но в другом порядке. */
  function sameWords(item, typed) {
    const right = slots(item).flatMap((p) => p.w).sort();
    const mine = [...typed].sort();
    return right.length === mine.length && right.every((w, i) => w === mine[i]);
  }

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

  const freshItem = () => ({ draft: '', errs: 0, fb: null, peek: false, solved: false, order: false, noComma: false, gaveUp: false });

  function start(id) {
    const items = roundItems(id);
    s = items.length ? { id, items, i: 0, ok: 0, done: false, ...freshItem() } : null;
  }

  const current = () => s.items[s.i];
  const pattern = () => BY[current().pid];
  const showHints = () => hintsAlways() || s.errs > 0 || s.peek;
  const readDraft = () => { const el = document.getElementById('sbInput'); return el ? el.value : s.draft; };
  const sentence = (item) => `${capital(joinParts(item.w))}${item.end || '.'}`;

  function solve(extra) {
    const clean = s.errs === 0;
    D.countResult(clean);
    D.commit();
    s = { ...s, ...extra, solved: true, ok: s.ok + (clean ? 1 : 0) };
  }

  function fail(text, msg, extra = {}) {
    s = { ...s, ...extra, draft: text, errs: s.errs + 1, fb: { text: msg } };
  }

  function check() {
    if (!s || s.done || s.solved) return;
    const item = current().item;
    const text = readDraft().trim();
    if (!text) return;
    const m = match(item, text);
    const all = slots(item).length;
    if (m.done === all && m.at === m.typed.length) {
      solve({ draft: text, fb: null, noComma: item.w.some(([, r]) => r === 'z') && !text.includes(',') });
    } else if (m.done === all) {
      fail(text, 'Всё нужное уже написано, но в конце есть лишние слова. Уберите их.');
    } else if (sameWords(item, m.typed)) {
      fail(text, `Все слова верные, но порядок другой. ${explain(item, pattern(), m)}`, { order: true });
    } else if (m.at >= m.typed.length) {
      fail(text, `Предложение не закончено. ${explain(item, pattern(), m)}`);
    } else {
      fail(text, explain(item, pattern(), m));
    }
    D.render();
  }

  /** Подставляет следующую часть: всё верное, что уже написано, плюс одна часть образца. */
  function nextWord() {
    if (!s || s.done || s.solved) return;
    const item = current().item;
    const { done } = match(item, readDraft());
    let seen = 0;
    const end = item.w.findIndex(([, r]) => r !== 'z' && (seen += 1) > done);
    const text = `${capital(joinParts(item.w.slice(0, end + 1)))} `;
    s = { ...s, draft: text, errs: s.errs + 1, fb: null, peek: true };
    D.render();
  }

  function giveUp() {
    if (!s || s.done || s.solved) return;
    s = { ...s, errs: s.errs + 1 };
    solve({ fb: null, gaveUp: true });
    D.render();
  }

  function next() {
    if (!s || !s.solved) return;
    const i = s.i + 1;
    if (i < s.items.length) {
      s = { ...s, i, ...freshItem() };
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
  function scheme(m) {
    const show = showHints();
    let k = 0;
    return `<div class="sb-scheme" aria-label="Схема предложения">${current().item.w.map(([t, r], i) => {
      if (r === 'z') {
        const on = s.solved || m.done > k;
        return `<div class="sb-box z r-z${on ? ' on' : ''}"><small>&nbsp;</small><span>${on ? ',' : '&nbsp;'}</span></div>`;
      }
      const idx = k;
      k += 1;
      const filled = s.solved || idx < m.done;
      const cur = !s.solved && idx === m.done;
      const label = show || filled ? ` · ${esc(roleLabel(r))}` : '';
      const cls = `sb-box r-${r}${filled ? ' on' : ''}${cur ? ' cur' : ''}`;
      return `<div class="${cls}"><small>${idx + 1}${label}</small><span lang="de">${filled ? esc(i === 0 ? capital(t) : t) : '&nbsp;'}</span></div>`;
    }).join('')}</div>`;
  }

  /** Подсказка к следующему месту и живая реакция на набранное (ошибки здесь не засчитываются). */
  function liveHint(m, text) {
    const item = current().item;
    const list = slots(item);
    if (m.done >= list.length) return '<div class="sb-hint r-o"><span>Все части на месте — нажмите «Проверить».</span></div>';
    const want = list[m.done];
    const typing = !/\s$/.test(text);
    const rest = m.typed.slice(m.at);
    const onTrack = rest.every((t, i) => (i === rest.length - 1 && typing ? (want.w[i] || '').startsWith(t) : want.w[i] === t));
    if (!showHints()) {
      return onTrack ? '<div class="row"><button type="button" class="btn ghost small" data-act="sb-hint">Подсказка</button></div>' : '';
    }
    const warn = onTrack ? '' : `<span class="sb-warn">${esc(explain(item, pattern(), m, true))}</span>`;
    return `<div class="sb-hint r-${want.role}"><span class="eyebrow">Место ${m.done + 1} · ${esc(roleLabel(want.role))}</span>
      <span>${esc(roleHint(pattern(), want.role))}</span>${warn}</div>`;
  }

  const liveBlock = (text) => {
    const m = match(current().item, text);
    return `${scheme(m)}${s.solved ? '' : liveHint(m, text)}`;
  };

  function feedback() {
    if (!s.fb) return '';
    const accept = s.order ? '<div><button type="button" class="btn ghost small" data-act="sb-accept">Мой порядок тоже верный</button></div>' : '';
    return `<div class="fb bad" role="status"><span class="verdict">Не совсем</span><span class="small">${esc(s.fb.text)}</span>${accept}</div>`;
  }

  function form() {
    return `<form class="stack" style="gap:10px" data-form="sb">
        <div class="type-row"><input id="sbInput" autocomplete="off" autocapitalize="sentences" autocorrect="off" spellcheck="false" lang="de"
          aria-label="Ваше предложение" placeholder="Пишите по-немецки…" value="${esc(s.draft)}"></div>
        <div class="umlauts">${UMLAUTS.map((c) => `<button type="button" data-act="sb-ins" data-c="${c}">${c}</button>`).join('')}</div>
        ${feedback()}
        <div class="s-actions"><div class="row" style="gap:6px"><button type="button" class="btn ghost small" data-act="sb-word">Следующее слово</button>
          <button type="button" class="btn ghost small" data-act="sb-giveup">Показать ответ</button></div>
          <button class="btn primary" type="submit">Проверить</button></div>
      </form>`;
  }

  function summary() {
    const item = current().item;
    const text = sentence(item);
    const notes = item.w.filter(([, , n]) => n).map(([t, , n]) => `<li><b lang="de">${esc(t)}</b> — ${esc(n)}</li>`).join('');
    const last = s.i + 1 >= s.items.length;
    const verdict = s.gaveUp ? 'Вот как правильно' : s.errs ? `Получилось, неудачных попыток: ${s.errs}` : 'Отлично, с первого раза!';
    const mine = s.order && s.draft ? `<span class="small">Ваш вариант: <span lang="de">${esc(s.draft)}</span></span>` : '';
    const comma = s.noComma ? '<span class="small">Не забывайте запятую между частями предложения — в немецком она обязательна.</span>' : '';
    return `<div class="fb ${s.errs ? 'bad' : 'ok'}" role="status">
        <span class="verdict">${verdict}</span>${mine}
        <span class="answer"><span lang="de">${esc(text)}</span> ${D.speakBtn(text)}</span>
        <span class="small muted">${esc(item.ru)}</span>${comma}</div>
      ${notes ? `<section class="stack" style="gap:6px"><span class="eyebrow">Что здесь важно</span><ul class="sb-notes">${notes}</ul></section>` : ''}
      <div class="s-actions"><span></span><button class="btn primary" data-act="sb-next" id="sbNext">${last ? 'Итог' : 'Дальше'} ↵</button></div>`;
  }

  function renderTask() {
    const item = current().item;
    const p = pattern();
    const mixed = s.id.startsWith(MIX_PREFIX);
    return `<div class="session">
      <div class="s-top"><a class="icon-btn" href="#builder" aria-label="Выйти">✕</a>
        <div class="track"><i style="width:${Math.round((s.i / s.items.length) * 100)}%"></i></div>
        <span class="s-count">${s.i + 1} / ${s.items.length}</span></div>
      ${mixed ? `<p class="eyebrow">${esc(p.lvl)} · ${esc(p.t)}</p>` : ''}
      <div class="card">
        <div class="prompt"><span class="muted small">Напишите по-немецки</span><span class="ru-big">${esc(item.ru)}</span></div>
        <div class="stack" style="gap:12px" id="sbLive">${liveBlock(s.draft)}</div>
        ${s.solved ? summary() : form()}
      </div></div>`;
  }

  function renderDone() {
    const total = s.items.length;
    const nextP = BY[s.id] ? PATTERNS[PATTERNS.indexOf(BY[s.id]) + 1] : null;
    return `<section class="panel hero stack"><p class="eyebrow">Раунд завершён</p>
        <h1 class="done-title">${s.ok === total ? 'Все с первого раза!' : 'Готово!'}</h1>
        <div class="row" style="align-items:baseline"><span class="num done-score">${s.ok}</span><span class="muted">из ${total} предложений с первого раза</span></div>
        <div class="row"><button class="btn primary" data-act="sb-again">Ещё раз</button>
          ${nextP ? `<a class="btn" href="#sb-${nextP.id}">Дальше: ${esc(nextP.t)}</a>` : ''}<a class="btn ghost" href="#builder">Все схемы</a></div></section>`;
  }

  const ruleBlock = (p) => `<details class="panel stack sb-rule"${s.i === 0 && !s.draft ? ' open' : ''}><summary>Правило: ${esc(p.t)}</summary><p>${p.rule}</p></details>`;

  function renderRound(id) {
    const isMix = id.startsWith(MIX_PREFIX) && LEVELS.includes(id.slice(MIX_PREFIX.length));
    if (!BY[id] && !isMix) return renderList();
    if (!s || s.id !== id) start(id);
    if (!s) return renderList();
    if (s.done) return renderDone();
    const head = BY[id] ? `<div class="page-head"><p class="eyebrow">${esc(BY[id].lvl)} · <span lang="de">${esc(BY[id].de)}</span></p><h1>${esc(BY[id].t)}</h1></div>${ruleBlock(BY[id])}`
      : `<div class="page-head"><p class="eyebrow">${esc(id.slice(MIX_PREFIX.length))} · вперемешку</p><h1>Все схемы уровня</h1></div>`;
    return `${head}${renderTask()}`;
  }

  function card(p) {
    const best = (saved().best || {})[p.id];
    const status = best === undefined ? `${p.items.length} предложений` : `с первого раза: ${best} из ${p.items.length}`;
    return `<a class="pane pack" href="#sb-${p.id}"><span class="hub-dot" style="background:var(--der)"></span>
      <span class="pane-big">${esc(p.t)}</span><span class="count"><span lang="de">${esc(p.de)}</span> · ${status}</span></a>`;
  }

  const mixCard = (lvl) => `<a class="pane pack" href="#sb-${MIX_PREFIX}${lvl}"><span class="hub-dot" style="background:var(--gold)"></span>
      <span class="pane-big">Вперемешку</span><span class="count">${MIX_SIZE} случайных предложений ${lvl}</span></a>`;

  function renderList() {
    const always = hintsAlways();
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Строим предложение</h1><p class="muted">Вы пишете предложение по-немецки сами. Пока вы печатаете, схема заполняется: видно, какие части уже стоят верно и что должно идти дальше — подлежащее, глагол, время, конец… Если слово не подходит, подсказка сразу объяснит почему. Большие буквы и точка в конце не важны.</p></div>
      <section class="panel stack" style="gap:10px"><h3>Подсказки</h3>
        <div class="seg2" role="group"><button class="chip-t" data-act="sb-hints" data-id="on" aria-pressed="${always}">Показывать сразу</button><button class="chip-t" data-act="sb-hints" data-id="err" aria-pressed="${!always}">Только после ошибки</button></div></section>
      ${LEVELS.map((lv) => {
        const list = PATTERNS.filter((p) => p.lvl === lv);
        return list.length ? `<div class="sec-head"><h2>${lv}</h2></div><section class="packs">${list.map(card).join('')}${mixCard(lv)}</section>` : '';
      }).join('')}`;
  }

  /* При наборе обновляем только схему и подсказку, чтобы поле ввода не теряло фокус. */
  function onType(input) {
    if (!s || s.solved) return;
    s = { ...s, draft: input.value };
    const live = document.getElementById('sbLive');
    if (live) live.innerHTML = liveBlock(input.value);
  }

  function insertChar(c) {
    const input = document.getElementById('sbInput');
    if (!input) return;
    const a = input.selectionStart ?? input.value.length;
    const b = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, a) + c + input.value.slice(b);
    input.focus();
    input.setSelectionRange(a + 1, a + 1);
    onType(input);
  }

  D.register({
    views: { builder: renderList, sb: (id) => renderRound(id || '') },
    prefixes: [['sb-', 'sb']],
    nav: { builder: 'practice', sb: 'practice' },
    actions: {
      'sb-hints': (el) => { saveExt({ hints: el.dataset.id }); D.render(); },
      'sb-ins': (el) => insertChar(el.dataset.c),
      'sb-hint': () => { s = { ...s, peek: true, draft: readDraft() }; D.render(); },
      'sb-word': () => nextWord(),
      'sb-giveup': () => giveUp(),
      'sb-accept': () => { s = { ...s, errs: Math.max(0, s.errs - 1) }; solve({ fb: null }); D.render(); },
      'sb-next': () => next(),
      'sb-again': () => { start(s.id); D.render(); window.scrollTo(0, 0); },
    },
    hooks: {
      input: (ev) => { if (ev.target.id === 'sbInput') onType(ev.target); },
      submit: (ev) => { if (ev.target.matches('[data-form="sb"]')) { ev.preventDefault(); check(); } },
      keydown: (ev) => {
        if (ev.key !== 'Enter' || ev.target.closest('button, input, textarea')) return;
        const btn = document.getElementById('sbNext');
        if (btn) { ev.preventDefault(); btn.click(); }
      },
      afterRender: () => {
        if (!location.hash.startsWith('#sb-') || !s || s.solved || s.done) return;
        const input = document.getElementById('sbInput');
        if (input && (s.draft || s.i > 0 || s.errs)) { input.focus({ preventScroll: true }); input.setSelectionRange(input.value.length, input.value.length); }
      },
    },
  });

  /* Новый заход в схему начинается заново. */
  window.addEventListener('hashchange', () => { if (s && location.hash !== `#sb-${s.id}`) s = null; });
})();
