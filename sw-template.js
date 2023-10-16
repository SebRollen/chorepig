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
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
