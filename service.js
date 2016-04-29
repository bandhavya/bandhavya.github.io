this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cacheV1').then(function (cache) {
            cache.addAll([
                '/serviceWorker/',
                '/serviceWorker/images/heidi.jpg',
                '/serviceWorker/images/heidiImg.jpg',
                '/serviceWorker/images/nature.jpg',
                '/serviceWorker/rose.jpg',
                '/serviceWorker/index.html',
                '/serviceWorker/app.js'
            ]);
        })
    );
});

this.addEventListener('fetch', function (event) {

    event.respondWith(caches.match(event.request).catch(function() {
        return fetch(event.request);
    }).then(function(r) {
        response = r;
        caches.open('cacheV1').then(function(cache) {
            cache.put(event.request, response);
        });
        return response.clone();
    }).catch(function () {
        alert('into fetch error');
        //return caches.match('/sw-test/gallery/myLittleVader.jpg');
    }));
});