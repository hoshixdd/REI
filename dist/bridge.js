/* Carry a lesson or note into a studio project, and search across local research records. */
(()=>{
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&','<':'<','>':'>','"':'"',"'":'&#39;'}[c]));
 function db(){return new Promise((resolve,reject)=>{const r=indexedDB.open('rei-research',1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('projects'))r.result.createObjectStore('projects',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
 function all(database){return new Promise((resolve,reject)=>{const tx=database.transaction('projects','readonly'),q=tx.objectStore('projects').getAll();q.onsuccess=()=>resolve(q.result||[]);q.onerror=()=>reject(q.error)})}
 async function createProject(title,question,proposal){
  const database=await db();
  try{
   const rows=await all(database);
   if(rows.length>=5){toast('The five-project limit has been reached.');return}
   const project={id:crypto.randomUUID(),title:title.slice(0,300),question:(question||'').slice(0,2000),papers:[],evidence:[],edges:[],proposal:(proposal||'').slice(0,200000),template:'blank',updated:new Date().toISOString()};
   await new Promise((resolve,reject)=>{const tx=database.transaction('projects','readwrite');tx.objectStore('projects').put(project);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});
   location.hash='research/'+project.id+'/proposal';
  }finally{database.close()}
 }
 function lessonText(i){const draft=state.drafts?.[i];return typeof draft==='string'?draft.trim():''}
 function paintLesson(){
  if(document.body.dataset.page!=='lesson'||document.querySelector('[data-open-studio="lesson"]'))return;
  const parts=location.hash.split('/'),i=Number(parts[1]),step=parts[2]||'learn';
  if(!Number.isInteger(i)||(step!=='write'&&step!=='check'))return;
  const host=document.querySelector('.lesson-tools')||document.querySelector('.lesson-flow');
  if(!host)return;
  const btn=document.createElement('button');
  btn.type='button';btn.className='button secondary studio-bridge';btn.dataset.openStudio='lesson';btn.dataset.lesson=String(i);
  btn.textContent=lessonText(i)?'Continue this draft in the studio':'Start a studio project from this lesson';
  host.after(btn);
 }
 function paintNotes(){
  document.querySelectorAll('.note').forEach(article=>{
   const edit=article.querySelector('[data-edit]');
   if(!edit||article.querySelector('[data-open-studio="note"]'))return;
   const btn=document.createElement('button');
   btn.type='button';btn.className='text-button';btn.dataset.openStudio='note';btn.dataset.noteId=edit.dataset.edit;
   btn.textContent='Open in studio';
   edit.before(btn);
  });
  if(!location.hash.startsWith('#notebook/draft')||document.querySelector('[data-open-studio="drafts"]'))return;
  const host=document.querySelector('.page-body')||document.querySelector('.draft-paper');
  if(!host)return;
  const btn=document.createElement('button');
  btn.type='button';btn.className='button secondary studio-bridge';btn.dataset.openStudio='drafts';
  btn.textContent='Start a studio project from these drafts';
  host.prepend(btn);
 }
 function snippet(text,q){
  const raw=String(text||'').replace(/\s+/g,' ').trim();
  if(!raw)return '';
  const i=raw.toLowerCase().indexOf(q.toLowerCase());
  if(i<0)return esc(raw.slice(0,140));
  const start=Math.max(0,i-36),end=Math.min(raw.length,i+q.length+72);
  return (start?'…':'')+esc(raw.slice(start,i))+'<mark>'+esc(raw.slice(i,i+q.length))+'</mark>'+esc(raw.slice(i+q.length,end))+(end<raw.length?'…':'');
 }
 async function indexRecords(){
  const out=[];
  const database=await db();
  try{
   for(const p of await all(database)){
    const base='#research/'+encodeURIComponent(p.id)+'/';
    const add=(href,kind,title,body)=>out.push({href,kind,project:p.title||'Untitled project',title:title||'Untitled',body:String(body||'')});
    add(base+'library','Project',p.title,p.question);
    add(base+'proposal','Proposal',p.title,p.proposal);
    for(const x of p.papers||[])add(base+'library','Paper',x.title,[x.authors,x.abstract,x.notes,x.doi,x.venue].filter(Boolean).join(' '));
    for(const x of p.evidence||[])add(base+'evidence','Passage',x.quote||x.findings||'Evidence',[x.quote,x.findings,x.purpose,x.limitations,x.relevance,x.locator].filter(Boolean).join(' '));
    const w=p.workbench||{};
    for(const x of w.claims||[])add(base+'claims','Claim',x.text,x.status);
    for(const x of w.decisions||[])add(base+'review','Decision',x.text,x.date);
    for(const x of w.codes||[])add(base+'synthesis','Theme',x.label,x.definition);
    for(const x of w.coding||[])add(base+'synthesis','Coding memo',x.note,'');
   }
  }finally{database.close()}
  try{
   const saved=JSON.parse(localStorage.getItem('rrh-v2')||'{}');
   for(const n of saved.notes||[])out.push({href:'#notebook',kind:'Notebook',project:'Workspace',title:n.title,body:n.body||''});
   for(const [i,d] of Object.entries(saved.drafts||{}))if(typeof d==='string'&&d.trim())out.push({href:'#lesson/'+i+'/write',kind:'Lesson draft',project:'Academy',title:course[+i]?.title||'Lesson draft',body:d});
  }catch{}
  return out;
 }
 async function paintSearch(){
  const shell=document.querySelector('.research-shell');
  if(!shell||shell.querySelector('.studio-search')||shell.querySelector('.research-loading'))return;
  if(!shell.querySelector('.research-heading,.research-project-heading'))return;
  const box=document.createElement('section');
  box.className='studio-search';
  box.innerHTML='<label>Search papers, passages, claims, and notes<input type="search" placeholder="A finding, a DOI, a sentence from your proposal…" autocomplete="off"></label><p class="empty" hidden>Nothing in your local projects or notes matches that.</p><ol class="studio-results" hidden></ol>';
  shell.prepend(box);
  const input=box.querySelector('input'),list=box.querySelector('.studio-results'),empty=box.querySelector('.empty');
  let rows=null,timer=0;
  input.addEventListener('input',()=>{
   clearTimeout(timer);
   timer=setTimeout(async()=>{
    const q=input.value.trim();
    if(q.length<2){list.hidden=true;list.innerHTML='';empty.hidden=true;return}
    try{rows=rows||await indexRecords()}catch{empty.hidden=false;empty.textContent='Local research storage could not be read.';return}
    const hits=rows.filter(r=>(r.title+' '+r.body+' '+r.project).toLowerCase().includes(q.toLowerCase())).slice(0,14);
    empty.hidden=hits.length>0;
    list.hidden=hits.length===0;
    list.innerHTML=hits.map(r=>'<li><a href="'+esc(r.href)+'"><span class="kind">'+esc(r.kind)+'</span><span><strong>'+esc(r.title)+'</strong><p>'+esc(r.project)+' · '+snippet(r.body||r.title,q)+'</p></span></a></li>').join('');
   },120);
  });
 }
 function paint(){paintLesson();paintNotes();paintSearch()}
 addEventListener('rrh:route',()=>{let n=0;const tick=()=>{paint();if(++n<50)setTimeout(tick,60)};tick()});
 paint();
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-open-studio]');if(!b)return;
  try{
   if(b.dataset.openStudio==='lesson'){
    const i=Number(b.dataset.lesson),draft=lessonText(i),title=course[i]?.title||'Research project';
    const question=(draft.split('\n').find(line=>line.trim())||stages[i]?.[3]||title).slice(0,500);
    if(!confirm('Create a studio project from “'+title+'”? Your lesson draft stays where it is. The project starts with that writing in the proposal.'))return;
    await createProject(title,question,draft?draft:'Started from Academy lesson '+(i+1)+': '+title+'.\n\n'+(stages[i]?.[3]||''));
   }else if(b.dataset.openStudio==='note'){
    const note=state.notes.find(n=>n.id===b.dataset.noteId);if(!note)return;
    if(!confirm('Create a studio project from “'+note.title+'”? The notebook entry stays unchanged.'))return;
    await createProject(note.title,(note.body.split('\n').find(line=>line.trim())||note.title).slice(0,500),note.body);
   }else if(b.dataset.openStudio==='drafts'){
    const drafts=Object.entries(state.drafts||{}).filter(([,v])=>typeof v==='string'&&v.trim());
    if(!drafts.length){toast('Write in a lesson first. Empty drafts are not copied.');return}
    if(!confirm('Create one studio project from your saved lesson drafts? The original drafts stay in the Academy.'))return;
    const body=drafts.map(([k,v])=>'## '+(course[+k]?.title||('Lesson '+(Number(k)+1)))+'\n\n'+v.trim()).join('\n\n');
    const first=drafts[0][1].split('\n').find(line=>line.trim())||'Lesson drafts';
    await createProject('Lesson drafts',first.slice(0,500),body);
   }
  }catch{toast('Could not create the project. Check that browser storage is available.')}
 });
})();
