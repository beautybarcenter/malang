/* Beauty Bar Service Worker: cache aset lokal saja, jangan cache API booking/auth. */
const CACHE_NAME = "beautybar-shell-v5";
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(SHELL_ASSETS);
    await self.skipWaiting();
  })());
});


self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("beautybar-shell-") && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Supabase, auth, booking, dan request eksternal tidak pernah disimpan di cache SW.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put("./index.html", fresh.clone());
        }
        return fresh;
      } catch (error) {
        const cached = await caches.match("./index.html");
        if (cached) return cached;
        throw error;
      }
    })());
    return;
  }

  // Cache-first untuk aset lokal yang tidak memuat data pelanggan.
  if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js") || url.pathname.endsWith(".json")) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const fresh = await fetch(request);
      if (fresh && fresh.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, fresh.clone());
      }
      return fresh;
    })());
  }
});
