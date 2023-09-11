const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Set up page cache
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);


// TODO: Implement asset caching
//function is used to register a custom route for handling network requests. It's a part of the workbox library used for implementing services
registerRoute(
  //the first argument passed to 'regusterRoute' is a function that determines whether a specific request should be handled by a custom route
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  //the second argument passed to registerRoute is an instance of the StaleWhileRevalidate strategy to chache responses and update.
  new StaleWhileRevalidate({
    //the property specifies the name of the chache where the responses will be stored.
    cacheName: 'asset-cache',
    //the plugins property is an array of caching plugins that can modify the behabior of the strategy.
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);