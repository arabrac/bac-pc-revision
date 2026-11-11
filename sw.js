const CACHE_NAME = 'bacpc-v2.0.1';
const CORE_ASSETS = ['./', './index.html', './manifest.json', './vendor/katex/katex.min.css', './vendor/katex/katex.min.js', './vendor/katex/auto-render.min.js'];
const OPTIONAL_ASSETS = [
  "./data.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./schemas/image1.png",
  "./schemas/image11.png",
  "./schemas/image13.png",
  "./schemas/image15.png",
  "./schemas/image17.png",
  "./schemas/image19.png",
  "./schemas/image21.png",
  "./schemas/image23.png",
  "./schemas/image25.png",
  "./schemas/image27.png",
  "./schemas/image29.png",
  "./schemas/image3.png",
  "./schemas/image31.png",
  "./schemas/image33.png",
  "./schemas/image35.png",
  "./schemas/image37.png",
  "./schemas/image39.png",
  "./schemas/image41.png",
  "./schemas/image43.png",
  "./schemas/image45.png",
  "./schemas/image47.png",
  "./schemas/image49.png",
  "./schemas/image5.png",
  "./schemas/image51.png",
  "./schemas/image53.png",
  "./schemas/image55.png",
  "./schemas/image57.png",
  "./schemas/image59.png",
  "./schemas/image61.png",
  "./schemas/image63.png",
  "./schemas/image65.png",
  "./schemas/image67.png",
  "./schemas/image69.png",
  "./schemas/image7.png",
  "./schemas/image71.png",
  "./schemas/image73.png",
  "./schemas/image75.png",
  "./schemas/image77.png",
  "./schemas/image79.png",
  "./schemas/image81.png",
  "./schemas/image83.png",
  "./schemas/image85.png",
  "./schemas/image87.png",
  "./schemas/image89.png",
  "./schemas/image9.png",
  "./schemas/image91.png",
  "./schemas/image93.png",
  "./schemas/image95.png",
  "./schemas/image97.png",
  "./vendor/katex/fonts/KaTeX_AMS-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_AMS-Regular.woff",
  "./vendor/katex/fonts/KaTeX_AMS-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Bold.ttf",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Fraktur-Bold.ttf",
  "./vendor/katex/fonts/KaTeX_Fraktur-Bold.woff",
  "./vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Fraktur-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Fraktur-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Bold.ttf",
  "./vendor/katex/fonts/KaTeX_Main-Bold.woff",
  "./vendor/katex/fonts/KaTeX_Main-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_Main-BoldItalic.ttf",
  "./vendor/katex/fonts/KaTeX_Main-BoldItalic.woff",
  "./vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Italic.ttf",
  "./vendor/katex/fonts/KaTeX_Main-Italic.woff",
  "./vendor/katex/fonts/KaTeX_Main-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_Main-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Main-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Main-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Math-BoldItalic.ttf",
  "./vendor/katex/fonts/KaTeX_Math-BoldItalic.woff",
  "./vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2",
  "./vendor/katex/fonts/KaTeX_Math-Italic.ttf",
  "./vendor/katex/fonts/KaTeX_Math-Italic.woff",
  "./vendor/katex/fonts/KaTeX_Math-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Bold.ttf",
  "./vendor/katex/fonts/KaTeX_SansSerif-Bold.woff",
  "./vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Italic.ttf",
  "./vendor/katex/fonts/KaTeX_SansSerif-Italic.woff",
  "./vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2",
  "./vendor/katex/fonts/KaTeX_SansSerif-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_SansSerif-Regular.woff",
  "./vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Script-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Script-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Script-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size1-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Size1-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Size1-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size2-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Size2-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Size2-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size3-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Size3-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Size3-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Size4-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Size4-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Size4-Regular.woff2",
  "./vendor/katex/fonts/KaTeX_Typewriter-Regular.ttf",
  "./vendor/katex/fonts/KaTeX_Typewriter-Regular.woff",
  "./vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2"
];
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(CORE_ASSETS);
        // A missing diagram or icon must not cancel the app shell installation.
        await Promise.allSettled(OPTIONAL_ASSETS.map(url => cache.add(url)));
        await self.skipWaiting();
    })());
});
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(key => key.startsWith('bacpc-') && key !== CACHE_NAME).map(key => caches.delete(key)));
        await self.clients.claim();
    })());
});
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Fresh HTML when online; cached app shell when offline.
        if (event.request.mode === 'navigate' || new URL(event.request.url).pathname.endsWith('/index.html')) {
            try {
                const response = await fetch(event.request);
                if (response.ok) await cache.put(event.request, response.clone());
                return response;
            } catch (error) {
                const cached = await cache.match(event.request) || await cache.match('./index.html');
                if (cached) return cached;
                throw error;
            }
        }
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) await cache.put(event.request, response.clone());
        return response;
    })());
});
