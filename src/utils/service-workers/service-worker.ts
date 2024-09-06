self.addEventListener('install', (event: ExtendableEvent): void => {
    console.log('Service worker installed');
})

self.addEventListener('activate', (event: ExtendableEvent): void => {
    console.log('Service worker activating');
})

self.addEventListener('fetch', (event: ExtendableEvent): void => {
    console.log('Service worker fetching', event.request.url);

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    )
})

