/* «Мои слова»: свои слова и фразы. ИИ подставляет артикль, мн. ч., формы, перевод и пример. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc } = D;
  const POS_OK = ['noun', 'verb', 'adj', 'adv', 'prep', 'conj', 'pron', 'num', 'expr'];
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };

  let mw = { de: '', ru: '', pl: '', forms: '', pos: '', ex: '', exRu: '', busy: false, msg: '', confirm: null };
  const myWords = () => D.WORDS.filter((w) => w.custom);
  const val = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const readForm = () => { mw = { ...mw, de: val('mwDe'), ru: val('mwRu'), pl: val('mwPl'), forms: val('mwForms') }; };

  async function fillWithAI() {
    readForm();
    if (!mw.de && !mw.ru) { mw = { ...mw, msg: 'Введите слово по-немецки или по-русски.' }; rerender(); return; }
    const c = D.claude();
    const sample = c ? await c.use('sample') : null;
    if (!sample) { mw = { ...mw, msg: 'Автозаполнение работает в веб-версии внутри Claude. Можно заполнить поля вручную.' }; rerender(); return; }
    mw = { ...mw, busy: true, msg: '' };
    rerender();
    const prompt = `Помоги ученику (родной язык русский) добавить слово в словарь немецкого.
Он ввёл: немецкий — «${mw.de || '—'}», русский — «${mw.ru || '—'}».
Если немецкого нет — переведи с русского самым употребительным словом. Исправь опечатки.
Верни только JSON:
{"de": "словарная форма; существительное обязательно с артиклем der/die/das и с большой буквы", "plural": "форма мн. ч. без артикля, '-' если нет мн. ч., 'Pl' если только мн. ч.; для не-существительных пустая строка", "forms": "для неправильных или отделяемых глаголов: 3-е лицо и Perfekt, например 'er fährt, ist gefahren'; иначе пустая строка", "ru": "краткий перевод на русский", "pos": "одно из: noun, verb, adj, adv, prep, conj, pron, num, expr", "example": "короткий пример на немецком уровня A2", "example_ru": "перевод примера"}`;
    try {
      const r = await sample.json(prompt, { modelTier: 'default' });
      const o = r && typeof r === 'object' ? r : {};
      mw = { ...mw, busy: false, de: String(o.de || mw.de), ru: String(o.ru || mw.ru), pl: String(o.plural || ''), forms: String(o.forms || ''),
        pos: POS_OK.includes(o.pos) ? o.pos : '', ex: String(o.example || ''), exRu: String(o.example_ru || ''), msg: 'Проверьте поля и нажмите «Добавить».' };
    } catch (err) {
      const msg = { not_granted: 'Доступ к ИИ для этой страницы не разрешён.', rate_limited: 'Слишком много запросов. Попробуйте через минуту.' }[err && err.code] || 'Не получилось заполнить. Попробуйте ещё раз или заполните вручную.';
      mw = { ...mw, busy: false, msg };
    }
    rerender();
  }

  function add() {
    readForm();
    const de = mw.de.replace(/\|/g, ' ').trim();
    const ru = mw.ru.replace(/\|/g, ' ').trim();
    if (!de || !ru) { mw = { ...mw, msg: 'Нужны и немецкое слово, и перевод.' }; rerender(); return; }
    const isNoun = /^(der|die|das) \S/.test(de);
    const extra = isNoun ? (mw.pl.replace(/\|/g, ' ').trim() || '-') : mw.forms.replace(/\|/g, ' ').trim();
    const ok = D.addCustomWord({ raw: `${de}|${extra}|${ru}`, pos: mw.pos || undefined, ex: mw.ex ? `${mw.ex}${mw.exRu ? ` — ${mw.exRu}` : ''}` : '' });
    mw = ok ? { de: '', ru: '', pl: '', forms: '', pos: '', ex: '', exRu: '', busy: false, msg: `«${de}» добавлено и уже в повторении.`, confirm: null }
      : { ...mw, msg: 'Такое слово уже есть в словаре курса или в ваших словах.' };
    rerender();
  }

  function render() {
    const list = myWords();
    const isNoun = /^(der|die|das) /.test(mw.de);
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Мои слова</h1><p class="muted">Добавляйте слова и фразы из жизни — из сериалов, писем, разговоров. Они попадут в повторение, словарь и карточки.</p></div>
      <section class="panel stack">
        <h3>Новое слово</h3>
        <div class="form2">
          <label>Немецкий<input id="mwDe" lang="de" autocomplete="off" spellcheck="false" placeholder="например: der Schlüssel, aufräumen" value="${esc(mw.de)}"></label>
          <label>Перевод<input id="mwRu" autocomplete="off" placeholder="например: ключ" value="${esc(mw.ru)}"></label>
          <label>${isNoun ? 'Мн. ч. (без артикля)' : 'Формы глагола (если нужны)'}<input id="${isNoun ? 'mwPl' : 'mwForms'}" lang="de" autocomplete="off" spellcheck="false" placeholder="${isNoun ? 'Schlüssel' : 'er fährt, ist gefahren'}" value="${esc(isNoun ? mw.pl : mw.forms)}"></label>
        </div>
        ${mw.ex ? `<p class="small"><b>Пример:</b> <span lang="de">${esc(mw.ex)}</span>${mw.exRu ? ` <span class="muted">— ${esc(mw.exRu)}</span>` : ''}</p>` : ''}
        <div class="row">${D.STANDALONE ? '' : `<button class="btn" data-act="mw-ai" ${mw.busy ? 'disabled' : ''}>${mw.busy ? 'Заполняю…' : 'Заполнить с ИИ'}</button>`}
          <button class="btn primary" data-act="mw-add">Добавить</button>${mw.msg ? `<span class="small muted">${esc(mw.msg)}</span>` : ''}</div>
        ${D.STANDALONE ? '' : '<p class="small muted">Достаточно ввести слово на одном языке и нажать «Заполнить с ИИ» — артикль, мн. ч. и перевод подставятся сами.</p>'}
      </section>
      <div class="sec-head"><h2>Мои слова · ${list.length}</h2>${list.length ? '<button class="btn primary small" data-act="mw-train">Тренировать</button>' : ''}</div>
      ${list.length ? `<section class="panel dict">${list.slice().reverse().map((w) => {
        const st = D.wordStatus(w.key);
        return `<div class="drow"><div>${D.wordHtml(w)}<div class="pl">${D.wordExtra(w)}</div>${w.example ? `<div class="small muted" lang="de">${esc(w.example)}</div>` : ''}</div>
          <div class="ru small">${esc(w.ru)}</div>
          <div class="acts row" style="gap:4px;flex-wrap:nowrap"><span class="st ${st.cls}">${st.label}</span>${D.speakBtn(w.de)}
            ${mw.confirm === w.key ? `<button class="btn small" data-act="mw-del" data-k="${esc(w.key)}">Удалить</button>` : `<button class="icon-btn" data-act="mw-ask" data-k="${esc(w.key)}" aria-label="Удалить слово">✕</button>`}</div></div>`;
      }).join('')}</section>` : '<section class="panel empty"><p>Пока пусто. Добавьте первое слово выше или фразу из раздела <a href="#phrases">Разговорник</a>.</p></section>'}`;
  }

  D.register({
    views: { mywords: render },
    nav: { mywords: 'practice' },
    actions: {
      'mw-ai': () => fillWithAI(),
      'mw-add': () => add(),
      'mw-train': () => D.startWordSession(myWords(), 'Мои слова', '#mywords'),
      'mw-ask': (el) => { mw = { ...mw, confirm: el.dataset.k }; rerender(); },
      'mw-del': (el) => { D.removeCustomWord(el.dataset.k); mw = { ...mw, confirm: null, msg: '' }; rerender(); },
    },
    hooks: {
      input: (ev) => {
        if (ev.target.id === 'mwDe') {
          const wasNoun = /^(der|die|das) /.test(mw.de);
          mw = { ...mw, de: ev.target.value };
          if (wasNoun !== /^(der|die|das) /.test(mw.de)) { readForm(); rerender(); const el = document.getElementById('mwDe'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }
        }
      },
      submit: () => {},
    },
  });
  window.addEventListener('hashchange', () => { mw = { ...mw, msg: '', confirm: null }; });
})();
