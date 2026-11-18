/* Переводчик без интернета: поиск по словарю курса, артикли, склонение, подсказки по роду и формы глаголов.
   Используется экраном «Переводчик» (translate.js); работает и в самостоятельной веб-версии. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;

  const MAX_HITS = 6;
  const MIN_STEM = 3;
  const MIN_COMPOUND_PART = 3;

  /* ---------- нормализация ---------- */
  const lower = (s) => String(s || '').toLowerCase().replace(/ё/g, 'е').trim();
  const foldDe = (s) => lower(s).replace(/ß/g, 'ss').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u');
  const isCyr = (s) => /[а-яё]/i.test(s);
  const tokens = (s) => String(s || '').split(/[^A-Za-zÄÖÜäöüßА-Яа-яЁё'-]+/).filter(Boolean);
  const ruVariants = (ru) => lower(ru).replace(/\([^)]*\)/g, ' ').split(/[,;/]/).map((v) => v.trim()).filter(Boolean);

  /* ---------- глаголы из тренажёра спряжения ---------- */
  const PERSONS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  const VERBS = {};
  (window.DE_VERBS || []).forEach((raw) => {
    const [inf, pres, prat, perf, ru, level] = raw.split('|');
    VERBS[inf] = { inf, pres: (pres || '').split(','), prat, perf, ru, level };
  });
  /** Форма глагола → инфинитив (Präsens, Präteritum, Partizip II). */
  const VERB_FORM = {};
  Object.values(VERBS).forEach((v) => {
    const add = (f, label) => { const k = foldDe(f); if (k && !VERB_FORM[k]) VERB_FORM[k] = { inf: v.inf, label }; };
    v.pres.forEach((f, i) => add(f, `Präsens, ${PERSONS[i]}`));
    add(v.prat, 'Präteritum (ich/er)');
    add(`${v.prat}st`, 'Präteritum (du)');
    add(`${v.prat}n`, 'Präteritum (wir/sie)');
    const part = (v.perf || '').split(' ').pop();
    add(part, `Partizip II — ${v.perf}`);
  });

  /* ---------- служебные слова (их нет в словаре курса) ---------- */
  const FUNC = {
    der: ['определённый артикль', 'м. р. Nominativ · ж. р. Dativ/Genitiv · мн. ч. Genitiv'],
    die: ['определённый артикль', 'ж. р. Nominativ/Akkusativ · мн. ч. Nominativ/Akkusativ'],
    das: ['определённый артикль', 'ср. р. Nominativ/Akkusativ (а также «это»)'],
    den: ['определённый артикль', 'м. р. Akkusativ · мн. ч. Dativ (+ -n у существительного)'],
    dem: ['определённый артикль', 'м. р. и ср. р. Dativ'],
    des: ['определённый артикль', 'м. р. и ср. р. Genitiv (+ -s у существительного)'],
    ein: ['неопределённый артикль', 'м. р. Nominativ · ср. р. Nominativ/Akkusativ'],
    eine: ['неопределённый артикль', 'ж. р. Nominativ/Akkusativ'],
    einen: ['неопределённый артикль', 'м. р. Akkusativ'],
    einem: ['неопределённый артикль', 'м. р. и ср. р. Dativ'],
    einer: ['неопределённый артикль', 'ж. р. Dativ/Genitiv'],
    eines: ['неопределённый артикль', 'м. р. и ср. р. Genitiv'],
    kein: ['отрицание «никакой»', 'м. р. Nominativ · ср. р. Nominativ/Akkusativ'],
    keine: ['отрицание «никакой»', 'ж. р. Nominativ/Akkusativ · мн. ч. Nominativ/Akkusativ'],
    keinen: ['отрицание «никакой»', 'м. р. Akkusativ · мн. ч. Dativ'],
    keinem: ['отрицание «никакой»', 'м. р. и ср. р. Dativ'],
    ich: ['я', 'Nominativ; Akk — mich, Dat — mir'], du: ['ты', 'Nominativ; Akk — dich, Dat — dir'],
    er: ['он', 'Nominativ; Akk — ihn, Dat — ihm'], sie: ['она / они / (Sie) Вы', 'глагол подскажет: sie ist — она, sie sind — они'],
    es: ['оно; это', 'часто формальное подлежащее: Es regnet.'], wir: ['мы', 'Akk/Dat — uns'], ihr: ['вы (на «ты» к группе); её; ей', 'зависит от места в предложении'],
    mich: ['меня', 'Akkusativ от ich'], mir: ['мне', 'Dativ от ich'], dich: ['тебя', 'Akkusativ от du'], dir: ['тебе', 'Dativ от du'],
    ihn: ['его', 'Akkusativ от er'], ihm: ['ему', 'Dativ от er и es'], uns: ['нас; нам', 'Akkusativ и Dativ от wir'], euch: ['вас; вам', 'Akkusativ и Dativ от ihr'],
    ihnen: ['им; (Ihnen) Вам', 'Dativ от sie / Sie'], sich: ['себя, -ся', 'возвратное местоимение'],
    mein: ['мой', 'склоняется как ein'], dein: ['твой', 'склоняется как ein'], sein: ['его (притяж.); быть', 'по контексту'],
    nicht: ['не', 'отрицание глагола, прилагательного или всего предложения'], zu: ['к; слишком; частица перед инфинитивом', 'с Dativ: zu dem → zum, zu der → zur'],
    im: ['в (= in dem)', 'слияние предлога с артиклем, Dativ'], am: ['у, на; в (о днях) (= an dem)', 'слияние, Dativ'],
    zum: ['к (= zu dem)', 'слияние, Dativ'], zur: ['к (= zu der)', 'слияние, Dativ'], vom: ['от, с (= von dem)', 'слияние, Dativ'],
    beim: ['у, при (= bei dem)', 'слияние, Dativ'], ins: ['в (= in das)', 'слияние, Akkusativ — направление «куда?»'],
    mit: ['с', 'предлог + Dativ'], aus: ['из', 'предлог + Dativ'], bei: ['у, при', 'предлог + Dativ'], nach: ['в (страну/город); после', 'предлог + Dativ'],
    seit: ['с (какого-то времени)', 'предлог + Dativ'], von: ['от, из; (о принадлежности)', 'предлог + Dativ'],
    'für': ['для', 'предлог + Akkusativ'], ohne: ['без', 'предлог + Akkusativ'], durch: ['через, сквозь', 'предлог + Akkusativ'], gegen: ['против; около', 'предлог + Akkusativ'], um: ['в (о времени); вокруг', 'предлог + Akkusativ'],
    in: ['в', 'где? — Dativ, куда? — Akkusativ'], an: ['на (вертикальном), у; в (о днях)', 'где? — Dativ, куда? — Akkusativ'], auf: ['на (горизонтальном)', 'где? — Dativ, куда? — Akkusativ'],
    und: ['и', 'порядок слов не меняет'], oder: ['или', 'порядок слов не меняет'], aber: ['но', 'порядок слов не меняет'],
    weil: ['потому что', 'глагол уходит в конец придаточного'], dass: ['что (союз)', 'глагол уходит в конец придаточного'], wenn: ['если; когда', 'глагол уходит в конец придаточного'],
    ist: ['есть, является (sein)', 'Präsens, er/sie/es'], sind: ['есть (sein)', 'Präsens, wir/sie/Sie'],
  };
  /** Русские служебные слова: их не найти в словаре по смыслу. */
  const RU_FUNC = {
    'я': 'ich', 'ты': 'du', 'он': 'er', 'она': 'sie', 'оно': 'es', 'мы': 'wir', 'вы': 'ihr / Sie', 'они': 'sie',
    'меня': 'mich / mir', 'тебя': 'dich', 'мне': 'mir', 'тебе': 'dir', 'его': 'ihn / sein', 'её': 'sie / ihr', 'ее': 'sie / ihr', 'нас': 'uns', 'вас': 'euch / Sie',
    'и': 'und', 'или': 'oder', 'но': 'aber', 'не': 'nicht / kein', 'нет': 'nein', 'да': 'ja', 'это': 'das', 'потому': 'weil (потому что)', 'что': 'was / dass', 'если': 'wenn',
    'в': 'in (+Dat где? / +Akk куда?)', 'на': 'auf / an (+Dat где? / +Akk куда?)', 'с': 'mit (+Dat)', 'без': 'ohne (+Akk)', 'для': 'für (+Akk)', 'у': 'bei (+Dat)', 'из': 'aus (+Dat)', 'к': 'zu (+Dat)', 'от': 'von (+Dat)',
  };

  /* ---------- род: подсказки по окончанию и по последней части сложного слова ---------- */
  const GENDER_RULES = [
    ['ung', 'die', 'всегда'], ['heit', 'die', 'всегда'], ['keit', 'die', 'всегда'], ['schaft', 'die', 'всегда'],
    ['ion', 'die', 'почти всегда'], ['tät', 'die', 'всегда'], ['ei', 'die', 'обычно'], ['enz', 'die', 'обычно'], ['anz', 'die', 'обычно'], ['ik', 'die', 'обычно'], ['ie', 'die', 'обычно'],
    ['chen', 'das', 'всегда'], ['lein', 'das', 'всегда'], ['ment', 'das', 'обычно'], ['um', 'das', 'обычно'], ['nis', 'das', 'чаще всего'], ['ma', 'das', 'обычно'],
    ['ling', 'der', 'всегда'], ['ismus', 'der', 'всегда'], ['ig', 'der', 'обычно'],
  ];
  const ART_NAME = { der: 'мужского рода (der)', die: 'женского рода (die)', das: 'среднего рода (das)' };

  function compoundHead(w) {
    const noun = lower(w.noun);
    let best = null;
    D.WORDS.forEach((o) => {
      if (!o.art || o === w) return;
      const part = lower(o.noun);
      if (part.length < MIN_COMPOUND_PART || noun.length - part.length < MIN_COMPOUND_PART || !noun.endsWith(part)) return;
      if (!best || part.length > best.noun.length) best = o;
    });
    return best;
  }

  /** Объяснение артикля: { text, exception }. */
  function genderHint(w) {
    if (!w || !w.art) return null;
    const head = compoundHead(w);
    if (head) {
      return { text: `Сложное слово: артикль всегда берётся от последней части — ${head.art} ${head.noun}.`, exception: head.art !== w.art };
    }
    const noun = lower(w.noun);
    const rule = GENDER_RULES.find(([end]) => noun.endsWith(end) && noun.length > end.length + 1);
    if (!rule) return null;
    const [end, art, how] = rule;
    if (art === w.art) return { text: `Слова на -${end} ${how} ${ART_NAME[art]}.`, exception: false };
    return { text: `Исключение: слова на -${end} ${how} ${ART_NAME[art]}, а это слово — ${w.art}.`, exception: true };
  }

  /* ---------- склонение существительного ---------- */
  const WEAK = new Set(['mensch', 'nachbar', 'bauer', 'bär', 'held', 'prinz', 'graf', 'herr', 'architekt', 'fotograf', 'pilot']);
  const SPECIAL_SG = { Herr: { obl: 'Herrn', gen: 'Herrn' }, Name: { obl: 'Namen', gen: 'Namens' }, Gedanke: { obl: 'Gedanken', gen: 'Gedankens' },
    Buchstabe: { obl: 'Buchstaben', gen: 'Buchstabens' }, Glaube: { obl: 'Glauben', gen: 'Glaubens' }, Bus: { obl: 'Bus', gen: 'Busses' }, Herz: { obl: 'Herz', gen: 'Herzens', dat: 'Herzen' } };
  const ARTS_SG = {
    der: [['der', 'ein'], ['den', 'einen'], ['dem', 'einem'], ['des', 'eines']],
    die: [['die', 'eine'], ['die', 'eine'], ['der', 'einer'], ['der', 'einer']],
    das: [['das', 'ein'], ['das', 'ein'], ['dem', 'einem'], ['des', 'eines']],
  };
  const ARTS_PL = [['die', 'keine'], ['die', 'keine'], ['den', 'keinen'], ['der', 'keiner']];
  const CASES = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
  const CASE_Q = ['кто? что?', 'кого? что? куда?', 'кому? где?', 'чей?'];

  function isWeak(w) {
    if (w.art !== 'der') return false;
    const n = w.noun;
    if (WEAK.has(lower(n))) return true;
    const pl = w.pl || '';
    const plusN = pl === `${n}n` || pl === `${n}en`;
    return plusN && (/e$/.test(n) || /(ent|ant|ist|at|oge|af|ot|ad)$/.test(n));
  }

  function singularForms(w) {
    const n = w.noun;
    if (SPECIAL_SG[n]) { const s = SPECIAL_SG[n]; return [n, s.obl, s.dat || s.obl, s.gen]; }
    if (w.art === 'die') return [n, n, n, n];
    if (isWeak(w)) { const o = /e$/.test(n) ? `${n}n` : `${n}en`; return [n, o, o, o]; }
    if (w.art === 'der' && /e$/.test(n) && w.pl === `${n}n`) return [n, n, n, `${n}s`];
    const oneSyllable = (lower(n).match(/[aeiouäöüy]+/g) || []).length === 1;
    const gen = /nis$/.test(n) ? `${n}ses` : /(s|ß|x|z|sch|tz)$/.test(n) || oneSyllable ? `${n}es` : `${n}s`;
    return [n, n, n, gen];
  }

  /** Таблица склонения: { sg: [[падеж, вопрос, определённая, неопределённая]], pl: [...] | null, weak }. */
  function declension(w) {
    if (!w || !w.art || !w.noun) return null;
    const onlyPl = w.pl === 'Pl';
    const plForm = onlyPl ? w.noun : (w.pl && w.pl !== '-' ? w.pl : null);
    const sg = onlyPl ? null : singularForms(w).map((form, i) => {
      const [def, ind] = ARTS_SG[w.art][i];
      return [CASES[i], CASE_Q[i], `${def} ${form}`, `${ind} ${form}`];
    });
    const pl = plForm ? ARTS_PL.map(([def, ind], i) => {
      const form = i === 2 && !/[ns]$/.test(plForm) ? `${plForm}n` : plForm;
      return [CASES[i], CASE_Q[i], `${def} ${form}`, `${ind} ${form}`];
    }) : null;
    return { sg, pl, weak: isWeak(w) };
  }

  /* ---------- глагол: спряжение, приставки, Perfekt ---------- */
  const PREFIXES = ['zusammen', 'zurück', 'weiter', 'vorbei', 'heraus', 'herein', 'statt', 'fern', 'fest', 'teil', 'nach', 'auf', 'aus', 'ein', 'mit', 'vor', 'weg', 'los', 'her', 'hin', 'ab', 'an', 'zu', 'um'];
  const INSEP = ['be', 'ge', 'er', 'ver', 'zer', 'ent', 'emp', 'miss'];

  function verbInfo(w) {
    const inf = String(w.de || '').replace(/^sich /, '');
    const v = VERBS[inf] || VERBS[w.de] || null;
    const notes = [];
    if (/^sich /.test(w.de)) notes.push('Возвратный глагол: sich меняется по лицам — ich wasche mich, du wäschst dich, er wäscht sich.');
    const pre = PREFIXES.find((p) => inf.startsWith(p) && inf.length - p.length >= 4 && (D.WORD[inf.slice(p.length)] || VERBS[inf.slice(p.length)]));
    if (pre) {
      const base = inf.slice(pre.length);
      const ich = VERBS[base] ? VERBS[base].pres[0] : base.replace(/e?n$/, 'e');
      notes.push(`Отделяемая приставка ${pre}-: в предложении она уходит в конец — ich ${ich} … ${pre}. В Partizip II ge- встаёт после приставки: ${pre}ge…`);
    }
    const insep = INSEP.find((p) => inf.startsWith(p) && inf.length - p.length >= 4 && (D.WORD[inf.slice(p.length)] || VERBS[inf.slice(p.length)]));
    if (!pre && insep) notes.push(`Неотделяемая приставка ${insep}-: не отделяется, и в Partizip II нет ge-.`);
    if (v && / ist /.test(` ${v.perf} `)) notes.push('Perfekt с sein: так образуют прошедшее время глаголы движения и изменения состояния.');
    const stem = lower(pre ? inf.slice(pre.length) : inf).replace(/e?n$/, '');
    if (v && v.pres[1] && !lower(v.pres[1].split(' ')[0]).replace(/s?t$/, '').startsWith(stem)) {
      notes.push(`Неправильные формы в du и er/sie/es: du ${v.pres[1]}, er ${v.pres[2]} — запомните их отдельно.`);
    }
    return { table: v ? v.pres.map((f, i) => [PERSONS[i], f]) : null, prat: v ? v.prat : '', perf: v ? v.perf : '', notes };
  }

  /* ---------- поиск ---------- */
  function scoreDe(w, q) {
    const keys = [w.de, w.noun, w.art && w.pl && w.pl !== '-' && w.pl !== 'Pl' ? w.pl : ''].filter(Boolean).map(foldDe);
    if (keys[0] === q || keys[1] === q) return 4;
    if (keys[2] === q) return 3;
    if (keys.some((k) => k.startsWith(q))) return 2;
    return 0;
  }
  function scoreRu(w, q) {
    const vars = ruVariants(w.ru);
    if (vars.includes(q)) return 4;
    if (vars.some((v) => v.split(' ')[0] === q)) return 3;
    if (vars.some((v) => v.startsWith(q))) return 2;
    if (q.length >= 4 && vars.some((v) => v.includes(q))) return 1;
    return 0;
  }
  function search(q, lang) {
    const fq = lang === 'ru' ? lower(q) : foldDe(q);
    if (!fq) return [];
    const score = lang === 'ru' ? scoreRu : scoreDe;
    return D.WORDS.map((w) => [w, score(w, fq)]).filter(([, s]) => s > 0)
      .sort((a, b) => b[1] - a[1] || a[0].de.length - b[0].de.length)
      .slice(0, MAX_HITS).map(([w, s]) => ({ w, exact: s >= 3 }));
  }

  /** Немецкое слово в тексте → словарная статья. */
  function lookupDeToken(tok) {
    const f = foldDe(tok);
    if (FUNC[lower(tok)]) return { func: FUNC[lower(tok)] };
    const direct = D.WORDS.find((w) => foldDe(w.noun || w.de) === f);
    if (direct) return { w: direct };
    const plural = D.WORDS.find((w) => w.art && w.pl && foldDe(w.pl) === f);
    if (plural) return { w: plural, form: 'мн. ч.' };
    if (VERB_FORM[f]) return { w: D.WORD[VERB_FORM[f].inf] || null, inf: VERB_FORM[f].inf, form: VERB_FORM[f].label };
    for (const cut of ['n', 'en', 's', 'es', 'e']) {
      if (!f.endsWith(cut) || f.length - cut.length < MIN_STEM) continue;
      const base = f.slice(0, -cut.length);
      const hit = D.WORDS.find((w) => w.art && (foldDe(w.noun) === base || (w.pl && foldDe(w.pl) === base)));
      if (hit) return { w: hit, form: 'форма с окончанием -' + cut };
    }
    const verbStem = f.replace(/^ge(.+?)(t|en)$/, '$1').replace(/(est|et|st|te|ten|t|e|en)$/, '');
    if (verbStem.length >= MIN_STEM) {
      const v = D.WORDS.find((w) => w.pos === 'verb' && [`${verbStem}en`, `${verbStem}n`].includes(foldDe(w.de)));
      if (v) return { w: v, form: 'форма глагола' };
    }
    return null;
  }

  /** Русское слово в тексте → несколько возможных немецких (без учёта грамматики). */
  function lookupRuToken(tok) {
    const t = lower(tok);
    if (t.length < MIN_STEM) return [];
    const exact = search(t, 'ru').filter((h) => h.exact);
    if (exact.length) return exact.slice(0, 2).map((h) => h.w);
    const stem = t.length > 5 ? t.slice(0, -2) : t.length > 4 ? t.slice(0, -1) : t;
    return D.WORDS.filter((w) => ruVariants(w.ru).some((v) => v.split(' ').some((part) => part.startsWith(stem)))).slice(0, 2);
  }

  /**
   * Перевод без ИИ. lang: 'ru' | 'de' | 'auto'.
   * Возвращает { lang, kind: 'word' | 'phrase' | 'none', hits, tokens }.
   */
  function translate(text, lang = 'auto') {
    const q = String(text || '').trim();
    if (!q) return { lang: null, kind: 'none', hits: [], tokens: [] };
    const src = lang === 'auto' ? (isCyr(q) ? 'ru' : 'de') : lang;
    const hits = search(q, src);
    const words = tokens(q);
    if (words.length <= 1 || (hits.length && hits[0].exact)) return { lang: src, kind: hits.length ? 'word' : 'none', hits, tokens: [] };
    const toks = words.slice(0, 20).map((tok) => (src === 'de'
      ? { tok, hit: lookupDeToken(tok) }
      : { tok, ru: RU_FUNC[lower(tok)] ? [] : lookupRuToken(tok), func: RU_FUNC[lower(tok)] || '' }));
    return { lang: src, kind: 'phrase', hits: [], tokens: toks };
  }

  window.DW_TR = Object.freeze({ translate, declension, genderHint, verbInfo, isCyr, VERBS });
})();
