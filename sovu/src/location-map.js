(() => {
  let map, marker;
  const mapStyle = document.createElement('style');
  mapStyle.textContent = '.helping-map{height:240px;margin-top:12px;border:1px solid #3b3019;border-radius:14px;overflow:hidden;background:#0d0d0c}.helping-map-note{font-size:11px;color:#8f897d;margin-top:7px}.leaflet-container{background:#111}.leaflet-control-zoom a{background:#10100e!important;color:#d4af37!important;border-color:#3b3019!important}';
  document.head.appendChild(mapStyle);
  function ensureMap() {
    const picker = document.querySelector('.locationPicker');
    if (!picker || !window.L || picker.querySelector('.helping-map')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = '<div class="helping-map"></div><div class="helping-map-note">📍 Map is only used to verify the meeting area. Exact coordinates stay private.</div>';
    picker.appendChild(wrap);
    map = L.map(wrap.querySelector('.helping-map'), {zoomControl:true, attributionControl:true}).setView([20.5937,78.9629],5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19, attribution:'© OpenStreetMap contributors'}).addTo(map);
    marker = L.marker([20.5937,78.9629], {draggable:false}).addTo(map).bindPopup('Meeting area');
  }
  function locate() {
    if (!window.L || !navigator.geolocation || !map) return;
    navigator.geolocation.getCurrentPosition(p => {
      const lat=p.coords.latitude,lng=p.coords.longitude;
      map.setView([lat,lng],16); marker.setLatLng([lat,lng]).openPopup();
    }, () => {}, {enableHighAccuracy:true,timeout:12000,maximumAge:30000});
  }
  const observer = new MutationObserver(() => { ensureMap(); });
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('load',()=>{ensureMap();locate();});
  document.addEventListener('click',e=>{ if(e.target.closest('.locationPicker button')) setTimeout(locate,500); });
})();
