const cacheName = 'habit-tracker-v1';
const staticAssets = [
    './',
    'index.html',
    'styles.css',
    'app.js',
    'manifest.json'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    event.respondWith(cachFirst(event.request));
});

async function cachFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}
