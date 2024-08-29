const CACHE_NAME = 'v1_cache_service_worker_ejemplo';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/icon-info.png'
];
// Activación del Service Worker y limpieza de cachés antiguas
self.addEventListener('activate', event => {
    console.log('Service Worker activado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('install', event => {
    console.log('Service Worker instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {    
                console.log('Archivos cacheados');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request).catch(() => new Response('Contenido no disponible'))
        )
    );
});
