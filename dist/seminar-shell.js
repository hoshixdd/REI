/* One journey, with a way back from every lesson, editor and research tool. */
(()=>{
 const S=window.REISeminar;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const continuation=()=>S.resume()==='#learn'?'#library/question':S.resume();
 function setup(){
  const hash=location.hash,home=!!document.querySelector('.dream-home'),main=document.querySelector('#main'),stage=S.stageFor(hash),work=/^#(?:workbook|notebook|guided)/.test(hash);
  const markup=S.sections.map(([id,label])=>`<a href="#${id}" ${(work?id==='workbook':id==='home/journey')?'aria-current="page"':''}>${label}</a>`).join('');
  document.querySelector('#navigation').innerHTML=markup;const header=document.querySelector('.header-notebook');header.href='#workbook';header.innerHTML='My work <span id="note-count" hidden>0</span>';
  document.querySelectorAll('.library-nav,.path-tabs,.seminar-nav').forEach(n=>{n.innerHTML=markup;n.setAttribute('aria-label','Your research journey')});
  if(!home&&main&&!main.querySelector('.flow-context')){
   const i=S.flow.indexOf(stage),next=S.flow[i+1],path=stage?'#home/'+stage.id:'#home/journey';
   main.insertAdjacentHTML('afterbegin',`<nav class="flow-context" aria-label="Your place in the research journey"><a href="${path}">← Back to the journey</a><span>${stage?`${i+1} / 7 · ${esc(stage.short)}`:work?'Your study, in progress':'Keep the thread'}</span><a href="${work?'#home/journey':'#workbook'}">${work?'Choose a next step':'My work'} ↗</a></nav>`);
   if(stage){const host=main.querySelector('.library-lesson,.lesson-main,.seminar-page,.library-page,.path-page');if(host&&/^#learn\//.test(hash)){host.insertAdjacentHTML('beforeend',`<section class="flow-bridge"><h2>Keep the thread going.</h2><p>Your writing above stays in My work. When you are ready, use it in the next research decision.</p><div class="flow-actions">${next?`<a class="path-button" href="${next.lesson}">Next: ${esc(next.short)}</a>`:'<a class="path-button" href="#workbook">Review my work</a>'}<a href="#home/${stage.id}">Return to this place in the journey</a></div></section>`);}else if(host&&(!/^#(?:research|library|create)/.test(hash)||hash==='#library/ethics'))host.insertAdjacentHTML('beforeend',S.bridge(stage));if(host&&/^#create\//.test(hash))host.insertAdjacentHTML('beforeend',`<section class="flow-bridge"><h2>Bring it back to your study.</h2><p>Use the save controls above to keep the result in a project, or develop your own reasoning in the workbook.</p><div class="flow-actions"><a href="${stage.write}">Write it into my study ↗</a><a href="#home/${stage.id}">Return to this place in the journey</a></div></section>`);}
  }
  if(stage&&/^#(?:library|lesson)\//.test(hash)){
   const use=main.querySelector('.lesson-use');if(use)use.innerHTML=`<h2>Make the next move.</h2><p>${esc(stage.action)}</p><div class="flow-actions"><a class="path-button" href="${stage.tool}">${esc(stage.toolLabel)}</a><a href="${stage.write}">Write it into my study ↗</a></div>`;
   if(!window.REILessonDepth&&!main.querySelector('.flow-local-recall')){const heading=main.querySelector('.library-lesson>header,.lesson-main>.lesson-title');if(heading)heading.insertAdjacentHTML('afterend',`<details class="flow-local-recall"><summary>Remember the idea in a local setting</summary><p>${esc(stage.idea)}</p><p><strong>Fictional example:</strong> ${esc(stage.example)}</p></details>`);}
  }
  document.querySelectorAll('a[href="#learn"]').forEach(a=>{a.href='#home/journey';if(/All short lessons|Learning library/.test(a.textContent))a.textContent='Return to the journey'});
  main?.querySelectorAll('a[href="#create"]').forEach(a=>{a.href='#home/resources';a.textContent='References and tools ↗'});
  if(/^#learn\//.test(hash)&&stage){const marker=main.querySelector('.path-current-step');if(marker)marker.textContent='Your '+stage.short.toLowerCase()+' notes';const trail=main.querySelector('.path-breadcrumb');if(trail)trail.innerHTML='<a href="#home/'+stage.id+'">'+esc(stage.short)+'</a><span>Your study notes</span>';const chooser=main.querySelector('.path-step-selector summary');if(chooser)chooser.textContent='Choose another writing prompt';}
  const dialog=document.querySelector('#space-navigator');if(dialog){
   const heading=dialog.querySelector('#space-title');heading.textContent='Where is your study taking you?';
   dialog.querySelector('.path-menu-primary').innerHTML='<section class="flow-menu-journey"><h3>The journey</h3>'+S.flow.map((s,i)=>`<a href="${s.lesson}"><span>${i+1}</span><strong>${esc(s.short)}</strong></a>`).join('')+'</section><section><h3>Keep working</h3><a href="'+continuation()+'"><strong>Continue where you left off</strong></a><a href="#workbook"><strong>My work and downloads</strong></a><a href="#research"><strong>Research projects</strong></a><a href="#chapters"><strong>Chapters 1–4</strong></a></section>';
   dialog.querySelectorAll('.path-menu-tools').forEach(x=>x.hidden=true);dialog.querySelector('.space-grid').innerHTML='';
  }
  if(home){
   const cta=main.querySelector('.dream-cta');if(cta){cta.href=continuation();cta.textContent=S.resume()==='#learn'?'Begin with a question':'Continue my study';}
   const intro=main.querySelector('.dream-intro');if(intro&&!intro.querySelector('.home-backup'))intro.insertAdjacentHTML('beforeend','<p class="home-backup"><a href="#home/journey">See the whole journey</a> · <a href="#backup">Download my work</a><br>Clearing browser data can remove your work. Keep a downloaded copy.</p>');
   const guides=main.querySelector('[data-flow-guides]');if(guides&&typeof course!=='undefined')guides.innerHTML=course.map((c,i)=>`<p><a href="#lesson/${i}">${esc(c.title)}</a></p>`).join('');
   const target=hash.split('/')[1],id=target==='journey'?'flow-journey':target==='resources'?'flow-resources':S.flow.some(s=>s.id===target)?'flow-'+target:null;
   if(target==='resources'){const refs=main.querySelector('.home-reference-summary');if(refs)refs.open=true;}if(id)requestAnimationFrame(()=>{const el=document.getElementById(id);if(el?.isConnected){el.scrollIntoView({block:'start',behavior:'instant'});el.tabIndex=-1;el.focus({preventScroll:true})}});
  }else if(stage||work||hash==='#research'){try{localStorage.setItem('rei-last-study-route',hash)}catch{}}
  if(stage&&hash===stage.lesson)window.REILessonDepth?.mount(stage.id);
 }
 addEventListener('rrh:route',setup);addEventListener('rei:flow-location',()=>{setup();if(location.hash==='#home'||location.hash==='#home/')window.scrollTo({top:0,behavior:'instant'})});setup();
})();
