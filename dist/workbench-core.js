/* Pure data helpers shared by the local workbench and its regression tests. */
(function(root){
 'use strict';
 const text=x=>typeof x==='string'?x:'';
 const uid=()=>crypto.randomUUID();
 const doi=x=>text(x).trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'').replace(/^doi:\s*/i,'').toLowerCase();
 const titleKey=x=>text(x).normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
 function csvRows(source){
  const rows=[];let row=[],cell='',quoted=false;
  source=source.replace(/^\uFEFF/,'');
  for(let i=0;i<source.length;i++){const c=source[i];if(c==='"'){if(quoted&&source[i+1]==='"'){cell+='"';i++}else if(quoted||!cell)quoted=!quoted;else cell+=c}
   else if(c===','&&!quoted){row.push(cell);cell=''}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&source[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v.trim()))rows.push(row);row=[];cell=''}else cell+=c}
  if(quoted)throw Error('An imported CSV field has an unclosed quote.');row.push(cell);if(row.some(v=>v.trim()))rows.push(row);return rows;
 }
 function bibRecords(source){
  const records=[];let i=0;
  while(i<source.length){const at=source.indexOf('@',i);if(at<0)break;const open=source.slice(at).match(/^@(\w+)\s*([{(])/);if(!open){i=at+1;continue}i=at+open[0].length;const end=open[2]==='{'?'}':')';let depth=1,quoted=false,body='';
   for(;i<source.length;i++){const c=source[i];if(c==='\\'&&i+1<source.length){body+=c+source[++i];continue}if(c==='"')quoted=!quoted;if(!quoted){if(c===open[2])depth++;}
    // Count only the enclosing delimiter outside quoted values.
    if(!quoted&&c===end){depth--;if(!depth){i++;break}}body+=c}
   if(depth)throw Error('A BibTeX entry is incomplete.');if(/^(comment|preamble|string)$/i.test(open[1]))continue;
   const record={};let cursor=body.indexOf(',')+1;if(!cursor)continue;
   while(cursor<body.length){const m=body.slice(cursor).match(/^\s*,?\s*([\w-]+)\s*=\s*/);if(!m)break;cursor+=m[0].length;const key=m[1].toLowerCase();let value='',level=0,quote=false;
    for(;cursor<body.length;cursor++){const c=body[cursor];if(c==='\\'&&cursor+1<body.length){value+=body[++cursor];continue}if(c==='"'&&level===0)quote=!quote;if(!quote){if(c==='{')level++;if(c==='}')level--;if(c===','&&level===0)break}value+=c}cursor++;record[key]=value.trim().replace(/^[{"]|[}"]$/g,'').replace(/[{}]/g,'');
   }records.push(record);
  }return records;
 }
 function parseImport(source,format){
  if(source.length>2*1024*1024)throw Error('Import a file under 2 MB.');let rows=[];
  if(format==='csv'){const all=csvRows(source);const headers=(all.shift()||[]).map(x=>x.trim().toLowerCase());if(!headers.includes('title'))throw Error('CSV needs a title column.');rows=all.map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]||''])))}
  else if(format==='ris'){let r=null;for(const line of source.split(/\r?\n/)){const m=line.match(/^([A-Z0-9]{2})\s{2}-\s?(.*)$/);if(!m)continue;const [,k,v]=m;if(k==='TY')r={authors:[]};else if(k==='ER'){if(r)rows.push(r);r=null}else if(r){if(k==='AU'||k==='A1')r.authors.push(v);else{const key=({TI:'title',T1:'title',PY:'year',Y1:'year',DO:'doi',UR:'url',JO:'venue',JF:'venue',T2:'venue',AB:'abstract'})[k];if(key)r[key]=v}}}if(r)throw Error('A RIS entry is missing its ER end marker.')}
  else if(format==='bib')rows=bibRecords(source);else throw Error('Choose CSV, RIS, or BibTeX.');
  if(!rows.length)throw Error('No records found.');if(rows.length>2000)throw Error('Import at most 2,000 records at a time.');
  return rows.map(r=>({id:uid(),title:text(r.title).trim().slice(0,2000),authors:Array.isArray(r.authors)?r.authors.join('; '):text(r.authors||r.author).replace(/\s+and\s+/g,'; '),year:text(r.year||r.date).slice(0,4),doi:doi(r.doi),url:text(r.url),venue:text(r.venue||r.journal||r.booktitle),abstract:text(r.abstract),collection:text(r.collection)||'Imported',status:'To read',notes:''}));
 }
 function planImport(existing,incoming){const seenD=new Set(existing.map(p=>doi(p.doi)).filter(Boolean)),seenT=new Set(existing.map(p=>titleKey(p.title)));return incoming.map(p=>{let reason=!p.title?'Missing title':(p.doi&&seenD.has(p.doi))||seenT.has(titleKey(p.title))?'Duplicate DOI or title':'';if(!reason){seenT.add(titleKey(p.title));if(p.doi)seenD.add(p.doi)}return {paper:p,reason}})}
 function normalize(p){
  p.workbench=p.workbench||{version:1};const w=p.workbench;
  for(const k of ['claims','design','decisions','snapshots','searches','comparisons','reviews'])if(!Array.isArray(w[k]))w[k]=[];
  return w;
 }
 function validateWorkbench(p){
  if(p.workbench===undefined)return;
  const w=p.workbench;if(!w||w.version!==1)throw Error('Unsupported workbench version.');
  const papers=new Set(p.papers.map(x=>x.id)),evidence=new Set(p.evidence.map(x=>x.id));
  for(const [kind,fields] of Object.entries({claims:['id','text','status'],design:['id','objective','measure','collection','analysis','rationale'],decisions:['id','text','date'],snapshots:['id','date','proposal','question'],searches:['id','query','database','date','notes'],comparisons:['id','left','right','explanation'],reviews:['id','prompt','answer']})){
   if(!Array.isArray(w[kind])||w[kind].length>2000)throw Error('Invalid workbench records.');const ids=new Set();for(const r of w[kind]){if(!r||fields.some(k=>typeof r[k]!=='string')||ids.has(r.id))throw Error('Invalid '+kind+' record.');ids.add(r.id);
    if(kind==='claims'){if(!['Tentative','Working','Reviewed'].includes(r.status)||!Array.isArray(r.links))throw Error('Invalid claim.');for(const l of r.links)if(!evidence.has(l.evidenceId)||!['supports','challenges','mixed','uncertain'].includes(l.relation))throw Error('Broken evidence link.')}
    if(kind==='comparisons'&&(!evidence.has(r.left)||!evidence.has(r.right)))throw Error('Broken comparison.');
   }
  }
  for(const n of p.evidence){for(const k of ['studyType','sample','transferability','conflicts','confidence'])if(n[k]!==undefined&&typeof n[k]!=='string')throw Error('Invalid evidence quality field.');if(n.quote!==undefined&&typeof n.quote!=='string')throw Error('Invalid passage.');if(n.page!==undefined&&(!Number.isInteger(n.page)||n.page<1))throw Error('Invalid page.')}
  if(w.attachments!==undefined){if(!Array.isArray(w.attachments)||w.attachments.length>200)throw Error('Invalid attachments.');let total=0;const attached=new Set();for(const a of w.attachments){if(!papers.has(a.paperId)||attached.has(a.paperId)||typeof a.name!=='string'||typeof a.data!=='string'||!/^data:application\/pdf;base64,JVBERi0[A-Za-z0-9+/=\r\n]*$/.test(a.data))throw Error('Invalid PDF attachment.');const size=(a.data.length-28)*.75;if(size>20*1024*1024+3)throw Error('PDF exceeds the attachment limit.');total+=size;attached.add(a.paperId)}if(total>60*1024*1024+600)throw Error('Project attachments exceed the size limit.')}
 }
 function checks(p){const w=normalize(p);const findings=[];if(!p.question.trim())findings.push('Record a research question.');if(!w.design.length)findings.push('Add at least one objective and methods plan.');for(const [i,d] of w.design.entries())for(const [key,label] of Object.entries({objective:'objective',measure:'measure or construct',collection:'collection method',analysis:'analysis plan',rationale:'alignment rationale'}))if(!d[key].trim())findings.push('Objective '+(i+1)+': add '+label+'.');const linked=new Set();for(const [i,c] of w.claims.entries()){if(!c.links.length)findings.push('Claim '+(i+1)+' has no linked evidence.');for(const l of c.links)linked.add(l.evidenceId);if(c.links.some(l=>l.relation==='challenges'))findings.push('Claim '+(i+1)+' has challenging evidence to address.');if(c.links.length===1)findings.push('Claim '+(i+1)+' relies on one evidence note; compare another source if possible.')}for(const [i,n] of p.evidence.entries())if(!linked.has(n.id))findings.push('Evidence E'+(i+1)+' is not connected to a claim yet.');for(const [i,c] of w.comparisons.entries())if(!c.explanation.trim())findings.push('Comparison '+(i+1)+' needs an explanation before it can inform synthesis.');if(p.proposal.trim()&&!w.claims.length)findings.push('Proposal text exists, but no claims are recorded in the evidence trail.');if(w.impact)findings.push('Your question changed: review the objectives, evidence, and draft.');return findings}
 function readiness(p){const w=normalize(p),linked=new Set(w.claims.flatMap(c=>c.links.map(l=>l.evidenceId)));return [{id:'question',label:'Question clarity',ready:Boolean(p.question.trim())},{id:'sources',label:'Source coverage',ready:p.papers.length>0},{id:'traceability',label:'Evidence traceability',ready:p.evidence.length>0&&w.claims.length>0&&p.evidence.every(n=>linked.has(n.id))},{id:'methods',label:'Method alignment',ready:w.design.length>0&&w.design.every(d=>d.objective&&d.measure&&d.collection&&d.analysis&&d.rationale)},{id:'ethics',label:'Ethics planning',ready:w.design.some(d=>/ethic|consent|privacy|risk/i.test((d.rationale||'')+' '+(d.collection||'')))},{id:'feasibility',label:'Feasibility',ready:w.design.some(d=>/access|time|resource|feasib|permission/i.test((d.rationale||'')+' '+(d.collection||'')))},{id:'proposal',label:'Proposal coherence',ready:Boolean(p.proposal.trim()&&w.claims.length)},{id:'review',label:'Review readiness',ready:w.reviews.length>0&&w.decisions.length>0}]}
 function bibliography(p){return p.papers.map((s,i)=>`[${i+1}] ${s.authors||'Author not recorded'} (${s.year||'n.d.'}). ${s.title}. ${s.venue||''} ${s.doi?'https://doi.org/'+s.doi:s.url||''}`).join('\n\n')}
 const api={csvRows,bibRecords,parseImport,planImport,normalize,validateWorkbench,checks,readiness,bibliography,doi};if(typeof module!=='undefined')module.exports=api;else root.REICore=api;
})(typeof window!=='undefined'?window:globalThis);

