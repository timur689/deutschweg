/* Уровень A1: A1.1 и A1.2.
   Слово: "немецкий|мн.ч. или формы|перевод". "-" = нет мн. ч., "Pl" = только мн. ч.
   Предложение: ["немецкий", "перевод"]. Тест правила: [вопрос, варианты, индекс верного]. */
window.DE_LEVELS = window.DE_LEVELS || [];

window.DE_LEVELS.push({
  id: "A1.1",
  title: "Первые шаги",
  desc: "Знакомство, семья, числа, еда, жильё. Порядок слов, артикли, отрицание.",
  units: [
    {
      id: "a11-u1", t: "Hallo! Знакомство",
      w: ["der Name|Namen|имя", "die Frau|Frauen|женщина; жена; госпожа", "der Mann|Männer|мужчина; муж", "das Kind|Kinder|ребёнок", "der Freund|Freunde|друг", "die Freundin|Freundinnen|подруга", "das Land|Länder|страна", "die Stadt|Städte|город", "die Sprache|Sprachen|язык", "heißen|er heißt|зваться", "kommen||приходить; быть родом", "wohnen||жить, проживать", "sprechen|er spricht|говорить", "sein|er ist|быть", "woher||откуда", "wo||где", "wie||как"],
      r: ["a11-pron-sein", "a11-praesens", "a11-artikel"],
      s: [["Ich heiße Anna.", "Меня зовут Анна."], ["Woher kommst du?", "Откуда ты?"], ["Ich komme aus der Ukraine.", "Я из Украины."], ["Wo wohnen Sie?", "Где вы живёте?"], ["Er spricht Deutsch und Englisch.", "Он говорит по-немецки и по-английски."], ["Wir sind Freunde.", "Мы друзья."]]
    },
    {
      id: "a11-u2", t: "Die Familie · Семья",
      w: ["die Familie|Familien|семья", "die Mutter|Mütter|мать", "der Vater|Väter|отец", "die Eltern|Pl|родители", "die Geschwister|Pl|братья и сёстры", "der Bruder|Brüder|брат", "die Schwester|Schwestern|сестра", "der Sohn|Söhne|сын", "die Tochter|Töchter|дочь", "die Oma|Omas|бабушка", "der Opa|Opas|дедушка", "das Baby|Babys|младенец", "das Jahr|Jahre|год", "haben|er hat|иметь", "alt||старый", "jung||молодой", "verheiratet||женат, замужем"],
      r: ["a11-haben", "a11-possessiv", "a11-w-fragen"],
      s: [["Das ist meine Mutter.", "Это моя мама."], ["Ich habe einen Bruder.", "У меня есть брат."], ["Mein Vater ist 50 Jahre alt.", "Моему отцу 50 лет."], ["Hast du Geschwister?", "У тебя есть братья или сёстры?"], ["Meine Schwester ist verheiratet.", "Моя сестра замужем."], ["Wie alt ist dein Sohn?", "Сколько лет твоему сыну?"]]
    },
    {
      id: "a11-u3", t: "Zahlen und Zeit · Числа и время",
      w: ["die Zahl|Zahlen|число", "die Uhr|Uhren|часы", "die Stunde|Stunden|час (60 минут)", "die Minute|Minuten|минута", "die Zeit|Zeiten|время", "der Tag|Tage|день", "die Woche|Wochen|неделя", "der Monat|Monate|месяц", "der Montag|Montage|понедельник", "das Wochenende|Wochenenden|выходные", "heute||сегодня", "morgen||завтра", "jetzt||сейчас", "früh||рано", "spät||поздно", "lernen||учить, учиться"],
      r: ["a11-zahlen", "a11-wortstellung"],
      s: [["Wie spät ist es?", "Который час?"], ["Es ist drei Uhr.", "Сейчас три часа."], ["Heute ist Montag.", "Сегодня понедельник."], ["Morgen habe ich keine Zeit.", "Завтра у меня нет времени.", ["Ich habe morgen keine Zeit."]], ["Am Wochenende bin ich zu Hause.", "На выходных я дома.", ["Ich bin am Wochenende zu Hause."]], ["Wir lernen jetzt Deutsch.", "Сейчас мы учим немецкий.", ["Jetzt lernen wir Deutsch."]]]
    },
    {
      id: "a11-u4", t: "Essen und Trinken · Еда",
      w: ["das Brot|Brote|хлеб", "das Wasser|-|вода", "der Kaffee|Kaffees|кофе", "der Tee|Tees|чай", "die Milch|-|молоко", "der Apfel|Äpfel|яблоко", "das Ei|Eier|яйцо", "der Käse|-|сыр", "die Wurst|Würste|колбаса", "das Fleisch|-|мясо", "der Fisch|Fische|рыба", "das Frühstück|Frühstücke|завтрак", "essen|er isst|есть, кушать", "trinken||пить", "möchten|er möchte|хотел бы", "kaufen||покупать", "gern||охотно, с удовольствием", "frisch||свежий"],
      r: ["a11-akkusativ", "a11-negation"],
      s: [["Ich trinke gern Kaffee.", "Я люблю пить кофе.", ["Kaffee trinke ich gern."]], ["Möchtest du einen Apfel?", "Хочешь яблоко?"], ["Ich esse kein Fleisch.", "Я не ем мясо."], ["Das Brot ist frisch.", "Хлеб свежий."], ["Wir kaufen Milch und Eier.", "Мы покупаем молоко и яйца.", ["Wir kaufen Eier und Milch."]], ["Zum Frühstück esse ich ein Ei.", "На завтрак я ем яйцо.", ["Ich esse zum Frühstück ein Ei."]]]
    },
    {
      id: "a11-u5", t: "Die Wohnung · Жильё",
      w: ["das Haus|Häuser|дом", "die Wohnung|Wohnungen|квартира", "das Zimmer|Zimmer|комната", "die Küche|Küchen|кухня", "das Bad|Bäder|ванная", "der Tisch|Tische|стол", "der Stuhl|Stühle|стул", "das Bett|Betten|кровать", "das Sofa|Sofas|диван", "die Lampe|Lampen|лампа", "der Schrank|Schränke|шкаф", "groß||большой", "klein||маленький", "schön||красивый", "neu||новый"],
      r: ["a11-plural"],
      s: [["Die Wohnung ist klein, aber schön.", "Квартира маленькая, но красивая."], ["Das Zimmer hat ein Bett und einen Schrank.", "В комнате есть кровать и шкаф.", ["Das Zimmer hat einen Schrank und ein Bett."]], ["Wo ist die Küche?", "Где кухня?"], ["Die Stühle sind neu.", "Стулья новые."], ["Wir haben zwei Zimmer.", "У нас две комнаты."]]
    }
  ],
  rules: [
    {
      id: "a11-pron-sein", t: "Личные местоимения и глагол sein",
      b: `<p><b>sein</b> (быть) — главный неправильный глагол. В немецком его нельзя пропускать, как в русском: «Я студент» = <i>Ich <b>bin</b> Student</i>.</p>
<table><tr><th>Местоимение</th><th>sein</th></tr>
<tr><td>ich — я</td><td>bin</td></tr><tr><td>du — ты</td><td>bist</td></tr><tr><td>er / sie / es — он / она / оно</td><td>ist</td></tr>
<tr><td>wir — мы</td><td>sind</td></tr><tr><td>ihr — вы (группа друзей)</td><td>seid</td></tr><tr><td>sie / Sie — они / Вы (вежливо)</td><td>sind</td></tr></table>
<p><b>Sie</b> с большой буквы — вежливое «Вы» к одному или нескольким людям. <b>sie</b> с маленькой — «она» или «они»; различаем по глаголу: <i>sie ist</i> (она), <i>sie sind</i> (они).</p>`,
      q: [["Ich ___ Student.", ["bin", "bist", "ist"], 0], ["Wir ___ aus Polen.", ["seid", "sind", "ist"], 1], ["Ihr ___ sehr nett.", ["seid", "sind", "bist"], 0], ["Du ___ mein Freund.", ["ist", "bist", "bin"], 1]]
    },
    {
      id: "a11-praesens", t: "Präsens: спряжение глаголов",
      b: `<p>Отбрасываем <b>-en</b> от инфинитива и добавляем окончание: <i>wohn-en → ich wohn<b>e</b></i>.</p>
<table><tr><th></th><th>wohnen</th><th>arbeiten</th><th>sprechen</th></tr>
<tr><td>ich</td><td>wohn<b>e</b></td><td>arbeit<b>e</b></td><td>sprech<b>e</b></td></tr>
<tr><td>du</td><td>wohn<b>st</b></td><td>arbeit<b>est</b></td><td>spr<b>i</b>ch<b>st</b></td></tr>
<tr><td>er/sie/es</td><td>wohn<b>t</b></td><td>arbeit<b>et</b></td><td>spr<b>i</b>ch<b>t</b></td></tr>
<tr><td>wir</td><td>wohn<b>en</b></td><td>arbeit<b>en</b></td><td>sprech<b>en</b></td></tr>
<tr><td>ihr</td><td>wohn<b>t</b></td><td>arbeit<b>et</b></td><td>sprech<b>t</b></td></tr>
<tr><td>sie/Sie</td><td>wohn<b>en</b></td><td>arbeit<b>en</b></td><td>sprech<b>en</b></td></tr></table>
<ul><li>Основа на <b>-t / -d</b> → вставляем <b>e</b>: du arbeit<b>e</b>st, er find<b>e</b>t.</li>
<li>Основа на <b>-s / -ß / -z</b> → у du только <b>-t</b>: du heißt, du tanzt.</li>
<li>Сильные глаголы меняют гласную у <b>du</b> и <b>er</b>: e→i (sprechen → spricht, essen → isst), e→ie (lesen → liest), a→ä (fahren → fährt, schlafen → schläft).</li></ul>`,
      q: [["Du ___ in Berlin. (wohnen)", ["wohnst", "wohnt", "wohnen"], 0], ["Er ___ gut Deutsch. (sprechen)", ["sprecht", "spricht", "sprichst"], 1], ["Ihr ___ viel. (arbeiten)", ["arbeitet", "arbeitt", "arbeiten"], 0], ["Wie ___ du? (heißen)", ["heißst", "heißt", "heiße"], 1]]
    },
    {
      id: "a11-artikel", t: "Артикль: der, die, das, ein, eine",
      b: `<p>У каждого существительного есть род. Его почти никогда нельзя угадать по русскому слову, поэтому <b>учите слово только вместе с артиклем</b>. В этом приложении цвет помогает запомнить:</p>
<table><tr><th>Род</th><th>Определённый</th><th>Неопределённый</th><th>Пример</th></tr>
<tr><td>мужской</td><td><span class="art-der">der</span></td><td>ein</td><td>der Tisch — ein Tisch</td></tr>
<tr><td>женский</td><td><span class="art-die">die</span></td><td>eine</td><td>die Lampe — eine Lampe</td></tr>
<tr><td>средний</td><td><span class="art-das">das</span></td><td>ein</td><td>das Bett — ein Bett</td></tr>
<tr><td>мн. число</td><td><span class="art-die">die</span></td><td>— (нет)</td><td>die Tische — Tische</td></tr></table>
<p><b>Подсказки по окончаниям:</b></p>
<ul><li><span class="art-die">die</span>: -ung, -heit, -keit, -schaft, -ion, -tät, -ie, -ik, часто -e (die Wohnung, die Freiheit, die Lampe)</li>
<li><span class="art-das">das</span>: -chen, -lein, -um, -ment, -ma, инфинитивы (das Mädchen, das Museum, das Essen)</li>
<li><span class="art-der">der</span>: -er (люди, инструменты), -ling, -ismus, дни недели, месяцы, времена года (der Lehrer, der Montag, der Mai)</li></ul>
<p>Все существительные пишутся <b>с большой буквы</b>.</p>`,
      q: [["___ Wohnung ist schön.", ["Der", "Die", "Das"], 1], ["___ Mädchen spielt.", ["Der", "Die", "Das"], 2], ["Das ist ___ Tisch.", ["ein", "eine", "einer"], 0], ["Das ist ___ Lampe.", ["ein", "eine", "einer"], 1]]
    },
    {
      id: "a11-haben", t: "Глагол haben",
      b: `<table><tr><th></th><th>haben — иметь</th></tr>
<tr><td>ich</td><td>habe</td></tr><tr><td>du</td><td><b>hast</b></td></tr><tr><td>er/sie/es</td><td><b>hat</b></td></tr>
<tr><td>wir</td><td>haben</td></tr><tr><td>ihr</td><td>habt</td></tr><tr><td>sie/Sie</td><td>haben</td></tr></table>
<p>«У меня есть» по-немецки — <i>Ich habe</i>. После haben стоит <b>Akkusativ</b>: <i>Ich habe ein<b>en</b> Bruder.</i></p>
<p>Устойчивые выражения: <i>Hunger haben</i> (быть голодным), <i>Durst haben</i> (хотеть пить), <i>Zeit haben</i> (иметь время), <i>Angst haben</i> (бояться).</p>`,
      q: [["Du ___ eine Schwester.", ["hast", "habt", "hat"], 0], ["Er ___ keine Zeit.", ["habe", "hat", "hast"], 1], ["Ihr ___ ein Auto.", ["haben", "hast", "habt"], 2]]
    },
    {
      id: "a11-possessiv", t: "Притяжательные: mein, dein, sein, ihr…",
      b: `<table><tr><th>Кто</th><th>Чей</th></tr>
<tr><td>ich</td><td>mein — мой</td></tr><tr><td>du</td><td>dein — твой</td></tr><tr><td>er / es</td><td>sein — его</td></tr><tr><td>sie</td><td>ihr — её</td></tr>
<tr><td>wir</td><td>unser — наш</td></tr><tr><td>ihr</td><td>euer — ваш</td></tr><tr><td>sie</td><td>ihr — их</td></tr><tr><td>Sie</td><td>Ihr — Ваш</td></tr></table>
<p>Окончания такие же, как у <b>ein</b>: <i>mein Vater</i> (m), <i>mein<b>e</b> Mutter</i> (f), <i>mein Kind</i> (n), <i>mein<b>e</b> Eltern</i> (мн. ч.).</p>
<p>Внимание: <b>euer</b> теряет e: <i>eure Mutter</i>. Русское «свой» переводится по лицу: «Он любит свою маму» = <i>Er liebt <b>seine</b> Mutter</i>.</p>`,
      q: [["Das ist ___ Mutter. (я)", ["mein", "meine", "meinen"], 1], ["Wie heißt ___ Bruder? (ты)", ["dein", "deine", "deinen"], 0], ["Das ist Anna und ___ Sohn.", ["sein", "ihr", "ihre"], 1], ["___ Kinder sind klein. (мы)", ["Unser", "Unsere", "Euer"], 1]]
    },
    {
      id: "a11-w-fragen", t: "Вопросы: W-слова и «да/нет»",
      b: `<p><b>W-вопрос:</b> W-слово на 1-м месте, глагол на 2-м.</p>
<table><tr><th>W-слово</th><th>Пример</th></tr>
<tr><td>wer? — кто?</td><td>Wer ist das?</td></tr><tr><td>was? — что?</td><td>Was machst du?</td></tr>
<tr><td>wo? — где?</td><td>Wo wohnst du?</td></tr><tr><td>woher? — откуда?</td><td>Woher kommst du?</td></tr>
<tr><td>wohin? — куда?</td><td>Wohin gehst du?</td></tr><tr><td>wie? — как?</td><td>Wie heißt du?</td></tr>
<tr><td>wann? — когда?</td><td>Wann kommst du?</td></tr><tr><td>warum? — почему?</td><td>Warum lernst du Deutsch?</td></tr></table>
<p><b>Вопрос «да/нет»:</b> глагол на 1-м месте. <i>Wohnst du in Berlin? — Ja. / Nein.</i></p>
<p>На отрицательный вопрос «да» отвечают <b>doch</b>: <i>Kommst du nicht? — Doch!</i> (Нет, приду!)</p>`,
      q: [["___ wohnst du? — In Hamburg.", ["Wo", "Woher", "Wer"], 0], ["___ kommst du? — Aus Spanien.", ["Wie", "Woher", "Was"], 1], ["___ ist das? — Das ist Peter.", ["Wer", "Wo", "Wann"], 0], ["Kommst du nicht? — ___, ich komme!", ["Ja", "Doch", "Nein"], 1]]
    },
    {
      id: "a11-zahlen", t: "Числа, время, дни недели",
      b: `<p><b>0–12:</b> null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf.</p>
<p><b>13–19:</b> dreizehn, vierzehn, fünfzehn, <b>sechzehn</b>, <b>siebzehn</b>, achtzehn, neunzehn.</p>
<p><b>Десятки:</b> zwanzig, <b>dreißig</b>, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig, hundert.</p>
<p>Единицы говорят <b>раньше</b> десятков: 21 = <i>ein-und-zwanzig</i>, 45 = <i>fünf-und-vierzig</i>.</p>
<table><tr><th>Время</th><th>Разговорно</th></tr>
<tr><td>3:00</td><td>drei Uhr</td></tr><tr><td>3:10</td><td>zehn nach drei</td></tr><tr><td>3:15</td><td>Viertel nach drei</td></tr>
<tr><td>3:30</td><td><b>halb vier</b> (половина четвёртого!)</td></tr><tr><td>3:45</td><td>Viertel vor vier</td></tr></table>
<p>Вопрос: <i>Wie spät ist es?</i> или <i>Wie viel Uhr ist es?</i></p>
<p><b>Дни недели</b> (все <span class="art-der">der</span>): Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag. «В понедельник» = <i>am Montag</i>; «в 8 часов» = <i>um 8 Uhr</i>.</p>`,
      q: [["45 = ?", ["vierundfünfzig", "fünfundvierzig", "vierfünfzig"], 1], ["Es ist 7:30. Es ist ___.", ["halb sieben", "halb acht", "sieben halb"], 1], ["Es ist 9:15. Es ist ___.", ["Viertel vor neun", "Viertel nach neun", "halb neun"], 1], ["Der Kurs ist ___ Montag.", ["am", "um", "im"], 0]]
    },
    {
      id: "a11-wortstellung", t: "Порядок слов: глагол на 2-м месте",
      b: `<p>Самое важное правило немецкого: в повествовательном предложении <b>спрягаемый глагол стоит на 2-й позиции</b>. На 1-й может стоять подлежащее, время, место, дополнение. Если на 1-й позиции не подлежащее, оно встаёт <b>сразу после глагола</b>.</p>
<table><tr><th>Позиция 1</th><th>Позиция 2</th><th>Остальное</th></tr>
<tr><td>Ich</td><td><b>lerne</b></td><td>heute Deutsch.</td></tr>
<tr><td>Heute</td><td><b>lerne</b></td><td>ich Deutsch.</td></tr>
<tr><td>Deutsch</td><td><b>lerne</b></td><td>ich heute.</td></tr></table>
<p>Позиция 1 — это <b>часть предложения</b>, а не одно слово: <i>[Am Wochenende] <b>bin</b> ich zu Hause.</i></p>
<p>Союзы <b>und, aber, oder, denn, sondern</b> стоят на «нулевой» позиции и порядок не меняют: <i>Ich bin müde, aber ich <b>muss</b> arbeiten.</i></p>
<p>Середина предложения: обычно <b>когда → почему → как → где/куда</b> (Te-Ka-Mo-Lo): <i>Ich fahre morgen mit dem Bus nach Berlin.</i></p>`,
      q: [["Heute ___ Deutsch.", ["ich lerne", "lerne ich", "lernen ich"], 1], ["Am Abend ___ zu Hause.", ["ich bin", "bin ich", "sind ich"], 1], ["Ich bin müde, aber ___ arbeiten.", ["ich muss", "muss ich", "ich müssen"], 0]]
    },
    {
      id: "a11-kasus", t: "Падежи: Nominativ, Akkusativ, Dativ, Genitiv",
      b: `<p><b>Падеж</b> показывает, какую роль слово играет в предложении: кто действует, на кого направлено действие, кому что-то дают, чьё это. В русском падежей шесть, и меняется окончание самого слова. В немецком их <b>четыре</b>, и меняется в основном <b>артикль</b> (а ещё местоимения и окончания прилагательных). Само существительное почти не меняется.</p>
<table><tr><th>Падеж</th><th>Вопрос</th><th>Роль и пример</th></tr>
<tr><td><b>Nominativ</b><br><span class="muted small">именительный</span></td><td>wer? was?<br>кто? что?</td><td style="white-space:normal">подлежащее: тот, кто действует<br><i><b>Der Mann</b> schläft.</i></td></tr>
<tr><td><b>Akkusativ</b><br><span class="muted small">винительный</span></td><td>wen? was?<br>кого? что?</td><td style="white-space:normal">прямое дополнение: на кого или что направлено действие<br><i>Ich sehe <b>den Mann</b>.</i></td></tr>
<tr><td><b>Dativ</b><br><span class="muted small">дательный</span></td><td>wem?<br>кому?</td><td style="white-space:normal">косвенное дополнение: адресат, получатель<br><i>Ich helfe <b>dem Mann</b>.</i></td></tr>
<tr><td><b>Genitiv</b><br><span class="muted small">родительный</span></td><td>wessen?<br>чей?</td><td style="white-space:normal">принадлежность<br><i>das Auto <b>des Mannes</b></i></td></tr></table>
<p>Все четыре падежа в одном предложении:</p>
<p><i><b>Der Vater</b> gibt <b>dem Kind</b> <b>den Schlüssel</b> <b>des Autos</b>.</i> — Отец даёт ребёнку ключ от машины.</p>
<ul><li><b>Der Vater</b>: кто даёт? → Nominativ</li>
<li><b>dem Kind</b>: кому? → Dativ</li>
<li><b>den Schlüssel</b>: что даёт? → Akkusativ</li>
<li><b>des Autos</b>: чей ключ? → Genitiv</li></ul>
<p><b>Артикли по падежам.</b> Больше всего меняется мужской род: <b>der → den → dem → des</b>.</p>
<table><tr><th></th><th>m</th><th>f</th><th>n</th><th>мн. ч.</th></tr>
<tr><td><b>Nom</b></td><td>der / ein</td><td>die / eine</td><td>das / ein</td><td>die / —</td></tr>
<tr><td><b>Akk</b></td><td><b>den / einen</b></td><td>die / eine</td><td>das / ein</td><td>die / —</td></tr>
<tr><td><b>Dat</b></td><td><b>dem / einem</b></td><td><b>der / einer</b></td><td><b>dem / einem</b></td><td><b>den</b> / — + -n</td></tr>
<tr><td><b>Gen</b></td><td><b>des / eines</b> + -(e)s</td><td><b>der / einer</b></td><td><b>des / eines</b> + -(e)s</td><td><b>der</b> / —</td></tr></table>
<p>Так же, как <i>ein</i>, склоняются <i>kein</i> и притяжательные <i>mein, dein, sein…</i>: <i>meinen Bruder, meinem Bruder</i>.</p>
<p><b>Как понять, какой нужен падеж.</b> Есть три подсказки:</p>
<ul><li><b>Роль в предложении.</b> Задайте вопрос: кто? → Nom, кого/что? → Akk, кому? → Dat, чей? → Gen.</li>
<li><b>Глагол.</b> Большинство глаголов требуют Akkusativ (<i>haben, kaufen, sehen, brauchen</i>). Некоторые требуют Dativ: <i>helfen, danken, gefallen, gehören, antworten, gratulieren</i>. Глаголы «дать кому-то что-то» берут оба: <i>geben, schenken, zeigen</i> + Dat (кому) + Akk (что).</li>
<li><b>Предлог.</b> Он решает за вас:
durch, für, gegen, ohne, um → Akk;
aus, bei, mit, nach, seit, von, zu → Dat;
in, an, auf и др.: wo? → Dat, wohin? → Akk;
wegen, während, trotz → Gen.</li></ul>
<p><b>Ловушки для русскоговорящих:</b></p>
<ul><li>После <b>sein, werden, bleiben</b> стоит <b>Nominativ</b>, а не творительный, как в русском: <i>Er ist <b>ein</b> guter Arzt.</i> (Он был хорошим врачом.)</li>
<li>Управление не всегда совпадает с русским: <i>Ich frage <b>den</b> Lehrer</i> (спрашиваю <u>у</u> учителя → Akk), <i>Ich rufe <b>meinen</b> Freund an</i> (звоню другу, но Akk!).</li>
<li>Творительного и предложного падежей нет, их заменяют предлоги: <i><b>mit</b> dem Freund</i> (с другом), <i><b>über</b> den Freund</i> (о друге), <i><b>in</b> der Stadt</i> (в городе).</li>
<li>В разговорной речи Genitiv часто заменяют на <b>von + Dativ</b>: <i>das Auto von meinem Vater</i>.</li></ul>
<p>Подробно каждый падеж разбирается в отдельных правилах: Akkusativ (A1.1), Dativ (A1.2), Genitiv (B1.1).</p>`,
      q: [["___ Mann kauft Brot. (кто?)", ["Der", "Den", "Dem"], 0], ["Ich sehe ___ Mann. (кого?)", ["der", "den", "dem"], 1], ["Ich danke ___ Lehrer. (кому?)", ["den", "dem", "des"], 1], ["Das ist das Auto ___ Vaters. (чьё?)", ["der", "dem", "des"], 2], ["Er ist ___ guter Arzt.", ["ein", "einen", "einem"], 0], ["Ich rufe ___ Freund an.", ["meinen", "meinem", "mein"], 0]]
    },
    {
      id: "a11-akkusativ", t: "Винительный падеж (Akkusativ)",
      b: `<p>Akkusativ отвечает на вопросы <b>wen? was?</b> (кого? что?) — это прямое дополнение: <i>Ich kaufe <b>einen Apfel</b>.</i></p>
<p>Меняется <b>только мужской род</b>:</p>
<table><tr><th></th><th>Nominativ</th><th>Akkusativ</th></tr>
<tr><td>m</td><td>der / ein / kein / mein</td><td><b>den / einen / keinen / meinen</b></td></tr>
<tr><td>f</td><td>die / eine</td><td>die / eine</td></tr>
<tr><td>n</td><td>das / ein</td><td>das / ein</td></tr>
<tr><td>мн. ч.</td><td>die / —</td><td>die / —</td></tr></table>
<p>Глаголы с Akkusativ: haben, kaufen, essen, trinken, möchten, brauchen, sehen, suchen, nehmen, <b>es gibt</b> (есть, имеется): <i>Hier gibt es einen Supermarkt.</i></p>
<p class="small muted">Что такое падежи вообще: <a href="#rule-a11-kasus" style="color:var(--der);font-weight:600">обзор всех четырёх падежей</a>.</p>`,
      q: [["Ich möchte ___ Apfel.", ["ein", "einen", "eine"], 1], ["Wir kaufen ___ Käse.", ["der", "den", "dem"], 1], ["Sie trinkt ___ Milch.", ["die", "den", "der"], 0], ["Hier gibt es ___ Bahnhof.", ["einen", "ein", "eine"], 0]]
    },
    {
      id: "a11-negation", t: "Отрицание: nicht и kein",
      b: `<p><b>kein</b> — отрицает существительное с <b>неопределённым артиклем</b> или <b>без артикля</b>. Склоняется как ein:</p>
<ul><li><i>Ich habe ein Auto. → Ich habe <b>kein</b> Auto.</i></li>
<li><i>Ich trinke Kaffee. → Ich trinke <b>keinen</b> Kaffee.</i></li>
<li><i>Ich habe Zeit. → Ich habe <b>keine</b> Zeit.</i></li></ul>
<p><b>nicht</b> — для всего остального: глагола, прилагательного, наречия, существительного с определённым артиклем.</p>
<ul><li><i>Ich komme <b>nicht</b>.</i></li><li><i>Das ist <b>nicht</b> teuer.</i></li><li><i>Ich kaufe das Brot <b>nicht</b>.</i></li></ul>
<p>Место nicht: в конце предложения или <b>перед</b> тем словом, которое отрицается (<i>nicht heute, sondern morgen</i>).</p>`,
      q: [["Ich habe ___ Zeit.", ["nicht", "keine", "kein"], 1], ["Das Brot ist ___ frisch.", ["kein", "nicht", "keine"], 1], ["Er trinkt ___ Kaffee.", ["keinen", "keine", "nicht"], 0], ["Wir kommen heute ___.", ["kein", "nicht", "keine"], 1]]
    },
    {
      id: "a11-plural", t: "Множественное число",
      b: `<p>Во множественном числе артикль <b>всегда die</b>. Окончаний несколько, поэтому мн. ч. тоже учат вместе со словом.</p>
<table><tr><th>Тип</th><th>Пример</th></tr>
<tr><td>-e</td><td>der Tisch → die Tisch<b>e</b></td></tr>
<tr><td>¨-e</td><td>der Stuhl → die St<b>ü</b>hl<b>e</b></td></tr>
<tr><td>-er / ¨-er</td><td>das Kind → die Kind<b>er</b>, das Haus → die H<b>ä</b>us<b>er</b></td></tr>
<tr><td>-n / -en</td><td>die Lampe → die Lampe<b>n</b>, die Frau → die Frau<b>en</b></td></tr>
<tr><td>-nen</td><td>die Freundin → die Freundin<b>nen</b></td></tr>
<tr><td>-s</td><td>das Sofa → die Sofa<b>s</b> (заимствования)</td></tr>
<tr><td>без изменений / ¨</td><td>das Zimmer → die Zimmer, die Mutter → die M<b>ü</b>tter</td></tr></table>
<p>Подсказка: почти все слова женского рода получают <b>-(e)n</b>. Слова на -er/-el/-en мужского и среднего рода часто не меняются.</p>`,
      q: [["der Tisch → die ___", ["Tischen", "Tische", "Tischs"], 1], ["die Lampe → die ___", ["Lampen", "Lampes", "Lämpe"], 0], ["das Kind → die ___", ["Kinds", "Kinden", "Kinder"], 2], ["das Sofa → die ___", ["Sofas", "Sofen", "Sofa"], 0]]
    }
  ]
});

