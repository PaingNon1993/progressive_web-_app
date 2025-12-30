const CACHE_NAME = 'scanner-pro-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.webmanifest',
    // ถ้ามีรูป icon ให้ใส่ชื่อไฟล์ตรงนี้ด้วย เช่น './icon-192.png'
];

// ติดตั้ง Service Worker และเก็บไฟล์ลง Cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// ดึงข้อมูลจาก Cache เมื่อไม่มีเน็ต
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
