self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('pwa-cache-v2').then(function (cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/style.css',
				'/script.js',
				'/manifest.json',
				'/icons/icon-192x192.png',
				'/icons/icon-512x512.png'
			]);
		})
	);
});

self.addEventListener('activate', function (event) {
	var cacheWhitelist = ['pwa-cache-v2'];
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
