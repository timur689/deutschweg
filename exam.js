/* Пробные экзамены A1, A2, B1 в формате Goethe: Lesen, Hören, Schreiben. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc } = D;
  const PASS = 0.6;
  const MAX_PLAYS = 2;
  const RF = ['Richtig', 'Falsch'];
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };

  /* Задание: { kind: 'rf'|'mc', title, text?, audio?, items: [[вопрос, варианты?, индекс]] } */
  const EXAMS = {
    A1: {
      title: 'Start Deutsch A1', time: 'около 40 минут',
      lesen: [
        { kind: 'rf', title: 'Teil 1 · Прочитайте письмо', text: 'Liebe Sandra,\nich bin jetzt in Wien! Die Stadt ist sehr schön. Mein Hotel ist im Zentrum, ich kann alles zu Fuß machen. Heute Vormittag war ich im Museum, am Nachmittag habe ich Kaffee und Kuchen in einem Café gegessen. Das Wetter ist leider nicht so gut, es regnet seit zwei Tagen. Am Freitag fahre ich mit dem Zug zurück nach München.\nViele Grüße\ndeine Julia',
          items: [['Julia ist in Wien.', 0], ['Das Hotel ist weit vom Zentrum.', 1], ['Am Vormittag war Julia im Museum.', 0], ['Das Wetter ist sehr schön.', 1], ['Julia fährt mit dem Zug nach Hause.', 0]] },
        { kind: 'mc', title: 'Teil 2 · Объявление', text: 'Praxis Dr. Klein\nSprechzeiten: Montag bis Freitag 8–12 Uhr, Dienstag und Donnerstag auch 15–18 Uhr.\nMittwochnachmittag geschlossen.\nTermine bitte nur telefonisch: 0341 22 33 44.',
          items: [['Wann ist die Praxis am Dienstagnachmittag geöffnet?', ['15–18 Uhr', 'gar nicht', '8–12 Uhr'], 0], ['Wie bekommt man einen Termin?', ['per E-Mail', 'am Telefon', 'ohne Termin'], 1], ['Am Mittwochnachmittag ist die Praxis …', ['geöffnet', 'geschlossen', 'nur für Notfälle offen'], 1]] },
      ],
      horen: [
        { kind: 'mc', title: 'Teil 1 · Объявление на вокзале', audio: 'Achtung am Gleis fünf: Der Regionalexpress nach Hamburg, Abfahrt vierzehn Uhr zwanzig, hat heute etwa fünfzehn Minuten Verspätung. Wir bitten um Ihr Verständnis.',
          items: [['Wohin fährt der Zug?', ['nach Hamburg', 'nach Hannover', 'nach Berlin'], 0], ['Wie viel Verspätung hat der Zug?', ['5 Minuten', '15 Minuten', '50 Minuten'], 1]] },
        { kind: 'mc', title: 'Teil 2 · В пекарне', audio: 'Guten Tag, ich möchte ein Brot und sechs Brötchen. — Gern. Sonst noch etwas? — Ja, ein Stück Apfelkuchen, bitte. — Das macht zusammen sieben Euro vierzig.',
          items: [['Wie viele Brötchen kauft die Person?', ['sechs', 'sieben', 'zwei'], 0], ['Was kauft die Person noch?', ['Apfelkuchen', 'Käse', 'Milch'], 0], ['Wie viel kostet alles?', ['6,40 €', '7,40 €', '7,14 €'], 1]] },
      ],
      schreiben: { task: 'Sie können am Samstag nicht zum Deutschkurs kommen. Schreiben Sie Ihrer Lehrerin, Frau Wolf, eine kurze E-Mail (ca. 30 Wörter):\n• Warum können Sie nicht kommen?\n• Wann kommen Sie wieder?\n• Bitten Sie um die Hausaufgaben.', min: 25,
        model: 'Liebe Frau Wolf,\nleider kann ich am Samstag nicht zum Kurs kommen. Ich bin krank und muss zum Arzt. Am Dienstag komme ich wieder. Können Sie mir bitte die Hausaufgaben schicken?\nViele Grüße\nAnna',
        check: ['Обращение и подпись', 'Названа причина', 'Написано, когда вернётесь', 'Есть просьба прислать домашнее задание', 'Глагол на 2-м месте в каждом предложении'] },
    },
    A2: {
      title: 'Goethe-Zertifikat A2', time: 'около 50 минут',
      lesen: [
        { kind: 'rf', title: 'Teil 1 · Статья', text: 'Das Café „Miteinander“ in Freiburg ist kein normales Café. Hier arbeiten Menschen mit und ohne Behinderung zusammen. Das Café hat vor drei Jahren eröffnet und ist heute sehr beliebt, besonders bei Studenten. Es gibt Frühstück bis 14 Uhr, selbst gebackenen Kuchen und am Wochenende Live-Musik. Die Preise sind günstig, weil ein Verein das Café unterstützt. Der Leiter, Thomas Brandt, sagt: „Bei uns zählt nicht, was man nicht kann, sondern was man kann.“ Montags ist das Café geschlossen.',
          items: [['Im Café arbeiten Menschen mit und ohne Behinderung.', 0], ['Das Café gibt es seit zehn Jahren.', 1], ['Frühstück bekommt man den ganzen Tag.', 1], ['Die Preise sind niedrig.', 0], ['Am Montag kann man dort nicht essen.', 0]] },
        { kind: 'mc', title: 'Teil 2 · Письмо управляющей компании', text: 'Sehr geehrte Mieterinnen und Mieter,\nam Donnerstag, dem 12. Oktober, wird von 8 bis 13 Uhr die Heizung im ganzen Haus repariert. In dieser Zeit gibt es kein warmes Wasser. Bitte lassen Sie die Tür zum Keller offen, damit der Techniker arbeiten kann.\nVielen Dank für Ihr Verständnis!\nIhre Hausverwaltung',
          items: [['Was passiert am Donnerstag?', ['Die Heizung wird repariert.', 'Das Haus wird gestrichen.', 'Der Keller wird aufgeräumt.'], 0], ['Was gibt es von 8 bis 13 Uhr nicht?', ['Strom', 'warmes Wasser', 'Internet'], 1], ['Was sollen die Mieter tun?', ['die Kellertür offen lassen', 'zu Hause bleiben', 'den Techniker anrufen'], 0]] },
      ],
      horen: [
        { kind: 'mc', title: 'Teil 1 · Прогноз погоды', audio: 'Und nun das Wetter für morgen: Im Norden bleibt es bewölkt, und am Nachmittag regnet es. Im Süden scheint dagegen den ganzen Tag die Sonne, bei Temperaturen bis vierundzwanzig Grad. Am Wochenende wird es überall kühler.',
          items: [['Wie ist das Wetter morgen im Süden?', ['sonnig', 'regnerisch', 'bewölkt'], 0], ['Was passiert am Wochenende?', ['Es wird wärmer.', 'Es wird kühler.', 'Es schneit.'], 1]] },
        { kind: 'mc', title: 'Teil 2 · Сообщение на автоответчике', audio: 'Hallo Herr Meier, hier ist die Autowerkstatt Schulz. Ihr Auto ist fertig. Die Reparatur hat zweihundertachtzig Euro gekostet. Sie können das Auto heute bis achtzehn Uhr abholen oder morgen ab acht Uhr. Bitte bringen Sie den Fahrzeugschein mit. Auf Wiederhören!',
          items: [['Warum ruft die Werkstatt an?', ['Das Auto ist fertig.', 'Das Auto ist noch kaputt.', 'Herr Meier hat einen Termin vergessen.'], 0], ['Wie viel kostet die Reparatur?', ['180 €', '280 €', '380 €'], 1], ['Bis wann kann Herr Meier das Auto heute abholen?', ['bis 16 Uhr', 'bis 18 Uhr', 'bis 20 Uhr'], 1]] },
      ],
      schreiben: { task: 'Ihr Freund Paul hat Sie zu seiner Geburtstagsparty am Samstag eingeladen. Schreiben Sie ihm eine E-Mail (ca. 50 Wörter):\n• Bedanken Sie sich für die Einladung.\n• Schreiben Sie, warum Sie nicht kommen können.\n• Machen Sie einen Vorschlag für ein Treffen.', min: 40,
        model: 'Lieber Paul,\nvielen Dank für deine Einladung! Leider kann ich am Samstag nicht kommen, weil meine Schwester an diesem Tag heiratet. Das ist sehr schade, denn ich feiere gern mit dir. Wollen wir nächste Woche zusammen essen gehen? Ich lade dich ein! Hast du am Mittwochabend Zeit?\nLiebe Grüße\nMax',
        check: ['Обращение и подпись', 'Благодарность за приглашение', 'Причина с weil или denn', 'Предложение встретиться с днём или временем', 'Около 50 слов'] },
    },
    B1: {
      title: 'Goethe-Zertifikat B1', time: 'около 60 минут',
      lesen: [
        { kind: 'rf', title: 'Teil 1 · Блог', text: 'Vor einem Jahr habe ich mein Auto verkauft – und ich vermisse es nicht. Ich wohne in Leipzig, und die meisten Wege erledige ich mit dem Fahrrad. Für längere Strecken nutze ich die Bahn, und wenn ich doch einmal ein Auto brauche, etwa für einen Großeinkauf, miete ich eines über Carsharing. Am Anfang hatte ich Bedenken: Würde ich mich eingeschränkt fühlen? Das Gegenteil ist der Fall. Ich spare jeden Monat etwa 300 Euro, bewege mich mehr und habe weniger Stress, weil ich keinen Parkplatz suchen muss. Natürlich ist das nicht für alle möglich. Wer auf dem Land wohnt, wo der Bus nur zweimal am Tag fährt, ist oft auf ein Auto angewiesen. Trotzdem glaube ich, dass viele Stadtbewohner ohne eigenes Auto auskommen könnten.',
          items: [['Die Person hat seit einem Jahr kein eigenes Auto mehr.', 0], ['Für lange Strecken nimmt sie das Fahrrad.', 1], ['Am Anfang war sie unsicher.', 0], ['Ohne Auto gibt sie mehr Geld aus.', 1], ['Auf dem Land ist ein Leben ohne Auto oft schwierig.', 0]] },
        { kind: 'mc', title: 'Teil 2 · Объявление на работе', text: 'Liebe Kolleginnen und Kollegen,\nab dem 1. März gilt in unserem Unternehmen eine neue Regelung für das Homeoffice. Alle Mitarbeitenden dürfen künftig bis zu zwei Tage pro Woche von zu Hause arbeiten. Voraussetzung ist, dass die Tage mindestens eine Woche im Voraus mit der Teamleitung abgestimmt werden. Dienstags findet die wöchentliche Teambesprechung statt; an diesem Tag ist die Anwesenheit im Büro Pflicht. Bei Fragen wenden Sie sich bitte an die Personalabteilung.',
          items: [['Wie viele Tage Homeoffice sind erlaubt?', ['ein Tag pro Woche', 'bis zu zwei Tage pro Woche', 'beliebig viele Tage'], 1], ['Was muss man vorher tun?', ['die Tage mit der Teamleitung abstimmen', 'einen Antrag bei der Stadt stellen', 'einen Laptop kaufen'], 0], ['Warum müssen alle am Dienstag ins Büro?', ['Dann ist die Teambesprechung.', 'Dann wird das Büro geputzt.', 'Dann kommt die Personalabteilung.'], 0]] },
      ],
      horen: [
        { kind: 'mc', title: 'Teil 1 · Интервью на радио', audio: 'Frau Doktor Lang, immer mehr Menschen schlafen schlecht. Woran liegt das? — Ein wichtiger Grund ist Stress. Viele Menschen können abends nicht abschalten und denken im Bett noch an die Arbeit. Dazu kommt das Licht von Handys und Laptops, das den Körper wach hält. Mein Tipp: Gehen Sie jeden Tag zur gleichen Zeit ins Bett und legen Sie das Handy eine Stunde vorher weg. Auch ein Spaziergang am Abend kann helfen.',
          items: [['Was ist laut Dr. Lang ein wichtiger Grund für schlechten Schlaf?', ['zu viel Sport', 'Stress', 'zu viel Essen'], 1], ['Was empfiehlt sie?', ['jeden Tag zur gleichen Zeit schlafen gehen', 'länger fernsehen', 'Kaffee am Abend'], 0], ['Was kann außerdem helfen?', ['ein Abendspaziergang', 'ein Mittagsschlaf', 'mehr Arbeit'], 0]] },
        { kind: 'mc', title: 'Teil 2 · Объявление в музее', audio: 'Liebe Besucherinnen und Besucher, das Museum schließt heute ausnahmsweise bereits um siebzehn Uhr. Grund ist eine Abendveranstaltung. Die Ausstellung Licht und Farbe im zweiten Stock ist noch bis sechzehn Uhr dreißig geöffnet. Wir bitten Sie, Ihre Garderobe rechtzeitig abzuholen. Ihre Eintrittskarte gilt morgen noch einmal kostenlos.',
          items: [['Warum schließt das Museum heute früher?', ['wegen einer Abendveranstaltung', 'wegen Bauarbeiten', 'wegen eines Feiertags'], 0], ['Bis wann ist die Ausstellung geöffnet?', ['16:30 Uhr', '17 Uhr', '18 Uhr'], 0], ['Was gilt für die Eintrittskarte?', ['Man bekommt Geld zurück.', 'Man kann morgen noch einmal kostenlos kommen.', 'Sie ist nur heute gültig.'], 1]] },
      ],
      schreiben: { task: 'In einem Online-Forum wird diskutiert: „Sollten Kinder schon in der Grundschule ein eigenes Smartphone haben?“\nSchreiben Sie Ihre Meinung (ca. 80 Wörter):\n• Nennen Sie Vor- und Nachteile.\n• Begründen Sie Ihre Meinung.', min: 65,
        model: 'Meiner Meinung nach brauchen Kinder in der Grundschule noch kein eigenes Smartphone. Natürlich gibt es auch Vorteile: Die Eltern können ihr Kind jederzeit erreichen, und das Kind lernt früh, mit Technik umzugehen. Trotzdem überwiegen für mich die Nachteile. Kinder verbringen schnell zu viel Zeit am Bildschirm, statt draußen zu spielen. Außerdem sind sie im Internet nicht immer sicher. Ich finde, ein einfaches Handy zum Telefonieren reicht in diesem Alter völlig aus. Ein Smartphone sollten Kinder erst später bekommen.',
        check: ['Вступление с вашим мнением', 'Хотя бы одно преимущество', 'Хотя бы один недостаток', 'Обоснование с weil, denn или deshalb', 'Вывод в конце', 'Около 80 слов'] },
    },
  };

  let ex = null;
  const fresh = (lvl) => ({ lvl, picks: {}, plays: {}, submitted: false, text: '', ai: null, aiBusy: false, aiErr: '', checked: {} });
  const results = () => D.getExt('exam') || {};
  const tasks = (e) => [...e.lesen.map((t, i) => ['L', i, t]), ...e.horen.map((t, i) => ['H', i, t])];
  const total = (e) => tasks(e).reduce((n, [, , t]) => n + t.items.length, 0);

  function renderList() {
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Пробный экзамен</h1><p class="muted">Три экзамена в формате Goethe: чтение (Lesen), аудирование (Hören) и письмо (Schreiben). Экзамен сдан от ${Math.round(PASS * 100)}% в чтении и аудировании.</p></div>
      <section class="packs">${Object.entries(EXAMS).map(([lvl, e]) => {
        const r = results()[lvl];
        return `<a class="pane pack ${r !== undefined && r >= PASS ? 'done' : ''}" href="#exam-${lvl}">
          <span class="pane-title">${lvl} · ${e.time}</span><span class="pane-big">${esc(e.title)}</span>
          <span class="count">${r === undefined ? `${total(e)} заданий + письмо` : `Лучший результат: ${Math.round(r * 100)}%`}</span></a>`;
      }).join('')}</section>`;
  }

  function itemHtml(code, ti, t, ii, item) {
    const key = `${code}${ti}-${ii}`;
    const opts = t.kind === 'rf' ? RF : item[1];
    const right = t.kind === 'rf' ? item[1] : item[2];
    const pick = ex.picks[key];
    return `<div class="qitem"><div class="qtext">${esc(item[0])}</div><div class="opts">${opts.map((o, oi) => {
      let cls = pick === oi ? 'sel' : '';
      if (ex.submitted && oi === right) cls = 'right'; else if (ex.submitted && pick === oi) cls = 'wrong';
      return `<button class="opt ${cls}" data-act="ex-pick" data-k="${key}" data-o="${oi}" ${ex.submitted ? 'disabled' : ''}>${esc(o)}</button>`;
    }).join('')}</div></div>`;
  }

  function taskHtml(code, ti, t) {
    const pk = `${code}${ti}`;
    const plays = ex.plays[pk] || 0;
    const audio = t.audio ? `<div class="row"><button class="btn primary small" data-act="ex-play" data-k="${pk}" ${plays >= MAX_PLAYS && !ex.submitted ? 'disabled' : ''}>${PLAY} ${plays ? 'Прослушать ещё раз' : 'Прослушать'}</button><span class="small muted">Можно прослушать ${MAX_PLAYS} раза, как на экзамене${plays ? ` · осталось ${Math.max(0, MAX_PLAYS - plays)}` : ''}</span></div>
      ${ex.submitted ? `<details class="small"><summary>Текст аудио</summary><p class="exam-text">${esc(t.audio)}</p></details>` : ''}` : '';
    return `<div class="stack" style="gap:10px"><h3>${esc(t.title)}</h3>${t.text ? `<div class="exam-text">${esc(t.text).replace(/\n/g, '<br>')}</div>` : ''}${audio}
      <div class="quiz">${t.items.map((it, ii) => itemHtml(code, ti, t, ii, it)).join('')}</div></div>`;
  }

  function score(e) {
    let ok = 0;
    tasks(e).forEach(([code, ti, t]) => t.items.forEach((it, ii) => {
      const right = t.kind === 'rf' ? it[1] : it[2];
      if (ex.picks[`${code}${ti}-${ii}`] === right) ok += 1;
    }));
    return ok;
  }

  function renderExam(lvl) {
    const e = EXAMS[lvl];
    if (!e) return renderList();
    if (!ex || ex.lvl !== lvl) ex = fresh(lvl);
    const n = total(e);
    const answered = Object.keys(ex.picks).length;
    const ok = ex.submitted ? score(e) : 0;
    const words = ex.text.trim() ? ex.text.trim().split(/\s+/).length : 0;
    const result = ex.submitted ? `<section class="panel hero"><p class="eyebrow">Результат Lesen + Hören</p>
        <div class="row" style="align-items:baseline"><span class="num done-score">${Math.round((ok / n) * 100)}%</span><span class="muted">${ok} из ${n} · ${ok / n >= PASS ? 'сдано' : 'пока не сдано'}</span></div>
        <div class="row"><button class="btn small" data-act="ex-reset">Пройти заново</button></div></section>` : '';
    return `<a class="back" href="#exam">← Все экзамены</a>
      <div class="page-head"><p class="eyebrow">${lvl} · Пробный экзамен</p><h1>${esc(e.title)}</h1></div>
      ${result}
      <section class="panel stack"><h2>Lesen · Чтение</h2>${e.lesen.map((t, i) => taskHtml('L', i, t)).join('<hr>')}</section>
      <section class="panel stack"><h2>Hören · Аудирование</h2>${e.horen.map((t, i) => taskHtml('H', i, t)).join('<hr>')}</section>
      ${ex.submitted ? '' : `<div class="row"><button class="btn primary" data-act="ex-submit" ${answered < n ? 'disabled' : ''}>Проверить ответы</button><span class="small muted">Отвечено ${answered} из ${n}</span></div>`}
      <section class="panel stack"><h2>Schreiben · Письмо</h2>
        <div class="exam-text">${esc(e.schreiben.task).replace(/\n/g, '<br>')}</div>
        <textarea id="examText" class="import" rows="8" lang="de" spellcheck="false" placeholder="Напишите ответ по-немецки…" aria-label="Ваш текст">${esc(ex.text)}</textarea>
        <div class="row"><span class="small muted" id="examWords">${words} слов (нужно около ${e.schreiben.min}+)</span></div>
        ${writingFeedback(e)}
      </section>`;
  }

  function writingFeedback(e) {
    const s = e.schreiben;
    const aiBtn = D.STANDALONE ? '' : `<button class="btn primary small" data-act="ex-ai" ${ex.aiBusy ? 'disabled' : ''}>${ex.aiBusy ? 'Проверяю…' : 'Проверить с ИИ'}</button>`;
    const ai = ex.ai ? `<div class="fb ${ex.ai.score >= 60 ? 'ok' : 'bad'}"><span class="verdict">Оценка: ${Math.round(ex.ai.score)} / 100</span>
        ${ex.ai.strengths && ex.ai.strengths.length ? `<span class="small"><b>Хорошо:</b> ${ex.ai.strengths.map(esc).join('; ')}</span>` : ''}
        ${(ex.ai.mistakes || []).map((m) => `<span class="small"><s>${esc(m.wrong)}</s> → <b>${esc(m.right)}</b> — ${esc(m.why)}</span>`).join('')}
        ${ex.ai.tip ? `<span class="small"><b>Совет:</b> ${esc(ex.ai.tip)}</span>` : ''}</div>` : '';
    return `<div class="row">${aiBtn}<button class="btn small" data-act="ex-model">${ex.showModel ? 'Скрыть образец' : 'Показать образец'}</button></div>
      ${ex.aiErr ? `<p class="small muted">${esc(ex.aiErr)}</p>` : ''}${ai}
      ${ex.showModel ? `<div class="stack" style="gap:8px"><h3>Образец ответа</h3><div class="exam-text">${esc(s.model).replace(/\n/g, '<br>')}</div>
        <h3>Проверьте себя</h3>${s.check.map((c, i) => `<label class="toggle"><input type="checkbox" data-act="ex-check" data-i="${i}" ${ex.checked[i] ? 'checked' : ''}> ${esc(c)}</label>`).join('')}</div>` : ''}`;
  }

  async function aiCheck() {
    const e = EXAMS[ex.lvl];
    const text = ex.text.trim();
    if (text.split(/\s+/).length < 5) { ex = { ...ex, aiErr: 'Сначала напишите текст.' }; rerender(); return; }
    const c = D.claude();
    const sample = c ? await c.use('sample') : null;
    if (!sample) { ex = { ...ex, aiErr: 'Проверка ИИ работает в веб-версии Deutschweg внутри Claude. Пока сравните свой текст с образцом.', showModel: true }; rerender(); return; }
    ex = { ...ex, aiBusy: true, aiErr: '' };
    rerender();
    const prompt = `Ты — экзаменатор Goethe-Zertifikat уровня ${ex.lvl}. Оцени письменную работу ученика.
Задание: ${e.schreiben.task}
Текст ученика:
"""${text}"""
Оцени выполнение задания (все пункты), грамматику, лексику и объём для уровня ${ex.lvl}.
Верни только JSON такого вида:
{"score": число 0-100, "strengths": ["что получилось, по-русски, кратко"], "mistakes": [{"wrong": "фрагмент с ошибкой", "right": "исправленный вариант", "why": "короткое объяснение по-русски"}], "tip": "один совет по-русски"}
В mistakes — не больше 6 самых важных ошибок.`;
    try {
      const res = await sample.json(prompt, { modelTier: 'default', cache: false });
      const safe = res && typeof res === 'object' ? res : {};
      ex = { ...ex, aiBusy: false, ai: { score: Number(safe.score) || 0, strengths: Array.isArray(safe.strengths) ? safe.strengths.slice(0, 4).map(String) : [], mistakes: Array.isArray(safe.mistakes) ? safe.mistakes.slice(0, 6).map((m) => ({ wrong: String(m.wrong || ''), right: String(m.right || ''), why: String(m.why || '') })) : [], tip: String(safe.tip || '') } };
    } catch (err) {
      const msg = { not_granted: 'Доступ к ИИ не разрешён для этой страницы.', rate_limited: 'Слишком много запросов. Попробуйте через минуту.' }[err && err.code] || 'Не получилось проверить текст. Попробуйте ещё раз позже.';
      ex = { ...ex, aiBusy: false, aiErr: msg };
    }
    rerender();
  }

  D.register({
    views: { exam: renderList, ex: (id) => renderExam(id) },
    prefixes: [['exam-', 'ex']],
    nav: { exam: 'practice', ex: 'practice' },
    actions: {
      'ex-pick': (el) => { if (!ex.submitted) { ex = { ...ex, picks: { ...ex.picks, [el.dataset.k]: Number(el.dataset.o) } }; rerender(); } },
      'ex-play': (el) => {
        const e = EXAMS[ex.lvl];
        const [code, ti] = [el.dataset.k[0], Number(el.dataset.k.slice(1))];
        const t = (code === 'L' ? e.lesen : e.horen)[ti];
        ex = { ...ex, plays: { ...ex.plays, [el.dataset.k]: (ex.plays[el.dataset.k] || 0) + 1 } };
        D.speak(t.audio, { rate: 0.95 });
        rerender();
      },
      'ex-submit': () => {
        const e = EXAMS[ex.lvl];
        ex = { ...ex, submitted: true };
        const r = score(e) / total(e);
        D.setExt('exam', { ...results(), [ex.lvl]: Math.max(results()[ex.lvl] || 0, r) });
        const okN = score(e);
        for (let i = 0; i < total(e); i += 1) D.countResult(i < okN);
        D.commit();
        rerender();
        window.scrollTo(0, 0);
      },
      'ex-reset': () => { ex = fresh(ex.lvl); rerender(); window.scrollTo(0, 0); },
      'ex-model': () => { ex = { ...ex, showModel: !ex.showModel }; rerender(); },
      'ex-ai': () => aiCheck(),
      'ex-check': (el) => { ex = { ...ex, checked: { ...ex.checked, [el.dataset.i]: el.checked } }; },
    },
    hooks: {
      input: (ev) => {
        if (ev.target.id === 'examText' && ex) {
          ex = { ...ex, text: ev.target.value };
          const n = ev.target.value.trim() ? ev.target.value.trim().split(/\s+/).length : 0;
          const el = document.getElementById('examWords');
          if (el) el.textContent = `${n} слов (нужно около ${EXAMS[ex.lvl].schreiben.min}+)`;
        }
      },
    },
  });
})();
