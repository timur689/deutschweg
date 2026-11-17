/* Дополнительные наборы A1–A2: доводят словарь до объёма списков Goethe. */
window.DE_PACKS = window.DE_PACKS || {};
window.dwAddPacks = window.dwAddPacks || ((level, packs) => { window.DE_PACKS[level] = (window.DE_PACKS[level] || []).concat(packs); });

window.dwAddPacks("A1.1", [
  { id: "a11-p8", t: "Родственники и люди", w: [
    "die Tante|Tanten|тётя", "der Onkel|Onkel|дядя", "der Cousin|Cousins|двоюродный брат", "die Cousine|Cousinen|двоюродная сестра",
    "die Großeltern|Pl|бабушка и дедушка", "der Enkel|Enkel|внук", "die Enkelin|Enkelinnen|внучка", "die Partnerin|Partnerinnen|партнёрша",
    "das Paar|Paare|пара", "der Erwachsene|Erwachsenen|взрослый", "die Dame|Damen|дама", "die Person|Personen|человек, лицо",
    "der Nachname|Nachnamen|фамилия", "das Haustier|Haustiere|домашнее животное", "ledig||холост, не замужем", "geschieden||разведён(а)", "lieb||милый, дорогой"] },
  { id: "a11-p9", t: "Страны и языки", w: [
    "Deutschland||Германия", "Österreich||Австрия", "die Schweiz|-|Швейцария", "die Türkei|-|Турция", "die USA|Pl|США",
    "Deutsch||немецкий язык", "Englisch||английский язык", "Russisch||русский язык", "Ukrainisch||украинский язык",
    "der Deutsche|Deutschen|немец", "die Welt|Welten|мир", "die Hauptstadt|Hauptstädte|столица", "der Ausländer|Ausländer|иностранец",
    "die Nationalität|Nationalitäten|национальность", "europäisch||европейский", "deutsch||немецкий"] },
  { id: "a11-p10", t: "Продукты", w: [
    "das Hähnchen|Hähnchen|курица (блюдо)", "das Rindfleisch|-|говядина", "das Schweinefleisch|-|свинина", "die Zwiebel|Zwiebeln|лук",
    "die Karotte|Karotten|морковь", "die Gurke|Gurken|огурец", "die Erdbeere|Erdbeeren|клубника", "die Birne|Birnen|груша", "die Zitrone|Zitronen|лимон",
    "der Joghurt|Joghurts|йогурт", "die Sahne|-|сливки", "das Müsli|Müslis|мюсли", "die Schokolade|Schokoladen|шоколад", "das Eis|-|мороженое; лёд",
    "die Pizza|Pizzas|пицца", "der Pfeffer|-|перец (специя)", "die Marmelade|Marmeladen|джем, варенье", "der Honig|-|мёд",
    "das Getränk|Getränke|напиток", "das Mineralwasser|-|минеральная вода"] },
  { id: "a11-p11", t: "Действия дома и на уроке", w: [
    "aufwachen|er wacht auf|просыпаться", "einschlafen|er schläft ein, ist eingeschlafen|засыпать", "spülen||мыть посуду", "bügeln||гладить",
    "lachen||смеяться", "weinen||плакать", "denken|hat gedacht|думать", "rufen|hat gerufen|звать, кричать", "zählen||считать (числа)",
    "schauen||смотреть", "riechen|hat gerochen|пахнуть; нюхать", "ankreuzen|er kreuzt an|отмечать крестиком", "ergänzen||дополнять", "markieren||отмечать, выделять"] },
  { id: "a11-p12", t: "Какой? Описания", w: [
    "hübsch||хорошенький", "hässlich||некрасивый", "dick||толстый", "dünn||тонкий, худой", "schnell||быстрый", "langsam||медленный",
    "schmutzig||грязный", "wahr||правдивый, верный", "klar||ясный; понятно", "super||супер", "prima||отлично", "schade||жаль", "egal||всё равно",
    "genau||точно", "ganz||целый; совсем", "beliebt||популярный", "bekannt||известный"] }
]);

