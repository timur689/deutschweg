/* Установка и «поделиться» для веб-версии (GitHub Pages): кнопка установки, подсказки по устройствам,
   QR-код со ссылкой и баннер на главной. В версии для claude.ai не подключается. */
(() => {
  'use strict';
  const D = window.DW;
  if (!D || !D.STANDALONE) return;
  const { esc } = D;

  const SITE_URL = 'https://timur689.github.io/deutschweg/';
  const PROFILE_URL = `${SITE_URL}Deutschweg.mobileconfig`;
  const QR_SIZE = 33;
  const QR_PATH = 'M2 2h7v1h-7zM12 2h2v1h-2zM16 2h2v1h-2zM20 2h2v1h-2zM24 2h7v1h-7zM2 3h1v1h-1zM8 3h1v1h-1zM11 3h1v1h-1zM13 3h5v1h-5zM22 3h1v1h-1zM24 3h1v1h-1zM30 3h1v1h-1zM2 4h1v1h-1zM4 4h3v1h-3zM8 4h1v1h-1zM11 4h2v1h-2zM14 4h1v1h-1zM16 4h1v1h-1zM19 4h2v1h-2zM22 4h1v1h-1zM24 4h1v1h-1zM26 4h3v1h-3zM30 4h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM11 5h1v1h-1zM13 5h2v1h-2zM17 5h1v1h-1zM21 5h2v1h-2zM24 5h1v1h-1zM26 5h3v1h-3zM30 5h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM12 6h1v1h-1zM16 6h5v1h-5zM24 6h1v1h-1zM26 6h3v1h-3zM30 6h1v1h-1zM2 7h1v1h-1zM8 7h1v1h-1zM10 7h4v1h-4zM17 7h6v1h-6zM24 7h1v1h-1zM30 7h1v1h-1zM2 8h7v1h-7zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM22 8h1v1h-1zM24 8h7v1h-7zM12 9h1v1h-1zM16 9h1v1h-1zM19 9h1v1h-1zM2 10h1v1h-1zM5 10h1v1h-1zM7 10h2v1h-2zM10 10h2v1h-2zM13 10h2v1h-2zM21 10h1v1h-1zM23 10h1v1h-1zM25 10h1v1h-1zM2 11h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM9 11h1v1h-1zM12 11h1v1h-1zM14 11h2v1h-2zM18 11h1v1h-1zM22 11h1v1h-1zM24 11h1v1h-1zM27 11h1v1h-1zM30 11h1v1h-1zM3 12h1v1h-1zM7 12h2v1h-2zM11 12h2v1h-2zM15 12h2v1h-2zM20 12h3v1h-3zM25 12h5v1h-5zM4 13h1v1h-1zM6 13h2v1h-2zM10 13h3v1h-3zM15 13h3v1h-3zM20 13h2v1h-2zM23 13h3v1h-3zM28 13h2v1h-2zM2 14h1v1h-1zM4 14h2v1h-2zM7 14h2v1h-2zM10 14h4v1h-4zM16 14h4v1h-4zM24 14h2v1h-2zM27 14h1v1h-1zM29 14h2v1h-2zM2 15h2v1h-2zM5 15h3v1h-3zM9 15h1v1h-1zM11 15h2v1h-2zM14 15h2v1h-2zM21 15h2v1h-2zM4 16h1v1h-1zM6 16h4v1h-4zM12 16h2v1h-2zM15 16h2v1h-2zM22 16h3v1h-3zM26 16h5v1h-5zM3 17h2v1h-2zM7 17h1v1h-1zM9 17h1v1h-1zM11 17h1v1h-1zM13 17h1v1h-1zM19 17h3v1h-3zM23 17h2v1h-2zM26 17h2v1h-2zM29 17h1v1h-1zM4 18h1v1h-1zM6 18h1v1h-1zM8 18h1v1h-1zM10 18h3v1h-3zM15 18h1v1h-1zM19 18h2v1h-2zM22 18h1v1h-1zM29 18h1v1h-1zM3 19h2v1h-2zM6 19h2v1h-2zM15 19h2v1h-2zM18 19h2v1h-2zM24 19h2v1h-2zM27 19h1v1h-1zM30 19h1v1h-1zM2 20h1v1h-1zM4 20h1v1h-1zM8 20h3v1h-3zM13 20h1v1h-1zM16 20h1v1h-1zM19 20h1v1h-1zM25 20h2v1h-2zM29 20h2v1h-2zM4 21h2v1h-2zM7 21h1v1h-1zM12 21h3v1h-3zM16 21h1v1h-1zM18 21h9v1h-9zM29 21h2v1h-2zM2 22h1v1h-1zM6 22h1v1h-1zM8 22h3v1h-3zM14 22h1v1h-1zM22 22h5v1h-5zM28 22h1v1h-1zM10 23h2v1h-2zM13 23h2v1h-2zM16 23h1v1h-1zM18 23h2v1h-2zM21 23h2v1h-2zM26 23h1v1h-1zM28 23h3v1h-3zM2 24h7v1h-7zM12 24h2v1h-2zM22 24h1v1h-1zM24 24h1v1h-1zM26 24h1v1h-1zM29 24h1v1h-1zM2 25h1v1h-1zM8 25h1v1h-1zM10 25h2v1h-2zM13 25h2v1h-2zM16 25h3v1h-3zM22 25h1v1h-1zM26 25h5v1h-5zM2 26h1v1h-1zM4 26h3v1h-3zM8 26h1v1h-1zM11 26h4v1h-4zM19 26h1v1h-1zM22 26h5v1h-5zM29 26h2v1h-2zM2 27h1v1h-1zM4 27h3v1h-3zM8 27h1v1h-1zM10 27h4v1h-4zM19 27h1v1h-1zM22 27h8v1h-8zM2 28h1v1h-1zM4 28h3v1h-3zM8 28h1v1h-1zM11 28h1v1h-1zM14 28h2v1h-2zM19 28h1v1h-1zM21 28h3v1h-3zM26 28h3v1h-3zM30 28h1v1h-1zM2 29h1v1h-1zM8 29h1v1h-1zM11 29h3v1h-3zM15 29h1v1h-1zM17 29h9v1h-9zM29 29h1v1h-1zM2 30h7v1h-7zM10 30h2v1h-2zM13 30h3v1h-3zM18 30h2v1h-2zM21 30h3v1h-3zM25 30h2v1h-2zM29 30h1v1h-1z';
  const DISMISS_KEY = 'dw-install-banner-hidden';

  const ua = navigator.userAgent || '';
  const IS_ANDROID = /Android/i.test(ua);
  const IS_IOS = !IS_ANDROID && (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  const IN_APP_BROWSER = /Instagram|FBAN|FBAV|Telegram|Line\/|WhatsApp|VK/i.test(ua);
  const isInstalled = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

  let installPrompt = null;
  let shareMsg = '';
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; refreshIfVisible(); });
  window.addEventListener('appinstalled', () => { installPrompt = null; refreshIfVisible(); });

  const readHidden = () => { try { return localStorage.getItem(DISMISS_KEY) === '1'; } catch (e) { return false; } };
  const writeHidden = () => { try { localStorage.setItem(DISMISS_KEY, '1'); } catch (e) { /* без хранилища баннер просто вернётся */ } };
  const onHome = () => ['', '#', '#path'].includes(location.hash);
  function refreshIfVisible() { if (location.hash === '#install' || onHome()) D.render(); }

  const SHARE_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px"><path d="M12 15V3M8 7l4-4 4 4"/><path d="M6 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1"/></svg>';
  const qrSvg = () => `<svg viewBox="0 0 ${QR_SIZE} ${QR_SIZE}" width="200" height="200" shape-rendering="crispEdges" role="img" aria-label="QR-код со ссылкой на Deutschweg"><rect width="${QR_SIZE}" height="${QR_SIZE}" fill="#fff"/><path d="${QR_PATH}" fill="#000"/></svg>`;

  const IOS_STEPS = `<ol><li>Откройте эту страницу в <b>Safari</b>.</li>
    <li>Нажмите «Поделиться» ${SHARE_ICON} внизу экрана (в новом Safari — сначала <b>⋯</b>, потом «Поделиться»).</li>
    <li>Пролистайте меню вниз и выберите <b>«На экран „Домой"»</b> → <b>«Добавить»</b>.</li></ol>`;
  const IOS_PROFILE = `<p class="small muted">Нет такого пункта? Скачайте <a href="${PROFILE_URL}">значок-профиль</a>: Safari спросит про загрузку → «Разрешить». Затем откройте <b>Настройки → «Профиль загружен» → Установить</b>. Если файл скачался, откройте его в приложении «Файлы» → «Загрузки».</p>`;
  const ANDROID_STEPS = `<ol><li>Откройте эту страницу в <b>Chrome</b>.</li>
    <li>Нажмите <b>⋮</b> в правом верхнем углу.</li>
    <li>Выберите <b>«Установить приложение»</b> или <b>«Добавить на главный экран»</b>.</li></ol>`;
  const DESKTOP_STEPS = `<ul><li><b>Chrome, Edge:</b> значок установки справа в адресной строке или меню → «Установить Deutschweg».</li>
    <li><b>Safari на Mac:</b> меню «Файл» → «Добавить в Dock».</li></ul>`;

  function thisDeviceBlock() {
    if (isInstalled()) return '<p><span class="pill ok">Приложение установлено</span></p><p class="small muted">Оно открывается со значка и работает без интернета.</p>';
    const warn = IN_APP_BROWSER ? '<p class="small"><b>Страница открыта внутри мессенджера.</b> Нажмите ⋯ и выберите «Открыть в браузере» — установить можно только оттуда.</p>' : '';
    if (installPrompt) return `${warn}<div class="row"><button class="btn primary" data-act="inst-prompt">Установить приложение</button></div><p class="small muted">Появится значок на главном экране, приложение будет открываться отдельно и работать без интернета.</p>`;
    if (IS_IOS) return warn + IOS_STEPS + IOS_PROFILE;
    if (IS_ANDROID) return warn + ANDROID_STEPS;
    return warn + DESKTOP_STEPS;
  }

  function renderInstall() {
    const canShare = typeof navigator.share === 'function';
    return `<div class="stack">
      <a class="back" href="#practice">← Практика</a>
      <div class="stack" style="gap:6px"><h1>Установить и поделиться</h1>
        <p class="muted">Deutschweg ставится на телефон и компьютер как обычное приложение: значок на экране, открывается без адресной строки, работает без интернета.</p></div>
      <section class="panel rule-body"><h2>На это устройство</h2>${thisDeviceBlock()}</section>
      <section class="panel stack" style="align-items:center;text-align:center">
        <h2>Поделиться с друзьями</h2>
        <p class="small muted">Наведите камеру телефона на код — откроется приложение. Регистрация не нужна, у каждого свой прогресс.</p>
        <div style="background:#fff;padding:12px;border-radius:18px;line-height:0">${qrSvg()}</div>
        <p class="small" style="word-break:break-all"><b>${esc(SITE_URL)}</b></p>
        <div class="row" style="justify-content:center">${canShare ? '<button class="btn primary small" data-act="inst-share">Отправить ссылку</button>' : ''}<button class="btn small" data-act="inst-copy">Скопировать ссылку</button></div>
        ${shareMsg ? `<p class="small">${esc(shareMsg)}</p>` : ''}
      </section>
      <section class="panel rule-body"><h2>Другие устройства</h2>
        <details><summary><b>iPhone и iPad</b></summary>${IOS_STEPS}${IOS_PROFILE}</details>
        <details><summary><b>Android</b></summary>${ANDROID_STEPS}</details>
        <details><summary><b>Компьютер</b></summary>${DESKTOP_STEPS}</details>
        <p class="small muted">Прогресс хранится на каждом устройстве отдельно. Перенести его можно в <a href="#stats">Статистике → «Перенос прогресса»</a>.</p>
      </section>
    </div>`;
  }

  /* Баннер на главной: пока приложение не установлено и баннер не закрыт. */
  function injectBanner() {
    if (!onHome() || isInstalled() || readHidden() || document.getElementById('instBanner')) return;
    const app = document.getElementById('app');
    if (!app || !app.firstElementChild) return;
    const el = document.createElement('section');
    el.id = 'instBanner';
    el.className = 'panel row';
    el.style.cssText = 'justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px';
    el.innerHTML = `<span><b>Установите Deutschweg</b><br><span class="small muted">Значок на экране, работает без интернета</span></span>
      <span class="row" style="gap:6px;flex-wrap:nowrap"><a class="btn primary small" href="#install">Установить</a><button class="icon-btn" data-act="inst-hide" aria-label="Скрыть" title="Скрыть">✕</button></span>`;
    app.insertBefore(el, app.firstElementChild);
  }

  async function shareLink() {
    try { await navigator.share({ title: 'Deutschweg', text: 'Учу немецкий в Deutschweg — попробуй:', url: SITE_URL }); shareMsg = ''; } catch (e) { shareMsg = ''; }
    D.render();
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(SITE_URL); shareMsg = 'Ссылка скопирована.'; } catch (e) { shareMsg = 'Не получилось скопировать — выделите ссылку выше и скопируйте вручную.'; }
    D.render();
  }
  async function promptInstall() {
    if (!installPrompt) return;
    const p = installPrompt;
    installPrompt = null;
    try { await p.prompt(); await p.userChoice; } catch (e) { /* пользователь закрыл окно установки */ }
    D.render();
  }

  D.register({
    views: { install: renderInstall },
    nav: { install: 'practice' },
    actions: {
      'inst-prompt': () => promptInstall(),
      'inst-share': () => shareLink(),
      'inst-copy': () => copyLink(),
      'inst-hide': () => { writeHidden(); const b = document.getElementById('instBanner'); if (b) b.remove(); },
    },
    hooks: { afterRender: injectBanner },
  });
})();
