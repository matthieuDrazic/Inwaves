/* EMODnet depth queries: not a calibrated coastal transformation model. */
const Bathymetry={
 service:'https://rest.emodnet-bathymetry.eu/',
 sampleUrl(lon,lat){if(!Number.isFinite(lon)||!Number.isFinite(lat)||Math.abs(lon)>180||Math.abs(lat)>90)throw Error('Invalid WGS84 coordinate');return 'https://rest.emodnet-bathymetry.eu/depth_sample?geom='+encodeURIComponent('POINT('+lon+' '+lat+')')},
 profileUrl(a,b){for(const p of [a,b])if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))throw Error('Invalid WGS84 transect');return 'https://rest.emodnet-bathymetry.eu/depth_profile?geom='+encodeURIComponent('LINESTRING('+a.join(' ')+','+b.join(' ')+')')},
 validateSample(v){return v&&Number.isFinite(v.avg)&&Number.isFinite(v.min)&&Number.isFinite(v.max)&&v.min<=v.avg&&v.avg<=v.max?{ok:true,depth:v.avg,source:v.reference?.identifier||null}:{ok:false,reason:'No verified bathymetry value'}}
};
if(typeof module!=='undefined')module.exports=Bathymetry;
if(typeof window!=='undefined')window.Bathymetry=Bathymetry;