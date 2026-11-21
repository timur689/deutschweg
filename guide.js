/* Шпаргалки: список шпаргалок по уровням и страница шпаргалки. Данные — guide-data.js. */
(() => {
  'use strict';
  const D = window.DW;
  const GUIDE = Array.isArray(window.DE_GUIDE) ? window.DE_GUIDE : [];
  if (!D || !GUIDE.length) return;
  const { esc, RULE } = D;

  const LEVELS = [
    { id: 'A1', t: 'Основы: род, падеж, глагол, отрицание, маленькие предлоги' },
    { id: 'A2', t: 'Времена, предлоги, окончания, связки' },
    { id: 'B1', t: 'Сложные конструкции и чтение' },
  ];
  const BY = Object.fromEntries(GUIDE.map((g) => [g.id, g]));
  const withTables = (html) => html.replace(/<table>/g, '<div class="tbl"><table>').replace(/<\/table>/g, '</table></div>');

  const topicLink = (g) => `<a class="rule-link" href="#gd-${g.id}"><span><b>${esc(g.t)}</b><br><span class="small muted">${esc(g.s)}</span></span></a>`;

  function renderList() {
    return `<div class="stack">
      ${D.subnav('grammar', 'guide')}
      <div class="stack" style="gap:6px"><h1>Шпаргалки</h1>
        <p class="muted">Короткие подсказки «как выбрать»: der, die или das, какой падеж, куда ставить глагол, какой предлог. В каждой — вывод в одну строку, шаги и примеры.</p></div>
      <div class="levels lv-wide" role="group" aria-label="Перейти к уровню">
        ${LEVELS.map((l) => `<a class="lv" href="#gd-lvl-${l.id}"><b>${l.id}</b></a>`).join('')}
      </div>
      ${LEVELS.map((l) => `<section class="stack" style="gap:10px" id="gd-lvl-${l.id}">
        <div class="lvl-head">${l.id} <span>${esc(l.t)}</span></div>
        <div class="rule-links">${GUIDE.filter((g) => g.lvl === l.id).map(topicLink).join('')}</div></section>`).join('')}
    </div>`;
  }

  function relatedRules(g) {
    const links = g.r.filter((id) => RULE[id]).map((id) => `<a class="rule-link" href="#rule-${id}"><span><span class="eyebrow">${RULE[id].level}</span><br><b>${esc(RULE[id].t)}</b></span><span class="pill">Правило</span></a>`);
    return links.length ? `<section class="stack" style="gap:10px"><h2>Подробнее в правилах</h2><div class="rule-links">${links.join('')}</div></section>` : '';
  }

  function renderTopic(id) {
    if (id.startsWith('lvl-')) return renderList();
    const g = BY[id];
    if (!g) return renderList();
    const i = GUIDE.indexOf(g);
    const prev = GUIDE[i - 1];
    const next = GUIDE[i + 1];
    return `<div class="stack">
      <a class="back" href="#guide">← Все шпаргалки</a>
      <div class="stack" style="gap:6px"><p class="eyebrow">${g.lvl} · Шпаргалка</p><h1>${esc(g.t)}</h1></div>
      <section class="panel rule-body guide-body">${withTables(g.b)}</section>
      ${relatedRules(g)}
      <div class="row" style="justify-content:space-between">
        ${prev ? `<a class="btn ghost" href="#gd-${prev.id}">← ${esc(prev.t)}</a>` : '<span></span>'}
        ${next ? `<a class="btn ghost" href="#gd-${next.id}">${esc(next.t)} →</a>` : ''}
      </div>
    </div>`;
  }

  /* Кнопки уровней на странице списка прокручивают к разделу, не меняя адрес. */
  function onClick(e) {
    const a = e.target.closest('a[href^="#gd-lvl-"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.addEventListener('click', onClick);

  D.register({
    views: { guide: renderList, gd: (id) => renderTopic(id || '') },
    prefixes: [['gd-', 'gd']],
    nav: { guide: 'rules', gd: 'rules' },
  });
})();
