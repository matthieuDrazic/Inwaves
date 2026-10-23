const assert=require('node:assert/strict');const {validHourly,coverage}=require('../audit.js');
const t=['2026-10-23T10:00','2026-10-23T11:00'];
assert.equal(validHourly({hourly:{time:t,wave_height:[1.2,1.5]}}).ok,true);
assert.equal(validHourly({hourly:{time:t,wave_height:[null,null]}}).ok,false);
assert.equal(validHourly({hourly:{time:t,wave_height:[1.2]}}).ok,false);
assert.equal(validHourly({hourly:{time:['bad'],wave_height:[1]}}).ok,false);
assert.deepEqual(coverage({time:t,wave_height:[1,null]}),{wave_height:'1/2'});
console.log('5 tests OK');