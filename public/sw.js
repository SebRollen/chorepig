// DON'T EDIT, THIS IS A GENERATED FILE
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
);

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('syncTasks', {
    maxRetentionTime: 30 * 24 * 60, // Retry for max of 30 days (specified in minutes)
});

workbox.routing.registerRoute(
    /\/api\/.*/,
    new workbox.strategies.NetworkOnly(),
    'GET'
);
workbox.routing.registerRoute(
    /\/api\/.*/,
    new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
);
workbox.routing.registerRoute(
    /\/api\/.*/,
    new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'PATCH'
);
workbox.routing.registerRoute(
    /\/api\/.*/,
    new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'PUT'
);
workbox.routing.registerRoute(
    /\/api\/.*/,
    new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'DELETE'
);

workbox.recipes.warmStrategyCache({
    urls: ["/"],
    strategy: new workbox.strategies.NetworkFirst()
})

workbox.recipes.warmStrategyCache({
    urls: ["/docs/about", "/docs/terms-of-service", "/docs/privacy-policy"],
    strategy: new workbox.strategies.StaleWhileRevalidate()
})

workbox.recipes.staticResourceCache();
workbox.recipes.imageCache();
workbox.recipes.googleFontsCache();
workbox.precaching.precacheAndRoute([{"revision":"4ead20c186eaf2f7c09d6627ab7c0102","url":"404.html"},{"revision":"0a33257c7b90fd1901a68c81fa88fdb7","url":"422.html"},{"revision":"c7b77c4ffc436813480fd621a6b18c7f","url":"500.html"},{"revision":"2c1f973befc9353865f272d7f50d60d6","url":"manifest.json"}]);
