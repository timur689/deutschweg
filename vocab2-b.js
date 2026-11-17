/* Дополнительные наборы B1: доводят словарь до объёма списка Goethe B1. */
window.DE_PACKS = window.DE_PACKS || {};
window.dwAddPacks = window.dwAddPacks || ((level, packs) => { window.DE_PACKS[level] = (window.DE_PACKS[level] || []).concat(packs); });

window.dwAddPacks("B1.1", [
  { id: "b11-p8", t: "Офис и переписка", w: [
    "die Konferenz|Konferenzen|конференция", "die Präsentation|Präsentationen|презентация", "das Protokoll|Protokolle|протокол",
    "die Tagesordnung|Tagesordnungen|повестка дня", "der Auftrag|Aufträge|заказ, поручение", "die Frist|Fristen|срок", "der Bericht|Berichte|отчёт; репортаж",
    "die Anfrage|Anfragen|запрос", "die Bestätigung|Bestätigungen|подтверждение", "die Beschwerde|Beschwerden|жалоба", "der Ansprechpartner|Ansprechpartner|контактное лицо",
    "die Rückmeldung|Rückmeldungen|обратная связь", "der Anhang|Anhänge|вложение (в письме)", "der Betreff|Betreffe|тема письма", "die Abwesenheit|Abwesenheiten|отсутствие",
    "die Vertretung|Vertretungen|замещение; представительство", "weiterleiten|er leitet weiter|пересылать", "zusammenfassen|er fasst zusammen|подводить итог",
    "ausrichten|er richtet aus|передавать (сообщение)", "vereinbaren||договариваться", "dringend||срочный", "vertraulich||конфиденциальный", "beruflich||по работе"] },
  { id: "b11-p9", t: "Образование", w: [
    "die Bildung|-|образование", "das Gymnasium|Gymnasien|гимназия", "die Grundschule|Grundschulen|начальная школа", "die Hochschule|Hochschulen|вуз",
    "der Studiengang|Studiengänge|учебная программа", "die Vorlesung|Vorlesungen|лекция", "das Seminar|Seminare|семинар", "die Hausarbeit|Hausarbeiten|курсовая работа",
    "die Abschlussarbeit|Abschlussarbeiten|выпускная работа", "das Stipendium|Stipendien|стипендия", "der Professor|Professoren|профессор",
    "die Lehre|Lehren|обучение ремеслу; учение", "der Azubi|Azubis|ученик на профобучении", "die Kita|Kitas|детский сад (ясли)", "der Kindergarten|Kindergärten|детский сад",
    "die Schulpflicht|-|обязательное школьное обучение", "die Fortbildung|Fortbildungen|курсы повышения квалификации", "das Wissen|-|знания",
    "bewerten||оценивать", "begabt||одарённый", "theoretisch||теоретический", "praktisch||практичный, практический"] },
  { id: "b11-p10", t: "Жильё и ремонт", w: [
    "der Mietvertrag|Mietverträge|договор аренды", "die Wohngemeinschaft|Wohngemeinschaften|совместное жильё", "das Eigentum|-|собственность",
    "der Eigentümer|Eigentümer|владелец", "die Eigentumswohnung|Eigentumswohnungen|квартира в собственности", "der Neubau|Neubauten|новостройка",
    "der Altbau|Altbauten|старый дом", "die Renovierung|Renovierungen|ремонт", "der Schaden|Schäden|ущерб, повреждение", "die Ruhezeit|Ruhezeiten|время тишины",
    "der Handwerker|Handwerker|мастер, ремесленник", "der Umzugskarton|Umzugskartons|коробка для переезда", "die Wohnungssuche|-|поиск квартиры",
    "die Nachbarschaft|Nachbarschaften|соседство, соседи", "vermieten||сдавать в аренду", "einrichten|er richtet ein|обставлять", "streichen|hat gestrichen|красить; вычёркивать",
    "tapezieren||клеить обои", "beschädigen||повреждать", "sanieren||реконструировать", "geräumig||просторный", "inklusive||включительно"] },
  { id: "b11-p11", t: "Семья и отношения", w: [
    "die Partnerschaft|Partnerschaften|партнёрство", "die Erziehung|-|воспитание", "die Kinderbetreuung|-|присмотр за детьми", "die Elternzeit|-|отпуск по уходу за ребёнком",
    "die Schwangerschaft|Schwangerschaften|беременность", "die Geburt|Geburten|рождение, роды", "der Konflikt|Konflikte|конфликт", "die Rücksicht|-|внимание к другим",
    "die Toleranz|-|терпимость", "das Verhältnis|Verhältnisse|отношения; соотношение", "die Freundschaft|Freundschaften|дружба", "die Treue|-|верность",
    "die Gewalt|-|насилие; власть", "der Abschied|Abschiede|прощание", "die Trauer|-|скорбь", "erziehen|hat erzogen|воспитывать", "betreuen||присматривать, опекать",
    "sich verloben||обручиться", "sich scheiden lassen||разводиться", "vertrauen||доверять", "streng||строгий", "tolerant||терпимый", "treu||верный", "gemeinsam||совместный, общий"] },
  { id: "b11-p12", t: "Заказы и претензии", w: [
    "die Qualität|Qualitäten|качество", "die Garantie|Garantien|гарантия", "die Reklamation|Reklamationen|претензия", "der Umtausch|-|обмен (товара)",
    "die Lieferung|Lieferungen|доставка", "der Versand|-|отправка", "die Bestellung|Bestellungen|заказ", "die Rücksendung|Rücksendungen|возврат (посылки)",
    "der Händler|Händler|торговец", "das Schnäppchen|Schnäppchen|выгодная покупка", "die Ware|Waren|товар", "die Bewertung|Bewertungen|отзыв, оценка",
    "liefern||доставлять", "reklamieren||предъявлять претензию", "zurückschicken|er schickt zurück|отправлять обратно", "sich lohnen||окупаться, стоить того",
    "beschädigt||повреждённый", "defekt||неисправный", "hochwertig||высококачественный", "überflüssig||лишний", "nützlich||полезный"] },
  { id: "b11-p13", t: "Погода и ландшафт", w: [
    "die Jahreszeit|Jahreszeiten|время года", "die Wettervorhersage|Wettervorhersagen|прогноз погоды", "der Nebel|Nebel|туман", "das Glatteis|-|гололёд",
    "der Sturm|Stürme|буря, шторм", "der Hagel|-|град", "der Blitz|Blitze|молния", "der Donner|Donner|гром", "die Hitze|-|жара", "die Kälte|-|холод",
    "die Feuchtigkeit|-|влажность", "der Schatten|Schatten|тень", "die Küste|Küsten|побережье", "das Tal|Täler|долина", "der Gipfel|Gipfel|вершина",
    "das Gebirge|Gebirge|горы, горный массив", "die Wüste|Wüsten|пустыня", "der Ozean|Ozeane|океан", "neblig||туманный", "bewölkt||облачный",
    "frieren|hat gefroren|мёрзнуть; замерзать", "schmelzen|er schmilzt, ist geschmolzen|таять", "mild||мягкий"] },
  { id: "b11-p14", t: "Здоровый образ жизни", w: [
    "die Fitness|-|фитнес", "die Vorsorge|-|профилактика", "die Impfung|Impfungen|прививка", "der Blutdruck|-|кровяное давление", "das Übergewicht|-|лишний вес",
    "die Sucht|Süchte|зависимость", "der Alkohol|-|алкоголь", "die Zigarette|Zigaretten|сигарета", "die Entspannung|-|расслабление", "der Schlaf|-|сон",
    "die Erholung|-|отдых, восстановление", "das Wohlbefinden|-|хорошее самочувствие", "die Therapie|Therapien|терапия", "der Psychologe|Psychologen|психолог",
    "sich entspannen||расслабляться", "sich ernähren||питаться", "schaden||вредить", "regelmäßig||регулярный", "körperlich||физический",
    "seelisch||душевный", "ausgewogen||сбалансированный"] },
  { id: "b11-p15", t: "Гаджеты и интернет", w: [
    "das Smartphone|Smartphones|смартфон", "das Tablet|Tablets|планшет", "der Laptop|Laptops|ноутбук", "das Update|Updates|обновление",
    "das Benutzerkonto|Benutzerkonten|учётная запись", "der Benutzername|Benutzernamen|имя пользователя", "die Einstellung|Einstellungen|настройка; отношение",
    "der Speicher|Speicher|память (устройства)", "das WLAN|-|Wi-Fi", "das Netzwerk|Netzwerke|сеть", "die Suchmaschine|Suchmaschinen|поисковая система",
    "der Beitrag|Beiträge|публикация; взнос", "der Kommentar|Kommentare|комментарий", "sich einloggen|er loggt sich ein|входить в аккаунт",
    "hochladen|er lädt hoch|загружать (в сеть)", "googeln||гуглить", "kostenpflichtig||платный", "drahtlos||беспроводной", "erreichbar||доступный, на связи"] },
  { id: "b11-p16", t: "Законы и правила", w: [
    "die Vorschrift|Vorschriften|предписание", "das Verbot|Verbote|запрет", "die Erlaubnis|Erlaubnisse|разрешение", "die Genehmigung|Genehmigungen|официальное разрешение",
    "der Anwalt|Anwälte|адвокат", "der Richter|Richter|судья", "das Urteil|Urteile|приговор, решение суда", "die Klage|Klagen|иск; жалоба",
    "der Zeuge|Zeugen|свидетель", "der Täter|Täter|преступник", "das Opfer|Opfer|жертва", "der Diebstahl|Diebstähle|кража",
    "stehlen|er stiehlt, hat gestohlen|красть", "verhaften||арестовывать", "anzeigen|er zeigt an|заявлять (в полицию)", "klagen||подавать в суд; жаловаться",
    "beachten||соблюдать, учитывать", "einhalten|er hält ein|соблюдать (сроки, правила)", "erlaubt||разрешено", "verboten||запрещено", "illegal||незаконный", "legal||законный"] },
  { id: "b11-p17", t: "Прилагательные B1", w: [
    "abhängig||зависимый", "unabhängig||независимый", "angenehm||приятный", "unangenehm||неприятный", "ausreichend||достаточный", "bedeutend||значительный",
    "deutlich||отчётливый", "eindeutig||однозначный", "entscheidend||решающий", "erforderlich||требуемый", "gewöhnlich||обычный", "gründlich||основательный",
    "heimlich||тайный", "intensiv||интенсивный", "kompliziert||сложный", "merkwürdig||странный", "nötig||нужный", "offen||открытый; откровенный",
    "peinlich||неловкий", "selbstverständlich||само собой разумеется", "sinnvoll||разумный, осмысленный", "umständlich||громоздкий, неудобный",
    "vorsichtig||осторожный", "wesentlich||существенный", "zufällig||случайный"] },
  { id: "b11-p18", t: "Наречия B1", w: [
    "allmählich||постепенно", "ausschließlich||исключительно", "bereits||уже", "derzeit||в настоящее время", "ebenso||так же", "eher||скорее",
    "gelegentlich||при случае, иногда", "häufig||часто", "immerhin||всё-таки", "insgesamt||в целом", "keineswegs||ни в коем случае",
    "mittlerweile||тем временем; уже", "möglicherweise||возможно", "nachher||потом", "neulich||недавно", "ohnehin||и так", "sowieso||всё равно",
    "stattdessen||вместо этого", "tatsächlich||действительно", "ungefähr||примерно", "unbedingt||обязательно", "zumindest||по крайней мере", "zunächst||сначала"] },
  { id: "b11-p19", t: "Глаголы B1.1", w: [
    "achten||обращать внимание; уважать", "ahnen||догадываться", "anpassen|er passt an|приспосабливать", "ausdrücken|er drückt aus|выражать",
    "auswählen|er wählt aus|выбирать", "bedauern||сожалеть", "beraten|er berät|консультировать", "beschließen|hat beschlossen|постановлять, решать",
    "bestimmen||определять", "betrachten||рассматривать", "beurteilen||оценивать, судить", "einführen|er führt ein|вводить", "erwähnen||упоминать",
    "festlegen|er legt fest|устанавливать", "gestalten||оформлять, создавать", "herausfinden|er findet heraus|выяснять", "hinweisen|er weist hin|указывать",
    "nachdenken|er denkt nach|размышлять", "überlegen||обдумывать", "überraschen||удивлять", "umgehen|er geht um, ist umgegangen|обращаться (с чем-то)",
    "unterbrechen|er unterbricht|прерывать", "vermitteln||передавать; посредничать", "zugeben|er gibt zu|признавать", "zusammenarbeiten|er arbeitet zusammen|сотрудничать"] }
]);

