/* Read-only search of this browser's research and learning workspace. */
(()=>{
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function index(projects,workspace={}){
  const rows=[];
  const add=(scope,kind,title,text,href)=>{if(text||title)rows.push({scope,kind,title:String(title||kind),text:String(text||''),href})};
  for(const p of projects){
   const link=tab=>'#research/'+encodeURIComponent(p.id)+'/'+tab,w=p.workbench||{};
   add(p.title,'Project',p.title,p.question,link('library'));
   for(const paper of p.papers||[])add(p.title,'Source',paper.title,[paper.authors,paper.year,paper.doi,paper.venue,paper.collection,paper.abstract,paper.notes].filter(Boolean).join('\n'),link('library'));
   for(const n of p.evidence||[])add(p.title,'Evidence',(p.papers||[]).find(x=>x.id===n.paperId)?.title||'Evidence note',Object.values(n).filter(x=>typeof x==='string').join('\n'),link('evidence'));
   for(const c of w.claims||[])add(p.title,'Claim',c.text,c.text,link('claims'));
   for(const d of w.decisions||[])add(p.title,'Decision','Decision · '+(d.date||''),d.text,link('review'));
   add(p.title,'Proposal','Proposal · '+p.title,p.proposal,link('proposal'));
  }
  for(const n of workspace.notes||[])add('Learning workspace','Note',n.title,n.body,'#notebook');
  for(const [stage,text] of Object.entries(workspace.drafts||{}))if(/^[0-8]$/.test(stage)&&typeof text==='string'&&text.trim())add('Learning workspace','Lesson draft','Milestone '+(Number(stage)+1),text,'#lesson/'+stage+'/write');
  return rows;
 }
 function search(rows,query,scope='',kind=''){
  const terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if(!terms.length)return [];
  return rows.filter(r=>(!scope||r.scope===scope)&&(!kind||r.kind===kind)&&terms.every(t=>(r.title+' '+r.text).toLocaleLowerCase().includes(t)));
 }
 function excerpt(row,query){const t=row.text.replace(/\s+/g,' '),term=query.trim().split(/\s+/)[0]?.toLocaleLowerCase(),pos=t.toLocaleLowerCase().indexOf(term),start=Math.max(0,pos-70);return (start?'…':'')+t.slice(start,start+230)+(t.length>start+230?'…':'')}
 function mount(host,projects){
  let workspace={},unavailable=false;try{workspace=JSON.parse(localStorage.getItem('rrh-v2')||localStorage.getItem('rrh-v1')||'{}')||{}}catch{unavailable=true}
  const rows=index(projects,workspace),panel=document.createElement('section');panel.className='research-local-search research-form';panel.setAttribute('aria-labelledby','local-search-heading');
  panel.innerHTML=`<h2 id="local-search-heading">Find the thread in your work.</h2><p>Search saved sources, passages, findings, claims, decisions, proposals, notebook ideas, and lesson drafts on this device.</p>${unavailable?'<p>Learning workspace could not be read. Research project search is still available.</p>':''}<label>Search your saved work<input type="search" id="local-search-query" maxlength="200" placeholder="Try a topic, author, or exact phrase"></label><div class="research-form-grid"><label>Workspace<select id="local-search-scope"><option value="">All workspaces</option>${[...new Set(rows.map(r=>r.scope))].map(x=>`<option>${escape(x)}</option>`).join('')}</select></label><label>Content type<select id="local-search-kind"><option value="">All content</option>${[...new Set(rows.map(r=>r.kind))].map(x=>`<option>${escape(x)}</option>`).join('')}</select></label></div><p id="local-search-status" role="status">Enter a search to explore your saved work.</p><div id="local-search-results"></div>`;
  host.querySelector('.research-project-layout').before(panel);
  const q=panel.querySelector('input'),scope=panel.querySelector('#local-search-scope'),kind=panel.querySelector('#local-search-kind'),status=panel.querySelector('#local-search-status'),results=panel.querySelector('#local-search-results');
  function update(){const matches=search(rows,q.value,scope.value,kind.value);status.textContent=!q.value.trim()?'Enter a search to explore your saved work.':matches.length?`${matches.length} results${matches.length>100?' · Showing the first 100. Narrow your search to see more.':''}`:'No matching work. Try fewer words or choose all workspaces and content types.';results.innerHTML=matches.slice(0,100).map(r=>`<a class="project-row" href="${escape(r.href)}"><div><span class="eyebrow">${escape(r.scope)} · ${escape(r.kind)}</span><h3>${escape(r.title)}</h3><p>${escape(excerpt(r,q.value))}</p><span class="text-link">Open ${escape(r.kind.toLowerCase())} section →</span></div></a>`).join('')}
  let timer;q.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(update,180)});for(const el of [scope,kind])el.addEventListener('change',()=>{clearTimeout(timer);update()});
 }
 const api={index,search,mount};if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.REILocalSearch=api;
})();