window.dwAddPacks("A1.2", [
  { id: "a12-p8", t: "В магазине", w: [
    "der Laden|Läden|магазин, лавка", "der Einkaufswagen|Einkaufswagen|тележка", "der Korb|Körbe|корзина", "die Liste|Listen|список",
    "der Einkauf|Einkäufe|покупка", "die Öffnungszeit|Öffnungszeiten|часы работы", "das Wechselgeld|-|сдача", "die Münze|Münzen|монета",
    "der Schein|Scheine|купюра; справка", "die EC-Karte|EC-Karten|банковская карта", "geöffnet||открыто", "geschlossen||закрыто", "getrennt||раздельно"] },
  { id: "a12-p9", t: "Время суток и частота", w: [
    "der Vormittag|Vormittage|первая половина дня", "der Nachmittag|Nachmittage|вторая половина дня", "die Mitternacht|-|полночь",
    "das Viertel|Viertel|четверть; квартал", "halb||половина, пол-", "der Wecker|Wecker|будильник", "der Alltag|-|повседневная жизнь",
    "täglich||ежедневно", "wöchentlich||еженедельно", "morgens||по утрам", "mittags||в обед", "abends||по вечерам", "nachts||ночью",
    "selten||редко", "meistens||чаще всего", "normalerweise||обычно", "übermorgen||послезавтра", "vorgestern||позавчера"] },
  { id: "a12-p10", t: "Ищем квартиру", w: [
    "die Anzeige|Anzeigen|объявление; заявление в полицию", "der Quadratmeter|Quadratmeter|квадратный метр", "die Lage|Lagen|расположение; положение",
    "die Nähe|-|близость", "das Zentrum|Zentren|центр", "der Stadtteil|Stadtteile|район города", "die Umgebung|Umgebungen|окрестности",
    "der Hof|Höfe|двор", "die Garage|Garagen|гараж", "das Hochhaus|Hochhäuser|многоэтажный дом", "die WG|WGs|квартира с соседями",
    "der Mieter|Mieter|арендатор", "die Kaltmiete|Kaltmieten|аренда без коммунальных", "zentral||центральный"] },
  { id: "a12-p11", t: "У врача и в аптеке", w: [
    "der Verband|Verbände|повязка; союз", "das Pflaster|Pflaster|пластырь", "die Salbe|Salben|мазь", "der Tropfen|Tropfen|капля",
    "die Grippe|Grippen|грипп", "die Kopfschmerzen|Pl|головная боль", "die Bauchschmerzen|Pl|боль в животе", "die Halsschmerzen|Pl|боль в горле",
    "die Versichertenkarte|Versichertenkarten|карта медстрахования", "das Wartezimmer|Wartezimmer|приёмная", "die Sprechstunde|Sprechstunden|приёмные часы",
    "verschreiben|hat verschrieben|выписывать (лекарство)", "sich hinlegen|er legt sich hin|прилечь", "weh||больно", "verletzt||раненый, травмированный"] },
  { id: "a12-p12", t: "Где? Предлоги и места", w: [
    "neben||рядом с", "zwischen||между", "über||над; о", "unter||под; среди", "vor||перед; назад (о времени)", "hinter||за, позади",
    "gegenüber||напротив", "oben||наверху", "unten||внизу", "vorne||впереди", "hinten||сзади", "innen||внутри", "außen||снаружи",
    "bis||до", "ab||с (какого-то момента)", "seit||с (какого-то времени)", "ohne||без", "für||для", "gegen||против; около", "durch||через, сквозь"] }
]);

