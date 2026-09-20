/* Shared motion choreography with a single user preference and route cleanup. */
(() => {
  const root=document.documentElement, reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches;try{if(!reduced.matches)paused=localStorage.getItem('rrh-motion')==='off'}catch{}
  const toggle=document.createElement('button');toggle.className='motion-toggle';toggle.type='button';document.body.append(toggle);
  const running=new Set();let revealObserver=null,mutation=null,pointerRaf=0;
  function animate(el,frames,options){if(paused)return;const a=el.animate(frames,options);running.add(a);a.finished.catch(()=>{}).finally(()=>running.delete(a));return a}
  function sync(){root.dataset.motion=paused?'off':'on';toggle.innerHTML=icon(paused?'play':'pause')+'<span>Motion '+(paused?'off':'on')+'</span>';toggle.setAttribute('aria-label',paused?'Turn on motion':'Pause all motion');toggle.setAttribute('aria-pressed',String(paused));const local=document.querySelector('#motion');if(local){local.innerHTML=icon(paused?'play':'pause');local.setAttribute('aria-label',paused?'Resume animation':'Pause animation');local.setAttribute('aria-pressed',String(paused))}if(paused){running.forEach(a=>a.finish());document.querySelectorAll('[data-tilt]').forEach(el=>el.style.transform='')}window.dispatchEvent(new Event('rrh:motion'))}
  function switchMotion(){paused=!paused;try{localStorage.setItem('rrh-motion',paused?'off':'on')}catch{}sync()}
  toggle.onclick=switchMotion;reduced.addEventListener('change',e=>{paused=e.matches;sync()});
  window.rrhBeforeRoute=()=>{revealObserver?.disconnect();mutation?.disconnect();running.forEach(a=>a.cancel());running.clear()};
  function reveal(el,index){if(el.dataset.revealed)return;if(root.dataset.transit&&el.getBoundingClientRect().top<innerHeight){el.dataset.revealed='true';return;}el.dataset.revealed='true';animate(el,[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,delay:Math.min(index%4*70,210),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})}
  function setup(){sync();const main=document.querySelector('#main');const local=document.querySelector('#motion');if(local)local.onclick=switchMotion;
    const intro=main.querySelector('.observatory-intro,.hero-copy,.page-heading,.lesson-title');if(intro&&!paused&&!root.dataset.transit){[...intro.children].filter(el=>!el.classList.contains('lesson-visual')&&!el.classList.contains('heading-grid')).forEach((el,i)=>animate(el,[{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'none'}],{duration:850,delay:i*75,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}))}
    revealObserver=new IntersectionObserver(entries=>{entries.forEach((entry,i)=>{if(entry.isIntersecting){reveal(entry.target,i);revealObserver.unobserve(entry.target)}})},{threshold:.06});
    main.querySelectorAll('.pathway-tile,.workspace-mosaic>a,.academy-list>a,.final-portal,.phase-card,.lesson-card,.resource-card,.roadmap-column,.workshop,.mini-tool,.section-top,.curriculum-preview,.closing,.lesson-content,.exercise,.editor,.draft-paper,.check-group,.reading-link').forEach((el)=>revealObserver.observe(el));
    main.querySelectorAll('.phase-card,.resource-card').forEach(el=>el.dataset.tilt='true');
    mutation=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes){if(node.nodeType!==1)continue;if(node.matches('.lesson-card,.resource-card,.note,.quiz-feedback'))reveal(node,0)}});mutation.observe(main,{subtree:true,childList:true});
  }
  document.addEventListener('pointermove',e=>{if(paused||e.pointerType!=='mouse')return;const card=e.target.closest('.phase-card,.lesson-card,.resource-card,.roadmap-column');if(!card)return;cancelAnimationFrame(pointerRaf);pointerRaf=requestAnimationFrame(()=>{if(!card.isConnected)return;const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;card.style.setProperty('--mx',x+'px');card.style.setProperty('--my',y+'px');if(card.dataset.tilt)card.style.transform=`perspective(1000px) rotateX(${-(y/r.height-.5)*4}deg) rotateY(${(x/r.width-.5)*4}deg) translateY(-3px)`})},{passive:true});
  document.addEventListener('pointerout',e=>{const card=e.target.closest('[data-tilt]');if(card&&!card.contains(e.relatedTarget)){cancelAnimationFrame(pointerRaf);card.style.transform=''}},{passive:true});
  let scrollRaf=0;addEventListener('scroll',()=>{if(scrollRaf)return;scrollRaf=requestAnimationFrame(()=>{scrollRaf=0;const h=document.documentElement.scrollHeight-innerHeight;root.style.setProperty('--reading',h>0?scrollY/h:0)})},{passive:true});
  window.addEventListener('rrh:route',()=>{root.style.setProperty('--reading',0);setup()});setup();
})();

