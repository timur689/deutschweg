/* Deutschweg — репетитор немецкого A1.1 → B1.2.
   Прогресс: localStorage + (если доступно) личный документ в db артефакта. */
(() => {
  'use strict';

  const LEVELS = window.DE_LEVELS || [];
  const INTERVALS = [0, 1, 3, 7, 16, 35, 90]; // дни до следующего повторения по «коробкам»
  const KNOWN_BOX = 4;
  const DAILY_GOAL = 30;
  const PASS_RATIO = 0.6;
  const REVIEW_LIMIT = 25;
  const ARTICLE_ROUND = 20;
  const STORE_KEY = 'deutschweg-progress-v1';
  const SYNC_DELAY_MS = 1500;
  const ARTS = ['der', 'die', 'das'];

  /* ---------- индекс данных ---------- */
  const UNITS = [];
  const UNIT = {};
  const RULE = {};
  const WORD = {};
  const WORDS = [];

  function parseWord(raw, unitId, levelId) {
    const [de, extra, ru] = raw.split('|');
    const m = de.match(/^(der|die|das) (.+)$/);
    return {
      key: de, de, ru,
      art: m ? m[1] : null,
      noun: m ? m[2] : null,
      pl: m ? extra : '',
      forms: m ? '' : extra,
      pos: window.DE_POS ? window.DE_POS(de, m ? '' : extra, m ? m[1] : null) : (m ? 'noun' : 'adj'),
      unit: unitId, level: levelId,
    };
  }
  const POS_LABELS = window.DE_POS_LABELS || {};
  const POS_SHORT = window.DE_POS_SHORT || {};

  LEVELS.forEach((L) => {
    L.rules.forEach((r) => { RULE[r.id] = { ...r, level: L.id }; });
    L.units.forEach((u, i) => {
      const words = u.w.map((s) => parseWord(s, u.id, L.id));
      const unit = { ...u, level: L.id, num: i + 1, words };
      words.forEach((w) => { if (!WORD[w.key]) { WORD[w.key] = w; WORDS.push(w); } });
      UNITS.push(unit);
      UNIT[u.id] = unit;
    });
  });

  /* Словарные наборы уровня: только слова, без грамматики и предложений. */
  const PACK = {};
  const LEVEL_PACKS = {};
  const PACK_SOURCE = window.DE_PACKS || {};
  LEVELS.forEach((L) => {
    LEVEL_PACKS[L.id] = (PACK_SOURCE[L.id] || []).map((p, i) => {
      const words = p.w.map((s) => parseWord(s, p.id, L.id));
      words.forEach((w) => { if (!WORD[w.key]) { WORD[w.key] = w; WORDS.push(w); } });
      const pack = { ...p, level: L.id, num: i + 1, words, isPack: true };
      PACK[p.id] = pack;
      return pack;
    });
  });
  const group = (id) => UNIT[id] || PACK[id];
  const groupHref = (g) => (g.isPack ? `#pack-${g.id}` : `#unit-${g.id}`);

  /* ---------- утилиты ---------- */
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const asObj = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startOfDay(t = Date.now()) { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function addDays(t, n) { const d = new Date(t); d.setDate(d.getDate() + n); return d.getTime(); }
  function dayKey(t = Date.now()) {
    const d = new Date(t);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function plural(n, one, few, many) {
    const m10 = n % 10; const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }

  const SPEAKER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const speakBtn = (text) => `<button class="icon-btn" data-act="speak" data-text="${esc(text)}" aria-label="Произнести: ${esc(text)}" title="Послушать">${SPEAKER}</button>`;

  /** Слово с цветным артиклем. */
  function wordHtml(w) {
    if (!w.art) return `<span class="wd">${esc(w.de)}</span>`;
    return `<span class="wd"><span class="a a-${w.art}">${w.art}</span> ${esc(w.noun)}</span>`;
  }
  function wordExtra(w) {
    if (w.art) {
      if (w.pl === 'Pl') return 'только мн. ч.';
      if (w.pl === '-' || !w.pl) return 'нет мн. ч.';
      return `мн. ч.: die ${esc(w.pl)}`;
    }
    return w.forms ? esc(w.forms) : '';
  }

  /* ---------- прогресс ---------- */
  function freshState() { return { v: 1, words: {}, units: {}, rules: {}, days: {}, ok: {}, ext: {}, updated: 0 }; }
  function normalizeState(s) {
    const o = asObj(s);
    return { v: 1, words: asObj(o.words), units: asObj(o.units), rules: asObj(o.rules), days: asObj(o.days), ok: asObj(o.ok), ext: asObj(o.ext), updated: Number(o.updated) || 0 };
  }
  /* Мост к приложению для Mac: сохранение в файл и системная озвучка. */
  /* Самостоятельная веб-версия (GitHub Pages): без ИИ-функций claude.ai. */
  const STANDALONE = window.DW_STANDALONE === true;
  const NATIVE = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.deutschweg;
  function loadNative() {
    try { return window.__DEUTSCHWEG_SAVED__ ? normalizeState(JSON.parse(window.__DEUTSCHWEG_SAVED__)) : null; } catch (e) { return null; }
  }
  function loadLocal() {
    let fromStorage = null;
    try { const raw = localStorage.getItem(STORE_KEY); fromStorage = raw ? normalizeState(JSON.parse(raw)) : null; } catch (e) { fromStorage = null; }
    const fromNative = loadNative();
    if (fromNative && (!fromStorage || fromNative.updated >= fromStorage.updated)) return fromNative;
    return fromStorage;
  }
  function saveLocal() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* хранилище недоступно — работаем в памяти */ }
    if (NATIVE) {
      try { NATIVE.postMessage({ type: 'save', json: JSON.stringify(state) }); } catch (e) { console.warn('Deutschweg: не удалось сохранить файл прогресса'); }
    }
  }

  let state = loadLocal() || freshState();
  let remoteDoc = null;
  let syncStatus = NATIVE ? 'native' : 'local';
  let syncTimer = null;
  let writing = false;
  let writeAgain = false;

  function commit() {
    state.updated = Date.now();
    saveLocal();
    if (remoteDoc) { clearTimeout(syncTimer); syncTimer = setTimeout(pushRemote, SYNC_DELAY_MS); }
  }

  async function pushRemote() {
    if (!remoteDoc) return;
    if (writing) { writeAgain = true; return; }
    writing = true;
    try {
      await remoteDoc.set({ json: JSON.stringify(state), updated: state.updated });
      syncStatus = 'cloud';
    } catch (e) {
      syncStatus = 'error';
      console.warn('Deutschweg: не удалось сохранить прогресс в аккаунте', e && e.code);
    } finally {
      writing = false;
      renderStats();
      if (writeAgain) { writeAgain = false; pushRemote(); }
    }
  }

  async function connectRemote() {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return;
      const id = await user.id();
      if (!id) return;
      remoteDoc = db.collection(`data/users/${id}`).doc('progress');
      const snap = await remoteDoc.get();
      const data = snap.exists ? snap.data() : null;
      const remoteUpdated = data ? Number(data.updated) || 0 : 0;
      if (data && remoteUpdated > state.updated) {
        state = normalizeState(JSON.parse(String(data.json || '{}')));
        saveLocal();
        syncStatus = 'cloud';
        if (!session) render();
      } else if (state.updated > remoteUpdated) {
        await pushRemote();
      } else {
        syncStatus = 'cloud';
      }
      renderStats();
    } catch (e) {
      syncStatus = 'error';
      console.warn('Deutschweg: синхронизация недоступна', e && e.code);
      renderStats();
    }
  }

  function countAnswer() {
    const k = dayKey();
    state.days = { ...state.days, [k]: (state.days[k] || 0) + 1 };
  }

  function gradeWord(key, ok) {
    const cur = state.words[key] || { b: 0, d: 0, r: 0, x: 0 };
    const b = ok ? Math.min(cur.b + 1, INTERVALS.length - 1) : 1;
    if (ok) { const k = dayKey(); state.ok = { ...asObj(state.ok), [k]: (asObj(state.ok)[k] || 0) + 1 }; }
    state.words = { ...state.words, [key]: { ...cur, b, d: addDays(startOfDay(), INTERVALS[b]), r: cur.r + (ok ? 1 : 0), x: cur.x + (ok ? 0 : 1) } };
  }

  /** Учитывает верный/неверный ответ для статистики, не меняя интервал повторения. */
  function noteWord(key, ok) {
    const cur = state.words[key] || { b: 0, d: 0, r: 0, x: 0 };
    state.words = { ...state.words, [key]: { ...cur, r: cur.r + (ok ? 1 : 0), x: cur.x + (ok ? 0 : 1) } };
    const k = dayKey();
    if (ok) state.ok = { ...asObj(state.ok), [k]: (asObj(state.ok)[k] || 0) + 1 };
  }

  /** Объединяет два прогресса: берёт лучшее из обоих (для переноса между устройствами). */
  function mergeState(a, b) {
    const words = { ...a.words };
    Object.entries(b.words).forEach(([k, w]) => {
      const cur = words[k];
      words[k] = !cur || (w.b || 0) > (cur.b || 0) ? { ...w, r: Math.max(w.r || 0, cur ? cur.r || 0 : 0), x: Math.max(w.x || 0, cur ? cur.x || 0 : 0) } : cur;
    });
    const units = { ...a.units };
    Object.entries(b.units).forEach(([k, u]) => { units[k] = { ...(units[k] || {}), ...u }; });
    const rules = { ...a.rules };
    Object.entries(b.rules).forEach(([k, v]) => { rules[k] = Math.max(rules[k] || 0, Number(v) || 0); });
    const maxMap = (x, y) => { const out = { ...x }; Object.entries(y).forEach(([k, v]) => { out[k] = Math.max(out[k] || 0, Number(v) || 0); }); return out; };
    return { ...a, words, units, rules, days: maxMap(a.days, b.days), ok: maxMap(asObj(a.ok), asObj(b.ok)), ext: { ...asObj(b.ext), ...asObj(a.ext) }, updated: Date.now() };
  }

  function learnWord(key, firstTry) {
    const cur = state.words[key] || { b: 0, d: 0, r: 0, x: 0 };
    const target = firstTry ? 2 : 1;
    if (cur.b >= target) return;
    state.words = { ...state.words, [key]: { ...cur, b: target, d: addDays(startOfDay(), INTERVALS[target]) } };
  }

  function wordStatus(key) {
    const p = state.words[key];
    if (!p || !p.b) return { cls: '', label: 'новое' };
    if (p.b >= KNOWN_BOX) return { cls: 'k', label: 'выучено' };
    return { cls: 'l', label: 'учу' };
  }

  const dueWords = () => WORDS.filter((w) => { const p = state.words[w.key]; return p && p.b > 0 && p.d <= Date.now(); });
  const startedWords = () => WORDS.filter((w) => (state.words[w.key] || {}).b > 0);

  function streak() {
    let t = startOfDay();
    if (!state.days[dayKey(t)]) t = addDays(t, -1);
    let n = 0;
    while (state.days[dayKey(t)]) { n += 1; t = addDays(t, -1); }
    return n;
  }

  function unitSteps(u) {
    const s = state.units[u.id] || {};
    if (s.skip) return { w: true, g: true, s: true };
    const g = u.r.every((id) => (state.rules[id] || 0) >= PASS_RATIO);
    return { w: !!s.w, g, s: !!s.s };
  }
  const unitDone = (u) => { const s = unitSteps(u); return s.w && s.g && s.s; };
  const nextUnit = () => UNITS.find((u) => !unitDone(u)) || null;
  function setUnitStep(id, step) {
    state.units = { ...state.units, [id]: { ...(state.units[id] || {}), [step]: 1 } };
  }
  const packDone = (p) => !!(state.units[p.id] || {}).w;
  function levelProgress(L) {
    const units = UNITS.filter((u) => u.level === L.id);
    const packs = LEVEL_PACKS[L.id] || [];
    const done = units.reduce((n, u) => { const s = unitSteps(u); return n + (s.w ? 1 : 0) + (s.g ? 1 : 0) + (s.s ? 1 : 0); }, 0)
      + packs.filter(packDone).length;
    const total = units.length * 3 + packs.length;
    return total ? done / total : 0;
  }
  const startedIn = (words) => words.filter((w) => (state.words[w.key] || {}).b > 0).length;

  /* ---------- озвучка ---------- */
  let ttsPromise = null;
  let ttsBlocked = false;
  function getTts() {
    if (!ttsPromise) {
      ttsPromise = window.claude && typeof window.claude.use === 'function'
        ? window.claude.use('tts').catch(() => null)
        : Promise.resolve(null);
    }
    return ttsPromise;
  }
  function browserSpeak(text, rate = 0.9) {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      const voice = synth.getVoices().find((v) => /^de(-|_|$)/i.test(v.lang));
      if (voice) u.voice = voice;
      u.rate = rate;
      synth.speak(u);
    } catch (e) { /* озвучка недоступна */ }
  }
  async function speak(text, opts = {}) {
    const rate = opts.rate || 1;
    if (NATIVE) {
      try { NATIVE.postMessage({ type: 'speak', text }); return; } catch (e) { /* падаем на озвучку браузера */ }
    }
    const t = ttsBlocked ? null : await getTts();
    if (!t) { browserSpeak(text, 0.9 * rate); return; }
    try {
      await t.speak(text, { language: 'de-DE', rate });
    } catch (e) {
      if (e && (e.code === 'not_granted' || e.code === 'unavailable')) ttsBlocked = true;
      if (e && e.code !== 'replaced' && e.code !== 'stopped') browserSpeak(text, 0.9 * rate);
    }
  }

  /* ---------- маршрутизация ---------- */
  let session = null;
  let ruleQuiz = { id: null, picks: {} };
  let ui = { level: null, dictQuery: '', dictLevel: 'all', dictPos: 'all', artLevel: 'learned', rulesLevel: 'all', confirmReset: false };

  /* Расширения (practice.js, reading.js, exam.js, tutor.js) регистрируют свои экраны и действия. */
  const EXT = { views: {}, prefixes: [], actions: {}, nav: {}, hooks: { input: [], change: [], submit: [], keydown: [], afterRender: [] } };

  function route() {
    const h = (location.hash || '').replace(/^#/, '');
    if (h.startsWith('unit-') && UNIT[h.slice(5)]) return { view: 'unit', id: h.slice(5) };
    if (h.startsWith('rule-') && RULE[h.slice(5)]) return { view: 'rule', id: h.slice(5) };
    if (h.startsWith('pack-') && PACK[h.slice(5)]) return { view: 'pack', id: h.slice(5) };
    if (['review', 'rules', 'dict', 'articles'].includes(h)) return { view: h };
    if (EXT.views[h]) return { view: h };
    const pre = EXT.prefixes.find(([p]) => h.startsWith(p));
    if (pre) return { view: pre[1], id: h.slice(pre[0].length) };
    return { view: 'path' };
  }

  const CORE_VIEWS = { path: () => renderPath(), unit: (id) => renderUnit(id), pack: (id) => renderPack(id), rule: (id) => renderRule(id), review: () => renderReview(), rules: () => renderRules(), dict: () => renderDict(), articles: () => renderArticles() };

  function render() {
    syncCustomWords();
    const app = $('#app');
    if (session) {
      app.innerHTML = renderSession();
      const input = $('#typeInput');
      if (input) input.focus();
    } else {
      const r = route();
      const view = CORE_VIEWS[r.view] || EXT.views[r.view] || CORE_VIEWS.path;
      app.innerHTML = view(r.id);
    }
    renderStats();
    markNav();
    EXT.hooks.afterRender.forEach((fn) => fn());
  }

  function markNav() {
    const r = route();
    const active = session ? null : ({ unit: 'path', pack: 'path', rule: 'rules', articles: 'practice' }[r.view] || EXT.nav[r.view] || r.view);
    document.querySelectorAll('[data-nav]').forEach((a) => {
      if (a.dataset.nav === active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function renderStats() {
    const due = dueWords().length;
    const syncText = { native: 'Сохраняется на этом Mac', cloud: 'Сохранено в аккаунте', local: STANDALONE ? 'Сохраняется на этом устройстве' : 'Сохраняется в браузере', error: 'Нет связи — сохраняю в браузере' }[syncStatus];
    const sync = $('#sync');
    sync.className = `sync ${syncStatus === 'native' || syncStatus === 'cloud' ? 'on' : ''}`;
    sync.querySelector('span').textContent = syncText;
    sync.title = syncText;
    const badge = $('#dueCount');
    badge.hidden = due === 0;
    badge.textContent = due > 99 ? '99+' : String(due);
  }

  /* ---------- вид: путь ---------- */
  const FLAME = '<svg class="flame" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5c.6 3.2 4.8 5.6 4.8 10.4A4.8 4.8 0 0 1 12 17.7a4.8 4.8 0 0 1-4.8-4.8c0-2 1-3.5 2.1-4.6.2 1.5.9 2.6 1.9 3.1-.1-3.6.4-6.4.8-8.9z"/><path d="M12 21.5c-3.6 0-6.3-2.4-6.3-5.6 0-.7.1-1.3.3-1.9a6.8 6.8 0 0 0 6 3.6 6.8 6.8 0 0 0 6-3.6c.2.6.3 1.2.3 1.9 0 3.2-2.7 5.6-6.3 5.6z" opacity=".55"/></svg>';
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function renderPath() {
    const next = nextUnit();
    const due = dueWords().length;
    const today = state.days[dayKey()] || 0;
    const started = startedWords().length;
    const s = streak();
    const levelId = ui.level || (next ? next.level : LEVELS[0].id);
    const L = LEVELS.find((l) => l.id === levelId) || LEVELS[0];
    const units = UNITS.filter((u) => u.level === L.id);
    const packs = LEVEL_PACKS[L.id] || [];
    const goalPct = Math.min(100, Math.round((today / DAILY_GOAL) * 100));
    const wordsPct = Math.round((started / WORDS.length) * 100);

    return `
      ${heroCard(next)}
      ${due ? `<a class="cta-due" href="#review"><span>Повторить ${due} ${plural(due, 'слово', 'слова', 'слов')}<small>Пора освежить — так они останутся в памяти</small></span>${ARROW}</a>` : ''}
      <section class="wall" aria-label="Статистика">
        <a class="pane link" href="#stats"><span class="pane-title">Серия</span><div class="row" style="gap:8px">${FLAME}<span class="num big">${s}<small>${plural(s, 'день', 'дня', 'дней')}</small></span></div></a>
        <a class="pane link" href="#stats"><div class="fill f-gold" style="--fill:${goalPct}%"></div><span class="pane-title">Сегодня</span><span class="num big">${today}<small>/ ${DAILY_GOAL}</small></span></a>
        <a class="pane link" href="#stats"><div class="fill f-der" style="--fill:${Math.max(wordsPct, started ? 4 : 0)}%"></div><span class="pane-title">Слова в работе</span><span class="num big">${started}<small>/ ${WORDS.length}</small></span></a>
      </section>

      <div class="sec-head"><h2>Уровень</h2><span class="small muted">${Math.round(levelProgress(L) * 100)}% пройдено</span></div>
      <div class="levels" role="group" aria-label="Уровень">
        ${LEVELS.map((l) => `<button class="lv" data-act="level" data-id="${l.id}" aria-pressed="${l.id === L.id}">${l.id}<span class="mini"><i style="width:${Math.round(levelProgress(l) * 100)}%"></i></span></button>`).join('')}
      </div>
      <p class="small muted level-desc"><b>${esc(L.title)}.</b> ${esc(L.desc)}</p>

      <div class="sec-head"><h2>Уроки</h2><span class="small muted">слова · грамматика · предложения</span></div>
      <section class="panel units">${units.map((u) => unitRow(u, next)).join('')}</section>

      <div class="sec-head"><h2>Слова уровня ${L.id}</h2><span class="small muted">${packs.reduce((n, p) => n + p.words.length, 0)} слов в ${packs.length} наборах</span></div>
      <section class="packs">${packs.map(packCard).join('')}</section>

      <section class="panel stack" style="gap:12px">
        <h3>Как заниматься</h3>
        <p class="small">Урок — это три шага: <b>слова</b> с артиклем и мн. ч., <b>грамматика</b> с коротким тестом и <b>предложения</b>, которые вы собираете сами. Наборы «Слова уровня» добавляют лексику, которую нужно знать на этом уровне. Всё изученное попадает в <b>повторение</b> через 1, 3, 7, 16, 35 и 90 дней. Хватит и 10–15 минут в день.</p>
        <div class="legend"><div><b class="art-der">der</b>мужской род</div><div><b class="art-die">die</b>женский род и мн. ч.</div><div><b class="art-das">das</b>средний род</div></div>
      </section>

      <section class="small muted" style="margin:0 6px">
        ${ui.confirmReset
          ? '<div class="confirm"><span>Удалить весь прогресс? Это нельзя отменить.</span><button class="btn small" data-act="reset-yes">Да, удалить</button><button class="btn ghost small" data-act="reset-no">Отмена</button></div>'
          : '<button class="btn ghost small" data-act="reset-ask">Сбросить прогресс</button>'}
      </section>`;
  }

  function heroCard(next) {
    if (!next) {
      return `<section class="panel hero"><p class="eyebrow">Все уроки пройдены</p><h1>Курс A1.1 – B1.2 завершён</h1>
        <p class="muted">Повторяйте слова и проходите наборы «Слова уровня», чтобы ничего не забыть.</p></section>`;
    }
    const st = unitSteps(next);
    return `<section class="panel hero">
      <p class="eyebrow">${next.level} · Урок ${next.num}</p>
      <h1>${esc(next.t)}</h1>
      <div class="hero-steps"><span class="${st.w ? 'on' : ''}">Слова</span><span class="${st.g ? 'on' : ''}">Грамматика</span><span class="${st.s ? 'on' : ''}">Предложения</span></div>
      <p class="muted">${unitStepText(next)}</p>
      <div class="row"><a class="btn primary" href="#unit-${next.id}">${unitStarted(next) ? 'Продолжить урок' : 'Начать урок'} ${ARROW}</a>${next === UNITS[0] && !unitStarted(next) ? '<a class="btn ghost" href="#placement">Уже знаю немецкий — тест на уровень</a>' : ''}</div>
    </section>`;
  }

  function packCard(p) {
    const n = startedIn(p.words);
    const done = packDone(p);
    const pct = Math.round((n / p.words.length) * 100);
    return `<a class="pane pack ${done ? 'done' : ''}" href="#pack-${p.id}">
      <div class="fill f-das" style="--fill:${pct}%"></div>
      <span class="pane-title">Набор ${p.num}</span>
      <span class="pane-big">${esc(p.t)}</span>
      <span class="count">${done ? '✓ ' : ''}${n} / ${p.words.length} слов</span>
    </a>`;
  }

  function unitStarted(u) { const s = unitSteps(u); return s.w || s.g || s.s; }
  function unitStepText(u) {
    const s = unitSteps(u);
    if (!s.w) return `${u.words.length} новых слов, ${u.r.length} ${plural(u.r.length, 'правило', 'правила', 'правил')}, ${u.s.length} предложений.`;
    if (!s.g) return 'Слова пройдены. Дальше — грамматика.';
    if (!s.s) return 'Осталось собрать предложения.';
    return 'Урок пройден.';
  }
  function unitRow(u, next) {
    const s = unitSteps(u);
    const done = s.w && s.g && s.s;
    const cls = ['unit', done ? 'done' : '', next && next.id === u.id ? 'next' : ''].join(' ');
    return `<a class="${cls}" href="#unit-${u.id}">
      <span class="n">${done ? '✓' : u.num}</span>
      <span><span class="t">${esc(u.t)}</span><span class="sub">${u.words.length} слов · ${u.r.map((id) => esc(RULE[id].t)).join(' · ')}</span></span>
      <span class="dots" aria-label="Шаги урока"><i class="${s.w ? 'on' : ''}" title="Слова"></i><i class="${s.g ? 'on' : ''}" title="Грамматика"></i><i class="${s.s ? 'on' : ''}" title="Предложения"></i></span>
    </a>`;
  }

  function wordGrid(words) {
    return `<div class="words">${words.map((w) => {
      const st = wordStatus(w.key);
      return `<div class="word"><div>${wordHtml(w)}<div class="pl">${wordExtra(w)}</div><div class="ru">${esc(w.ru)}</div>${st.cls ? `<span class="st ${st.cls}">${st.label}</span>` : ''}</div>${speakBtn(w.de)}</div>`;
    }).join('')}</div>`;
  }

  /* ---------- вид: урок ---------- */
  function renderUnit(id) {
    const u = UNIT[id];
    const s = unitSteps(u);
    const nextU = UNITS[UNITS.indexOf(u) + 1];
    return `
      <a class="back" href="#path">← Все уроки</a>
      <div class="page-head"><p class="eyebrow">${u.level} · Урок ${u.num}</p><h1>${esc(u.t)}</h1></div>

      <section class="panel step">
        <div class="step-head"><h2><span class="check ${s.w ? 'on' : ''}">${s.w ? '✓' : '1'}</span>Слова</h2>
          <button class="btn primary" data-act="learn" data-id="${u.id}">${s.w ? 'Потренировать ещё' : 'Учить слова'}</button></div>
        <p class="small muted">Прочитайте и послушайте слова. Существительные запоминайте вместе с артиклем — по цвету.</p>
        ${wordGrid(u.words)}
      </section>

      <section class="panel step">
        <div class="step-head"><h2><span class="check ${s.g ? 'on' : ''}">${s.g ? '✓' : '2'}</span>Грамматика</h2></div>
        <p class="small muted">Прочитайте правило и пройдите тест. Шаг засчитывается от ${Math.round(PASS_RATIO * 100)}% верных ответов.</p>
        <div class="rule-links">${u.r.map((rid) => ruleLink(rid)).join('')}</div>
      </section>

      <section class="panel step">
        <div class="step-head"><h2><span class="check ${s.s ? 'on' : ''}">${s.s ? '✓' : '3'}</span>Предложения</h2>
          <button class="btn primary" data-act="build" data-id="${u.id}">${s.s ? 'Написать ещё раз' : 'Написать предложения'}</button></div>
        <p class="small muted">Напишите предложение по-немецки по переводу. Если не получается, нажмите «Подсказка» — появятся нужные слова. Следите, где стоит глагол — это главное в немецком порядке слов.</p>
      </section>

      ${nextU ? `<div class="row"><a class="btn" href="#unit-${nextU.id}">Следующий урок: ${esc(nextU.t)} ${ARROW}</a></div>` : ''}`;
  }

  /* ---------- вид: набор слов ---------- */
  function renderPack(id) {
    const p = PACK[id];
    const list = LEVEL_PACKS[p.level];
    const nextP = list[list.indexOf(p) + 1];
    const n = startedIn(p.words);
    return `
      <a class="back" href="#path">← ${p.level}</a>
      <div class="page-head"><p class="eyebrow">Слова уровня ${p.level} · Набор ${p.num}</p><h1>${esc(p.t)}</h1>
        <p class="muted">${p.words.length} слов, в работе ${n}. Сначала послушайте и прочитайте, потом тренируйте.</p></div>
      <section class="panel step">
        <div class="step-head"><h2><span class="check ${packDone(p) ? 'on' : ''}">${packDone(p) ? '✓' : p.num}</span>Слова набора</h2>
          <button class="btn primary" data-act="learn" data-id="${p.id}">${packDone(p) ? 'Потренировать ещё' : 'Учить слова'}</button></div>
        ${wordGrid(p.words)}
      </section>
      ${nextP ? `<div class="row"><a class="btn" href="#pack-${nextP.id}">Следующий набор: ${esc(nextP.t)} ${ARROW}</a></div>` : ''}`;
  }

  function ruleLink(rid) {
    const r = RULE[rid];
    const score = state.rules[rid];
    const pill = score === undefined ? '<span class="pill">не пройдено</span>'
      : `<span class="pill ${score >= PASS_RATIO ? 'ok' : ''}">${Math.round(score * 100)}%</span>`;
    return `<a class="rule-link" href="#rule-${rid}"><span><span class="eyebrow">${r.level}</span><br><b>${esc(r.t)}</b></span>${pill}</a>`;
  }

  /* ---------- вид: правило ---------- */
  function renderRule(id) {
    const r = RULE[id];
    if (ruleQuiz.id !== id) ruleQuiz = { id, picks: {} };
    const all = Object.values(RULE);
    const i = all.findIndex((x) => x.id === id);
    const prev = all[i - 1];
    const next = all[i + 1];
    const unit = UNITS.find((u) => u.r.includes(id));
    const answered = Object.keys(ruleQuiz.picks).length;
    const correct = r.q.filter((q, qi) => ruleQuiz.picks[qi] === q[2]).length;
    const body = r.b.replace(/<table>/g, '<div class="tbl"><table>').replace(/<\/table>/g, '</table></div>');

    const result = answered === r.q.length
      ? `<div class="fb ${correct / r.q.length >= PASS_RATIO ? 'ok' : 'bad'}"><span class="verdict">Результат: ${correct} из ${r.q.length}</span>
          <span class="small">${correct / r.q.length >= PASS_RATIO ? 'Правило засчитано.' : 'Перечитайте правило и попробуйте снова.'}</span>
          <div class="row"><button class="btn" data-act="quiz-reset">Пройти заново</button>${unit ? `<a class="btn primary" href="#unit-${unit.id}">К уроку «${esc(unit.t)}»</a>` : ''}</div></div>`
      : '';

    return `<div class="stack">
      <div class="row" style="justify-content:space-between"><a class="back" href="${unit ? `#unit-${unit.id}` : '#rules'}">← ${unit ? esc(unit.t) : 'Все правила'}</a><a class="back" href="#rules">Все правила</a></div>
      <div class="stack" style="gap:6px"><p class="eyebrow">${r.level} · Грамматика</p><h1>${esc(r.t)}</h1></div>
      <section class="panel rule-body">${body}</section>
      ${guideLinksFor(id)}
      <section class="panel stack">
        <h2>Проверьте себя</h2>
        <div class="quiz">${r.q.map((q, qi) => quizItem(q, qi)).join('')}</div>
        ${result}
      </section>
      <div class="row" style="justify-content:space-between">
        ${prev ? `<a class="btn ghost" href="#rule-${prev.id}">← ${esc(prev.t)}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#rule-${next.id}">${esc(next.t)} →</a>` : ''}
      </div>
    </div>`;
  }

  /* Методичка (guide-data.js): шпаргалки, связанные с правилом. */
  const guideList = () => (Array.isArray(window.DE_GUIDE) ? window.DE_GUIDE : []);
  function guideLinksFor(ruleId) {
    const items = guideList().filter((g) => Array.isArray(g.r) && g.r.includes(ruleId));
    if (!items.length) return '';
    return `<section class="stack" style="gap:10px"><h2>Шпаргалка в методичке</h2><div class="rule-links">${items.map((g) => `<a class="rule-link" href="#gd-${g.id}"><span><span class="eyebrow">${g.lvl} · Методичка</span><br><b>${esc(g.t)}</b></span><span class="pill">Как определить</span></a>`).join('')}</div></section>`;
  }

  function quizItem(q, qi) {
    const [text, opts, right] = q;
    const pick = ruleQuiz.picks[qi];
    const done = pick !== undefined;
    const filled = done ? `<b>${esc(opts[right])}</b>` : '';
    const sentence = esc(text).replace('___', `<span class="blank">${filled || '?'}</span>`);
    return `<div class="qitem"><div class="qtext">${sentence}</div><div class="opts">
      ${opts.map((o, oi) => {
        let cls = '';
        if (done && oi === right) cls = 'right';
        else if (done && oi === pick) cls = 'wrong';
        return `<button class="opt ${cls}" data-act="quiz" data-q="${qi}" data-o="${oi}" ${done ? 'disabled' : ''}>${esc(o)}</button>`;
      }).join('')}</div>${done && pick !== right && window.DW_whyBtn
        ? `<div>${window.DW_whyBtn({ level: RULE[ruleQuiz.id].level, task: `Тест к правилу «${RULE[ruleQuiz.id].t}»: ${text}`, user: opts[pick], right: opts[right] })}</div>` : ''}</div>`;
  }

  function answerQuiz(qi, oi) {
    const r = RULE[ruleQuiz.id];
    if (!r || ruleQuiz.picks[qi] !== undefined) return;
    ruleQuiz = { ...ruleQuiz, picks: { ...ruleQuiz.picks, [qi]: oi } };
    countAnswer();
    if (oi === r.q[qi][2]) clearMistake(`r:${r.id}:${qi}`); else noteMistake(`r:${r.id}:${qi}`, { t: 'r', rule: r.id, qi });
    if (Object.keys(ruleQuiz.picks).length === r.q.length) {
      const score = r.q.filter((q, i) => ruleQuiz.picks[i] === q[2]).length / r.q.length;
      state.rules = { ...state.rules, [r.id]: Math.max(state.rules[r.id] || 0, score) };
    }
    commit();
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
  }

  /* ---------- вид: все правила ---------- */
  function renderRules() {
    const levels = ui.rulesLevel === 'all' ? LEVELS : LEVELS.filter((l) => l.id === ui.rulesLevel);
    const passed = Object.values(RULE).filter((r) => (state.rules[r.id] || 0) >= PASS_RATIO).length;
    return `<div class="stack">
      <div class="stack" style="gap:6px"><h1>Грамматика по уровням</h1><p class="muted">${Object.keys(RULE).length} правил от A1.1 до B1.2, пройдено ${passed}. Каждое правило — с таблицами, примерами и тестом.</p></div>
      <div class="levels lv-wide" role="group" aria-label="Фильтр по уровню">
        <button class="lv" data-act="rules-level" data-id="all" aria-pressed="${ui.rulesLevel === 'all'}"><b>Все</b></button>
        ${LEVELS.map((l) => `<button class="lv" data-act="rules-level" data-id="${l.id}" aria-pressed="${ui.rulesLevel === l.id}"><b>${l.id}</b></button>`).join('')}
      </div>
      ${levels.map((l) => `<section class="stack" style="gap:10px">
        <div class="lvl-head">${l.id} <span>${esc(l.title)}</span></div>
        <div class="rule-links">${l.rules.map((r) => ruleLink(r.id)).join('')}</div></section>`).join('')}
    </div>`;
  }

  /* ---------- вид: повторение ---------- */
  function renderReview() {
    const due = dueWords();
    const started = startedWords();
    if (!started.length) {
      return `<div class="stack"><h1>Повторение</h1><div class="panel empty">
        <p>Здесь появятся слова, которые вы начали учить. Пройдите шаг «Слова» в первом уроке — и через день они придут на повторение.</p>
        <p style="margin-top:14px"><a class="btn primary" href="#unit-${UNITS[0].id}">Открыть первый урок</a></p></div></div>`;
    }
    const upcoming = started.filter((w) => state.words[w.key].d > Date.now()).sort((a, b) => state.words[a.key].d - state.words[b.key].d);
    const nextDue = upcoming[0] ? new Date(state.words[upcoming[0].key].d) : null;
    return `<div class="stack">
      <div class="stack" style="gap:6px"><h1>Повторение</h1>
        <p class="muted">Слова возвращаются через растущие промежутки: 1 → 3 → 7 → 16 → 35 → 90 дней. Ошибка — и слово снова придёт завтра.</p></div>
      <section class="panel stack" style="gap:12px">
        ${due.length
          ? `<h2>Сегодня к повторению: ${due.length} ${plural(due.length, 'слово', 'слова', 'слов')}</h2>
             <div class="row"><button class="btn primary" data-act="review">Начать повторение${due.length > REVIEW_LIMIT ? ` (${REVIEW_LIMIT})` : ''}</button></div>`
          : `<h2>На сегодня всё повторено</h2><p class="muted">${nextDue ? `Следующие слова придут ${nextDue.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}.` : ''} Можно потренировать изученные слова дополнительно.</p>
             <div class="row"><button class="btn" data-act="review-extra">Тренировать 20 случайных слов</button></div>`}
      </section>
      <section class="stack" style="gap:10px">
        <h3>Ваши слова</h3>
        <div class="panel dict">${started.slice().sort((a, b) => state.words[a.key].d - state.words[b.key].d).map(dictRow).join('')}</div>
      </section>
    </div>`;
  }

  /* ---------- вид: словарь ---------- */
  function renderDict() {
    return `<div class="stack">
      <nav class="seg2 tabs" aria-label="Словарь и переводчик"><a class="chip-t" href="#dict" aria-current="page">Словарь</a><a class="chip-t" href="#translate">Переводчик</a></nav>
      <div class="stack" style="gap:6px"><h1>Словарь</h1><p class="muted">Все ${WORDS.length} слов курса с артиклями и множественным числом.</p></div>
      <div class="toolbar">
        <input id="dictSearch" type="search" placeholder="Поиск по-немецки или по-русски" value="${esc(ui.dictQuery)}" aria-label="Поиск">
        <select id="dictLevel" aria-label="Уровень"><option value="all">Все уровни</option><option value="my" ${ui.dictLevel === 'my' ? 'selected' : ''}>Мои слова</option>${LEVELS.map((l) => `<option value="${l.id}" ${ui.dictLevel === l.id ? 'selected' : ''}>${l.id}</option>`).join('')}</select>
      </div>
      <div class="seg2" role="group" aria-label="Часть речи" id="dictPos">${posChips()}</div>
      <div class="panel dict" id="dictList">${dictRows()}</div>
    </div>`;
  }
  function posChips() {
    const inLevel = WORDS.filter((w) => ui.dictLevel === 'all' || w.level === ui.dictLevel);
    const count = (p) => inLevel.filter((w) => w.pos === p).length;
    return [['all', 'Все', inLevel.length], ...Object.keys(POS_LABELS).map((p) => [p, POS_LABELS[p], count(p)])]
      .filter(([, , n]) => n > 0)
      .map(([id, label, n]) => `<button class="chip-t" data-act="dict-pos" data-id="${id}" aria-pressed="${ui.dictPos === id}">${label} <span class="cnt">${n}</span></button>`).join('');
  }
  function dictRows() {
    const q = ui.dictQuery.trim().toLowerCase();
    const list = WORDS.filter((w) => (ui.dictLevel === 'all' || w.level === ui.dictLevel)
      && (ui.dictPos === 'all' || w.pos === ui.dictPos)
      && (!q || w.de.toLowerCase().includes(q) || w.ru.toLowerCase().includes(q)));
    return list.length ? list.map(dictRow).join('') : '<div class="empty">Ничего не найдено. Попробуйте другое слово или другой фильтр.</div>';
  }
  function dictRow(w) {
    const st = wordStatus(w.key);
    const extra = wordExtra(w);
    return `<div class="drow"><div>${wordHtml(w)}<div class="pl"><span class="pos">${POS_SHORT[w.pos] || ''}</span>${extra ? ` · ${extra}` : ''}</div></div>
      <div class="ru small">${esc(w.ru)}</div>
      <div class="acts row" style="gap:4px;flex-wrap:nowrap"><span class="st ${st.cls}">${st.label}</span>${speakBtn(w.de)}</div></div>`;
  }

  /* ---------- вид: артикли ---------- */
  function articlePool(level) {
    const nouns = WORDS.filter((w) => w.art);
    if (level === 'learned') return nouns.filter((w) => (state.words[w.key] || {}).b > 0);
    if (level === 'all') return nouns;
    return nouns.filter((w) => w.level === level);
  }
  function renderArticles() {
    const pool = articlePool(ui.artLevel);
    const opts = [['learned', 'Мои слова'], ['all', 'Все уровни'], ...LEVELS.map((l) => [l.id, l.id])];
    return `<div class="stack">
      <div class="stack" style="gap:6px"><h1>Тренажёр артиклей</h1><p class="muted">Быстрый раунд: ${ARTICLE_ROUND} существительных, выбирайте der, die или das. Клавиши 1, 2, 3 работают.</p></div>
      <div class="levels lv-wide" role="group" aria-label="Набор слов">
        ${opts.map(([id, label]) => `<button class="lv" data-act="art-level" data-id="${id}" aria-pressed="${ui.artLevel === id}"><b>${label}</b><span class="small muted">${articlePool(id).length} сущ.</span></button>`).join('')}
      </div>
      <div class="row"><button class="btn primary" data-act="articles" ${pool.length ? '' : 'disabled'}>Начать раунд</button>
        ${pool.length ? '' : '<span class="small muted">В «Моих словах» пока пусто — выберите уровень или пройдите шаг «Слова».</span>'}</div>
      <section class="panel stack" style="gap:10px">
        <h3>Подсказки по окончаниям</h3>
        <div class="legend small">
          <div><b class="art-die">die</b><span>-ung, -heit, -keit, -schaft, -ion, -tät, -ie, -ik, часто -e</span></div>
          <div><b class="art-das">das</b><span>-chen, -lein, -um, -ment, -ma, инфинитивы</span></div>
          <div><b class="art-der">der</b><span>-er (люди), -ling, -ismus, дни, месяцы, времена года</span></div>
        </div>
        <p class="small muted">Подсказки работают часто, но не всегда. Надёжнее всего — учить каждое слово с артиклем.</p>
      </section>
    </div>`;
  }

  /* ---------- сессии ---------- */
  function wordOptions(w, field) {
    const sameKind = WORDS.filter((x) => x.key !== w.key && !!x.art === !!w.art);
    const near = sameKind.filter((x) => x.level === w.level);
    const pool = near.length >= 6 ? near : sameKind;
    const seen = new Set([w[field]]);
    const out = [];
    shuffle(pool).some((x) => { if (!seen.has(x[field])) { seen.add(x[field]); out.push(x[field]); } return out.length >= 3; });
    return shuffle([w[field], ...out]);
  }

  function makeWordQ(w, t) {
    if (t === 'de2ru') return { t, key: w.key, opts: wordOptions(w, 'ru') };
    if (t === 'ru2de') return { t, key: w.key, opts: wordOptions(w, 'de') };
    return { t, key: w.key };
  }

  function openSession(s) {
    session = { i: 0, phase: 'ask', fb: null, first: {}, correct: 0, total: 0, ...s };
    window.scrollTo(0, 0);
    render();
  }

  function startLearn(groupId) {
    const g = group(groupId);
    if (!g) return;
    const round1 = shuffle(g.words).map((w) => makeWordQ(w, w.art ? 'art' : 'de2ru'));
    const round2 = shuffle(g.words).map((w) => makeWordQ(w, 'type'));
    openSession({ kind: 'learn', unitId: groupId, title: `Слова: ${g.t}`, items: [...round1, ...round2], back: groupHref(g) });
  }

  function reviewQ(w) {
    const types = w.art ? ['type', 'type', 'art', 'ru2de'] : ['type', 'ru2de', 'de2ru'];
    return makeWordQ(w, types[Math.floor(Math.random() * types.length)]);
  }
  function startReview(extra) {
    const list = extra ? shuffle(startedWords()).slice(0, 20) : shuffle(dueWords()).slice(0, REVIEW_LIMIT);
    if (!list.length) return;
    openSession({ kind: extra ? 'extra' : 'review', title: extra ? 'Дополнительная тренировка' : 'Повторение', items: list.map(reviewQ), back: '#review' });
  }

  /** Тренировка произвольного списка слов (трудные слова, слова из текста). */
  function startWordSession(list, title, back) {
    if (!list.length) return;
    openSession({ kind: 'extra', title, items: shuffle(list).map(reviewQ), back });
  }

  function startArticles() {
    const pool = shuffle(articlePool(ui.artLevel)).slice(0, ARTICLE_ROUND);
    if (!pool.length) return;
    openSession({ kind: 'articles', title: 'Тренажёр артиклей', items: pool.map((w) => ({ t: 'art', key: w.key })), back: '#articles' });
  }

  /* предложения */
  function tokenize(text) {
    const m = text.match(/^(.*?)([.?!])?$/);
    const body = m[1];
    const tokens = body.replace(/,/g, ' ,').split(/\s+/).filter(Boolean);
    return { tokens, end: m[2] || '' };
  }

  function startBuild(unitId) {
    const u = UNIT[unitId];
    const items = shuffle(u.s.map((s, idx) => idx)).map((idx) => makeBuildItem(u, idx));
    openSession({ kind: 'build', unitId, title: `Предложения: ${u.t}`, items, back: `#unit-${unitId}` });
  }
  function makeBuildItem(u, idx) {
    return { t: 'build', unitId: u.id, idx, hint: hintWords(u.s[idx][0]), showHint: false, typed: '' };
  }

  /** Слова предложения вперемешку — подсказка к письменному ответу. */
  function hintWords(de) {
    const words = tokenize(de).tokens.filter((t) => t !== ',');
    const lower = words.map((w, i) => (i === 0 && w !== 'Sie' ? w.toLowerCase() : w));
    const order = shuffle(lower);
    return order.length > 2 && order.every((w, i) => w === lower[i]) ? order.slice(1).concat(order[0]) : order;
  }

  /* Проверка написанного предложения: запятые, финальный знак и кавычки не учитываются. */
  const UMLAUT_FOLD = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  const sentenceWords = (s) => s.trim().replace(/[’`´]/g, "'").replace(/[„“”"«»]/g, '').replace(/[.?!…]+$/, '')
    .replace(/,/g, ' ').split(/\s+/).filter(Boolean);
  function checkSentence(input, de, alts = []) {
    const mine = sentenceWords(input);
    if (!mine.length) return { ok: false, msg: 'Правильный ответ:' };
    const variants = [de, ...alts].map(sentenceWords);
    const join = (ws) => ws.join(' ');
    if (variants.some((v) => join(v) === join(mine))) return { ok: true };
    if (variants.some((v) => join(v).toLowerCase() === join(mine).toLowerCase())) {
      return { ok: true, msg: 'Засчитано. Проверьте заглавные буквы: существительные и вежливое Sie пишутся с большой.' };
    }
    if (variants.some((v) => UMLAUT_FOLD(join(v)) === UMLAUT_FOLD(join(mine)))) {
      return { ok: true, msg: 'Засчитано. Лучше писать умлауты: ä, ö, ü, ß.' };
    }
    const bag = (ws) => ws.map(UMLAUT_FOLD).sort().join(' ');
    if (variants.some((v) => bag(v) === bag(mine))) {
      return { ok: false, msg: 'Слова верные, но порядок другой. Проверьте, где стоит глагол.' };
    }
    return { ok: false };
  }
  /** Ответ ученика: слова, которых нет в правильном предложении, подчёркнуты. */
  function markSentence(input, de) {
    const right = new Set(sentenceWords(de).map(UMLAUT_FOLD));
    return sentenceWords(input).map((w) => (right.has(UMLAUT_FOLD(w)) ? esc(w) : `<span class="dw-bad">${esc(w)}</span>`)).join(' ');
  }

  /* --- рендер сессии --- */
  function renderSession() {
    const s = session;
    if (s.phase === 'done') return renderDone();
    const item = s.items[s.i];
    const pct = Math.round((s.i / s.items.length) * 100);
    const body = item.t === 'build' ? renderBuild(item) : renderWordQ(item);
    const fb = s.phase === 'feedback' ? renderFeedback(item) : '';
    return `<div class="session">
      <div class="s-top"><button class="icon-btn" data-act="exit" aria-label="Завершить">✕</button>
        <div class="track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
        <span class="s-count">${s.i + 1} / ${s.items.length}</span></div>
      <p class="eyebrow">${esc(s.title)}</p>
      <div class="card">${body}${fb}</div>
    </div>`;
  }

  function renderWordQ(q) {
    const w = WORD[q.key];
    const asking = session.phase === 'ask';
    const picked = session.fb ? session.fb.pick : undefined;
    const optBtn = (val, oi, html, extraCls = '') => {
      let cls = extraCls;
      if (!asking) {
        const right = q.t === 'art' ? val === w.art : (q.t === 'de2ru' ? val === w.ru : val === w.de);
        if (right) cls += ' right'; else if (val === picked) cls += ' wrong';
      }
      return `<button class="opt ${cls}" data-act="pick" data-v="${esc(val)}" ${asking ? '' : 'disabled'}><kbd>${oi + 1}</kbd>${html}</button>`;
    };

    if (q.t === 'art') {
      return `<div class="prompt"><span class="muted small">Какой артикль?</span>
          <span class="huge"><span class="muted">___</span> ${esc(w.noun)}</span><span class="muted">${esc(w.ru)}</span></div>
        <div class="arts">${ARTS.map((a, i) => optBtn(a, i, a, `o-${a}`)).join('')}</div>`;
    }
    if (q.t === 'de2ru') {
      return `<div class="prompt"><span class="muted small">Что это значит?</span>
          <div class="row" style="gap:6px"><span class="huge">${wordHtml(w)}</span>${speakBtn(w.de)}</div>
          ${w.forms ? `<span class="muted small">${esc(w.forms)}</span>` : ''}</div>
        <div class="choices">${q.opts.map((o, i) => optBtn(o, i, esc(o))).join('')}</div>`;
    }
    if (q.t === 'ru2de') {
      return `<div class="prompt"><span class="muted small">Как это по-немецки?</span><span class="ru-big">${esc(w.ru)}</span></div>
        <div class="choices">${q.opts.map((o, i) => optBtn(o, i, wordHtml(WORDS.find((x) => x.de === o) || { de: o }))).join('')}</div>`;
    }
    // type
    return `<div class="prompt"><span class="muted small">Напишите по-немецки${w.art ? ' — с артиклем' : ''}</span><span class="ru-big">${esc(w.ru)}</span></div>
      <form class="stack" style="gap:10px" data-form="type">
        <div class="type-row"><input id="typeInput" autocomplete="off" autocapitalize="off" spellcheck="false" lang="de" aria-label="Ответ" value="${esc(session.fb ? session.fb.typed : '')}" ${asking ? '' : 'disabled'}>
          ${asking ? '<button class="btn primary" type="submit">Проверить</button>' : ''}</div>
        ${asking ? `<div class="row" style="justify-content:space-between"><div class="umlauts">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((c) => `<button type="button" data-act="ins" data-c="${c}">${c}</button>`).join('')}</div>
          <button type="button" class="btn ghost small" data-act="dontknow">Не помню</button></div>` : ''}
      </form>`;
  }

  function renderBuild(item) {
    const [, ru] = UNIT[item.unitId].s[item.idx];
    const asking = session.phase === 'ask';
    const value = session.fb ? session.fb.typed : item.typed;
    return `<div class="prompt"><span class="muted small">Напишите по-немецки</span><span class="ru-big">${esc(ru)}</span></div>
      ${sentenceForm({ asking, value, hint: item.showHint ? item.hint : null, form: 'sent', hintAct: 'build-hint', giveUpAct: 'build-giveup' })}`;
  }

  /** Поле для письменного ответа-предложения (используется и в «Моих ошибках»). */
  function sentenceForm({ asking, value, hint, form, hintAct, giveUpAct }) {
    const hintHtml = hint ? `<div class="bank" aria-label="Слова из предложения">${hint.map((w) => `<span class="chip" style="cursor:default">${esc(w)}</span>`).join('')}</div>` : '';
    const umlauts = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((c) => `<button type="button" data-act="ins" data-c="${c}">${c}</button>`).join('');
    return `<form class="stack" style="gap:10px" data-form="${form}">
        <div class="type-row"><input id="typeInput" autocomplete="off" autocapitalize="sentences" spellcheck="false" lang="de" aria-label="Ваш ответ" placeholder="Ваш ответ по-немецки" value="${esc(value || '')}" ${asking ? '' : 'disabled'}></div>
        ${asking ? `${hintHtml}<div class="umlauts">${umlauts}</div>
          <div class="s-actions"><div class="row" style="gap:6px">${hint ? '' : `<button type="button" class="btn ghost small" data-act="${hintAct}">Подсказка</button>`}<button type="button" class="btn ghost small" data-act="${giveUpAct}">Не помню</button></div>
            <button class="btn primary" type="submit">Проверить</button></div>` : ''}
      </form>`;
  }

  function renderFeedback(item) {
    const fb = session.fb;
    let answer;
    if (item.t === 'build') {
      const [de] = UNIT[item.unitId].s[item.idx];
      const mine = !fb.ok && fb.typed && fb.typed.trim() ? `<span class="small">Ваш вариант: ${markSentence(fb.typed, de)}</span>` : '';
      answer = `${mine}<span class="answer">${esc(de)} ${speakBtn(de)}</span>`;
    } else {
      const w = WORD[item.key];
      answer = `<span class="answer">${wordHtml(w)} ${speakBtn(w.de)}</span><span class="small muted">${wordExtra(w)}${wordExtra(w) ? ' · ' : ''}${esc(w.ru)}</span>`;
    }
    const accept = item.t === 'build' && !fb.ok && !fb.accepted && (fb.typed || '').trim()
      ? '<button class="btn ghost small" data-act="accept">Мой вариант тоже верный</button>' : '';
    const why = !fb.ok && window.DW_whyBtn ? window.DW_whyBtn(whyContext(item, fb)) : '';
    return `<div class="fb ${fb.ok ? 'ok' : 'bad'}" role="status">
        <span class="verdict">${fb.ok ? 'Верно!' : 'Не совсем.'}</span>
        ${fb.msg ? `<span class="small">${esc(fb.msg)}</span>` : ''}
        ${answer}
      </div>
      <div class="s-actions"><div class="row" style="gap:6px">${accept}${why}</div><button class="btn primary" data-act="next" id="nextBtn">Дальше ↵</button></div>`;
  }

  /** Описание задания для объяснения ИИ. */
  function whyContext(item, fb) {
    if (item.t === 'build') {
      const u = UNIT[item.unitId];
      const [de, ru] = u.s[item.idx];
      return { level: u.level, task: `Написать по-немецки предложение «${ru}»`, user: fb.typed || '', right: de };
    }
    const w = WORD[item.key];
    const tasks = {
      art: [`Выбрать артикль для существительного «${w.noun}» (${w.ru})`, fb.pick, w.de],
      de2ru: [`Перевести слово «${w.de}» на русский`, fb.pick, w.ru],
      ru2de: [`Выбрать немецкое слово для «${w.ru}»`, fb.pick, w.de],
      type: [`Написать по-немецки «${w.ru}»${w.art ? ' (существительное с артиклем)' : ''}`, fb.typed, w.de],
    };
    const [task, user, right] = tasks[item.t] || tasks.type;
    return { level: w.level, task, user: user || '', right };
  }

  function renderDone() {
    const s = session;
    const first = Object.values(s.first);
    const clean = first.filter(Boolean).length;
    const back = s.back || '#path';
    const u = s.unitId ? UNIT[s.unitId] : null;
    const p = s.unitId ? PACK[s.unitId] : null;
    let nextStep = '';
    if (u && s.kind === 'learn') nextStep = `<a class="btn primary" href="#rule-${u.r[0]}">Дальше: грамматика</a>`;
    if (p) {
      const list = LEVEL_PACKS[p.level];
      const np = list[list.indexOf(p) + 1];
      nextStep = np ? `<a class="btn primary" href="#pack-${np.id}">Следующий набор</a>` : '';
    }
    if (u && s.kind === 'build') {
      const nu = UNITS[UNITS.indexOf(u) + 1];
      nextStep = unitDone(u) && nu ? `<a class="btn primary" href="#unit-${nu.id}">Следующий урок</a>` : '';
    }
    const due = dueWords().length;
    return `<div class="session"><div class="card" style="align-items:flex-start">
      <p class="eyebrow">${esc(s.title)}</p>
      <h1 class="done-title">${clean === first.length ? 'Отлично, без ошибок!' : 'Готово!'}</h1>
      <div class="row" style="align-items:baseline;gap:8px"><span class="num done-score">${clean}</span><span class="muted">из ${first.length} с первой попытки</span></div>
      ${s.kind === 'learn' ? `<p class="muted small">Слова добавлены в повторение. Первые из них вернутся завтра.</p>` : ''}
      ${s.kind === 'build' && u && !unitSteps(u).g ? '<p class="muted small">Чтобы закрыть урок, пройдите тесты по грамматике.</p>' : ''}
      <div class="row">${nextStep}
        ${s.kind === 'review' && due ? `<button class="btn mark" data-act="review">Ещё ${due} к повторению</button>` : ''}
        ${s.kind === 'articles' ? '<button class="btn primary" data-act="articles">Ещё раунд</button>' : ''}
        <a class="btn" href="${back}" data-act="close">Готово</a></div>
    </div></div>`;
  }

  /* --- ответы --- */
  function checkTyped(input, w) {
    const clean = (s) => s.trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
    const fold = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    const a = clean(input);
    const e = clean(w.de).replace(/[.!?]+$/, '');
    if (!a) return { ok: false, msg: 'Правильный ответ:' };
    if (a === e) return { ok: true };
    if (a.toLowerCase() === e.toLowerCase()) {
      return { ok: true, msg: w.art ? 'Существительные пишутся с большой буквы.' : 'Обратите внимание на заглавные буквы.' };
    }
    if (fold(a) === fold(e)) return { ok: true, msg: 'Засчитано. Лучше писать умлауты: ä, ö, ü, ß.' };
    if (w.art) {
      const m = a.match(/^(der|die|das)\s+(.+)$/i);
      const nounOnly = m ? m[2] : a;
      if (fold(nounOnly) === fold(w.noun)) {
        return { ok: false, msg: m ? `Слово верное, но артикль — ${w.art}.` : `Слово верное, но нужен артикль ${w.art}.` };
      }
    }
    return { ok: false };
  }

  function settle(ok, extra = {}) {
    const s = session;
    const item = s.items[s.i];
    const key = item.t === 'build' ? `${item.unitId}:${item.idx}` : item.key;
    if (!item.retry) {
      s.first = { ...s.first, [key]: (s.first[key] ?? true) && ok };
      if (s.kind === 'review' || s.kind === 'extra') gradeWord(item.key, ok);
      else if (item.key) noteWord(item.key, ok);
    }
    if (!ok && !item.retry) s.items = [...s.items, retryOf(item)];
    countAnswer();
    commit();
    session = { ...s, phase: 'feedback', fb: { ok, ...extra } };
    render();
    const nb = $('#nextBtn');
    if (nb) nb.focus();
  }

  function retryOf(item) {
    if (item.t === 'build') return { ...makeBuildItem(UNIT[item.unitId], item.idx), retry: true };
    const w = WORD[item.key];
    return { ...makeWordQ(w, item.t), retry: true };
  }

  function pick(val) {
    const item = session.items[session.i];
    const w = WORD[item.key];
    let ok;
    if (item.t === 'art') ok = val === w.art;
    else if (item.t === 'de2ru') ok = val === w.ru;
    else ok = val === w.de;
    if (item.t === 'art') speak(w.de);
    settle(ok, { pick: val });
  }

  function submitTyped() {
    const input = $('#typeInput');
    if (!input) return;
    const item = session.items[session.i];
    const w = WORD[item.key];
    const res = checkTyped(input.value, w);
    speak(w.de);
    settle(res.ok, { msg: res.msg, typed: input.value });
  }

  function submitSentence(giveUp = false) {
    const input = $('#typeInput');
    const item = session.items[session.i];
    const [de, , alts] = UNIT[item.unitId].s[item.idx];
    const typed = giveUp || !input ? '' : input.value;
    const res = giveUp ? { ok: false, msg: 'Запомните:' } : checkSentence(typed, de, alts);
    if (res.ok) clearMistake(`s:${item.unitId}:${item.idx}`); else noteMistake(`s:${item.unitId}:${item.idx}`, { t: 's', unit: item.unitId, idx: item.idx });
    speak(de);
    settle(res.ok, { msg: res.msg, typed });
  }
  function showBuildHint() {
    const input = $('#typeInput');
    const item = session.items[session.i];
    const updated = { ...item, showHint: true, typed: input ? input.value : item.typed };
    session = { ...session, items: session.items.map((x, i) => (i === session.i ? updated : x)) };
    render();
  }

  function acceptOwn() {
    const s = session;
    const item = s.items[s.i];
    clearMistake(`s:${item.unitId}:${item.idx}`);
    const key = `${item.unitId}:${item.idx}`;
    let items = s.items;
    if (!item.retry) {
      const lastIdx = items.length - 1;
      if (items[lastIdx].retry && items[lastIdx].idx === item.idx && lastIdx > s.i) items = items.slice(0, lastIdx);
    }
    session = { ...s, items, first: { ...s.first, [key]: true }, fb: { ...s.fb, ok: true, accepted: true, msg: 'Засчитано. Немецкий допускает разный порядок, если глагол стоит на своём месте.' } };
    render();
  }

  function nextItem() {
    const s = session;
    if (s.i + 1 >= s.items.length) { finishSession(); return; }
    session = { ...s, i: s.i + 1, phase: 'ask', fb: null };
    render();
  }

  function finishSession() {
    const s = session;
    if (s.kind === 'learn') {
      Object.entries(s.first).forEach(([key, ok]) => learnWord(key, ok));
      setUnitStep(s.unitId, 'w');
    }
    if (s.kind === 'build') setUnitStep(s.unitId, 's');
    commit();
    session = { ...s, phase: 'done' };
    render();
  }


  function insertChar(c) {
    const input = $('#typeInput');
    if (!input) return;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + c + input.value.slice(end);
    input.focus();
    input.setSelectionRange(start + 1, start + 1);
  }

  /* ---------- события ---------- */
  const ACTIONS = {
    speak: (el) => speak(el.dataset.text),
    level: (el) => { ui = { ...ui, level: el.dataset.id }; render(); },
    'dict-pos': (el) => { ui = { ...ui, dictPos: el.dataset.id }; $('#dictPos').innerHTML = posChips(); $('#dictList').innerHTML = dictRows(); },
    'rules-level': (el) => { ui = { ...ui, rulesLevel: el.dataset.id }; render(); },
    'art-level': (el) => { ui = { ...ui, artLevel: el.dataset.id }; render(); },
    learn: (el) => startLearn(el.dataset.id),
    build: (el) => startBuild(el.dataset.id),
    review: () => startReview(false),
    'review-extra': () => startReview(true),
    articles: () => startArticles(),
    quiz: (el) => answerQuiz(Number(el.dataset.q), Number(el.dataset.o)),
    'quiz-reset': () => { ruleQuiz = { id: ruleQuiz.id, picks: {} }; render(); },
    pick: (el) => pick(el.dataset.v),
    dontknow: () => { const item = session.items[session.i]; speak(WORD[item.key].de); settle(false, { msg: 'Запомните:', typed: '' }); },
    ins: (el) => insertChar(el.dataset.c),
    'build-hint': () => showBuildHint(),
    'build-giveup': () => submitSentence(true),
    accept: () => acceptOwn(),
    next: () => nextItem(),
    exit: () => { const back = session.back; session = null; if (location.hash === back) render(); else location.hash = back; },
    close: () => { session = null; },
    'reset-ask': () => { ui = { ...ui, confirmReset: true }; render(); },
    'reset-no': () => { ui = { ...ui, confirmReset: false }; render(); },
    'reset-yes': () => { state = freshState(); ui = { ...ui, confirmReset: false, level: null }; commit(); render(); },
  };

  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-act]');
    if (!el) return;
    const fn = ACTIONS[el.dataset.act] || EXT.actions[el.dataset.act];
    if (!fn) return;
    if (el.tagName === 'A' && el.dataset.act === 'close') {
      session = null;
      if (location.hash === el.getAttribute('href')) { ev.preventDefault(); render(); }
      return;
    }
    fn(el);
  });

  document.addEventListener('submit', (ev) => {
    if (ev.target.matches('[data-form="type"]')) { ev.preventDefault(); if (session && session.phase === 'ask') submitTyped(); return; }
    if (ev.target.matches('[data-form="sent"]')) { ev.preventDefault(); if (session && session.phase === 'ask') submitSentence(); return; }
    EXT.hooks.submit.forEach((fn) => fn(ev));
  });

  document.addEventListener('input', (ev) => {
    if (ev.target.id === 'dictSearch') { ui = { ...ui, dictQuery: ev.target.value }; $('#dictList').innerHTML = dictRows(); }
    EXT.hooks.input.forEach((fn) => fn(ev));
  });
  document.addEventListener('change', (ev) => {
    if (ev.target.id === 'dictLevel') { ui = { ...ui, dictLevel: ev.target.value }; $('#dictPos').innerHTML = posChips(); $('#dictList').innerHTML = dictRows(); }
    EXT.hooks.change.forEach((fn) => fn(ev));
  });

  document.addEventListener('keydown', (ev) => {
    if (!session) EXT.hooks.keydown.forEach((fn) => fn(ev));
    if (!session || session.phase === 'done') return;
    const inInput = ev.target.tagName === 'INPUT';
    if (session.phase === 'feedback' && ev.key === 'Enter' && !ev.target.closest('button')) {
      ev.preventDefault();
      nextItem();
      return;
    }
    if (session.phase === 'ask' && !inInput && /^[1-4]$/.test(ev.key)) {
      const opts = document.querySelectorAll('.card [data-act="pick"]');
      const btn = opts[Number(ev.key) - 1];
      if (btn) { ev.preventDefault(); btn.click(); }
    }
  });

  window.addEventListener('hashchange', () => {
    session = null;
    window.scrollTo(0, 0);
    render();
  });

  /* ---------- свои слова и ошибки ---------- */
  const myWordsList = () => (Array.isArray(asObj(state.ext).myWords) ? state.ext.myWords : []);
  function syncCustomWords() {
    myWordsList().forEach((m) => {
      if (!m || typeof m.raw !== 'string') return;
      const key = m.raw.split('|')[0];
      if (WORD[key]) return;
      const w = { ...parseWord(m.raw, 'my', 'my'), custom: true, example: String(m.ex || '') };
      if (m.pos) w.pos = m.pos;
      WORD[key] = w;
      WORDS.push(w);
    });
  }
  function noteMistake(key, data) {
    const all = asObj(asObj(state.ext).mist);
    const cur = all[key] || { ...data, n: 0 };
    state.ext = { ...asObj(state.ext), mist: { ...all, [key]: { ...cur, n: cur.n + 1, d: dayKey() } } };
  }
  function clearMistake(key) {
    const all = asObj(asObj(state.ext).mist);
    if (!all[key]) return;
    const { [key]: gone, ...rest } = all;
    state.ext = { ...asObj(state.ext), mist: rest };
  }

  /* ---------- API для расширений ---------- */
  window.DW = Object.freeze({
    LEVELS, UNITS, UNIT, RULE, WORD, WORDS, PACK, LEVEL_PACKS, DAILY_GOAL, KNOWN_BOX, STANDALONE,
    getState: () => state,
    setExt: (key, value) => { state.ext = { ...asObj(state.ext), [key]: value }; },
    getExt: (key) => asObj(state.ext)[key],
    importState: (raw) => { state = mergeState(state, normalizeState(raw)); commit(); },
    exportState: () => JSON.stringify(state),
    checkSentence, markSentence, hintWords, sentenceForm,
    esc, shuffle, plural, dayKey, addDays, startOfDay, wordHtml, wordExtra, wordStatus, speak, speakBtn,
    countAnswer, commit, render,
    countResult: (ok) => { countAnswer(); if (ok) { const k = dayKey(); state.ok = { ...asObj(state.ok), [k]: (asObj(state.ok)[k] || 0) + 1 }; } }, streak, dueWords, startedWords, startWordSession,
    noteMistake: (key, data) => { noteMistake(key, data); commit(); },
    clearMistake: (key) => { clearMistake(key); commit(); },
    grade: (key, ok) => { if ((state.words[key] || {}).b > 0) gradeWord(key, ok); else learnWord(key, ok); commit(); },
    addCustomWord: (entry) => {
      const key = entry.raw.split('|')[0];
      if (WORD[key]) return false;
      state.ext = { ...asObj(state.ext), myWords: [...myWordsList(), entry] };
      syncCustomWords();
      learnWord(key, false);
      commit();
      return true;
    },
    removeCustomWord: (key) => {
      state.ext = { ...asObj(state.ext), myWords: myWordsList().filter((m) => m.raw.split('|')[0] !== key) };
      const i = WORDS.findIndex((w) => w.key === key && w.custom);
      if (i >= 0) { WORDS.splice(i, 1); delete WORD[key]; }
      const { [key]: gone, ...rest } = state.words;
      state.words = rest;
      commit();
    },
    parseWord: (raw) => parseWord(raw, 'my', 'my'),
    skipBefore: (levelId) => {
      const units = { ...state.units };
      UNITS.forEach((u) => { if (u.level < levelId) units[u.id] = { ...(units[u.id] || {}), skip: 1 }; else if (units[u.id] && units[u.id].skip) { const { skip, ...rest } = units[u.id]; units[u.id] = rest; } });
      state.units = units; ui = { ...ui, level: levelId }; commit();
    },
    unitDone: (u) => unitDone(u),
    addToReview: (key) => { if (!((state.words[key] || {}).b > 0)) { learnWord(key, false); commit(); } },
    claude: () => (window.claude && typeof window.claude.use === 'function' ? window.claude : null),
    isNative: () => !!NATIVE,
    register: ({ views = {}, prefixes = [], actions = {}, nav = {}, hooks = {} }) => {
      Object.assign(EXT.views, views);
      EXT.prefixes.push(...prefixes);
      Object.assign(EXT.actions, actions);
      Object.assign(EXT.nav, nav);
      Object.entries(hooks).forEach(([k, fn]) => { if (EXT.hooks[k]) EXT.hooks[k].push(fn); });
    },
  });

  /* ---------- старт: после загрузки всех скриптов-расширений ---------- */
  function boot() {
    document.body.classList.add('boot');
    setTimeout(() => document.body.classList.remove('boot'), 2000);
    getTts();
    render();
    connectRemote();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else setTimeout(boot, 0);
})();
