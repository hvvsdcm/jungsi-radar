// Generic, neutral entry point. No password, private score, or feature-specific copy is public here.
(() => {
 'use strict';
 let unlocked=null,activeRoot=null,generation=0;
 const cls='seed-action-button seed-action-button--variant_neutralWeak seed-action-button--size_medium seed-action-button--layout_withText seed-action-button--size_medium-layout_withText';
 const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
 async function unlock(password) {
  if(!crypto.subtle)throw new Error('HTTPS 환경에서 다시 열어 주세요.');
  const response=await fetch(new URL('assets/extra.payload.json',document.baseURI),{cache:'no-store'});
  if(!response.ok)throw new Error('추가 기능 파일을 불러오지 못했습니다.');
  const payload=await response.json();
  if(payload.version!==1||payload.iterations!==600000)throw new Error('지원하지 않는 파일 형식입니다.');
  const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password.normalize('NFC')),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:decode(payload.salt),iterations:payload.iterations},material,{name:'AES-GCM',length:256},false,['decrypt']);
  let plain;
  try{plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(payload.iv)},key,decode(payload.data));}
  catch {throw new Error('비밀번호가 맞지 않습니다.');}
  const code=new TextDecoder().decode(plain);
  return Function('"use strict"; return '+code)();
 }
 function lock() {generation++;unlocked?.reset?.();unlocked=null; if(activeRoot?.isConnected)draw(activeRoot,activeRoot._host);}
 function draw(root,host) {
  activeRoot=root;root._host=host;
  if(unlocked){unlocked.mount(root,{...host,lock});return;}
  root.innerHTML=`<div class="rx-lock"><h2>추가 기능</h2><p class="jr-muted">비밀번호를 입력하면 열립니다.</p><form><label class="rx-field"><span>비밀번호</span><span class="seed-text-input__root seed-text-input__root--variant_outline seed-text-input__root--variant_outline-size_medium"><input class="seed-text-input__value seed-text-input__value--variant_outline-size_medium" name="password" aria-label="추가 기능 비밀번호" type="text" inputmode="text" lang="ko" required maxlength="64" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-describedby="rx-password-help"></span></label><div class="rx-toolbar"><button class="${cls}" type="submit">열기</button><button class="${cls}" type="button" data-show aria-label="비밀번호 표시" aria-pressed="true">가리기</button></div><p id="rx-password-help" class="jr-muted">한글 입력을 위해 입력 내용이 표시됩니다. 입력 후 가리기를 누를 수 있어요.</p><p role="alert" class="jr-muted"></p></form></div>`;
  const form=root.querySelector('form'),input=form.elements.password,submit=form.querySelector('[type="submit"]'),error=form.querySelector('[role="alert"]');
  root.querySelector('[data-show]').addEventListener('click',e=>{const show=input.type==='password';input.type=show?'text':'password';e.currentTarget.setAttribute('aria-pressed',String(show));e.currentTarget.textContent=show?'가리기':'표시';});
  let composing=false;
  input.addEventListener('compositionstart',()=>{composing=true;});
  input.addEventListener('compositionend',()=>{composing=false;});
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.isComposing||composing||e.keyCode===229))e.preventDefault();});
  form.addEventListener('submit',async e=>{
   e.preventDefault();if(composing||submit.disabled)return;
   const ticket=generation;let password=input.value;input.value='';submit.disabled=true;submit.textContent='확인 중';error.textContent='';
   try{const app=await unlock(password);password='';if(ticket!==generation||!root.isConnected)return;unlocked=app;draw(root,host);}
   catch(e){if(root.isConnected){error.textContent=e.message;submit.disabled=false;submit.textContent='열기';input.focus();}}
   finally{password='';}
  });
 }
 globalThis.JR_EXTRA={panel(host){const root=document.createElement('div');root.id='jr-extra';draw(root,host);return root;},lock};
 window.addEventListener('pagehide',lock);
})();
