/* Carnet d'entraînement : service worker (hors ligne) */
const V="carnet-v1";
const CORE=["./", "index.html", "manifest.webmanifest", "lib.json", "icon-192.png", "icon-512.png", "icon-maskable.png", "sh/000.webp", "sh/001.webp", "sh/002.webp", "sh/003.webp", "sh/004.webp", "sh/005.webp", "sh/006.webp", "sh/007.webp", "sh/008.webp", "sh/009.webp", "sh/010.webp", "sh/011.webp", "sh/012.webp", "sh/013.webp", "sh/014.webp", "sh/015.webp", "sh/016.webp", "sh/017.webp", "sh/018.webp", "sh/019.webp", "sh/020.webp", "sh/021.webp", "sh/022.webp", "sh/023.webp", "sh/024.webp", "sh/025.webp", "sh/026.webp", "sh/027.webp", "sh/028.webp", "sh/029.webp", "sh/030.webp", "sh/031.webp", "sh/032.webp", "sh/033.webp", "sh/034.webp", "sh/035.webp", "sh/036.webp", "sh/037.webp", "sh/038.webp", "sh/039.webp", "sh/040.webp", "sh/041.webp", "sh/042.webp", "sh/043.webp", "sh/044.webp", "sh/045.webp", "sh/046.webp", "sh/047.webp", "sh/048.webp", "sh/049.webp", "sh/050.webp", "sh/051.webp", "sh/052.webp", "sh/053.webp", "sh/054.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  /* page: network first so updates arrive, cache when offline */
  if(r.mode==="navigate"||(u.origin===location.origin&&u.pathname.endsWith("/index.html"))){
    e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put("index.html",c));return res}).catch(()=>caches.match("index.html")));return}
  /* photos, library, icons, fonts: cache first */
  if(u.origin===location.origin||u.hostname.endsWith("fonts.googleapis.com")||u.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res})))}
});
