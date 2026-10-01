/* Semantic enhancements only: keep existing data, validation and event handlers. */
(()=>{
 'use strict';
 let resize,queued=false;
 function enhance(){
  queued=false;resize?.disconnect();
  const main=document.querySelector('#main');if(!main)return;
  const status=main.querySelector('#note-status');if(status){status.setAttribute('role','status');status.setAttribute('aria-live','polite')}
  const tables=[...main.querySelectorAll('.evidence-table-wrap,.wb-synthesis-table-wrap')];
  const size=()=>tables.forEach((wrap,i)=>{const scrolling=wrap.scrollWidth>wrap.clientWidth+2;if(scrolling){wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',wrap.querySelector('caption')?.textContent||'Research table '+(i+1))}else{wrap.removeAttribute('tabindex');wrap.removeAttribute('role');wrap.removeAttribute('aria-label')}});
  resize=new ResizeObserver(size);tables.forEach(wrap=>resize.observe(wrap));size();
 }
 document.addEventListener('invalid',e=>{if(e.target.closest('#main'))e.target.setAttribute('aria-invalid','true')},true);
 document.addEventListener('input',e=>{if(e.target.hasAttribute('aria-invalid')&&e.target.validity?.valid)e.target.removeAttribute('aria-invalid')});
 addEventListener('rrh:route',enhance);addEventListener('rei:research-render',enhance);
 new MutationObserver(records=>{if(!queued&&records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1))){queued=true;queueMicrotask(enhance)}}).observe(document.querySelector('#main'),{childList:true,subtree:true});
 enhance();
})();
