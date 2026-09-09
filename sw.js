// Cache offline - versao b62227260c35
var CACHE = "qrdocs-b62227260c35";

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (chaves) {
      return Promise.all(chaves.map(function (chave) {
        return chave === CACHE ? null : caches.delete(chave);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (evento) {
  var pedido = evento.request;
  if (pedido.method !== "GET" || pedido.url.indexOf("http") !== 0) { return; }

  evento.respondWith(
    fetch(pedido).then(function (resposta) {
      if (resposta && resposta.status === 200 && resposta.type === "basic") {
        var copia = resposta.clone();
        caches.open(CACHE).then(function (cache) { cache.put(pedido, copia); });
      }
      return resposta;
    }).catch(function () {
      return caches.match(pedido).then(function (guardada) {
        return guardada || Response.error();
      });
    })
  );
});
