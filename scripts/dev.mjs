// 로컬에서 눈으로 보는 개발 서버. 서버 구현은 scripts/serve.mjs 하나뿐이다 —
// 여기서만 '0.0.0.0' 으로 열어 같은 네트워크의 폰에서도 열리게 한다.
import { serve } from './serve.mjs';

const dev = serve(process.cwd(), Number(process.env.PORT || 4173), '0.0.0.0');
await dev.ready;
console.log(dev.url);
