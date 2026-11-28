/* Проверка письма без ИИ: обращение, запятая и строчная буква после него, прощание и подпись,
   «ты» / «Вы» без смешения, пункты задания и длина. Возвращает список замечаний для letters.js. */
(() => {
  'use strict';
  const fold = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  const norm = (s) => ` ${fold(s).replace(/[^a-z0-9*]+/g, ' ').trim()} `;
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keyRe = (kw) => new RegExp(` ${norm(kw).trim().split('*').map(escRe).join('[a-z0-9]*')} `);
  const hasKey = (text, kw) => keyRe(kw).test(text);
  const LETTER = /[A-Za-zÄÖÜäöüß0-9]/;

  const FORMAL_OPEN = /^(sehr geehrte[rn]?|guten (tag|morgen|abend))\b/;
  const WARM_FORMAL = /^(liebe[rn]?|hallo) (frau|herr)\b/;
  const INFORMAL_OPEN = /^(liebe[rns]?|hallo|hi|hey|servus|moin|salut)\b/;
  const DAYS = 'montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag';
  const CLOSE = [
    /^(mit )?(freundlichen|freundlichem|freundliche|viele[n]?|liebe[n]?|herzliche[n]?|beste[n]?|schoene[n]?|sonnige) gr(ue|u)sse?n?\b/,
    /^(gruss|gruesse|lg|vg|mfg|hochachtungsvoll|ciao|tschuess|tschuss)\b/,
    new RegExp(`^bis (bald|dann|spaeter|morgen|gleich|nachher|demnaechst|${DAYS})\\b`),
  ];
  const SIGN = /^(dein|deine|ihr|ihre|euer|eure) \S/;
  const INFORMAL_CLOSE = /^(liebe|herzliche|bis |lg\b|ciao|tschuess|tschuss)/;
  const FORMAL_CLOSE = /^(mit freundlichen|freundliche|hochachtungsvoll|mfg\b)/;
  /** Слова, которые после «Liebe Anna,» пишут с маленькой буквы (существительные и Sie сюда не входят). */
  const LOWER_STARTERS = new Set(('ich wir vielen danke leider wie gestern heute morgen am im in seit mein meine es das der die '
    + 'nach endlich entschuldige entschuldigen bitte hier jetzt lange herzlichen herzlich schöne viele mit bei wann was wo warum '
    + 'gern gerne zuerst nun ja nein hast haben kannst können könnten möchte ich wegen weil als da zum zur auf für über unser '
    + 'unsere hoffentlich schon so oh super toll wow letzte letzten vor wir').split(' '));
  const DU = /(^|[^A-Za-zÄÖÜäöüß])(du|dich|dir|dein|deine|deinen|deinem|deiner|deines)(?![A-Za-zÄÖÜäöüß])/i;
  const LOWER_SIE = /\b([Kk]önnen|[Kk]önnten|[Ww]ürden|[Hh]aben|[Ww]ären|[Mm]öchten|[Dd]ürfen|[Dd]anke|[Bb]itte) (sie|ihnen)\b/;
  const LOWER_IHNEN = /(^|[^A-Za-zÄÖÜäöüß])ihnen(?![A-Za-zÄÖÜäöüß])/;
  const MID_SIE = /[a-zäöüß0-9,;]\s+(Sie|Ihnen|Ihre[nmrs]?|Ihr)(?![A-Za-zÄÖÜäöüß])/;

  /** Ожидаемое обращение для задания: «Sehr geehrte Frau Wolf,» / «Lieber Paul,». */
  function expectedAnrede(task) {
    const { g, name } = task.to;
    if (task.reg === 'f') return g === 'm' ? `Sehr geehrter Herr ${name},` : g === 'f' ? `Sehr geehrte Frau ${name},` : 'Sehr geehrte Damen und Herren,';
    return g === 'm' ? `Lieber ${name},` : `Liebe ${name},`;
  }
  const expectedGruss = (task) => (task.reg === 'f' ? 'Mit freundlichen Grüßen' : 'Liebe Grüße');

  function checkAnrede(first, task, add) {
    const cut = first.search(/[,!]/);
    const g = fold(cut >= 0 ? first.slice(0, cut) : first).trim();
    const formal = FORMAL_OPEN.test(g);
    const warm = WARM_FORMAL.test(g);
    const informal = !formal && !warm && INFORMAL_OPEN.test(g);
    const want = expectedAnrede(task);
    if (!formal && !warm && !informal) { add('bad', `Начните с обращения, например: «${want}»`); return null; }
    const name = fold(task.to.name || '');
    if (/^sehr geehrte herr\b/.test(g)) add('bad', 'Herr — мужской род: «Sehr geehrter Herr …» (с -er).');
    else if (/^sehr geehrter (frau|damen)\b/.test(g)) add('bad', 'Frau — женский род: «Sehr geehrte Frau …» (без -r).');
    else if (/^liebe herr\b/.test(g) || (name && task.to.g === 'm' && g === `liebe ${name}`)) add('bad', `Мужчине пишут «Lieber …»: «${task.reg === 'f' ? `Lieber Herr ${task.to.name}` : want.slice(0, -1)}».`);
    else if (/^lieber frau\b/.test(g) || (name && task.to.g === 'f' && g === `lieber ${name}`)) add('bad', `Женщине пишут «Liebe …»: «${task.reg === 'f' ? `Liebe Frau ${task.to.name}` : want.slice(0, -1)}».`);
    else if (task.reg === 'f' && informal) add('bad', `Это письмо на «Вы» — так начинают письмо другу. Лучше: «${want}»`);
    else if (task.reg === 'f' && /^hallo/.test(g)) add('warn', `«Hallo» для официального письма звучит слишком просто. Лучше: «${want}»`);
    else if (task.reg === 'i' && (formal || warm)) add('warn', `Другу так официально не пишут. Лучше: «${want}»`);
    else add('ok', 'Обращение подходит.');
    const mark = cut >= 0 ? first[cut] : '';
    if (!mark) add('bad', `После обращения нужна запятая: «${want}»`);
    else if (mark === '!') add('warn', 'Восклицательный знак после обращения — устаревший вариант. Сейчас ставят запятую и продолжают с маленькой буквы.');
    return { rest: cut >= 0 ? first.slice(cut + 1).trim() : '', mark };
  }

  function checkLowercase(next, add) {
    const word = (next.match(/^[A-Za-zÄÖÜäöüß]+/) || [''])[0];
    if (!word || !/^[A-ZÄÖÜ]/.test(word) || !LOWER_STARTERS.has(word.toLowerCase())) return;
    add('bad', `После запятой письмо продолжают с маленькой буквы: «${word.toLowerCase()} …», а не «${word} …».`);
  }

  function findClose(lines) {
    for (let i = lines.length - 1; i >= Math.max(1, lines.length - 4); i -= 1) {
      const f = fold(lines[i]);
      if (CLOSE.some((re) => re.test(f))) return { idx: i, sign: false };
    }
    for (let i = lines.length - 1; i >= Math.max(1, lines.length - 2); i -= 1) {
      if (SIGN.test(fold(lines[i]))) return { idx: i, sign: true };
    }
    return null;
  }

  function checkClose(lines, task, add) {
    const found = findClose(lines);
    if (!found) { add('bad', `В конце нужно прощание — «${expectedGruss(task)}», а на следующей строке ваше имя.`); return lines.length; }
    const line = lines[found.idx];
    const f = fold(line);
    if (found.sign) {
      if (task.reg === 'f' && /^dein/.test(f)) add('warn', `«Dein / Deine» — это для друзей. В официальном письме: «${expectedGruss(task)}» и имя.`);
      else add('ok', 'Подпись есть.');
      return found.idx;
    }
    let good = true;
    const sameLineName = /,\s*\S/.test(line);
    if (/^mit freundliche[m]? gr/.test(f)) { add('bad', 'Правильно: «Mit freundlichen Grüßen» (mit + Dativ: -en).'); good = false; }
    if (/,\s*$/.test(line)) { add('bad', `После «${line.replace(/,\s*$/, '')}» запятая не нужна.`); good = false; }
    else if (/\.\s*$/.test(line)) { add('warn', 'После прощания точку не ставят.'); good = false; }
    if (task.reg === 'f' && INFORMAL_CLOSE.test(f)) { add('warn', `«${line}» — слишком по-дружески для официального письма. Лучше: «Mit freundlichen Grüßen».`); good = false; }
    if (task.reg === 'i' && FORMAL_CLOSE.test(f)) { add('warn', '«Mit freundlichen Grüßen» другу — слишком официально. Лучше «Liebe Grüße» или «Viele Grüße».'); good = false; }
    if (found.idx === lines.length - 1 && !sameLineName) { add('bad', 'Подпишитесь: на строке под прощанием — ваше имя.'); good = false; }
    else if (sameLineName) add('warn', 'Имя обычно пишут на отдельной строке под прощанием, без запятой.');
    if (good && !sameLineName) add('ok', 'Прощание и подпись на месте.');
    return found.idx;
  }

  function checkAddress(body, task, add) {
    if (task.reg === 'f') {
      const du = body.match(DU);
      if (du) add('bad', `Письмо на «Вы», а у вас «${du[2]}». Пишите Sie, Ihnen, Ihr.`);
      if (LOWER_IHNEN.test(body) || LOWER_SIE.test(body)) add('bad', '«Sie, Ihnen, Ihr» в значении «Вы» пишутся с большой буквы: «Könnten Sie …», «Ich danke Ihnen».');
      if (!du && !LOWER_IHNEN.test(body) && !LOWER_SIE.test(body)) add('ok', 'Обращение на «Вы» выдержано.');
      return;
    }
    const sie = body.match(MID_SIE);
    if (sie) add('warn', `Вы пишете другу на «ты», а «${sie[1]}» — это «Вы». Другу: du, dich, dir, dein.`);
    else add('ok', 'Обращение на «ты» выдержано.');
  }

  /**
   * @param {string} text — письмо ученика
   * @param {{reg:'f'|'i', to:{g:string,name:string}, min:number, lvl:string, betreff?:boolean, points:{need:string[][]}[]}} task
   * @returns {{ empty: boolean, checks: {lv:'ok'|'warn'|'bad', msg:string}[], points: boolean[], words: number }}
   */
  function checkLetter(text, task) {
    const checks = [];
    const add = (lv, msg) => checks.push({ lv, msg });
    let lines = String(text || '').replace(/\r/g, '').split('\n').map((l) => l.trim()).filter(Boolean);
    const hasBetreff = lines.length > 0 && /^betreff\s*:/i.test(lines[0]);
    if (hasBetreff) lines = lines.slice(1);
    const words = lines.join(' ').split(/\s+/).filter((w) => LETTER.test(w)).length;
    if (!words) return { empty: true, checks, points: task.points.map(() => false), words };

    if (lines.length < 3) add('warn', 'Пишите письмо по строкам: обращение, текст, прощание и имя — каждое с новой строки.');
    if (task.betreff && !hasBetreff) add('warn', 'Для e-mail добавьте первой строкой тему: «Betreff: …».');
    const head = checkAnrede(lines[0], task, add);
    if (head && head.mark === ',') checkLowercase(head.rest || lines[1] || '', add);
    const end = checkClose(lines, task, add);
    const body = [head ? head.rest : lines[0], ...lines.slice(1, end)].join('\n');
    checkAddress(body, task, add);

    const all = norm(lines.join(' '));
    const points = task.points.map((p) => p.need.every((group) => group.some((kw) => hasKey(all, kw))));
    if (words < task.min) add('warn', `Пока ${words} слов — для ${task.lvl} нужно около ${task.min}. Добавьте по предложению к пунктам.`);
    else add('ok', `${words} слов — хорошая длина.`);
    return { empty: false, checks, points, words };
  }

  const api = { checkLetter, expectedAnrede, expectedGruss };
  if (typeof window !== 'undefined') window.DE_letterCheck = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