window.dwAddPacks("A2.1", [
  { id: "a21-p8", t: "Внешность", w: [
    "die Figur|Figuren|фигура", "das Gewicht|Gewichte|вес", "der Bart|Bärte|борода", "das Aussehen|-|внешность", "aussehen|er sieht aus|выглядеть",
    "die Schulter|Schultern|плечо", "die Brust|Brüste|грудь", "der Zeh|Zehen|палец ноги", "die Lippe|Lippen|губа", "die Zunge|Zungen|язык (орган)",
    "das Gehirn|Gehirne|мозг", "blond||светловолосый", "lockig||кудрявый", "glatt||гладкий; прямой (о волосах)", "schlank||стройный", "attraktiv||привлекательный"] },
  { id: "a21-p9", t: "Спорт", w: [
    "der Sportler|Sportler|спортсмен", "die Mannschaft|Mannschaften|команда (спорт)", "das Tor|Tore|ворота; гол", "der Sieg|Siege|победа",
    "die Niederlage|Niederlagen|поражение", "das Training|Trainings|тренировка", "der Trainer|Trainer|тренер", "das Fitnessstudio|Fitnessstudios|фитнес-клуб",
    "der Ball|Bälle|мяч", "der Wettkampf|Wettkämpfe|соревнование", "die Meisterschaft|Meisterschaften|чемпионат", "trainieren||тренироваться",
    "Rad fahren||кататься на велосипеде", "Ski fahren||кататься на лыжах", "klettern|ist geklettert|лазать", "segeln||ходить под парусом", "sportlich||спортивный"] },
  { id: "a21-p10", t: "Вкусы и питание", w: [
    "das Vollkornbrot|Vollkornbrote|цельнозерновой хлеб", "die Kalorie|Kalorien|калория", "das Fett|Fette|жир", "das Vitamin|Vitamine|витамин",
    "das Lebensmittel|Lebensmittel|продукт питания", "die Mahlzeit|Mahlzeiten|приём пищи", "der Snack|Snacks|перекус", "der Geschmack|-|вкус",
    "ungesund||вредный для здоровья", "fett||жирный", "mager||нежирный, постный", "bitter||горький", "sauer||кислый; сердитый", "roh||сырой",
    "gekocht||варёный", "gebraten||жареный", "zubereiten|er bereitet zu|готовить (блюдо)"] },
  { id: "a21-p11", t: "Город и службы", w: [
    "die Werkstatt|Werkstätten|мастерская", "die Reinigung|Reinigungen|химчистка; уборка", "der Kiosk|Kioske|киоск", "die Sparkasse|Sparkassen|сберкасса",
    "der Geldautomat|Geldautomaten|банкомат", "die Feuerwehr|Feuerwehren|пожарная служба", "der Krankenwagen|Krankenwagen|скорая помощь",
    "das Schild|Schilder|табличка, знак", "der Eingang|Eingänge|вход", "der Ausgang|Ausgänge|выход", "die Innenstadt|Innenstädte|центр города",
    "die Fußgängerzone|Fußgängerzonen|пешеходная зона", "der Zebrastreifen|Zebrastreifen|пешеходный переход", "der Bürgersteig|Bürgersteige|тротуар",
    "abbiegen|er biegt ab, ist abgebogen|поворачивать", "überqueren||переходить (улицу)"] },
  { id: "a21-p12", t: "Глаголы A2.1", w: [
    "anbieten|er bietet an|предлагать", "annehmen|er nimmt an|принимать; предполагать", "ausmachen|er macht aus|выключать; договариваться",
    "bedeuten||означать", "behalten|er behält|оставлять себе", "brennen|hat gebrannt|гореть", "dauern||длиться", "drücken||нажимать",
    "ziehen|hat gezogen|тянуть", "einpacken|er packt ein|упаковывать", "fallen|er fällt, ist gefallen|падать", "füllen||наполнять",
    "halten|er hält|держать; останавливаться", "klingeln||звонить (в дверь)", "merken||замечать; запоминать", "rennen|ist gerannt|бежать",
    "springen|ist gesprungen|прыгать", "stecken||вставлять; находиться", "werfen|er wirft|бросать", "wecken||будить"] }
]);

