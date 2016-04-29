this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cacheV1').then(function (cache) {
            cache.addAll([
                '/bandhavya.github.io/',
                '/bandhavya.github.io/images/heidi.jpg',
                '/bandhavya.github.io/images/heidiImg.jpg',
                '/bandhavya.github.io/images/nature.jpg',
                '/bandhavya.github.io/rose.jpg',
                '/bandhavya.github.io/index.html',
                '/bandhavya.github.io/app.js'
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