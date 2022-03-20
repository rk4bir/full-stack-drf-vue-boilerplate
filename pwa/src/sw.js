self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

workbox.core.clientsClaim();
self.__precacheManifest = [].concat(self.__precacheManifest || []);