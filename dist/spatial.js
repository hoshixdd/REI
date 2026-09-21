/* Spatial continuity without intercepting links or altering browser history. */
(()=>{
 const root=document.documentElement;
 let active=null,serial=0,pending=null,lastHash=location.hash,tagged=[],fallbackAnimation=null;
 const reduced=()=>root.dataset.motion==='off'||matchMedia('(prefers-reduced-motion:reduce)').matches;
 const veil=document.createElement('div');veil.className='transit-field';veil.setAttribute('aria-hidden','true');veil.innerHTML='<svg viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true"><path d="M-100 350C180 20 340 620 610 310S1000 100 1300 350"/><path d="M-100 370C180 60 340 640 610 330S1000 120 1300 370"/><path d="M-100 330C180 0 340 600 610 290S1000 80 1300 330"/></svg>';document.body.append(veil);
 const clearNames=()=>{tagged.forEach(el=>el.style.removeProperty('view-transition-name'));tagged=[]};
 const name=(el,value)=>{if(el){el.style.viewTransitionName=value;tagged.push(el)}};
 const stepIndex=hash=>['learn','example','write','check'].indexOf(hash.split('/')[2]||'learn');
 const titleOf=el=>el?.querySelector('h1,h2,h3');
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank')return;
  const url=new URL(link.href,location.href);if(url.origin!==location.origin||url.pathname!==location.pathname||!url.hash||url.hash===location.hash||url.hash==='#main')return;
  const rect=link.getBoundingClientRect();const card=link.closest('.pathway-tile,.lesson-card,.resource-card,.project-row,.workspace-mosaic>a,.academy-list>a,.roadmap-step');
  pending={hash:url.hash,element:card||null,x:event.detail?event.clientX:rect.left+rect.width/2,y:event.detail?event.clientY:rect.top+rect.height/2,time:performance.now()};
 },true);
 window.rrhNavigate=render=>{
  const ticket=++serial;active?.skipTransition?.();fallbackAnimation?.cancel();clearNames();veil.getAnimations().forEach(a=>a.cancel());
  const nextHash=location.hash,from=lastHash.split('/'),to=nextHash.split('/');
  const clicked=pending&&pending.hash===nextHash&&performance.now()-pending.time<2000?pending:null;pending=null;
  const lessonStep=from[0]==='#lesson'&&to[0]==='#lesson'&&from[1]===to[1];
  const projectStep=from[0]==='#research'&&to[0]==='#research'&&from[1]&&from[1]===to[1];
  const isStep=lessonStep||projectStep;
  const order=['library','map','evidence','proposal'];
  const direction=lessonStep?Math.sign(stepIndex(nextHash)-stepIndex(lastHash)):projectStep?Math.sign(order.indexOf(to[2])-order.indexOf(from[2])):1;
  root.dataset.transit=isStep?'chapter':clicked?.element?'card':'portal';
  root.style.setProperty('--travel',String(direction<0?-1:1));
  root.style.setProperty('--entry-x',Math.max(0,Math.min(innerWidth,clicked?.x??innerWidth*.5))+'px');
  root.style.setProperty('--entry-y',Math.max(0,Math.min(innerHeight,clicked?.y??innerHeight*.4))+'px');
  lastHash=nextHash;
  const update=async()=>{await render();if(!reduced())await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));if(ticket!==serial)return;
   if(!reduced()&&document.startViewTransition){if(isStep){name(document.querySelector('.lesson-title,.research-project-heading'),'research-heading');name(document.querySelector('.lesson-flow,.research-tabs'),'research-chapters')}
   else if(clicked?.element){const target=document.querySelector('.lesson-title,.page-heading,.research-project-heading,.research-heading');name(target,'research-surface');name(titleOf(target),'research-title');if(clicked.element.querySelector('.phase-art'))name(target?.querySelector('.sculpture'),'research-field')}}
   document.querySelector('#main').focus({preventScroll:true});
  };
  if(reduced()){update();delete root.dataset.transit;return}
  if(isStep){name(document.querySelector('.lesson-title,.research-project-heading'),'research-heading');name(document.querySelector('.lesson-flow,.research-tabs'),'research-chapters')}
  else if(clicked?.element?.isConnected){name(clicked.element,'research-surface');name(titleOf(clicked.element),'research-title');name(clicked.element.querySelector('.phase-art'),'research-field')}
  if(document.startViewTransition){
   active=document.startViewTransition(update);active.ready.catch(()=>{});active.updateCallbackDone.catch(()=>{});active.finished.catch(()=>{}).finally(()=>{if(ticket===serial){active=null;clearNames();delete root.dataset.transit}});
  }else{
   update().then(()=>{if(ticket!==serial||reduced())return;fallbackAnimation=document.querySelector('#main').animate([{opacity:0,transform:isStep?`translateX(${direction*32}px)`:'translateY(22px) scale(.99)'},{opacity:1,transform:'none'}],{duration:isStep?360:520,easing:'cubic-bezier(.16,1,.3,1)'});fallbackAnimation.finished.catch(()=>{}).finally(()=>{if(ticket===serial){clearNames();delete root.dataset.transit}})});
  }
  if(!isStep)veil.animate([{opacity:0,transform:'scale(.9)'},{opacity:.45,offset:.35},{opacity:0,transform:'scale(1.15)'}],{duration:700,easing:'cubic-bezier(.16,1,.3,1)'});
 };
 addEventListener('rrh:motion',()=>{if(reduced()){active?.skipTransition?.();fallbackAnimation?.cancel();veil.getAnimations().forEach(a=>a.cancel());clearNames();delete root.dataset.transit}});
 const descriptions={academy:['Research academy','Learn the process, one milestone at a time.','Choose a lesson. Read the concept, compare an example, write your own draft, and check your understanding.'],toolkit:['Research toolkit','Choose a tool for the task ahead.','Open a resource guide to see when to use it, what it contains, and how to download an editable copy.'],seminars:['Guided workshops','Give one research task your full attention.','Choose a self-guided session. Each workshop has a timed agenda, linked activities, and a clear next step.']};
 function enrich(){const page=document.body.dataset.page,head=document.querySelector('.page-heading');if(head){let copy=descriptions[page];if(page==='notebook'){const view=location.hash.split('/')[1]||'notes';copy={notes:['Idea notebook','Capture a thought. Keep the context.','Save research observations and questions. Connect each note to a milestone so you can find it again.'],draft:['Proposal studio','Bring your research plan together.','Review the writing saved from your nine lesson exercises. Return to a lesson to develop any unfinished section.'],readiness:['Readiness review','Check the details before sharing.','Review each part of your proposal. Use these checks to prepare for feedback; they do not replace supervisor approval.']}[view]}if(copy){head.querySelector('.eyebrow').textContent=copy[0];head.querySelector('h1').textContent=copy[1];head.querySelector('div>p:not(.eyebrow)').textContent=copy[2]}
 const art=document.createElement('div');art.className='destination-art';art.setAttribute('aria-hidden','true');art.innerHTML='<i></i><i></i><i></i><span>'+({academy:'01',journey:'02',toolkit:'03',notebook:'04',seminars:'05',resource:'06',workshop:'07'}[page]||'')+'</span>';head.append(art);const scene=document.createElement('div');scene.className='destination-scene';scene.setAttribute('aria-hidden','true');scene.dataset.scene=String(({academy:0,journey:1,toolkit:4,notebook:3,seminars:2,resource:4,workshop:2})[page]??0);head.append(scene);art.style.display='none';window.startUniverse?.()}
 if(page==='academy'||page==='toolkit'||page==='seminars'){const target=document.querySelector('.page-body');target?.insertAdjacentHTML('afterbegin','<div class="destination-caption"><span>'+({academy:'LEARN → EXAMPLE → WRITE → CHECK',toolkit:'SELECT → PREVIEW → DOWNLOAD',seminars:'PREPARE → EXPLORE → REFLECT'}[page])+'</span><span>YOUR RESEARCH ENVIRONMENT</span></div>')}
 }
 addEventListener('rrh:route',enrich);enrich();
})();

