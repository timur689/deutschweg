/* «Мои ошибки»: повторение заданий, в которых вы ошиблись — правила, предложения, «Найди ошибку».
   Верный ответ убирает задание из списка. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc, shuffle } = D;
  const ROUND = 15;
  const rerender = () => {
    D.render();
    const input = document.getElementById('typeInput');
    if (input && ms.phase === 'ask') input.focus();
  };
  const strip = (w) => w.replace(/[.,!?;:]/g, '').toLowerCase();

  const all = () => D.getExt('mist') || {};
  function resolve(key, m) {
    if (m.t === 'r') {
      const r = D.RULE[m.rule];
      const q = r && r.q[m.qi];
      return q ? { key, t: 'r', title: r.t, rule: r.id, level: r.level, text: q[0], opts: q[1], right: q[2] } : null;
    }
    if (m.t === 's') {
      const u = D.UNIT[m.unit];
      const s = u && u.s[m.idx];
      if (!s) return null;
      const [de, ru, alts] = s;
      return { key, t: 's', level: u.level, de, ru, alts: alts || [], hint: D.hintWords(de), showHint: false, typed: '' };
    }
    if (m.t === 'e') {
      const it = ((window.DE_ERRORS || {})[m.level] || [])[m.idx];
      return it ? { key, t: 'e', level: m.level, item: it } : null;
    }
    return null;
  }

  let ms = { phase: 'idle', items: [], i: 0, ok: 0, fb: null };

  function start() {
    const list = Object.entries(all()).sort((a, b) => (b[1].n || 0) - (a[1].n || 0)).slice(0, ROUND * 2)
      .map(([k, m]) => resolve(k, m)).filter(Boolean);
    if (!list.length) return;
    ms = { phase: 'ask', items: shuffle(list).slice(0, ROUND), i: 0, ok: 0, fb: null };
    rerender();
  }
  function settle(ok, extra) {
    const it = ms.items[ms.i];
    if (ok) D.clearMistake(it.key); else D.noteMistake(it.key, { ...(all()[it.key] || {}) });
    D.countResult(ok);
    D.commit();
    ms = { ...ms, phase: 'fb', ok: ms.ok + (ok ? 1 : 0), fb: { ok, ...extra } };
    rerender();
    const nb = document.getElementById('msNext');
    if (nb) nb.focus();
  }
  function next() {
    if (ms.i + 1 >= ms.items.length) { ms = { ...ms, phase: 'done' }; rerender(); return; }
    ms = { ...ms, i: ms.i + 1, phase: 'ask', fb: null };
    rerender();
  }
  const updateItem = (patch) => { ms = { ...ms, items: ms.items.map((x, i) => (i === ms.i ? { ...x, ...patch } : x)) }; rerender(); };

  function whyFor(it) {
    if (!window.DW_whyBtn) return '';
    if (it.t === 'r') return window.DW_whyBtn({ level: it.level, task: `Тест к правилу «${it.title}»: ${it.text}`, user: it.opts[ms.fb.pick], right: it.opts[it.right] });
    if (it.t === 's') return window.DW_whyBtn({ level: it.level, task: `Написать по-немецки предложение «${it.ru}»`, user: ms.fb.typed || '', right: it.de });
    return window.DW_whyBtn({ level: it.level, task: `Найти ошибку в предложении «${it.item[0]}»`, user: `выбрано слово «${it.item[0].split(' ')[ms.fb.pick]}»`, right: it.item[1] });
  }

  function body(it) {
    const asking = ms.phase === 'ask';
    if (it.t === 'r') {
      const sentence = esc(it.text).replace('___', `<span class="blank">${asking ? '?' : esc(it.opts[it.right])}</span>`);
      return `<div class="prompt"><span class="muted small">Правило: <a href="#rule-${it.rule}">${esc(it.title)}</a></span><span class="qtext" style="font-size:clamp(22px,5vw,28px)">${sentence}</span></div>
        <div class="choices">${it.opts.map((o, oi) => {
          let cls = '';
          if (!asking && oi === it.right) cls = 'right'; else if (!asking && oi === ms.fb.pick) cls = 'wrong';
          return `<button class="opt ${cls}" data-act="ms-pick" data-o="${oi}" ${asking ? '' : 'disabled'}>${esc(o)}</button>`;
        }).join('')}</div>`;
    }
    if (it.t === 's') {
      const value = ms.fb ? ms.fb.typed : it.typed;
      return `<div class="prompt"><span class="muted small">Напишите по-немецки</span><span class="ru-big">${esc(it.ru)}</span></div>
        ${D.sentenceForm({ asking, value, hint: it.showHint ? it.hint : null, form: 'ms-sent', hintAct: 'ms-hint', giveUpAct: 'ms-giveup' })}`;
    }
    const tools = window.DE_ERRORS_TOOLS;
    const errs = tools ? tools.errorWords(it.item) : new Set();
    const words = it.item[0].split(' ');
    return `<div class="prompt"><span class="muted small">Нажмите на неверное слово</span></div>
      <div class="bank fe-line">${words.map((w, i) => {
        let cls = '';
        if (!asking && errs.has(strip(w))) cls = 'err'; else if (!asking && i === ms.fb.pick) cls = 'miss';
        return `<button class="chip fe ${cls}" data-act="ms-fe" data-i="${i}" ${asking ? '' : 'disabled'}>${esc(w)}</button>`;
      }).join('')}</div>`;
  }

  function feedback(it) {
    if (ms.phase !== 'fb') return '';
    let answer = '';
    if (it.t === 's') {
      const mine = !ms.fb.ok && ms.fb.typed && ms.fb.typed.trim() ? `<span class="small">Ваш вариант: ${D.markSentence(ms.fb.typed, it.de)}</span>` : '';
      answer = `${mine}<span class="answer">${esc(it.de)} ${D.speakBtn(it.de)}</span>`;
    }
    if (it.t === 'e') answer = `<span class="answer">${window.DE_ERRORS_TOOLS ? window.DE_ERRORS_TOOLS.diffRight(it.item) : esc(it.item[1])}</span><span class="small">${esc(it.item[2])}</span>`;
    return `<div class="fb ${ms.fb.ok ? 'ok' : 'bad'}"><span class="verdict">${ms.fb.ok ? 'Верно! Задание убрано из ошибок.' : 'Пока не получилось — задание останется в списке.'}</span>${ms.fb.msg ? `<span class="small">${esc(ms.fb.msg)}</span>` : ''}${answer}</div>
      <div class="s-actions">${ms.fb.ok ? '<span></span>' : whyFor(it)}<button class="btn primary" id="msNext" data-act="ms-next">Дальше ↵</button></div>`;
  }

  function render() {
    if (ms.phase === 'ask' || ms.phase === 'fb') {
      const it = ms.items[ms.i];
      const pct = Math.round((ms.i / ms.items.length) * 100);
      const kind = { r: 'Грамматика', s: 'Предложение', e: 'Найди ошибку' }[it.t];
      return `<div class="session"><div class="s-top"><a class="icon-btn" href="#mistakes" data-act="ms-exit" aria-label="Завершить">✕</a>
          <div class="track"><i style="width:${pct}%"></i></div><span class="s-count">${ms.i + 1} / ${ms.items.length}</span></div>
        <p class="eyebrow">Мои ошибки · ${kind} · ${esc(it.level)}</p>
        <div class="card">${body(it)}${feedback(it)}</div></div>`;
    }
    const entries = Object.entries(all()).map(([k, m]) => [k, m, resolve(k, m)]).filter(([, , r]) => r);
    const count = (t) => entries.filter(([, m]) => m.t === t).length;
    const hard = D.WORDS.filter((w) => (D.getState().words[w.key] || {}).x > 0).length;
    const done = ms.phase === 'done';
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Мои ошибки</h1><p class="muted">Сюда автоматически попадают задания, в которых вы ошиблись: тесты к правилам, сборка предложений и «Найди ошибку». Ответили верно — задание исчезает из списка.</p></div>
      ${done ? `<section class="panel hero"><p class="eyebrow">Результат</p><div class="row" style="align-items:baseline"><span class="num done-score">${ms.ok}</span><span class="muted">из ${ms.items.length} исправлено</span></div></section>` : ''}
      <section class="wall wall4">
        <div class="pane"><span class="pane-title">Всего</span><span class="num big">${entries.length}</span></div>
        <div class="pane"><span class="pane-title">Правила</span><span class="num big">${count('r')}</span></div>
        <div class="pane"><span class="pane-title">Предложения</span><span class="num big">${count('s')}</span></div>
        <div class="pane"><span class="pane-title">Найди ошибку</span><span class="num big">${count('e')}</span></div>
      </section>
      <section class="panel stack">
        ${entries.length ? `<div class="row"><button class="btn primary" data-act="ms-start">Исправить ошибки</button><span class="small muted">до ${ROUND} заданий, частые ошибки — первыми</span></div>`
          : '<p class="muted">Ошибок пока нет. Отлично! Когда вы ошибётесь в тесте или предложении, задание появится здесь.</p>'}
        ${hard ? `<p class="small">Слова с ошибками (${hard}) тренируются отдельно: <a href="#stats">Статистика → Трудные слова</a>.</p>` : ''}
      </section>
      ${entries.length ? `<section class="panel stack"><h3>Список</h3><div class="rule-links">${entries.sort((a, b) => (b[1].n || 0) - (a[1].n || 0)).slice(0, 30).map(([, m, r]) => {
        const label = r.t === 'r' ? `${esc(r.title)}: ${esc(r.text)}` : r.t === 's' ? esc(r.de) : esc(r.item[0]);
        return `<div class="rule-link"><span><span class="eyebrow">${esc(r.level)} · ${{ r: 'правило', s: 'предложение', e: 'найди ошибку' }[r.t]}</span><br>${label}</span><span class="pill">✗ ${m.n}</span></div>`;
      }).join('')}</div></section>` : ''}`;
  }

  function submitSentence(giveUp) {
    const it = ms.items[ms.i];
    const input = document.getElementById('typeInput');
    const typed = giveUp || !input ? '' : input.value;
    const res = giveUp ? { ok: false, msg: 'Запомните:' } : D.checkSentence(typed, it.de, it.alts);
    D.speak(it.de);
    settle(res.ok, { typed, msg: res.msg });
  }

  D.register({
    views: { mistakes: render },
    nav: { mistakes: 'practice' },
    actions: {
      'ms-start': () => start(),
      'ms-next': () => next(),
      'ms-exit': () => { ms = { ...ms, phase: 'idle' }; },
      'ms-pick': (el) => { const it = ms.items[ms.i]; const o = Number(el.dataset.o); settle(o === it.right, { pick: o }); },
      'ms-hint': () => { const input = document.getElementById('typeInput'); updateItem({ showHint: true, typed: input ? input.value : '' }); },
      'ms-giveup': () => submitSentence(true),
      'ms-fe': (el) => {
        const it = ms.items[ms.i];
        const i = Number(el.dataset.i);
        const errs = window.DE_ERRORS_TOOLS ? window.DE_ERRORS_TOOLS.errorWords(it.item) : new Set();
        settle(errs.has(strip(it.item[0].split(' ')[i])), { pick: i });
      },
    },
    hooks: {
      submit: (ev) => {
        if (!ev.target.matches('[data-form="ms-sent"]')) return;
        ev.preventDefault();
        if (ms.phase === 'ask') submitSentence(false);
      },
      keydown: (ev) => {
        if (ev.key === 'Enter' && location.hash === '#mistakes' && ms.phase === 'fb' && !ev.target.closest('button')) { ev.preventDefault(); next(); }
      },
    },
  });
  window.addEventListener('hashchange', () => { if (location.hash !== '#mistakes' && ms.phase !== 'idle') ms = { ...ms, phase: 'idle' }; });
})();
