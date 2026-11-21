/* Service worker Deutschweg: файлы приложения хранятся на устройстве, чтобы оно работало без интернета. */
const CACHE = 'deutschweg-808a0fe1b6d2';
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./achievements.js",
  "./app.js",
  "./cards.js",
  "./data-a1.js",
  "./data-a2.js",
  "./data-b1.js",
  "./errors.js",
  "./exam.js",
  "./guide-data.js",
  "./guide.js",
  "./install.js",
  "./mistakes.js",
  "./mywords.js",
  "./phrases.js",
  "./placement.js",
  "./pos.js",
  "./practice.js",
  "./reading.js",
  "./texts.js",
  "./theory.js",
  "./translate-dict.js",
  "./translate.js",
  "./verbs.js",
  "./vocab-a1.js",
  "./vocab-a2.js",
  "./vocab-b1.js",
  "./vocab2-a.js",
  "./vocab2-b.js",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png"
];
const FONT_CACHE = 'deutschweg-fonts';

self.addEventListener('install', (e) => {
  // cache: 'reload' — берём файлы с сервера, а не из кэша браузера, иначе новая версия может сохранить старые файлы.
  e.waitUntil(caches.open(CACHE)
    .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== FONT_CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === 'navigate') {
      e.respondWith(caches.match('./index.html').then((hit) => hit || fetch(req)));
      return;
    }
    e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT_CACHE).then((c) => c.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