window.dwAddPacks("B1.2", [
  { id: "b12-p8", t: "Общество", w: [
    "die Migration|-|миграция", "die Herkunft|Herkünfte|происхождение", "die Vielfalt|-|многообразие", "die Gleichheit|-|равенство",
    "die Diskriminierung|Diskriminierungen|дискриминация", "der Rassismus|-|расизм", "die Benachteiligung|Benachteiligungen|ущемление",
    "die Chancengleichheit|-|равенство возможностей", "das Ehrenamt|Ehrenämter|волонтёрская работа", "die Spende|Spenden|пожертвование",
    "die Organisation|Organisationen|организация", "die Obdachlosigkeit|-|бездомность", "der Wohlstand|-|благосостояние", "die Altersarmut|-|бедность в старости",
    "der Senior|Senioren|пожилой человек", "spenden||жертвовать", "sich engagieren||проявлять активность", "benachteiligen||ущемлять",
    "integrieren||интегрировать", "ehrenamtlich||на общественных началах", "multikulturell||мультикультурный", "gesellschaftlich||общественный"] },
  { id: "b12-p9", t: "СМИ и мнения", w: [
    "die Medien|Pl|СМИ", "die Reportage|Reportagen|репортаж", "das Interview|Interviews|интервью", "die Kolumne|Kolumnen|колонка (в газете)",
    "der Leserbrief|Leserbriefe|письмо читателя", "die Zensur|-|цензура", "die Fake News|Pl|фейковые новости", "die Glaubwürdigkeit|-|достоверность",
    "die Meinungsbildung|-|формирование мнения", "der Influencer|Influencer|инфлюенсер", "die Reichweite|Reichweiten|охват", "die Plattform|Plattformen|платформа",
    "verbreiten||распространять", "manipulieren||манипулировать", "kritisieren||критиковать", "kommentieren||комментировать",
    "glaubwürdig||достоверный", "objektiv||объективный", "subjektiv||субъективный", "einseitig||односторонний"] },
  { id: "b12-p10", t: "Работа будущего", w: [
    "die Arbeitswelt|-|мир труда", "das Homeoffice|-|удалённая работа", "die Flexibilität|-|гибкость", "die Gleitzeit|-|скользящий график",
    "die Automatisierung|-|автоматизация", "der Fachkräftemangel|-|нехватка специалистов", "die Fachkraft|Fachkräfte|специалист", "die Gewerkschaft|Gewerkschaften|профсоюз",
    "der Streik|Streiks|забастовка", "der Mindestlohn|Mindestlöhne|минимальная зарплата", "die Existenz|Existenzen|существование; средства к жизни",
    "die Gründung|Gründungen|основание (фирмы)", "das Start-up|Start-ups|стартап", "die Belastung|Belastungen|нагрузка", "streiken||бастовать",
    "gründen||основывать", "delegieren||делегировать", "geistig||умственный", "monoton||монотонный", "abwechslungsreich||разнообразный"] },
  { id: "b12-p11", t: "Медицина и наука", w: [
    "die Medizin|-|медицина", "die Nebenwirkung|Nebenwirkungen|побочное действие", "der Wirkstoff|Wirkstoffe|действующее вещество", "die Diagnose|Diagnosen|диагноз",
    "die Behandlung|Behandlungen|лечение", "die Heilung|Heilungen|излечение", "die Prävention|-|профилактика", "der Krebs|-|рак (болезнь)",
    "die Infektion|Infektionen|инфекция", "die Pandemie|Pandemien|пандемия", "das Immunsystem|Immunsysteme|иммунная система", "die Gentechnik|-|генная инженерия",
    "heilen||лечить, исцелять", "vorbeugen|er beugt vor|предупреждать (болезнь)", "diagnostizieren||ставить диагноз", "chronisch||хронический",
    "akut||острый (о болезни)", "medizinisch||медицинский", "psychisch||психический"] },
  { id: "b12-p12", t: "Энергия и транспорт", w: [
    "die Energiewende|-|энергетический переход", "die Windkraft|-|энергия ветра", "die Kernkraft|-|атомная энергия", "die Elektromobilität|-|электромобильность",
    "das Elektroauto|Elektroautos|электромобиль", "die Ladestation|Ladestationen|зарядная станция", "das Carsharing|-|каршеринг", "der Ausstoß|-|выброс",
    "das Kohlendioxid|-|углекислый газ", "die Emission|Emissionen|выброс (веществ)", "die Infrastruktur|Infrastrukturen|инфраструктура", "die Effizienz|-|эффективность",
    "die Batterie|Batterien|батарея", "der Rohstoff|Rohstoffe|сырьё", "das Erdöl|-|нефть", "das Gas|Gase|газ", "die Kohle|Kohlen|уголь",
    "ausbauen|er baut aus|расширять", "einsparen|er spart ein|экономить", "effizient||эффективный", "klimaneutral||климатически нейтральный"] },
  { id: "b12-p13", t: "История", w: [
    "das Jahrhundert|Jahrhunderte|век", "das Jahrzehnt|Jahrzehnte|десятилетие", "die Epoche|Epochen|эпоха", "der Krieg|Kriege|война", "der Frieden|-|мир (не война)",
    "die Mauer|Mauern|стена", "die Wiedervereinigung|-|воссоединение", "die Teilung|Teilungen|разделение", "die Diktatur|Diktaturen|диктатура",
    "die Revolution|Revolutionen|революция", "das Denkmal|Denkmäler|памятник", "die Gedenkstätte|Gedenkstätten|мемориал", "der Zeitzeuge|Zeitzeugen|очевидец",
    "der König|Könige|король", "die Herrschaft|Herrschaften|господство, власть", "erobern||завоёвывать", "befreien||освобождать", "zerstören||разрушать",
    "erinnern||напоминать", "historisch||исторический", "ehemalig||бывший", "mittelalterlich||средневековый"] },
  { id: "b12-p14", t: "Черты характера", w: [
    "die Gelassenheit|-|невозмутимость", "die Geduld|-|терпение", "die Ungeduld|-|нетерпение", "die Neugier|-|любопытство", "der Ehrgeiz|-|честолюбие",
    "die Eifersucht|-|ревность", "der Neid|-|зависть", "die Scham|-|стыд", "die Zuversicht|-|уверенность в хорошем", "die Verzweiflung|-|отчаяние",
    "die Begeisterung|-|воодушевление", "das Selbstbewusstsein|-|уверенность в себе", "die Höflichkeit|-|вежливость", "die Zuverlässigkeit|-|надёжность",
    "ehrgeizig||честолюбивый", "gelassen||невозмутимый", "zuversichtlich||уверенный в хорошем исходе", "verzweifelt||отчаявшийся", "selbstbewusst||уверенный в себе",
    "empfindlich||чувствительный", "rücksichtsvoll||внимательный к другим", "egoistisch||эгоистичный", "großzügig||щедрый", "geizig||скупой"] },
  { id: "b12-p15", t: "Глаголы B1.2: процессы", w: [
    "abhängen|er hängt ab|зависеть", "ankündigen|er kündigt an|объявлять", "auffallen|er fällt auf, ist aufgefallen|бросаться в глаза",
    "aufgeben|er gibt auf|сдаваться; отправлять", "auslösen|er löst aus|вызывать, запускать", "durchführen|er führt durch|проводить",
    "eingehen|er geht ein, ist eingegangen|поступать; вникать", "entstehen|ist entstanden|возникать", "erfüllen||выполнять (условие, желание)",
    "ergreifen|hat ergriffen|хватать; принимать (меры)", "erleichtern||облегчать", "erwerben|er erwirbt|приобретать", "feststellen|er stellt fest|констатировать",
    "hervorheben|er hebt hervor|выделять, подчёркивать", "nachweisen|er weist nach|доказывать", "übernehmen|er übernimmt|брать на себя",
    "umsetzen|er setzt um|реализовывать", "voraussetzen|er setzt voraus|предполагать (как условие)", "vorkommen|er kommt vor, ist vorgekommen|встречаться, случаться",
    "wahrnehmen|er nimmt wahr|воспринимать", "zurückführen|er führt zurück|сводить (к причине)"] },
  { id: "b12-p16", t: "Глаголы B1.2: изменения", w: [
    "bewirken||вызывать, добиваться", "beziehen|hat bezogen|получать; относить", "einschränken|er schränkt ein|ограничивать", "empfinden|hat empfunden|ощущать",
    "entsprechen|er entspricht|соответствовать", "erhöhen||повышать", "ersparen||избавлять; экономить", "existieren||существовать", "folgen|ist gefolgt|следовать",
    "gewährleisten||гарантировать", "leiden|hat gelitten|страдать", "nutzen||использовать", "profitieren||извлекать выгоду", "schätzen||ценить; оценивать",
    "senken||снижать", "steigern||повышать, увеличивать", "überwinden|hat überwunden|преодолевать", "unternehmen|er unternimmt|предпринимать",
    "verlangen||требовать", "verringern||уменьшать", "verwenden||использовать", "zwingen|hat gezwungen|заставлять"] },
  { id: "b12-p17", t: "Понятия для текстов", w: [
    "der Ablauf|Abläufe|ход, порядок", "der Anspruch|Ansprüche|притязание; требование", "der Aufwand|-|затраты, усилия", "der Ausdruck|Ausdrücke|выражение",
    "die Auswirkung|Auswirkungen|последствие, влияние", "der Bedarf|-|потребность", "der Begriff|Begriffe|понятие", "die Bereitschaft|-|готовность",
    "der Bereich|Bereiche|область, сфера", "die Grundlage|Grundlagen|основа", "das Interesse|Interessen|интерес", "der Kontakt|Kontakte|контакт",
    "das Merkmal|Merkmale|признак", "das Niveau|Niveaus|уровень", "der Rahmen|Rahmen|рамка, рамки", "die Richtung|Richtungen|направление",
    "der Schwerpunkt|Schwerpunkte|основной акцент", "die Umstellung|Umstellungen|переход, перестройка", "die Wahrscheinlichkeit|Wahrscheinlichkeiten|вероятность",
    "der Wert|Werte|ценность; значение", "der Zugang|Zugänge|доступ"] },
  { id: "b12-p18", t: "Слова для письма и экзамена", w: [
    "die Stellungnahme|Stellungnahmen|изложение позиции", "die Einleitung|Einleitungen|введение", "der Schluss|Schlüsse|заключение; вывод",
    "die Zusammenfassung|Zusammenfassungen|краткое изложение", "die Anrede|Anreden|обращение (в письме)", "der Gruß|Grüße|привет, приветствие",
    "das Anliegen|Anliegen|просьба, дело", "die Aussage|Aussagen|высказывание", "die Behauptung|Behauptungen|утверждение", "die Schlussfolgerung|Schlussfolgerungen|вывод",
    "folglich||следовательно", "letztendlich||в конечном счёте", "zusammenfassend||подводя итог", "abschließend||в заключение", "beziehungsweise||или; соответственно",
    "hingegen||напротив", "insbesondere||в особенности", "somit||таким образом", "vielmehr||скорее, напротив", "zudem||кроме того",
    "infolgedessen||вследствие этого", "anschließend||затем", "bezüglich||относительно"] },
  { id: "b12-p19", t: "Мир и путешествия", w: [
    "die Globalisierung|-|глобализация", "der Tourismus|-|туризм", "das Reiseziel|Reiseziele|цель поездки", "die Fernreise|Fernreisen|дальняя поездка",
    "der Massentourismus|-|массовый туризм", "die Gastfreundschaft|-|гостеприимство", "der Austausch|-|обмен", "das Abenteuer|Abenteuer|приключение",
    "das Heimweh|-|тоска по дому", "das Fernweh|-|тяга к путешествиям", "der Auslandsaufenthalt|Auslandsaufenthalte|пребывание за границей",
    "die Einreise|Einreisen|въезд", "die Ausreise|Ausreisen|выезд", "der Zoll|Zölle|таможня; пошлина", "auswandern|er wandert aus, ist ausgewandert|эмигрировать",
    "einwandern|er wandert ein, ist eingewandert|иммигрировать", "sich zurechtfinden|er findet sich zurecht|ориентироваться", "weltweit||по всему миру",
    "exotisch||экзотический", "abenteuerlich||полный приключений"] }
]);
