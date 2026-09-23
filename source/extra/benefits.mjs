// Official-source snapshot. Application availability and personal eligibility are separate.
export const benefitsCheckedAt='2026-09-23';
export function initialBenefitProfile(){return {region:'인천',district:'검단구',birthYear:2008,types:[]};}
export const benefitSources={
 incheonDream:{title:'인천시 · 학교밖청소년지원센터·급식·연락처',url:'https://www.incheon.go.kr/welfare/WE020407'},
 incheonScholar:{title:'인천인재평생교육진흥원 · 학교 밖 꿈드림 장학금',url:'https://itle.or.kr/user/scholarship/service/view.do?sq=737'},
 incheonScholarApply:{title:'인천인재평생교육진흥원 · 2026 실제 접수기간',url:'https://itle.or.kr/user/scholarship/apply/write_step10.do'},
 incheonWater:{title:'인천상수도사업본부 · 수급자 감면·검단구 관할',url:'https://minwon.waterworksh.incheon.kr/chrge/CCS03015.do'},
 incheonWaterAmount:{title:'인천상수도사업본부 · 감면액 계산',url:'https://minwon.waterworksh.incheon.kr/chrge/CCS03001_01.do'},
 mockNotice:{title:'성평등가족부 · 2026 모의평가 응시료 지원 공고',url:'https://www.mogef.go.kr/nw/enw/nw_enw_s001d.do?bbtSn=713872&mid=mda700'},
 mockPortal:{title:'청소년1388 · 모의평가 응시료 신청 안내',url:'https://www.1388.go.kr/sfi/YTOSP_SC_CTT_01'},
 culture:{title:'김포시 · 2026 문화누리카드 안내',url:'https://www.gimpo.go.kr/portal/selectBbsNttView.do?bbsNo=54&deleteAt=N&key=3325&nttNo=960223&pageIndex=1&pageUnit=10&searchCnd=all'},
 culture2:{title:'군산시 · 2026 문화누리카드 안내',url:'https://www.gunsan.go.kr/main/m140/view/9827238?s_idx=8'},
 dream:{title:'성평등가족부 · 학교 밖 청소년 지원',url:'https://www.mogef.go.kr/sp/yth/sp_yth_f018.do'},
 health:{title:'성평등가족부 · 검정고시 이후에도 무료 건강검진',url:'https://www.mogef.go.kr/nw/enw/nw_enw_s001d.do?bbtSn=713398&mid=mda700'},
 healthApply:{title:'성평등가족부 · 건강검진 온라인·연중 신청 안내',url:'https://www.mogef.go.kr/nw/enw/nw_enw_s001d.do?bbtSn=713234&mid=mda700'},
 mobile:{title:'LG U+ · 복지할인 금액·대상',url:'https://www.lguplus.com/benefit-uplus/price-discount/B400000008'},
 mobileKt:{title:'KT · 복지요금 감면 신청',url:'https://product.kt.com/benefit/membership/web/welfare_sale.html'},
 utility:{title:'연수구 · 수급자 요금감면 신청 안내',url:'https://www.yeonsu.go.kr/welfare/user/downscale/reduction.asp'},
 gas:{title:'부산도시가스 · 사회적 배려 대상자 요금경감 신청',url:'https://www.skens.com/busan/data/view.do?form.seq=1188&page.keyword=&page.page=1&page.type='},
 tv:{title:'KBS · 수신료 면제 대상',url:'https://kbsagain.kbs.co.kr/goji/m.html'},
 didim:{title:'보건복지부 · 아동발달지원계좌',url:'https://www.mohw.go.kr/menu.es?mid=a10711040800'},
 didimApply:{title:'서초구 · 디딤씨앗통장 연중 신청',url:'https://www.seocho.go.kr/site/seocho/04/10403080900002022012510.jsp'},
 food:{title:'농림축산식품부 · 2026 농식품바우처 신청',url:'https://www.mafra.go.kr/bbs/home/792/576233/artclView.do'},
 foodAmount:{title:'서초구 · 농식품바우처 가구별 금액',url:'https://www.seocho.go.kr/site/sh/03/10308050000002025032609.jsp'},
 energy:{title:'에너지바우처 · 2026 대상·금액·신청기간',url:'https://www.energyv.or.kr/info/support_info.do'},
 youthId:{title:'성평등가족부 · 청소년증 발급',url:'https://www.mogef.go.kr/sp/yth/sp_yth_f005.do'},
 sanitary:{title:'성평등가족부 · 여성청소년 생리용품 지원',url:'https://www.mogef.go.kr/sp/yth/sp_yth_f017.do'},
 sanitaryApply:{title:'강남구 · 2026 신청기한·연간 전액 지원',url:'https://www.gangnam.go.kr/board/chfr_notice/42/view.do?mid=ID02_01051906'},
 seoul:{title:'은평구 · 2026 서울런 상시 가입 안내',url:'https://www.ep.go.kr/dong/selectBbsNttView.do?bbsNo=42&integrDeptCode=&key=4069&nttNo=320174&pageIndex=8&searchCnd=all&searchCtgry=&searchKrwd='},
 youthPass:{title:'정책브리핑 · 청년문화예술패스 추가 발급',url:'https://m.korea.kr/multi/visualNewsView.do?newsId=148969837'},
 youthPassTerms:{title:'인천시 · 추가 발급 대상·제외 조건',url:'https://www.incheon.go.kr/IC010101/view?nttNo=2046055'},
 ebsClosed:{title:'EBS · 무상교재 신청 마감 안내',url:'https://www.ebsi.co.kr/ebs/pot/poty/grtsBookMain.ebs?hitCountPage=ace'},
 sktClosed:{title:'SKT · EBS 데이터팩 가입중단 표시',url:'https://m.tworld.co.kr/product/callplan?prod_id=NA00006312'},
 rice:{title:'양주시 · 양곡 지원 월별 접수 안내',url:'https://www.yangju.go.kr/www/contents.do?key=459'},
 special:{title:'성평등가족부 · 위기청소년 특별지원',url:'https://www.mogef.go.kr/sp/yth/sp_yth_f009.do'},
 work:{title:'고용24 · 국민취업지원제도 참여 제한',url:'https://www.work24.go.kr/ua/z/z/1300/selectEmssRqutIntro.do'},
 training:{title:'찾기쉬운 생활법령정보 · 내일배움카드 제외·예외',url:'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=1&cnpClsNo=2&csmSeq=1658'}
};
export const benefits=[
 {id:'incheonScholar',name:'인천 학교 밖 꿈드림 장학금',category:'학습·진학',kind:'개인 · 기관추천·선발 장학금',region:'인천',age:[9,24],recommend:'추천 · 현재 추천 접수기간이며 학교 밖 청소년을 대상으로 합니다.',start:'2026-09-10',end:'2026-10-23',period:'2026.09.10~10.23 23:59 · 기관추천 접수',amount:'선발 시 1,000,000원 · 생활비성 학업 장려금',target:'인천시 학교 밖 청소년지원센터 등록 9~24세 중 가정형편 및 자립성취 성과 요건을 충족하고 센터장 추천을 받은 청소년.',conditions:['수급자 가정은 가정형편 요건에 포함됩니다. 급여 종류를 생계·의료로만 제한하는 안내는 없습니다.','학업복귀·사회진입 준비 관련 성과 심사와 센터장 추천이 필요합니다. 모의고사 성적만으로 선발을 보장하지 않습니다.','70명 선발 예정입니다. 개인이 접수 버튼을 눌러 바로 신청하는 방식이 아닙니다. 센터 자체 추천 마감은 더 이를 수 있습니다.'],apply:'등록한 꿈드림센터에 추천 상담 요청. 미등록·관할 미확인은 인천시 꿈드림 032-721-2331에 검단구 거주 사실을 알리고 센터 연결 및 추천 가능 여부 확인.',url:'https://itle.or.kr/user/scholarship/service/view.do?sq=737',sources:['incheonScholar','incheonScholarApply','incheonDream']},
 {id:'incheonWater',name:'인천 기초생활수급자 수도요금 감면',category:'요금 감면',kind:'가구 · 월 요금 할인',region:'인천',period:'상시 감면 신청',amount:'가구당 월 가정용 10톤 상당 · 최대 12,000원',target:'인천 수도요금 감면 대상 기초생활수급 가구. 검단구는 서부수도사업소 관할입니다.',conditions:['10톤 미만이면 실제 사용량 기준으로 감면합니다. 개인별 현금 지원이 아닙니다.','단독세대의 구경별 정액요금은 남을 수 있고 공동세대는 가구당 평균사용량을 기준으로 합니다.','이미 감면받고 있는지와 수도 고객번호·수급 자격 확인이 필요합니다.'],apply:'인천상수도 사이버민원센터의 기초생활수급자 감면 신청 또는 서부수도사업소 032-720-3820·인천콜센터 032-120 문의.',url:'https://minwon.waterworksh.incheon.kr/',sources:['incheonWater','incheonWaterAmount']},
 {id:'mock',name:'6·9월 모의평가 응시료 지원',category:'학습·진학',kind:'개인 · 응시료 환급',recommend:'추천 · 대학 입시와 직접 관련되고, 공고 중 이른 기한이 9월 30일입니다.',age:[9,24],start:'2026-06-04',end:'2026-09-30',deadlineConflict:true,period:'접수 중 · 공식 안내의 마감일이 서로 다름',amount:'회당 12,000원 · 두 회 응시 시 최대 24,000원',target:'9~24세 학교 밖 청소년 중 2026년 6월·9월 평가원 모의평가에 응시하고 응시료를 낸 사람.',conditions:['자퇴·검정고시 응시만으로 자동 지급되지 않습니다. 해당 모의평가 응시·납부 여부가 필요합니다.','부처 6월 4일 공고는 9월 30일, 청소년1388 안내는 수능 전일인 11월 18일을 제시합니다. 변경 관계가 확인되지 않아 하나로 단정하지 않았습니다.'],apply:'청소년1388 또는 가까운 꿈드림센터에서 신청 안내 확인. 추천: 9월 30일까지 먼저 접수 여부를 확인하세요.',url:'https://www.1388.go.kr/sfi/YTOSP_SC_CTT_01',sources:['mockNotice','mockPortal']},
 {id:'culture',name:'문화누리카드',category:'문화·생활',kind:'개인 · 연간 이용권',recommend:'추천 · 발급 기한과 지역 예산 소진 조건이 있습니다.',birthMax:2020,start:'2026-02-02',end:'2026-11-30',period:'2026.02.02~11.30 · 지역 예산 소진 시 조기 종료',amount:'기본 연 150,000원 · 2008~2013년생은 10,000원 추가 지원 대상',target:'기초생활수급자·차상위계층 중 2020년 12월 31일 이전 출생자.',conditions:['재학생 요건은 없습니다. 문화·국내여행·체육 가맹점에서 사용합니다.','추가 지원과 신규 발급의 예산 잔여 여부는 발급처에서 확인해야 합니다. 사용기한은 2026년 12월 31일입니다.','이미 올해 지원받은 금액을 다시 받는 제도가 아닙니다.'],apply:'문화누리 누리집·앱 또는 주민센터. 기존 카드의 자동재충전 여부와 잔액부터 확인.',url:'https://www.mnuri.kr/',sources:['culture','culture2']},
 {id:'dream',name:'꿈드림 학습·진학·상담 지원',category:'학습·진학',kind:'개인 · 서비스',recommend:'추천 · 검정고시 이후 대학 진학 준비에도 연결할 수 있습니다.',age:[9,24],period:'센터 이용 신청 상시 · 개별 프로그램은 별도 모집',amount:'상담·학습·진로·자립 지원 서비스',target:'9~24세 학교 밖 청소년. 고등학교 자퇴 청소년도 지원 대상입니다.',conditions:['센터 등록과 특정 수업·멘토링·진학상담의 참여 확정은 다릅니다. 지역별 일정·정원·지원 내용이 다릅니다.','급식·교통·교재·학원비 등을 모든 지역에서 같은 금액으로 지급한다고 보장하지 않습니다.'],apply:'청소년1388에서 지역 학교밖청소년지원센터 찾기 → 이용 신청 → 대학 진학 목적을 알리고 현재 모집 프로그램 확인.',url:'https://www.1388.go.kr/occ/YTOSP_SC_OID_01',sources:['dream','mockNotice']},
 {id:'health',name:'학교 밖 청소년 무료 건강검진',category:'건강·돌봄',kind:'개인 · 검진',age:[9,19],period:'연중 신청',amount:'건강검진 비용 무료 · 3년 주기',target:'9~18세 학교 밖 청소년. 19세는 다른 국가건강검진과 중복되지 않는 경우 포함됩니다.',conditions:['검정고시에 합격한 뒤에도 학교 밖 청소년 자격으로 이용할 수 있습니다.','최근 검진 이력과 다른 국가검진 대상 여부를 확인해야 합니다. 검진 후 모든 치료비가 자동 면제되는 제도는 아닙니다.'],apply:'청소년1388 온라인 신청 또는 꿈드림센터 방문·우편 신청 후 검진 대상 확인.',url:'https://www.1388.go.kr/sfi/YTOSP_SC_SSU_02?id=1387',sources:['health','healthApply']},
 {id:'mobile',name:'이동통신요금 복지감면',category:'요금 감면',kind:'개인 회선 · 월 할인',period:'상시 신청',amount:'생계·의료 월 최대 36,850원 / 주거·교육 월 최대 23,650원 (부가세 포함)',target:'수급 종류에 맞는 복지할인 대상 본인 명의의 적용 가능한 이동통신 회선.',conditions:['표시액은 통신사 안내의 부가세 포함 상한입니다. 실제 할인은 청구요금·요금제·회선 조건에 따라 달라집니다. 현금 지급액이 아닙니다.','알뜰폰은 같은 감면액이 자동 적용된다고 볼 수 없습니다. 해당 사업자의 복지요금제를 확인하세요.','생계·의료와 주거·교육 할인 한도를 더하지 않습니다.'],apply:'이용 중인 통신사 고객센터 114·매장 또는 주민센터에서 복지감면 신청. 수급 종류와 회선 명의 확인.',url:'https://product.kt.com/benefit/membership/web/welfare_sale.html',sources:['mobile','mobileKt']},
 {id:'electric',name:'전기요금 복지할인',category:'요금 감면',kind:'가구 · 월 요금 한도',period:'상시 신청',amount:'생계·의료 일반 월 16,000원 / 주거·교육 10,000원 한도',target:'기초생활수급 가구의 복지할인 적용 대상 주거용 전기 계약.',conditions:['하절기 한도는 생계·의료 20,000원, 주거·교육 12,000원입니다. 적용 월·계약·실제 청구액은 한국전력에서 확인합니다.','가구 요금에서 감면됩니다. 가족 각자에게 같은 금액을 현금으로 주지 않습니다.'],apply:'한국전력 123·한전ON 또는 주민센터. 전기 고객번호와 이미 할인 중인지 확인.',url:'https://online.kepco.co.kr/',sources:['utility']},
 {id:'gas',name:'도시가스요금 경감',category:'요금 감면',kind:'가구 · 요금 할인',period:'상시 신청',amount:'수급 종류·계절·취사/난방 용도에 따라 경감액이 다름',target:'도시가스를 사용하는 수급 가구 중 요금경감 대상 계약.',conditions:['도시가스 공급회사에 신청해야 합니다. LPG·등유 사용 가구에 이 제도가 그대로 적용되지 않습니다.','지역 공급회사와 계약을 모르는 상태에서 할인액을 고정하지 않았습니다.'],apply:'지역 도시가스회사 또는 주민센터. 신분증과 가스 고객번호·고지서 준비 후 필요 서류 확인.',url:'https://www.bokjiro.go.kr/',sources:['gas','utility']},
 {id:'tv',name:'TV 수신료 면제',category:'요금 감면',kind:'가구 · 수신료',benefitTypes:['livelihood','medical'],period:'상시 신청',amount:'대상 가구의 TV 수신료 면제',target:'생계급여 또는 의료급여 수급자 중 수신료 면제 요건을 충족하는 가구.',conditions:['주거·교육급여만 받는다는 이유로 수신료 면제가 자동 적용되지는 않습니다.','TV 등록·청구 상태와 기존 면제 적용 여부를 확인합니다.'],apply:'KBS 수신료 상담 1588-1801 또는 주민센터에 면제 신청 문의.',url:'https://kbsagain.kbs.co.kr/goji/m.html',sources:['tv','utility']},
 {id:'didim',name:'디딤씨앗통장',category:'저축·생활',kind:'개인 · 조건부 매칭 적립',age:[0,17],period:'연중 신청 · 신규 가입은 만 18세 미만',amount:'본인 적립액의 2배를 정부가 매칭 · 정부지원 월 최대 100,000원',target:'만 18세 미만 기초생활수급 가구 아동. 본인 저축이 있어야 매칭됩니다.',conditions:['월 50,000원을 적립하면 그 달 정부지원 상한 100,000원에 도달합니다. 무조건 받는 월 용돈이 아닙니다.','만 18세 이후에는 학자금·취업훈련·주거 등 정해진 자립 용도로 인출하며, 만 24세 이후에는 용도 제한이 해제됩니다.','만 18세 생일이 가까우면 가입·매칭 가능한 기간을 주민센터에 확인하세요.'],apply:'주소지 주민센터에 신청. 신청서·적립 사용계획 등 제출서류와 남은 매칭 기간 확인.',url:'https://www.mohw.go.kr/menu.es?mid=a10711040800',sources:['didim','didimApply']},
 {id:'food',name:'농식품바우처',category:'저축·생활',kind:'가구 · 월 식품 이용권',benefitTypes:['livelihood'],start:'2025-12-22',end:'2026-12-11',period:'2025.12.22~2026.12.11',amount:'지원 가구원 수 기준 월 1인 40,000원 / 2인 65,000원 / 3인 83,000원 / 4인 100,000원',target:'생계급여 수급 가구 중 임산부·영유아·아동 또는 34세 이하 청년이 포함된 가구.',conditions:['주거·교육·의료급여만으로 대상이 되는 제도는 아닙니다.','영양플러스 이용자 등은 지원 가구원 산정에서 제외될 수 있습니다. 보장시설 수급자 등 제외 조건도 확인합니다.','국산 지정 농식품을 구매하는 가구 바우처입니다. 신청 전 달 지원액까지 소급 지급된다고 계산하지 않습니다.'],apply:'농식품바우처 누리집·1551-0857·주소지 주민센터. 기존 이용 가구는 자동 연계·자격 재확인 여부부터 확인.',url:'https://www.foodvoucher.go.kr/',sources:['food','foodAmount']},
 {id:'energy',name:'에너지바우처',category:'요금 감면',kind:'가구 · 2026년도 총액',start:'2026-06-15',end:'2026-12-31',pauses:[['2026-10-01','2026-10-02']],period:'2026.06.15~12.31 · 10.01~10.02 접수 중단',amount:'가구 총액 1인 295,200원 / 2인 407,500원 / 3인 532,700원 / 4인 이상 701,300원',target:'기초생활수급 가구이면서 노인·영유아·장애인·임산부·중증/희귀/중증난치질환자·한부모·소년소녀가정·다자녀 등 별도 가구원 특성 기준을 충족해야 합니다.',conditions:['고3 나이의 수급자라는 사실만으로는 별도 가구원 조건 충족이 확인되지 않습니다.','2026년 다자녀 기준은 부모와 19세 미만 자녀 2명 이상이 같은 세대에 있는 경우입니다. 다른 특성의 정확한 기준은 공식 안내를 확인하세요.','시설 수급·동절기 다른 연료지원과의 중복 제한이 있습니다. 12월 말에도 정산 관련 일부 접수 중단이 예정되어 있습니다.','표시액은 월 금액이 아닙니다. 사용기간은 2026.07.01~2027.05.31입니다.'],apply:'주민센터·복지로에서 가구원 특성 및 중복지원 여부 확인 후 신청.',url:'https://www.energyv.or.kr/info/support_info.do',sources:['energy']},
 {id:'youthId',name:'청소년증 무료 발급',category:'문화·생활',kind:'개인 · 신분증/이용 할인',age:[9,18],period:'상시 신청',amount:'발급 무료 · 등기 수령 시 우편료 별도',target:'9~18세 청소년. 재학 여부나 수급 종류와 관계없이 신청할 수 있습니다.',conditions:['학생증이 없는 학교 밖 청소년도 공적 신분증으로 쓸 수 있습니다.','교통·문화시설 할인은 각 운영기관의 나이·이용 조건에 따릅니다. 모든 시설의 할인율이 같지 않습니다.'],apply:'주소지와 관계없이 읍·면·동 주민센터에 사진 1매(3.5×4.5cm)와 신청서 제출. 대리신청 시 추가서류 확인.',url:'https://www.mogef.go.kr/sp/yth/sp_yth_f005.do',sources:['youthId']},
 {id:'sanitary',name:'여성청소년 생리용품 바우처',category:'건강·돌봄',kind:'개인 · 연간 용품 이용권',gender:'female',birthMin:2001,birthMax:2017,start:'2026-01-01',end:'2026-12-24',period:'2026.01~12.24',amount:'연 168,000원 · 2026년부터 신청 시기와 관계없이 연간 전액 1회 지원',target:'2001~2017년생 여성청소년 중 기초생활수급자·차상위·법정 한부모가족 지원 대상.',conditions:['여성청소년을 대상으로 하는 조건부 사업입니다.','국민행복카드 발급과 포인트 확인이 필요합니다. 사용기한과 카드 준비 일정은 신청처에서 확인하세요.','월 14,000원 기준을 남은 달 수에 곱해 지원액을 축소하지 않았습니다. 2026년 지급 방식이 바뀌었습니다.'],apply:'복지로 또는 주소지 주민센터에 본인·주양육자가 신청 → 국민행복카드 확인.',url:'https://www.bokjiro.go.kr/',sources:['sanitary','sanitaryApply']},
 {id:'seoul',name:'서울런',category:'학습·진학',kind:'개인 · 서울 지역 서비스',region:'서울',age:[6,24],period:'상시 회원가입 · 자격 확인 필요',amount:'온라인 학습 콘텐츠·멘토링·진로 지원',target:'서울 거주 6~24세 중 수급자 등 소득 기준 또는 학교 밖 청소년 등 대상 기준에 해당하는 사람.',conditions:['서울 거주 조건이 있습니다. 주소지가 확인되지 않아 전국 공통 혜택으로 계산하지 않습니다.','이용 콘텐츠·멘토 배정·진학 프로그램은 운영 조건과 모집 상황에 따릅니다.'],apply:'서울런 누리집에서 회원가입 및 대상자 확인.',url:'https://slearn.seoul.go.kr/',sources:['seoul']},
 {id:'youthPass',name:'청년문화예술패스 추가 발급',category:'문화·생활',kind:'개인 · 연간 이용권',birthMin:2006,birthMax:2007,start:'2026-08-10',end:'2026-11-30',period:'2026.08.10~11.30 · 예산 소진 시 조기 종료',amount:'수도권 150,000원 / 비수도권 200,000원',target:'대한민국 국적의 2006·2007년생 중 추가 발급 대상자.',conditions:['2008년생은 이 사업의 2026년 대상이 아닙니다. 고3 나이라는 표현만으로 출생연도를 단정하지 않았습니다.','2026년 1차 발급자 등은 추가 발급 대상에서 제외됩니다. 과거 수혜 이력·지역 잔여 인원은 신청 화면에서 확인해야 합니다.','사용기한은 2026년 12월 31일입니다. 문화누리카드와의 중복 가능 여부를 확인하지 않은 상태에서 합산하지 않습니다.'],apply:'청년문화예술패스 누리집에서 출생연도·국적·기발급 이력·지역 잔여 여부 확인 후 신청.',url:'https://www.youthculturepass.or.kr/',sources:['youthPass','youthPassTerms']}
];
export const benefitExclusions=[
 {name:'EBS 수능 무상교재',reason:'확인된 2026년 2학기 2차 신청은 8월 25일 18시에 마감. 현재 접수 목록에서 제외.',sources:['ebsClosed']},
 {name:'SKT EBS 데이터팩 신규 가입',reason:'요금지원 안내가 남아 있지만 상품 상단에 가입중단 표시. 신규 신청 가능 혜택에서 제외.',sources:['sktClosed']},
 {name:'정부양곡 할인',reason:'지자체별 접수일 확인이 필요. 확인한 양주시 안내는 매월 1~10일이며 오늘은 9월 23일. 거주지를 모르는 상태에서 현재 접수 중으로 표시하지 않음.',sources:['rice']},
 {name:'위기청소년 특별지원·지역 장학금·급식·교통비·스포츠강좌·상하수도/종량제봉투 감면',reason:'거주 시·군·구와 개별 사유·공고·예산을 확인해야 함. 전국의 현재 신청 가능 사업으로 검증 완료하지 못해 본 목록에 포함하지 않음.',sources:['special']},
 {name:'국민취업지원제도·국민내일배움카드',reason:'취업 의사·훈련 필요성·수급 종류를 확인하지 못해 후보 목록에서 보류. 국민취업지원제도는 진학 목적으로 재학·학원 수강 중인 사람 등에 참여 제한이 있고, 내일배움카드는 생계급여 수급자의 제외·예외 조건이 있음. 입시 준비 지원금으로 단정하지 않음.',sources:['work','training']},
 {name:'대학 국가장학금·교내장학금·정시 전형료 지원',reason:'현재 대학생 또는 해당 원서접수 시점의 별도 요건·공고가 필요. 모의고사 성적만으로 현시점 신청 가능한 장학금을 확정하지 않음.',sources:[]}
];
export function benefitsKstDate(now=new Date()) {return new Date(now.getTime()+9*60*60*1000).toISOString().slice(0,10);}
export function benefitWindow(b,today=benefitsKstDate()) {
 if(today<benefitsCheckedAt)return {code:'unverified',label:'검토일 이전 날짜'};
 if(today>'2026-12-31')return {code:'review',label:'2026 자료 · 재검토 필요'};
 if(b.start&&today<b.start)return {code:'future',label:'접수 전'};
 if(b.end&&today>b.end)return {code:b.deadlineConflict?'review':'closed',label:b.deadlineConflict?'마감 안내 재확인 필요':'공고상 신청기간 종료'};
 if(b.pauses?.some(([a,z])=>today>=a&&today<=z))return {code:'paused',label:'공고상 접수 중단일'};
 return {code:'open',label:b.deadlineConflict?'접수기간 중 · 마감 상충':b.end?'공고상 접수기간 중':'상시 신청 안내'};
}
export function benefitEligibility(b,p={}) {
 const unknown=[],mismatch=[];
 if(b.age){if(!Number.isInteger(p.age))unknown.push('만 나이');else if(p.age<b.age[0]||p.age>b.age[1])mismatch.push(`대상 만 나이 ${b.age[0]}~${b.age[1]}세`);}
 if(b.birthMin||b.birthMax){if(!Number.isInteger(p.birthYear))unknown.push('출생연도');else if(p.birthYear<(b.birthMin??0)||p.birthYear>(b.birthMax??9999))mismatch.push('출생연도 조건 불일치');}
 if(b.region){if(!p.region)unknown.push('거주 지역');else if(p.region!==b.region)mismatch.push(`${b.region} 거주 조건`);}
 if(b.gender){if(!p.gender)unknown.push('대상 성별');else if(p.gender!==b.gender)mismatch.push('대상 성별 조건 불일치');}
 if(b.benefitTypes){if(!p.types?.length)unknown.push('수급 급여 종류');else if(!b.benefitTypes.some(t=>p.types.includes(t)))mismatch.push('수급 급여 종류 조건 불일치');}
 return {code:mismatch.length?'mismatch':'check',label:mismatch.length?'입력 조건과 불일치':unknown.length?`${unknown.join('·')} 확인 필요`:'개별 요건 확인 후 신청',unknown,mismatch};
}
export function selectBenefits(p={},filters={},today=benefitsKstDate()) {
 return benefits.map(b=>({...b,window:benefitWindow(b,today),eligibility:benefitEligibility(b,p)}))
 .filter(b=>b.window.code==='open'&&b.eligibility.code!=='mismatch')
 .filter(b=>!filters.category||b.category===filters.category)
 .filter(b=>!filters.query||[b.name,b.target,b.amount,b.category,...b.conditions].join(' ').includes(filters.query.trim()))
 .sort((a,b)=>(Number(Boolean(b.recommend))-Number(Boolean(a.recommend)))||(a.end??'9999').localeCompare(b.end??'9999'));
}
