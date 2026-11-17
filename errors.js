/* «Найди ошибку»: в предложении одна ошибка — нажмите на неверное слово.
   Данные: [с ошибкой, правильно, объяснение, неверные слова через | (если длина предложений разная)]. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc, shuffle } = D;
  const ROUND = 10;

  const DATA = {
    'A1.1': [
      ['Ich bist Student.', 'Ich bin Student.', 'sein: ich bin, du bist.'],
      ['Er wohnen in Berlin.', 'Er wohnt in Berlin.', 'У er/sie/es окончание -t: er wohnt.'],
      ['Das ist ein Lampe.', 'Das ist eine Lampe.', 'die Lampe — женский род, поэтому eine.'],
      ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Глагол всегда на 2-м месте: Heute lerne ich…'],
      ['Ich habe kein Zeit.', 'Ich habe keine Zeit.', 'die Zeit — женский род: keine Zeit.'],
      ['Ich möchte ein Apfel.', 'Ich möchte einen Apfel.', 'После möchten — Akkusativ, мужской род: einen.'],
      ['Das ist mein Mutter.', 'Das ist meine Mutter.', 'die Mutter — женский род: meine.'],
      ['Wir haben zwei Zimmers.', 'Wir haben zwei Zimmer.', 'das Zimmer — во мн. ч. форма не меняется: die Zimmer.'],
      ['Du sprechst gut Deutsch.', 'Du sprichst gut Deutsch.', 'sprechen меняет e → i у du и er: du sprichst.'],
      ['Ich trinke nicht Kaffee.', 'Ich trinke keinen Kaffee.', 'Существительное без артикля отрицаем через kein: keinen Kaffee.'],
    ],
    'A1.2': [
      ['Ich stehe auf um sieben Uhr.', 'Ich stehe um sieben Uhr auf.', 'Отделяемая приставка уходит в конец предложения.'],
      ['Ich kann gut schwimme.', 'Ich kann gut schwimmen.', 'После модального глагола — инфинитив: schwimmen.'],
      ['Ich fahre mit der Bus.', 'Ich fahre mit dem Bus.', 'mit + Dativ, der Bus → mit dem Bus.'],
      ['Ich gehe zur Arzt.', 'Ich gehe zum Arzt.', 'der Arzt — мужской род: zu dem = zum.'],
      ['Der Kurs beginnt am neun Uhr.', 'Der Kurs beginnt um neun Uhr.', 'Точное время — с um: um neun Uhr.'],
      ['Nimmst das Medikament!', 'Nimm das Medikament!', 'Imperativ для du: без du и без -st: Nimm!'],
      ['Die Schuhe gefällt mir.', 'Die Schuhe gefallen mir.', 'Подлежащее — die Schuhe (мн. ч.), поэтому gefallen.'],
      ['Kannst du mich helfen?', 'Kannst du mir helfen?', 'helfen требует Dativ: mir.'],
      ['Ich habe nach Berlin gefahren.', 'Ich bin nach Berlin gefahren.', 'Глаголы движения образуют Perfekt с sein.'],
      ['Wir haben Pizza geesst.', 'Wir haben Pizza gegessen.', 'essen — неправильный глагол: gegessen.'],
    ],
    'A2.1': [
      ['Ich lerne Deutsch, weil ich will in Berlin arbeiten.', 'Ich lerne Deutsch, weil ich in Berlin arbeiten will.', 'После weil спрягаемый глагол уходит в конец.'],
      ['Ich glaube, dass er kommt heute.', 'Ich glaube, dass er heute kommt.', 'После dass глагол стоит в конце.'],
      ['Ich lege das Buch auf dem Tisch.', 'Ich lege das Buch auf den Tisch.', 'Куда? (legen) → Akkusativ: auf den Tisch.'],
      ['Das Bild hängt an die Wand.', 'Das Bild hängt an der Wand.', 'Где? (hängt) → Dativ: an der Wand.'],
      ['Ich kaufe den schwarze Mantel.', 'Ich kaufe den schwarzen Mantel.', 'После den прилагательное получает -en.'],
      ['Berlin ist größer wie München.', 'Berlin ist größer als München.', 'После сравнительной степени — als.'],
      ['Gestern ich war krank.', 'Gestern war ich krank.', 'Глагол на 2-м месте: Gestern war ich…'],
      ['Wir fahren nach die Schweiz.', 'Wir fahren in die Schweiz.', 'Страны с артиклем — in: in die Schweiz.'],
      ['Er hat an dich gedenkt.', 'Er hat an dich gedacht.', 'denken — смешанный глагол: gedacht.'],
      ['Ich gebe das Buch ihm.', 'Ich gebe ihm das Buch.', 'Местоимение ставится раньше существительного.'],
    ],
    'A2.2': [
      ['Als ich Zeit habe, lese ich.', 'Wenn ich Zeit habe, lese ich.', 'Для настоящего и повторяющегося — wenn, als только для одного события в прошлом.'],
      ['Ich weiß nicht, ob kommt er.', 'Ich weiß nicht, ob er kommt.', 'После ob глагол в конце.'],
      ['Ich freue mich für den Urlaub.', 'Ich freue mich auf den Urlaub.', 'sich freuen auf — радоваться предстоящему.'],
      ['Er interessiert sich an Musik.', 'Er interessiert sich für Musik.', 'sich interessieren für.'],
      ['Ich putze mich die Zähne.', 'Ich putze mir die Zähne.', 'Есть дополнение (die Zähne) — возвратное местоимение в Dativ: mir.'],
      ['Es regnet, trotzdem wir gehen spazieren.', 'Es regnet, trotzdem gehen wir spazieren.', 'trotzdem занимает 1-е место, сразу за ним глагол.'],
      ['Das ist ein schöne Wald.', 'Das ist ein schöner Wald.', 'После ein мужской род в Nominativ: -er.'],
      ['Ich habe vergessen, dich anrufen.', 'Ich habe vergessen, dich anzurufen.', 'После vergessen — zu + инфинитив, у отделяемых zu внутри: anzurufen.'],
      ['Gestern ich schrieb einen Brief.', 'Gestern schrieb ich einen Brief.', 'Глагол на 2-м месте.'],
      ['Du wirdst immer besser.', 'Du wirst immer besser.', 'werden: du wirst, er wird.'],
    ],
    'B1.1': [
      ['Das ist der Mann, den mir hilft.', 'Das ist der Mann, der mir hilft.', 'Мужчина помогает (кто?) → Nominativ: der.'],
      ['Ich spare Geld, um ein Auto kaufen.', 'Ich spare Geld, um ein Auto zu kaufen.', 'um … zu + инфинитив: zu kaufen.', 'kaufen'],
      ['Wenn ich reich war, würde ich reisen.', 'Wenn ich reich wäre, würde ich reisen.', 'Нереальное условие — Konjunktiv II: wäre.'],
      ['Obwohl es regnet, wir gehen spazieren.', 'Obwohl es regnet, gehen wir spazieren.', 'Придаточное занимает 1-е место, поэтому главное начинается с глагола.'],
      ['Das Haus wird gerade renoviert worden.', 'Das Haus wird gerade renoviert.', 'Präsens Passiv: wird + Partizip II, без worden.', 'worden'],
      ['Wegen dem Regen bleiben wir zu Hause.', 'Wegen des Regens bleiben wir zu Hause.', 'wegen + Genitiv: des Regens.'],
      ['Nachdem er gegessen hat, ging er spazieren.', 'Nachdem er gegessen hatte, ging er spazieren.', 'Главное в Präteritum → после nachdem Plusquamperfekt: hatte.'],
      ['Ich habe mit dem Kollege gesprochen.', 'Ich habe mit dem Kollegen gesprochen.', 'N-склонение: dem Kollegen.'],
      ['Ich erkläre es, um du es verstehst.', 'Ich erkläre es, damit du es verstehst.', 'Разные подлежащие → damit, а не um … zu.'],
      ['Seit ich hier wohne, ich fahre Fahrrad.', 'Seit ich hier wohne, fahre ich Fahrrad.', 'После придаточного главное начинается с глагола.'],
    ],
    'B1.2': [
      ['Das Gesetz muss geändert worden.', 'Das Gesetz muss geändert werden.', 'Пассив с модальным глаголом: Partizip II + werden.'],
      ['Ich trinke weder Kaffee oder Tee.', 'Ich trinke weder Kaffee noch Tee.', 'weder … noch.'],
      ['Je mehr ich lerne, desto ich spreche besser.', 'Je mehr ich lerne, desto besser spreche ich.', 'После desto сразу сравнительная степень, затем глагол.'],
      ['Er lässt sein Fahrrad zu reparieren.', 'Er lässt sein Fahrrad reparieren.', 'После lassen инфинитив без zu.', 'zu'],
      ['Das ist alles, das ich weiß.', 'Das ist alles, was ich weiß.', 'После alles, nichts, etwas — was.'],
      ['Der Kollege, deren Frau Ärztin ist, kommt heute.', 'Der Kollege, dessen Frau Ärztin ist, kommt heute.', 'Kollege — мужской род: dessen.'],
      ['Wenn ich das gewusst habe, wäre ich gekommen.', 'Wenn ich das gewusst hätte, wäre ich gekommen.', 'Нереальное в прошлом: hätte + Partizip II.'],
      ['Sie ging, ohne etwas sagen.', 'Sie ging, ohne etwas zu sagen.', 'ohne … zu + инфинитив.', 'sagen'],
      ['Ich werde dich morgen anrufe.', 'Ich werde dich morgen anrufen.', 'Futur I: werden + инфинитив.'],
      ['Wir müssen bald eine Entscheidung machen.', 'Wir müssen bald eine Entscheidung treffen.', 'Устойчивое сочетание: eine Entscheidung treffen.'],
    ],
  };

  window.DE_ERRORS = DATA;
  window.DE_ERRORS_TOOLS = { errorWords: (it) => errorWords(it), diffRight: (it) => diffRight(it) };
  const strip = (w) => w.replace(/[.,!?;:]/g, '').toLowerCase();
  function errorWords([wrong, right, , explicit]) {
    if (explicit) return new Set(explicit.split('|').map(strip));
    const a = wrong.split(' ');
    const b = right.split(' ');
    return new Set(a.filter((w, i) => strip(w) !== strip(b[i] || '')).map(strip));
  }
  function diffRight([wrong, right]) {
    const a = wrong.split(' ').map(strip);
    return right.split(' ').map((w) => (a.includes(strip(w)) ? esc(w) : `<b class="dw-ok">${esc(w)}</b>`)).join(' ');
  }

  const reached = () => {
    const next = D.UNITS.find((u) => { const s = D.getState().units[u.id] || {}; return !(s.w && s.s); });
    return next ? next.level : 'B1.2';
  };
  let fe = { level: null, items: [], i: 0, phase: 'idle', pick: null, ok: 0 };
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };

  function start() {
    const level = fe.level || reached();
    const pool = level === 'mix' ? Object.entries(DATA).filter(([l]) => l <= reached()).flatMap(([l, list]) => list.map((x, i) => [...x.slice(0, 3), x[3], l, i])) : DATA[level].map((x, i) => [...x.slice(0, 3), x[3], level, i]);
    fe = { ...fe, level, items: shuffle(pool).slice(0, ROUND), i: 0, phase: 'ask', pick: null, ok: 0 };
    rerender();
  }
  function pick(idx) {
    if (fe.phase !== 'ask') return;
    const it = fe.items[fe.i];
    const word = it[0].split(' ')[idx];
    const ok = errorWords(it).has(strip(word));
    if (ok) D.clearMistake(`e:${it[4]}:${it[5]}`); else D.noteMistake(`e:${it[4]}:${it[5]}`, { t: 'e', level: it[4], idx: it[5] });
    D.countResult(ok);
    D.commit();
    fe = { ...fe, phase: 'fb', pick: idx, ok: fe.ok + (ok ? 1 : 0) };
    rerender();
    const nb = document.getElementById('feNext');
    if (nb) nb.focus();
  }
  function next() {
    if (fe.i + 1 >= fe.items.length) { fe = { ...fe, phase: 'done' }; rerender(); return; }
    fe = { ...fe, i: fe.i + 1, phase: 'ask', pick: null };
    rerender();
  }

  function render() {
    if (fe.phase === 'ask' || fe.phase === 'fb') {
      const it = fe.items[fe.i];
      const errs = errorWords(it);
      const words = it[0].split(' ');
      const asking = fe.phase === 'ask';
      const ok = !asking && errs.has(strip(words[fe.pick]));
      const pct = Math.round((fe.i / fe.items.length) * 100);
      const chips = words.map((w, i) => {
        let cls = '';
        if (!asking && errs.has(strip(w))) cls = 'err';
        else if (!asking && i === fe.pick) cls = 'miss';
        return `<button class="chip fe ${cls}" data-act="fe-pick" data-i="${i}" ${asking ? '' : 'disabled'}>${esc(w)}</button>`;
      }).join('');
      const why = window.DW_whyBtn ? window.DW_whyBtn({ level: it[4], task: `Найти и исправить ошибку в предложении «${it[0]}»`, user: `ученик выбрал слово «${words[fe.pick]}»`, right: it[1] }) : '';
      const fb = asking ? '' : `<div class="fb ${ok ? 'ok' : 'bad'}"><span class="verdict">${ok ? 'Верно, ошибка найдена!' : 'Ошибка в другом месте'}</span>
          <span class="answer">${diffRight(it)}</span><span class="small">${esc(it[2])}</span></div>
          <div class="s-actions">${why}<button class="btn primary" id="feNext" data-act="fe-next">Дальше ↵</button></div>`;
      return `<div class="session"><div class="s-top"><a class="icon-btn" href="#practice" aria-label="Завершить">✕</a>
          <div class="track"><i style="width:${pct}%"></i></div><span class="s-count">${fe.i + 1} / ${fe.items.length}</span></div>
        <p class="eyebrow">Найди ошибку · ${esc(it[4])}</p>
        <div class="card"><div class="prompt"><span class="muted small">В предложении одна ошибка. Нажмите на неверное слово.</span></div>
          <div class="bank fe-line">${chips}</div>${fb}</div></div>`;
    }
    const level = fe.level || reached();
    const done = fe.phase === 'done';
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Найди ошибку</h1><p class="muted">В каждом предложении спрятана одна типичная ошибка: артикль, падеж, порядок слов или форма глагола. Найдите её — так вы научитесь замечать ошибки и в своей речи.</p></div>
      ${done ? `<section class="panel hero"><p class="eyebrow">Результат</p><div class="row" style="align-items:baseline"><span class="num done-score">${fe.ok}</span><span class="muted">из ${fe.items.length} найдено</span></div></section>` : ''}
      <section class="panel stack"><h3>Уровень</h3>
        <div class="levels lv-wide" role="group">${[['mix', 'Всё пройденное'], ...D.LEVELS.map((l) => [l.id, l.id])].map(([id, l]) => `<button class="lv" data-act="fe-level" data-id="${id}" aria-pressed="${level === id}">${l}</button>`).join('')}</div>
        <div class="row"><button class="btn primary" data-act="fe-start">${done ? 'Ещё раунд' : 'Начать'}</button><span class="small muted">${ROUND} предложений</span></div></section>`;
  }

  D.register({
    views: { errors: render },
    nav: { errors: 'practice' },
    actions: {
      'fe-level': (el) => { fe = { ...fe, level: el.dataset.id }; rerender(); },
      'fe-start': () => start(),
      'fe-pick': (el) => pick(Number(el.dataset.i)),
      'fe-next': () => next(),
    },
    hooks: {
      keydown: (ev) => {
        if (ev.key === 'Enter' && location.hash === '#errors' && fe.phase === 'fb' && !ev.target.closest('button')) { ev.preventDefault(); next(); }
      },
    },
  });
  window.addEventListener('hashchange', () => { if (location.hash !== '#errors' && fe.phase !== 'idle') fe = { ...fe, phase: 'idle' }; });
})();
