/* Bounded optical navigation motion. Reading and repeated keyboard actions stay steady. */
(()=>{
 const enabled=()=>document.documentElement.dataset.motion!=='off'&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
 const menu=document.querySelector('#space-navigator');let keyboard=false,menuAnimation=null;
 document.addEventListener('keydown',()=>keyboard=true,true);document.addEventListener('pointerdown',()=>keyboard=false,true);
 new MutationObserver(()=>{menuAnimation?.cancel();if(menu.open&&enabled()&&!keyboard)menuAnimation=menu.querySelector('.space-grid').animate([{opacity:.65,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:220,easing:'cubic-bezier(.16,1,.3,1)'})}).observe(menu,{attributes:true,attributeFilter:['open']});
 let frame=0;const update=()=>{frame=0;const hero=document.querySelector('.dream-hero');if(!hero)return;const p=enabled()?Math.min(1,Math.max(0,scrollY/hero.offsetHeight)):0;hero.style.setProperty('--hero-scroll',p)};
 const queue=()=>{if(!frame)frame=requestAnimationFrame(update)};addEventListener('scroll',queue,{passive:true});addEventListener('rrh:route',queue);addEventListener('rrh:motion',()=>{if(!enabled())menuAnimation?.finish();queue()});queue();
})();
