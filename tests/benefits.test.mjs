import test from 'node:test';
import assert from 'node:assert/strict';
import { benefits, benefitSources, benefitExclusions, benefitWindow, benefitEligibility, selectBenefits, benefitsKstDate } from '../source/extra/benefits.mjs';
const item=id=>benefits.find(b=>b.id===id);
const day='2026-09-23';
test('every active benefit has dated official evidence, application route, restrictions and amount units',()=>{
 assert.equal(new Set(benefits.map(b=>b.id)).size,benefits.length);
 for(const b of benefits){
  for(const key of ['id','name','category','kind','amount','target','period','apply','url'])assert.ok(b[key],`${b.id}: ${key}`);
  assert.ok(b.conditions.length&&b.sources.length);
  assert.equal(benefitWindow(b,day).code,'open');
  for(const id of b.sources){assert.ok(benefitSources[id],id);assert.equal(new URL(benefitSources[id].url).protocol,'https:');}
 }
 for(const b of benefitExclusions)for(const id of b.sources)assert.ok(benefitSources[id]);
});
test('Korean calendar date does not inherit the UTC previous date',()=>{
 assert.equal(benefitsKstDate(new Date('2026-09-22T14:59:59Z')),'2026-09-22');
 assert.equal(benefitsKstDate(new Date('2026-09-22T15:00:00Z')),'2026-09-23');
});
test('unknown identity is never treated as confirmed personal eligibility',()=>{
 for(const b of benefits)assert.equal(benefitEligibility(b,{}).code,'check');
 assert.ok(benefitEligibility(item('didim'),{}).unknown.includes('만 나이'));
 assert.ok(benefitEligibility(item('food'),{}).unknown.includes('수급 급여 종류'));
});
test('17 to 18 birthday changes savings eligibility, but health and youth ID remain candidates',()=>{
 assert.equal(benefitEligibility(item('didim'),{age:17}).code,'check');
 assert.equal(benefitEligibility(item('didim'),{age:18}).code,'mismatch');
 assert.equal(benefitEligibility(item('health'),{age:18}).code,'check');
 assert.equal(benefitEligibility(item('youthId'),{age:19}).code,'mismatch');
});
test('birth-year programs do not infer birth year from high-school senior age',()=>{
 assert.equal(benefitEligibility(item('youthPass'),{birthYear:2008}).code,'mismatch');
 assert.equal(benefitEligibility(item('youthPass'),{birthYear:2007}).code,'check');
 assert.equal(benefitEligibility(item('sanitary'),{birthYear:2001,gender:'female'}).code,'check');
 assert.equal(benefitEligibility(item('sanitary'),{birthYear:2000,gender:'female'}).code,'mismatch');
});
test('medical is not livelihood: food voucher and TV rules stay separate',()=>{
 assert.equal(benefitEligibility(item('food'),{types:['medical']}).code,'mismatch');
 assert.equal(benefitEligibility(item('tv'),{types:['medical']}).code,'check');
 assert.equal(benefitEligibility(item('tv'),{types:['housing','education']}).code,'mismatch');
 assert.equal(benefitEligibility(item('food'),{types:['livelihood','medical']}).code,'check');
});
test('region and gender mismatches are omitted, unknown values are retained with conditions',()=>{
 assert.equal(benefitEligibility(item('seoul'),{region:'경기'}).code,'mismatch');
 assert.equal(benefitEligibility(item('sanitary'),{gender:'male'}).code,'mismatch');
 const rows=selectBenefits({age:18,birthYear:2008,region:'경기',gender:'male',types:['housing']},{},day);
 for(const id of ['seoul','sanitary','didim','food','tv','youthPass'])assert.ok(!rows.some(b=>b.id===id),id);
 assert.ok(rows.some(b=>b.id==='mock'));
});
test('inclusive deadline, pause days and conflicting deadlines cannot become false open claims',()=>{
 assert.equal(benefitWindow(item('culture'),'2026-11-30').code,'open');
 assert.equal(benefitWindow(item('culture'),'2026-12-01').code,'closed');
 assert.equal(benefitWindow(item('mock'),'2026-10-01').code,'review');
 assert.equal(benefitWindow(item('energy'),'2026-10-01').code,'paused');
 assert.equal(benefitWindow(item('energy'),'2026-10-02').code,'paused');
 assert.equal(benefitWindow(item('energy'),'2026-10-03').code,'open');
 assert.equal(selectBenefits({}, {}, '2027-01-01').length,0);
 assert.equal(selectBenefits({}, {}, '2026-09-22').length,0);
});
test('keyword and category filters combine; recommended cards retain an explicit label',()=>{
 assert.deepEqual(selectBenefits({}, {query:'전기',category:'요금 감면'},day).map(b=>b.id),['electric']);
 for(const b of benefits.filter(b=>b.recommend))assert.match(b.recommend,/^추천/);
});

test('benefit profile starts without personal defaults',async()=>{
 const {initialBenefitProfile}=await import('../source/extra/benefits.mjs');
 const p=initialBenefitProfile();assert.equal(p.region,'');assert.equal(p.district,'');assert.equal(p.birthYear,undefined);assert.equal(p.age,undefined);assert.deepEqual(p.types,[]);
 p.types.push('medical');assert.deepEqual(initialBenefitProfile().types,[]);
});
test('institution recommendation scholarship closes after official final date',()=>{
 assert.equal(benefitWindow(item('incheonScholar'),'2026-10-23').code,'open');
 assert.equal(benefitWindow(item('incheonScholar'),'2026-10-24').code,'closed');
 assert.equal(benefitEligibility(item('incheonWater'),{region:'서울'}).code,'mismatch');
});
