const CACHE_NAME = 'aethra-cache-v1'

const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/events.html',
  '/resources.html',
  '/contactus.html',
  '/comingsoon.html',
  '/404.html',
  '/Assets/css/main.css',
  '/Assets/css/variables.css',
  '/Assets/css/about.css',
  '/Assets/css/events.css',
  '/Assets/css/resources.css',
  '/Assets/css/contactus.css',
  '/Assets/js/main.js',
  '/Assets/js/events.js',
  '/Assets/Imgs/aethral-removebg-preview.png',
  '/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {

        if (response) {
          return response
        }

        const fetchRequest = event.request.clone()
        
        return fetch(fetchRequest).then(response => {

          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          const responseToCache = response.clone()
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache)
            })
          
          return response
        })
      })
  )
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

