/* Уровень B1: B1.1 и B1.2. Формат данных — как в data-a1.js. */
window.DE_LEVELS = window.DE_LEVELS || [];

window.DE_LEVELS.push({
  id: "B1.1",
  title: "Самостоятельный",
  desc: "Работа и резюме, мнения, здоровье, воспоминания, культура. Относительные придаточные, пассив, Konjunktiv II.",
  units: [
    {
      id: "b11-u1", t: "Bewerbung · Поиск работы",
      w: ["die Bewerbung|Bewerbungen|заявление о приёме на работу", "der Lebenslauf|Lebensläufe|резюме", "das Vorstellungsgespräch|Vorstellungsgespräche|собеседование", "die Stelle|Stellen|должность, вакансия; место", "die Voraussetzung|Voraussetzungen|требование, предпосылка", "die Fähigkeit|Fähigkeiten|способность, навык", "die Bedingung|Bedingungen|условие", "der Vertrag|Verträge|договор", "die Kündigung|Kündigungen|увольнение; расторжение", "zuverlässig||надёжный", "flexibel||гибкий", "erfahren||опытный", "sich vorstellen|hat sich vorgestellt|представляться", "kündigen||увольняться; расторгать"],
      r: ["b11-relativ", "b11-um-zu-damit"],
      s: [["Das ist die Stelle, die ich gesucht habe.", "Это та вакансия, которую я искал."], ["Der Kollege, dem ich geholfen habe, ist sehr nett.", "Коллега, которому я помог, очень милый."], ["Ich lerne Deutsch, um eine bessere Stelle zu finden.", "Я учу немецкий, чтобы найти работу получше."], ["Ich erkläre es dir, damit du es verstehst.", "Я объясню тебе, чтобы ты понял."], ["Bitte schicken Sie uns Ihren Lebenslauf.", "Пожалуйста, пришлите нам своё резюме."]]
    },
    {
      id: "b11-u2", t: "Meinungen · Мнения и споры",
      w: ["die Meinung|Meinungen|мнение", "die Gesellschaft|Gesellschaften|общество", "das Problem|Probleme|проблема", "die Lösung|Lösungen|решение (задачи)", "der Vorteil|Vorteile|преимущество", "der Nachteil|Nachteile|недостаток", "die Entscheidung|Entscheidungen|решение (выбор)", "das Argument|Argumente|аргумент", "die Zukunft|-|будущее", "zustimmen|er stimmt zu|соглашаться", "behaupten||утверждать", "überzeugen||убеждать", "wichtig||важный", "obwohl||хотя"],
      r: ["b11-konj2", "b11-obwohl"],
      s: [["Meiner Meinung nach ist das eine gute Lösung.", "По-моему, это хорошее решение."], ["Wenn ich mehr Zeit hätte, würde ich mehr lesen.", "Если бы у меня было больше времени, я бы больше читал."], ["Obwohl es teuer ist, kaufe ich es.", "Хотя это дорого, я это покупаю."], ["Ich stimme dir zu.", "Я с тобой согласен."], ["An deiner Stelle würde ich das nicht machen.", "На твоём месте я бы этого не делал."]]
    },
    {
      id: "b11-u3", t: "Gesundheit · Лечение и отдых",
      w: ["die Ernährung|-|питание", "die Gesundheit|-|здоровье", "die Krankheit|Krankheiten|болезнь", "der Schmerz|Schmerzen|боль", "die Erkältung|Erkältungen|простуда", "das Fieber|-|жар, температура", "der Unfall|Unfälle|несчастный случай, авария", "die Verletzung|Verletzungen|травма", "das Rezept|Rezepte|рецепт", "der Patient|Patienten|пациент", "sich erholen||отдыхать, восстанавливаться", "sich verletzen||пораниться, травмироваться", "behandeln||лечить; обращаться (с кем-то)", "vermeiden|hat vermieden|избегать"],
      r: ["b11-passiv", "b11-genitiv"],
      s: [["Der Patient wird vom Arzt behandelt.", "Пациента лечит врач."], ["Das Rezept wurde gestern geschrieben.", "Рецепт был выписан вчера.", ["Gestern wurde das Rezept geschrieben."]], ["Wegen der Erkältung bleibe ich zu Hause.", "Из-за простуды я остаюсь дома.", ["Ich bleibe wegen der Erkältung zu Hause."]], ["Während des Urlaubs habe ich mich gut erholt.", "Во время отпуска я хорошо отдохнул.", ["Ich habe mich während des Urlaubs gut erholt."]], ["Er hat sich beim Sport verletzt.", "Он получил травму на тренировке."]]
    },
    {
      id: "b11-u4", t: "Erinnerungen · Воспоминания",
      w: ["die Erinnerung|Erinnerungen|воспоминание", "die Kindheit|-|детство", "die Jugend|-|юность", "die Geschichte|Geschichten|история", "das Erlebnis|Erlebnisse|случай, впечатление", "die Heimat|-|родина", "der Traum|Träume|мечта; сон", "sich erinnern||вспоминать, помнить", "erleben||переживать, испытывать", "passieren|ist passiert|случаться", "ankommen|er kommt an, ist angekommen|прибывать", "damals||тогда (в прошлом)", "vorher||до этого, заранее", "nachdem||после того как"],
      r: ["b11-plusquamperfekt", "b11-temporal"],
      s: [["Nachdem ich gegessen hatte, ging ich spazieren.", "Поев, я пошёл гулять.", ["Ich ging spazieren, nachdem ich gegessen hatte."]], ["Ich erinnere mich gern an meine Kindheit.", "Я с удовольствием вспоминаю своё детство."], ["Bevor er nach Deutschland kam, hatte er Englisch gelernt.", "До того как приехать в Германию, он учил английский."], ["Seit ich hier wohne, fahre ich mit dem Fahrrad.", "С тех пор как я здесь живу, я езжу на велосипеде.", ["Ich fahre mit dem Fahrrad, seit ich hier wohne."]], ["Was ist damals passiert?", "Что тогда случилось?"]]
    },
    {
      id: "b11-u5", t: "Kultur · Культура и досуг",
      w: ["die Ausstellung|Ausstellungen|выставка", "das Museum|Museen|музей", "das Theater|Theater|театр", "die Veranstaltung|Veranstaltungen|мероприятие", "die Eintrittskarte|Eintrittskarten|входной билет", "der Künstler|Künstler|художник, артист", "das Konzert|Konzerte|концерт", "der Verein|Vereine|клуб, объединение", "die Bühne|Bühnen|сцена", "sich verabreden||договориться о встрече", "teilnehmen|er nimmt teil, hat teilgenommen|участвовать", "empfehlen|er empfiehlt, hat empfohlen|рекомендовать", "spannend||захватывающий", "langweilig||скучный"],
      r: ["b11-n-dekl", "b11-adj-komplett"],
      s: [["Kannst du mir eine Ausstellung empfehlen?", "Можешь порекомендовать мне выставку?"], ["Ich nehme an einem Kurs teil.", "Я участвую в курсе."], ["Wir haben uns für Samstag verabredet.", "Мы договорились встретиться в субботу."], ["Der Film war spannender, als ich dachte.", "Фильм оказался интереснее, чем я думал."], ["Ich habe mit dem Kollegen gesprochen.", "Я поговорил с коллегой."]]
    }
  ],
  rules: [
    {
      id: "b11-relativ", t: "Относительные придаточные (Relativsätze)",
      b: `<p>Относительное местоимение = «который». Оно похоже на определённый артикль.</p>
<table><tr><th></th><th>m</th><th>f</th><th>n</th><th>мн. ч.</th></tr>
<tr><td>Nom</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Akk</td><td>den</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Dat</td><td>dem</td><td>der</td><td>dem</td><td><b>denen</b></td></tr>
<tr><td>Gen</td><td><b>dessen</b></td><td><b>deren</b></td><td><b>dessen</b></td><td><b>deren</b></td></tr></table>
<p><b>Род и число</b> берём от слова, к которому относимся. <b>Падеж</b> — от роли в придаточном. Глагол — в конце.</p>
<ul><li><i>Der Mann, <b>der</b> dort steht, ist mein Chef.</i> (он стоит → Nom)</li>
<li><i>Der Mann, <b>den</b> ich kenne, …</i> (я знаю его → Akk)</li>
<li><i>Der Mann, <b>dem</b> ich helfe, …</i> (я помогаю ему → Dat)</li>
<li>С предлогом: <i>Die Frau, <b>mit der</b> ich arbeite, …</i></li></ul>`,
      q: [["Das ist der Film, ___ ich gestern gesehen habe.", ["der", "den", "dem"], 1], ["Die Kollegin, ___ mir hilft, ist nett.", ["die", "der", "den"], 0], ["Die Kinder, mit ___ ich spiele, sind laut.", ["denen", "den", "die"], 0], ["Das Buch, ___ auf dem Tisch liegt, ist neu.", ["das", "dass", "der"], 0]]
    },
    {
      id: "b11-um-zu-damit", t: "Цель: um … zu и damit",
      b: `<p>Оба переводятся «чтобы». Выбор зависит от подлежащих:</p>
<table><tr><th>Ситуация</th><th>Конструкция</th><th>Пример</th></tr>
<tr><td>Одно и то же подлежащее</td><td><b>um … zu</b> + инфинитив</td><td>Ich lerne Deutsch, <b>um</b> in Deutschland <b>zu studieren</b>.</td></tr>
<tr><td>Разные подлежащие</td><td><b>damit</b> + придаточное</td><td>Ich spreche langsam, <b>damit</b> du mich <b>verstehst</b>.</td></tr></table>
<p>Вопрос о цели: <b>Wozu? / Wofür?</b> — Зачем? Для чего?</p>
<p>С отделяемыми: <i>um früh aufzustehen</i>.</p>`,
      q: [["Ich spare Geld, ___ ein Auto zu kaufen.", ["damit", "um", "weil"], 1], ["Ich erkläre es noch einmal, ___ alle es verstehen.", ["um", "damit", "dass"], 1], ["Er fährt nach Berlin, um dort ___.", ["arbeitet", "zu arbeiten", "arbeiten"], 1]]
    },
    {
      id: "b11-konj2", t: "Konjunktiv II: мечты и нереальные условия",
      b: `<p>Для большинства глаголов: <b>würde + инфинитив</b> — <i>Ich <b>würde</b> gern <b>reisen</b>.</i></p>
<p>Собственные формы у частых глаголов:</p>
<table><tr><th>Глагол</th><th>Konj. II</th><th>Глагол</th><th>Konj. II</th></tr>
<tr><td>sein</td><td>wäre</td><td>haben</td><td>hätte</td></tr>
<tr><td>können</td><td>könnte</td><td>müssen</td><td>müsste</td></tr>
<tr><td>dürfen</td><td>dürfte</td><td>wissen</td><td>wüsste</td></tr>
<tr><td>sollen</td><td>sollte</td><td>wollen</td><td>wollte</td></tr></table>
<ul><li>Нереальное условие: <i>Wenn ich Zeit <b>hätte</b>, <b>würde</b> ich kommen.</i></li>
<li>Без wenn — глагол первым: <i><b>Hätte</b> ich Zeit, würde ich kommen.</i></li>
<li>Желание: <i>Wenn ich doch reich <b>wäre</b>!</i></li>
<li>Совет: <i>An deiner Stelle <b>würde</b> ich … / Du <b>solltest</b> …</i></li></ul>`,
      q: [["Wenn ich reich ___, würde ich reisen.", ["war", "wäre", "bin"], 1], ["Wenn er Zeit hätte, ___ er uns helfen.", ["würde", "wurde", "wird"], 0], ["An deiner Stelle ___ ich zum Arzt gehen.", ["würde", "werde", "wäre"], 0], ["Ich ___ gern mehr Zeit.", ["hätte", "hatte", "habe"], 0]]
    },
    {
      id: "b11-obwohl", t: "Уступка: obwohl, trotzdem, trotz",
      b: `<p>Одна мысль «несмотря на это» — три способа:</p>
<table><tr><th>Слово</th><th>Тип</th><th>Пример</th></tr>
<tr><td><b>obwohl</b></td><td>союз, глагол в конце</td><td>Obwohl es <b>regnet</b>, gehen wir spazieren.</td></tr>
<tr><td><b>trotzdem</b></td><td>наречие, инверсия</td><td>Es regnet, trotzdem <b>gehen</b> wir spazieren.</td></tr>
<tr><td><b>trotz</b> + Gen</td><td>предлог</td><td>Trotz des Regens gehen wir spazieren.</td></tr></table>
<p>По той же схеме работает причина: <b>weil</b> (союз) — <b>deshalb</b> (наречие) — <b>wegen</b> (предлог).</p>`,
      q: [["___ er müde ist, arbeitet er weiter.", ["Trotzdem", "Obwohl", "Trotz"], 1], ["Er ist müde, ___ arbeitet er weiter.", ["obwohl", "trotzdem", "weil"], 1], ["___ des Wetters fahren wir los.", ["Obwohl", "Trotz", "Trotzdem"], 1]]
    },
    {
      id: "b11-passiv", t: "Пассив (Vorgangspassiv)",
      b: `<p>Пассив нужен, когда важно <b>действие</b>, а не тот, кто его совершает. Строится так: <b>werden + Partizip II</b>.</p>
<table><tr><th>Время</th><th>Пример</th></tr>
<tr><td>Präsens</td><td>Das Auto <b>wird</b> repariert.</td></tr>
<tr><td>Präteritum</td><td>Das Auto <b>wurde</b> repariert.</td></tr>
<tr><td>Perfekt</td><td>Das Auto <b>ist</b> repariert <b>worden</b>. (B1.2)</td></tr></table>
<ul><li>Деятель: <b>von + Dat</b> — <i>Der Patient wird <b>vom</b> Arzt behandelt.</i></li>
<li>Из актива: дополнение в Akkusativ становится подлежащим: <i>Der Arzt behandelt <b>den Patienten</b>. → <b>Der Patient</b> wird behandelt.</i></li>
<li>Замена man: <i>Man spricht hier Deutsch. → Hier <b>wird</b> Deutsch <b>gesprochen</b>.</i></li></ul>`,
      q: [["Das Haus ___ gerade renoviert.", ["wird", "ist", "hat"], 0], ["Die Briefe ___ gestern geschickt.", ["wurde", "wurden", "werden"], 1], ["Der Film wurde ___ Spielberg gedreht.", ["von", "durch", "mit"], 0], ["Hier ___ Deutsch gesprochen.", ["wird", "werden", "ist"], 0]]
    },
    {
      id: "b11-genitiv", t: "Genitiv и предлоги wegen, während, trotz",
      b: `<p>Genitiv отвечает на вопрос <b>wessen?</b> (чей?).</p>
<table><tr><th></th><th>m</th><th>f</th><th>n</th><th>мн. ч.</th></tr>
<tr><td>Gen</td><td><b>des</b> Vater<b>s</b> / eines Mann<b>es</b></td><td><b>der</b> Mutter / einer Frau</td><td><b>des</b> Kind<b>es</b> / eines Buch<b>es</b></td><td><b>der</b> Kinder</td></tr></table>
<p>У m и n к существительному добавляется <b>-s</b> или <b>-es</b> (у коротких слов). Имена: <i>Annas Buch</i>.</p>
<p><b>Предлоги с Genitiv:</b> wegen (из-за), während (во время), trotz (несмотря на), statt (вместо), innerhalb (в течение, внутри), außerhalb (вне).</p>
<p>В разговоре Genitiv часто заменяют на <b>von + Dat</b>: <i>das Auto von meinem Vater</i>.</p>
<p class="small muted">Что такое падежи вообще: <a href="#rule-a11-kasus" style="color:var(--der);font-weight:600">обзор всех четырёх падежей</a>.</p>`,
      q: [["Das ist das Auto ___ Lehrers.", ["der", "des", "dem"], 1], ["Wegen ___ Regens bleiben wir zu Hause.", ["dem", "des", "der"], 1], ["Die Farbe ___ Jacke gefällt mir.", ["der", "des", "die"], 0], ["___ des Urlaubs habe ich viel gelesen.", ["Während", "Seit", "Nach"], 0]]
    },
    {
      id: "b11-plusquamperfekt", t: "Plusquamperfekt и nachdem",
      b: `<p>Plusquamperfekt — «прошлое в прошлом»: действие, которое случилось <b>раньше</b> другого прошедшего.</p>
<p><b>hatte / war + Partizip II</b>: <i>Ich <b>hatte</b> schon <b>gegessen</b>. Der Zug <b>war</b> schon <b>abgefahren</b>.</i></p>
<p>haben или sein выбираем по тем же правилам, что и в Perfekt.</p>
<p><b>nachdem</b> (после того как) задаёт согласование времён:</p>
<table><tr><th>Придаточное с nachdem</th><th>Главное</th></tr>
<tr><td>Plusquamperfekt</td><td>Präteritum / Perfekt</td></tr>
<tr><td>Perfekt</td><td>Präsens / Futur</td></tr></table>
<p><i>Nachdem ich gegessen <b>hatte</b>, <b>ging</b> ich spazieren.</i></p>`,
      q: [["Nachdem er die Prüfung bestanden ___, feierte er.", ["hat", "hatte", "war"], 1], ["Als ich ankam, ___ der Zug schon abgefahren.", ["hatte", "war", "ist"], 1], ["Nachdem wir gegessen hatten, ___ wir spazieren.", ["gehen", "gingen", "gegangen"], 1]]
    },
    {
      id: "b11-temporal", t: "Временные союзы: bevor, während, seit, bis, sobald",
      b: `<table><tr><th>Союз</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>bevor</b></td><td>прежде чем</td><td>Bevor ich schlafe, lese ich.</td></tr>
<tr><td><b>nachdem</b></td><td>после того как</td><td>Nachdem er angekommen war, rief er an.</td></tr>
<tr><td><b>während</b></td><td>пока, в то время как</td><td>Während ich koche, hört er Musik.</td></tr>
<tr><td><b>seit(dem)</b></td><td>с тех пор как</td><td>Seit ich hier wohne, bin ich glücklich.</td></tr>
<tr><td><b>bis</b></td><td>пока не, до тех пор пока</td><td>Warte, bis ich komme.</td></tr>
<tr><td><b>sobald</b></td><td>как только</td><td>Sobald ich Zeit habe, rufe ich an.</td></tr></table>
<p>Все эти союзы открывают придаточное — глагол в конце. Про <b>als / wenn</b> — см. A2.2.</p>`,
      q: [["___ ich ins Bett gehe, putze ich die Zähne.", ["Bevor", "Nachdem", "Seit"], 0], ["Warte hier, ___ ich zurückkomme.", ["bis", "seit", "bevor"], 0], ["___ ich in Berlin wohne, fahre ich Fahrrad.", ["Seit", "Bis", "Bevor"], 0], ["Ich rufe dich an, ___ ich zu Hause bin.", ["sobald", "seit", "während"], 0]]
    },
    {
      id: "b11-n-dekl", t: "N-склонение (n-Deklination)",
      b: `<p>Группа существительных <b>мужского рода</b> получает <b>-(e)n</b> во всех падежах, кроме Nominativ ед. ч.:</p>
<table><tr><th></th><th>ед. ч.</th></tr>
<tr><td>Nom</td><td>der Kollege</td></tr><tr><td>Akk</td><td>den Kollege<b>n</b></td></tr>
<tr><td>Dat</td><td>dem Kollege<b>n</b></td></tr><tr><td>Gen</td><td>des Kollege<b>n</b></td></tr></table>
<p><b>Как узнать:</b> мужской род и</p>
<ul><li>на <b>-e</b> (люди и животные): der Kunde, der Junge, der Löwe</li>
<li>на <b>-ent, -ant, -ist, -at</b>: der Student, der Praktikant, der Polizist, der Soldat, der Patient</li>
<li>отдельные слова: der Mensch, der Herr (den Herr<b>n</b>), der Nachbar, der Bär</li></ul>
<p>Особый случай: <b>der Name</b> → des Name<b>ns</b>.</p>`,
      q: [["Ich habe mit dem ___ gesprochen.", ["Kollege", "Kollegen", "Kolleges"], 1], ["Kennst du den neuen ___?", ["Student", "Studenten", "Studente"], 1], ["Wir helfen dem ___.", ["Nachbar", "Nachbarn", "Nachbars"], 1]]
    },
    {
      id: "b11-adj-komplett", t: "Склонение прилагательных: вся система",
      b: `<p>Главный принцип: <b>род и падеж должны быть видны</b>. Если их показал артикль, прилагательное берёт «слабое» окончание (-e/-en). Если артикля нет или он молчит, окончание «сильное» — как у der/die/das.</p>
<table><tr><th>После…</th><th>Окончания</th><th>Примеры</th></tr>
<tr><td>der, dieser, jeder</td><td>-e / -en</td><td>der alt<b>e</b> Mann, mit dem alt<b>en</b> Mann</td></tr>
<tr><td>ein, kein, mein</td><td>как после der, но Nom m <b>-er</b>, Nom/Akk n <b>-es</b></td><td>ein alt<b>er</b> Mann, ein klein<b>es</b> Kind</td></tr>
<tr><td>без артикля</td><td>как у артикля: -er, -e, -es, -en, -em</td><td>kalt<b>es</b> Wasser, mit frisch<b>er</b> Milch</td></tr></table>
<p>Исключение у варианта без артикля: Genitiv m/n — <b>-en</b> (<i>trotz schlecht<b>en</b> Wetters</i>).</p>
<p>Во всех падежах мн. ч. после артикля — <b>-en</b>: <i>die neu<b>en</b>, meine neu<b>en</b>, keine neu<b>en</b></i>.</p>`,
      q: [["Mit ___ Grüßen (конец письма)", ["freundlichen", "freundliche", "freundlicher"], 0], ["Ich suche eine ___ Wohnung.", ["günstige", "günstigen", "günstiger"], 0], ["Das ist der Wagen meines ___ Bruders.", ["älteren", "älteres", "ältere"], 0], ["Er trinkt ___ Wasser.", ["kaltes", "kalte", "kalten"], 0]]
    }
  ]
});

