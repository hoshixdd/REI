/* Working-room motion never touches editor text or moves a focused control. */
(()=>{
 let animations=[],observer;
 const compactRooms=matchMedia('(max-width:900px)');
 compactRooms.addEventListener('change',()=>{const menu=document.querySelector('.research-room-menu');if(menu)menu.open=!compactRooms.matches});
 const motion=()=>document.documentElement.dataset.motion!=='off'&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
 function finish(){observer?.disconnect();animations.forEach(a=>a.cancel());animations=[]}
 function enhance(){finish();const host=document.querySelector('.research-shell');if(!host)return;
  const rail=host.querySelector('.research-rail'),active=rail?.querySelector('[aria-current=page]');
  if(active){const title=host.querySelector('.research-section-label h2');if(title){title.id='research-room-title';host.querySelector('.research-content')?.setAttribute('aria-labelledby',title.id)}}
  if(!motion())return;
  if(rail)animations.push(rail.animate([{opacity:.35,transform:'translateX(-12px)'},{opacity:1,transform:'none'}],{duration:430,easing:'cubic-bezier(.16,1,.3,1)'}));
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;observer.unobserve(entry.target);animations.push(entry.target.animate([{opacity:.35,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:550,easing:'cubic-bezier(.16,1,.3,1)'}))}),{threshold:.05});
  host.querySelectorAll('.research-heading,.research-project-heading,.research-section-label,.project-row,.research-empty,.wb-section').forEach(el=>observer.observe(el));
 }
 addEventListener('rei:research-render',enhance);addEventListener('rrh:route',finish);addEventListener('rrh:motion',()=>{if(!motion())finish()});
 document.addEventListener('toggle',ev=>{const el=ev.target;if(!el.matches?.('.research-shell details')||!el.open||!motion())return;const child=el.querySelector('form');if(child)animations.push(child.animate([{opacity:.2,transform:'translateY(-8px)'},{opacity:1,transform:'none'}],{duration:250,easing:'ease-out'}))},true);
 enhance();
})();
