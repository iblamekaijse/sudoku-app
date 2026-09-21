"use strict";

/* =========================================================
   SUDOKU PWA
   Service Worker v2
   ========================================================= */

const CACHE_NAME = "sudoku-pwa-v4";

const APP_FILES = [
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
                .then(cache => {
                    return cache.addAll(
                        APP_FILES
                    );
                })
                .then(() => {
                    return self.skipWaiting();
                })
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
                .then(cacheNames => {
                    return Promise.all(
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
                    );
                })
                .then(() => {
                    return self.clients.claim();
                })
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
         * Нас интересуют только GET-запросы.
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
                    /*
                     * Если файл уже есть в кэше,
                     * используем его.
                     */

                    if (
                        cachedResponse
                    ) {
                        return cachedResponse;
                    }

                    /*
                     * Если файла нет в кэше,
                     * пробуем интернет.
                     */

                    return fetch(request)
                        .then(
                            networkResponse => {
                                /*
                                 * Кэшируем только нормальный
                                 * ответ сервера.
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
                                            cache => {
                                                cache.put(
                                                    request,
                                                    copy
                                                );
                                            }
                                        );
                                }

                                return networkResponse;
                            }
                        )
                        .catch(
                            async () => {
                                /*
                                 * Если интернета нет
                                 * и браузер запросил страницу,
                                 * возвращаем index.html.
                                 */

                                if (
                                    request.mode ===
                                        "navigate"
                                ) {
                                    return caches.match(
                                        "./index.html"
                                    );
                                }

                                return new Response(
                                    "",
                                    {
                                        status: 503,
                                        statusText:
                                            "Offline"
                                    }
                                );
                            }
                        );
                })
        );
    }
);


/* =========================================================
   MESSAGE
   ========================================================= */

self.addEventListener(
    "message",
    event => {
        if (
            event.data &&
            event.data.type ===
                "SKIP_WAITING"
        ) {
            self.skipWaiting();
        }
    }
);
