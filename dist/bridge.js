/* One study: lessons write into the open project, and each page says what to do next. */
(()=>{
 const KEY='rei-active-project';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&','<':'<','>':'>','"':'"',"'":'&#39;'}[c]));
 const destinations=[
  {tab:'library',blurb:'Uses your topic statement as the working question, unless the project already has one. The statement is also kept in the proposal.'},
  {tab:'proposal',blurb:'Adds the problem statement to the proposal. It does not change the research question.'},
  {tab:'review',blurb:'Records the database, the exact query, and your notes in the search log.'},
  {tab:'claims',blurb:'Saves the synthesis as a tentative claim. You still choose which evidence supports it.'},
  {tab:'review',blurb:'Records the gap as a decision you can revisit before a supervisor meeting.'},
  {tab:'library',blurb:'Updates the working research question. The previous question is kept in the project history.'},
  {tab:'design',blurb:'Adds the objective to the research design. Measures and methods stay empty until you write them.'},
  {tab:'design',blurb:'Writes this plan into collection, analysis, ethics, and feasibility on the research design.'},
  {tab:'proposal',blurb:'Updates the proposal with this draft. Sections saved from earlier lessons stay in place.'}
 ];
 function db(){return new Promise((resolve,reject)=>{const r=indexedDB.open('rei-research',1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('projects'))r.result.createObjectStore('projects',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
 function all(database){return new Promise((resolve,reject)=>{const tx=database.transaction('projects','readonly'),q=tx.objectStore('projects').getAll();q.onsuccess=()=>resolve(q.result||[]);q.onerror=()=>reject(q.error)})}
 function put(database,project){project.updated=new Date().toISOString();return new Promise((resolve,reject)=>{const tx=database.transaction('projects','readwrite');tx.objectStore('projects').put(project);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})}
 async function load(){const database=await db();try{return await all(database)}finally{database.close()}}
 async function save(project){const database=await db();try{await put(database,project)}finally{database.close()}}
 function remember(id){try{localStorage.setItem(KEY,id)}catch{}}
 function remembered(){try{return localStorage.getItem(KEY)||''}catch{return ''}}
 function lessonText(i){const draft=state.drafts?.[i];return typeof draft==='string'?draft.trim():''}
 function firstLine(text){return String(text||'').split('\n').map(s=>s.trim()).find(Boolean)||''}
 function lines(text){return String(text||'').split('\n').map(s=>s.trim()).filter(Boolean)}
 function grab(text,re){const rows=lines(text);const i=rows.findIndex(l=>re.test(l));if(i<0)return '';const same=rows[i].replace(re,'').replace(/^[:\-\s]+/,'').trim();return same||rows[i+1]||''}
 function generatedTitle(title){return !title||title==='Lesson drafts'||title==='Research project'||course.some(c=>c.title===title)}
 function stamp(){return new Date().toISOString().slice(0,10)}
 function workbench(project){return window.REICore.normalize(project)}
 function history(project,reason){const w=workbench(project);w.snapshots.unshift({id:crypto.randomUUID(),date:new Date().toISOString(),question:project.question||'',proposal:project.proposal||'',reason});w.snapshots=w.snapshots.slice(0,20)}
 function sectionHeading(i){return '## '+(i+1)+'. '+course[i].title}
 function upsertProposal(project,i,text){const block=sectionHeading(i)+'\n\n'+text.trim();const re=new RegExp('## '+(i+1)+'\\. [\\s\\S]*?(?=\\n## \\d+\\. |$)');project.proposal=re.test(project.proposal||'')?(project.proposal||'').replace(re,block+'\n\n'):((project.proposal||'').trim()+'\n\n'+block).trim()}
 function upsert(list,origin,blank){let row=list.find(x=>x.origin===origin);if(!row){row={...blank,id:crypto.randomUUID(),origin};list.push(row)}return row}
 function designRow(project){const w=workbench(project);return upsert(w.design,'lesson:design',{objective:'',measure:'',population:'',sample:'',collection:'',analysis:'',ethics:'',feasibility:'',output:'',rationale:''})}
 function applyLesson(project,i,text){
  workbench(project);
  if(i===0){const line=firstLine(text).slice(0,2000);if(!project.question.trim()&&line)project.question=line;if(generatedTitle(project.title)&&line)project.title=line.slice(0,180);upsertProposal(project,i,text)}
  else if(i===1||i===4||i===8){upsertProposal(project,i,text);if(i===4){const row=upsert(workbench(project).decisions,'lesson:4',{date:stamp(),text:''});row.date=stamp();row.text=text.slice(0,4000)}}
  else if(i===2){const bits={query:(grab(text,/search query/i)||lines(text).find(l=>/\b(AND|OR)\b|"/.test(l))||firstLine(text)||'Query not separated from the notes').slice(0,500),database:(grab(text,/database/i)||'Not recorded').slice(0,200)};const row=upsert(workbench(project).searches,'lesson:2',{query:'',database:'',date:stamp(),notes:''});row.query=bits.query;row.database=bits.database;row.date=stamp();row.notes=text.slice(0,8000)}
  else if(i===3){const row=upsert(workbench(project).claims,'lesson:3',{text:'',status:'Tentative',links:[]});row.text=text.slice(0,4000);if(!Array.isArray(row.links))row.links=[];if(!['Tentative','Working','Reviewed'].includes(row.status))row.status='Tentative'}
  else if(i===5){const line=firstLine(text).slice(0,2000);if(line&&line!==project.question){history(project,'Before lesson 6 updated the question');project.question=line}upsertProposal(project,i,text)}
  else if(i===6){const row=designRow(project);row.objective=firstLine(text).slice(0,2000);row.rationale=text.slice(0,20000)}
  else if(i===7){const row=designRow(project);if(!row.objective.trim())row.objective=firstLine(text).slice(0,2000);row.collection=(grab(text,/collection procedure/i)||grab(text,/design and rationale/i)||row.collection||'').slice(0,4000);row.analysis=(grab(text,/analysis approach/i)||grab(text,/analysis/i)||row.analysis||'').slice(0,4000);row.ethics=(grab(text,/consent, privacy/i)||grab(text,/ethics/i)||row.ethics||'').slice(0,4000);row.feasibility=(grab(text,/limitations and feasibility/i)||grab(text,/feasibility/i)||row.feasibility||'').slice(0,4000);row.rationale=text.slice(0,20000)}
  return destinations[i].tab;
 }
 function blankProject(title){return {id:crypto.randomUUID(),title:(title||'Research project').slice(0,300),question:'',papers:[],evidence:[],edges:[],proposal:'',template:'blank',updated:new Date().toISOString(),workbench:{version:1}}}
 function pick(projects,select){const id=select?.value||remembered();return projects.find(p=>p.id===id)||projects.find(p=>p.id===remembered())||projects[0]||null}
 function nextStep(projects){
  const project=projects.find(p=>p.id===remembered())||projects[0]||null;
  if(!project)return {href:'#lesson/0/write',title:'Write the topic before you collect sources',detail:'Name the people, the setting, and what you want to understand. Saving the lesson starts the project.',meta:'No project yet'};
  const w=project.workbench||{},id=encodeURIComponent(project.id),meta=project.title;
  if(!project.question.trim())return {href:'#lesson/0/write',title:'The project still needs a question',detail:'Open the topic lesson or the question lesson and save it. A method is not useful until the question is specific.',meta};
  if(!(w.searches||[]).length)return {href:'#lesson/2/write',title:'Record how you will search',detail:'Write the database and the exact query. Saving the lesson puts them in the search log, so the search can be repeated.',meta};
  if(!project.papers.length)return {href:'#research/'+id+'/library',title:'Add the first source',detail:'Evidence, claims, and the literature map all start from a paper in the library. Add one you have actually opened.',meta};
  if(!(w.design||[]).some(d=>d.collection&&d.analysis))return {href:'#lesson/7/write',title:'Write the method against the question',detail:'Say what you will collect, how you will analyze it, and how consent and access work. Saving the lesson fills the research design.',meta};
  if(!project.proposal.trim())return {href:'#lesson/8/write',title:'Assemble the proposal',detail:'Bring the problem, the question, and the method into one argument. Earlier lessons stay attached to their own sections.',meta};
  return {href:'#research/'+id+'/review',title:'Check what you still cannot explain',detail:'Review lists missing evidence, ethics, and alignment. It does not score the project or approve it.',meta};
 }
 function guide(slot,title,detail,extra){
  const node=document.createElement('aside');
  node.className='study-guide';node.dataset.slot=slot;
  node.innerHTML='<p class="eyebrow">'+esc(extra.kicker||'WHAT TO DO NEXT')+'</p><h2>'+esc(title)+'</h2><p>'+esc(detail)+'</p>'+(extra.html||'');
  return node;
 }
 function projectOptions(projects,selected){
  const options=['<option value="new">Start a new project</option>'].concat(projects.map(p=>'<option value="'+esc(p.id)+'"'+(p.id===selected?' selected':'')+'>'+esc(p.title||'Untitled project')+'</option>'));
  return options.join('');
 }
 function paintNext(projects){
  const page=document.body.dataset.page;
  if(page!=='home'||document.querySelector('.study-guide[data-slot="next"]'))return;
  const next=nextStep(projects);
  const node=guide('next',next.title,next.detail,{html:'<div class="row"><a class="button primary" href="'+esc(next.href)+'">Continue</a><span>'+esc(next.meta)+'</span></div>'});
  if(page==='home')document.querySelector('.intro-bottom')?.after(node);
  else document.querySelector('.page-body')?.prepend(node);
 }
 function paintLesson(projects){
  if(document.body.dataset.page!=='lesson')return;
  const parts=location.hash.split('/'),i=Number(parts[1]),step=parts[2]||'learn';
  if(!Number.isInteger(i)||i<0||i>8)return;
  const host=document.querySelector('.lesson-flow');if(!host||document.querySelector('.study-guide[data-slot="lesson"]'))return;
  const dest=destinations[i],selected=remembered();
  const controls=(step==='write'||step==='check')?'<div class="row"><label>Project<select data-project-choice>'+projectOptions(projects,selected)+'</select></label><button type="button" class="button primary" data-save-lesson="'+i+'">'+(lessonText(i)?'Save this lesson into the project':'Write the exercise, then save it')+'</button><a class="text-link" data-project-open href="'+(selected?'#research/'+encodeURIComponent(selected)+'/'+dest.tab:'#research')+'">Open that part of the studio</a></div>':'';
  host.after(guide('lesson',course[i].title,dest.blurb,{kicker:'WHERE THIS LESSON GOES',html:controls}));
  const select=document.querySelector('[data-project-choice]');
  const open=document.querySelector('[data-project-open]');
  if(select&&projects.some(p=>p.id===selected))select.value=selected;
  else if(select&&projects.length===1)select.value=projects[0].id;
  select?.addEventListener('change',()=>{if(!open)return;const id=select.value;open.href=id==='new'?'#research':'#research/'+encodeURIComponent(id)+'/'+dest.tab});
 }
 function paintNotes(){
  document.querySelectorAll('.note').forEach(article=>{
   const edit=article.querySelector('[data-edit]');
   if(!edit||article.querySelector('[data-save-note]'))return;
   const btn=document.createElement('button');
   btn.type='button';btn.className='text-button';btn.dataset.saveNote=edit.dataset.edit;btn.textContent='Add to the project';
   edit.before(btn);
  });
  if(!location.hash.startsWith('#notebook/draft')||document.querySelector('[data-save-drafts]'))return;
  const host=document.querySelector('.page-body');if(!host)return;
  const btn=document.createElement('button');
  btn.type='button';btn.className='button primary studio-bridge';btn.dataset.saveDrafts='1';btn.textContent='File these drafts in the project';
  host.prepend(btn);
 }
 function snippet(text,q){
  const raw=String(text||'').replace(/\s+/g,' ').trim();if(!raw)return '';
  const at=raw.toLowerCase().indexOf(q.toLowerCase());if(at<0)return esc(raw.slice(0,140));
  const start=Math.max(0,at-36),end=Math.min(raw.length,at+q.length+72);
  return (start?'…':'')+esc(raw.slice(start,at))+'<mark>'+esc(raw.slice(at,at+q.length))+'</mark>'+esc(raw.slice(at+q.length,end))+(end<raw.length?'…':'');
 }
 async function indexRecords(){
  const out=[],projects=await load();
  for(const p of projects){
   const base='#research/'+encodeURIComponent(p.id)+'/',add=(href,kind,title,body)=>out.push({href,kind,project:p.title||'Untitled project',title:title||'Untitled',body:String(body||'')});
   add(base+'library','Project',p.title,p.question);add(base+'proposal','Proposal',p.title,p.proposal);
   for(const x of p.papers||[])add(base+'library','Paper',x.title,[x.authors,x.abstract,x.notes,x.doi,x.venue].filter(Boolean).join(' '));
   for(const x of p.evidence||[])add(base+'evidence','Passage',x.quote||x.findings||'Evidence',[x.quote,x.findings,x.purpose,x.limitations,x.relevance,x.locator].filter(Boolean).join(' '));
   const w=p.workbench||{};
   for(const x of w.claims||[])add(base+'claims','Claim',x.text,x.status);
   for(const x of w.decisions||[])add(base+'review','Decision',x.text,x.date);
   for(const x of w.searches||[])add(base+'review','Search log',x.query,[x.database,x.notes].join(' '));
   for(const x of w.codes||[])add(base+'synthesis','Theme',x.label,x.definition);
   for(const x of w.design||[])add(base+'design','Research design',x.objective,[x.collection,x.analysis,x.ethics,x.rationale].join(' '));
  }
  try{const saved=JSON.parse(localStorage.getItem('rrh-v2')||'{}');for(const n of saved.notes||[])out.push({href:'#notebook',kind:'Notebook',project:'Workspace',title:n.title,body:n.body||''});for(const [i,d] of Object.entries(saved.drafts||{}))if(typeof d==='string'&&d.trim())out.push({href:'#lesson/'+i+'/write',kind:'Lesson draft',project:'Academy',title:course[+i]?.title||'Lesson draft',body:d})}catch{}
  return out;
 }
 function paintSearch(){
  const shell=document.querySelector('.research-shell');
  if(!shell||shell.querySelector('.studio-search')||shell.querySelector('.research-loading'))return;
  if(!shell.querySelector('.research-heading,.research-project-heading'))return;
  const box=document.createElement('section');
  box.className='studio-search';
  box.innerHTML='<label>Search papers, passages, claims, and notes<input type="search" placeholder="A finding, a DOI, a sentence from your proposal…" autocomplete="off"></label><p class="empty" hidden>Nothing in your local projects or notes matches that.</p><ol class="studio-results" hidden></ol>';
  shell.prepend(box);
  const input=box.querySelector('input'),list=box.querySelector('.studio-results'),empty=box.querySelector('.empty');
  let rows=null,timer=0;
  input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(async()=>{const q=input.value.trim();if(q.length<2){list.hidden=true;list.innerHTML='';empty.hidden=true;return}try{rows=rows||await indexRecords()}catch{empty.hidden=false;empty.textContent='Local research storage could not be read.';return}const hits=rows.filter(r=>(r.title+' '+r.body+' '+r.project).toLowerCase().includes(q.toLowerCase())).slice(0,14);empty.hidden=hits.length>0;list.hidden=!hits.length;list.innerHTML=hits.map(r=>'<li><a href="'+esc(r.href)+'"><span class="kind">'+esc(r.kind)+'</span><span><strong>'+esc(r.title)+'</strong><p>'+esc(r.project)+' · '+snippet(r.body||r.title,q)+'</p></span></a></li>').join('')},120)});
 }
 function paintStudio(projects){
  const shell=document.querySelector('.research-shell');
  if(!shell||shell.querySelector('.study-guide')||shell.querySelector('.research-loading'))return;
  if(!shell.querySelector('.research-heading,.research-project-heading'))return;
  const next=nextStep(projects),node=guide('studio',next.title,next.detail,{html:'<div class="row"><a class="button secondary" href="'+esc(next.href)+'">Continue</a><span>'+esc(next.meta)+'</span></div>'});
  (shell.querySelector('.studio-search')||shell).after(node);
  if(shell.querySelector('.studio-search')&&node.previousElementSibling?.classList.contains('studio-search'))shell.querySelector('.studio-search').after(node);
 }
 let token=0,timer=0;
 async function render(){const mine=++token;let projects=[];try{projects=await load()}catch{projects=[]}if(mine!==token)return;const hash=location.hash.split('/');if(hash[0]==='#research'&&hash[1])remember(decodeURIComponent(hash[1]));paintNext(projects);paintLesson(projects);paintNotes();paintSearch();paintStudio(projects)}
 function schedule(){clearTimeout(timer);let n=0;const tick=()=>{render();if(++n<20)timer=setTimeout(tick,80)};tick()}
 addEventListener('rrh:route',schedule);schedule();
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-save-lesson],[data-save-note],[data-save-drafts]');if(!b)return;
  try{
   const projects=await load();
   if(b.dataset.saveLesson!==undefined){
    const i=Number(b.dataset.saveLesson),text=lessonText(i);
    if(!text){toast('Write the exercise first. An empty lesson is not copied into the project.');return}
    const select=document.querySelector('[data-project-choice]');
    let project=select&&select.value!=='new'?projects.find(p=>p.id===select.value):null;
    if(!project){if(projects.length>=5){toast('The five-project limit has been reached.');return}if(!confirm('Start a project with this lesson? The lesson draft also stays in the Academy.'))return;project=blankProject(course[i].title)}
    else if(!confirm('Save this lesson into “'+project.title+'”? '+destinations[i].blurb+' The Academy draft stays where it is.'))return;
    const tab=applyLesson(project,i,text);await save(project);remember(project.id);toast('Saved into the project.');location.hash='research/'+project.id+'/'+tab;return;
   }
   if(b.dataset.saveNote){
    const note=state.notes.find(n=>n.id===b.dataset.saveNote);if(!note)return;
    let project=projects.find(p=>p.id===remembered())||projects[0];
    if(!project){if(!confirm('Start a project from this note?'))return;project=blankProject(note.title)}
    else if(!confirm('Add “'+note.title+'” to “'+project.title+'” as a decision? The notebook entry stays unchanged.'))return;
    const row=upsert(workbench(project).decisions,'note:'+note.id,{date:stamp(),text:''});row.date=stamp();row.text=(note.title+'\n\n'+note.body).slice(0,4000);
    if(!project.question.trim())project.question=firstLine(note.body||note.title).slice(0,2000);
    await save(project);remember(project.id);toast('Added to the project.');location.hash='research/'+project.id+'/review';return;
   }
   if(b.dataset.saveDrafts!==undefined){
    const drafts=Object.entries(state.drafts||{}).filter(([,v])=>typeof v==='string'&&v.trim());
    if(!drafts.length){toast('Write in a lesson first. Empty drafts are not filed.');return}
    let project=projects.find(p=>p.id===remembered())||projects[0];
    if(!project){if(projects.length>=5){toast('The five-project limit has been reached.');return}if(!confirm('Start a project and file each saved lesson in the matching section?'))return;project=blankProject('Research project')}
    else if(!confirm('File each saved lesson into “'+project.title+'”? Search, design, claims, and the proposal are updated in place.'))return;
    let tab='proposal';
    for(const [k,v] of drafts.sort((a,b)=>Number(a[0])-Number(b[0])))tab=applyLesson(project,Number(k),v.trim());
    await save(project);remember(project.id);toast('Lessons filed into the project.');location.hash='research/'+project.id+'/'+tab;
   }
  }catch(error){toast('Could not update the project. Check that browser storage is available.')}
 });
})();
