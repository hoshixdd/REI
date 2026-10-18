/* Undo only the failed mutation; preserve edits made while its write was pending. */
(()=>{
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function rollback(target,before,attempted){
  for(const key of new Set([...Object.keys(before),...Object.keys(attempted)])){
   const old=before[key],next=attempted[key],live=target[key];
   if(same(old,next))continue;
   if(same(live,next)){if(key in before)target[key]=structuredClone(old);else delete target[key];continue}
   if(Array.isArray(old)&&Array.isArray(next)&&Array.isArray(live)&&[...old,...next,...live].every(x=>x&&typeof x.id==='string')){
    for(const item of next){const prior=old.find(x=>x.id===item.id),index=live.findIndex(x=>x.id===item.id);if(!prior){if(index>=0&&same(live[index],item))live.splice(index,1)}else if(index>=0)rollback(live[index],prior,item)}
    for(let i=0;i<old.length;i++)if(!next.some(x=>x.id===old[i].id)&&!live.some(x=>x.id===old[i].id))live.splice(Math.min(i,live.length),0,structuredClone(old[i]));
   }else if(old&&next&&live&&typeof old==='object'&&typeof next==='object'&&typeof live==='object'&&!Array.isArray(old))rollback(live,old,next);
  }
 }
 window.REISavePolicy={rollback};
})();