window.DE_LEVELS.push({
  id: "B1.2",
  title: "Уверенный самостоятельный",
  desc: "Политика, наука, деньги, культуры, планы. Сложный пассив, двойные союзы, косвенная речь.",
  units: [
    {
      id: "b12-u1", t: "Politik · Государство",
      w: ["der Staat|Staaten|государство", "die Regierung|Regierungen|правительство", "die Wahl|Wahlen|выборы; выбор", "die Partei|Parteien|партия", "das Gesetz|Gesetze|закон", "die Demokratie|Demokratien|демократия", "der Bürger|Bürger|гражданин", "das Recht|Rechte|право", "die Pflicht|Pflichten|обязанность", "die Steuer|Steuern|налог", "wählen||выбирать; голосовать", "ändern||изменять", "verschieben|hat verschoben|переносить, откладывать", "verbieten|hat verboten|запрещать"],
      r: ["b12-passiv-modal", "b12-konnektoren2"],
      s: [["Das Gesetz muss geändert werden.", "Закон нужно изменить."], ["Die Wahl ist verschoben worden.", "Выборы перенесли."], ["Ich spreche sowohl Deutsch als auch Englisch.", "Я говорю и по-немецки, и по-английски."], ["Er hat weder Zeit noch Geld.", "У него нет ни времени, ни денег."], ["Je mehr ich lerne, desto besser spreche ich.", "Чем больше я учусь, тем лучше говорю."]]
    },
    {
      id: "b12-u2", t: "Wissenschaft · Наука и техника",
      w: ["die Wissenschaft|Wissenschaften|наука", "die Forschung|Forschungen|исследование", "die Entwicklung|Entwicklungen|развитие, разработка", "die Erfindung|Erfindungen|изобретение", "das Ergebnis|Ergebnisse|результат", "die Technik|Techniken|техника, технология", "das Gerät|Geräte|прибор, устройство", "der Fortschritt|Fortschritte|прогресс", "die Methode|Methoden|метод", "erfinden|hat erfunden|изобретать", "entwickeln||разрабатывать, развивать", "untersuchen||исследовать, обследовать", "beweisen|hat bewiesen|доказывать", "funktionieren||работать, функционировать", "lassen|er lässt, hat gelassen|оставлять; поручать"],
      r: ["b12-partizip", "b12-lassen"],
      s: [["Die Ergebnisse der Forschung sind sehr interessant.", "Результаты исследования очень интересны."], ["Das reparierte Gerät funktioniert wieder.", "Отремонтированный прибор снова работает."], ["Ich lasse mein Auto reparieren.", "Я отдаю машину в ремонт."], ["Wer hat das Telefon erfunden?", "Кто изобрёл телефон?"], ["Man hat bewiesen, dass die Methode funktioniert.", "Доказано, что метод работает."]]
    },
    {
      id: "b12-u3", t: "Geld und Wirtschaft · Деньги",
      w: ["die Wirtschaft|-|экономика", "das Unternehmen|Unternehmen|предприятие, компания", "der Verbraucher|Verbraucher|потребитель", "die Werbung|-|реклама", "das Produkt|Produkte|продукт", "die Rechnung|Rechnungen|счёт (к оплате)", "der Kredit|Kredite|кредит", "das Konto|Konten|банковский счёт", "die Ausgabe|Ausgaben|расход; выпуск", "die Einnahme|Einnahmen|доход, поступление", "überweisen|hat überwiesen|переводить (деньги)", "leihen|hat geliehen|одалживать", "ausgeben|er gibt aus, hat ausgegeben|тратить"],
      r: ["b12-relativ-erw", "b12-konj2-verg"],
      s: [["Das ist die Bank, bei der ich ein Konto habe.", "Это банк, в котором у меня счёт."], ["Alles, was du sagst, ist richtig.", "Всё, что ты говоришь, верно."], ["Wenn ich das gewusst hätte, hätte ich nicht so viel Geld ausgegeben.", "Если бы я это знал, я бы не потратил столько денег."], ["Ich habe das Geld schon überwiesen.", "Я уже перевёл деньги."], ["Kannst du mir zehn Euro leihen?", "Можешь одолжить мне десять евро?"]]
    },
    {
      id: "b12-u4", t: "Kulturen · Жизнь среди культур",
      w: ["die Kultur|Kulturen|культура", "das Vorurteil|Vorurteile|предрассудок", "die Gewohnheit|Gewohnheiten|привычка", "die Integration|-|интеграция", "die Sitte|Sitten|обычай", "der Unterschied|Unterschiede|различие", "die Gemeinsamkeit|Gemeinsamkeiten|сходство, общее", "das Missverständnis|Missverständnisse|недоразумение", "der Respekt|-|уважение", "sich gewöhnen||привыкать", "sich unterscheiden|hat sich unterschieden|отличаться", "vergleichen|hat verglichen|сравнивать", "fremd||чужой, незнакомый", "höflich||вежливый"],
      r: ["b12-indirekte-rede", "b12-ohne-statt"],
      s: [["Ich habe mich an das Wetter gewöhnt.", "Я привык к погоде."], ["Er sagt, er sei krank.", "Он говорит, что болен."], ["Sie ging, ohne etwas zu sagen.", "Она ушла, ничего не сказав."], ["Statt zu lernen, sieht er fern.", "Вместо того чтобы учиться, он смотрит телевизор.", ["Er sieht fern, statt zu lernen."]], ["Worin unterscheiden sich die Kulturen?", "Чем отличаются культуры?"]]
    },
    {
      id: "b12-u5", t: "Zukunft · Планы и цели",
      w: ["der Plan|Pläne|план", "das Ziel|Ziele|цель", "der Wunsch|Wünsche|желание", "die Möglichkeit|Möglichkeiten|возможность", "die Chance|Chancen|шанс", "die Herausforderung|Herausforderungen|вызов, трудная задача", "die Veränderung|Veränderungen|изменение", "die Karriere|Karrieren|карьера", "der Erfolg|Erfolge|успех", "erreichen||достигать", "planen||планировать", "sich verändern||меняться", "vorhaben|er hat vor|намереваться", "erfolgreich||успешный"],
      r: ["b12-futur", "b12-nvv"],
      s: [["Ich werde nächstes Jahr in Berlin studieren.", "В следующем году я буду учиться в Берлине.", ["Nächstes Jahr werde ich in Berlin studieren."]], ["Er wird wohl zu Hause sein.", "Он, наверное, дома."], ["Was hast du am Wochenende vor?", "Что ты планируешь на выходные?"], ["Wir müssen bald eine Entscheidung treffen.", "Нам скоро нужно принять решение.", ["Bald müssen wir eine Entscheidung treffen."]], ["Sie hat ihr Ziel endlich erreicht.", "Она наконец достигла своей цели.", ["Endlich hat sie ihr Ziel erreicht."]]]
    }
  ],
  rules: [
    {
      id: "b12-passiv-modal", t: "Пассив: Perfekt, Zustandspassiv, с модальными",
      b: `<table><tr><th>Форма</th><th>Конструкция</th><th>Пример</th></tr>
<tr><td>Perfekt</td><td>sein + Partizip II + <b>worden</b></td><td>Das Auto <b>ist</b> repariert <b>worden</b>.</td></tr>
<tr><td>Plusquamperfekt</td><td>war + Partizip II + worden</td><td>Das Auto <b>war</b> repariert <b>worden</b>.</td></tr>
<tr><td>С модальным</td><td>Modal + Partizip II + <b>werden</b></td><td>Das <b>muss</b> sofort gemacht <b>werden</b>.</td></tr>
<tr><td>С модальным в прошлом</td><td>Modal (Prät.) + Partizip II + werden</td><td>Das Gesetz <b>musste</b> geändert <b>werden</b>.</td></tr>
<tr><td>Zustandspassiv (результат)</td><td>sein + Partizip II</td><td>Die Tür <b>ist</b> geschlossen.</td></tr></table>
<p>В пассивном Perfekt — <b>worden</b>, без ge-. А <i>geworden</i> — это «стал»: <i>Er ist Arzt geworden.</i></p>`,
      q: [["Das Problem ist schon gelöst ___.", ["geworden", "worden", "werden"], 1], ["Die Rechnung muss bis Freitag bezahlt ___.", ["werden", "worden", "wird"], 0], ["Die Wahl ___ verschoben worden.", ["hat", "ist", "wird"], 1]]
    },
    {
      id: "b12-konnektoren2", t: "Двойные союзы",
      b: `<table><tr><th>Союз</th><th>Значение</th><th>Пример</th></tr>
<tr><td>sowohl … als auch</td><td>как…, так и</td><td>Ich spreche sowohl Deutsch als auch Englisch.</td></tr>
<tr><td>nicht nur … sondern auch</td><td>не только…, но и</td><td>Sie ist nicht nur klug, sondern auch nett.</td></tr>
<tr><td>weder … noch</td><td>ни…, ни</td><td>Er hat weder Zeit noch Geld.</td></tr>
<tr><td>entweder … oder</td><td>либо…, либо</td><td>Entweder kommst du mit oder du bleibst hier.</td></tr>
<tr><td>zwar … aber</td><td>хотя…, но; правда…, но</td><td>Das ist zwar teuer, aber gut.</td></tr>
<tr><td>je … desto / umso</td><td>чем…, тем</td><td>Je mehr ich lerne, desto besser spreche ich.</td></tr></table>
<p><b>je … desto:</b> после <i>je</i> — Komparativ и глагол <b>в конце</b>; после <i>desto</i> — Komparativ и <b>сразу глагол</b>.</p>`,
      q: [["Ich trinke weder Kaffee ___ Tee.", ["oder", "noch", "nicht"], 1], ["Je mehr man übt, ___ besser spricht man.", ["desto", "als", "so"], 0], ["Wir fahren entweder mit dem Zug ___ mit dem Auto.", ["oder", "noch", "als auch"], 0], ["Sie spricht nicht nur Deutsch, ___ auch Französisch.", ["aber", "sondern", "oder"], 1]]
    },
    {
      id: "b12-partizip", t: "Причастия в роли прилагательных",
      b: `<table><tr><th>Причастие</th><th>Как образуется</th><th>Значение</th><th>Пример</th></tr>
<tr><td>Partizip I</td><td>инфинитив + <b>-d</b></td><td>активное, происходит сейчас</td><td>das spiele<b>nd</b>e Kind — играющий ребёнок</td></tr>
<tr><td>Partizip II</td><td>ge-…-t / ge-…-en</td><td>пассивное, уже сделано</td><td>das reparierte Gerät — отремонтированный прибор</td></tr></table>
<p>Склоняются как обычные прилагательные: <i>mit dem repariert<b>en</b> Auto, ein lachend<b>es</b> Kind</i>.</p>
<p>В письменной речи встречается <b>расширенное определение</b>: <i>die im Jahr 1990 gegründete Firma</i> = <i>die Firma, die im Jahr 1990 gegründet wurde</i>.</p>`,
      q: [["das Kind, das lacht = das ___ Kind", ["gelachte", "lachende", "lachte"], 1], ["der Brief, der geschrieben wurde = der ___ Brief", ["schreibende", "geschriebene", "schriebene"], 1], ["Ich fahre mit dem ___ Auto. (reparieren)", ["reparierten", "reparierte", "reparierend"], 0]]
    },
    {
      id: "b12-lassen", t: "Глагол lassen",
      b: `<p>Формы: ich lasse, du <b>lässt</b>, er <b>lässt</b>, wir lassen. Präteritum: <b>ließ</b>.</p>
<table><tr><th>Значение</th><th>Пример</th></tr>
<tr><td>оставлять</td><td>Ich lasse den Schlüssel zu Hause.</td></tr>
<tr><td>поручать, «дать сделать»</td><td>Ich lasse mein Auto reparieren. Ich lasse mir die Haare schneiden.</td></tr>
<tr><td>позволять</td><td>Lass mich das machen!</td></tr>
<tr><td>предложение «давай»</td><td>Lass uns gehen! — Давай пойдём!</td></tr></table>
<p>Perfekt с другим глаголом — <b>двойной инфинитив</b>: <i>Ich habe das Auto reparieren <b>lassen</b>.</i> (не <i>gelassen</i>)</p>`,
      q: [["Er ___ sein Fahrrad reparieren.", ["lasst", "lässt", "lässst"], 1], ["Ich habe mir die Haare schneiden ___.", ["gelassen", "lassen", "lässt"], 1], ["___ uns ins Kino gehen!", ["Lass", "Lässt", "Lasse"], 0]]
    },
    {
      id: "b12-relativ-erw", t: "Relativsätze: с предлогами, dessen/deren, was, wo",
      b: `<ul><li><b>Предлог + местоимение:</b> <i>Die Firma, <b>bei der</b> ich arbeite. Der Freund, <b>auf den</b> ich warte.</i> Предлог стоит перед местоимением.</li>
<li><b>Genitiv — чей:</b> dessen (m, n), deren (f, мн. ч.). <i>Der Mann, <b>dessen</b> Auto kaputt ist. Die Frau, <b>deren</b> Sohn hier lernt.</i></li>
<li><b>was</b> — после alles, nichts, etwas, vieles, das, превосходной степени и целого предложения: <i>Alles, <b>was</b> du sagst. Das Beste, <b>was</b> … Er kommt zu spät, <b>was</b> mich ärgert.</i></li>
<li><b>wo</b> — после места: <i>die Stadt, <b>wo</b> ich wohne</i> (= in der).</li>
<li><b>wer</b> — «кто», общее правило: <i><b>Wer</b> Deutsch lernt, (der) braucht Geduld.</i></li></ul>`,
      q: [["Das ist alles, ___ ich weiß.", ["das", "was", "dass"], 1], ["Die Stadt, ___ ich geboren bin, ist klein.", ["wo", "was", "wer"], 0], ["Der Kollege, ___ Frau Ärztin ist, kommt heute.", ["deren", "dessen", "dem"], 1], ["Die Freundin, ___ ich warte, kommt spät.", ["auf die", "auf der", "die"], 0]]
    },
    {
      id: "b12-konj2-verg", t: "Konjunktiv II в прошедшем",
      b: `<p><b>hätte / wäre + Partizip II</b> — то, что могло бы случиться, но не случилось.</p>
<ul><li>Условие: <i>Wenn ich das gewusst <b>hätte</b>, <b>wäre</b> ich gekommen.</i></li>
<li>Сожаление: <i><b>Hätte</b> ich doch mehr gelernt!</i></li>
<li>Почти случилось: <i>Ich <b>hätte</b> fast den Zug verpasst.</i></li>
<li>С модальным — двойной инфинитив: <i>Du <b>hättest</b> früher kommen <b>sollen</b>.</i></li></ul>
<p>hätte или wäre — по тем же правилам, что haben/sein в Perfekt: <i>ich wäre gefahren, ich hätte gegessen</i>.</p>`,
      q: [["Wenn ich Zeit gehabt ___, wäre ich gekommen.", ["hätte", "wäre", "würde"], 0], ["Ich ___ fast den Zug verpasst.", ["hätte", "wäre", "würde"], 0], ["Wenn du früher gekommen ___, hättest du ihn gesehen.", ["hättest", "wärst", "würdest"], 1], ["Du hättest mich anrufen ___.", ["gesollt", "sollen", "sollst"], 1]]
    },
    {
      id: "b12-indirekte-rede", t: "Косвенная речь (Konjunktiv I)",
      b: `<p>В новостях и официальных текстах чужие слова передают через Konjunktiv I. Так автор показывает: «это сказал он, а не я».</p>
<p>Чаще всего нужна форма <b>er/sie/es</b>: основа + <b>-e</b>: er komm<b>e</b>, er hab<b>e</b>, er müss<b>e</b>, er könn<b>e</b>. Особая форма: <b>er sei</b>.</p>
<table><tr><th>Прямая речь</th><th>Косвенная речь</th></tr>
<tr><td>Er sagt: „Ich bin krank.“</td><td>Er sagt, er <b>sei</b> krank.</td></tr>
<tr><td>Sie sagt: „Ich habe Zeit.“</td><td>Sie sagt, sie <b>habe</b> Zeit.</td></tr>
<tr><td>Sie sagen: „Wir haben keine Zeit.“</td><td>Sie sagen, sie <b>hätten</b> keine Zeit.</td></tr></table>
<p>Если Konjunktiv I совпадает с обычной формой (sie haben), берут <b>Konjunktiv II</b> (sie hätten). В разговоре часто говорят просто с индикативом: <i>Er sagt, dass er krank ist.</i></p>`,
      q: [["Er sagt, er ___ keine Zeit.", ["habe", "hat", "hatte"], 0], ["Sie behauptet, sie ___ krank.", ["sei", "ist", "wäre gewesen"], 0], ["Die Minister sagen, sie ___ das Problem gelöst.", ["haben", "hätten", "habe"], 1]]
    },
    {
      id: "b12-ohne-statt", t: "ohne … zu, statt … zu, ohne dass",
      b: `<table><tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>ohne … zu</b></td><td>не делая, без того чтобы</td><td>Er ging, ohne sich <b>zu</b> verabschieden.</td></tr>
<tr><td><b>(an)statt … zu</b></td><td>вместо того чтобы</td><td>Statt <b>zu</b> arbeiten, spielt er.</td></tr>
<tr><td><b>ohne dass</b></td><td>так, что (кто-то другой) не…</td><td>Er ging, ohne dass ich es merkte.</td></tr>
<tr><td><b>statt dass</b></td><td>вместо того чтобы (другой)</td><td>Statt dass er hilft, sieht er fern.</td></tr></table>
<p>Как и с um … zu: одно подлежащее → <b>zu + инфинитив</b>; разные → <b>dass</b>.</p>`,
      q: [["Sie ging, ohne ein Wort ___.", ["sagen", "zu sagen", "sagte"], 1], ["___ zu lernen, sieht er fern.", ["Ohne", "Statt", "Um"], 1], ["Er hat das Auto genommen, ohne ___ ich es wusste.", ["dass", "zu", "um"], 0]]
    },
    {
      id: "b12-futur", t: "Futur I: будущее и предположение",
      b: `<p><b>werden + инфинитив</b> (в конце): <i>Ich <b>werde</b> dich <b>anrufen</b>.</i></p>
<ul><li>Обещание, план: <i>Ich werde mehr lernen.</i></li>
<li>Прогноз: <i>Morgen wird es regnen.</i></li>
<li><b>Предположение о настоящем</b> (с wohl, wahrscheinlich): <i>Er <b>wird wohl</b> krank <b>sein</b>.</i> — Он, наверное, болен.</li></ul>
<p>Очень часто будущее выражают простым <b>Präsens + слово времени</b>: <i>Morgen fahre ich nach Berlin.</i></p>
<p>В придаточном werden — в конце: <i>…, dass er bald kommen <b>wird</b>.</i></p>`,
      q: [["Ich ___ dich morgen anrufen.", ["werde", "wird", "würde"], 0], ["Wo ist Paul? — Er ___ wohl im Büro sein.", ["wird", "ist", "werde"], 0], ["Ich glaube, dass es morgen regnen ___.", ["wird", "werden", "würde regnen"], 0]]
    },
    {
      id: "b12-nvv", t: "Устойчивые сочетания: существительное + глагол",
      b: `<p>В B1 и в письменной речи многие действия выражают парой «существительное + глагол». Глагол здесь нельзя заменить другим.</p>
<table><tr><th>Сочетание</th><th>Значение</th></tr>
<tr><td>eine Entscheidung <b>treffen</b></td><td>принять решение</td></tr>
<tr><td>eine Frage <b>stellen</b></td><td>задать вопрос</td></tr>
<tr><td>einen Antrag <b>stellen</b></td><td>подать заявление</td></tr>
<tr><td>Bescheid <b>sagen / geben</b></td><td>сообщить, дать знать</td></tr>
<tr><td>Rücksicht <b>nehmen</b> auf</td><td>считаться с</td></tr>
<tr><td>in Frage <b>kommen</b></td><td>подходить, рассматриваться</td></tr>
<tr><td>zur Verfügung <b>stehen</b></td><td>быть в распоряжении</td></tr>
<tr><td>Wert <b>legen</b> auf</td><td>придавать значение</td></tr>
<tr><td>ein Gespräch <b>führen</b></td><td>вести разговор</td></tr>
<tr><td>Kritik <b>üben</b></td><td>критиковать</td></tr></table>`,
      q: [["Wir müssen bald eine Entscheidung ___.", ["machen", "treffen", "nehmen"], 1], ["Darf ich eine Frage ___?", ["stellen", "machen", "geben"], 0], ["Bitte ___ Sie mir Bescheid.", ["sagen", "treffen", "stellen"], 0]]
    }
  ]
});
