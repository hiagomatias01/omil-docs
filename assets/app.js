// Cache offline: depois da primeira leitura o QR continua funcionando sem internet.
if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
  navigator.serviceWorker.register("/omil-docs/sw.js").catch(function () {});
}
