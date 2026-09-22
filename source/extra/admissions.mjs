                                                                                  
                                                                                       
export const gradeTables = {
 yonseiE:[100,95,87.5,75,60,40,25,12.5,5], yonseiH:[0,0,0,0,.2,.4,.6,.8,1],
 koreaE:[0,3,6,9,12,15,18,21,24], koreaH:[0,0,0,0,.2,.4,.6,.8,2],
 snuE:[0,.5,2,4,6,8,10,12,14], snuH:[0,0,0,.4,.8,1.2,1.6,2,2.4], snuL:[0,0,.5,1,1.5,2,2.5,3,3.5],
 sogangE:[100,99.5,98.5,97,95,92.5,89.5,86,82], sogangH:[10,10,10,10,9.5,9,8.5,8,7.5],
};
                                                                                                                                   
                                                                                                                     
export function calculate(school         , track       , x          )            {
 const missing = ([['국어 표준점수',x.k],['수학 표준점수',x.m],['탐구 1 점수',x.t1],['탐구 2 점수',x.t2]]                          ).filter(([,v])=>v===null||!Number.isFinite(v)||v<0).map(([n])=>n);
 if(school==='snu' && track==='human' && x.language===null) missing.push('제2외국어/한문 등급');
 if(!Number.isInteger(x.e)||x.e<1||x.e>9||!Number.isInteger(x.h)||x.h<1||x.h>9) missing.push('유효한 영어·한국사 등급');
 const k=x.k??0,m=x.m??0,t1=x.t1??0,t2=x.t2??0,t=t1+t2;
 const e=x.e-1,h=x.h-1;
 let value            =null, formula='',substitution='',extra='';
 if(school==='yonsei') {
  const E=gradeTables.yonseiE[e], H=gradeTables.yonseiH[h];
  if(x.h>4) missing.push('한국사 5등급 이하: 감점 적용 세부 산출방법 추가 확인');
  if(track==='I') { formula='(1.5K + M + E + 1.03×(T₁+T₂)) × 1000/800 − H'; value=(1.5*k+m+E+1.03*t)*1000/800-H; substitution=`(1.5×${k} + ${m} + ${E} + 1.03×(${t1}+${t2})) × 1000/800 − ${H}`; }
  else if(track==='II') { formula='(K + 1.5M + E + 1.5×(T₁+T₂)) × 1000/900 − H'; value=(k+1.5*m+E+1.5*t)*1000/900-H; substitution=`(${k} + 1.5×${m} + ${E} + 1.5×(${t1}+${t2})) × 1000/900 − ${H}`; }
  else { formula='(K + M + E + 0.5×(T₁+T₂)) × 1000/600 − H'; value=(k+m+E+.5*t)*1000/600-H; substitution=`(${k} + ${m} + ${E} + 0.5×(${t1}+${t2})) × 1000/600 − ${H}`; }
  extra='한지·생윤, 한국사 1–4등급 기준. 유형Ⅰ에만 사탐 3%를 적용합니다. 유형Ⅱ는 의예과를 제외합니다.';
 } else if(school==='korea') {
  const E=gradeTables.koreaE[e],H=gradeTables.koreaH[h];
  if(track==='human') {formula='(K + M + 0.8×(T₁+T₂)) × 1000/560 − E − H';value=(k+m+.8*t)*1000/560-E-H;substitution=`(${k}+${m}+0.8×(${t1}+${t2})) × 1000/560 − ${E} − ${H}`;}
  else {formula='(K + 1.2M + T₁+T₂) × 1000/640 − E − H';value=(k+1.2*m+t)*1000/640-E-H;substitution=`(${k}+1.2×${m}+${t1}+${t2}) × 1000/640 − ${E} − ${H}`;}
  extra='사탐 2과목에는 자연계 과탐 3% 가산점이 없습니다. 예체능은 계산 범위에서 제외합니다.';
 } else if(school==='sogang') {
  const a=1.1*k+1.3*m,b=1.3*k+1.1*m,E=gradeTables.sogangE[e],H=gradeTables.sogangH[h];
  formula='max(1.1K+1.3M, 1.3K+1.1M) + 0.6×(T₁+T₂) + E + H';
  value=Math.round((Math.max(a,b)+.6*t+E+H)*100)/100;
  substitution=`max(${a.toFixed(2)}, ${b.toFixed(2)}) + 0.6×(${t1}+${t2}) + ${E} + ${H}`;
  extra=`유리한 ${a>=b?'A형(수학 가중)':'B형(국어 가중)'}을 반영합니다. 최종 점수는 소수 셋째 자리에서 반올림합니다.`;
 } else if(school==='snu') {
  const E=gradeTables.snuE[e],H=gradeTables.snuH[h],L=track==='human'&&x.language!==null?gradeTables.snuL[x.language-1]:0;
  formula='K + 1.2M + 0.8×(S₁+S₂) − E − H − L';value=k+1.2*m+.8*t-E-H-L;
  substitution=`${k} + 1.2×${m} + 0.8×(${t1}+${t2}) − ${E} − ${H} − ${L}`;
  extra='서울대 탐구는 성적표의 표준점수(S)를 직접 사용합니다. 사탐 응시이므로 과학Ⅱ 조정점수는 없습니다.';
 }
 return {value:missing.length||value===null||!Number.isFinite(value)?null:value,formula,substitution:missing.length?'':substitution,missing,extra};
}
export const sources = {
 snu:{title:'서울대 2027 정시 모집요강',url:'https://admission.snu.ac.kr/webdata/admission/files/2027jungsi.pdf',pages:'모집인원 9–11쪽 · 전형/계산 53–54쪽 · 응시영역 75–76쪽'},
 yonsei:{title:'연세대 서울 2027 정시 모집요강',url:'https://admission.yonsei.ac.kr/seoul/upload/guide/20260901184445WSGU8N.PDF',pages:'유형/모집단위 5–8쪽 · 연세한마음 31–34쪽'},
 korea:{title:'고려대 서울 2027 정시 모집요강',url:'https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=1806&BOARD_SEQ=5&CONTENTS_NO=&MENU_ID=750&SITE_NO=2',pages:'수능 반영 15–16쪽 · 사회배려자 자격/전형 항목'},
 sogang:{title:'서강대 2027 정시 모집요강',url:'https://admission3.sogang.ac.kr/enter/html/regular/guide.asp',pages:'기초생활보장대상자 전형 · 수능 반영/산출 예시 항목'},
 skku:{title:'성균관대 2027 정시 모집요강',url:'https://admission.skku.edu/upload/guide/20260904131832E8YKPF.pdf',pages:'이웃사랑 자격 33쪽 · 군별 반영 34쪽'},
 hanyang:{title:'한양대 서울 2027 정시 모집요강',url:'https://go.hanyang.ac.kr/web/notice/notice_view.do?bn=21868&m_type=JEONGSI',pages:'기회균형선발 항목 · 수능 산출/반영 39–40쪽'},
 yonseiResult:{title:'어디가 · 연세대 2025 입시결과',url:'https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2026&unvCd=0000149',pages:'2026학년도 안내 화면에 수록된 2025 결과 · 일반/연세한마음 70% 학생 성적'},
 sogangResult:{title:'어디가 · 서강대 2025 입시결과',url:'https://www.adiga.kr/ucp/uvt/uni/univDetailSelection.do?menuId=PCUVTINF2000&searchSyr=2026&unvCd=0000120',pages:'2026학년도 안내 화면에 수록된 2025 결과 · 일반/기초생활보장대상자 70% 성적'},
};
                                                                                                                                                                       
