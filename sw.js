"use strict";

/*
 * Версия кэша.
 * При изменении файлов приложения
 * увеличивай номер версии.
 */

const CACHE_NAME =
    "sudoku-pwa-v1";


/*
 * Все ресурсы, необходимые приложению.
 */

const APP_ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener(
    "install",
    event => {
        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(cache =>
                    cache.addAll(
                        APP_ASSETS
                    )
                )
                .then(() =>
                    self.skipWaiting()
                )
        );
    }
);


/* =========================================================
   ACTIVATE
   ========================================================= */

self.addEventListener(
    "activate",
    event => {
        event.waitUntil(
            caches
                .keys()
                .then(cacheNames =>
                    Promise.all(
                        cacheNames
                            .filter(
                                cacheName =>
                                    cacheName !==
                                    CACHE_NAME
                            )
                            .map(
                                cacheName =>
                                    caches.delete(
                                        cacheName
                                    )
                            )
                    )
                )
                .then(() =>
                    self.clients.claim()
                )
        );
    }
);


/* =========================================================
   FETCH
   ========================================================= */

self.addEventListener(
    "fetch",
    event => {
        const request =
            event.request;

        /*
         * Только GET-запросы могут
         * обслуживаться этим cache strategy.
         */

        if (
            request.method !== "GET"
        ) {
            return;
        }

        event.respondWith(
            caches
                .match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(request)
                        .then(
                            networkResponse => {
                                /*
                                 * Кладем успешный ответ
                                 * в кэш для следующего
                                 * офлайн-запуска.
                                 */

                                if (
                                    networkResponse &&
                                    networkResponse.status ===
                                        200 &&
                                    networkResponse.type !==
                                        "opaque"
                                ) {
                                    const copy =
                                        networkResponse.clone();

                                    caches
                                        .open(
                                            CACHE_NAME
                                        )
                                        .then(
                                            cache =>
                                                cache.put(
                                                    request,
                                                    copy
                                                )
                                        );
                                }

                                return networkResponse;
                            }
                        )
                        .catch(
                            () =>
                                caches.match(
                                    "./index.html"
                                )
                        );
                })
        );
    }
);