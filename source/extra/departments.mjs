import { inquiryConversion } from './conversions.mjs';
import { calculate, gradeTables, minimumStatus, yonseiDepartments } from './admissions.mjs';

// 모집요강의 선발 단위와 학과별 상한은 구별한다. 의약·예체능의 별도 평가는 이 모듈 밖이다.
const make = (school, rows) => rows.map(([name,track,gun,pool,restriction=null])=>({id:school+':'+name,school,name,track,gun,pool,restriction}));
export const departments = [
 ...make('snu',[
  ['자유전공학부','free','나','학부 3명'],['경영대학','human','나','대학 3명'],['경제학부','human','나','사회과학대학 8명 공동'],['정치외교학부','human','나','사회과학대학 8명 공동'],['심리학과','human','나','사회과학대학 8명 공동'],['인문계열','human','나','계열 7명'],
  ['컴퓨터공학부','natural','나','공과대학 17명 공동','science'],['전기·정보공학부','natural','나','공과대학 17명 공동','science'],['기계공학부','natural','나','공과대학 17명 공동','science']]),
 ...make('yonsei',[
  ['경제학부','III','가','상경 5명 공동'],['응용통계학과','III','가','상경 5명 공동'],['경영학과','I','가','인문 35명 공동'],['심리학과','I','가','인문 35명 공동'],['정치외교학과','I','가','인문 35명 공동'],['언론홍보영상학부','I','가','인문 35명 공동'],
  ['전기전자공학부','II','가','자연 34명 공동'],['신소재공학부','II','가','자연 34명 공동'],['기계공학부','II','가','자연 34명 공동'],['컴퓨터과학과','II','가','자연 34명 공동'],['인공지능학과','II','가','자연 34명 공동'],['시스템반도체공학과','II','가','이 전형 모집 없음','not-offered']]),
 ...make('korea',[
  ['경영학과','human','가','사회배려 통합선발'],['경제학과','human','가','사회배려 통합선발'],['통계학과','human','가','사회배려 통합선발'],['정치외교학과','human','가','사회배려 통합선발'],['미디어학부','human','가','사회배려 통합선발'],['심리학부','human','가','사회배려 통합선발'],
  ['컴퓨터학과','natural','가','사회배려 통합선발'],['전기전자공학부','natural','가','사회배려 통합선발'],['기계공학부','natural','가','사회배려 통합선발'],['반도체공학과','natural','가','이 전형 모집 없음','not-offered']]),
 ...make('sogang',[
  ['경영학부','human','나','인문·인문자연 15명 공동'],['경제학과','human','나','인문·인문자연 15명 공동'],['사회과학부','human','나','인문·인문자연 15명 공동'],['인문학부','human','나','인문·인문자연 15명 공동'],['지식융합미디어학부','human','나','인문·인문자연 15명 공동'],
  ['컴퓨터공학과','natural','나','자연 9명 공동'],['전자공학과','natural','나','자연 9명 공동'],['화공생명공학과','natural','나','자연 9명 공동'],['기계공학과','natural','나','자연 9명 공동'],['인공지능학과','natural','나','자연 9명 공동']]),
 ...make('skku',[
  ['사회과학계열','ga','가','약학 제외 16명 공동 · 학과 상한 16명'],['자연과학계열','ga','가','약학 제외 16명 공동 · 학과 상한 16명'],['인문과학계열','na','나','나군 35명 공동 · 학과 상한 35명'],['경영학과','na','나','나군 35명 공동 · 학과 상한 35명'],['공학계열','na','나','나군 35명 공동 · 학과 상한 35명'],['전자전기정보공학부','na','나','나군 35명 공동 · 학과 상한 34명'],['컴퓨터공학과','na','나','나군 35명 공동 · 학과 상한 13명'],['바이오신약·규제과학과','na','나','나군 35명 공동 · 학과 상한 6명'],['반도체융합공학과','da','다','다군 4명 공동 · 학과 상한 4명'],['인공지능학과','da','다','다군 4명 공동 · 학과 상한 4명'],['글로벌경영학과','na','다','이 전형 모집 없음','not-offered']]),
 ...make('hanyang',[
  ['경영학부','business','나','상경 4명 공동 · 학과 상한 10명'],['경제금융학부','business','가','상경 5명 공동 · 학과 상한 5명'],['정보시스템학과(상경)','business','나','상경 4명 공동 · 학과 상한 2명'],['정치외교학과','human','가','인문 8명 공동 · 학과 상한 2명'],['사회학과','human','가','인문 8명 공동 · 학과 상한 2명'],['미디어커뮤니케이션학과','human','나','인문 2명 공동 · 학과 상한 3명'],
  ['기계공학부','natural','가','자연 15명 공동 · 학과 상한 7명'],['전기·생체공학부(전기공학전공)','natural','나','자연 8명 공동 · 학과 상한 3명'],['신소재공학부','natural','나','자연 8명 공동 · 학과 상한 4명'],['화학공학과','natural','나','자연 8명 공동 · 학과 상한 3명'],['컴퓨터소프트웨어학부','natural','—','이 전형 모집 없음','not-offered']]),
];

