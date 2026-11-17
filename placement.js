/* Тест на уровень: по 6 вопросов на подуровень (4 грамматика + 2 слова).
   Тест останавливается на первом подуровне, где верно меньше 4 из 6. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc, shuffle } = D;
  const PER_LEVEL_GRAMMAR = 4;
  const PER_LEVEL_WORDS = 2;
  const PASS_PER_LEVEL = 4;

  function buildLevel(L) {
    const rules = shuffle(L.rules).slice(0, PER_LEVEL_GRAMMAR);
    const grammar = rules.map((r) => {
      const q = r.q[Math.floor(Math.random() * r.q.length)];
      return { kind: 'g', level: L.id, text: q[0], opts: q[1], right: q[2], rule: r.t };
    });
    const words = D.WORDS.filter((w) => w.level === L.id && w.unit.includes('-u'));
    const picked = shuffle(words).slice(0, PER_LEVEL_WORDS);
    const vocab = picked.map((w) => {
      const others = shuffle(words.filter((x) => x.key !== w.key && x.ru !== w.ru)).slice(0, 3).map((x) => x.ru);
      const opts = shuffle([w.ru, ...others]);
      return { kind: 'w', level: L.id, text: `Что значит «${w.de}»?`, opts, right: opts.indexOf(w.ru) };
    });
    return shuffle([...grammar, ...vocab]);
  }

  let pt = { phase: 'intro', li: 0, items: [], i: 0, picks: [], perLevel: {}, result: null };
  const rerender = () => { D.render(); window.scrollTo(0, 0); };

  function start() {
    pt = { phase: 'test', li: 0, items: buildLevel(D.LEVELS[0]), i: 0, picks: [], perLevel: {}, result: null };
    rerender();
  }
  function answer(oi) {
    const it = pt.items[pt.i];
    const ok = oi === it.right;
    const lv = { ...pt.perLevel, [it.level]: (pt.perLevel[it.level] || 0) + (ok ? 1 : 0) };
    D.countResult(ok);
    if (pt.i + 1 < pt.items.length) { pt = { ...pt, i: pt.i + 1, perLevel: lv }; rerender(); return; }
    const L = D.LEVELS[pt.li];
    const passed = (lv[L.id] || 0) >= PASS_PER_LEVEL;
    if (passed && pt.li + 1 < D.LEVELS.length) {
      pt = { ...pt, li: pt.li + 1, items: buildLevel(D.LEVELS[pt.li + 1]), i: 0, perLevel: lv };
      rerender();
      return;
    }
    const startLevel = passed ? null : L.id;
    pt = { ...pt, phase: 'result', perLevel: lv, result: startLevel };
    D.setExt('placement', { level: startLevel || 'done', date: D.dayKey() });
    D.commit();
    rerender();
  }

  function render() {
    if (pt.phase === 'test') {
      const it = pt.items[pt.i];
      const doneBefore = pt.li * (PER_LEVEL_GRAMMAR + PER_LEVEL_WORDS);
      const totalMax = D.LEVELS.length * (PER_LEVEL_GRAMMAR + PER_LEVEL_WORDS);
      const pct = Math.round(((doneBefore + pt.i) / totalMax) * 100);
      const sentence = esc(it.text).replace('___', '<span class="blank">?</span>');
      return `<div class="session"><div class="s-top"><a class="icon-btn" href="#practice" aria-label="Прервать тест">✕</a>
          <div class="track"><i style="width:${pct}%"></i></div><span class="s-count">${it.level}</span></div>
        <p class="eyebrow">Тест на уровень · ${it.kind === 'g' ? `грамматика: ${esc(it.rule)}` : 'слова'}</p>
        <div class="card"><div class="prompt"><span class="qtext" style="font-size:clamp(22px,5vw,30px)">${sentence}</span></div>
          <div class="choices">${it.opts.map((o, oi) => `<button class="opt" data-act="pt-answer" data-o="${oi}"><kbd>${oi + 1}</kbd>${esc(o)}</button>`).join('')}</div>
          <p class="small muted">Не знаете — выберите наугад или любой вариант: тест сам остановится на вашем уровне.</p></div></div>`;
    }
    if (pt.phase === 'result') {
      const rows = D.LEVELS.filter((l) => pt.perLevel[l.id] !== undefined).map((l) => {
        const n = pt.perLevel[l.id];
        return `<div class="lvrow"><b>${l.id}</b><div class="meter"><i class="m-k" style="width:${(n / 6) * 100}%"></i></div><span class="small muted">${n} / 6</span></div>`;
      }).join('');
      const L = pt.result ? D.LEVELS.find((l) => l.id === pt.result) : null;
      const first = L && L.id !== D.LEVELS[0].id;
      return `<a class="back" href="#practice">← Практика</a>
        <section class="panel hero"><p class="eyebrow">Результат теста</p>
          <h1>${L ? `Ваш уровень: начинайте с ${L.id}` : 'Отлично! Вы уверенно знаете материал до B1.2'}</h1>
          <p class="muted">${L ? `«${esc(L.title)}» — ${esc(L.desc)}` : 'Проходите экзамен B1 и повторяйте слова, чтобы закрепить уровень.'}</p>
          <div class="row">${first ? `<button class="btn primary" data-act="pt-skip" data-id="${L.id}">Начать с ${L.id}</button>` : ''}
            ${L && !first ? '<a class="btn primary" href="#path">Начать с первого урока</a>' : ''}${!L ? '<a class="btn primary" href="#exam-B1">Пробный экзамен B1</a>' : ''}
            <button class="btn ghost" data-act="pt-start">Пройти ещё раз</button></div>
          ${first ? `<p class="small muted">Уроки ниже ${L.id} отметятся как пропущенные. Их можно открыть и пройти в любой момент.</p>` : ''}
        </section>
        <section class="panel stack"><h3>Результаты по уровням</h3>${rows}<p class="small muted">Уровень засчитан, если верно 4 из 6 и больше.</p></section>`;
    }
    const prev = D.getExt('placement');
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Тест на уровень</h1><p class="muted">Около 10 минут. Вопросы идут от A1.1 к B1.2: грамматика и слова. Тест остановится там, где станет трудно, и подскажет, с какого урока начать.</p></div>
      <section class="panel stack">
        ${prev ? `<p class="small">Прошлый результат (${esc(prev.date)}): ${prev.level === 'done' ? 'весь курс до B1.2' : `начинать с ${esc(prev.level)}`}.</p>` : ''}
        <div class="row"><button class="btn primary" data-act="pt-start">Начать тест</button></div>
      </section>`;
  }

  D.register({
    views: { placement: render },
    nav: { placement: 'practice' },
    actions: {
      'pt-start': () => start(),
      'pt-answer': (el) => answer(Number(el.dataset.o)),
      'pt-skip': (el) => { D.skipBefore(el.dataset.id); pt = { ...pt, phase: 'intro' }; location.hash = 'path'; },
    },
    hooks: {
      keydown: (ev) => {
        if (location.hash !== '#placement' || pt.phase !== 'test' || ev.target.tagName === 'INPUT') return;
        if (/^[1-4]$/.test(ev.key)) { const b = document.querySelectorAll('[data-act="pt-answer"]')[Number(ev.key) - 1]; if (b) { ev.preventDefault(); b.click(); } }
      },
    },
  });
  window.addEventListener('hashchange', () => { if (location.hash !== '#placement' && pt.phase === 'test') pt = { ...pt, phase: 'intro' }; });
})();
