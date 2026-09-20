/* Spatial continuity without intercepting links or altering browser history. */
(()=>{
 let active=null,serial=0;const reduced=()=>document.documentElement.dataset.motion==='off'||matchMedia('(prefers-reduced-motion:reduce)').matches;
 const veil=document.createElement('div');veil.className='transit-field';veil.setAttribute('aria-hidden','true');veil.innerHTML='<i></i><i></i><i></i><span>RESEARCH READY / EXPLORING</span>';document.body.append(veil);
 window.rrhNavigate=render=>{
 const ticket=++serial;active?.skipTransition?.();
 const update=()=>{render();document.querySelector('#main').focus({preventScroll:true})};
 if(reduced()){update();return}
 if(document.startViewTransition){active=document.startViewTransition(update);active.ready.catch(()=>{});active.updateCallbackDone.catch(()=>{});active.finished.catch(()=>{}).finally(()=>{if(ticket===serial)active=null})}else{update();document.querySelector('#main').animate([{opacity:.25,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:500,easing:'cubic-bezier(.16,1,.3,1)'})}
 veil.getAnimations().forEach(a=>a.cancel());veil.animate([{opacity:0,transform:'scale(.88)'},{opacity:.8,offset:.3},{opacity:0,transform:'scale(1.3)'}],{duration:650,easing:'cubic-bezier(.3,0,.2,1)'});
 };
 const descriptions={academy:['Research academy','Learn the process, one milestone at a time.','Choose a lesson. Read the concept, compare an example, write your own draft, and check your understanding.'],toolkit:['Research toolkit','Choose a tool for the task ahead.','Open a resource guide to see when to use it, what it contains, and how to download an editable copy.'],seminars:['Guided workshops','Give one research task your full attention.','Choose a self-guided session. Each workshop has a timed agenda, linked activities, and a clear next step.']};
 function enrich(){const page=document.body.dataset.page,head=document.querySelector('.page-heading');if(head){let copy=descriptions[page];if(page==='notebook'){const view=location.hash.split('/')[1]||'notes';copy={notes:['Idea notebook','Capture a thought. Keep the context.','Save research observations and questions. Connect each note to a milestone so you can find it again.'],draft:['Proposal studio','Bring your research plan together.','Review the writing saved from your nine lesson exercises. Return to a lesson to develop any unfinished section.'],readiness:['Readiness review','Check the details before sharing.','Review each part of your proposal. Use these checks to prepare for feedback; they do not replace supervisor approval.']}[view]}if(copy){head.querySelector('.eyebrow').textContent=copy[0];head.querySelector('h1').textContent=copy[1];head.querySelector('div>p:not(.eyebrow)').textContent=copy[2]}
 const art=document.createElement('div');art.className='destination-art';art.setAttribute('aria-hidden','true');art.innerHTML='<i></i><i></i><i></i><span>'+({academy:'01',journey:'02',toolkit:'03',notebook:'04',seminars:'05',resource:'06',workshop:'07'}[page]||'')+'</span>';head.append(art);const scene=document.createElement('div');scene.className='destination-scene';scene.setAttribute('aria-hidden','true');scene.dataset.scene=String(({academy:0,journey:1,toolkit:4,notebook:3,seminars:2,resource:4,workshop:2})[page]??0);head.append(scene);art.style.display='none';window.startUniverse?.()}
 if(page==='academy'||page==='toolkit'||page==='seminars'){const target=document.querySelector('.page-body');target?.insertAdjacentHTML('afterbegin','<div class="destination-caption"><span>'+({academy:'LEARN → EXAMPLE → WRITE → CHECK',toolkit:'SELECT → PREVIEW → DOWNLOAD',seminars:'PREPARE → EXPLORE → REFLECT'}[page])+'</span><span>YOUR RESEARCH ENVIRONMENT</span></div>')}
 }
 addEventListener('rrh:route',enrich);enrich();
})();