export function eligibility(d, language='unknown') {
 if(d.restriction==='not-offered') return {status:'blocked',label:'해당 전형 모집 없음',reason:'2027 정원외 모집단위 표에 포함되지 않습니다.'};
 if(d.restriction==='science') return {status:'blocked',label:'사탐 조합 지원 불가',reason:'과탐 2과목이 필수입니다. 화작·미적·생윤·한지 조합으로 지원할 수 없습니다.'};
 if(d.school==='snu'&&d.track==='human') {
  if(language==='none') return {status:'blocked',label:'제2외국어·한문 미응시',reason:'유형Ⅰ은 제2외국어 또는 한문 응시가 필요합니다.'};
  if(!/^[1-9]$/.test(String(language))) return {status:'hold',label:'제2외국어·한문 확인',reason:'응시 여부와 등급을 성적 입력에서 확인하세요.'};
 }
 return {status:'eligible',label:'응시과목 조건 충족',reason:'기초생활수급자 등 전형 자격 증명·졸업 요건·수능 최저는 별도로 충족해야 합니다.'};
}

export function checkedNumber(v,max=200,min=0) {
 if(v===null||v===undefined||String(v).trim()==='')return null;
 const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:null;
}

export function calculation(d,s) {
 const eligible=eligibility(d,s.language);
 const base={eligibility:eligible,value:null,formula:'',substitution:'',missing:[],extra:''};
 if(eligible.status==='blocked') return {...base,missing:[eligible.reason]};
 if(d.school==='skku') {
  if(d.track==='na') {
   const p=s.pct,E=null;
   const valid=['k','m','t1','t2'].every(k=>checkedNumber(p[k],100)!==null);
   const part=valid?.45*Math.max(p.k,p.m)+.30*Math.min(p.k,p.m)+.15*(p.t1+p.t2)/2:null;
   return {...base,formula:'0.45×max(K%, M%) + 0.30×min(K%, M%) + 0.15×탐구 백분위 평균 + 0.10×영어 변환백분위',value:part!==null&&E!==null?part+.1*E:null,substitution:part===null?'':`${part.toFixed(3)} + 0.10 × ${E??'영어 변환백분위'}`,missing:E===null?['2027 영어 변환백분위표 발표 대기 · 직접 입력 불필요']:[],extra:'가중백분위 참고값입니다. 최종 환산점수와 합격선이 아닙니다. 한국사 감점 및 최종 척도는 별도입니다.'};
  }
  return {...base,formula:d.track==='ga'?'국어 15% + 수학·탐구 우수 영역 40% / 나머지 30% + 영어 15%':'국어·수학 우수 영역 35% / 나머지 30% + 탐구 상위 1과목 25% + 영어 10%',missing:['2027 영역별 변환표·세부 산출방법'],extra:'가·다군은 표준점수 구조입니다. 백분위와 표준점수를 섞어 곱하거나 나군 점수를 복사하지 않습니다.'};
 }
 if(d.school==='hanyang')return {...base,formula:d.track==='natural'?'국어 25% + 수학 40% + 영어 10% + 탐구 25%':d.track==='business'?'국어 35% + 수학 35% + 영어 10% + 탐구 20%':'국어 35% + 수학 30% + 영어 10% + 탐구 25%',missing:['수능 후 공지될 세부 산출방법·탐구 변환표','학생부종합평가 점수'],extra:'최종 전형 총점 = 수능 900점 + 학생부종합평가 100점. 내신 등급 하나를 학생부 평가점수로 치환하지 않습니다.'};
 const conversion=d.school==='snu'?null:inquiryConversion(d.school,s.pct);
 const t=conversion?conversion.values:[s.std.t1,s.std.t2];
 const r=calculate(d.school,d.track,{k:checkedNumber(s.std.k),m:checkedNumber(s.std.m),t1:checkedNumber(t[0],100),t2:checkedNumber(t[1],100),e:s.pct.e,h:s.pct.h,language:/^[1-9]$/.test(String(s.language))?Number(s.language):null});
 return {...r,eligibility:eligible,conversion,missing:conversion?[...r.missing.filter(x=>!/^탐구 [12] 점수$/.test(x)), ...conversion.missing]:r.missing,extra:[r.extra,conversion?.note].filter(Boolean).join(' ')};
}