window.DE_LEVELS.push({
  id: "A1.2",
  title: "Повседневная жизнь",
  desc: "Распорядок дня, хобби, город, здоровье, одежда. Модальные глаголы, Dativ, Perfekt.",
  units: [
    {
      id: "a12-u1", t: "Der Tag · Распорядок дня",
      w: ["der Morgen|Morgen|утро", "der Mittag|Mittage|полдень", "der Abend|Abende|вечер", "die Nacht|Nächte|ночь", "der Kurs|Kurse|курс", "aufstehen|er steht auf|вставать", "anfangen|er fängt an|начинать(ся)", "einkaufen|er kauft ein|делать покупки", "fernsehen|er sieht fern|смотреть телевизор", "frühstücken||завтракать", "arbeiten|er arbeitet|работать", "schlafen|er schläft|спать", "immer||всегда", "oft||часто", "manchmal||иногда", "nie||никогда"],
      r: ["a12-trennbar", "a12-zeitangaben"],
      s: [["Ich stehe um sieben Uhr auf.", "Я встаю в семь часов.", ["Um sieben Uhr stehe ich auf."]], ["Der Kurs fängt um neun Uhr an.", "Курс начинается в девять часов.", ["Um neun Uhr fängt der Kurs an."]], ["Am Abend sehe ich fern.", "Вечером я смотрю телевизор.", ["Ich sehe am Abend fern."]], ["Am Samstag kaufe ich ein.", "В субботу я хожу за покупками.", ["Ich kaufe am Samstag ein."]], ["Er schläft nie lange.", "Он никогда не спит долго."]]
    },
    {
      id: "a12-u2", t: "Freizeit · Свободное время",
      w: ["das Hobby|Hobbys|хобби", "der Sport|-|спорт", "das Buch|Bücher|книга", "der Film|Filme|фильм", "das Kino|Kinos|кино", "die Musik|-|музыка", "das Spiel|Spiele|игра", "der Fußball|Fußbälle|футбол; мяч", "lesen|er liest|читать", "spielen||играть", "schwimmen||плавать", "rauchen||курить", "können|er kann|мочь, уметь", "wollen|er will|хотеть", "müssen|er muss|быть должным", "dürfen|er darf|иметь разрешение"],
      r: ["a12-modal", "a12-satzklammer"],
      s: [["Ich kann gut schwimmen.", "Я хорошо умею плавать."], ["Willst du ins Kino gehen?", "Хочешь пойти в кино?"], ["Wir müssen heute arbeiten.", "Сегодня мы должны работать.", ["Heute müssen wir arbeiten."]], ["Hier darf man nicht rauchen.", "Здесь нельзя курить.", ["Man darf hier nicht rauchen."]], ["Sie liest gern Bücher.", "Она любит читать книги."]]
    },
    {
      id: "a12-u3", t: "In der Stadt · В городе",
      w: ["der Bahnhof|Bahnhöfe|вокзал", "die Straße|Straßen|улица", "die Bank|Banken|банк", "die Post|-|почта", "der Supermarkt|Supermärkte|супермаркет", "die Apotheke|Apotheken|аптека", "das Krankenhaus|Krankenhäuser|больница", "der Bus|Busse|автобус", "die U-Bahn|U-Bahnen|метро", "das Auto|Autos|машина", "links||налево, слева", "rechts||направо, справа", "geradeaus||прямо", "fahren|er fährt|ехать", "gehen||идти"],
      r: ["a12-dativ", "a12-praep-dativ"],
      s: [["Ich fahre mit dem Bus.", "Я еду на автобусе."], ["Wie komme ich zum Bahnhof?", "Как мне добраться до вокзала?"], ["Gehen Sie geradeaus und dann links.", "Идите прямо, а потом налево."], ["Sie arbeitet bei der Post.", "Она работает на почте."], ["Nach dem Kurs gehe ich zum Supermarkt.", "После курса я иду в супермаркет.", ["Ich gehe nach dem Kurs zum Supermarkt."]]]
    },
    {
      id: "a12-u4", t: "Gesundheit · Здоровье",
      w: ["der Kopf|Köpfe|голова", "der Bauch|Bäuche|живот", "der Arm|Arme|рука (от плеча)", "die Hand|Hände|кисть руки", "das Bein|Beine|нога", "der Fuß|Füße|стопа", "das Auge|Augen|глаз", "der Arzt|Ärzte|врач", "die Ärztin|Ärztinnen|врач (женщина)", "der Termin|Termine|приём, запись", "das Medikament|Medikamente|лекарство", "krank||больной", "gesund||здоровый", "wehtun|es tut weh|болеть", "bleiben||оставаться", "nehmen|er nimmt|брать; принимать", "brauchen||нуждаться", "helfen|er hilft|помогать"],
      r: ["a12-imperativ", "a12-pronomen"],
      s: [["Mein Kopf tut weh.", "У меня болит голова."], ["Bleiben Sie zwei Tage im Bett!", "Оставайтесь два дня в постели!"], ["Nimm das Medikament dreimal täglich!", "Принимай лекарство три раза в день!"], ["Ich brauche einen Termin beim Arzt.", "Мне нужна запись к врачу."], ["Kannst du mir helfen?", "Ты можешь мне помочь?"]]
    },
    {
      id: "a12-u5", t: "Kleidung und Wetter · Одежда и погода",
      w: ["die Kleidung|-|одежда", "die Hose|Hosen|брюки", "das Hemd|Hemden|рубашка", "das Kleid|Kleider|платье", "der Rock|Röcke|юбка", "die Jacke|Jacken|куртка", "der Schuh|Schuhe|ботинок, туфля", "der Mantel|Mäntel|пальто", "das Wetter|-|погода", "die Sonne|Sonnen|солнце", "der Regen|-|дождь", "der Schnee|-|снег", "kalt||холодный", "warm||тёплый", "tragen|er trägt|носить", "gefallen|er gefällt|нравиться", "gestern||вчера"],
      r: ["a12-perfekt", "a12-dativ-verben"],
      s: [["Die Jacke gefällt mir.", "Мне нравится эта куртка."], ["Heute ist es kalt und es regnet.", "Сегодня холодно и идёт дождь."], ["Gestern habe ich eine Hose gekauft.", "Вчера я купил брюки.", ["Ich habe gestern eine Hose gekauft."]], ["Wir sind ins Kino gegangen.", "Мы сходили в кино."], ["Was trägst du heute?", "Что ты сегодня наденешь?"]]
    }
  ],
  rules: [
    {
      id: "a12-trennbar", t: "Глаголы с отделяемыми приставками",
      b: `<p>Ударные приставки <b>an-, auf-, aus-, ein-, mit-, zu-, ab-, vor-, fern-, zurück-</b> в Präsens отрываются и уходят <b>в конец предложения</b>:</p>
<ul><li>aufstehen → <i>Ich <b>stehe</b> um 7 Uhr <b>auf</b>.</i></li><li>einkaufen → <i>Wir <b>kaufen</b> am Samstag <b>ein</b>.</i></li><li>anfangen → <i>Der Film <b>fängt</b> um 8 <b>an</b>.</i></li></ul>
<p>С модальным глаголом инфинитив стоит в конце целиком: <i>Ich muss früh <b>aufstehen</b>.</i></p>
<p><b>Неотделяемые</b> (безударные) приставки: be-, ge-, er-, ver-, zer-, ent-, emp-, miss-. Они не отрываются никогда: <i>Ich <b>bezahle</b>. Ich <b>verstehe</b>.</i></p>`,
      q: [["Ich ___ um sieben Uhr auf.", ["stehe", "aufstehe", "stehen"], 0], ["Wann ___ der Film an?", ["fangt", "fängt", "anfängt"], 1], ["Am Abend sehe ich ___.", ["fern", "fernsehen", "an"], 0], ["Ich muss heute ___.", ["kaufe ein", "einkaufen", "ein kaufen"], 1]]
    },
    {
      id: "a12-zeitangaben", t: "Предлоги времени: um, am, im",
      b: `<table><tr><th>Предлог</th><th>Когда используется</th><th>Пример</th></tr>
<tr><td><b>um</b></td><td>точное время</td><td>um 8 Uhr, um halb drei</td></tr>
<tr><td><b>am</b></td><td>день, часть суток, выходные</td><td>am Montag, am Abend, am Wochenende</td></tr>
<tr><td><b>im</b></td><td>месяц, время года</td><td>im Mai, im Winter</td></tr>
<tr><td><b>in der</b></td><td>ночь</td><td>in der Nacht</td></tr>
<tr><td><b>von … bis</b></td><td>промежуток</td><td>von 9 bis 17 Uhr</td></tr></table>
<p>Год называют без предлога: <i>2024 war ich in Wien</i> (или <i>im Jahr 2024</i>).</p>
<p>Как часто: <b>immer</b> (всегда) › <b>oft</b> (часто) › <b>manchmal</b> (иногда) › <b>selten</b> (редко) › <b>nie</b> (никогда).</p>`,
      q: [["Der Kurs beginnt ___ neun Uhr.", ["am", "um", "im"], 1], ["___ Sommer fahre ich ans Meer.", ["Am", "Um", "Im"], 2], ["___ Samstag habe ich frei.", ["Am", "Um", "Im"], 0], ["Ich arbeite ___ der Nacht.", ["am", "in", "um"], 1]]
    },
    {
      id: "a12-modal", t: "Модальные глаголы",
      b: `<table><tr><th></th><th>können</th><th>müssen</th><th>wollen</th><th>dürfen</th><th>sollen</th><th>möchten</th></tr>
<tr><td>ich</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td><td>möchte</td></tr>
<tr><td>du</td><td>kannst</td><td>musst</td><td>willst</td><td>darfst</td><td>sollst</td><td>möchtest</td></tr>
<tr><td>er/sie/es</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td><td>möchte</td></tr>
<tr><td>wir</td><td>können</td><td>müssen</td><td>wollen</td><td>dürfen</td><td>sollen</td><td>möchten</td></tr>
<tr><td>ihr</td><td>könnt</td><td>müsst</td><td>wollt</td><td>dürft</td><td>sollt</td><td>möchtet</td></tr></table>
<p>У <b>ich</b> и <b>er</b> формы одинаковые и без окончания.</p>
<ul><li><b>können</b> — мочь, уметь</li><li><b>müssen</b> — должен, необходимо</li><li><b>wollen</b> — хотеть (твёрдо)</li><li><b>möchten</b> — хотел бы (вежливо)</li><li><b>dürfen</b> — можно, разрешено; <b>nicht dürfen</b> — нельзя</li><li><b>sollen</b> — следует (кто-то сказал)</li></ul>
<p>Модальный глагол на 2-м месте, инфинитив — <b>в конце</b>: <i>Ich kann gut <b>schwimmen</b>.</i></p>
<p>Ловушка: <i>nicht müssen</i> = не нужно, а <i>nicht dürfen</i> = запрещено.</p>`,
      q: [["Er ___ gut Gitarre spielen.", ["kannst", "kann", "können"], 1], ["Hier ___ man nicht rauchen.", ["darf", "muss", "will"], 0], ["Du ___ morgen früh aufstehen.", ["musst", "muss", "müsst"], 0], ["___ du mit ins Kino kommen?", ["Willst", "Will", "Wollt"], 0]]
    },
    {
      id: "a12-satzklammer", t: "Рамочная конструкция (Satzklammer)",
      b: `<p>Немецкое предложение часто похоже на рамку: спрягаемая часть на <b>позиции 2</b>, вторая часть — <b>в самом конце</b>. Всё остальное — внутри.</p>
<table><tr><th>Тип</th><th>Позиция 2</th><th>Середина</th><th>Конец</th></tr>
<tr><td>Модальный глагол</td><td>Ich <b>möchte</b></td><td>heute Pizza</td><td><b>essen</b>.</td></tr>
<tr><td>Отделяемая приставка</td><td>Ich <b>rufe</b></td><td>dich morgen</td><td><b>an</b>.</td></tr>
<tr><td>Perfekt</td><td>Ich <b>habe</b></td><td>gestern Pizza</td><td><b>gegessen</b>.</td></tr></table>
<p>В вопросе «да/нет» рамка начинается с 1-й позиции: <i><b>Kannst</b> du mir <b>helfen</b>?</i></p>`,
      q: [["Ich möchte morgen ins Kino ___.", ["gehe", "gehen", "gegangen"], 1], ["Wir haben gestern Fußball ___.", ["spielen", "gespielt", "spielt"], 1], ["Ruf mich bitte heute Abend ___!", ["an", "auf", "mit"], 0]]
    },
    {
      id: "a12-dativ", t: "Дательный падеж (Dativ)",
      b: `<p>Dativ отвечает на вопрос <b>wem?</b> (кому?) и нужен после многих предлогов.</p>
<table><tr><th></th><th>Nominativ</th><th>Dativ</th></tr>
<tr><td>m</td><td>der / ein / mein</td><td><b>dem / einem / meinem</b></td></tr>
<tr><td>f</td><td>die / eine / meine</td><td><b>der / einer / meiner</b></td></tr>
<tr><td>n</td><td>das / ein / mein</td><td><b>dem / einem / meinem</b></td></tr>
<tr><td>мн. ч.</td><td>die / meine</td><td><b>den / meinen</b> + -n</td></tr></table>
<p>Во мн. ч. существительное получает <b>-n</b>: <i>mit den Kinder<b>n</b></i> (кроме слов на -s: <i>mit den Autos</i>).</p>
<p class="small muted">Что такое падежи вообще: <a href="#rule-a11-kasus" style="color:var(--der);font-weight:600">обзор всех четырёх падежей</a>.</p>`,
      q: [["Ich fahre mit ___ Bus.", ["der", "dem", "den"], 1], ["Sie hilft ___ Mutter.", ["ihre", "ihrer", "ihrem"], 1], ["Er spielt mit den ___.", ["Kinder", "Kindern", "Kinds"], 1], ["Ich gebe ___ Mann das Buch.", ["den", "dem", "der"], 1]]
    },
    {
      id: "a12-praep-dativ", t: "Предлоги с дательным падежом",
      b: `<p><b>aus, bei, mit, nach, seit, von, zu, gegenüber</b> — всегда Dativ.</p>
<table><tr><th>Предлог</th><th>Значение</th><th>Пример</th></tr>
<tr><td>aus</td><td>из</td><td>aus der Ukraine, aus dem Haus</td></tr>
<tr><td>bei</td><td>у, при, на (работе)</td><td>beim Arzt, bei der Post</td></tr>
<tr><td>mit</td><td>с; на (транспорте)</td><td>mit dem Zug, mit meiner Frau</td></tr>
<tr><td>nach</td><td>после; в (город/страну)</td><td>nach dem Kurs, nach Berlin, nach Hause</td></tr>
<tr><td>seit</td><td>с (какого-то времени)</td><td>seit einem Jahr</td></tr>
<tr><td>von</td><td>от, из</td><td>von der Arbeit</td></tr>
<tr><td>zu</td><td>к</td><td>zum Arzt, zur Schule</td></tr></table>
<p>Слияния: zu dem → <b>zum</b>, zu der → <b>zur</b>, bei dem → <b>beim</b>, von dem → <b>vom</b>.</p>
<p>Запомните: <i>nach Hause</i> — домой, <i>zu Hause</i> — дома.</p>`,
      q: [["Ich gehe ___ Arzt.", ["zum", "zur", "zu"], 0], ["Wir fahren ___ Berlin.", ["zu", "nach", "in"], 1], ["Sie wohnt ___ einem Jahr hier.", ["seit", "von", "vor"], 0], ["Ich komme gerade ___ der Arbeit.", ["von", "zu", "nach"], 0]]
    },
    {
      id: "a12-imperativ", t: "Повелительное наклонение (Imperativ)",
      b: `<table><tr><th>Кому</th><th>Как образуется</th><th>Пример</th></tr>
<tr><td>Sie</td><td>глагол + Sie</td><td><b>Kommen Sie!</b> Bleiben Sie im Bett!</td></tr>
<tr><td>du</td><td>форма du без <b>-st</b> и без du</td><td>du kommst → <b>Komm!</b> du nimmst → <b>Nimm!</b> du liest → <b>Lies!</b></td></tr>
<tr><td>ihr</td><td>форма ihr без ihr</td><td><b>Kommt!</b> Nehmt!</td></tr></table>
<ul><li>Умлаут a→ä в du-форме исчезает: du fährst → <b>Fahr!</b>, du schläfst → <b>Schlaf!</b></li>
<li>Отделяемая приставка в конце: <i>Steh auf! Ruf mich an!</i></li>
<li>sein: <b>Sei</b> ruhig! / <b>Seid</b> ruhig! / <b>Seien Sie</b> ruhig!</li></ul>
<p>Добавляйте <b>bitte</b> для вежливости: <i>Komm bitte!</i></p>`,
      q: [["(du) ___ das Medikament!", ["Nimmst", "Nimm", "Nehmt"], 1], ["(Sie) ___ bitte langsam!", ["Sprechen Sie", "Sprich", "Sprecht Sie"], 0], ["(du, fahren) ___ vorsichtig!", ["Fähr", "Fahr", "Fahre du"], 1], ["(ihr) ___ bitte leise!", ["Seid", "Sei", "Sind"], 0]]
    },
    {
      id: "a12-pronomen", t: "Личные местоимения в Akkusativ и Dativ",
      b: `<table><tr><th>Nominativ</th><th>Akkusativ</th><th>Dativ</th></tr>
<tr><td>ich</td><td>mich</td><td>mir</td></tr><tr><td>du</td><td>dich</td><td>dir</td></tr>
<tr><td>er</td><td>ihn</td><td>ihm</td></tr><tr><td>sie</td><td>sie</td><td>ihr</td></tr><tr><td>es</td><td>es</td><td>ihm</td></tr>
<tr><td>wir</td><td>uns</td><td>uns</td></tr><tr><td>ihr</td><td>euch</td><td>euch</td></tr>
<tr><td>sie / Sie</td><td>sie / Sie</td><td>ihnen / Ihnen</td></tr></table>
<ul><li>Akkusativ: <i>Ich sehe <b>dich</b>. Ich rufe <b>Sie</b> an.</i></li>
<li>Dativ: <i>Kannst du <b>mir</b> helfen? Wie geht es <b>Ihnen</b>?</i></li></ul>`,
      q: [["Kannst du ___ helfen? (я)", ["mich", "mir", "ich"], 1], ["Ich liebe ___. (ты)", ["dich", "dir", "du"], 0], ["Wie geht es ___? (он)", ["ihn", "ihm", "er"], 1], ["Ich rufe ___ morgen an. (Вы)", ["Ihnen", "Sie", "ihr"], 1]]
    },
    {
      id: "a12-perfekt", t: "Perfekt: разговорное прошедшее время",
      b: `<p><b>haben / sein</b> (позиция 2) + <b>Partizip II</b> (в конце): <i>Ich <b>habe</b> Pizza <b>gegessen</b>.</i></p>
<p><b>Partizip II:</b></p>
<ul><li>правильные: <b>ge-…-t</b> — machen → gemacht, kaufen → gekauft, arbeiten → gearbeitet</li>
<li>неправильные: <b>ge-…-en</b>, часто меняется корень — gehen → gegangen, trinken → getrunken, essen → gegessen</li>
<li>отделяемые: ge- внутри — einkaufen → ein<b>ge</b>kauft, aufstehen → auf<b>ge</b>standen</li>
<li>без ge-: на <b>-ieren</b> (studiert) и с неотделяемой приставкой (bezahlt, verstanden)</li></ul>
<p><b>С sein:</b> движение из точки А в точку Б (gehen, fahren, kommen, fliegen), изменение состояния (aufstehen, einschlafen) и sein, bleiben, passieren. <b>Все остальные — с haben.</b></p>`,
      q: [["Ich ___ gestern Pizza gegessen.", ["bin", "habe", "hat"], 1], ["Wir ___ nach Berlin gefahren.", ["haben", "sind", "seid"], 1], ["Er hat ein Buch ___. (kaufen)", ["gekauft", "kaufte", "gekaufen"], 0], ["Sie hat Medizin ___. (studieren)", ["gestudiert", "studiert", "studieren"], 1]]
    },
    {
      id: "a12-dativ-verben", t: "Глаголы с дательным падежом",
      b: `<p>Некоторые глаголы требуют <b>Dativ</b> (кому?), хотя в русском бывает иначе:</p>
<p><b>helfen</b> (помогать), <b>gefallen</b> (нравиться), <b>gehören</b> (принадлежать), <b>danken</b> (благодарить), <b>antworten</b> (отвечать), <b>gratulieren</b> (поздравлять), <b>schmecken</b> (быть вкусным), <b>passen</b> (подходить), <b>wehtun</b> (болеть).</p>
<p>С <b>gefallen</b> подлежащее — <b>вещь</b>, а человек в Dativ, как в русском «мне нравится»:</p>
<ul><li><i>Die Jacke <b>gefällt</b> mir.</i> — Мне нравится куртка.</li><li><i>Die Schuhe <b>gefallen</b> mir.</i> — Мне нравятся туфли.</li></ul>
<p><i>Ich helfe <b>meinem</b> Bruder. Das Auto gehört <b>mir</b>. Der Kopf tut <b>mir</b> weh.</i></p>`,
      q: [["Die Schuhe ___ mir.", ["gefällt", "gefallen", "gefallt"], 1], ["Ich helfe ___ Freund.", ["meinen", "meinem", "mein"], 1], ["Das Buch gehört ___.", ["mich", "mir", "ich"], 1], ["Schmeckt ___ die Suppe?", ["dich", "dir", "du"], 1]]
    }
  ]
});
