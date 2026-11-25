/* Уровень A2: A2.1 и A2.2. Формат данных — как в data-a1.js. */
window.DE_LEVELS = window.DE_LEVELS || [];

window.DE_LEVELS.push({
  id: "A2.1",
  title: "Уверенный базовый",
  desc: "Работа, жильё, праздники, путешествия, покупки. Придаточные, предлоги места, сравнение.",
  units: [
    {
      id: "a21-u1", t: "Arbeit und Beruf · Работа",
      w: ["der Beruf|Berufe|профессия", "die Arbeit|Arbeiten|работа", "der Kollege|Kollegen|коллега", "die Kollegin|Kolleginnen|коллега (женщина)", "der Chef|Chefs|начальник", "die Firma|Firmen|фирма", "das Büro|Büros|офис", "der Kunde|Kunden|клиент", "die Besprechung|Besprechungen|совещание", "der Lohn|Löhne|зарплата", "die Erfahrung|Erfahrungen|опыт", "verdienen||зарабатывать", "suchen||искать", "sich bewerben|er bewirbt sich, hat sich beworben|подавать заявку (на работу)", "beginnen|hat begonnen|начинать(ся)", "glauben||думать, верить"],
      r: ["a21-weil-dass", "a21-perfekt"],
      s: [["Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.", "Я учу немецкий, потому что хочу работать в Германии."], ["Er sagt, dass die Besprechung um zehn Uhr beginnt.", "Он говорит, что совещание начинается в десять часов."], ["Ich habe drei Jahre bei einer Firma gearbeitet.", "Я три года работал в одной фирме."], ["Sie hat sich bei einer Bank beworben.", "Она подала заявку в банк."], ["Mein Chef ist heute nicht im Büro.", "Моего начальника сегодня нет в офисе.", ["Heute ist mein Chef nicht im Büro."]]]
    },
    {
      id: "a21-u2", t: "Wohnen · Обустройство",
      w: ["der Nachbar|Nachbarn|сосед", "die Miete|Mieten|арендная плата", "der Vermieter|Vermieter|арендодатель", "der Umzug|Umzüge|переезд", "der Keller|Keller|подвал", "der Balkon|Balkone|балкон", "die Wand|Wände|стена", "das Regal|Regale|полка, стеллаж", "das Bild|Bilder|картина", "das Fahrrad|Fahrräder|велосипед", "stellen||ставить", "stehen|hat gestanden|стоять", "legen||класть", "liegen|hat gelegen|лежать", "hängen||вешать; висеть", "umziehen|er zieht um, ist umgezogen|переезжать"],
      r: ["a21-wechselpraep", "a21-stellen"],
      s: [["Ich stelle die Lampe auf den Tisch.", "Я ставлю лампу на стол."], ["Die Lampe steht auf dem Tisch.", "Лампа стоит на столе."], ["Das Bild hängt an der Wand.", "Картина висит на стене."], ["Wir ziehen nächste Woche um.", "Мы переезжаем на следующей неделе.", ["Nächste Woche ziehen wir um."]], ["Das Fahrrad steht im Keller.", "Велосипед стоит в подвале."]]
    },
    {
      id: "a21-u3", t: "Feste · Праздники и подарки",
      w: ["das Fest|Feste|праздник", "der Geburtstag|Geburtstage|день рождения", "das Geschenk|Geschenke|подарок", "die Party|Partys|вечеринка", "die Einladung|Einladungen|приглашение", "der Gast|Gäste|гость", "die Hochzeit|Hochzeiten|свадьба", "der Kuchen|Kuchen|пирог, торт", "die Blume|Blumen|цветок", "die Kerze|Kerzen|свеча", "schenken||дарить", "einladen|er lädt ein|приглашать", "feiern||праздновать", "gratulieren||поздравлять", "geben|er gibt, hat gegeben|давать", "mitbringen|hat mitgebracht|приносить с собой"],
      r: ["a21-zwei-objekte", "a21-adj-dekl1"],
      s: [["Ich schenke meiner Mutter Blumen.", "Я дарю маме цветы."], ["Er hat mir ein schönes Geschenk gegeben.", "Он подарил мне красивый подарок."], ["Wir laden euch zur Party ein.", "Мы приглашаем вас на вечеринку."], ["Der neue Kollege bringt einen Kuchen mit.", "Новый коллега приносит пирог."], ["Ich gratuliere dir zum Geburtstag!", "Поздравляю тебя с днём рождения!"]]
    },
    {
      id: "a21-u4", t: "Reisen · Путешествия",
      w: ["die Reise|Reisen|поездка, путешествие", "der Urlaub|Urlaube|отпуск", "das Hotel|Hotels|гостиница", "der Koffer|Koffer|чемодан", "das Ticket|Tickets|билет", "der Flughafen|Flughäfen|аэропорт", "der Zug|Züge|поезд", "das Meer|Meere|море", "der Berg|Berge|гора", "der Strand|Strände|пляж", "die Sehenswürdigkeit|Sehenswürdigkeiten|достопримечательность", "reisen|ist gereist|путешествовать", "buchen||бронировать", "packen||упаковывать", "besichtigen||осматривать"],
      r: ["a21-praeteritum-basis", "a21-lokal"],
      s: [["Letztes Jahr waren wir in Italien.", "В прошлом году мы были в Италии.", ["Wir waren letztes Jahr in Italien."]], ["Im Sommer fahren wir ans Meer.", "Летом мы едем на море.", ["Wir fahren im Sommer ans Meer."]], ["Ich hatte keine Zeit.", "У меня не было времени."], ["Hast du das Hotel schon gebucht?", "Ты уже забронировал гостиницу?"], ["Wir fahren in die Berge.", "Мы едем в горы."]]
    },
    {
      id: "a21-u5", t: "Einkaufen · Покупки",
      w: ["das Geschäft|Geschäfte|магазин; сделка", "der Preis|Preise|цена", "das Angebot|Angebote|предложение, акция", "die Größe|Größen|размер", "die Farbe|Farben|цвет", "die Kasse|Kassen|касса", "das Geld|Gelder|деньги", "die Karte|Karten|карта, открытка, билет", "teuer||дорогой", "billig||дешёвый", "günstig||выгодный", "bezahlen||платить", "anprobieren|er probiert an|примерять", "kosten||стоить"],
      r: ["a21-komparation", "a21-welcher"],
      s: [["Diese Jacke ist teurer als die andere.", "Эта куртка дороже, чем другая."], ["Der Rock ist so schön wie das Kleid.", "Юбка такая же красивая, как платье."], ["Welche Größe haben Sie?", "Какой у вас размер?"], ["Kann ich die Hose anprobieren?", "Можно примерить брюки?"], ["Das ist das günstigste Angebot.", "Это самое выгодное предложение."]]
    }
  ],
  rules: [
    {
      id: "a21-weil-dass", t: "Придаточные с weil и dass: глагол в конце",
      b: `<p>В придаточном предложении спрягаемый глагол уходит <b>в самый конец</b>. Перед придаточным всегда запятая.</p>
<ul><li><i>Ich lerne Deutsch, <b>weil</b> ich in Deutschland arbeiten <b>möchte</b>.</i> — потому что</li>
<li><i>Ich glaube, <b>dass</b> er heute <b>kommt</b>.</i> — что</li></ul>
<p>Отделяемая приставка снова пишется слитно: <i>…, dass der Kurs um 9 Uhr <b>anfängt</b>.</i></p>
<p>Perfekt и модальные: вспомогательный глагол — самый последний: <i>…, weil ich krank gewesen <b>bin</b>. …, weil ich arbeiten <b>muss</b>.</i></p>
<p>Если придаточное стоит <b>первым</b>, оно занимает позицию 1 и главное начинается с глагола: <i>Weil ich krank bin, <b>bleibe</b> ich zu Hause.</i></p>
<p>Сравните: <b>denn</b> тоже значит «потому что», но порядок обычный: <i>…, denn ich <b>bin</b> krank.</i></p>`,
      q: [["Ich bleibe zu Hause, weil ___.", ["ich bin krank", "ich krank bin", "bin ich krank"], 1], ["Ich glaube, dass ___.", ["er kommt heute", "er heute kommt", "kommt er heute"], 1], ["Weil es regnet, ___.", ["ich bleibe zu Hause", "bleibe ich zu Hause", "zu Hause ich bleibe"], 1], ["Ich komme nicht, ___ ich habe keine Zeit.", ["weil", "denn", "dass"], 1]]
    },
    {
      id: "a21-perfekt", t: "Perfekt: важные неправильные глаголы",
      b: `<table><tr><th>Инфинитив</th><th>Perfekt</th><th>Инфинитив</th><th>Perfekt</th></tr>
<tr><td>sein</td><td><b>ist</b> gewesen</td><td>haben</td><td>hat gehabt</td></tr>
<tr><td>werden</td><td><b>ist</b> geworden</td><td>bleiben</td><td><b>ist</b> geblieben</td></tr>
<tr><td>gehen</td><td><b>ist</b> gegangen</td><td>kommen</td><td><b>ist</b> gekommen</td></tr>
<tr><td>fahren</td><td><b>ist</b> gefahren</td><td>fliegen</td><td><b>ist</b> geflogen</td></tr>
<tr><td>essen</td><td>hat gegessen</td><td>trinken</td><td>hat getrunken</td></tr>
<tr><td>sehen</td><td>hat gesehen</td><td>lesen</td><td>hat gelesen</td></tr>
<tr><td>schreiben</td><td>hat geschrieben</td><td>sprechen</td><td>hat gesprochen</td></tr>
<tr><td>nehmen</td><td>hat genommen</td><td>finden</td><td>hat gefunden</td></tr>
<tr><td>geben</td><td>hat gegeben</td><td>helfen</td><td>hat geholfen</td></tr>
<tr><td>denken</td><td>hat ge<b>dacht</b></td><td>bringen</td><td>hat ge<b>bracht</b></td></tr>
<tr><td>wissen</td><td>hat ge<b>wusst</b></td><td>kennen</td><td>hat ge<b>kannt</b></td></tr></table>
<p><b>denken, bringen, wissen, kennen</b> — «смешанные»: корень меняется, но окончание -t.</p>
<p>В придаточном: <i>…, dass ich das Buch gelesen <b>habe</b>.</i></p>`,
      q: [["Ich habe dir eine Nachricht ___. (schreiben)", ["geschreibt", "geschrieben", "schrieb"], 1], ["Er ___ zu Hause geblieben.", ["hat", "ist", "habe"], 1], ["Wir haben an dich ___. (denken)", ["gedenkt", "gedacht", "gedanken"], 1], ["Sie ___ zwei Jahre in Wien gewesen.", ["hat", "ist", "sind"], 1]]
    },
    {
      id: "a21-wechselpraep", t: "Предлоги двойного управления (Wechselpräpositionen)",
      b: `<p><b>in, an, auf, über, unter, vor, hinter, neben, zwischen</b> — падеж зависит от вопроса:</p>
<table><tr><th>Вопрос</th><th>Падеж</th><th>Пример</th></tr>
<tr><td><b>Wo?</b> — где? (место)</td><td>Dativ</td><td>Das Buch liegt auf <b>dem</b> Tisch.</td></tr>
<tr><td><b>Wohin?</b> — куда? (направление)</td><td>Akkusativ</td><td>Ich lege das Buch auf <b>den</b> Tisch.</td></tr></table>
<ul><li><b>in</b> — в; <b>an</b> — у, на вертикальной поверхности (an der Wand); <b>auf</b> — на горизонтальной (auf dem Tisch)</li>
<li><b>über</b> — над; <b>unter</b> — под; <b>vor</b> — перед; <b>hinter</b> — за; <b>neben</b> — рядом; <b>zwischen</b> — между</li></ul>
<p>Слияния: in dem → <b>im</b>, in das → <b>ins</b>, an dem → <b>am</b>, an das → <b>ans</b>.</p>`,
      q: [["Ich gehe in ___ Küche. (куда?)", ["die", "der", "dem"], 0], ["Das Bild hängt an ___ Wand.", ["die", "der", "den"], 1], ["Die Katze schläft unter ___ Bett.", ["das", "dem", "den"], 1], ["Wir gehen heute ___ Kino.", ["im", "ins", "in"], 1]]
    },
    {
      id: "a21-stellen", t: "stellen / stehen, legen / liegen, setzen / sitzen, hängen",
      b: `<table><tr><th>Действие (wohin? + Akk)</th><th>Состояние (wo? + Dat)</th></tr>
<tr><td><b>stellen</b> — ставить (вертикально)</td><td><b>stehen</b> — стоять (hat gestanden)</td></tr>
<tr><td><b>legen</b> — класть</td><td><b>liegen</b> — лежать (hat gelegen)</td></tr>
<tr><td><b>(sich) setzen</b> — сажать / садиться</td><td><b>sitzen</b> — сидеть (hat gesessen)</td></tr>
<tr><td><b>hängen</b> — вешать (hat gehängt)</td><td><b>hängen</b> — висеть (hat gehangen)</td></tr></table>
<p>Глаголы действия — правильные и отвечают на «куда?»: <i>Ich stelle die Flasche auf <b>den</b> Tisch.</i> Глаголы состояния — неправильные и отвечают на «где?»: <i>Die Flasche steht auf <b>dem</b> Tisch.</i></p>`,
      q: [["Ich ___ die Flasche auf den Tisch.", ["stelle", "stehe", "liege"], 0], ["Das Handy ___ auf dem Sofa.", ["legt", "liegt", "stellt"], 1], ["Er ___ sich auf den Stuhl.", ["sitzt", "setzt", "sitzen"], 1]]
    },
    {
      id: "a21-zwei-objekte", t: "Два дополнения: кому (Dat) + что (Akk)",
      b: `<p>У глаголов <b>geben, schenken, schicken, zeigen, bringen, erklären, empfehlen, kaufen</b> бывает два дополнения.</p>
<ul><li>Оба — существительные: <b>Dativ → Akkusativ</b>. <i>Ich schenke <b>meiner Mutter</b> <b>einen Schal</b>.</i></li>
<li>Одно — местоимение: <b>местоимение раньше</b>. <i>Ich schenke <b>ihr</b> einen Schal. Ich schenke <b>ihn</b> meiner Mutter.</i></li>
<li>Оба — местоимения: <b>Akkusativ → Dativ</b>. <i>Ich schenke <b>ihn ihr</b>.</i></li></ul>`,
      q: [["Ich gebe ___.", ["das Buch dem Lehrer", "dem Lehrer das Buch", "dem Lehrer den Buch"], 1], ["Ich gebe ___. (das Buch → es, dem Lehrer → ihm)", ["es ihm", "ihm es", "es er"], 0], ["Er zeigt ___ die Stadt.", ["uns", "wir", "unser"], 0]]
    },
    {
      id: "a21-adj-dekl1", t: "Прилагательное после der / die / das",
      b: `<p>После определённого артикля (а также <b>dieser, welcher, jeder</b>) у прилагательного всего два окончания: <b>-e</b> или <b>-en</b>.</p>
<table><tr><th></th><th>m</th><th>f</th><th>n</th><th>мн. ч.</th></tr>
<tr><td>Nom</td><td>der neu<b>e</b> Tisch</td><td>die neu<b>e</b> Lampe</td><td>das neu<b>e</b> Bett</td><td>die neu<b>en</b> Stühle</td></tr>
<tr><td>Akk</td><td>den neu<b>en</b> Tisch</td><td>die neu<b>e</b> Lampe</td><td>das neu<b>e</b> Bett</td><td>die neu<b>en</b> Stühle</td></tr>
<tr><td>Dat</td><td>dem neu<b>en</b> Tisch</td><td>der neu<b>en</b> Lampe</td><td>dem neu<b>en</b> Bett</td><td>den neu<b>en</b> Stühlen</td></tr></table>
<p>Запоминалка: <b>-e</b> только в пяти клетках (Nom ед. ч. + Akk f и n). Везде остальное <b>-en</b>.</p>`,
      q: [["Der ___ Kollege ist nett.", ["neue", "neuen", "neuer"], 0], ["Ich kaufe den ___ Mantel.", ["schwarze", "schwarzen", "schwarzer"], 1], ["Mit dem ___ Auto fahren wir nicht.", ["alte", "alten", "altem"], 1], ["Die ___ Blumen sind schön.", ["rote", "roten", "roter"], 1]]
    },
    {
      id: "a21-praeteritum-basis", t: "Präteritum: war, hatte и модальные глаголы",
      b: `<p>Для <b>sein, haben</b> и модальных глаголов даже в разговоре обычно используют Präteritum, а не Perfekt.</p>
<table><tr><th></th><th>sein</th><th>haben</th><th>können</th><th>müssen</th></tr>
<tr><td>ich</td><td>war</td><td>hatte</td><td>konnte</td><td>musste</td></tr>
<tr><td>du</td><td>warst</td><td>hattest</td><td>konntest</td><td>musstest</td></tr>
<tr><td>er/sie/es</td><td>war</td><td>hatte</td><td>konnte</td><td>musste</td></tr>
<tr><td>wir</td><td>waren</td><td>hatten</td><td>konnten</td><td>mussten</td></tr>
<tr><td>ihr</td><td>wart</td><td>hattet</td><td>konntet</td><td>musstet</td></tr>
<tr><td>sie/Sie</td><td>waren</td><td>hatten</td><td>konnten</td><td>mussten</td></tr></table>
<p>Также: wollen → <b>wollte</b>, dürfen → <b>durfte</b>, sollen → <b>sollte</b>. У модальных в Präteritum <b>нет умлаута</b>. Формы ich и er совпадают.</p>`,
      q: [["Gestern ___ ich krank.", ["war", "bin", "wart"], 0], ["Wir ___ keine Zeit.", ["hatte", "hatten", "hattet"], 1], ["Er ___ nicht kommen. (können)", ["konnte", "kannte", "könnte"], 0], ["___ du gestern im Büro?", ["Warst", "War", "Wart"], 0]]
    },
    {
      id: "a21-lokal", t: "Куда и где: nach, in, zu, an, auf",
      b: `<table><tr><th>Куда?</th><th>Где?</th><th>Когда</th></tr>
<tr><td><b>nach</b> Berlin, nach Italien, nach Hause</td><td><b>in</b> Berlin, <b>zu</b> Hause</td><td>города, страны без артикля, дом</td></tr>
<tr><td><b>in</b> die Schweiz, in die USA</td><td><b>in der</b> Schweiz</td><td>страны с артиклем</td></tr>
<tr><td><b>in</b>s Kino, in die Stadt, in die Berge</td><td><b>im</b> Kino, in der Stadt</td><td>здания, помещения, горы</td></tr>
<tr><td><b>zu</b>m Arzt, zur Post, zu Oma</td><td><b>beim</b> Arzt, bei der Post</td><td>люди, учреждения</td></tr>
<tr><td><b>an</b>s Meer, an den See</td><td><b>am</b> Meer, am See</td><td>вода, берег</td></tr>
<tr><td><b>auf</b> die Insel, auf den Markt</td><td><b>auf der</b> Insel</td><td>острова, рынок, мероприятия</td></tr></table>`,
      q: [["Wir fahren ___ Italien.", ["in", "nach", "zu"], 1], ["Im Urlaub fahren wir ___ Meer.", ["ans", "ins", "zum"], 0], ["Ich fliege ___ die Schweiz.", ["nach", "in", "zu"], 1], ["Ich gehe ___ Oma.", ["zu", "nach", "bei"], 0]]
    },
    {
      id: "a21-komparation", t: "Сравнение: größer als, so groß wie, am größten",
      b: `<table><tr><th>Основа</th><th>Komparativ (-er)</th><th>Superlativ (am …-sten)</th></tr>
<tr><td>klein</td><td>kleiner</td><td>am kleinsten</td></tr>
<tr><td>alt</td><td>ä<b>lter</b></td><td>am ä<b>ltesten</b></td></tr>
<tr><td>groß</td><td>gr<b>ö</b>ßer</td><td>am gr<b>ö</b>ßten</td></tr>
<tr><td>teuer</td><td>teurer</td><td>am teuersten</td></tr>
<tr><td><b>gut</b></td><td><b>besser</b></td><td><b>am besten</b></td></tr>
<tr><td><b>viel</b></td><td><b>mehr</b></td><td><b>am meisten</b></td></tr>
<tr><td><b>gern</b></td><td><b>lieber</b></td><td><b>am liebsten</b></td></tr>
<tr><td>hoch</td><td>höher</td><td>am höchsten</td></tr></table>
<ul><li>Неравенство: <b>als</b> — <i>Berlin ist größer <b>als</b> München.</i></li>
<li>Равенство: <b>so … wie</b> — <i>Er ist <b>so</b> alt <b>wie</b> ich.</i></li>
<li>Перед существительным — как прилагательное: <i>das günstig<b>ste</b> Angebot, der best<b>e</b> Freund</i>.</li></ul>`,
      q: [["Der Zug ist schneller ___ der Bus.", ["wie", "als", "so"], 1], ["Ich trinke ___ Tee als Kaffee. (gern)", ["gerner", "lieber", "mehr gern"], 1], ["Anna ist so groß ___ ihre Schwester.", ["als", "wie", "dass"], 1], ["Dieses Angebot ist am ___. (gut)", ["gutesten", "besten", "bessten"], 1]]
    },
    {
      id: "a21-welcher", t: "welcher? и dieser",
      b: `<p><b>welcher</b> (какой?) и <b>dieser</b> (этот) склоняются как определённый артикль:</p>
<table><tr><th></th><th>m</th><th>f</th><th>n</th><th>мн. ч.</th></tr>
<tr><td>Nom</td><td>welch<b>er</b> / dies<b>er</b></td><td>welch<b>e</b> / dies<b>e</b></td><td>welch<b>es</b> / dies<b>es</b></td><td>welch<b>e</b> / dies<b>e</b></td></tr>
<tr><td>Akk</td><td>welch<b>en</b> / dies<b>en</b></td><td>welche / diese</td><td>welches / dieses</td><td>welche / diese</td></tr>
<tr><td>Dat</td><td>welch<b>em</b> / dies<b>em</b></td><td>welch<b>er</b> / dies<b>er</b></td><td>welch<b>em</b> / dies<b>em</b></td><td>welch<b>en</b> / dies<b>en</b></td></tr></table>
<p><i>Welche Jacke nimmst du? — Diese hier.</i></p>`,
      q: [["___ Hose gefällt dir?", ["Welcher", "Welche", "Welches"], 1], ["Ich nehme ___ Mantel.", ["dieser", "diesen", "dieses"], 1], ["___ Kleid ist günstiger?", ["Welches", "Welcher", "Welchen"], 0]]
    }
  ]
});

