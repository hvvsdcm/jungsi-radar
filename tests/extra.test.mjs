import { inquiryConversion, conversionTables } from '../source/extra/conversions.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { departments, calculation, eligibility, historical, reading, comparison, englishLoss } from '../source/extra/departments.mjs';
import { calculate, minimumStatus } from '../source/extra/admissions.mjs';
import { seal, open, bundle } from '../scripts/build-extra.mjs';

const state=()=>({pct:{k:94,m:92,t1:85,t2:83,e:2,h:1},std:{k:130,m:128,t1:62,t2:61},converted:{yonsei:[65,64],korea:[66,63],sogang:[64,62]},language:'2',grades:[2,2,3,3],skkuEnglish:95});
const dept=(school,name)=>departments.find(d=>d.school===school&&d.name===name);
test('six universities, unique major ids, explicit excluded programs',()=>{
 assert.equal(new Set(departments.map(d=>d.school)).size,6);assert.equal(new Set(departments.map(d=>d.id)).size,departments.length);
 for(const school of ['snu','yonsei','korea','sogang','skku','hanyang'])assert.ok(departments.filter(d=>d.school===school).length>=8);
 assert.equal(eligibility(dept('hanyang','컴퓨터소프트웨어학부')).status,'blocked');
 assert.equal(eligibility(dept('yonsei','시스템반도체공학과')).status,'blocked');
 assert.equal(eligibility(dept('korea','반도체공학과')).status,'blocked');
});
test('SNU social inquiry and language restrictions override any high score',()=>{
 assert.equal(eligibility(dept('snu','컴퓨터공학부'),'1').status,'blocked');
 assert.equal(eligibility(dept('snu','경제학부'),'none').status,'blocked');
 assert.equal(eligibility(dept('snu','경제학부'),'unknown').status,'hold');
 assert.equal(eligibility(dept('snu','자유전공학부'),'none').status,'eligible');
 let s=state();s.language='none';assert.equal(calculation(dept('snu','경제학부'),s).value,null);
});
test('official Yonsei example automatically looks up percentiles and applies bonus once',()=>{
 const s=state();s.std={k:131,m:128};s.pct={t1:92,t2:94,e:2,h:3};
 const r=calculation(dept('yonsei','경영학과'),s);
 assert.ok(Math.abs(r.value-692.265)<1e-8);
 assert.deepEqual(r.conversion.values,[64.74,65.66]);
 s.converted={yonsei:[100,100]};assert.equal(calculation(dept('yonsei','경영학과'),s).value,r.value);
 s.pct.t1=93;assert.notEqual(calculation(dept('yonsei','경영학과'),s).value,r.value);
 assert.equal(calculation(dept('snu','경제학부'),state()).value,381.5);
});
test('automatic tables are complete, separate and never interpolate invalid percentiles',()=>{
 for(const table of Object.values(conversionTables))assert.equal(Object.keys(table.table).length,101);
 assert.deepEqual(inquiryConversion('yonsei',{t1:0,t2:100}).values,[31.12,70.12]);
 assert.deepEqual(inquiryConversion('korea',{t1:0,t2:100}).values,[31.17,70.11]);
 for(const t1 of [null,undefined,'',-1,101,50.5,NaN])assert.equal(inquiryConversion('yonsei',{t1,t2:90}).values[0],null);
 const s=state();s.pct.t1=null;assert.equal(calculation(dept('yonsei','경영학과'),s).value,null);
 assert.ok(calculation(dept('korea','경제학과'),state()).value>0);
 s.std.k=null;assert.equal(calculation(dept('snu','자유전공학부'),s).value,null);
});
test('unverified tables and final totals are held without asking for transformed scores',()=>{
 for(const [school,name]of [['sogang','경제학과'],['skku','경영학과'],['skku','사회과학계열'],['skku','반도체융합공학과'],['hanyang','경영학부']])assert.equal(calculation(dept(school,name),state()).value,null);
});
test('70% comparison is not a probability; pooled Sogang data is labeled',()=>{
 const s=state(),d=dept('sogang','경영학부');assert.match(historical(d).scope,/학과 합격선 아님/);
 assert.equal(historical(dept('korea','경제학과')),null);
 assert.equal(reading(dept('korea','경제학과'),s).label,'합불 판단 보류');
 assert.equal(comparison({...s.pct,k:null},[90,90,90,90,2,1]),null);
 assert.equal(englishLoss(dept('yonsei','경영학과'),2),6.25);
 assert.equal(englishLoss(dept('yonsei','경제학부'),2),8.333333333333334);
});
test('minimum thresholds require actual grades and Sogang history',()=>{
 assert.equal(minimumStatus('snu',[null,null,null,null],2,1).label,'등급 추가 입력 필요');
 assert.equal(minimumStatus('snu',[2,2,3,3],2,1).label,'입력 등급 기준 충족');
 assert.equal(minimumStatus('sogang',[1,1,1,1],1,5).label,'최저 미충족');
});
test('encrypted bundle rejects wrong password and tampering',async()=>{
 const password='test-only-password';const p=await seal('private-fixture',password);
 assert.equal(await open(p,password),'private-fixture');
 await assert.rejects(()=>open(p,'wrong'));
 const bytes=Buffer.from(p.data,'base64');bytes[0]^=1;
 await assert.rejects(()=>open({...p,data:bytes.toString('base64')},password));
 assert.ok(!JSON.stringify(p).includes(password));
});
test('full bundle parses, exposes mount/reset, and neutral gate has no analysis labels',async()=>{
 const app=Function(`return (()=>{${await bundle()}\nreturn {mount,reset};})()`)();
 assert.equal(typeof app.mount,'function');assert.equal(typeof app.reset,'function');
 const gate=await readFile(new URL('../assets/extra.js',import.meta.url),'utf8');
 assert.doesNotMatch(gate,/기초생활|수급자|기회균형|연세한마음/);
 assert.doesNotMatch(gate,/localStorage|sessionStorage/);
 const payload=JSON.parse(await readFile(new URL('../assets/extra.payload.json',import.meta.url),'utf8'));
 assert.equal(payload.iterations,600000);assert.equal(payload.version,1);
});
