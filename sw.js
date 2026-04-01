const CACHE_NAME = 'bacpc-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './apple-touch-icon.png',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js',
    './schemas/image1.png',
    './schemas/image11.png',
    './schemas/image13.png',
    './schemas/image15.png',
    './schemas/image17.png',
    './schemas/image19.png',
    './schemas/image21.png',
    './schemas/image23.png',
    './schemas/image25.png',
    './schemas/image27.png',
    './schemas/image29.png',
    './schemas/image3.png',
    './schemas/image31.png',
    './schemas/image33.png',
    './schemas/image35.png',
    './schemas/image37.png',
    './schemas/image39.png',
    './schemas/image41.png',
    './schemas/image43.png',
    './schemas/image45.png',
    './schemas/image47.png',
    './schemas/image49.png',
    './schemas/image5.png',
    './schemas/image51.png',
    './schemas/image53.png',
    './schemas/image55.png',
    './schemas/image57.png',
    './schemas/image59.png',
    './schemas/image61.png',
    './schemas/image63.png',
    './schemas/image65.png',
    './schemas/image67.png',
    './schemas/image69.png',
    './schemas/image7.png',
    './schemas/image71.png',
    './schemas/image73.png',
    './schemas/image75.png',
    './schemas/image77.png',
    './schemas/image79.png',
    './schemas/image81.png',
    './schemas/image83.png',
    './schemas/image85.png',
    './schemas/image87.png',
    './schemas/image89.png',
    './schemas/image9.png',
    './schemas/image91.png',
    './schemas/image93.png',
    './schemas/image95.png',
    './schemas/image97.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