window.DE_LEVELS.push({
  id: "A2.2",
  title: "Свободнее о жизни",
  desc: "Медиа, чувства, учёба, природа, учреждения. Возвратные глаголы, Präteritum, вежливые просьбы.",
  units: [
    {
      id: "a22-u1", t: "Medien · Медиа и связь",
      w: ["das Handy|Handys|мобильный телефон", "der Computer|Computer|компьютер", "die Nachricht|Nachrichten|сообщение; новость", "das Internet|-|интернет", "die Zeitung|Zeitungen|газета", "die Zeitschrift|Zeitschriften|журнал", "der Bildschirm|Bildschirme|экран", "das Passwort|Passwörter|пароль", "die Datei|Dateien|файл", "herunterladen|er lädt herunter|скачивать", "schicken||отправлять", "anrufen|er ruft an, hat angerufen|звонить", "benutzen||пользоваться", "wissen|er weiß, hat gewusst|знать", "bekommen|hat bekommen|получать"],
      r: ["a22-wenn-als", "a22-ob"],
      s: [["Wenn ich Zeit habe, lese ich die Zeitung.", "Когда у меня есть время, я читаю газету.", ["Ich lese die Zeitung, wenn ich Zeit habe."]], ["Als ich ein Kind war, hatte ich kein Handy.", "Когда я был ребёнком, у меня не было мобильного.", ["Ich hatte kein Handy, als ich ein Kind war."]], ["Weißt du, ob er die Nachricht bekommen hat?", "Ты знаешь, получил ли он сообщение?"], ["Kannst du mir sagen, wo der Bahnhof ist?", "Можешь мне сказать, где вокзал?"], ["Ich rufe dich morgen an.", "Я позвоню тебе завтра.", ["Morgen rufe ich dich an."]]]
    },
    {
      id: "a22-u2", t: "Gefühle · Чувства и отношения",
      w: ["das Gefühl|Gefühle|чувство", "die Liebe|-|любовь", "die Angst|Ängste|страх", "die Freude|Freuden|радость", "die Beziehung|Beziehungen|отношения", "der Partner|Partner|партнёр", "der Hund|Hunde|собака", "sich freuen||радоваться", "sich ärgern||злиться", "sich verlieben||влюбляться", "sich interessieren||интересоваться", "glücklich||счастливый", "traurig||грустный", "zufrieden||довольный", "nervös||нервный"],
      r: ["a22-reflexiv", "a22-verben-praep"],
      s: [["Ich freue mich auf das Wochenende.", "Я жду не дождусь выходных."], ["Sie interessiert sich für Musik.", "Она интересуется музыкой."], ["Worüber ärgerst du dich?", "На что ты злишься?"], ["Er hat sich in sie verliebt.", "Он в неё влюбился."], ["Ich habe Angst vor Hunden.", "Я боюсь собак."]]
    },
    {
      id: "a22-u3", t: "Schule und Ausbildung · Учёба",
      w: ["die Schule|Schulen|школа", "die Ausbildung|Ausbildungen|профобучение", "das Studium|Studien|учёба в вузе", "die Universität|Universitäten|университет", "die Prüfung|Prüfungen|экзамен", "die Note|Noten|оценка", "das Zeugnis|Zeugnisse|аттестат, табель", "der Lehrer|Lehrer|учитель", "das Fach|Fächer|предмет", "das Praktikum|Praktika|практика, стажировка", "die Regel|Regeln|правило", "bestehen|hat bestanden|сдать (экзамен)", "wiederholen||повторять", "studieren||учиться в вузе", "erklären||объяснять"],
      r: ["a22-praeteritum", "a22-konnektoren"],
      s: [["Nach der Schule machte er eine Ausbildung.", "После школы он прошёл профобучение.", ["Er machte nach der Schule eine Ausbildung."]], ["Ich habe die Prüfung bestanden.", "Я сдал экзамен."], ["Sie war krank, deshalb konnte sie nicht kommen.", "Она была больна, поэтому не смогла прийти."], ["Es regnet, trotzdem gehen wir spazieren.", "Идёт дождь, но мы всё равно идём гулять."], ["Der Lehrer erklärt die Regel noch einmal.", "Учитель ещё раз объясняет правило."]]
    },
    {
      id: "a22-u4", t: "Natur und Umwelt · Природа",
      w: ["die Natur|-|природа", "die Umwelt|-|окружающая среда", "der Wald|Wälder|лес", "der See|Seen|озеро", "der Fluss|Flüsse|река", "der Baum|Bäume|дерево", "das Tier|Tiere|животное", "der Müll|-|мусор", "die Energie|Energien|энергия", "das Klima|Klimas|климат", "schützen||защищать", "trennen||разделять; сортировать", "sparen||экономить, копить", "sauber||чистый", "werden|er wird, ist geworden|становиться"],
      r: ["a22-adj-dekl2", "a22-werden"],
      s: [["Wir trennen den Müll.", "Мы сортируем мусор."], ["Es ist ein schöner Wald.", "Это красивый лес."], ["Morgen wird es regnen.", "Завтра будет дождь."], ["Man muss die Umwelt schützen.", "Нужно защищать окружающую среду."], ["Ich trinke gern kaltes Wasser.", "Я люблю пить холодную воду."]]
    },
    {
      id: "a22-u5", t: "Ämter · Учреждения",
      w: ["das Amt|Ämter|ведомство", "das Formular|Formulare|бланк", "der Antrag|Anträge|заявление", "der Ausweis|Ausweise|удостоверение личности", "die Unterschrift|Unterschriften|подпись", "die Anmeldung|Anmeldungen|регистрация", "die Versicherung|Versicherungen|страховка", "der Schalter|Schalter|окошко, стойка", "ausfüllen|er füllt aus|заполнять", "unterschreiben|hat unterschrieben|подписывать", "abgeben|er gibt ab|сдавать, отдавать", "warten||ждать", "vergessen|er vergisst, hat vergessen|забывать", "mitnehmen|er nimmt mit|брать с собой"],
      r: ["a22-konj2-hoeflich", "a22-zu-inf"],
      s: [["Könnten Sie mir bitte helfen?", "Не могли бы вы мне помочь?"], ["Ich hätte gern ein Formular.", "Мне, пожалуйста, бланк."], ["Sie müssen den Antrag ausfüllen und unterschreiben.", "Вам нужно заполнить и подписать заявление."], ["Ich habe vergessen, den Ausweis mitzunehmen.", "Я забыл взять с собой удостоверение."], ["Wo kann ich das Formular abgeben?", "Где я могу сдать бланк?"]]
    }
  ],
  rules: [
    {
      id: "a22-wenn-als", t: "«Когда»: wenn, als, wann",
      b: `<table><tr><th>Слово</th><th>Когда используется</th><th>Пример</th></tr>
<tr><td><b>als</b></td><td>одно событие или период в прошлом</td><td>Als ich Kind war, wohnte ich in Kiew.</td></tr>
<tr><td><b>wenn</b></td><td>настоящее и будущее; «если»</td><td>Wenn ich Zeit habe, lese ich.</td></tr>
<tr><td><b>wenn</b> (immer wenn)</td><td>повторялось в прошлом, «каждый раз когда»</td><td>Immer wenn es regnete, blieben wir zu Hause.</td></tr>
<tr><td><b>wann</b></td><td>только вопрос (прямой или косвенный)</td><td>Wann kommst du? Ich weiß nicht, wann er kommt.</td></tr></table>
<p>als и wenn открывают придаточное — глагол в конце.</p>`,
      q: [["___ ich 10 Jahre alt war, zogen wir um.", ["Wenn", "Als", "Wann"], 1], ["___ ich müde bin, trinke ich Kaffee.", ["Als", "Wenn", "Wann"], 1], ["Weißt du, ___ der Zug kommt?", ["wenn", "wann", "als"], 1]]
    },
    {
      id: "a22-ob", t: "Косвенный вопрос: ob и W-слова",
      b: `<p>Косвенный вопрос — это придаточное, поэтому глагол <b>в конце</b>.</p>
<ul><li>Вопрос «да/нет» → <b>ob</b> (ли): <i>Kommt er? → Ich weiß nicht, <b>ob</b> er <b>kommt</b>.</i></li>
<li>W-вопрос → то же W-слово: <i>Wo ist der Bahnhof? → Können Sie mir sagen, <b>wo</b> der Bahnhof <b>ist</b>?</i></li></ul>
<p>Так вопросы звучат вежливее. Полезные начала: <i>Wissen Sie, …? Können Sie mir sagen, …? Ich möchte wissen, …</i></p>`,
      q: [["Ich weiß nicht, ___ er heute kommt.", ["dass", "ob", "wenn"], 1], ["Können Sie mir sagen, wo ___?", ["ist die Post", "die Post ist", "die Post sein"], 1], ["Weißt du, ___ das kostet?", ["wie viel", "ob viel", "was viel"], 0]]
    },
    {
      id: "a22-reflexiv", t: "Возвратные глаголы (sich …)",
      b: `<table><tr><th></th><th>Akkusativ</th><th>Dativ</th></tr>
<tr><td>ich</td><td>freue <b>mich</b></td><td>wasche <b>mir</b> die Hände</td></tr>
<tr><td>du</td><td>freust <b>dich</b></td><td>wäschst <b>dir</b> die Hände</td></tr>
<tr><td>er/sie/es</td><td>freut <b>sich</b></td><td>wäscht <b>sich</b> die Hände</td></tr>
<tr><td>wir</td><td>freuen <b>uns</b></td><td>waschen <b>uns</b> die Hände</td></tr>
<tr><td>ihr</td><td>freut <b>euch</b></td><td>wascht <b>euch</b> die Hände</td></tr>
<tr><td>sie/Sie</td><td>freuen <b>sich</b></td><td>waschen <b>sich</b> die Hände</td></tr></table>
<p>Если в предложении есть ещё дополнение в Akkusativ (die Hände, die Zähne), возвратное местоимение ставится в <b>Dativ</b>. Отличаются только ich (mir) и du (dir).</p>
<p>Частые: sich freuen, sich ärgern, sich interessieren, sich treffen, sich erinnern, sich beeilen, sich fühlen. Perfekt — с haben: <i>Ich habe mich gefreut.</i></p>`,
      q: [["Ich freue ___ auf den Urlaub.", ["mich", "mir", "sich"], 0], ["Wir treffen ___ um acht.", ["uns", "sich", "euch"], 0], ["Er interessiert ___ für Politik.", ["ihn", "sich", "ihm"], 1], ["Ich putze ___ die Zähne.", ["mich", "mir", "sich"], 1]]
    },
    {
      id: "a22-verben-praep", t: "Глаголы с предлогами",
      b: `<p>Многие глаголы требуют определённого предлога. Учите их как одно целое:</p>
<table><tr><th>Глагол</th><th>Значение</th></tr>
<tr><td>sich freuen <b>auf</b> + Akk</td><td>радоваться предстоящему</td></tr>
<tr><td>sich freuen <b>über</b> + Akk</td><td>радоваться тому, что есть</td></tr>
<tr><td>sich interessieren <b>für</b> + Akk</td><td>интересоваться</td></tr>
<tr><td>sich ärgern <b>über</b> + Akk</td><td>злиться на</td></tr>
<tr><td>warten <b>auf</b> + Akk</td><td>ждать</td></tr>
<tr><td>denken <b>an</b> + Akk</td><td>думать о</td></tr>
<tr><td>sprechen <b>über</b> + Akk</td><td>говорить о</td></tr>
<tr><td>Angst haben <b>vor</b> + Dat</td><td>бояться</td></tr>
<tr><td>träumen <b>von</b> + Dat</td><td>мечтать о</td></tr>
<tr><td>teilnehmen <b>an</b> + Dat</td><td>участвовать в</td></tr></table>
<p><b>Вопросы:</b> о вещах — <b>wo(r) + предлог</b>: <i>Worauf wartest du? Worüber sprecht ihr?</i> О людях — предлог + wen/wem: <i>Auf wen wartest du?</i></p>
<p><b>Ответ местоимением</b> о вещах — <b>da(r) + предлог</b>: <i>Ich warte darauf. Ich denke daran.</i></p>`,
      q: [["Ich warte ___ den Bus.", ["für", "auf", "an"], 1], ["Sie interessiert sich ___ Kunst.", ["für", "über", "an"], 0], ["___ denkst du? — An meinen Urlaub.", ["Woran", "Worauf", "An was"], 0], ["Er hat Angst ___ Hunden.", ["für", "vor", "von"], 1]]
    },
    {
      id: "a22-praeteritum", t: "Präteritum: письменное прошедшее",
      b: `<p>Präteritum используют в книгах, статьях, новостях и рассказах.</p>
<p><b>Правильные:</b> основа + <b>-te</b>: machen → ich mach<b>te</b>, du mach<b>test</b>, er mach<b>te</b>, wir mach<b>ten</b>, ihr mach<b>tet</b>, sie mach<b>ten</b>. Основа на -t/-d: arbeit<b>ete</b>.</p>
<p><b>Неправильные</b> меняют корень, у ich и er нет окончания:</p>
<table><tr><th>Инфинитив</th><th>Präteritum</th><th>Инфинитив</th><th>Präteritum</th></tr>
<tr><td>gehen</td><td>ging</td><td>kommen</td><td>kam</td></tr>
<tr><td>sehen</td><td>sah</td><td>geben</td><td>gab</td></tr>
<tr><td>nehmen</td><td>nahm</td><td>finden</td><td>fand</td></tr>
<tr><td>schreiben</td><td>schrieb</td><td>sprechen</td><td>sprach</td></tr>
<tr><td>fahren</td><td>fuhr</td><td>bleiben</td><td>blieb</td></tr>
<tr><td>essen</td><td>aß</td><td>trinken</td><td>trank</td></tr>
<tr><td>wissen</td><td>wusste</td><td>denken</td><td>dachte</td></tr></table>`,
      q: [["Gestern ___ ich einen Brief. (schreiben)", ["schreibte", "schrieb", "schrob"], 1], ["Wir ___ nach Hause. (fahren)", ["fuhren", "fahrten", "fuhrten"], 0], ["Er ___ sehr lange. (arbeiten)", ["arbeitete", "arbeitet", "arbeite"], 0], ["Sie ___ ins Kino. (gehen)", ["ging", "gang", "gehte"], 0]]
    },
    {
      id: "a22-konnektoren", t: "deshalb, trotzdem, sonst: связки с инверсией",
      b: `<p>Эти слова — наречия. Они занимают <b>позицию 1</b>, поэтому глагол идёт сразу за ними:</p>
<ul><li><b>deshalb / deswegen / darum</b> — поэтому: <i>Ich bin krank, deshalb <b>bleibe</b> ich zu Hause.</i></li>
<li><b>trotzdem</b> — тем не менее, всё равно: <i>Es regnet, trotzdem <b>gehen</b> wir spazieren.</i></li>
<li><b>sonst</b> — иначе: <i>Beeil dich, sonst <b>verpasst</b> du den Zug.</i></li>
<li><b>dann / danach</b> — потом: <i>Zuerst esse ich, dann <b>gehe</b> ich.</i></li></ul>
<table><tr><th>Тип связки</th><th>Слова</th><th>Порядок</th></tr>
<tr><td>Союз (позиция 0)</td><td>und, aber, oder, denn, sondern</td><td>обычный: denn ich bin krank</td></tr>
<tr><td>Наречие (позиция 1)</td><td>deshalb, trotzdem, sonst, dann</td><td>инверсия: deshalb bin ich</td></tr>
<tr><td>Подчинительный союз</td><td>weil, dass, obwohl, wenn</td><td>глагол в конце: weil ich krank bin</td></tr></table>`,
      q: [["Ich habe Hunger, deshalb ___ ich etwas.", ["esse", "ich esse", "essen"], 0], ["Es ist kalt, ___ gehen wir schwimmen.", ["deshalb", "trotzdem", "weil"], 1], ["Lern mehr, ___ bestehst du die Prüfung nicht.", ["sonst", "deshalb", "trotzdem"], 0]]
    },
    {
      id: "a22-adj-dekl2", t: "Прилагательное после ein/kein/mein и без артикля",
      b: `<p><b>После ein, kein, mein…</b> окончание прилагательного показывает род там, где артикль «молчит»:</p>
<table><tr><th></th><th>m</th><th>f</th><th>n</th><th>мн. ч.</th></tr>
<tr><td>Nom</td><td>ein neu<b>er</b> Tisch</td><td>eine neu<b>e</b> Lampe</td><td>ein neu<b>es</b> Bett</td><td>meine neu<b>en</b> Stühle</td></tr>
<tr><td>Akk</td><td>einen neu<b>en</b> Tisch</td><td>eine neu<b>e</b> Lampe</td><td>ein neu<b>es</b> Bett</td><td>meine neu<b>en</b> Stühle</td></tr>
<tr><td>Dat</td><td>einem neu<b>en</b> Tisch</td><td>einer neu<b>en</b> Lampe</td><td>einem neu<b>en</b> Bett</td><td>meinen neu<b>en</b> Stühlen</td></tr></table>
<p><b>Без артикля</b> прилагательное берёт окончание определённого артикля: kalt<b>er</b> Kaffee (der), frisch<b>e</b> Milch (die), kalt<b>es</b> Wasser (das), mit kalt<b>em</b> Wasser (dem), kalt<b>en</b> Kaffee (den).</p>`,
      q: [["Das ist ein ___ Wald.", ["schöne", "schöner", "schönen"], 1], ["Ich habe ein ___ Auto.", ["neues", "neue", "neuen"], 0], ["Ich trinke gern ___ Kaffee.", ["heißen", "heißer", "heißes"], 0], ["Er wohnt in einer ___ Wohnung.", ["kleine", "kleinen", "kleiner"], 1]]
    },
    {
      id: "a22-werden", t: "Глагол werden",
      b: `<table><tr><th></th><th>werden — становиться</th></tr>
<tr><td>ich</td><td>werde</td></tr><tr><td>du</td><td><b>wirst</b></td></tr><tr><td>er/sie/es</td><td><b>wird</b></td></tr>
<tr><td>wir</td><td>werden</td></tr><tr><td>ihr</td><td>werdet</td></tr><tr><td>sie/Sie</td><td>werden</td></tr></table>
<p>Präteritum: <b>wurde</b>; Perfekt: <b>ist geworden</b>.</p>
<p>Три роли werden:</p>
<ul><li>самостоятельный глагол «становиться»: <i>Er <b>wird</b> Arzt. Es <b>wird</b> kalt.</i></li>
<li>+ инфинитив = будущее время (B1.2): <i>Morgen <b>wird</b> es regnen.</i></li>
<li>+ Partizip II = пассив (B1.1): <i>Das Haus <b>wird</b> gebaut.</i></li></ul>`,
      q: [["Mein Bruder ___ Lehrer.", ["wird", "werdet", "wirst"], 0], ["Du ___ immer besser.", ["wird", "wirst", "werdest"], 1], ["Im Herbst ___ es früh dunkel.", ["wird", "werde", "wurden"], 0]]
    },
    {
      id: "a22-konj2-hoeflich", t: "Вежливые просьбы: könnten, würden, hätte gern",
      b: `<p>Konjunktiv II делает просьбу мягче:</p>
<ul><li><b>Könnten</b> Sie mir bitte helfen? — Не могли бы вы…</li>
<li><b>Würden</b> Sie bitte das Fenster öffnen? — Не откроете ли…</li>
<li>Ich <b>hätte gern</b> ein Formular. — Мне бы хотелось…</li>
<li>Du <b>solltest</b> mehr schlafen. — Тебе следовало бы… (совет)</li></ul>
<table><tr><th></th><th>können</th><th>haben</th><th>werden</th><th>sollen</th></tr>
<tr><td>ich</td><td>könnte</td><td>hätte</td><td>würde</td><td>sollte</td></tr>
<tr><td>du</td><td>könntest</td><td>hättest</td><td>würdest</td><td>solltest</td></tr>
<tr><td>er/sie/es</td><td>könnte</td><td>hätte</td><td>würde</td><td>sollte</td></tr>
<tr><td>wir/sie/Sie</td><td>könnten</td><td>hätten</td><td>würden</td><td>sollten</td></tr></table>`,
      q: [["___ Sie mir bitte helfen?", ["Können", "Könnten", "Konnten"], 1], ["Ich ___ gern einen Kaffee.", ["hätte", "hatte", "hast"], 0], ["Du ___ mehr Wasser trinken. (совет)", ["solltest", "sollst", "solle"], 0]]
    },
    {
      id: "a22-zu-inf", t: "Инфинитив с zu",
      b: `<p>После многих глаголов и выражений второй глагол стоит в конце с <b>zu</b>:</p>
<p>versuchen, vergessen, anfangen, aufhören, beginnen, vorhaben, hoffen, Lust haben, Zeit haben, es ist wichtig / schwer / schön…</p>
<ul><li><i>Ich habe keine Lust, heute <b>zu arbeiten</b>.</i></li><li><i>Es ist schwer, Deutsch <b>zu lernen</b>.</i></li></ul>
<p>Отделяемые глаголы: zu <b>внутри</b> — mit<b>zu</b>nehmen, an<b>zu</b>rufen.</p>
<p><b>Без zu:</b> после модальных глаголов, werden, lassen и глаголов движения: <i>Ich kann kommen. Ich gehe einkaufen.</i></p>`,
      q: [["Ich habe vergessen, dich ___.", ["anrufen", "anzurufen", "zu anrufen"], 1], ["Hast du Lust, ins Kino ___?", ["gehen", "zu gehen", "gehst"], 1], ["Ich kann heute nicht ___.", ["kommen", "zu kommen", "komme"], 0]]
    }
  ]
});
