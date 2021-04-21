self.addEventListener("fetch", event => {
    console.log("You fetched " + event.url);
});

var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
        'static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/',
        'index.html',
        "https://opentdb.com/api.php?amount=10&category=19"
    ];


self.addEventListener('install', function(event) {
    // Perform install steps before

event.waitUntil(
    caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
);

});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request).then(
                function (response)  {
                    // Check if we recieved a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }                 
                    // IMPORTANT: Clone the response. A response is a stream 
                    // and because we want the browser to consume the response 
                    // as well as the cache consuming the response, we need 
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                        return response;
                }
            );
        })
    );
});