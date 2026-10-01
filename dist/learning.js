/* Editorial identity and cancellable entrance sequences for the learning rooms. */
(()=>{
 const rooms={academy:['01 / Academy','Nine lessons. One connected practice.'],journey:['02 / Journey','Follow your curiosity. Keep your progress.'],toolkit:['03 / Toolkit','Instruments for better thinking.'],seminars:['04 / Workshops','A focused session. A tangible outcome.'],lesson:['Academy / Reading room','Learn · Example · Write · Check'],resource:['Toolkit / Resource guide','Adapt it to your research.'],workshop:['Workshops / Session guide','Your next hour, with intention.']};
 let observer,animations=[];
 const enabled=()=>document.documentElement.dataset.motion!=='off'&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
 function mount(){
  observer?.disconnect();animations.forEach(a=>a.cancel());animations=[];
  const room=rooms[document.body.dataset.page];document.body.classList.toggle('learning-room',!!room);if(!room)return;
  const main=document.querySelector('#main'),container=main.querySelector('.container');if(container&&!container.querySelector('.learning-edition')){
   const edition=document.createElement('div');edition.className='learning-edition';const label=document.createElement('span');label.textContent=room[0];const link=document.createElement('a');link.href=document.body.dataset.page==='academy'?'#journey':'#academy';link.textContent=document.body.dataset.page==='academy'?'Explore your journey ↗':'Return to academy ↗';edition.append(label,link);container.prepend(edition);
  }
  if(!enabled())return;
  observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;observer.unobserve(target);animations.push(target.animate([{opacity:.25,transform:'translateY(24px)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)'}))}),{threshold:.08});
  main.querySelectorAll('.detail-guide').forEach(el=>observer.observe(el));
 }
 addEventListener('rrh:route',mount);addEventListener('rrh:motion',()=>{if(!enabled()){observer?.disconnect();animations.forEach(a=>a.cancel());animations=[]}});mount();
})();
