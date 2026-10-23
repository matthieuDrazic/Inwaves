const assert=require('node:assert/strict');const b=require('../bathymetry.js');
assert.match(b.sampleUrl(-2.12,48.64),/depth_sample/);
assert.match(b.profileUrl([-2.13,48.65],[-2.12,48.64]),/LINESTRING/);
assert.equal(b.validateSample({avg:12,min:11,max:13}).ok,true);
assert.equal(b.validateSample({avg:12,min:13,max:11}).ok,false);
console.log('4 tests OK');