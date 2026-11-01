var CACHE_NAME='setcount-shell-v1';
var SHELL_FILES=['index.html','manifest.webmanifest','css/style.css','js/app.js','js/pwa.js','assets/favicon.svg'];

self.addEventListener('install',function(event){
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache){
    return cache.addAll(SHELL_FILES.map(function(path){return new URL(path,self.registration.scope).href}));
  }).then(function(){return self.skipWaiting()}));
});

self.addEventListener('activate',function(event){
  event.waitUntil(caches.keys().then(function(names){
    return Promise.all(names.filter(function(name){return name.indexOf('setcount-')===0&&name!==CACHE_NAME}).map(function(name){return caches.delete(name)}));
  }).then(function(){return self.clients.claim()}));
});

self.addEventListener('fetch',function(event){
  var request=event.request;
  if(request.method!=='GET')return;
  var url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(function(response){
      if(!response.ok)return response;
      return caches.open(CACHE_NAME).then(function(cache){
        return cache.put(new URL('index.html',self.registration.scope),response.clone()).then(function(){return response});
      });
    }).catch(function(){return caches.match(new URL('index.html',self.registration.scope))}));
    return;
  }
  event.respondWith(caches.match(request).then(function(cached){
    if(cached)return cached;
    return fetch(request).then(function(response){
      if(!response.ok||response.type!=='basic')return response;
      return caches.open(CACHE_NAME).then(function(cache){
        return cache.put(request,response.clone()).then(function(){return response});
      });
    });
  }));
});
