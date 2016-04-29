
// Events handler for sevice worker


// triggered during Installation
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cacheV1').then(function (cache) {
            cache.addAll([
                //'/bandhavya.github.io/',
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

// fetch event
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

// notify the push event
this.addEventListener('push', function(event) {
    console.log('ServiceWorker: Received a push message');
    var notificationOptions = {
        body: 'Thanks for sending this push msg.',
        //icon: './images/icon-192x192.png',
        tag: 'simple-push-demo-notification',
        data: {
            //url: 'https://developers.google.com/web/fundamentals/getting-started/push-notifications/'
        }
    };

    event.waitUntil(
        this.registration.showNotification('Hello', notificationOptions)
    );
});

// notification click event
this.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (!event.nofication.data) {
        return;
    }

    if (event.notification.data.url) {
        event.waitUntil(clients.openWindow(event.notification.data.url));
    }
});