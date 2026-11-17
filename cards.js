/* Быстрые карточки: «знаю / не знаю» одним нажатием или свайпом. Пробел — перевернуть, ← / → — ответ. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc, shuffle } = D;
  const DECK = 20;
  const SWIPE_PX = 70;
  const rerender = () => { D.render(); };

  const SOURCES = [
    ['due', 'К повторению', () => D.dueWords()],
    ['started', 'Все мои в работе', () => D.startedWords()],
    ['hard', 'Трудные', () => D.WORDS.filter((w) => (D.getState().words[w.key] || {}).x > 0)],
    ['my', 'Мои слова', () => D.WORDS.filter((w) => w.custom)],
    ...D.LEVELS.map((l) => [l.id, l.id, () => D.WORDS.filter((w) => w.level === l.id)]),
  ];
  const sourceList = (id) => (SOURCES.find(([s]) => s === id) || SOURCES[1])[2]();

  let cd = { src: null, dir: 'de', phase: 'idle', deck: [], i: 0, flipped: false, know: 0, dont: [] };
  const defaultSrc = () => (D.dueWords().length ? 'due' : D.startedWords().length ? 'started' : D.LEVELS[0].id);

  function start(list) {
    const src = cd.src || defaultSrc();
    const words = list || shuffle(sourceList(src)).slice(0, DECK);
    if (!words.length) return;
    cd = { ...cd, src, phase: 'run', deck: words, i: 0, flipped: false, know: 0, dont: [] };
    rerender();
  }
  function flip() {
    if (cd.phase !== 'run') return;
    cd = { ...cd, flipped: !cd.flipped };
    if (cd.flipped && cd.dir === 'ru') D.speak(cd.deck[cd.i].de);
    rerender();
  }
  function answer(ok) {
    if (cd.phase !== 'run') return;
    const w = cd.deck[cd.i];
    D.grade(w.key, ok);
    D.countResult(ok);
    const next = { ...cd, know: cd.know + (ok ? 1 : 0), dont: ok ? cd.dont : [...cd.dont, w], flipped: false };
    cd = cd.i + 1 >= cd.deck.length ? { ...next, phase: 'done' } : { ...next, i: cd.i + 1 };
    rerender();
  }

  function face(w, side) {
    if (side === 'de') {
      return `<span class="huge">${D.wordHtml(w)}</span>${w.forms ? `<span class="small muted">${esc(w.forms)}</span>` : ''}`;
    }
    return `<span class="ru-big">${esc(w.ru)}</span>`;
  }

  function render() {
    if (cd.phase === 'run') {
      const w = cd.deck[cd.i];
      const pct = Math.round((cd.i / cd.deck.length) * 100);
      const front = cd.dir === 'de' ? 'de' : 'ru';
      const back = front === 'de' ? 'ru' : 'de';
      return `<div class="session"><div class="s-top"><a class="icon-btn" href="#cards" data-act="cd-exit" aria-label="Завершить">✕</a>
          <div class="track"><i style="width:${pct}%"></i></div><span class="s-count">${cd.i + 1} / ${cd.deck.length}</span></div>
        <div class="flash ${cd.flipped ? 'flipped' : ''}" id="flash" data-act="cd-flip" role="button" tabindex="0" aria-label="Перевернуть карточку">
          <div class="flash-face">${face(w, front)}${cd.flipped ? `<div class="flash-back">${face(w, back)}${back === 'ru' && D.wordExtra(w) && w.art ? `<span class="small muted">${D.wordExtra(w)}</span>` : ''}${w.example ? `<span class="small muted" lang="de">${esc(w.example)}</span>` : ''}</div>` : '<span class="small muted flash-hint">Нажмите, чтобы перевернуть · пробел</span>'}</div>
        </div>
        <div class="flash-actions">
          <button class="btn flash-no" data-act="cd-no">← Не знаю</button>
          ${D.speakBtn(w.de)}
          <button class="btn primary flash-yes" data-act="cd-yes">Знаю →</button>
        </div>
        <p class="small muted" style="text-align:center">Свайп вправо — знаю, влево — не знаю</p></div>`;
    }
    const src = cd.src || defaultSrc();
    const done = cd.phase === 'done';
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Быстрые карточки</h1><p class="muted">Смотрите на слово, вспоминаете перевод, переворачиваете и честно отмечаете: знаю или нет. Удобно в транспорте — работает свайпами.</p></div>
      ${done ? `<section class="panel hero"><p class="eyebrow">Результат</p><div class="row" style="align-items:baseline"><span class="num done-score">${cd.know}</span><span class="muted">из ${cd.deck.length} знаю</span></div>
        <div class="row">${cd.dont.length ? `<button class="btn primary" data-act="cd-again">Повторить ${cd.dont.length} незнакомых</button>` : ''}<button class="btn" data-act="cd-start">Новая колода</button></div></section>` : ''}
      <section class="panel stack">
        <h3>Колода</h3>
        <div class="seg2" role="group">${SOURCES.map(([id, label, fn]) => { const n = fn().length; return `<button class="chip-t" data-act="cd-src" data-id="${id}" aria-pressed="${src === id}" ${n ? '' : 'disabled'}>${esc(label)} <span class="cnt">${n}</span></button>`; }).join('')}</div>
        <h3>Сторона</h3>
        <div class="seg2" role="group"><button class="chip-t" data-act="cd-dir" data-id="de" aria-pressed="${cd.dir === 'de'}">Немецкий → русский</button><button class="chip-t" data-act="cd-dir" data-id="ru" aria-pressed="${cd.dir === 'ru'}">Русский → немецкий</button></div>
        <div class="row"><button class="btn primary" data-act="cd-start" ${sourceList(src).length ? '' : 'disabled'}>Начать</button><span class="small muted">до ${DECK} карточек · ответы влияют на повторение</span></div>
      </section>`;
  }

  /* Свайпы по карточке. */
  let startX = null;
  document.addEventListener('pointerdown', (ev) => { if (ev.target.closest('#flash')) startX = ev.clientX; });
  document.addEventListener('pointerup', (ev) => {
    if (startX === null) return;
    const dx = ev.clientX - startX;
    startX = null;
    if (Math.abs(dx) < SWIPE_PX || cd.phase !== 'run') return;
    swiped = true;
    answer(dx > 0);
  });
  let swiped = false;

  D.register({
    views: { cards: render },
    nav: { cards: 'practice' },
    actions: {
      'cd-src': (el) => { cd = { ...cd, src: el.dataset.id }; rerender(); },
      'cd-dir': (el) => { cd = { ...cd, dir: el.dataset.id }; rerender(); },
      'cd-start': () => start(),
      'cd-again': () => start(shuffle(cd.dont)),
      'cd-flip': () => { if (swiped) { swiped = false; return; } flip(); },
      'cd-yes': () => answer(true),
      'cd-no': () => answer(false),
      'cd-exit': () => { cd = { ...cd, phase: 'idle' }; },
    },
    hooks: {
      keydown: (ev) => {
        if (location.hash !== '#cards' || cd.phase !== 'run' || ev.target.tagName === 'INPUT') return;
        if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); flip(); }
        if (ev.key === 'ArrowRight') { ev.preventDefault(); answer(true); }
        if (ev.key === 'ArrowLeft') { ev.preventDefault(); answer(false); }
      },
    },
  });
  window.addEventListener('hashchange', () => { if (location.hash !== '#cards' && cd.phase === 'run') cd = { ...cd, phase: 'idle' }; });
})();