export const schools         =[
 {id:'snu',name:'서울대학교',short:'서울대',track:'기회균형특별전형 · 저소득',gun:'나군',seats:'93명',status:'응시조건 먼저 확인',lead:'인문은 제2외국어·한문 응시가 관건',notes:['유형Ⅰ 인문계열 등은 제2외국어/한문이 필수입니다. 현재 응시 여부가 없어 자격 판정을 보류합니다.','유형Ⅱ 자연계열은 과탐 2과목이 필요해 현재 사탐 조합으로 지원할 수 없습니다.','자유전공학부는 유형Ⅲ로 사탐 지원이 가능하고 저소득 3명을 선발합니다. 학부대학 광역에는 저소득 모집인원이 없습니다.'],method:'수능 100% · 일반 모집단위 기준',minimum:'국·수·영·탐(2과목 평균) 중 3개 영역 등급 합 7 이내'},
 {id:'yonsei',name:'연세대학교',short:'연세대',track:'연세한마음학생 · 서울캠퍼스',gun:'가군',seats:'최대 83명',status:'우선 검토',lead:'국어·수학 강점과 탐구 약점을 함께 비교',notes:['기초생활수급자 본인 자격을 확인해야 합니다. 차상위계층 자격만으로는 연세한마음 지원이 불가합니다.','화작·미적·사탐 2과목으로 유형Ⅰ·Ⅱ·Ⅲ 응시영역 조건을 충족합니다. 자연계는 과탐 3% 가산점을 받지 못합니다.','계열별 모집이며 모집단위별 입학정원 5% 상한이 있습니다. 학과별 고정 인원 83명이 아닙니다.'],method:'수능 100% · 의예/예체능 등 별도',minimum:'별도 수능 최저 없음 · 지정 응시영역 충족 필요'},
 {id:'korea',name:'고려대학교',short:'고려대',track:'사회배려전형 · 서울캠퍼스',gun:'가군',seats:'69명',status:'성적 판단 보류',lead:'지원 가능성과 합격 가능성은 별개',notes:['기초생활수급자는 사회배려전형 자격 대상입니다.','인문·자연 모두 사탐 2과목 응시가 가능합니다. 자연계 지원 시 과탐 3% 가산점은 없습니다.','이번에 확보한 공식 자료에서 사회배려전형의 비교 가능한 합격선을 확인하지 못했습니다. 농어촌 합격선을 대신 쓰지 않습니다.'],method:'수능 100% · 예체능/의대 면접 등 별도',minimum:'별도 수능 최저 없음'},
 {id:'sogang',name:'서강대학교',short:'서강대',track:'기초생활보장대상자전형',gun:'나군',seats:'24명',status:'함께 검토',lead:'영어 부담이 작고 국어 가중식도 적용',notes:['인문·인문자연 15명, 자연 9명을 선발합니다. 사탐 2과목 지원이 가능합니다.','국어/수학 가중치를 바꾼 A·B 중 유리한 식을 반영합니다. 영어 2등급의 1등급 대비 손실은 0.5점입니다.','2025 특별전형 결과는 계열 단위입니다. 이를 특정 학과의 합격선으로 제시할 수 없습니다.'],method:'수능 100%',minimum:'국·수·영·탐(상위 1과목) 중 3개 등급 합 9 이내 + 한국사 4 이내'},
 {id:'skku',name:'성균관대학교',short:'성균관대',track:'이웃사랑전형',gun:'가·나·다군',seats:'57명',status:'정시 신설 · 컷 없음',lead:'나군은 백분위를 직접 쓰는 구조',notes:['가군 18명(약학 2명 포함), 나군 35명, 다군 4명입니다. 모집단위별 최대 선발 인원과 실제 모집인원을 혼동하면 안 됩니다.','확인한 자료에는 비교 가능한 정시 합격선이 없습니다. 과거 수시 이웃사랑 결과를 정시 컷으로 사용할 수 없습니다.','군마다 표준점수/백분위, 탐구 2과목/상위 1과목이 다릅니다. 최종 영어·탐구 환산표 확인이 필요합니다.'],method:'수능 100%',minimum:'별도 수능 최저 없음'},
 {id:'hanyang',name:'한양대학교',short:'한양대',track:'기회균형선발 · 서울캠퍼스',gun:'가·나군',seats:'42명',status:'학생부 추가 필요',lead:'수능 성적만으로 총점 산출 불가',notes:['가군 28명, 나군 14명입니다. 현재 사탐 2과목 조합으로 지원 가능합니다.','수능 90%와 학생부종합평가 10%를 반영합니다. 학생부 점수를 내신 등급 하나로 환산하거나 만점으로 가정하지 않습니다.','2027 수능 산출방법과 탐구 변환점수 등은 수능 성적 발표 후 공지 예정입니다. 지금 완성된 최종 계산식을 만들 수 없습니다.'],method:'수능 90% + 학생부종합평가 10%',minimum:'별도 수능 최저 없음'},
];
export const yonseiDepartments = [
 {id:'econ',name:'경제학부',type:'III',pool:'상경 5명',general:[96,90,92,92,2,1],special:[86,78,90,85,2,2],gScore:687.8315,sScore:660.1146},
 {id:'business',name:'경영학과',type:'I',pool:'인문 35명',general:[98,90,93,94,1,2],special:[91,81,87,92,2,2],gScore:698.3454,sScore:668.1556},
 {id:'eee',name:'전기전자공학부',type:'II',pool:'자연 34명',general:[91,98,94,94,2,2],special:[86,90,78,88,3,2],gScore:701.1039,sScore:647.8062},
 {id:'materials',name:'신소재공학부',type:'II',pool:'자연 34명',general:[89,97,96,91,2,2],special:[83,85,95,86,2,3],gScore:697.8579,sScore:654.7444},
];
export function validateProfile(input        )         {
 if(typeof input!=='object'||input===null||Array.isArray(input)) throw new Error('성적 객체가 필요합니다.');
 const obj=input                          ,keys=['k','m','t1','t2','e','h'];
 if(Object.keys(obj).some(k=>!keys.includes(k))) throw new Error('허용되지 않는 항목입니다.');
 for(const key of keys) {const v=obj[key];if(typeof v!=='number'||!Number.isFinite(v)||!Number.isInteger(v)||v<(key==='e'||key==='h'?1:0)||v>(key==='e'||key==='h'?9:100))throw new Error(`${key} 점수 범위를 확인하세요.`);}
 return obj           ;
}
export function minimumStatus(school               ,grades                ,english       ,history       ) {
 if(school==='sogang'&&history>4)return {label:'최저 미충족',sum:null};
 const [k,m,t1,t2]=grades;
 // Three known areas are enough to establish satisfaction even if the fourth is missing.
 const t=t1!==null&&t2!==null?(school==='snu'?(t1+t2)/2:Math.min(t1,t2)):null;
 const known=[k,m,english,t].filter((v)            =>v!==null).sort((a,b)=>a-b);
 const limit=school==='snu'?7:9;
 if(known.length>=3 && known.slice(0,3).reduce((a,b)=>a+b,0)<=limit)return {label:'입력 등급 기준 충족',sum:known.slice(0,3).reduce((a,b)=>a+b,0)};
 if(known.length<4)return {label:'등급 추가 입력 필요',sum:null};
 return {label:'최저 미충족',sum:known.slice(0,3).reduce((a,b)=>a+b,0)};
}
