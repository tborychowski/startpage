/*global importScripts, caches, self, fetch*/
'use strict';
importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'startpage';
// The files we want to cache
var urlsToCache = [
	'/startpage/assets/lib.css',
	'/startpage/assets/app.css',
	'/startpage/assets/lib.js',
	'/startpage/assets/app.js',
	'/startpage/data/lists.php',
	'/startpage/index.php',
	'/startpage/'
];

self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);

});

self.addEventListener('fetch', function (event) {
	event.respondWith(caches.match(event.request).then(function (response) {
		if (response) return response;

		var fetchRequest = event.request.clone();
		return fetch(fetchRequest).then(function(response) {
			if(!response || response.status !== 200 || response.type !== 'basic') {
            	return response;
            }

			var responseToCache = response.clone();
			caches.open(CACHE_NAME).then(function (cache) {
				var cacheRequest = event.request.clone();
				cache.put(cacheRequest, responseToCache);
			});
			return response;
		});

	}));

});
