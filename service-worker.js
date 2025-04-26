const CACHE_NAME = 'aphorism-cache-v6'; // 🆕 Обнови номер кешу!
const urlsToCache = [
  './',
  './index.html',
  './aphorisms-ua.txt',
  './aphorisms-en.txt',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // 🚀 миттєво активувати новий Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // 🚀 одразу перехопити керування
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
