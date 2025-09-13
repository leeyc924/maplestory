const CACHE = "eve-guild-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) =>
        c.addAll([
          "/manifest.webmanifest",
          "/icons/icon-192.png",
          "/icons/icon-512.png",
        ]),
      ),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // 네비게이션 요청: 네트워크 우선, 실패 시 기본 응답
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match("/")));
    return;
  }

  // 정적 리소스: 캐시 먼저, 없으면 네트워크
  if (
    /\.(?:js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|avif)$/.test(url.pathname)
  ) {
    e.respondWith(caches.match(e.request).then((m) => m || fetch(e.request)));
  }
});
