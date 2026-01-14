// Service Worker - PWA Offline Support (Fixed)
const CACHE_VERSION = 'v2';
const CACHE_NAME = `cee-mimarlik-${CACHE_VERSION}`;
const CACHE_NAME_IMAGES = `cee-images-${CACHE_VERSION}`;
const MAX_IMAGE_CACHE = 50;

// Cache edilecek statik dosyalar
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/404.html',
  '/dynamic-seo.js',
  '/cookie-consent.js'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
      .catch(err => console.log('Cache install error:', err))
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('cee-') && 
              cacheName !== CACHE_NAME && 
              cacheName !== CACHE_NAME_IMAGES) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Hibrit strateji
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // ⚠️ POST isteklerini cache'leme - sadece network'e gönder
  if (request.method !== 'GET') {
    event.respondWith(fetch(request).catch(() => new Response('Offline', { status: 503 })));
    return;
  }
  
  // Admin/Login sayfaları - cache'leme
  if (url.pathname.includes('/admin') || 
      url.pathname.includes('/firebase-login') ||
      url.pathname.includes('/panel-')) {
    event.respondWith(fetch(request).catch(() => caches.match('/offline.html')));
    return;
  }
  
  // Resimler - Cache-first + limit
  if (request.destination === 'image' || 
      /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
    event.respondWith(imageHandler(request));
    return;
  }
  
  // Statik dosyalar (CSS, JS) - Cache-first
  if (request.destination === 'script' || 
      request.destination === 'style' ||
      /\.(css|js)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // HTML sayfaları - Network-first
  if (request.destination === 'document' || 
      request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Diğer her şey - Network-first
  event.respondWith(networkFirst(request));
});

// Cache-first stratejisi
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && request.method === 'GET') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return cached || new Response('Offline', { status: 503 });
  }
}

// Network-first stratejisi
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && request.method === 'GET') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    const offlinePage = await caches.match('/offline.html');
    return offlinePage || new Response(
      '<h1>Offline</h1><p>İnternet bağlantınızı kontrol edin.</p>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

// Resim cache handler
async function imageHandler(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && request.method === 'GET') {
      const cache = await caches.open(CACHE_NAME_IMAGES);
      
      const keys = await cache.keys();
      if (keys.length >= MAX_IMAGE_CACHE) {
        await cache.delete(keys[0]);
      }
      
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return cached || new Response('', { status: 503 });
  }
}

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  console.log('Background sync çalışıyor...');
}