export function historical(d) {
 const y=d.school==='yonsei'&&yonseiDepartments.find(x=>x.name===d.name);
 if(y)return {year:2025,general:y.general,special:y.special,gScore:y.gScore,sScore:y.sScore,scope:'같은 모집단위',source:'yonseiResult',verified:true};
 if(d.school==='sogang')return {year:2025,general:null,special:d.track==='human'?[75,90,95,88,3,null]:[86,92,90,61,3,null],gScore:null,sScore:d.track==='human'?477.91:481.09,scope:'계열 전체 참고 · 이 학과 합격선 아님',source:'sogangResult',verified:true};
 return null;
}

export function comparison(p,row) {
 if(!row||!['k','m','t1','t2'].every(k=>checkedNumber(p[k],100)!==null)) return null;
 return {k:p.k-row[0],m:p.m-row[1],t:(p.t1+p.t2-row[2]-row[3])/2,e:row[4]===null?null:p.e-row[4]};
}

export function reading(d,s) {
 const e=eligibility(d,s.language),h=historical(d),diff=comparison(s.pct,h?.special);
 if(e.status==='blocked')return {headline:'이 조합으로는 에반데',label:'지원 불가',detail:e.reason};
 if(e.status==='hold')return {headline:'잠깐, 응시조건부터',label:'자격 확인',detail:e.reason};
 if(h&&!diff)return {headline:'성적부터 넣고 가보자',label:'성적 입력 필요',detail:'성적표의 국어·수학·탐구 백분위를 입력하면 공개된 학생과 과목별로 비교합니다.'};
 if(!diff)return {headline:'씹가능? 아직 그 말은 보류',label:'합불 판단 보류',detail:'이 모집단위의 확인된 특별전형 비교컷이 없습니다. 일반전형·농어촌 컷으로 대신 판정하지 않습니다.'};
 if(diff.k>=0&&diff.m>=0&&diff.t>=0&&diff.e<=0)return {headline:'과목별로는 할만한데?',label:'과거 성적 비교',detail:'공개된 70% 위치 학생보다 국·수·탐 평균은 낮지 않고 영어 등급도 불리하지 않습니다. 모의평가·선택과목·반영식 차이 때문에 합격권 판정은 아닙니다.'};
 if(diff.t<0&&(diff.k>=0||diff.m>=0))return {headline:'국수는 버팀목, 탐구 보강각',label:'강약이 섞임',detail:`특별전형 70% 위치 학생 대비 국어 ${diff.k>=0?'+':''}${diff.k}, 수학 ${diff.m>=0?'+':''}${diff.m}, 탐구 평균 ${diff.t>=0?'+':''}${diff.t}. 과목 차이를 더해 합불로 바꾸지는 않습니다.`};
 return {headline:'대퉁 보면 안 되고, 과목별로',label:'보강 영역 확인',detail:`국어 ${diff.k>=0?'+':''}${diff.k}, 수학 ${diff.m>=0?'+':''}${diff.m}, 탐구 평균 ${diff.t>=0?'+':''}${diff.t}. 지금은 강약 비교까지이며 안정·불합격을 단정할 근거가 부족합니다.`};
}

export function englishLoss(d,grade) {
 if(!Number.isInteger(grade)||grade<1||grade>9)return null;
 if(d.school==='snu')return gradeTables.snuE[grade-1];
 if(d.school==='yonsei')return (100-gradeTables.yonseiE[grade-1])*1000/({I:800,II:900,III:600}[d.track]);
 if(d.school==='korea')return gradeTables.koreaE[grade-1];
 if(d.school==='sogang')return 100-gradeTables.sogangE[grade-1];
 if(d.school==='hanyang')return 100-(d.track==='natural'?[100,98,94,88,80,70,58,44,28]:[100,96,90,82,72,60,46,30,12])[grade-1];
 return null;
}
