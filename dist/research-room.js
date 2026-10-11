/* Working-room motion never touches editor text or moves a focused control. */
(()=>{
 let animations=[],observer;
 const compactRooms=matchMedia('(max-width:900px)');
 compactRooms.addEventListener('change',()=>{const menu=document.querySelector('.research-room-menu');if(menu)menu.open=!compactRooms.matches});
 const motion=()=>document.documentElement.dataset.input!=='keyboard'&&document.documentElement.dataset.motion!=='off'&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
 function finish(){observer?.disconnect();animations.forEach(a=>a.cancel());animations=[]}
 function enhance(){finish();const host=document.querySelector('.research-shell');if(!host)return;
  const rail=host.querySelector('.research-rail'),active=rail?.querySelector('[aria-current=page]');
  if(active){const title=host.querySelector('.research-section-label h2');if(title){title.id='research-room-title';host.querySelector('.research-content')?.setAttribute('aria-labelledby',title.id)}}
  if(!motion())return;
  const title=host.querySelector('.research-section-label');if(title)animations.push(title.animate([{opacity:.7},{opacity:1}],{duration:160,easing:'cubic-bezier(.16,1,.3,1)'}));
 }
 addEventListener('rei:research-render',enhance);addEventListener('rrh:route',finish);addEventListener('rrh:motion',()=>{if(!motion())finish()});
 document.addEventListener('toggle',ev=>{const el=ev.target;if(!el.matches?.('.research-shell details')||!el.open||!motion())return;const child=el.querySelector('form');if(child&&!child.contains(document.activeElement))animations.push(child.animate([{opacity:.8},{opacity:1}],{duration:150,easing:'ease-out'}))},true);
 enhance();
})();
