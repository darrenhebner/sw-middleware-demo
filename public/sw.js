self.importScripts(
  'https://cdn.jsdelivr.net/npm/idb-keyval/dist/iife/index-min.js'
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      new Promise(async (resolve) => {
        const email = await idbKeyval.get('email');
        resolve(
          fetch(event.request.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
            }),
          })
        );
      })
    );
  }
});
