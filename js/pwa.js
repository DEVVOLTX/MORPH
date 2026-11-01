(function(){
  if(!('serviceWorker' in navigator))return;
  var scriptUrl=document.currentScript&&document.currentScript.src;
  if(!scriptUrl)return;
  window.addEventListener('load',function(){
    navigator.serviceWorker.register(new URL('../sw.js',scriptUrl)).catch(function(error){
      console.error('Setcount offline support could not be enabled.',error);
    });
  });
})();
