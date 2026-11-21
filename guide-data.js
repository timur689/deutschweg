/* Методичка: практические алгоритмы «как определить…» по уровням A1–B1.
   Каждая шпаргалка: id, lvl, t (вопрос), s (о чём), r (связанные правила), b (HTML). */
window.DE_GUIDE = [
  /* ───────────── A1 ───────────── */
  {
    id: 'rod', lvl: 'A1', t: 'Как определить род: der, die или das',
    s: 'Окончания, значение слова, сложные слова',
    r: ['a11-artikel', 'a11-plural'],
    b: `<p class="gd-key"><b>Коротко:</b> род часто подсказывает окончание слова. Если подсказки нет, учите слово сразу с артиклем: не «Tisch», а «der Tisch».</p>
<p><b>Шаг 1. Посмотрите на окончание.</b> Это самая надёжная подсказка.</p>
<table><tr><th>Окончание</th><th>Род</th><th>Примеры</th></tr>
<tr><td>-ung, -heit, -keit, -schaft, -ion, -tät, -ei, -ie, -ik, -ur, -enz, -anz</td><td><b>die</b></td><td>die Wohnung, die Freiheit, die Information, die Universität, die Bäckerei, die Musik</td></tr>
<tr><td>-in (женщина)</td><td><b>die</b></td><td>die Lehrerin, die Ärztin</td></tr>
<tr><td>-e</td><td>чаще <b>die</b></td><td>die Lampe, die Straße (но der Junge, das Auge)</td></tr>
<tr><td>-chen, -lein</td><td><b>das</b></td><td>das Mädchen, das Brötchen</td></tr>
<tr><td>-ment, -um, -nis, -tum</td><td>чаще <b>das</b></td><td>das Dokument, das Museum, das Ergebnis (но die Erlaubnis, der Irrtum)</td></tr>
<tr><td>-er (тот, кто делает), -ling, -ismus, -or, -ig, -ich</td><td><b>der</b></td><td>der Lehrer, der Frühling, der Motor, der Honig, der Teppich</td></tr></table>
<p><b>Шаг 2. Посмотрите на значение.</b></p>
<ul><li><b>der:</b> дни недели, месяцы, времена года (der Montag, der Mai, der Sommer), стороны света, погода (der Regen, der Schnee), алкогольные напитки (der Wein, но das Bier).</li>
<li><b>das:</b> глагол в роли существительного (das Essen, das Schwimmen), цвета (das Rot), металлы (das Gold), почти все города и страны (das schöne Berlin).</li>
<li><b>die:</b> большинство цветов и деревьев (die Rose, die Eiche), числа (die Eins).</li></ul>
<p><b>Шаг 3. Сложное слово получает род последней части.</b> <i>das Haus + die Tür = <b>die</b> Haustür</i>, <i>die Kinder + der Garten = <b>der</b> Kindergarten</i>.</p>
<p><b>Шаг 4. Люди — по полу:</b> <i>der Mann, die Frau, der Lehrer, die Lehrerin</i>. Исключения запоминаются по окончанию: <i>das Mädchen</i> (-chen), <i>das Kind</i>.</p>
<p class="small muted">Во множественном числе у всех трёх родов артикль <b>die</b>: die Tische, die Lampen, die Bücher.</p>`,
  },
  {
    id: 'padezh', lvl: 'A1', t: 'Как определить падеж',
    s: 'Порядок проверки: предлог, глагол, вопрос',
    r: ['a11-kasus', 'a11-akkusativ', 'a12-dativ', 'a12-dativ-verben', 'b11-genitiv'],
    b: `<p class="gd-key"><b>Коротко:</b> сначала ищите предлог, потом смотрите на глагол, потом задавайте вопрос к слову.</p>
<ol><li><b>Перед словом есть предлог?</b> Тогда падеж задаёт предлог: <i>mit <b>dem</b> Bus</i> (mit всегда Dativ), <i>für <b>den</b> Bus</i> (für всегда Akkusativ). Списки — в шпаргалке «Какой падеж после предлога».</li>
<li><b>Это тот, кто действует?</b> Вопрос «кто? что?» → <b>Nominativ</b>: <i><b>Der Hund</b> bellt.</i> После <i>sein, werden, bleiben, heißen</i> обе части в Nominativ: <i>Er ist <b>ein guter Arzt</b>.</i></li>
<li><b>Глагол требует Dativ?</b> <i>helfen, danken, gefallen, gehören, gratulieren, antworten, passen, schmecken, fehlen, folgen</i> → <b>Dativ</b>: <i>Ich helfe <b>dem</b> Mann.</i></li>
<li><b>Кому? (получатель)</b> → <b>Dativ</b>. <b>Кого? что?</b> → <b>Akkusativ</b>: <i>Ich gebe <b>dem</b> Kind (кому) <b>den</b> Ball (что).</i></li>
<li><b>Чей?</b> → <b>Genitiv</b>: <i>das Auto <b>meines</b> Vaters</i>. В разговоре чаще говорят <i>von + Dativ</i>: <i>das Auto von meinem Vater</i>.</li></ol>
<p><b>Где русский язык подводит:</b></p>
<ul><li><i>anrufen</i> (звонить <u>кому</u>) → Akkusativ: <i>Ich rufe <b>dich</b> an.</i></li>
<li><i>fragen</i> (спрашивать) → Akkusativ: <i>Ich frage <b>den</b> Lehrer.</i></li>
<li><i>es gibt</i> (есть, имеется) → Akkusativ: <i>Es gibt <b>einen</b> Park.</i></li>
<li>«Мне холодно, мне нравится» → Dativ: <i><b>Mir</b> ist kalt. Das gefällt <b>mir</b>.</i></li></ul>
<p><b>Как узнать падеж в готовом тексте — по артиклю:</b></p>
<table><tr><th>Артикль</th><th>Что это может быть</th></tr>
<tr><td><b>den / einen</b></td><td>Akkusativ m; <b>den</b> ещё Dativ мн. ч. (+ -n у существительного)</td></tr>
<tr><td><b>dem / einem</b></td><td>Dativ m или n</td></tr>
<tr><td><b>des / eines</b></td><td>Genitiv m или n (+ -s у существительного)</td></tr>
<tr><td><b>der</b></td><td>Nominativ m, или Dativ / Genitiv f, или Genitiv мн. ч.</td></tr>
<tr><td><b>die, das</b></td><td>Nominativ или Akkusativ</td></tr></table>`,
  },
  {
    id: 'praesens', lvl: 'A1', t: 'Как поставить глагол в нужную форму',
    s: 'Окончания по лицам и где меняется гласная',
    r: ['a11-praesens', 'a11-pron-sein', 'a11-haben', 'a12-modal'],
    b: `<p class="gd-key"><b>Коротко:</b> отрежьте -en, добавьте окончание лица. У сильных глаголов гласная меняется только у du и er/sie/es.</p>
<p><b>Шаг 1. Найдите основу:</b> <i>mach<s>en</s> → mach-</i>, <i>wohn<s>en</s> → wohn-</i>.</p>
<p><b>Шаг 2. Добавьте окончание:</b></p>
<table><tr><th>Лицо</th><th>Окончание</th><th>machen</th></tr>
<tr><td>ich</td><td>-e</td><td>mache</td></tr><tr><td>du</td><td>-st</td><td>machst</td></tr><tr><td>er / sie / es</td><td>-t</td><td>macht</td></tr>
<tr><td>wir</td><td>-en</td><td>machen</td></tr><tr><td>ihr</td><td>-t</td><td>macht</td></tr><tr><td>sie / Sie</td><td>-en</td><td>machen</td></tr></table>
<p><b>Шаг 3. Проверьте особые случаи.</b></p>
<ul><li>Основа на <b>-t, -d</b> (и -chn, -ffn) → вставьте <b>-e-</b>: <i>du arbeit<b>e</b>st, er find<b>e</b>t, ihr arbeit<b>e</b>t</i>.</li>
<li>Основа на <b>-s, -ß, -z</b> → у du только <b>-t</b>: <i>du heißt, du tanzt</i>.</li>
<li><b>Сильные глаголы</b> меняют гласную только у <b>du</b> и <b>er/sie/es</b>: <i>e → i</i> (sprechen → du sprichst), <i>e → ie</i> (sehen → er sieht), <i>a → ä</i> (fahren → du fährst), <i>au → äu</i> (laufen → er läuft). У ich, wir, ihr, sie гласная не меняется никогда.</li>
<li><b>Модальные и wissen:</b> у ich и er одинаковая форма без окончания: <i>ich kann — er kann, ich weiß — er weiß</i>.</li>
<li><b>Запомнить целиком:</b> <i>sein</i> (bin, bist, ist, sind, seid, sind), <i>haben</i> (du hast, er hat), <i>werden</i> (du wirst, er wird).</li></ul>
<p class="small muted">Как узнать, сильный ли глагол: по виду нельзя, смотрите таблицу неправильных глаголов. Зато проверить себя легко: у ich гласная всегда как в инфинитиве.</p>`,
  },
  {
    id: 'wortstellung', lvl: 'A1', t: 'Куда ставить глагол',
    s: '2-е место, 1-е место, конец и рамка',
    r: ['a11-wortstellung', 'a11-w-fragen', 'a12-satzklammer', 'a21-weil-dass'],
    b: `<p class="gd-key"><b>Коротко:</b> спрягаемый глагол стоит на 2-м месте. В вопросе без W-слова и в просьбе — на 1-м. В придаточном — в конце.</p>
<table><tr><th>Тип предложения</th><th>Место</th><th>Пример</th></tr>
<tr><td>Утверждение</td><td><b>2</b></td><td>Ich <b>lerne</b> heute. / Heute <b>lerne</b> ich.</td></tr>
<tr><td>Вопрос с W-словом</td><td><b>2</b></td><td>Wann <b>lernst</b> du?</td></tr>
<tr><td>Вопрос «да/нет»</td><td><b>1</b></td><td><b>Lernst</b> du heute?</td></tr>
<tr><td>Просьба, приказ</td><td><b>1</b></td><td><b>Komm</b> bitte! <b>Kommen</b> Sie bitte!</td></tr>
<tr><td>Придаточное (weil, dass, ob…)</td><td><b>конец</b></td><td>…, weil ich heute <b>lerne</b>.</td></tr></table>
<p><b>«Место» — это не слово, а смысловой блок.</b> <i>Am nächsten Montag</i> — одно место, поэтому: <i>Am nächsten Montag <b>fahre</b> ich nach Berlin.</i> Если первое место занято не подлежащим, подлежащее идёт сразу после глагола: <i>Morgen <b>gehe ich</b> ins Kino.</i></p>
<p><b>Вторая часть сказуемого уходит в самый конец</b> — получается «рамка»:</p>
<ul><li>инфинитив после модального: <i>Ich <b>kann</b> heute nicht <b>kommen</b>.</i></li>
<li>Partizip II в Perfekt: <i>Ich <b>habe</b> das Buch <b>gelesen</b>.</i></li>
<li>отделяемая приставка: <i>Der Zug <b>fährt</b> um acht <b>ab</b>.</i></li></ul>
<p><b>Проверьте себя:</b> найдите глагол, который меняется по лицам, и посчитайте, сколько смысловых блоков стоит перед ним. В утверждении должен быть ровно один.</p>`,
  },
  {
    id: 'negation', lvl: 'A1', t: 'nicht или kein — и куда ставить nicht',
    s: 'Выбор отрицания и его место',
    r: ['a11-negation'],
    b: `<p class="gd-key"><b>Коротко:</b> <b>kein</b> — когда отрицаете существительное с ein/eine или без артикля. Во всех остальных случаях — <b>nicht</b>.</p>
<ol><li>Существительное с <i>ein/eine</i> → <b>kein</b>: <i>Ich habe ein Auto. → Ich habe <b>kein</b> Auto.</i></li>
<li>Существительное без артикля → <b>kein</b>: <i>Ich habe Zeit. → Ich habe <b>keine</b> Zeit.</i></li>
<li>Существительное с <i>der/die/das, mein, dieser</i> → <b>nicht</b>: <i>Ich kaufe das Auto <b>nicht</b>.</i></li>
<li>Глагол, прилагательное, наречие, имя → <b>nicht</b>: <i>Ich komme <b>nicht</b>. Das ist <b>nicht</b> gut. Das ist <b>nicht</b> Anna.</i></li></ol>
<p><i>kein</i> склоняется как <i>ein</i>: <i>Ich habe kein<b>en</b> Hund. Wir haben kein<b>e</b> Kinder.</i></p>
<p><b>Куда ставить nicht.</b></p>
<ul><li>Отрицаете всё предложение → <b>nicht</b> ближе к концу, но <b>перед</b> второй частью глагола, прилагательным после sein и направлением: <i>Ich komme heute <b>nicht</b>. Ich kann heute <b>nicht</b> kommen. Er ist <b>nicht</b> krank. Ich fahre <b>nicht</b> nach Berlin.</i></li>
<li>Отрицаете одно слово → <b>nicht</b> прямо перед ним, часто с <i>sondern</i>: <i>Ich komme <b>nicht</b> heute, sondern morgen.</i></li></ul>
<p><b>Ответ «да» на отрицательный вопрос — doch:</b> <i>Kommst du nicht? — <b>Doch</b>, ich komme!</i></p>`,
  },
  {
    id: 'plural', lvl: 'A1', t: 'Как образовать множественное число',
    s: 'Типичные окончания по роду и форме слова',
    r: ['a11-plural'],
    b: `<p class="gd-key"><b>Коротко:</b> точную форму знает только словарь, но есть надёжные тенденции. Артикль во множественном числе всегда <b>die</b>.</p>
<table><tr><th>Какое слово</th><th>Мн. ч.</th><th>Пример</th></tr>
<tr><td>женский род (почти все)</td><td>-(e)n</td><td>die Lampe → Lampe<b>n</b>, die Frau → Frau<b>en</b>, die Zeitung → Zeitung<b>en</b></td></tr>
<tr><td>женский на -in</td><td>-nen</td><td>die Lehrerin → Lehrerin<b>nen</b></td></tr>
<tr><td>m и n на -er, -el, -en</td><td>без окончания, иногда умлаут</td><td>der Lehrer → Lehrer, der Apfel → <b>Ä</b>pfel</td></tr>
<tr><td>-chen, -lein</td><td>без изменений</td><td>das Mädchen → Mädchen</td></tr>
<tr><td>мужской, односложный</td><td>-e, часто умлаут</td><td>der Tisch → Tisch<b>e</b>, der Stuhl → St<b>ü</b>hl<b>e</b></td></tr>
<tr><td>средний, односложный</td><td>часто -er + умлаут</td><td>das Kind → Kind<b>er</b>, das Haus → H<b>ä</b>us<b>er</b></td></tr>
<tr><td>на -a, -i, -o, -u, -y; иностранные</td><td>-s</td><td>das Auto → Auto<b>s</b>, das Handy → Handy<b>s</b></td></tr>
<tr><td>мужской на -e (люди, животные)</td><td>-n</td><td>der Kollege → Kollege<b>n</b></td></tr></table>
<p><b>В Dativ множественного числа</b> добавляется <b>-n</b>, если его ещё нет и слово не на -s: <i>mit den Kinder<b>n</b>, mit den Freunde<b>n</b></i>, но <i>mit den Autos</i>.</p>`,
  },
  {
    id: 'du-sie', lvl: 'A1', t: 'du, ihr или Sie — и как понять, что значит sie',
    s: 'Обращение и три значения sie',
    r: ['a11-pron-sein', 'a11-praesens'],
    b: `<p class="gd-key"><b>Коротко:</b> с незнакомыми взрослыми, в учреждениях и на работе — <b>Sie</b>. С друзьями, семьёй и детьми — <b>du</b> (одному) и <b>ihr</b> (нескольким).</p>
<ul><li><b>Sie</b> всегда с большой буквы, глагол как у <i>wir</i>: <i>Kommen <b>Sie</b> morgen?</i> Это и «вы» одному человеку, и нескольким.</li>
<li>Если не уверены — говорите <b>Sie</b>. Перейти на «ты» обычно предлагает старший или начальник: <i>Wollen wir uns duzen?</i></li></ul>
<p><b>Как понять sie / Sie в тексте:</b></p>
<table><tr><th>Видите</th><th>Значит</th><th>Пример</th></tr>
<tr><td>sie + глагол на <b>-t</b></td><td>она</td><td><i>sie komm<b>t</b></i></td></tr>
<tr><td>sie + глагол на <b>-en</b></td><td>они</td><td><i>sie komm<b>en</b></i></td></tr>
<tr><td><b>Sie</b> с большой буквы в середине</td><td>вы (вежливо)</td><td><i>Kommen <b>Sie</b>?</i></td></tr></table>
<p class="small muted">В начале предложения «Sie» всегда с большой буквы — тогда «вы» или «они» понятно только из ситуации.</p>`,
  },
  {
    id: 'kleine-woerter', lvl: 'A1', t: 'zum, um, am, im, in, an: какое слово когда',
    s: 'Время, место, направление, цель и слитные формы',
    r: ['a12-zeitangaben', 'a12-praep-dativ', 'a21-lokal', 'a21-wechselpraep'],
    b: `<p class="gd-key"><b>Коротко:</b> сначала решите, о чём фраза: о <b>времени</b>, о <b>месте</b> («где?»), о <b>направлении</b> («куда?») или о <b>цели</b>. Потом помните: <b>am, im, zum, zur, beim, vom, ins, ans</b> — это предлог, слитый с артиклем. А <b>um</b> — отдельный предлог, а не слияние.</p>
<p><b>Шаг 1. Разберите слитную форму.</b> Всё, что кончается на <b>-m</b> или <b>-r</b>, содержит артикль в Dativ; на <b>-s</b> — в Akkusativ.</p>
<table><tr><th>Слитно</th><th>Полностью</th><th>Пример</th></tr>
<tr><td><b>am</b></td><td>an dem</td><td>am Montag, am Fenster, am Meer</td></tr>
<tr><td><b>im</b></td><td>in dem</td><td>im Mai, im Kino (где?)</td></tr>
<tr><td><b>ans</b></td><td>an das</td><td>ans Meer, ans Fenster (куда?)</td></tr>
<tr><td><b>ins</b></td><td>in das</td><td>ins Kino, ins Bett (куда?)</td></tr>
<tr><td><b>zum</b></td><td>zu dem (der- и das-слова)</td><td>zum Arzt, zum Bahnhof, zum Essen</td></tr>
<tr><td><b>zur</b></td><td>zu der (die-слова)</td><td>zur Schule, zur Arbeit, zur Post</td></tr>
<tr><td><b>beim / vom</b></td><td>bei dem / von dem</td><td>beim Arzt, vom Bahnhof</td></tr></table>
<p class="small muted">zum или zur выбирают по роду: <i>der Arzt → zum Arzt, das Kino → zum Kino, die Bank → zur Bank</i>. Во множественном слияния нет: <i>zu den Eltern</i>.</p>
<p><b>Шаг 2. Если фраза о времени — задайте вопрос.</b></p>
<table><tr><th>Вопрос</th><th>Слово</th><th>Пример</th></tr>
<tr><td>Во сколько?</td><td><b>um</b></td><td>um 8 Uhr, um halb drei, um Mitternacht</td></tr>
<tr><td>Примерно во сколько?</td><td><b>gegen</b></td><td>gegen 8 Uhr (около восьми)</td></tr>
<tr><td>В какой день, какую часть дня?</td><td><b>am</b></td><td>am Montag, am Abend, am 3. Mai, am Wochenende</td></tr>
<tr><td>В каком месяце, сезоне?</td><td><b>im</b></td><td>im Mai, im Winter, im Jahr 2025</td></tr>
<tr><td>Ночью</td><td><b>in der</b></td><td>in der Nacht</td></tr>
<tr><td>Через сколько?</td><td><b>in</b> + Dat</td><td>in zwei Tagen, in einer Stunde</td></tr>
<tr><td>Сколько времени назад?</td><td><b>vor</b> + Dat</td><td>vor zwei Tagen, vor einem Jahr</td></tr>
<tr><td>Как долго уже (и сейчас тоже)?</td><td><b>seit</b> + Dat</td><td>seit einem Jahr, seit Montag</td></tr>
<tr><td>Начиная с (в будущем)?</td><td><b>ab</b></td><td>ab Montag, ab 9 Uhr</td></tr>
<tr><td>До какого момента?</td><td><b>bis</b></td><td>bis Freitag, bis 18 Uhr</td></tr>
<tr><td>К какому событию, на что?</td><td><b>zum / zur</b></td><td>zum Frühstück, zum Geburtstag, zur Hochzeit</td></tr></table>
<p><b>Ловушка:</b> русское «в» — это не всегда <i>in</i>. «В 8 часов» — <b>um</b> 8 Uhr, «в понедельник» — <b>am</b> Montag, «в мае» — <b>im</b> Mai. А «через неделю» — <b>in</b> einer Woche, не <i>nach</i>: <i>nach</i> значит «после чего-то» (<i>nach dem Essen</i>).</p>
<p><b>Шаг 3. Если фраза о месте — где? или куда?</b> Где → Dativ (<i>im, am, beim</i>). Куда → Akkusativ (<i>ins, ans</i>) или <i>zum / zur</i>.</p>
<table><tr><th>Смысл</th><th>Где?</th><th>Куда?</th></tr>
<tr><td><b>in</b> — внутри</td><td>im Kino, in der Stadt</td><td>ins Kino, in die Stadt</td></tr>
<tr><td><b>an</b> — у края, у стены, у воды</td><td>am Fenster, an der Wand, am Meer</td><td>ans Fenster, an die Wand, ans Meer</td></tr>
<tr><td><b>auf</b> — на поверхности</td><td>auf dem Tisch</td><td>auf den Tisch</td></tr>
<tr><td><b>zu / bei</b> — к человеку, к точке</td><td>beim Arzt, bei Anna</td><td>zum Arzt, zu Anna, zum Bahnhof</td></tr></table>
<p class="small muted"><i>ins Kino</i> — идёте внутрь смотреть фильм; <i>zum Kino</i> — идёте к зданию (например, встретиться у входа). Подробнее — в шпаргалке «Куда и где: nach, in, zu, an, auf, bei».</p>
<p><b>Шаг 4. Другие частые значения zum и um.</b></p>
<ul><li><b>zum + глагол с большой буквы</b> — «для чего»: <i>Papier zum Schreiben</i> (бумага для письма), <i>zum Mitnehmen</i> (с собой, навынос).</li>
<li><b>zum в устойчивых выражениях:</b> <i>zum Beispiel</i> (например), <i>zum Glück</i> (к счастью), <i>zum ersten Mal</i> (впервые), <i>zum Schluss</i> (в конце).</li>
<li><b>um</b> — вокруг: <i>um den Tisch</i>, <i>um die Ecke</i> (за углом); на сколько изменилось: <i>um 5 Euro teurer</i>; <i>es geht um …</i> (речь идёт о …).</li>
<li><b>um … zu</b> + инфинитив — «чтобы»: <i>Ich lerne Deutsch, um in Berlin zu arbeiten.</i> Подробнее — шпаргалка «um … zu или damit».</li>
<li><b>am + -sten</b> — «лучше всего, больше всего»: <i>am besten, am liebsten, am schnellsten</i>.</li></ul>
<p class="small muted">Слияния нет, если после предлога <i>ein</i>, <i>mein</i> и т. п. или если на артикль падает ударение: <i>zu einem Arzt, in dem Haus, in dem ich wohne</i>.</p>`,
  },

  /* ───────────── A2 ───────────── */
  {
    id: 'perfekt', lvl: 'A2', t: 'Perfekt: haben или sein, и как построить Partizip II',
    s: 'Выбор вспомогательного глагола и формы причастия',
    r: ['a12-perfekt', 'a21-perfekt'],
    b: `<p class="gd-key"><b>Коротко:</b> <b>sein</b> — движение из точки в точку и изменение состояния, плюс sein, bleiben, werden, passieren. Всё остальное — <b>haben</b>.</p>
<p><b>Шаг 1. haben или sein?</b></p>
<ul><li><b>sein:</b> перемещение — <i>gehen, fahren, fliegen, kommen, laufen, reisen, umziehen</i>; изменение состояния — <i>aufstehen, einschlafen, aufwachen, sterben, wachsen</i>; а также <i>sein, bleiben, werden, passieren</i>.</li>
<li><b>haben:</b> всё остальное, в том числе все возвратные глаголы (<i>Ich habe mich gewaschen</i>) и почти все глаголы с Akkusativ.</li>
<li>Тонкость: <i>Ich <b>bin</b> nach Berlin gefahren</i> (сам ехал), но <i>Ich <b>habe</b> das Auto gefahren</i> (вёл машину — есть Akkusativ).</li></ul>
<p><b>Шаг 2. Какой Partizip II?</b></p>
<ol><li><b>Слабый глагол:</b> ge- + основа + <b>-t</b>: <i>machen → <b>ge</b>mach<b>t</b>, arbeiten → <b>ge</b>arbeit<b>et</b></i>.</li>
<li><b>Сильный глагол:</b> ge- + основа (часто с другой гласной) + <b>-en</b>: <i>fahren → gefahren, schreiben → geschrieben, trinken → getrunken</i>. Учите по таблице.</li>
<li><b>Смешанные:</b> меняют основу, но кончаются на -t: <i>bringen → gebracht, denken → gedacht, wissen → gewusst, kennen → gekannt</i>.</li>
<li><b>Без ge-:</b> глаголы на <b>-ieren</b> (<i>studiert, telefoniert</i>) и с неотделяемой приставкой be-, ver-, er-, ent-… (<i>besucht, verstanden, erzählt, bekommen</i>).</li>
<li><b>Отделяемая приставка:</b> ge- встаёт внутрь: <i>aufstehen → auf<b>ge</b>standen, einkaufen → ein<b>ge</b>kauft</i>.</li></ol>
<p><b>Шаг 3. Порядок:</b> haben/sein на 2-м месте, Partizip II в самом конце: <i>Ich <b>bin</b> gestern früh <b>aufgestanden</b>.</i></p>`,
  },
  {
    id: 'prefix', lvl: 'A2', t: 'Приставка: отделяется или нет',
    s: 'Какие приставки отделяются и где они стоят',
    r: ['a12-trennbar', 'a12-perfekt'],
    b: `<p class="gd-key"><b>Коротко:</b> be-, ge-, er-, ver-, zer-, ent-, emp-, miss- не отделяются никогда. Почти все остальные приставки отделяются — и на них падает ударение.</p>
<table><tr><th>Не отделяются</th><th>Отделяются (ударные)</th></tr>
<tr><td>be-, ge-, er-, ver-, zer-, ent-, emp-, miss-</td><td>ab-, an-, auf-, aus-, bei-, ein-, mit-, nach-, vor-, weg-, zu-, zurück-, fern-, fest-, los-</td></tr>
<tr><td><i>bezahlen → ich bezahle → bezahlt</i></td><td><i>anrufen → ich rufe an → angerufen</i></td></tr></table>
<p><b>Спорные приставки</b> durch-, über-, um-, unter-, wieder- бывают и такими, и такими. Подсказка — ударение: если ударение на приставке, она отделяется. <i>wiederholen</i> (повторять, ударение на -ho-) → <i>ich wiederhole</i>; <i>übersetzen</i> (переводить) → <i>ich übersetze</i>.</p>
<p><b>Где стоит отделяемая приставка:</b></p>
<ul><li>обычное предложение — в самом конце: <i>Ich <b>stehe</b> um sieben <b>auf</b>.</i></li>
<li>после модального и в придаточном — слитно в конце: <i>Ich muss früh <b>aufstehen</b>. …, weil ich früh <b>aufstehe</b>.</i></li>
<li>с zu и ge- — они встают внутрь: <i>auf<b>zu</b>stehen, auf<b>ge</b>standen</i>.</li></ul>`,
  },
  {
    id: 'praep', lvl: 'A2', t: 'Какой падеж после предлога',
    s: 'Четыре списка предлогов и слияния с артиклем',
    r: ['a12-praep-dativ', 'a21-wechselpraep', 'b11-genitiv', 'a11-akkusativ'],
    b: `<p class="gd-key"><b>Коротко:</b> у каждого предлога свой падеж, и он не меняется. Исключение — 9 предлогов места, у них падеж зависит от вопроса «где?» или «куда?».</p>
<table><tr><th>Падеж</th><th>Предлоги</th><th>Пример</th></tr>
<tr><td><b>Akkusativ</b></td><td>durch, für, gegen, ohne, um, bis</td><td><i>für <b>dich</b>, ohne <b>meinen</b> Mann</i></td></tr>
<tr><td><b>Dativ</b></td><td>aus, bei, mit, nach, seit, von, zu, gegenüber, ab</td><td><i>mit <b>dem</b> Bus, seit <b>einem</b> Jahr</i></td></tr>
<tr><td><b>Akk или Dat</b></td><td>an, auf, hinter, in, neben, über, unter, vor, zwischen</td><td>куда? → Akk, где? → Dat</td></tr>
<tr><td><b>Genitiv</b></td><td>wegen, trotz, während, statt, innerhalb, außerhalb</td><td><i>wegen <b>des</b> Wetters</i></td></tr></table>
<p><b>Как запомнить:</b> списки короткие — 6 предлогов с Akk и 9 с Dat. Повторяйте их как стишок: «durch, für, gegen, ohne, um» и «aus, bei, mit, nach, seit, von, zu».</p>
<p><b>Слияния предлога с артиклем</b> встречаются постоянно:</p>
<table><tr><th>Слитно</th><th>Полностью</th></tr>
<tr><td>zum / zur</td><td>zu dem / zu der</td></tr><tr><td>beim, vom</td><td>bei dem, von dem</td></tr>
<tr><td>im / ins</td><td>in dem (где) / in das (куда)</td></tr><tr><td>am / ans</td><td>an dem (где) / an das (куда)</td></tr></table>
<p class="small muted">Видите <b>zum, beim, vom, im, am</b> — это Dativ. Видите <b>ins, ans</b> — это Akkusativ.</p>`,
  },
  {
    id: 'wo-wohin', lvl: 'A2', t: 'Wechselpräpositionen: Akkusativ или Dativ',
    s: 'Где? или куда? — и глаголы-подсказки',
    r: ['a21-wechselpraep', 'a21-stellen'],
    b: `<p class="gd-key"><b>Коротко:</b> <b>wohin?</b> (куда, движение к месту) → Akkusativ. <b>wo?</b> (где, место) → Dativ.</p>
<ol><li>Это один из девяти предлогов: <i>an, auf, hinter, in, neben, über, unter, vor, zwischen</i>? Если нет — смотрите шпаргалку «Какой падеж после предлога».</li>
<li>Задайте вопрос к фразе с предлогом: <b>куда?</b> или <b>где?</b></li>
<li>Куда → <b>Akk</b>: <i>Ich lege das Buch auf <b>den</b> Tisch.</i> Где → <b>Dat</b>: <i>Das Buch liegt auf <b>dem</b> Tisch.</i></li></ol>
<p><b>Глагол часто подсказывает сам:</b></p>
<table><tr><th>→ Akkusativ (куда)</th><th>→ Dativ (где)</th></tr>
<tr><td>stellen, legen, setzen, hängen (hängte)</td><td>stehen, liegen, sitzen, hängen (hing)</td></tr>
<tr><td>gehen, fahren, bringen, laufen …</td><td>sein, wohnen, arbeiten, warten, bleiben …</td></tr></table>
<p><b>Ловушка:</b> движение <u>внутри</u> места — это «где»: <i>Wir laufen <b>im</b> Park</i> (бегаем в парке) — но <i>Wir laufen <b>in den</b> Park</i> (бежим в парк).</p>
<p><b>Во времени</b> эти предлоги берут Dativ: <i>am Montag, im Mai, vor einer Woche</i>.</p>`,
  },
  {
    id: 'kuda', lvl: 'A2', t: 'Куда и где: nach, in, zu, an, auf, bei',
    s: 'Выбор предлога для места и направления',
    r: ['a21-lokal', 'a12-praep-dativ'],
    b: `<p class="gd-key"><b>Коротко:</b> город или страна без артикля → <b>nach</b>; внутрь → <b>in</b>; к человеку или точке → <b>zu</b>; к воде → <b>an</b>; на площадку или мероприятие → <b>auf</b>.</p>
<table><tr><th>Куда?</th><th>Где?</th><th>Когда</th></tr>
<tr><td><b>nach</b> Berlin, nach Spanien</td><td><b>in</b> Berlin, in Spanien</td><td>города и страны без артикля</td></tr>
<tr><td><b>in</b> die Schweiz, in die USA</td><td><b>in</b> der Schweiz</td><td>страны с артиклем</td></tr>
<tr><td><b>in</b> die Stadt, ins Kino</td><td><b>in</b> der Stadt, im Kino</td><td>внутрь здания, помещения</td></tr>
<tr><td><b>zu</b>m Arzt, zu Anna</td><td><b>bei</b>m Arzt, bei Anna</td><td>к человеку, у человека</td></tr>
<tr><td><b>zu</b>m Bahnhof, zur Haltestelle</td><td><b>am</b> Bahnhof, an der Haltestelle</td><td>к точке, когда «внутрь» не важно</td></tr>
<tr><td><b>an</b> den Strand, ans Meer</td><td><b>am</b> Strand, am Meer</td><td>к воде, к краю</td></tr>
<tr><td><b>auf</b> den Markt, auf eine Party</td><td><b>auf</b> dem Markt, auf der Party</td><td>открытая площадка, мероприятие, остров</td></tr>
<tr><td>nach Hause</td><td>zu Hause</td><td>домой / дома</td></tr></table>
<p><b>Откуда:</b> <i>aus</i> — изнутри, из страны или города (<i>aus Berlin, aus dem Haus</i>); <i>von</i> — от человека или с места (<i>vom Arzt, von der Arbeit</i>).</p>`,
  },
  {
    id: 'adj', lvl: 'A2', t: 'Окончание прилагательного: алгоритм',
    s: 'Четыре шага от артикля к окончанию',
    r: ['a21-adj-dekl1', 'a22-adj-dekl2', 'b11-adj-komplett'],
    b: `<p class="gd-key"><b>Коротко:</b> если артикль уже показал род и падеж, прилагательному достаточно <b>-e</b> или <b>-en</b>. Если не показал — прилагательное показывает их само.</p>
<ol><li><b>Прилагательное стоит после существительного или после sein?</b> Тогда окончания нет: <i>Das Auto ist neu.</i></li>
<li><b>Перед ним der, die, das, dieser, jeder, welcher, alle?</b> Только <b>-e</b> или <b>-en</b>. <b>-e</b> — в пяти случаях: Nominativ ед. ч. всех родов и Akkusativ f и n. Во всех остальных — <b>-en</b>.<br><i>der neu<b>e</b> Tisch, die neu<b>e</b> Lampe, das neu<b>e</b> Auto — den neu<b>en</b> Tisch, mit dem neu<b>en</b> Auto, die neu<b>en</b> Bücher</i></li>
<li><b>Перед ним ein, kein, mein, dein…?</b> Посмотрите на сам артикль. Если у него нет окончания (<i>ein</i> Tisch в Nom; <i>ein</i> Auto в Nom и Akk), прилагательное берёт «недостающее»: <b>-er</b> для m, <b>-es</b> для n: <i>ein neu<b>er</b> Tisch, ein neu<b>es</b> Auto</i>. В остальных случаях — как в шаге 2: <i>eine neu<b>e</b> Lampe, einen neu<b>en</b> Tisch, meine neu<b>en</b> Schuhe</i>.</li>
<li><b>Артикля нет?</b> Прилагательное берёт окончание определённого артикля: der → <b>-er</b>, die → <b>-e</b>, das → <b>-es</b>, dem → <b>-em</b>, den → <b>-en</b>: <i>kalt<b>er</b> Kaffee, kalt<b>e</b> Milch, kalt<b>es</b> Wasser, mit kalt<b>em</b> Wasser</i>.</li></ol>
<p><b>Главная идея:</b> «сигнал» рода (-r, -e, -s, -m, -n) звучит один раз — либо в артикле, либо в прилагательном: <i>de<b>r</b> neue</i>, но <i>ein neue<b>r</b></i>.</p>
<p class="small muted">После <i>viele, einige, ein paar</i> и чисел — как без артикля: <i>viele neu<b>e</b> Bücher, zwei klein<b>e</b> Kinder</i>.</p>`,
  },
  {
    id: 'tense', lvl: 'A2', t: 'Какое прошедшее время выбрать — и как узнать время в тексте',
    s: 'Perfekt, Präteritum, Plusquamperfekt',
    r: ['a12-perfekt', 'a21-praeteritum-basis', 'a22-praeteritum', 'b11-plusquamperfekt'],
    b: `<p class="gd-key"><b>Коротко:</b> говорите — Perfekt. Пишете рассказ или читаете новости — Präteritum. Но sein, haben и модальные даже в разговоре — в Präteritum.</p>
<table><tr><th>Время и когда</th><th>Пример</th></tr>
<tr><td><b>Perfekt</b><br>разговор, сообщения, письма друзьям</td><td><i>Ich habe gestern Pizza gegessen.</i></td></tr>
<tr><td><b>Präteritum</b><br>книги, новости, официальные тексты</td><td><i>Er öffnete die Tür und ging hinaus.</i></td></tr>
<tr><td><b>Präteritum в речи</b><br>sein, haben, модальные, es gab</td><td><i>Ich war krank. Ich hatte keine Zeit. Ich musste arbeiten.</i></td></tr>
<tr><td><b>Plusquamperfekt</b><br>что-то случилось раньше другого прошлого</td><td><i>Nachdem ich gegessen hatte, ging ich spazieren.</i></td></tr></table>
<p><b>Как узнать время в тексте:</b></p>
<ul><li><b>hat / ist</b> + Partizip II в конце → Perfekt: <i>Er <b>hat</b> … <b>gemacht</b>.</i></li>
<li><b>hatte / war</b> + Partizip II → Plusquamperfekt: <i>Er <b>hatte</b> … <b>gemacht</b>.</i></li>
<li>глагол с <b>-te</b> или с другой гласной без вспомогательного → Präteritum: <i>mach<b>te</b>, g<b>i</b>ng, k<b>a</b>m</i>.</li>
<li><b>wird</b> + инфинитив → будущее; <b>wird</b> + Partizip II → пассив (см. «werden: какая роль»).</li></ul>
<p class="small muted">О будущем чаще говорят в Präsens + слово времени: <i>Morgen fahre ich nach Berlin.</i></p>`,
  },
  {
    id: 'wenn-als', lvl: 'A2', t: '«Когда»: wenn, als или wann',
    s: 'Три вопроса, чтобы выбрать',
    r: ['a22-wenn-als'],
    b: `<p class="gd-key"><b>Коротко:</b> <b>wann</b> — вопрос «в какое время?». <b>als</b> — один раз в прошлом. <b>wenn</b> — всё остальное: повторы, настоящее, будущее, «если».</p>
<ol><li><b>Это вопрос</b> (прямой или «я не знаю, когда…»)? → <b>wann</b>: <i>Wann kommst du? Ich weiß nicht, wann er kommt.</i></li>
<li><b>Прошлое, и это было один раз</b> (или один период жизни)? → <b>als</b>: <i>Als ich ankam, regnete es. Als ich Kind war, wohnte ich in Kiew.</i></li>
<li><b>Повторялось в прошлом</b> («каждый раз, когда»)? → <b>wenn</b>, часто с <i>immer</i>: <i>Immer wenn ich in Berlin war, besuchte ich Anna.</i></li>
<li><b>Настоящее или будущее</b>? → <b>wenn</b>: <i>Wenn ich nach Hause komme, rufe ich dich an.</i></li>
<li><b>«Если»</b>? → <b>wenn</b> (или falls): <i>Wenn es regnet, bleiben wir zu Hause.</i></li></ol>
<p class="small muted">После wenn и als глагол стоит в конце. У als есть и другие значения: <i>größer als</i> (больше, чем), <i>als Lehrer</i> (в качестве учителя).</p>`,
  },
  {
    id: 'konnektoren', lvl: 'A2', t: 'Связка: где глагол после неё',
    s: 'und/aber, deshalb/trotzdem, weil/dass',
    r: ['a21-weil-dass', 'a22-konnektoren', 'a22-ob', 'b11-obwohl'],
    b: `<p class="gd-key"><b>Коротко:</b> место глагола определяет связка. Их три группы — запомните, в какой группе каждая.</p>
<table><tr><th>Связки</th><th>Где глагол</th></tr>
<tr><td><b>Нулевая позиция:</b><br>und, aber, oder, denn, sondern</td><td>как обычно, на 2-м месте после подлежащего<br><i>…, denn ich <b>bin</b> krank.</i></td></tr>
<tr><td><b>Наречия-связки:</b><br>deshalb, deswegen, trotzdem, sonst, dann, danach, außerdem, also</td><td>сразу после связки<br><i>…, deshalb <b>bleibe</b> ich zu Hause.</i></td></tr>
<tr><td><b>Подчинительные:</b><br>weil, dass, ob, wenn, als, obwohl, damit, bevor, nachdem, während, bis, seit, sobald, falls, W-слова</td><td>в конце<br><i>…, weil ich krank <b>bin</b>.</i></td></tr></table>
<p><b>Один смысл — три способа:</b></p>
<ul><li><i>Ich bleibe zu Hause, <b>denn</b> ich bin krank.</i></li>
<li><i>Ich bin krank, <b>deshalb</b> bleibe ich zu Hause.</i></li>
<li><i>Ich bleibe zu Hause, <b>weil</b> ich krank bin.</i></li></ul>
<p><b>Придаточное в начале</b> занимает 1-е место, поэтому глагол главного предложения идёт сразу после запятой — «глагол, запятая, глагол»: <i>Weil ich krank <b>bin</b>, <b>bleibe</b> ich zu Hause.</i></p>
<p><b>В придаточном со сложным сказуемым</b> спрягаемый глагол — самый последний: <i>…, weil ich nicht kommen <b>kann</b>. …, weil ich krank gewesen <b>bin</b>.</i></p>`,
  },
  {
    id: 'mittelfeld', lvl: 'A2', t: 'Порядок слов в середине: кому, что, когда, где',
    s: 'Два дополнения и обстоятельства',
    r: ['a21-zwei-objekte', 'a12-pronomen'],
    b: `<p class="gd-key"><b>Коротко:</b> два существительных — сначала Dativ (кому), потом Akkusativ (что). Местоимения идут раньше существительных.</p>
<table><tr><th>Случай</th><th>Порядок</th><th>Пример</th></tr>
<tr><td>оба существительные</td><td>Dat → Akk</td><td><i>Ich gebe <b>dem Kind</b> <b>den Ball</b>.</i></td></tr>
<tr><td>одно — местоимение</td><td>местоимение первым</td><td><i>Ich gebe <b>ihm</b> den Ball. Ich gebe <b>ihn</b> dem Kind.</i></td></tr>
<tr><td>оба местоимения</td><td>Akk → Dat</td><td><i>Ich gebe <b>ihn ihm</b>.</i></td></tr></table>
<p><b>Обстоятельства — «Te-Ka-Mo-Lo»:</b> когда (temporal) → почему (kausal) → как (modal) → где/куда (lokal).</p>
<p><i>Ich fahre <b>morgen</b> <b>wegen der Arbeit</b> <b>mit dem Zug</b> <b>nach Berlin</b>.</i></p>
<p class="small muted">Это порядок по умолчанию. Любой блок можно вынести на 1-е место, чтобы его подчеркнуть: <i>Morgen fahre ich …</i></p>`,
  },
  {
    id: 'reflexiv', lvl: 'A2', t: 'Возвратное местоимение: mich или mir',
    s: 'Akkusativ или Dativ у sich',
    r: ['a22-reflexiv'],
    b: `<p class="gd-key"><b>Коротко:</b> если в предложении есть ещё одно дополнение в Akkusativ, возвратное местоимение — в Dativ (<b>mir, dir</b>). Если нет — в Akkusativ (<b>mich, dich</b>).</p>
<table><tr><th>Лицо</th><th>Akk</th><th>Dat</th></tr>
<tr><td>ich</td><td>mich</td><td>mir</td></tr><tr><td>du</td><td>dich</td><td>dir</td></tr>
<tr><td>er / sie / es</td><td>sich</td><td>sich</td></tr><tr><td>wir</td><td>uns</td><td>uns</td></tr>
<tr><td>ihr</td><td>euch</td><td>euch</td></tr><tr><td>sie / Sie</td><td>sich</td><td>sich</td></tr></table>
<ul><li><i>Ich wasche <b>mich</b>.</i> — других дополнений нет → Akk.</li>
<li><i>Ich wasche <b>mir</b> die Hände.</i> — «die Hände» уже Akk → Dat.</li>
<li><i>Ich kaufe <b>mir</b> ein Handy. Ich merke <b>mir</b> das Wort.</i></li></ul>
<p class="small muted">Разница видна только у ich и du. И не переводите русское «-ся» напрямую: «учиться» — <i>lernen</i> без sich, а «вспоминать» — <i>sich erinnern</i>.</p>`,
  },
  {
    id: 'verb-praep', lvl: 'A2', t: 'Глагол с предлогом: как спросить и чем заменить',
    s: 'worauf / auf wen, darauf / auf ihn',
    r: ['a22-verben-praep'],
    b: `<p class="gd-key"><b>Коротко:</b> о вещи — <b>wo(r)-</b> и <b>da(r)-</b> + предлог. О человеке — предлог + <b>wen/wem</b> или местоимение.</p>
<table><tr><th></th><th>Вещь, событие</th><th>Человек</th></tr>
<tr><td>Вопрос</td><td><i><b>Worauf</b> wartest du?</i></td><td><i><b>Auf wen</b> wartest du?</i></td></tr>
<tr><td>Ответ-замена</td><td><i>Ich warte <b>darauf</b>.</i></td><td><i>Ich warte <b>auf ihn</b>.</i></td></tr></table>
<p><b>-r- вставляется</b>, если предлог начинается с гласной: <i>wo<b>r</b>auf, wo<b>r</b>an, da<b>r</b>über</i>; иначе без него: <i>womit, dafür</i>.</p>
<p><b>Падеж у такого предлога фиксирован</b> — учите тройкой «глагол + предлог + падеж»: <i>warten auf + Akk, denken an + Akk, sich freuen auf/über + Akk, Angst haben vor + Dat, teilnehmen an + Dat, sprechen mit + Dat / über + Akk</i>.</p>
<p class="small muted">Подсказка: <b>auf</b> и <b>über</b> в связке с глаголом почти всегда берут Akkusativ. Если дальше идёт целое предложение: <i>Ich freue mich <b>darauf</b>, dass du kommst.</i></p>`,
  },
  {
    id: 'zu-inf', lvl: 'A2', t: 'Инфинитив: с zu или без',
    s: 'После каких слов zu не нужен',
    r: ['a22-zu-inf', 'a12-modal'],
    b: `<p class="gd-key"><b>Коротко:</b> без zu — после модальных глаголов, werden, lassen и глаголов восприятия. После большинства других глаголов, существительных и прилагательных — с zu.</p>
<table><tr><th>Без zu</th><th>С zu</th></tr>
<tr><td>können, müssen, wollen, sollen, dürfen, möchten</td><td>anfangen, aufhören, versuchen, vergessen, vorhaben, hoffen, beschließen</td></tr>
<tr><td>werden, würde, lassen</td><td>Lust / Zeit / Angst haben</td></tr>
<tr><td>sehen, hören, fühlen</td><td>es ist wichtig / schwer / schön</td></tr>
<tr><td>gehen, bleiben, lernen: <i>Ich gehe schwimmen.</i></td><td>um … zu, ohne … zu, statt … zu</td></tr></table>
<p><b>Где стоит zu:</b> прямо перед инфинитивом в конце: <i>Ich habe keine Lust, heute <b>zu</b> kochen.</i> У отделяемых глаголов — внутри: <i>an<b>zu</b>rufen, auf<b>zu</b>stehen</i>.</p>
<p><b>zu + инфинитив или dass?</b> Если подлежащее в обеих частях одно и то же — можно с zu: <i>Ich hoffe, dich bald <b>zu sehen</b>.</i> Если разное — только dass: <i>Ich hoffe, <b>dass du</b> bald kommst.</i></p>`,
  },
  {
    id: 'werden', lvl: 'A2', t: 'werden: какая из ролей',
    s: 'Стать, будущее, пассив, Konjunktiv II',
    r: ['a22-werden', 'b12-futur', 'b11-passiv', 'b11-konj2'],
    b: `<p class="gd-key"><b>Коротко:</b> смотрите, что стоит в конце вместе с werden: существительное или прилагательное, инфинитив или Partizip II.</p>
<table><tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr>
<tr><td>werden + сущ. / прил.</td><td>становиться</td><td><i>Er <b>wird</b> Arzt. Es <b>wird</b> kalt.</i></td></tr>
<tr><td>werden + инфинитив</td><td>будущее, предположение</td><td><i>Ich <b>werde</b> morgen <b>anrufen</b>. Er <b>wird</b> krank <b>sein</b>.</i></td></tr>
<tr><td>werden + Partizip II</td><td>пассив</td><td><i>Das Haus <b>wird gebaut</b>.</i></td></tr>
<tr><td>würde + инфинитив</td><td>Konjunktiv II (бы)</td><td><i>Ich <b>würde</b> gern <b>reisen</b>.</i></td></tr>
<tr><td>ist … geworden</td><td>Perfekt от «стать»</td><td><i>Er <b>ist</b> Arzt <b>geworden</b>.</i></td></tr>
<tr><td>ist … worden</td><td>Perfekt пассива</td><td><i>Das Haus <b>ist</b> gebaut <b>worden</b>.</i></td></tr></table>
<p class="small muted">Формы: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden; Präteritum — wurde.</p>`,
  },
  {
    id: 'komparation', lvl: 'A2', t: 'Сравнение: als или wie, и формы степеней',
    s: 'größer als, so groß wie, am größten',
    r: ['a21-komparation'],
    b: `<p class="gd-key"><b>Коротко:</b> одинаково → <b>so … wie</b>. По-разному → <b>-er als</b>. Самый → <b>am -sten</b> или <b>der/die/das -ste</b>.</p>
<ul><li><i>Anna ist <b>so</b> groß <b>wie</b> Tom.</i> — одинаково.</li>
<li><i>Anna ist größ<b>er als</b> Tom.</i> — больше, чем.</li>
<li><i>Anna ist <b>am</b> größ<b>ten</b>.</i> — после глагола. <i>Sie ist <b>die</b> größ<b>te</b> Schülerin.</i> — перед существительным.</li></ul>
<p><b>Как образовать:</b></p>
<ol><li>Добавьте <b>-er</b> и <b>-(e)sten</b>: <i>schnell → schneller → am schnellsten</i>.</li>
<li>Короткие слова с a, o, u часто получают умлаут: <i>alt → <b>ä</b>lter, groß → gr<b>ö</b>ßer, jung → j<b>ü</b>nger</i>.</li>
<li>После -t, -d, -s, -ß, -z — <b>-esten</b>: <i>am ältesten, am heißesten</i>.</li>
<li>Запомнить: <i>gut → besser → am besten, viel → mehr → am meisten, gern → lieber → am liebsten, hoch → höher → am höchsten</i>.</li></ol>`,
  },

  /* ───────────── B1 ───────────── */
  {
    id: 'relativ', lvl: 'B1', t: 'Относительное местоимение: der, den, dem, dessen…',
    s: 'Род — от слова, падеж — от роли в придаточном',
    r: ['b11-relativ', 'b12-relativ-erw'],
    b: `<p class="gd-key"><b>Коротко:</b> род и число берите от слова, к которому относится «который». Падеж — от его роли внутри придаточного.</p>
<ol><li>Найдите слово, к которому относится придаточное: <i><b>der Mann</b>, …</i> → мужской род, ед. ч.</li>
<li>Посмотрите на придаточное: какую роль там играет «который»? Подлежащее → Nom; кого/что → Akk; кому или после предлога с Dat → Dat; чей → Gen.</li>
<li>Есть предлог → он стоит перед местоимением и задаёт падеж: <i>der Mann, <b>mit dem</b> ich spreche</i>.</li>
<li>Глагол в придаточном — в конце.</li></ol>
<table><tr><th></th><th>m</th><th>f</th><th>n</th><th>мн. ч.</th></tr>
<tr><td>Nom</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Akk</td><td>den</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Dat</td><td>dem</td><td>der</td><td>dem</td><td><b>denen</b></td></tr>
<tr><td>Gen</td><td><b>dessen</b></td><td><b>deren</b></td><td><b>dessen</b></td><td><b>deren</b></td></tr></table>
<p><b>Разбор:</b> <i>Das ist der Mann, ___ ich gestern geholfen habe.</i> → Mann — m; helfen требует Dativ → <b>dem</b>.</p>
<p><b>Особые случаи:</b> <b>was</b> — после <i>alles, etwas, nichts, das</i>, после превосходной степени и после целого предложения: <i>Alles, <b>was</b> du sagst, stimmt.</i> <b>wo</b> — после места: <i>die Stadt, <b>wo</b> ich wohne</i>.</p>
<p class="small muted">Ловушка: падеж главного предложения не важен. <i>Ich sehe den Mann</i> (Akk), <i>der dort steht</i> (Nom — он стоит).</p>`,
  },
  {
    id: 'um-zu', lvl: 'B1', t: 'um … zu или damit (и ohne, statt)',
    s: 'Одно подлежащее или разные',
    r: ['b11-um-zu-damit', 'b12-ohne-statt'],
    b: `<p class="gd-key"><b>Коротко:</b> в обеих частях один и тот же человек → конструкция с <b>zu</b>. Разные люди → союз с придаточным: <b>damit, ohne dass, statt dass</b>.</p>
<table><tr><th></th><th>Одно подлежащее</th><th>Разные подлежащие</th></tr>
<tr><td>чтобы</td><td><i>Ich lerne, <b>um</b> die Prüfung <b>zu</b> bestehen.</i></td><td><i>Ich spreche langsam, <b>damit</b> du mich verstehst.</i></td></tr>
<tr><td>не делая, без того чтобы</td><td><i>Er geht, <b>ohne zu</b> grüßen.</i></td><td><i>Er geht, <b>ohne dass</b> ich es merke.</i></td></tr>
<tr><td>вместо того чтобы</td><td><i><b>Statt zu</b> lernen, spielt er.</i></td><td><i><b>Statt dass</b> er hilft, schaut er zu.</i></td></tr></table>
<p><b>Как проверить:</b> спросите «кто делает действие в первой части?» и «кто во второй?». Ответы совпали — берите zu.</p>
<p class="small muted">damit при одном подлежащем грамматически возможно, но um … zu звучит естественнее.</p>`,
  },
  {
    id: 'passiv', lvl: 'B1', t: 'Пассив: как построить и какой выбрать',
    s: 'Из актива в пассив, werden или sein',
    r: ['b11-passiv', 'b12-passiv-modal'],
    b: `<p class="gd-key"><b>Коротко:</b> дополнение в Akkusativ становится подлежащим, глагол — werden + Partizip II. Процесс → <b>werden</b>, результат → <b>sein</b>.</p>
<ol><li>Найдите в активе дополнение в Akkusativ: <i>Der Mechaniker repariert <b>das Auto</b>.</i></li>
<li>Сделайте его подлежащим (Nominativ): <i><b>Das Auto</b> …</i></li>
<li>Поставьте werden в нужное время, Partizip II — в конец: <i>Das Auto <b>wird</b> repariert.</i></li>
<li>Кто делал — <b>von + Dat</b> (человек), <b>durch + Akk</b> (средство, причина). Часто это опускают.</li></ol>
<table><tr><th>Время</th><th>Форма</th></tr>
<tr><td>Präsens</td><td><i>Das Auto <b>wird</b> repariert.</i></td></tr>
<tr><td>Präteritum</td><td><i>Das Auto <b>wurde</b> repariert.</i></td></tr>
<tr><td>Perfekt</td><td><i>Das Auto <b>ist</b> repariert <b>worden</b>.</i></td></tr>
<tr><td>с модальным</td><td><i>Das Auto <b>muss</b> repariert <b>werden</b>.</i></td></tr>
<tr><td>результат</td><td><i>Das Auto <b>ist</b> repariert.</i></td></tr></table>
<p><b>werden или sein?</b> Что происходит → werden: <i>Die Tür <b>wird</b> geöffnet</i> (её открывают). Какое сейчас состояние → sein: <i>Die Tür <b>ist</b> geöffnet</i> (открыта).</p>
<p class="small muted">Нет дополнения в Akkusativ — пассив без подлежащего: <i>Hier wird nicht geraucht.</i> В разговоре вместо пассива часто говорят с <i>man</i>: <i>Man repariert das Auto.</i></p>`,
  },
  {
    id: 'konj2', lvl: 'B1', t: 'Konjunktiv II: когда нужен и какую форму взять',
    s: 'würde + инфинитив или собственная форма',
    r: ['b11-konj2', 'b12-konj2-verg', 'a22-konj2-hoeflich'],
    b: `<p class="gd-key"><b>Коротко:</b> для sein, haben и модальных — собственные формы (wäre, hätte, könnte). Для остальных — würde + инфинитив.</p>
<p><b>Когда нужен:</b> мечта (<i>Wenn ich doch mehr Zeit <b>hätte</b>!</i>), нереальное условие (<i>Wenn ich reich <b>wäre</b>, <b>würde</b> ich reisen.</i>), вежливая просьба (<i><b>Könnten</b> Sie mir helfen?</i>), совет (<i>Du <b>solltest</b> mehr schlafen.</i>).</p>
<p><b>Какую форму взять:</b></p>
<ol><li><b>sein, haben, модальные</b> → своя форма: <i>wäre, hätte, könnte, müsste, dürfte</i>; без умлаута — <i>sollte, wollte</i>.</li>
<li><b>Несколько частых сильных</b> тоже часто своей формой: <i>käme, ginge, wüsste, es gäbe</i>.</li>
<li><b>Все остальные</b> → <b>würde + инфинитив</b>: <i>Ich <b>würde</b> gern <b>kommen</b>.</i></li></ol>
<p><b>О прошлом</b> (не сделал, а мог бы) → <b>hätte / wäre + Partizip II</b>; haben или sein — как в Perfekt: <i>Wenn ich das gewusst <b>hätte</b>, <b>wäre</b> ich gekommen.</i> С модальным: <i>Ich <b>hätte</b> kommen <b>sollen</b>.</i></p>
<p class="small muted">Как узнать в тексте: умлаут в форме прошедшего времени — <i>hatte → <b>hä</b>tte, war → <b>wä</b>re, konnte → <b>kö</b>nnte</i> — или würde.</p>`,
  },
  {
    id: 'indirekte', lvl: 'B1', t: 'Косвенная речь: какую форму взять',
    s: 'Konjunktiv I и когда его заменять',
    r: ['b12-indirekte-rede'],
    b: `<p class="gd-key"><b>Коротко:</b> в новостях и официальных текстах чужие слова передают Konjunktiv I. Если его форма совпадает с обычной — берите Konjunktiv II. В разговоре обычно хватает Indikativ.</p>
<ol><li><b>Образуйте Konjunktiv I:</b> основа + -e: <i>er sag<b>e</b>, er komm<b>e</b>, er hab<b>e</b>, er müss<b>e</b></i>. Особый глагол — sein: <i>ich sei, er sei, sie seien</i>.</li>
<li><b>Совпадает с Indikativ?</b> (<i>wir kommen, sie haben, ich habe</i>) → Konjunktiv II: <i>sie <b>hätten</b>, sie <b>kämen</b> / <b>würden</b> kommen</i>. На практике Konjunktiv I нужен почти только для er/sie/es и для sein.</li>
<li><b>Прошлое</b> → <b>habe / sei + Partizip II</b>: <i>Er sagt, er <b>habe</b> das Buch gelesen. Sie sagt, sie <b>sei</b> gekommen.</i></li>
<li><b>Вопрос</b> → ob или W-слово: <i>Er fragt, <b>ob</b> ich Zeit habe.</i> <b>Просьба</b> → sollen: <i>Sie sagt, ich <b>solle</b> warten.</i></li></ol>
<p class="small muted">Не забудьте поменять местоимения: «Ich komme morgen» → <i>Er sagt, <b>er</b> komme morgen.</i></p>`,
  },
  {
    id: 'genitiv', lvl: 'B1', t: 'Genitiv: когда нужен и как образовать',
    s: 'Предлоги, принадлежность, окончание -s',
    r: ['b11-genitiv', 'a11-kasus'],
    b: `<p class="gd-key"><b>Коротко:</b> Genitiv нужен после <i>wegen, trotz, während, statt</i> и для принадлежности в письменной речи. У m и n — артикль des и <b>-s</b> у существительного.</p>
<p><b>Когда нужен:</b></p>
<ul><li>после предлогов <i>wegen, trotz, während, statt, innerhalb, außerhalb, aufgrund</i>: <i>wegen <b>des</b> Wetter<b>s</b></i>;</li>
<li>«чей» в письменной речи: <i>das Ende <b>des</b> Film<b>s</b></i>; с именами — без апострофа: <i><b>Annas</b> Auto</i>;</li>
<li>в разговоре чаще <i>von + Dat</i>: <i>das Auto von meinem Bruder</i>.</li></ul>
<p><b>Как образовать:</b></p>
<table><tr><th>Род</th><th>Артикль</th><th>Существительное</th></tr>
<tr><td>m, n</td><td>des / eines / meines</td><td><b>-s</b> (многосложные): des Vaters; <b>-es</b> (односложные, на -s, -ß, -z, -sch): des Hauses, des Tisches</td></tr>
<tr><td>f</td><td>der / einer / meiner</td><td>без изменений: der Frau</td></tr>
<tr><td>мн. ч.</td><td>der / meiner</td><td>без изменений: der Kinder</td></tr></table>
<p class="small muted">Слова n-склонения получают -(e)n, а не -s: <i>des Kollege<b>n</b></i>. Прилагательное после артикля в Genitiv всегда на -en: <i>des neu<b>en</b> Autos</i>.</p>`,
  },
  {
    id: 'n-dekl', lvl: 'B1', t: 'N-склонение: как узнать такое слово',
    s: 'Мужской род, живое, -e или -ent/-ist…',
    r: ['b11-n-dekl'],
    b: `<p class="gd-key"><b>Коротко:</b> мужской род + живое существо + особое окончание. Такие слова получают -(e)n во всех падежах, кроме Nominativ ед. ч.</p>
<p><b>Проверьте три признака:</b></p>
<ol><li>Мужской род.</li>
<li>Обозначает человека или животное.</li>
<li>Окончание <b>-e</b> (<i>der Junge, der Kollege, der Kunde, der Russe, der Löwe</i>) <b>или</b> иностранный суффикс <b>-ent, -ant, -ist, -at, -oge, -af</b> (<i>der Student, der Praktikant, der Polizist, der Soldat, der Biologe, der Fotograf</i>).</li></ol>
<p>Плюс короткий список «просто запомнить»: <i>der Mensch, der Herr, der Nachbar, der Bauer, der Bär, der Held</i>.</p>
<table><tr><th>Падеж</th><th>ед. ч.</th></tr>
<tr><td>Nom</td><td>der Kollege</td></tr><tr><td>Akk</td><td>den Kollege<b>n</b></td></tr>
<tr><td>Dat</td><td>dem Kollege<b>n</b></td></tr><tr><td>Gen</td><td>des Kollege<b>n</b></td></tr></table>
<p><i>Ich frage den Student<b>en</b>. Ich helfe dem Herr<b>n</b>.</i></p>
<p class="small muted">Особая группа неживых слов на -e: <i>der Name, der Gedanke, der Glaube, der Buchstabe</i> — тоже -n, но в Genitiv -ns: <i>des Namens</i>.</p>`,
  },
  {
    id: 'temporal', lvl: 'B1', t: 'Временной союз или предлог: какой выбрать',
    s: 'bevor, nachdem, während, seit, bis, sobald',
    r: ['b11-temporal', 'b11-plusquamperfekt', 'a22-wenn-als'],
    b: `<p class="gd-key"><b>Коротко:</b> выберите по смыслу (до, после, во время…). Дальше целое предложение → союз, глагол в конце. Только существительное → предлог.</p>
<table><tr><th>Смысл</th><th>Союз</th><th>Предлог</th></tr>
<tr><td>до</td><td><i><b>bevor</b> ich esse</i></td><td><i><b>vor</b> dem Essen</i></td></tr>
<tr><td>после</td><td><i><b>nachdem</b> ich gegessen habe</i></td><td><i><b>nach</b> dem Essen</i></td></tr>
<tr><td>во время</td><td><i><b>während</b> ich esse</i></td><td><i><b>während</b> des Essens</i></td></tr>
<tr><td>с тех пор как</td><td><i><b>seit</b> ich hier wohne</i></td><td><i><b>seit</b> einem Jahr</i></td></tr>
<tr><td>до тех пор, пока</td><td><i><b>bis</b> du kommst</i></td><td><i><b>bis</b> Montag</i></td></tr>
<tr><td>как только</td><td><i><b>sobald</b> ich fertig bin</i></td><td>—</td></tr></table>
<p><b>После nachdem время «на шаг раньше»:</b></p>
<ul><li>главное в Präsens → придаточное в Perfekt: <i>Nachdem ich gegessen <b>habe</b>, gehe ich spazieren.</i></li>
<li>главное в Präteritum / Perfekt → придаточное в Plusquamperfekt: <i>Nachdem ich gegessen <b>hatte</b>, ging ich spazieren.</i></li></ul>`,
  },
  {
    id: 'doppel', lvl: 'B1', t: 'Двойные союзы: какой означает что',
    s: 'entweder … oder, weder … noch, je … desto',
    r: ['b12-konnektoren2'],
    b: `<p class="gd-key"><b>Коротко:</b> это пары, которые всегда ходят вместе. Учите их как одно слово.</p>
<table><tr><th>Пара</th><th>Значение</th><th>Пример</th></tr>
<tr><td>entweder … oder</td><td>или … или</td><td><i>Entweder kommst du, oder ich gehe.</i></td></tr>
<tr><td>sowohl … als auch</td><td>и … и</td><td><i>Ich spreche sowohl Deutsch als auch Englisch.</i></td></tr>
<tr><td>weder … noch</td><td>ни … ни</td><td><i>Er hat weder Zeit noch Geld.</i></td></tr>
<tr><td>nicht nur … sondern auch</td><td>не только … но и</td><td><i>Sie ist nicht nur klug, sondern auch nett.</i></td></tr>
<tr><td>zwar … aber</td><td>хотя и … но</td><td><i>Das Auto ist zwar alt, aber es fährt gut.</i></td></tr>
<tr><td>je … desto</td><td>чем … тем</td><td><i>Je mehr ich lerne, desto besser spreche ich.</i></td></tr></table>
<p><b>Порядок слов в «je … desto»:</b> после <i>je</i> — придаточное, глагол в конце; после <i>desto</i> + прилагательное — сразу глагол: <i>Je länger ich <b>warte</b>, desto nervöser <b>werde</b> ich.</i></p>`,
  },
  {
    id: 'partizip', lvl: 'B1', t: 'Причастие как прилагательное: Partizip I или II',
    s: 'das schlafende Kind / das gekochte Ei',
    r: ['b12-partizip', 'a21-adj-dekl1'],
    b: `<p class="gd-key"><b>Коротко:</b> предмет сам что-то делает сейчас → <b>Partizip I</b> (-end). С предметом что-то сделали → <b>Partizip II</b>.</p>
<table><tr><th>Форма</th><th>Смысл</th><th>Пример</th></tr>
<tr><td>Partizip I: инфинитив + <b>-d</b></td><td>который делает (сейчас)</td><td><i>das schlafen<b>d</b>e Kind</i> — ребёнок, который спит; <i>steigen<b>d</b>e Preise</i></td></tr>
<tr><td>Partizip II</td><td>который сделали (пассив)</td><td><i>das <b>gekocht</b>e Ei</i> — яйцо, которое сварили</td></tr>
<tr><td>Partizip II глаголов с sein</td><td>который уже сделал</td><td><i>der <b>angekommen</b>e Zug</i> — поезд, который прибыл</td></tr></table>
<p>Окончания — как у обычного прилагательного (см. «Окончание прилагательного»).</p>
<p><b>Как читать длинную группу</b> <i>die von meinem Vater gestern gekaufte Zeitung</i>: начните с артикля (<i>die</i>), прыгните к существительному (<i>Zeitung</i>), а середину читайте как придаточное: «газета, которую мой отец вчера купил».</p>`,
  },
  {
    id: 'lassen', lvl: 'B1', t: 'lassen: в каком значении',
    s: 'Поручить, разрешить, оставить, «давай»',
    r: ['b12-lassen'],
    b: `<p class="gd-key"><b>Коротко:</b> посмотрите, есть ли второй глагол. С инфинитивом — «поручить» или «разрешить». Без инфинитива — «оставить».</p>
<table><tr><th>Значение</th><th>Пример</th></tr>
<tr><td>поручить кому-то сделать</td><td><i>Ich <b>lasse</b> mein Auto reparieren.</i> — Я отдаю машину в ремонт.</td></tr>
<tr><td>разрешить, не мешать</td><td><i><b>Lass</b> mich schlafen!</i> — Дай мне поспать!</td></tr>
<tr><td>оставить</td><td><i>Ich <b>lasse</b> den Schlüssel zu Hause.</i></td></tr>
<tr><td>«давай» (предложение)</td><td><i><b>Lass uns</b> gehen!</i></td></tr>
<tr><td>sich lassen = можно</td><td><i>Das <b>lässt sich</b> machen.</i> — Это можно сделать.</td></tr></table>
<p><b>Perfekt с инфинитивом</b> — два инфинитива в конце: <i>Ich habe das Auto reparieren <b>lassen</b>.</i> Без инфинитива — обычный Partizip: <i>Ich habe den Schlüssel zu Hause <b>gelassen</b>.</i></p>`,
  },
  {
    id: 'satz', lvl: 'B1', t: 'Как разобрать длинное предложение',
    s: 'Пошаговый разбор при чтении',
    r: ['a11-wortstellung', 'a12-satzklammer', 'a21-weil-dass', 'b11-relativ'],
    b: `<p class="gd-key"><b>Коротко:</b> разбейте по запятым, найдите в каждой части спрягаемый глагол и его вторую половину в конце, потом найдите подлежащее.</p>
<ol><li><b>Разбейте по запятым.</b> Каждая часть — отдельное предложение.</li>
<li><b>Найдите спрягаемый глагол в каждой части.</b> На 2-м месте — главное предложение. В конце — придаточное; первое слово после запятой подскажет какое (<i>weil, dass, der/die/das…</i>).</li>
<li><b>Найдите вторую половину сказуемого в конце:</b> Partizip, инфинитив или приставку. Смысл дают обе части вместе: <i>fängt … an</i> = начинает.</li>
<li><b>Найдите подлежащее</b> — оно в Nominativ и согласуется с глаголом. Оно не обязательно первое: <i><b>Den</b> Hund beißt <b>der</b> Mann</i> — кусает мужчина.</li>
<li><b>Остальное — дополнения и обстоятельства:</b> падеж видно по артиклю.</li></ol>
<p><b>Разбор:</b> <i>Den Brief, den mir meine Schwester geschickt hat, habe ich gestern endlich gelesen.</i></p>
<ul><li>Части: <i>Den Brief … habe ich gestern endlich gelesen</i> + <i>den mir meine Schwester geschickt hat</i>.</li>
<li>Главное: <i>habe … gelesen</i> (Perfekt), подлежащее <i>ich</i>, <i>den Brief</i> — Akk: «Письмо я вчера наконец прочитал».</li>
<li>Придаточное: <i>den</i> → «которое»; <i>geschickt hat</i>; подлежащее <i>meine Schwester</i>, <i>mir</i> — «мне».</li>
<li>Итог: «Письмо, которое мне прислала сестра, я вчера наконец прочитал».</li></ul>`,
  },
];
