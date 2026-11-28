/* «Экзамен A2»: что за экзамен, дата и план, тренировка Lesen / Hören в формате Goethe A2,
   Schreiben (задания из «Писем»), Sprechen по трём частям и грамматика для экзамена. Данные — a2prep-data.js. */
(() => {
  'use strict';
  const D = window.DW;
  const A = window.DE_A2;
  if (!D || !A) return;
  const { esc, shuffle } = D;
  const EXT_KEY = 'a2';
  const DAY_MS = 86400000;
  const POINTS_PER_MODULE = 25;
  const PASS_POINTS = 60;
  const WRITTEN_MIN = 45;
  const ORAL_MIN = 15;
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  const PARTS = { lesen: A.lesen, hoeren: A.hoeren };
  const CODE = { lesen: 'L', hoeren: 'H' };
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };
  const back = '<a class="back" href="#a2">← Экзамен A2</a>';
  const br = (s) => esc(s).replace(/\n/g, '<br>');

  /* ---------- сохранённое ---------- */
  const saved = () => D.getExt(EXT_KEY) || {};
  function save(patch) { D.setExt(EXT_KEY, { ...saved(), ...patch }); D.commit(); }
  const toggleIn = (key, id) => { const cur = { ...(saved()[key] || {}) }; if (cur[id]) delete cur[id]; else cur[id] = true; save({ [key]: cur }); };
  const bestOf = (kind) => PARTS[kind].reduce((n, p) => n + ((saved().best || {})[`${CODE[kind]}${p.n}`] || 0), 0);
  const itemsOf = (kind) => PARTS[kind].reduce((n, p) => n + p.items.length, 0);

  /* ---------- состояние ---------- */
  let tr = { picks: {}, checked: {}, plays: {} };
  let sp = { order: shuffle([...A.cards.keys()]), card: 0, show: false, topic: 0, model: false, plan: 0, pick: null, dialog: false };

  /* ================= главная ================= */
  function daysLeft(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return null;
    const [y, m, d] = date.split('-').map(Number);
    const today = new Date();
    const start = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.round((Date.UTC(y, m - 1, d) - start) / DAY_MS);
  }
  function adviceFor(left) {
    if (left === 0) return 'Сегодня экзамен. Спокойно, медленно читайте задания — Viel Erfolg!';
    if (left <= 7) return 'Последняя неделя: пробные варианты с таймером, фразы для Sprechen вслух, накануне — отдых.';
    if (left <= 28) return 'Каждую неделю: все четыре части + один пробный экзамен. Слабую часть — каждый день по 15 минут.';
    return 'Времени достаточно: по одной части в день, грамматика из списка — по теме в день.';
  }
  function countdown() {
    const date = saved().date || '';
    const left = daysLeft(date);
    const big = left !== null && left >= 0
      ? `<div class="row" style="align-items:baseline"><span class="num done-score">${left}</span><span class="muted">${left === 0 ? 'сегодня!' : `${plural(left, 'день', 'дня', 'дней')} до экзамена`}</span></div><p class="small" style="margin:0">${adviceFor(left)}</p>` : '';
    return `<section class="panel hero stack" style="gap:10px"><label class="stack" style="gap:6px"><span class="eyebrow">Дата экзамена</span>
      <input type="date" id="a2Date" class="a2-date" value="${esc(date)}" aria-label="Дата экзамена"></label>${big}</section>`;
  }
  const plural = (n, one, few, many) => { const m10 = n % 10; const m100 = n % 100; if (m10 === 1 && m100 !== 11) return one; if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few; return many; };

  function renderHub() {
    const s = saved();
    const plan = s.plan || {};
    const gram = Object.keys(s.gram || {}).length;
    const ltDone = (D.getExt('lt') || {}).done || {};
    const examTasks = ((window.DE_LETTERS || {}).tasks || []).filter((t) => t.exam);
    const card = (href, t, d, c) => `<a class="pane pack hub-card" href="${href}"><span class="hub-dot" style="background:var(--${c})"></span><span class="pane-big">${t}</span><span class="count">${d}</span></a>`;
    const planDone = A.plan.filter((x, i) => plan[i]).length;
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Экзамен A2</h1><p class="muted">Всё для Goethe-Zertifikat A2: как устроен экзамен, как набрать баллы и тренировка каждой части в формате экзамена.</p></div>
      ${countdown()}
      <section class="packs hub">
        ${card('#a2-about', 'Что за экзамен', 'Части, время, баллы, что взять с собой', 'das')}
        ${card('#a2-lesen', 'Lesen · чтение', `4 части, ${itemsOf('lesen')} заданий · лучший ${bestOf('lesen')}/${itemsOf('lesen')}`, 'der')}
        ${card('#a2-hoeren', 'Hören · аудирование', `4 части, ${itemsOf('hoeren')} заданий · лучший ${bestOf('hoeren')}/${itemsOf('hoeren')}`, 'die')}
        ${card('#a2-schreiben', 'Schreiben · письмо', `SMS и e-mail с проверкой · готово ${examTasks.filter((t) => ltDone[t.id]).length} из ${examTasks.length}`, 'das')}
        ${card('#a2-sprechen', 'Sprechen · разговор', 'Карточки, рассказ о себе, договориться о встрече', 'der')}
        ${card('#a2-gram', 'Грамматика для A2', `${gram} из ${A.grammar.length} тем отмечены «знаю»`, 'die')}
        ${card('#exam-A2', 'Пробный экзамен A2', 'Чтение, аудирование и письмо подряд', 'das')}
      </section>
      <div class="sec-head"><h2>План подготовки</h2><span class="small muted">${planDone} из ${A.plan.length}</span></div>
      <section class="panel stack" style="gap:10px">${A.plan.map((p, i) => `<label class="toggle"><input type="checkbox" data-act="a2-plan" data-i="${i}" ${plan[i] ? 'checked' : ''}> ${esc(p)}</label>`).join('')}</section>`;
  }

  /* ================= что за экзамен ================= */
  function renderAbout() {
    const mods = A.modules.map((m) => `<section class="panel stack" style="gap:6px"><span class="eyebrow">${esc(m.time)} · ${m.parts} ${plural(m.parts, 'часть', 'части', 'частей')}</span>
      <h2><span lang="de">${esc(m.de)}</span> · ${esc(m.t)}</h2><p class="a2-p">${esc(m.what)}</p>
      ${PARTS[m.id] ? `<a class="small" href="#a2-${m.id}">Тренировать →</a>` : `<a class="small" href="#a2-${m.id}">Подготовиться →</a>`}</section>`).join('');
    const list = (arr) => `<ul class="a2-list">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
    return `${back}<div class="page-head"><h1>Что за экзамен</h1><p class="muted">Goethe-Zertifikat A2: четыре части — чтение, аудирование, письмо и разговор.</p></div>
      ${mods}
      <section class="panel stack" style="gap:8px"><h2>Баллы и правила</h2>${list(A.scoring)}
        <p class="small muted" style="margin:0">Чтобы сдать, нужно ${PASS_POINTS} из ${POINTS_PER_MODULE * 4}: в письменной части хотя бы ${WRITTEN_MIN} из ${POINTS_PER_MODULE * 3}, в Sprechen — хотя бы ${ORAL_MIN} из ${POINTS_PER_MODULE}. Внутри письменной части сильное чтение может вытянуть слабое письмо, но Sprechen ничем не заменить — тренируйте его вслух.</p></section>
      <section class="panel stack" style="gap:8px"><h2>Как набрать баллы</h2>${A.tips.map(([t, d]) => `<div class="a2-tip"><b lang="de">${esc(t)}</b><span>${esc(d)}</span></div>`).join('')}</section>
      <section class="panel stack" style="gap:8px"><h2>В день экзамена</h2>${list(A.day)}</section>
      <section class="panel stack" style="gap:6px"><span class="eyebrow">Важно</span><p class="a2-p">${esc(A.other)}</p></section>`;
  }

  /* ================= Lesen / Hören ================= */
  const keyOf = (kind, n, i) => `${CODE[kind]}${n}-${i}`;
  const optsOf = (part, it) => it.o || part.opts;
  function playBtn(pk, limit, done) {
    const plays = tr.plays[pk] || 0;
    const left = Math.max(0, limit - plays);
    return `<div class="row"><button class="btn primary small" data-act="a2-play" data-k="${pk}" ${left === 0 && !done ? 'disabled' : ''}>${PLAY} ${plays ? 'Ещё раз' : 'Слушать'}</button>
      <span class="small muted">${done ? 'Можно слушать сколько угодно' : `На экзамене — ${limit === 1 ? 'один раз' : 'два раза'} · осталось ${left}`}</span></div>`;
  }
  function itemHtml(kind, part, it, i) {
    const key = keyOf(kind, part.n, i);
    const done = !!tr.checked[`${CODE[kind]}${part.n}`];
    const pick = tr.picks[key];
    const opts = optsOf(part, it);
    const au = it.au ? playBtn(key, part.plays, done) : '';
    return `<div class="qitem">${au}<div class="qtext" lang="de">${esc(it.q)}</div><div class="opts">${opts.map((o, oi) => {
      let cls = pick === oi ? 'sel' : '';
      if (done && oi === it.a) cls = 'right'; else if (done && pick === oi) cls = 'wrong';
      return `<button class="opt ${cls}" data-act="a2-pick" data-k="${key}" data-o="${oi}" lang="de" ${done ? 'disabled' : ''}>${esc(o)}</button>`;
    }).join('')}</div>
      ${done && it.why ? `<span class="small muted">${esc(it.why)}</span>` : ''}
      ${done && it.au ? `<details class="small"><summary>Текст аудио</summary><p class="exam-text" lang="de">${esc(it.au)}</p></details>` : ''}</div>`;
  }
  function partHtml(kind, part) {
    const pk = `${CODE[kind]}${part.n}`;
    const done = !!tr.checked[pk];
    const answered = part.items.filter((it, i) => tr.picks[keyOf(kind, part.n, i)] !== undefined).length;
    const score = part.items.filter((it, i) => tr.picks[keyOf(kind, part.n, i)] === it.a).length;
    const foot = done
      ? `<div class="fb ${score >= Math.ceil(part.items.length * 0.6) ? 'ok' : 'bad'}" role="status"><span class="verdict">Teil ${part.n}: ${score} из ${part.items.length}</span>
          <div class="row"><button class="btn small" data-act="a2-again" data-k="${pk}">Ещё раз</button></div></div>`
      : `<div class="row"><button class="btn primary" data-act="a2-check" data-kind="${kind}" data-n="${part.n}" ${answered < part.items.length ? 'disabled' : ''}>Проверить</button><span class="small muted">Отвечено ${answered} из ${part.items.length}</span></div>`;
    return `<section class="panel stack" id="${pk}"><span class="eyebrow">Teil ${part.n}</span><h2>${esc(part.title)}</h2>
      <p class="a2-p">${esc(part.how)}</p>
      <details class="a2-hint"><summary>Совет к этой части</summary><p class="a2-p">${esc(part.tip)}</p></details>
      ${part.text ? `<div class="exam-text" lang="de">${br(part.text)}</div>` : ''}
      ${part.audio ? playBtn(pk, part.plays, done) : ''}
      ${part.audio && done ? `<details class="small"><summary>Текст аудио</summary><p class="exam-text" lang="de">${esc(part.audio)}</p></details>` : ''}
      <div class="quiz">${part.items.map((it, i) => itemHtml(kind, part, it, i)).join('')}</div>${foot}</section>`;
  }
  function renderSkill(kind) {
    const parts = PARTS[kind];
    const all = parts.every((p) => tr.checked[`${CODE[kind]}${p.n}`]);
    const total = parts.reduce((n, p) => n + p.items.filter((it, i) => tr.picks[keyOf(kind, p.n, i)] === it.a).length, 0);
    const max = itemsOf(kind);
    const pts = Math.round((total / max) * POINTS_PER_MODULE * 10) / 10;
    const head = kind === 'lesen'
      ? ['Lesen · чтение', 'Четыре части, как на экзамене: 30 минут на всё. Засеките время — это тоже тренировка.']
      : ['Hören · аудирование', 'Четыре части, как на экзамене. Перед прослушиванием прочитайте вопросы. Лимит прослушиваний — как на экзамене.'];
    const sum = all ? `<section class="panel hero"><p class="eyebrow">Итог</p><div class="row" style="align-items:baseline"><span class="num done-score">${total}/${max}</span>
        <span class="muted">≈ ${pts} из ${POINTS_PER_MODULE} баллов · ${pts >= POINTS_PER_MODULE * 0.6 ? 'на уровне «сдано»' : 'пока ниже 60%'}</span></div></section>` : '';
    return `${back}<div class="page-head"><h1>${head[0]}</h1><p class="muted">${head[1]}</p></div>${sum}${parts.map((p) => partHtml(kind, p)).join('')}`;
  }
  function checkPart(kind, n) {
    const part = PARTS[kind].find((p) => p.n === n);
    if (!part) return;
    const score = part.items.filter((it, i) => tr.picks[keyOf(kind, n, i)] === it.a).length;
    part.items.forEach((it, i) => D.countResult(tr.picks[keyOf(kind, n, i)] === it.a));
    const pk = `${CODE[kind]}${n}`;
    tr = { ...tr, checked: { ...tr.checked, [pk]: true } };
    const best = { ...(saved().best || {}) };
    best[pk] = Math.max(best[pk] || 0, score);
    save({ best });
  }
  function resetPart(pk) {
    const keep = (obj) => Object.fromEntries(Object.entries(obj).filter(([k]) => k !== pk && !k.startsWith(`${pk}-`)));
    tr = { picks: keep(tr.picks), checked: keep(tr.checked), plays: keep(tr.plays) };
  }
  function audioFor(pk) {
    const [, code, n, i] = pk.match(/^([LH])(\d+)(?:-(\d+))?$/) || [];
    const part = (code === 'H' ? A.hoeren : A.lesen).find((p) => p.n === Number(n));
    if (!part) return '';
    return i === undefined ? part.audio || '' : (part.items[Number(i)] || {}).au || '';
  }

  /* ================= Schreiben ================= */
  function renderSchreiben() {
    const tasks = ((window.DE_LETTERS || {}).tasks || []).filter((t) => t.exam);
    const done = (D.getExt('lt') || {}).done || {};
    return `${back}<div class="page-head"><h1>Schreiben · письмо</h1><p class="muted">Два текста за 30 минут: SMS другу и e-mail на «Вы». Ниже — задания в формате экзамена, проверка покажет, что поправить.</p></div>
      <section class="panel stack" style="gap:8px">${A.schreiben.map(([t, d]) => `<div class="a2-tip"><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join('')}</section>
      <div class="sec-head"><h2>Задания как на экзамене</h2></div>
      <section class="packs">${tasks.map((t) => `<a class="pane pack" href="#lt-w-${t.id}"><span class="hub-dot" style="background:var(--${t.reg === 'f' ? 'der' : 'die'})"></span>
        <span class="pane-big">${esc(t.t)}</span><span class="count">${esc(t.exam)} · ${t.reg === 'f' ? 'на «Вы»' : 'на «ты»'}${done[t.id] ? ' · ✓ готово' : ''}</span></a>`).join('')}</section>
      <div class="row"><a class="btn" href="#lt-rules">Правила писем</a><a class="btn" href="#lt-phrases">Фразы для писем</a><a class="btn ghost" href="#letters">Все письма</a></div>`;
  }

  /* ================= Sprechen ================= */
  const say = (de) => D.speakBtn(de);
  function teil1() {
    const [word, q, ans] = A.cards[sp.order[sp.card]];
    return `<section class="panel stack"><span class="eyebrow">Teil 1 · Вопросы о себе</span><h2>Карточка: спросите и ответьте</h2>
      <p class="a2-p">На экзамене у вас и у партнёра по 4 карточки со словом. По каждой карточке вы задаёте партнёру вопрос, потом отвечаете на его вопрос. Вопрос — с W-словом (глагол на 2-м месте) или без него (глагол первым: <span lang="de">Hast du …?</span>). С партнёром обычно на «du».</p>
      <div class="a2-card" lang="de">${esc(word)}</div>
      <p class="small muted" style="margin:0">Задайте вопрос вслух, ответьте на него сами — и проверьте.</p>
      ${sp.show ? `<div class="stack" style="gap:6px"><div class="drow phrase"><div class="wd" lang="de">${esc(q)}</div><div class="ru small">вопрос</div><div class="acts">${say(q)}</div></div>
        <div class="drow phrase"><div class="wd" lang="de">${esc(ans)}</div><div class="ru small">ответ</div><div class="acts">${say(ans)}</div></div></div>` : ''}
      <div class="row">${sp.show ? '' : '<button class="btn primary small" data-act="a2-card-show">Показать</button>'}<button class="btn small" data-act="a2-card-next">Следующая карточка</button>
        <span class="small muted">${sp.card + 1} из ${A.cards.length}</span></div></section>`;
  }
  function teil2() {
    const t = A.topics[sp.topic];
    const tabs = A.topics.map((x, i) => `<button class="lv" data-act="a2-topic" data-i="${i}" aria-pressed="${sp.topic === i}">${i + 1}</button>`).join('');
    return `<section class="panel stack"><span class="eyebrow">Teil 2 · Рассказ о себе</span><h2>Тема и четыре пункта</h2>
      <p class="a2-p">Вы получаете карточку с вопросом и четырьмя пунктами. Говорите 1–2 минуты: по 1–2 предложения на каждый пункт. Потом экзаменатор или партнёр задаст ещё вопрос. Совет: включите запись на телефоне и послушайте себя.</p>
      <div class="levels lv-wide" role="group" aria-label="Тема">${tabs}</div>
      <div class="a2-card" lang="de">${esc(t.q)}</div>
      <div class="a2-aspects" lang="de">${t.aspects.map((a) => `<span class="pill">${esc(a)}</span>`).join('')}</div>
      <p class="small muted" style="margin:0">Помогают начать: <span lang="de">Ich möchte über … erzählen. · Zuerst … · Am liebsten … · Das finde ich …</span></p>
      <div class="row"><button class="btn small ${sp.model ? 'ghost' : 'primary'}" data-act="a2-model">${sp.model ? 'Скрыть образец' : 'Показать образец'}</button>${sp.model ? say(t.model) : ''}</div>
      ${sp.model ? `<div class="exam-text" lang="de">${esc(t.model)}</div>` : ''}</section>`;
  }
  const calendar = (title, rows) => `<div class="a2-cal"><span class="eyebrow">${title}</span>${rows.map(([h, x]) => `<div class="a2-cal-row"><b>${esc(h)}</b><span lang="de">${esc(x)}</span></div>`).join('')}</div>`;
  function teil3() {
    const p = A.plans[sp.plan];
    const tabs = A.plans.map((x, i) => `<button class="lv" data-act="a2-plan-pick" data-i="${i}" aria-pressed="${sp.plan === i}">${esc(x.t)}</button>`).join('');
    const picked = sp.pick !== null;
    return `<section class="panel stack"><span class="eyebrow">Teil 3 · Договориться</span><h2>Найдите общее время</h2>
      <p class="a2-p">У вас и у партнёра разные календари. Нужно предлагать время, отказываться с причиной и в конце договориться. Оценивают не «правильный» ответ, а то, как вы общаетесь: предлагаете, реагируете, объясняете.</p>
      <div class="levels lv-wide" role="group" aria-label="Ситуация">${tabs}</div>
      <p class="a2-p">${esc(p.task)}</p><p class="small muted" style="margin:0" lang="de">${esc(p.de)}</p>
      <div class="a2-cals">${calendar('Ваш календарь', p.you)}${calendar('Календарь партнёра', p.partner)}</div>
      <div class="qitem"><div class="qtext">Когда вы оба свободны?</div><div class="opts">${p.o.map((o, oi) => {
        const cls = picked && oi === p.a ? 'right' : picked && oi === sp.pick ? 'wrong' : '';
        return `<button class="opt ${cls}" data-act="a2-slot" data-o="${oi}" lang="de" ${picked ? 'disabled' : ''}>${esc(o)}</button>`;
      }).join('')}</div></div>
      <div class="row"><button class="btn small ${sp.dialog ? 'ghost' : ''}" data-act="a2-dialog">${sp.dialog ? 'Скрыть диалог' : 'Показать образец диалога'}</button></div>
      ${sp.dialog ? `<section class="panel dict">${p.dialog.map(([who, de]) => `<div class="drow phrase"><div class="wd" lang="de"><b>${who}:</b> ${esc(de)}</div><div class="ru small">${who === 'A' ? 'вы' : 'партнёр'}</div><div class="acts">${say(de)}</div></div>`).join('')}</section>` : ''}</section>`;
  }
  function renderSprechen() {
    return `${back}<div class="page-head"><h1>Sprechen · разговор</h1><p class="muted">Около 15 минут, вы и партнёр. Тренируйтесь вслух — молча это не работает.</p></div>
      ${teil1()}${teil2()}${teil3()}
      <div class="sec-head"><h2>Фразы, которые спасают</h2></div>
      ${A.speak.map((g) => `<section class="stack" style="gap:8px"><h3>${esc(g.t)}</h3><section class="panel dict">${g.p.map(([de, ru]) => `<div class="drow phrase"><div class="wd" lang="de">${esc(de)}</div>
        <div class="ru small">${esc(ru)}</div><div class="acts">${say(de.replace(/…/g, ''))}</div></div>`).join('')}</section></section>`).join('')}`;
  }

  /* ================= грамматика ================= */
  function renderGram() {
    const known = saved().gram || {};
    const rules = A.grammar.filter(([id]) => D.RULE[id]);
    const units = (D.UNITS || []).filter((u) => /^A2/.test(u.level || ''));
    return `${back}<div class="page-head"><h1>Грамматика для A2</h1><p class="muted">Темы, которые нужны на экзамене постоянно. Отмечайте, что уже знаете, и повторяйте остальное — по одной теме в день.</p></div>
      <section class="stack" style="gap:8px">${rules.map(([id, why]) => `<div class="a2-gram ${known[id] ? 'known' : ''}">
        <label class="toggle" title="Знаю"><input type="checkbox" data-act="a2-gram" data-id="${id}" ${known[id] ? 'checked' : ''} aria-label="Знаю: ${esc(D.RULE[id].t)}"></label>
        <a href="#rule-${id}"><b>${esc(D.RULE[id].t)}</b><span class="small muted">${esc(why)}</span></a></div>`).join('')}</section>
      ${units.length ? `<div class="sec-head"><h2>Темы слов A2</h2></div><section class="packs">${units.map((u) => `<a class="pane pack" href="#unit-${u.id}"><span class="pane-big">${esc(u.t)}</span><span class="count">${u.level} · ${u.words.length} слов</span></a>`).join('')}</section>` : ''}`;
  }

  /* ================= маршрутизация ================= */
  function renderSection(id) {
    if (id === 'about') return renderAbout();
    if (id === 'lesen' || id === 'hoeren') return renderSkill(id);
    if (id === 'schreiben') return renderSchreiben();
    if (id === 'sprechen') return renderSprechen();
    if (id === 'gram') return renderGram();
    return renderHub();
  }

  D.register({
    views: { a2: renderHub, a2x: (id) => renderSection(id || '') },
    prefixes: [['a2-', 'a2x']],
    nav: { a2: 'practice', a2x: 'practice' },
    actions: {
      'a2-plan': (el) => { toggleIn('plan', el.dataset.i); rerender(); },
      'a2-gram': (el) => { toggleIn('gram', el.dataset.id); rerender(); },
      'a2-pick': (el) => {
        const pk = el.dataset.k.split('-')[0];
        if (tr.checked[pk]) return;
        tr = { ...tr, picks: { ...tr.picks, [el.dataset.k]: Number(el.dataset.o) } };
        rerender();
      },
      'a2-check': (el) => { checkPart(el.dataset.kind, Number(el.dataset.n)); rerender(); },
      'a2-again': (el) => { resetPart(el.dataset.k); rerender(); },
      'a2-play': (el) => {
        const pk = el.dataset.k;
        const text = audioFor(pk);
        if (!text) return;
        tr = { ...tr, plays: { ...tr.plays, [pk]: (tr.plays[pk] || 0) + 1 } };
        D.speak(text, { rate: 0.95 });
        rerender();
      },
      'a2-card-show': () => { sp = { ...sp, show: true }; rerender(); },
      'a2-card-next': () => {
        const next = sp.card + 1;
        sp = next >= A.cards.length ? { ...sp, order: shuffle([...A.cards.keys()]), card: 0, show: false } : { ...sp, card: next, show: false };
        rerender();
      },
      'a2-topic': (el) => { const i = Number(el.dataset.i); if (A.topics[i]) { sp = { ...sp, topic: i, model: false }; rerender(); } },
      'a2-model': () => { sp = { ...sp, model: !sp.model }; rerender(); },
      'a2-plan-pick': (el) => { const i = Number(el.dataset.i); if (A.plans[i]) { sp = { ...sp, plan: i, pick: null, dialog: false }; rerender(); } },
      'a2-slot': (el) => {
        if (sp.pick !== null) return;
        const oi = Number(el.dataset.o);
        D.countResult(oi === A.plans[sp.plan].a);
        D.commit();
        sp = { ...sp, pick: oi };
        rerender();
      },
      'a2-dialog': () => { sp = { ...sp, dialog: !sp.dialog }; rerender(); },
    },
    hooks: {
      change: (ev) => {
        if (ev.target.id !== 'a2Date') return;
        const v = ev.target.value;
        save({ date: /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '' });
        rerender();
      },
    },
  });

})();
