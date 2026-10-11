/* One motion preference; feedback without repeated reading or editing entrances. */
(()=>{
 const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion:reduce)');let paused=reduced.matches;
 try{if(!reduced.matches)paused=localStorage.getItem('rrh-motion')==='off'}catch{}
 const toggle=document.createElement('button');toggle.className='motion-toggle';toggle.type='button';document.body.append(toggle);
 const running=new Set();let pointerFrame=0,scrollFrame=0;
 function sync(){root.dataset.motion=paused?'off':'on';toggle.innerHTML=icon(paused?'play':'pause')+'<span>Motion '+(paused?'off':'on')+'</span>';toggle.setAttribute('aria-label',paused?'Turn on motion':'Pause all motion');toggle.setAttribute('aria-pressed',String(paused));const local=document.querySelector('#motion');if(local){local.innerHTML=icon(paused?'play':'pause');local.setAttribute('aria-label',paused?'Resume animation':'Pause animation');local.setAttribute('aria-pressed',String(paused));local.onclick=switchMotion}if(paused){running.forEach(a=>a.finish());document.querySelectorAll('[data-tilt]').forEach(el=>el.style.transform='')}dispatchEvent(new Event('rrh:motion'))}
 function switchMotion(){paused=!paused;try{localStorage.setItem('rrh-motion',paused?'off':'on')}catch{}sync()}
 toggle.onclick=switchMotion;reduced.addEventListener('change',e=>{paused=e.matches;sync()});
 window.rrhBeforeRoute=()=>{running.forEach(a=>a.cancel());running.clear();cancelAnimationFrame(pointerFrame)};
 document.addEventListener('pointermove',e=>{if(paused||e.pointerType!=='mouse'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;const el=e.target.closest('.lesson-card,.resource-card,.phase-card,.project-row,.dream-space-row,.space-grid>a');if(!el)return;cancelAnimationFrame(pointerFrame);pointerFrame=requestAnimationFrame(()=>{if(!el.isConnected)return;const r=el.getBoundingClientRect();el.style.setProperty('--surface-x',(e.clientX-r.left)+'px');el.style.setProperty('--surface-y',(e.clientY-r.top)+'px')})},{passive:true});
 document.addEventListener('submit',e=>{if(paused||root.dataset.input==='keyboard'||!e.isTrusted||e.submitter===null)return;const button=e.submitter||e.target.querySelector('button[type=submit]');if(!button)return;const a=button.animate([{opacity:.7},{opacity:1}],{duration:140});running.add(a);a.finished.catch(()=>{}).finally(()=>running.delete(a))});
 addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;const range=root.scrollHeight-innerHeight;root.style.setProperty('--reading',range>0?scrollY/range:0)})},{passive:true});
 addEventListener('rrh:route',()=>{root.style.setProperty('--reading',0);sync()});sync();
})();
