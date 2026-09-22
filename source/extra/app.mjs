import { schools, sources, minimumStatus } from './admissions.mjs';
import { departments, eligibility, calculation, historical, comparison, reading, englishLoss, checkedNumber } from './departments.mjs';

const escape = v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number = (v,digits=2)=>v===null||v===undefined||!Number.isFinite(v)?'—':Number(v.toFixed(digits)).toLocaleString('ko-KR',{maximumFractionDigits:digits});
const actionClass='seed-action-button seed-action-button--variant_neutralWeak seed-action-button--size_medium seed-action-button--layout_withText seed-action-button--size_medium-layout_withText';
const btn=(text,attrs='')=>`<button type="button" class="${actionClass}" ${attrs}>${text}</button>`;
const tag=(text,tone='neutral')=>`<span class="seed-badge__root seed-badge__root--size_medium seed-badge__root--variant_weak seed-badge__root--tone_${tone}-variant_weak"><span class="seed-badge__label">${escape(text)}</span></span>`;
const selectHtml=(label,key,value,options)=>`<label class="rx-field"><span>${label}</span><select class="seed-select-trigger__root seed-select-trigger__root--size_medium jr-select" data-select="${key}" aria-label="${label}">${options.map(([v,t])=>`<option value="${escape(v)}" ${String(value)===String(v)?'selected':''}>${escape(t)}</option>`).join('')}</select></label>`;
const inputHtml=(label,path,value,max=200,min=0,step='any')=>`<label class="rx-field"><span>${label}</span><span class="seed-text-input__root seed-text-input__root--variant_outline seed-text-input__root--variant_outline-size_medium"><input class="seed-text-input__value seed-text-input__value--variant_outline-size_medium" data-input="${path}" aria-label="${label}" type="number" inputmode="decimal" value="${value??''}" min="${min}" max="${max}" step="${step}" placeholder="미입력"></span></label>`;
const sourceHtml=id=>`<a href="${escape(sources[id].url)}" target="_blank" rel="noopener noreferrer">${escape(sources[id].title)} ↗</a>`;
const gradeOptions=[['unknown','미입력'],...Array.from({length:9},(_,i)=>[String(i+1),`${i+1}등급`])];
let session=null;

