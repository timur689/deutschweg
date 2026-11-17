/* Части речи для словаря. Существительные узнаём по артиклю, глаголы — по форме,
   остальное — по спискам ниже. */
(() => {
  'use strict';
  const set = (s) => new Set(s.split(' '));

  const PREP = set('neben zwischen über unter vor hinter gegenüber bis ab seit ohne für durch gegen trotz wegen während bezüglich inklusive');
  const CONJ = set('und aber oder obwohl nachdem deshalb deswegen trotzdem außerdem jedoch dennoch sonst nämlich daher sobald falls damit indem seitdem bevor zwar sowohl weder entweder einerseits andererseits allerdings folglich beziehungsweise somit vielmehr zudem infolgedessen hingegen');
  const PRON = set('woher wo wie was wer warum wohin wann welcher alle kein');
  const NUM = set('eins zwei drei vier fünf zehn zwanzig hundert tausend halb');
  const EXPR = set('hallo danke bitte ja nein tschüss super prima schade egal');
  const ADV = set('heute jetzt immer oft manchmal nie links rechts geradeaus damals vorher morgen gestern gern bald später noch dann schon hier dort sehr auch nicht zusammen allein vielleicht viel wenig '
    + 'täglich wöchentlich morgens mittags abends nachts selten meistens normalerweise übermorgen vorgestern oben unten vorne hinten innen außen weh bar '
    + 'zuerst danach endlich plötzlich sofort gleich bisher inzwischen wieder fast genug ziemlich besonders eigentlich wirklich natürlich leider hoffentlich überall draußen drinnen '
    + 'auswendig monatlich jährlich dafür dagegen offensichtlich unterwegs rechtzeitig schließlich ebenfalls jedenfalls übrigens allmählich ausschließlich bereits derzeit ebenso eher '
    + 'gelegentlich häufig insgesamt keineswegs mittlerweile möglicherweise nachher neulich ohnehin sowieso stattdessen tatsächlich ungefähr unbedingt zumindest zunächst '
    + 'letztendlich zusammenfassend abschließend insbesondere anschließend weltweit genau immerhin');
  /* Слова на -en, которые не глаголы. */
  const NOT_VERB = set('zufrieden erfahren geschieden modern trocken geschlossen verschieden gebraten schüchtern einverstanden ausgewogen verboten offen gelassen');

  window.DE_POS_LABELS = {
    noun: 'Существительные', verb: 'Глаголы', adj: 'Прилагательные', adv: 'Наречия', prep: 'Предлоги',
    conj: 'Союзы и связки', pron: 'Вопросы и местоимения', num: 'Числа', expr: 'Выражения',
  };
  window.DE_POS_SHORT = { noun: 'сущ.', verb: 'глаг.', adj: 'прил.', adv: 'нареч.', prep: 'предлог', conj: 'союз', pron: 'местоим.', num: 'числ.', expr: 'выраж.' };

  /** Возвращает код части речи для слова курса. */
  window.DE_POS = (de, forms, art) => {
    if (art) return 'noun';
    if (/^[A-ZÄÖÜ]/.test(de) && !/\s/.test(de)) return 'noun';
    if (PREP.has(de)) return 'prep';
    if (CONJ.has(de)) return 'conj';
    if (PRON.has(de)) return 'pron';
    if (NUM.has(de)) return 'num';
    if (EXPR.has(de)) return 'expr';
    if (ADV.has(de)) return 'adv';
    if (de.startsWith('sich ') || forms) return 'verb';
    if (/\s/.test(de) && /(en|ern|eln)$/.test(de)) return 'verb';
    if (/(en|ern|eln)$/.test(de) && !NOT_VERB.has(de)) return 'verb';
    return 'adj';
  };
})();
