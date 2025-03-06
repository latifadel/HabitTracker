// sw.js
const CACHE_NAME = "flower-habit-cache-v1";
const ASSETS_TO_CACHE = [
  "./",            // might also cache root
  "./index.html",
  "./styles.css",
  "./app.js",
  "./icon-192.png",
  "./icon-512.png"
  // Add more (fonts, images) if needed
];

// Install: Cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate: Clean up old caches if any
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch: Serve from cache, else network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
