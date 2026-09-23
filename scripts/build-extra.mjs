// The password/profile come only from the invocation environment; they are never written to source.
import { readFile, writeFile } from 'node:fs/promises';
import { randomBytes, webcrypto } from 'node:crypto';
import { pathToFileURL } from 'node:url';
const iterations=600000;
export async function seal(text,password) {
 const salt=randomBytes(24),iv=randomBytes(12),bytes=new TextEncoder();
 const material=await webcrypto.subtle.importKey('raw',bytes.encode(password.normalize('NFC')),'PBKDF2',false,['deriveKey']);
 const key=await webcrypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations},material,{name:'AES-GCM',length:256},false,['encrypt']);
 const data=await webcrypto.subtle.encrypt({name:'AES-GCM',iv},key,bytes.encode(text));
 return {version:1,iterations,salt:salt.toString('base64'),iv:iv.toString('base64'),data:Buffer.from(data).toString('base64')};
}
export async function open(payload,password){
 const material=await webcrypto.subtle.importKey('raw',new TextEncoder().encode(password.normalize('NFC')),'PBKDF2',false,['deriveKey']);
 const key=await webcrypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:Buffer.from(payload.salt,'base64'),iterations:payload.iterations},material,{name:'AES-GCM',length:256},false,['decrypt']);
 return new TextDecoder().decode(await webcrypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(payload.iv,'base64')},key,Buffer.from(payload.data,'base64')));
}
export async function bundle(){
 const parts=await Promise.all(['admissions','conversions','departments','benefits','benefits-ui','app'].map(name=>readFile(new URL(`../source/extra/${name}.mjs`,import.meta.url),'utf8')));
 return parts.map(part=>part.replace(/^import .*;\n/gm,'').replace(/^export /gm,'')).join('\n');
}
async function main(){
 const password=process.env.RADAR_EXTRA_PASSWORD;
 if(!password)throw new Error('RADAR_EXTRA_PASSWORD is required. Do not put the password in source.');
 const profile=process.env.RADAR_EXTRA_PROFILE?JSON.parse(process.env.RADAR_EXTRA_PROFILE):{};
 for(const [key,value]of Object.entries(profile))if(!['k','m','t1','t2','e','h'].includes(key)||!Number.isInteger(value)||value<(['e','h'].includes(key)?1:0)||value>(['e','h'].includes(key)?9:100))throw new Error('Invalid profile');
 const code=`(()=>{${await bundle()}\nconst defaults=${JSON.stringify(profile)};return {mount:(root,host)=>mount(root,host,defaults),reset};})()`;
 // Parse before publishing. Running the factory creates no DOM or network effects.
 Function('return '+code)();
 const payload=await seal(code,password);
 if(await open(payload,password)!==code)throw new Error('Encryption round-trip failed');
 await writeFile(new URL('../assets/extra.payload.json',import.meta.url),JSON.stringify(payload)+'\n');
 console.log('Encrypted additional feature built; password and profile excluded from source.');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
