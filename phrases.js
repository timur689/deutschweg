/* Разговорник по ситуациям: готовые фразы с озвучкой; любую можно добавить в «Мои слова». */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc } = D;

  const SITUATIONS = [
    { id: 'arzt', t: 'У врача', de: 'Beim Arzt', c: 'die', p: [
      ['Ich möchte einen Termin vereinbaren.', 'Я хотел(а) бы записаться на приём.'],
      ['Haben Sie heute noch einen Termin frei?', 'У вас сегодня есть свободное время для приёма?'],
      ['Ich bin zum ersten Mal hier. Hier ist meine Versichertenkarte.', 'Я здесь впервые. Вот моя карта медстрахования.'],
      ['Ich habe seit drei Tagen Fieber.', 'У меня уже три дня температура.'],
      ['Mir ist schlecht.', 'Мне плохо (тошнит).'],
      ['Es tut hier weh.', 'Болит вот здесь.'],
      ['Ich bin allergisch gegen Penicillin.', 'У меня аллергия на пенициллин.'],
      ['Wie oft soll ich die Tabletten nehmen?', 'Как часто принимать таблетки?'],
      ['Brauche ich dafür ein Rezept?', 'Для этого нужен рецепт?'],
      ['Können Sie mich krankschreiben?', 'Вы можете выписать мне больничный?'],
      ['Ich brauche eine Krankmeldung für meinen Arbeitgeber.', 'Мне нужен больничный лист для работодателя.'],
      ['Gute Besserung!', 'Выздоравливайте!'],
    ] },
    { id: 'amt', t: 'В учреждении', de: 'Auf dem Amt', c: 'der', p: [
      ['Ich möchte mich anmelden.', 'Я хочу зарегистрироваться по месту жительства.'],
      ['Welche Unterlagen brauche ich?', 'Какие документы мне нужны?'],
      ['Wo bekomme ich das Formular?', 'Где мне взять бланк?'],
      ['Ich verstehe diesen Brief nicht. Können Sie mir helfen?', 'Я не понимаю это письмо. Вы можете помочь?'],
      ['Könnten Sie bitte langsamer sprechen?', 'Не могли бы вы говорить медленнее?'],
      ['Muss ich eine Gebühr bezahlen?', 'Мне нужно платить сбор?'],
      ['Wie lange dauert die Bearbeitung?', 'Сколько длится рассмотрение?'],
      ['Ich habe eine Frage zu meinem Antrag.', 'У меня вопрос по моему заявлению.'],
      ['Bis wann muss ich das abgeben?', 'До какого срока нужно это сдать?'],
      ['Kann ich das auch online erledigen?', 'Это можно сделать и онлайн?'],
      ['Ich hätte gern eine Kopie davon.', 'Мне, пожалуйста, копию этого.'],
      ['Wer ist dafür zuständig?', 'Кто за это отвечает?'],
    ] },
    { id: 'job', t: 'Собеседование', de: 'Vorstellungsgespräch', c: 'das', p: [
      ['Vielen Dank für die Einladung zum Gespräch.', 'Большое спасибо за приглашение на собеседование.'],
      ['Ich habe fünf Jahre Berufserfahrung.', 'У меня пять лет опыта работы.'],
      ['Zu meinen Stärken gehören Zuverlässigkeit und Teamfähigkeit.', 'Мои сильные стороны — надёжность и умение работать в команде.'],
      ['Ich arbeite gern im Team.', 'Я люблю работать в команде.'],
      ['Was sind Ihre Stärken und Schwächen?', 'Каковы ваши сильные и слабые стороны?'],
      ['Mich interessiert diese Stelle besonders, weil ich gern mit Menschen arbeite.', 'Эта должность мне особенно интересна, потому что я люблю работать с людьми.'],
      ['Ab wann könnten Sie anfangen?', 'С какого времени вы могли бы начать?'],
      ['Ich könnte ab dem ersten Mai anfangen.', 'Я мог(ла) бы начать с первого мая.'],
      ['Wie sehen die Arbeitszeiten aus?', 'Какой график работы?'],
      ['Gibt es Möglichkeiten zur Weiterbildung?', 'Есть ли возможности для повышения квалификации?'],
      ['Wie hoch ist das Gehalt?', 'Какая зарплата?'],
      ['Ich freue mich auf Ihre Rückmeldung.', 'Буду ждать вашего ответа.'],
    ] },
    { id: 'wohnung', t: 'Жильё и аренда', de: 'Wohnung mieten', c: 'die', p: [
      ['Ist die Wohnung noch frei?', 'Квартира ещё свободна?'],
      ['Wie hoch ist die Warmmiete?', 'Сколько аренда вместе с коммунальными?'],
      ['Sind die Nebenkosten in der Miete enthalten?', 'Коммунальные расходы включены в аренду?'],
      ['Wann kann ich die Wohnung besichtigen?', 'Когда можно посмотреть квартиру?'],
      ['Ab wann ist die Wohnung frei?', 'С какого числа квартира свободна?'],
      ['Wie hoch ist die Kaution?', 'Какой залог?'],
      ['Sind Haustiere erlaubt?', 'Можно жить с домашними животными?'],
      ['Gibt es einen Keller oder einen Balkon?', 'Есть подвал или балкон?'],
      ['Die Heizung funktioniert nicht.', 'Отопление не работает.'],
      ['Können Sie bitte einen Handwerker schicken?', 'Можете, пожалуйста, прислать мастера?'],
      ['Ich möchte den Mietvertrag kündigen.', 'Я хочу расторгнуть договор аренды.'],
      ['Wie ist die Verkehrsanbindung?', 'Как здесь с общественным транспортом?'],
    ] },
    { id: 'telefon', t: 'Телефонный звонок', de: 'Am Telefon', c: 'der', p: [
      ['Guten Tag, hier spricht Max Müller.', 'Добрый день, говорит Макс Мюллер.'],
      ['Könnte ich bitte mit Frau Weber sprechen?', 'Можно, пожалуйста, поговорить с госпожой Вебер?'],
      ['Ich rufe wegen meines Termins an.', 'Я звоню по поводу моей записи.'],
      ['Könnten Sie das bitte wiederholen?', 'Не могли бы вы повторить?'],
      ['Die Verbindung ist sehr schlecht.', 'Очень плохая связь.'],
      ['Kann ich eine Nachricht hinterlassen?', 'Могу я оставить сообщение?'],
      ['Bitte rufen Sie mich zurück.', 'Пожалуйста, перезвоните мне.'],
      ['Wie ist Ihre Telefonnummer?', 'Какой у вас номер телефона?'],
      ['Einen Moment, bitte.', 'Минутку, пожалуйста.'],
      ['Ich verbinde Sie.', 'Соединяю вас.'],
      ['Entschuldigung, ich habe mich verwählt.', 'Извините, я ошибся номером.'],
      ['Vielen Dank für Ihre Hilfe. Auf Wiederhören!', 'Большое спасибо за помощь. До свидания!'],
    ] },
    { id: 'restaurant', t: 'В кафе и ресторане', de: 'Im Restaurant', c: 'das', p: [
      ['Haben Sie einen Tisch für zwei Personen?', 'У вас есть столик на двоих?'],
      ['Ich habe einen Tisch reserviert.', 'Я забронировал(а) столик.'],
      ['Die Speisekarte, bitte.', 'Меню, пожалуйста.'],
      ['Was können Sie empfehlen?', 'Что вы можете порекомендовать?'],
      ['Ich hätte gern die Tomatensuppe.', 'Мне, пожалуйста, томатный суп.'],
      ['Ist das Gericht scharf?', 'Это блюдо острое?'],
      ['Ich esse kein Fleisch.', 'Я не ем мясо.'],
      ['Können wir bitte bestellen?', 'Можно сделать заказ?'],
      ['Noch ein Wasser, bitte.', 'Ещё воды, пожалуйста.'],
      ['Es hat sehr gut geschmeckt.', 'Было очень вкусно.'],
      ['Die Rechnung, bitte.', 'Счёт, пожалуйста.'],
      ['Zusammen oder getrennt?', 'Вместе или раздельно?'],
    ] },
    { id: 'einkaufen', t: 'В магазине', de: 'Einkaufen', c: 'die', p: [
      ['Ich suche eine Winterjacke.', 'Я ищу зимнюю куртку.'],
      ['Haben Sie das eine Nummer größer?', 'У вас есть это на размер больше?'],
      ['Wo sind die Umkleidekabinen?', 'Где примерочные?'],
      ['Kann ich das anprobieren?', 'Можно это примерить?'],
      ['Was kostet das?', 'Сколько это стоит?'],
      ['Gibt es das auch in Blau?', 'Это есть и в синем цвете?'],
      ['Kann ich mit Karte bezahlen?', 'Можно оплатить картой?'],
      ['Ich möchte das umtauschen.', 'Я хочу это обменять.'],
      ['Hier ist der Kassenbon.', 'Вот чек.'],
      ['Ich schaue nur, danke.', 'Я просто смотрю, спасибо.'],
      ['Brauchen Sie eine Tüte?', 'Вам нужен пакет?'],
      ['Haben Sie das noch auf Lager?', 'Это ещё есть в наличии?'],
    ] },
    { id: 'reise', t: 'Вокзал и поездки', de: 'Bahn und Reisen', c: 'der', p: [
      ['Eine Fahrkarte nach München, bitte.', 'Билет до Мюнхена, пожалуйста.'],
      ['Einfach oder hin und zurück?', 'В одну сторону или туда и обратно?'],
      ['Von welchem Gleis fährt der Zug ab?', 'С какого пути отправляется поезд?'],
      ['Muss ich umsteigen?', 'Мне нужно делать пересадку?'],
      ['Hat der Zug Verspätung?', 'Поезд опаздывает?'],
      ['Ist dieser Platz noch frei?', 'Это место свободно?'],
      ['Wann kommen wir in Berlin an?', 'Когда мы приедем в Берлин?'],
      ['Ich habe meinen Anschluss verpasst.', 'Я опоздал(а) на пересадку.'],
      ['Wo ist die nächste Haltestelle?', 'Где ближайшая остановка?'],
      ['Wie komme ich zum Flughafen?', 'Как мне добраться до аэропорта?'],
      ['Ich habe ein Zimmer reserviert.', 'Я забронировал(а) номер.'],
      ['Ist das Frühstück inklusive?', 'Завтрак включён?'],
    ] },
    { id: 'smalltalk', t: 'Знакомство и small talk', de: 'Smalltalk', c: 'das', p: [
      ['Wie geht es Ihnen?', 'Как у вас дела?'],
      ['Danke, gut. Und Ihnen?', 'Спасибо, хорошо. А у вас?'],
      ['Freut mich, Sie kennenzulernen.', 'Рад(а) с вами познакомиться.'],
      ['Woher kommen Sie?', 'Откуда вы?'],
      ['Wie lange wohnen Sie schon hier?', 'Как долго вы уже здесь живёте?'],
      ['Was machen Sie beruflich?', 'Чем вы занимаетесь по работе?'],
      ['Schönes Wetter heute, nicht wahr?', 'Хорошая сегодня погода, правда?'],
      ['Haben Sie Pläne fürs Wochenende?', 'У вас есть планы на выходные?'],
      ['Das klingt interessant!', 'Звучит интересно!'],
      ['Wollen wir uns duzen?', 'Давайте перейдём на «ты»?'],
      ['Schönen Abend noch!', 'Хорошего вечера!'],
      ['Bis bald!', 'До скорого!'],
    ] },
    { id: 'bank', t: 'Банк и почта', de: 'Bank und Post', c: 'die', p: [
      ['Ich möchte ein Konto eröffnen.', 'Я хочу открыть счёт.'],
      ['Ich möchte Geld überweisen.', 'Я хочу перевести деньги.'],
      ['Meine Karte ist gesperrt.', 'Моя карта заблокирована.'],
      ['Ich habe meine Geheimzahl vergessen.', 'Я забыл(а) ПИН-код.'],
      ['Wie hoch sind die Gebühren?', 'Какие комиссии?'],
      ['Wo ist der nächste Geldautomat?', 'Где ближайший банкомат?'],
      ['Ich möchte dieses Paket in die Ukraine schicken.', 'Я хочу отправить эту посылку в Украину.'],
      ['Wie lange dauert die Lieferung?', 'Сколько идёт доставка?'],
      ['Was kostet ein Brief nach Polen?', 'Сколько стоит письмо в Польшу?'],
      ['Ich möchte ein Paket abholen.', 'Я хочу забрать посылку.'],
      ['Hier ist meine Benachrichtigungskarte.', 'Вот моё извещение.'],
      ['Brauche ich meinen Ausweis?', 'Нужно ли мне удостоверение личности?'],
    ] },
  ];
  const BY = Object.fromEntries(SITUATIONS.map((s) => [s.id, s]));
  const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const rerender = () => { const y = window.scrollY; D.render(); window.scrollTo(0, y); };
  const has = (de) => !!D.WORD[de];

  function renderList() {
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Разговорник</h1><p class="muted">Готовые фразы для частых ситуаций. Слушайте, повторяйте вслух и добавляйте нужные фразы в «Мои слова» — они попадут в повторение.</p></div>
      <section class="packs">${SITUATIONS.map((s) => {
        const added = s.p.filter(([de]) => has(de)).length;
        return `<a class="pane pack" href="#phr-${s.id}"><span class="hub-dot" style="background:var(--${s.c})"></span>
          <span class="pane-big">${esc(s.t)}</span><span class="count" lang="de">${esc(s.de)} · ${s.p.length} фраз${added ? ` · ${added} в моих` : ''}</span></a>`;
      }).join('')}</section>`;
  }

  function renderSituation(id) {
    const s = BY[id];
    if (!s) return renderList();
    const list = SITUATIONS;
    const next = list[list.indexOf(s) + 1];
    const missing = s.p.filter(([de]) => !has(de)).length;
    return `<a class="back" href="#phrases">← Разговорник</a>
      <div class="page-head"><p class="eyebrow" lang="de">${esc(s.de)}</p><h1>${esc(s.t)}</h1></div>
      <div class="row">${missing ? `<button class="btn primary small" data-act="ph-all" data-id="${s.id}">Добавить все в мои слова</button>` : '<span class="pill ok">Все фразы в ваших словах</span>'}</div>
      <section class="panel dict">${s.p.map(([de, ru]) => `<div class="drow phrase"><div class="wd" lang="de">${esc(de)}</div><div class="ru small">${esc(ru)}</div>
        <div class="acts row" style="gap:4px;flex-wrap:nowrap">${D.speakBtn(de)}${has(de) ? '<span class="st l">в моих</span>' : `<button class="icon-btn" data-act="ph-add" data-de="${esc(de)}" data-ru="${esc(ru)}" aria-label="Добавить в мои слова" title="В мои слова">${PLUS}</button>`}</div></div>`).join('')}</section>
      ${next ? `<div class="row"><a class="btn" href="#phr-${next.id}">Дальше: ${esc(next.t)}</a></div>` : ''}`;
  }

  const addPhrase = (de, ru) => D.addCustomWord({ raw: `${de.replace(/\|/g, ' ')}||${ru.replace(/\|/g, ' ')}`, pos: 'expr', ex: '' });

  D.register({
    views: { phrases: renderList, phr: (id) => renderSituation(id) },
    prefixes: [['phr-', 'phr']],
    nav: { phrases: 'practice', phr: 'practice' },
    actions: {
      'ph-add': (el) => { addPhrase(el.dataset.de, el.dataset.ru); rerender(); },
      'ph-all': (el) => { const s = BY[el.dataset.id]; if (s) s.p.forEach(([de, ru]) => { if (!has(de)) addPhrase(de, ru); }); rerender(); },
    },
  });
})();