export function reset() {session=null;}
export function mount(root,host={},bootstrap={}) {
 if(!session)session={screen:Object.keys(bootstrap).length?'focus':'scores',school:'yonsei',dept:'yonsei:경제학부',pct:{k:null,m:null,t1:null,t2:null,e:null,h:null,...bootstrap},std:{k:null,m:null,t1:null,t2:null},converted:{yonsei:[null,null],korea:[null,null],sogang:[null,null]},language:'unknown',grades:[null,null,null,null],skkuEnglish:null,confirmed:false,meme:true};
 const state=session;
 function render() {
  const opened=new Set([...root.querySelectorAll('details[open]')].map(x=>x.querySelector('summary')?.textContent));
  const school=schools.find(x=>x.id===state.school),list=departments.filter(x=>x.school===state.school);
  const d=list.find(x=>x.id===state.dept)??list[0];state.dept=d.id;
  root.innerHTML=`<div class="rx-workspace"><div class="rx-top"><div><span class="jr-muted">2027 · 서연고 / 서성한</span><h2>추가 기능</h2></div>${btn('잠그기','data-action="lock"')}</div><div class="rx-toolbar">${[['focus','대학 집중분석'],['scores','성적 입력'],['all','학과 한눈에'],['sources','근거']].map(([id,label])=>btn(label,`data-screen="${id}" aria-pressed="${state.screen===id}"`)).join('')}</div><div class="rx-content">${state.screen==='scores'?scoreForm():state.screen==='all'?allDepartments():state.screen==='sources'?evidence():focus(school,d,list)}</div><p class="jr-muted rx-end">입력은 이 탭의 메모리에만 유지됩니다. 잠그기·새로고침 시 추가 입력이 지워집니다.</p></div>`;
  root.querySelectorAll('details').forEach(x=>{if(opened.has(x.querySelector('summary')?.textContent))x.open=true;});
  root.querySelectorAll('[data-screen]').forEach(x=>x.addEventListener('click',()=>{state.screen=x.dataset.screen;render();}));
  root.querySelector('[data-action="lock"]').addEventListener('click',()=>{reset();host.lock();});
  root.querySelectorAll('[data-select]').forEach(x=>x.addEventListener('change',()=>{
   const key=x.dataset.select;
   if(key==='school'){state.school=x.value;state.dept=departments.find(d=>d.school===x.value).id;}
   else if(key==='dept')state.dept=x.value;
   else if(key.startsWith('grade:'))state.grades[Number(key.split(':')[1])]=x.value==='unknown'?null:Number(x.value);
   else if(key==='language')state.language=x.value;
   else if(key==='english'||key==='history')state.pct[key==='english'?'e':'h']=x.value==='unknown'?null:Number(x.value);
   render();
  }));
  root.querySelectorAll('[data-input]').forEach(x=>x.addEventListener('input',()=>{
   const path=x.dataset.input.split('.'),raw=x.value,n=checkedNumber(raw,Number(x.max),Number(x.min));
   const valid=raw===''||n!==null;x.setAttribute('aria-invalid',String(!valid));
   if(path[0]==='converted')state.converted[path[1]][Number(path[2])]=n;
   else if(path.length===2)state[path[0]][path[1]]=n;else state[path[0]]=n;
  }));
  root.querySelectorAll('[data-action="calculate"]').forEach(x=>x.addEventListener('click',()=>render()));
  root.querySelector('[data-action="apply"]')?.addEventListener('click',()=>{state.screen='focus';render();});
  root.querySelector('[data-action="import"]')?.addEventListener('click',()=>{if(importHost(host.scores))render();});
  root.querySelector('[data-action="confirmed"]')?.addEventListener('change',e=>{state.confirmed=e.target.checked;});
  root.querySelector('[data-action="meme"]')?.addEventListener('change',e=>{state.meme=e.target.checked;render();});
  root.querySelectorAll('[data-dept]').forEach(x=>x.addEventListener('click',()=>{const d=departments.find(d=>d.id===x.dataset.dept);state.school=d.school;state.dept=d.id;state.screen='focus';render();}));
 }
 function importHost(s) {
  const status=root.querySelector('[role="status"]');
  if(!s||s.korElective!=='화법과작문'&&s.korElective!=='화법과 작문'||s.mathElective!=='미적분'||!['생활과윤리','생활과 윤리'].includes(s.inq1Subject)||s.inq2Subject!=='한국지리') {
   if(status)status.textContent='일반 성적의 과목 순서를 화작·미적·생윤·한지로 맞춰 주세요.';return;
  }
  if(!['pct','std'].includes(s.mode)){if(status)status.textContent='일반 성적의 백분위 또는 표준점수 모드만 불러옵니다.';return;}
  const into=s.mode==='std'?'std':'pct';for(const [a,b]of [['k','kor'],['m','math'],['t1','inq1'],['t2','inq2']])state[into][a]=checkedNumber(s[b],into==='pct'||a.startsWith('t')?100:200);
  state.pct.e=checkedNumber(s.eng,9,1);state.pct.h=checkedNumber(s.hist,9,1);return true;
 }
 function scoreForm(){
  const labels=[['k','국어 · 화작'],['m','수학 · 미적'],['t1','생활과 윤리'],['t2','한국지리']];
  return `<h3>점수 넣고 가보자고</h3><p class="jr-muted">백분위와 표준점수는 별도 입력. 9모 점수는 2026 수능 표로 자동 변환하지 않습니다.</p><div class="rx-score-table"><div class="rx-score-head"><span>영역</span><span>백분위</span><span>표준점수</span></div>${labels.map(([k,label])=>`<div class="rx-score-row"><strong>${label}</strong>${inputHtml(`${label} 백분위`,`pct.${k}`,state.pct[k],100,0,1)}${inputHtml(`${label} 표준점수`,`std.${k}`,state.std[k],k.startsWith('t')?100:200,0,1)}</div>`).join('')}</div><div class="rx-pair">${selectHtml('영어 등급','english',state.pct.e??'unknown',gradeOptions)}${selectHtml('한국사 등급','history',state.pct.h??'unknown',gradeOptions)}</div><label class="rx-check"><input type="checkbox" data-action="confirmed" ${state.confirmed?'checked':''}> 입력한 숫자는 백분위가 맞음</label><p class="jr-muted">성적표의 점수 종류를 확인해 주세요. 표준점수만 넣어도 서울대 환산식은 계산할 수 있습니다.</p><details class="rx-details"><summary>실제 등급 · 서울대 응시조건</summary><div class="rx-pair">${labels.map(([k,label],i)=>selectHtml(`${label} 등급`,`grade:${i}`,state.grades[i]??'unknown',gradeOptions)).join('')}${selectHtml('제2외국어·한문','language',state.language,[['unknown','응시 여부 미확인'],['none','미응시'],...gradeOptions.slice(1)])}</div></details><div class="rx-toolbar">${btn('집중분석에 반영','data-action="apply"')}${btn('일반 성적에서 불러오기','data-action="import"')}</div><p role="status" class="jr-muted"></p>`;
 }
 function focus(s,d,list){
  const r=calculation(d,state),opinion=reading(d,state),hist=historical(d),eng=englishLoss(d,state.pct.e),min=['snu','sogang'].includes(d.school)?minimumStatus(d.school,state.grades,state.pct.e,state.pct.h):null;
  return `<div class="rx-pair">${selectHtml('집중분석 대학','school',s.id,schools.map(x=>[x.id,x.short]))}${selectHtml('주요 모집단위','dept',d.id,list.map(x=>[x.id,x.name]))}</div><div class="rx-verdict"><div class="rx-toolbar">${tag(opinion.label)}${tag(state.confirmed?'백분위':'가정','warning')}${tag(`${d.gun}군`)}</div><h3>${state.meme?opinion.headline:'조건·성적 비교 결과'}</h3><p>${opinion.detail}</p><strong>${escape(s.short)} · ${escape(d.name)}</strong><p class="jr-muted">${escape(s.track)} · ${escape(d.pool)}</p></div><div class="rx-facts"><div><span>응시조건</span><strong>${escape(r.eligibility.label)}</strong></div><div><span>전형</span><strong>${escape(s.method)}</strong></div><div><span>영어 ${state.pct.e??'—'}등급 손실</span><strong>${eng===null?'환산표 필요':number(eng,4)+'점'}</strong></div><div><span>수능 최저</span><strong>${min?min.label:'별도 최저 없음'}</strong></div></div><p class="jr-muted">영어 손실은 1등급 대비 수능 점수 기준${d.school==='hanyang'?'(1,000점 척도, 최종 900점 반영 전)':''}. 응시조건 충족은 수급자 자격·최저 충족 및 합격을 뜻하지 않습니다.</p>${calculationHtml(d,r)}${comparisonHtml(d,hist)}<details class="rx-details"><summary>지원 조건 · 주의할 점</summary>${s.notes.map(x=>`<p>${escape(x)}</p>`).join('')}<p>${escape(s.minimum)}</p><p>${escape(r.eligibility.reason)}</p>${sourceHtml(s.id)}</details>`;
 }
 function calculationHtml(d,r){
  const useT=['yonsei','korea','sogang'].includes(d.school),a=state.converted[d.school]??[null,null];
  return `<section class="rx-section"><h3>점수 계산, 과정까지</h3>${r.formula?`<div class="rx-formula">${escape(r.formula)}</div>`:''}<p class="jr-muted">K·M: 국수 표준점수 / T: 해당 대학 탐구 변환점수 / S: 탐구 표준점수. E·H는 대학별 영어·한국사 처리값입니다.</p>${useT&&r.eligibility.status!=='blocked'?`<details class="rx-details" ${r.value===null?'open':''}><summary>${escape(schools.find(s=>s.id===d.school).short)} 탐구 변환점수 입력</summary><p class="jr-muted">2027 변환표 미발표. 가산 전 값을 입력하며 지금 넣는 값은 가정 시나리오입니다.</p><div class="rx-pair">${inputHtml('생윤 변환점수',`converted.${d.school}.0`,a[0],100)}${inputHtml('한지 변환점수',`converted.${d.school}.1`,a[1],100)}</div>${btn('계산에 반영','data-action="calculate"')}</details>`:''}${d.school==='skku'&&d.track==='na'&&!d.restriction?`<div class="rx-pair">${inputHtml('영어 변환백분위 (가정값)','skkuEnglish',state.skkuEnglish,100)}${btn('계산에 반영','data-action="calculate"')}</div>`:''}<div class="rx-result" aria-live="polite"><span>${d.school==='skku'?'가중백분위 참고값':'입력값에 따른 수능 환산점수'}</span><strong>${r.value===null?'산출 보류':number(r.value,d.school==='sogang'?2:4)}</strong>${r.value===null?`<span>${escape(r.missing.join(' · '))}</span>`:`<code>${escape(r.substitution)}</code>`}</div><p class="jr-muted">${escape(r.extra)}</p><p class="jr-muted">2027 점수와 과거 연도의 환산점수를 직접 빼서 합불을 판단하지 않습니다.</p>${sourceHtml(d.school)}</section>`;
 }
 function comparisonHtml(d,h){
  const scoreRow=(label,a,score)=>`<tr><th scope="row">${escape(label)}</th>${[...a.slice(0,4),a[2]===null||a[3]===null?null:(a[2]+a[3])/2,...a.slice(4),score].map(x=>`<td>${number(x,4)}</td>`).join('')}</tr>`;
  const table=(rows)=>`<div class="rx-table-wrap" tabindex="0" aria-label="국수탐 백분위 및 영어 한국사 등급 비교"><table class="rx-table"><thead><tr>${['구분','국어','수학','탐1','탐2','탐평균','영어','한국사','당시 환산'].map(t=>`<th scope="col">${t}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  const mine=[state.pct.k,state.pct.m,state.pct.t1,state.pct.t2,state.pct.e,state.pct.h];
  let verified=h?`<p class="jr-muted">2025 최종등록자 70% 위치 학생 · ${escape(h.scope)}</p>${table(scoreRow('내 9모',mine,null)+(h.general?scoreRow('2025 일반',h.general,h.gScore):'')+scoreRow('2025 특별',h.special,h.sScore))}<p class="jr-muted">국·수·탐은 백분위, 영어·한국사는 등급입니다. 탐1/탐2는 과거 학생의 선택과목을 뜻하며 생윤·한지와 일치한다는 뜻은 아닙니다.</p>${sourceHtml(h.source)}`:`<p class="jr-muted">이 모집단위는 원문으로 재확인한 특별전형 비교컷이 없습니다. 컷 없음 ≠ 낮은 컷.</p>`;
  const aliases={'korea:경영학과':'경영대학','sogang:경영학부':'경영학부(경영학전공)','snu:자유전공학부':'(학부대학)자유전공학부'};
  const existing=host.data?.universities?.find(x=>x.id===d.school)?.departments?.find(x=>x.name===(aliases[d.id]??d.name));
  const archive=existing?.jeongsi?.['2026'];
  const rows=(archive?.types??[]).filter(x=>['general','equal'].includes(x.kind)&&x.student?.p70);
  const ar=rows.map(x=>{const p=x.student.p70;return scoreRow(x.typeName,[p.kor,p.math,p.inq1?.pct??null,p.inq2?.pct??null,p.eng,p.hist],x.score?.p70??null);}).join('');
  return `<section class="rx-section"><h3>일반전형과 나란히</h3>${verified}<details class="rx-details"><summary>기존 레이더 저장 자료 · 참고</summary><p class="jr-muted">기존 데이터에 2026학년도로 저장된 ${escape(existing?.name??d.name)} 결과입니다. 이번 작업에서 원문·공시연도·전형별 척도를 재검증하지 않아 추가 분석 판정에는 사용하지 않습니다.</p>${ar?table(ar):'<p>비교 가능한 저장 행 없음</p>'}${archive?.url?`<a href="${escape(archive.url)}" target="_blank" rel="noopener noreferrer">기존 데이터 출처 ↗</a>`:''}</details><p class="jr-muted">70% 위치는 마지막 합격선이 아닙니다. 학생부 포함 여부와 산식이 다르면 같은 대학·연도라도 환산점수끼리 직접 비교할 수 없습니다.</p></section>`;
 }
 function allDepartments(){
  return `<h3>서연고 · 서성한 전부 보기</h3><p class="jr-muted">${departments.length}개 주요 모집단위 · 학과를 누르면 적용 산식과 근거로 이동합니다.</p>${schools.map(s=>`<section class="rx-section"><h4>${s.name}</h4><div class="rx-dept-list">${departments.filter(d=>d.school===s.id).map(d=>{const r=calculation(d,state),e=r.eligibility;return `<button type="button" class="rx-dept" data-dept="${escape(d.id)}"><span><strong>${escape(d.name)}</strong><small>${escape(d.pool)}</small></span><span>${tag(e.status==='blocked'?'불가':e.status==='hold'?'확인':'조건충족',e.status==='blocked'?'critical':'neutral')}<small>${r.value===null?'환산 보류':number(r.value,2)} · ${d.gun}군</small></span></button>`}).join('')}</div></section>`).join('')}`;
 }
 function evidence(){return `<h3>밈은 가볍게, 근거는 확실히</h3><label class="rx-check"><input type="checkbox" data-action="meme" ${state.meme?'checked':''}> 밈 말투 켜기</label><div class="rx-facts"><div><span>검토일</span><strong>2026.09.22</strong></div><div><span>적용 과목</span><strong>화작 · 미적 · 생윤 · 한지</strong></div><div><span>대상 전형</span><strong>기초생활수급자 지원 특별전형</strong></div><div><span>합격 확률</span><strong>산출하지 않음</strong></div></div><p>‘할만한데?’는 과거 공개 학생과의 과목별 비교 표현입니다. ‘씹가능’을 합격 보장으로 표시하지 않습니다.</p><p>서울·연세·고려·서강은 확인된 식과 입력값으로 계산합니다. 연세·고려·서강의 탐구 변환점수는 대학별로 따로 입력합니다. 서울대는 성적표의 탐구 표준점수를 씁니다.</p><p>성균관대 나군은 가중백분위 참고 계산을 제공합니다. 성균관대 가·다군과 한양대는 아직 없는 2027 세부 환산표·정규화 상수·학생부 점수를 만들지 않고 반영 구조와 보류 이유를 보여줍니다.</p><p>같은 군에는 한 곳만 지원할 수 있습니다. 연세·고려는 가군으로 겹치며, 서울·서강은 나군으로 겹칩니다. 최종 모집인원은 수시 이월 후 다시 확인해야 합니다.</p><div class="rx-source-list">${schools.map(s=>`<div>${sourceHtml(s.id)}<p class="jr-muted">${sources[s.id].pages}</p></div>`).join('')}${sourceHtml('yonseiResult')}${sourceHtml('sogangResult')}</div>`;}
 render();
}
