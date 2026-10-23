/* Inwaves marine API contract validator, browser and Node. */
const MODELS=['meteofrance_wave','dwd_ewam','ecmwf_wam','ncep_gfswave025'];
const MARINE_FIELDS=['wave_height','wave_period','wave_direction','swell_wave_height','swell_wave_period','swell_wave_direction','wind_wave_height'];
function validHourly(payload,fields=MARINE_FIELDS){
 const h=payload?.hourly;
 if(!h||!Array.isArray(h.time)||h.time.length===0)return {ok:false,reason:'missing hourly.time'};
 if(!h.time.every(t=>typeof t==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(t)))return {ok:false,reason:'invalid time format'};
 const available=fields.filter(k=>Array.isArray(h[k])&&h[k].length===h.time.length&&h[k].some(Number.isFinite));
 if(!available.includes('wave_height'))return {ok:false,reason:'wave_height missing or empty',available};
 return {ok:true,available,missing:fields.filter(k=>!available.includes(k)),hours:h.time.length};
}
function coverage(h){return Object.fromEntries(MARINE_FIELDS.filter(k=>Array.isArray(h[k])).map(k=>[k,h[k].filter(Number.isFinite).length+'/'+h.time.length]));}
const InwavesAudit={MODELS,MARINE_FIELDS,validHourly,coverage};
if(typeof module!=='undefined')module.exports=InwavesAudit;
if(typeof window!=='undefined')window.InwavesAudit=InwavesAudit;