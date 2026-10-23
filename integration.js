/* Optional UI diagnostics and bathymetry overlay. */
(function(){
 const $=id=>document.getElementById(id);let bathyLayer=null;
 $('bathymetryToggle')?.addEventListener('click',()=>{
   if(typeof map==='undefined'||!map){$('mapStatus').textContent='Ouvre la carte et attends son chargement.';return}
   if(bathyLayer){map.removeLayer(bathyLayer);bathyLayer=null;$('bathymetryToggle').textContent='Afficher la bathymétrie EMODnet';return}
   bathyLayer=L.tileLayer.wms('https://ows.emodnet-bathymetry.eu/wms',{layers:'emodnet:mean',format:'image/png',transparent:true,opacity:.58,attribution:'EMODnet Bathymetry'});
   bathyLayer.on('tileerror',()=>{$('mapStatus').textContent='Couche indisponible : vérifier le service EMODnet WMS.'});
   bathyLayer.addTo(map);$('bathymetryToggle').textContent='Masquer la bathymétrie EMODnet';
   $('mapStatus').textContent='Bathymétrie indicative : référentiel vertical et qualité locale à vérifier.';
 });
 $('runApiAudit')?.addEventListener('click',async()=>{
  const el=$('apiDiagnostics');el.textContent='Vérification des quatre modèles…';
  const q='latitude=48.637&longitude=-2.12&timezone=Europe%2FParis&forecast_days=2&hourly=wave_height,wave_period,wave_direction,swell_wave_height,swell_wave_period,swell_wave_direction,wind_wave_height';
  const results=await Promise.all(InwavesAudit.MODELS.map(async name=>{
   try{const c=new AbortController(),timer=setTimeout(()=>c.abort(),12000);let res;try{res=await fetch('https://marine-api.open-meteo.com/v1/marine?'+q+'&models='+name,{signal:c.signal})}finally{clearTimeout(timer)}if(!res.ok)throw Error('HTTP '+res.status);const v=InwavesAudit.validHourly(await res.json());return {name,...v}}catch(e){return {name,ok:false,reason:e.message}}
  }));
  el.replaceChildren(...results.map(x=>{const p=document.createElement('p');p.textContent=x.name+' : '+(x.ok?'OK · '+x.hours+' heures · '+x.available.join(', '):'indisponible · '+x.reason);return p}));
 });
})();