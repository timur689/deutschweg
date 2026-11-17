/* Достижения: считаются по прогрессу, новые показываются всплывающим сообщением. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D) return;
  const { esc } = D;
  const TOAST_MS = 4500;

  function metrics() {
    const st = D.getState();
    const days = Object.values(st.days || {});
    const words = st.words || {};
    const best = Math.max(D.streak(), Number(D.getExt('bestStreak')) || 0);
    const levelDone = (lv) => D.UNITS.filter((u) => u.level.startsWith(lv)).every((u) => D.unitDone(u) && !(st.units[u.id] || {}).skip);
    const exam = D.getExt('exam') || {};
    return {
      answers: days.reduce((a, b) => a + b, 0),
      bestDay: days.length ? Math.max(...days) : 0,
      streak: best,
      started: Object.values(words).filter((w) => w.b > 0).length,
      known: Object.values(words).filter((w) => w.b >= D.KNOWN_BOX).length,
      lessons: D.UNITS.filter((u) => D.unitDone(u) && !(st.units[u.id] || {}).skip).length,
      rules: Object.values(st.rules || {}).filter((v) => v >= 0.6).length,
      read: Object.keys(D.getExt('read') || {}).length,
      a1: levelDone('A1'), a2: levelDone('A2'), b1: levelDone('B1'),
      examA1: (exam.A1 || 0) >= 0.6, examA2: (exam.A2 || 0) >= 0.6, examB1: (exam.B1 || 0) >= 0.6,
      placement: !!D.getExt('placement'),
    };
  }

  /* [id, иконка, название, описание, метрика, цель] — для булевых целей цель = true */
  const LIST = [
    ['first', '✦', 'Первый шаг', 'Ответить на первый вопрос', 'answers', 1],
    ['goal', '◎', 'Цель дня', '30 ответов за один день', 'bestDay', 30],
    ['marathon', '⚡', 'Марафон', '100 ответов за один день', 'bestDay', 100],
    ['s3', '↗', 'Три дня подряд', 'Серия 3 дня', 'streak', 3],
    ['s7', '↗', 'Неделя', 'Серия 7 дней', 'streak', 7],
    ['s30', '↗', 'Месяц без пропусков', 'Серия 30 дней', 'streak', 30],
    ['s100', '♛', 'Сто дней', 'Серия 100 дней', 'streak', 100],
    ['w50', 'Aa', '50 слов', '50 слов в работе', 'started', 50],
    ['w250', 'Aa', '250 слов', '250 слов в работе', 'started', 250],
    ['w1000', 'Aa', '1000 слов', '1000 слов в работе', 'started', 1000],
    ['w2000', 'Aa', 'Весь словарь', '2000 слов в работе', 'started', 2000],
    ['k100', '★', 'Сто выученных', '100 слов выучено надолго', 'known', 100],
    ['k500', '★', 'Пятьсот выученных', '500 слов выучено надолго', 'known', 500],
    ['l1', '①', 'Первый урок', 'Пройти урок целиком', 'lessons', 1],
    ['l10', '⑩', 'Десять уроков', 'Пройти 10 уроков', 'lessons', 10],
    ['r10', '§', 'Знаток правил', 'Сдать 10 правил', 'rules', 10],
    ['r61', '§', 'Вся грамматика', 'Сдать все правила курса', 'rules', 61],
    ['read5', '❡', 'Читатель', 'Прочитать 5 текстов', 'read', 5],
    ['a1', 'A1', 'Уровень A1', 'Пройти все уроки A1', 'a1', true],
    ['a2', 'A2', 'Уровень A2', 'Пройти все уроки A2', 'a2', true],
    ['b1', 'B1', 'Уровень B1', 'Пройти все уроки B1', 'b1', true],
    ['ea1', '✓', 'Экзамен A1', 'Сдать пробный экзамен A1', 'examA1', true],
    ['ea2', '✓', 'Экзамен A2', 'Сдать пробный экзамен A2', 'examA2', true],
    ['eb1', '✓', 'Экзамен B1', 'Сдать пробный экзамен B1', 'examB1', true],
    ['place', '⌖', 'Знаю свой уровень', 'Пройти тест на уровень', 'placement', true],
  ];
  const earnedNow = (m) => LIST.filter(([, , , , key, goal]) => (goal === true ? m[key] === true : m[key] >= goal));

  function toast(text) {
    let el = document.getElementById('achToast');
    if (!el) { el = document.createElement('div'); el.id = 'achToast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.innerHTML = text;
    el.hidden = false;
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.hidden = true; }, TOAST_MS);
  }

  /* После каждой отрисовки проверяем, не появилось ли новое достижение. */
  function check() {
    const st = D.getState();
    if (!st.updated) return;
    const m = metrics();
    const stored = D.getExt('ach') || {};
    if (D.streak() > (Number(D.getExt('bestStreak')) || 0)) D.setExt('bestStreak', D.streak());
    const fresh = earnedNow(m).filter(([id]) => !stored[id]);
    if (!fresh.length) return;
    const today = D.dayKey();
    D.setExt('ach', { ...stored, ...Object.fromEntries(fresh.map(([id]) => [id, today])) });
    D.commit();
    const [, icon, title] = fresh[fresh.length - 1];
    toast(`<span class="ach-ico">${icon}</span><span><b>Новое достижение</b><br>${esc(title)}${fresh.length > 1 ? ` и ещё ${fresh.length - 1}` : ''}</span>`);
  }

  function render() {
    const m = metrics();
    const stored = D.getExt('ach') || {};
    const got = LIST.filter(([id]) => stored[id]).length;
    return `<a class="back" href="#practice">← Практика</a>
      <div class="page-head"><h1>Достижения</h1><p class="muted">Получено ${got} из ${LIST.length}. Лучшая серия: ${m.streak} ${D.plural(m.streak, 'день', 'дня', 'дней')}.</p></div>
      <section class="badges">${LIST.map(([id, icon, title, desc, key, goal]) => {
        const has = !!stored[id];
        const progress = goal === true ? '' : `<span class="small muted">${Math.min(m[key], goal)} / ${goal}</span>`;
        return `<div class="pane ach-card ${has ? 'on' : ''}"><span class="ach-ico">${icon}</span><b>${esc(title)}</b><span class="small muted">${esc(desc)}</span>
          ${has ? `<span class="small ok-t">Получено ${esc(stored[id].split('-').reverse().join('.'))}</span>` : progress}</div>`;
      }).join('')}</section>`;
  }

  D.register({ views: { achievements: render }, nav: { achievements: 'practice' }, hooks: { afterRender: check } });
})();
