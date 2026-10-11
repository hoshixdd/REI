/* Deterministic, local-only map and draft helpers. No inferred research links. */
(function(root){
 'use strict';
 function model(p){
  const w=p.workbench||{},nodes=[],links=[],add=(kind,r,i,label)=>nodes.push({key:kind+':'+r.id,id:r.id,kind,label,tag:({source:'S',evidence:'E',claim:'C',theme:'T'})[kind]+(i+1),record:r});
  p.papers.forEach((r,i)=>add('source',r,i,r.title));p.evidence.forEach((r,i)=>add('evidence',r,i,r.findings||r.quote||'Evidence note'));
  (w.claims||[]).forEach((r,i)=>add('claim',r,i,r.text));(w.codes||[]).forEach((r,i)=>add('theme',r,i,r.label));
  const keys=new Set(nodes.map(n=>n.key)),connect=(from,to,type,detail)=>{if(keys.has(from)&&keys.has(to))links.push({from,to,type,detail})};
  p.edges.forEach(r=>connect('source:'+r.from,'source:'+r.to,'reference','User-recorded verified reference; check the citing source’s reference list.'));
  p.evidence.forEach(r=>connect('source:'+r.paperId,'evidence:'+r.id,'passage',r.locator||'Source recorded; location not recorded.'));
  (w.claims||[]).forEach(c=>c.links.forEach(l=>connect('evidence:'+l.evidenceId,'claim:'+c.id,l.relation,'Researcher recorded this evidence as '+l.relation+' for the claim.')));
  (w.coding||[]).forEach(c=>connect('evidence:'+c.evidenceId,'theme:'+c.codeId,'coding',c.note||'Researcher coded this note to the theme; coding does not imply agreement.'));
  return {nodes,links};
 }
 function filter(m,{kind='',relation='',view='',query=''}={}){
  let links=m.links.filter(l=>!relation||l.type===relation),allowed=null;
  if(relation)allowed=new Set(links.flatMap(l=>[l.from,l.to]));
  if(view==='isolated'){const connected=new Set(m.links.flatMap(l=>[l.from,l.to]));allowed=new Set(m.nodes.filter(n=>!connected.has(n.key)).map(n=>n.key))}
  if(view==='challenged')allowed=new Set(m.links.filter(l=>l.type==='challenges').flatMap(l=>[l.from,l.to]));
  if(view==='gaps')allowed=new Set(m.nodes.filter(n=>n.kind==='theme'&&(n.record.gaps||'').trim()).map(n=>n.key));
  const q=query.trim().toLowerCase(),nodes=m.nodes.filter(n=>(!kind||kind===n.kind)&&(!allowed||allowed.has(n.key))&&(!q||[n.label,n.tag,n.record.authors,n.record.gaps].join(' ').toLowerCase().includes(q))),keys=new Set(nodes.map(n=>n.key));
  return {nodes,links:links.filter(l=>keys.has(l.from)&&keys.has(l.to))};
 }
 function positions(nodes){const kinds=['source','evidence','claim','theme'],out=new Map();kinds.forEach((kind,k)=>{const group=nodes.filter(n=>n.kind===kind);group.forEach((n,i)=>{const a=i/Math.max(1,group.length)*Math.PI*2;out.set(n.key,{x:(k-1.5)*170,y:Math.sin(a)*130+[-35,25,-65,60][k],z:Math.cos(a)*150+[0,-30,-60,25][k]})})});return out}
 function project(v,yaw,pitch,zoom=1){const x=v.x*Math.cos(yaw)+v.z*Math.sin(yaw),z=-v.x*Math.sin(yaw)+v.z*Math.cos(yaw),y=v.y*Math.cos(pitch)-z*Math.sin(pitch),depth=v.y*Math.sin(pitch)+z*Math.cos(pitch),s=760/(900-depth)*zoom;return {x:420+x*s,y:270+y*s,scale:s,depth}}
 function sections(text){const result=[];let offset=0,fenced=false;for(const line of text.split('\n')){if(/^\s*(```|~~~)/.test(line))fenced=!fenced;const m=!fenced&&line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if(m)result.push({title:m[2],level:m[1].length,start:offset});offset+=line.length+1}return result.map((r,i)=>({...r,end:result[i+1]?.start??text.length,words:text.slice(r.start,result[i+1]?.start??text.length).trim().split(/\s+/).filter(Boolean).length}))}
 function difference(before,after){const a=before.split('\n'),b=after.split('\n');let start=0;while(start<a.length&&start<b.length&&a[start]===b[start])start++;let ae=a.length,be=b.length;while(ae>start&&be>start&&a[ae-1]===b[be-1]){ae--;be--}return {same:before===after,unchangedStart:start,unchangedEnd:a.length-ae,removed:a.slice(start,ae).join('\n'),added:b.slice(start,be).join('\n')}}
 async function milestone(p,name,proposal,save){if(!name.trim())throw Error('Name this milestone first.');if(name.length>120)throw Error('Use a milestone name of 120 characters or fewer.');const w=p.workbench,old=w.snapshots;p.workbench.snapshots=[{id:crypto.randomUUID(),date:new Date().toISOString(),reason:name.trim(),question:p.question,proposal},...old].slice(0,20);try{await save()}catch(error){w.snapshots=old;throw error}}
 root.REIDepthCore={model,filter,positions,project,sections,difference,milestone};
})(typeof window!=='undefined'?window:globalThis);
