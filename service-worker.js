self.addEventListener("install", ev => {
    console.log("👷", "install", ev);
    self.skipWaiting();
});

self.addEventListener("activate", ev => {
    console.log("👷", "activate", ev);
    return self.clients.claim();
});

self.addEventListener("fetch", ev => {
    console.log("👷", "fetch", ev);
    ev.respondWith(fetch(ev.request));
});
