this.addEventListener('activate', () => {
    console.log("Service worker activated");
})

const filesToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/firebase-messaging-sw.js',
    'logo192.png',
    '/logo512.png',
    '/manifest.json',
    '/serviceWorker.js',
    // './static/js/main.chunk.js',
    // './static/js/0.chunk.js',
    // './static/js/bundle.js',
    // './static/js/2.af9dc2e3.chunk.js',
    // './static/js/2.af9dc2e3.chunk.js.map',
    // './static/js/3.c7ebfde2.chunk.js',
    // './static/js/3.c7ebfde2.chunk.js.map',
    // './static/js/main.88aec25d.chunk.js',
    // './static/js/main.88aec25d.chunk.js.map',
    // './static/js/runtime-main.8b552307.js',
    // './static/js/runtime-main.8b552307.js.map',
    // './static/css/main.092de489.chunk.css',
    // './static/css/main.092de489.chunk.css.map',
    // './static/media/backgroundImage.26384db6.jpg'
];

this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('quiz app').then((cache) => {
            console.log('adding to cache');
            return cache.addAll(filesToCache).catch((err)=> {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        })
    )
})

this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request)
        })
    )
})