window.dwAddPacks("A2.2", [
  { id: "a22-p8", t: "Работа и документы", w: [
    "die Stellenanzeige|Stellenanzeigen|объявление о вакансии", "das Jobcenter|Jobcenter|центр занятости", "die Krankenversicherung|Krankenversicherungen|медицинская страховка",
    "die Aushilfe|Aushilfen|временный помощник", "der Minijob|Minijobs|мини-работа", "das Anschreiben|Anschreiben|сопроводительное письмо",
    "die Unterlagen|Pl|документы", "sich melden||связаться; откликнуться", "jobben||подрабатывать", "brutto||брутто", "netto||нетто",
    "befristet||срочный (договор)", "unbefristet||бессрочный"] },
  { id: "a22-p9", t: "Банк", w: [
    "die Überweisung|Überweisungen|денежный перевод", "der Betrag|Beträge|сумма", "die Geheimzahl|Geheimzahlen|ПИН-код", "die Kreditkarte|Kreditkarten|кредитная карта",
    "die Mahnung|Mahnungen|напоминание об оплате", "die Währung|Währungen|валюта", "die Summe|Summen|сумма", "der Dauerauftrag|Daueraufträge|регулярный платёж",
    "abheben|er hebt ab|снимать (деньги)", "einzahlen|er zahlt ein|вносить (деньги)", "wechseln||менять, обменивать", "monatlich||ежемесячно", "jährlich||ежегодно"] },
  { id: "a22-p10", t: "Общение и эмоции", w: [
    "die Laune|Launen|настроение", "die Lust|-|желание, охота", "die Sehnsucht|Sehnsüchte|тоска", "der Kummer|-|горе", "der Witz|Witze|шутка",
    "das Kompliment|Komplimente|комплимент", "die Bitte|Bitten|просьба", "der Rat|Ratschläge|совет", "die Ausrede|Ausreden|отговорка", "das Gespräch|Gespräche|разговор",
    "lächeln||улыбаться", "schreien|hat geschrien|кричать", "flüstern||шептать", "loben||хвалить", "beleidigen||обижать", "trösten||утешать",
    "verzeihen|hat verziehen|прощать", "sich verabschieden||прощаться", "begrüßen||приветствовать", "überzeugt||убеждённый", "beleidigt||обиженный", "ärgerlich||досадный; сердитый"] },
  { id: "a22-p11", t: "Отдых и туризм", w: [
    "die Pension|Pensionen|пансион; пенсия", "die Jugendherberge|Jugendherbergen|молодёжный хостел", "der Campingplatz|Campingplätze|кемпинг", "das Zelt|Zelte|палатка",
    "die Halbpension|-|полупансион", "die Vollpension|-|полный пансион", "der Reiseführer|Reiseführer|путеводитель; гид", "die Stadtführung|Stadtführungen|экскурсия по городу",
    "die Postkarte|Postkarten|открытка", "das Souvenir|Souvenirs|сувенир", "der Stadtplan|Stadtpläne|карта города", "die Wanderung|Wanderungen|поход",
    "die Fähre|Fähren|паром", "das Schiff|Schiffe|корабль", "das Flugzeug|Flugzeuge|самолёт", "die Kreuzfahrt|Kreuzfahrten|круиз",
    "sich verlaufen|er verläuft sich|заблудиться", "sich sonnen||загорать", "erkunden||исследовать (место)", "ausgebucht||всё забронировано"] },
  { id: "a22-p12", t: "Глаголы A2.2", w: [
    "abschließen|er schließt ab|запирать; завершать", "anfassen|er fasst an|трогать", "beenden||заканчивать", "begleiten||сопровождать",
    "besorgen||доставать, покупать", "bitten|hat gebeten|просить", "erkennen|hat erkannt|узнавать", "fühlen||чувствовать", "klappen||получаться",
    "lösen||решать (задачу)", "nennen|hat genannt|называть", "raten|er rät|советовать; угадывать", "reichen||хватать, быть достаточным",
    "retten||спасать", "stören||мешать", "tun|hat getan|делать", "verbinden|hat verbunden|соединять", "zurückrufen|er ruft zurück|перезванивать",
    "zuhören|er hört zu|слушать (внимательно)"] }
]);
