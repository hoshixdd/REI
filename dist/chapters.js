/* The scroll changes the sentence. The pages share one strip of milestones. */
(()=>{
 const lines=[
  ['Find your starting point.','Turn the things you notice into a question worth exploring.','Explore foundations','#lesson/0'],
  ['See the connections.','Bring sources together. Discover what is known and what is still missing.','Explore discovery','#lesson/3'],
  ['Shape what comes next.','Connect your question, evidence, and methods in a proposal with purpose.','Explore creation','#lesson/6']
 ];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&','<':'<','>':'>','"':'"',"'":'&#39;'}[c]));
 let shown=-1;

 function paint(phase){
  const copy=lines[phase];if(!copy)return;
  document.body.dataset.light=String(phase);
  const h1=document.querySelector('.observatory-intro h1');
  const p=document.querySelector('.observatory-intro .intro-bottom p');
  const cta=document.querySelector('.observatory-intro .button');
  if(h1&&h1.textContent!==copy[0])h1.textContent=copy[0];
  if(p)p.textContent=copy[1];
  if(cta){
   const icon=cta.querySelector('svg');
   cta.href=copy[3];
   cta.textContent=copy[2]+' ';
   if(icon)cta.append(icon);
  }
 }

 function stageHome(){
  const obs=document.querySelector('.observatory');
  if(obs&&!obs.dataset.chaptered){
   obs.dataset.chaptered='1';
   const follow=document.createElement('section');
   follow.className='chapter-follow container';
   const story=document.createElement('div');
   story.className='scroll-story';
   obs.replaceWith(story);
   story.append(obs);
   story.after(follow);
   const entry=obs.querySelector('.research-entry');
   const dock=obs.querySelector('.journey-dock');
   if(entry)follow.append(entry);
   if(dock)follow.append(dock);
  }
  const guide=document.querySelector('.scroll-story .study-guide, .observatory .study-guide');
  const follow=document.querySelector('.chapter-follow');
  if(guide&&follow&&!follow.contains(guide))follow.prepend(guide);
  if(shown<0){shown=0;paint(0)}
 }

 function strip(current){
  const node=document.createElement('nav');
  node.className='filmstrip';
  node.setAttribute('aria-label','Nine milestones');
  node.innerHTML=course.map((c,i)=>`<a href="#lesson/${i}" class="${state.completed.includes(i)?'done':''}${i===current?' here':''}" ${i===current?'aria-current="true"':''}><span>0${i+1}</span><strong>${esc(c.title)}</strong><small>${esc(phases[c.phase].label)}</small></a>`).join('');
  const here=node.querySelector('.here');
  if(here)node.scrollLeft=Math.max(0,here.offsetLeft-8);
  return node;
 }

 function stageJourney(){
  const head=document.querySelector('.page-heading');
  if(!head||document.querySelector('.filmstrip'))return;
  const next=course.findIndex((_,i)=>!state.completed.includes(i));
  head.after(strip(next<0?0:next));
 }

 function stageAcademy(){
  const head=document.querySelector('.page-heading');
  if(!head||document.querySelector('.filmstrip'))return;
  const next=course.findIndex((_,i)=>!state.completed.includes(i));
  head.after(strip(next<0?0:next));
 }
 function dockChrome(){
  const header=document.querySelector('.site-header');
  const hub=document.querySelector('.explore-trigger');
  const motion=document.querySelector('.motion-toggle');
  const note=header?.querySelector('.header-notebook');
  if(!header||!hub||!motion||header.contains(hub))return;
  if(note)note.before(hub,motion);else header.append(hub,motion);
 }
 function stageLesson(){
  const layout=document.querySelector('.lesson-layout');
  if(!layout||document.querySelector('.filmstrip'))return;
  const i=Number(location.hash.split('/')[1]);
  if(!Number.isInteger(i))return;
  layout.before(strip(i));
 }

 function stageStudio(){
  const shell=document.querySelector('.research-shell');
  const head=shell?.querySelector('.research-heading, .research-project-heading');
  if(head&&shell.firstElementChild!==head)shell.prepend(head);
  const project=document.querySelector('.research-project-heading');
  if(!project||project.dataset.chaptered)return;
  const h1=project.querySelector('h1');
  const q=[...project.querySelectorAll(':scope > p')].find(p=>!p.classList.contains('research-progress'));
  if(!h1||!q||!q.textContent.trim())return;
  project.dataset.chaptered='1';
  const name=h1.textContent;
  h1.textContent=q.textContent;
  q.textContent=name;
  q.classList.add('chapter-name');
 }

 function boot(){
  const page=document.body.dataset.page;
  dockChrome();
  if(page!=='home'){shown=-1;document.body.removeAttribute('data-light')}
  if(page==='home')stageHome();
  else if(page==='journey')stageJourney();
  else if(page==='lesson')stageLesson();
  else if(page==='academy')stageAcademy();
  else if(page==='research')stageStudio();
 }

 let queued=false;
 function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;boot()})}
 addEventListener('rrh:phase',e=>{if(document.body.dataset.page==='home')paint(e.detail.phase)});
 addEventListener('scroll',()=>{
  const story=document.querySelector('.scroll-story');
  if(!story||matchMedia('(max-width:900px),(prefers-reduced-motion: reduce)').matches)return;
  const total=story.offsetHeight-innerHeight;if(total<=0)return;
  const passed=Math.min(1,Math.max(0,-story.getBoundingClientRect().top/total));
  const phase=passed<.34?0:passed<.67?1:2;
  if(phase===shown)return;
  shown=phase;
  document.querySelector(`[data-atlas="${phase}"]`)?.click();
  paint(phase);
 },{passive:true});
 new MutationObserver(schedule).observe(document.getElementById('main'),{childList:true,subtree:true});
 if(document.body.dataset.page)boot();
 dockChrome();
})();
