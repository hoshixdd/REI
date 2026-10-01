/* Original spatial storytelling and a local-data companion desk. No service dependency. */
(()=>{
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const moving=()=>!reduced.matches&&document.documentElement.dataset.motion!=='off';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const chapters=[
  ['DEFINE','A good question changes what you see.','Turn a broad interest into a question with a clear subject, context, and purpose.','Find your starting point','#lesson/0'],
  ['GATHER','Different perspectives. A clearer picture.','Build a source library you can trace. Keep authors, methods, and context attached to every perspective.','Open your source library','#research'],
  ['EXAMINE','Look closer. Keep the distinction.','Separate an exact passage from your interpretation. Compare findings without losing the source behind them.','Explore evidence tools','#toolkit'],
  ['CONNECT','An argument, with something behind it.','Bring the evidence into your writing. Make the reasoning visible, including its limits and unanswered questions.','Enter the research studio','#research']
 ];
 let stage=0,manualScroll=null,captionAnimation,cleanup=()=>{},ticket=0;
 function setStage(n,focus=false){
  const root=document.querySelector('.observatory-story');if(!root)return;
  n=Math.max(0,Math.min(3,n));if(n===stage&&root.dataset.stage===String(n)&&!focus)return;const changed=n!==stage;stage=n;root.dataset.stage=n;
  root.querySelectorAll('[data-observe-stage]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;if(focus&&i===n)b.focus({preventScroll:true})});
  const data=chapters[n],panel=root.querySelector('#observe-panel');panel.setAttribute('aria-labelledby','observe-tab-'+n);
  root.querySelector('#observe-label').textContent=`0${n+1} / ${data[0]}`;
  root.querySelector('#observe-heading').textContent=data[1];root.querySelector('#observe-description').textContent=data[2];
  const link=root.querySelector('#observe-link');link.href=data[4];link.innerHTML=data[3]+' <span aria-hidden="true">↗</span>';
  root.querySelector('#observe-count').textContent=`0${n+1} — 04`;root.querySelector('#observe-model-number').textContent=`0${n+1}`;
  root.querySelector('.observatory-meter i').style.transform=`scaleX(${(n+1)/4})`;
  if(changed){captionAnimation?.cancel();if(moving())captionAnimation=panel.animate([{opacity:.45,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'})}
 }
 document.addEventListener('click',e=>{const b=e.target.closest('[data-observe-stage]');if(b){manualScroll=scrollY;setStage(Number(b.dataset.observeStage));return}const skip=e.target.closest('[data-observe-skip]');if(skip){e.preventDefault();const next=document.querySelector('#dream-manifesto');next?.scrollIntoView({behavior:moving()?'smooth':'instant',block:'start'});next?.querySelector('h2')?.setAttribute('tabindex','-1');next?.querySelector('h2')?.focus({preventScroll:true})}});
 document.addEventListener('keydown',e=>{const b=e.target.closest('[data-observe-stage]');if(!b||!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key))return;e.preventDefault();manualScroll=scrollY;setStage(e.key==='Home'?0:e.key==='End'?3:(Number(b.dataset.observeStage)+(['ArrowRight','ArrowDown'].includes(e.key)?1:3))%4,true)});
 let scrollFrame=0;
 function follow(){scrollFrame=0;const root=document.querySelector('.observatory-story');if(!root||innerWidth<=900||!moving())return;if(manualScroll!==null)return;const r=root.getBoundingClientRect(),range=root.offsetHeight-innerHeight+74;if(r.top<100&&r.bottom>innerHeight*.5)setStage(Math.min(3,Math.floor(Math.max(0,(74-r.top)/Math.max(1,range))*4)))}
 addEventListener('wheel',()=>manualScroll=null,{passive:true});addEventListener('touchmove',()=>manualScroll=null,{passive:true});addEventListener('keydown',e=>{if(['PageDown','PageUp',' '].includes(e.key)&&!e.target.closest('input,textarea,button'))manualScroll=null});
 addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(follow)},{passive:true});
 async function makeScene(host,routeTicket){
  let T;try{T=await import('./vendor/three.module.js')}catch{return}if(routeTicket!==ticket||!host.isConnected)return;
  let renderer;try{renderer=new T.WebGLRenderer({canvas:host.querySelector('canvas'),alpha:true,antialias:true,powerPreference:'low-power'})}catch{return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.25:1.6));renderer.setClearColor(0,0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
  const scene=new T.Scene();scene.background=new T.Color(0x0b0d11);const camera=new T.PerspectiveCamera(36,1,.1,50);camera.position.set(0,0,10);
  const studio=document.createElement('canvas');studio.width=512;studio.height=256;const ctx=studio.getContext('2d');ctx.fillStyle='#151821';ctx.fillRect(0,0,512,256);
  for(const [x,w,c] of [[25,65,'#fff7e3'],[200,100,'#eaf0ff'],[410,60,'#ffffff']]){const g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,'#151821');g.addColorStop(.4,c);g.addColorStop(.6,c);g.addColorStop(1,'#151821');ctx.fillStyle=g;ctx.fillRect(x,0,w,256)}
  const texture=new T.CanvasTexture(studio);texture.mapping=T.EquirectangularReflectionMapping;texture.colorSpace=T.SRGBColorSpace;const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromEquirectangular(texture);scene.environment=env.texture;texture.dispose();pmrem.dispose();
  scene.add(new T.HemisphereLight(0xffffff,0x232738,2));const key=new T.DirectionalLight(0xfff6df,3);key.position.set(3,4,5);scene.add(key);const fill=new T.DirectionalLight(0xbfd2ff,2);fill.position.set(-4,0,3);scene.add(fill);
  const assembly=new T.Group();scene.add(assembly);
  const metal=new T.MeshPhysicalMaterial({color:0xd9d7cd,metalness:1,roughness:.19,clearcoat:.7});
  const lens=new T.MeshPhysicalMaterial({color:0xf5f7ff,transmission:1,opacity:1,roughness:.045,thickness:.35,ior:1.46,clearcoat:.08,envMapIntensity:.18,specularIntensity:.3,attenuationColor:new T.Color(0xd9e7ff),attenuationDistance:4});
  const optic=new T.Group();assembly.add(optic);
  const profile=[[1.12,-.12],[1.12,.12],[1.16,.18],[1.28,.18],[1.34,.10],[1.34,-.10],[1.28,-.17],[1.16,-.17],[1.12,-.12]].map(([x,y])=>new T.Vector2(x,y));
  const housing=new T.Mesh(new T.LatheGeometry(profile,96),metal);housing.rotation.x=Math.PI/2;optic.add(housing);
  const glass=new T.Mesh(new T.SphereGeometry(1.13,48,32),lens);glass.scale.z=.12;optic.add(glass);
  const bezel=new T.Mesh(new T.TorusGeometry(1.16,.018,8,96),metal);bezel.position.z=.19;optic.add(bezel);
  for(let i=0;i<60;i++){const a=i/60*Math.PI*2,m=new T.Mesh(new T.BoxGeometry(.01,i%5===0?.09:.035,.014),metal);m.position.set(Math.sin(a)*1.26,Math.cos(a)*1.26,.19);m.rotation.z=-a;optic.add(m)}
  const orbitA=new T.Mesh(new T.TorusGeometry(2.2,.011,6,100),metal),orbitB=new T.Mesh(new T.TorusGeometry(2.55,.007,6,100),metal);orbitA.rotation.x=1.08;orbitA.rotation.z=-.25;orbitB.rotation.y=1.0;orbitB.rotation.x=.4;assembly.add(orbitA,orbitB);
  const labelTextures=[];
  function cardTexture(title,subtitle,number){const c=document.createElement('canvas');c.width=512;c.height=640;const x=c.getContext('2d');x.fillStyle='#eeeae0';x.fillRect(0,0,512,640);x.strokeStyle='#a5a398';x.strokeRect(22,22,468,596);x.fillStyle='#525b66';x.font='18px monospace';x.fillText('REI / OPTICAL ARCHIVE',45,62);x.fillStyle='#232c37';x.font='72px Georgia';x.fillText(number,43,167);x.font='29px sans-serif';x.fillText(title,45,229);x.font='18px sans-serif';x.fillText(subtitle,45,273);x.strokeStyle='#b6b5ad';for(let j=0;j<7;j++){x.beginPath();x.moveTo(45,330+j*28);x.lineTo(j===6?280:465,330+j*28);x.stroke()}x.fillStyle='#766c58';x.font='15px monospace';x.fillText('OBSERVE / TRACE / EXPLAIN',45,575);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;labelTextures.push(t);return t}
  const sourceTextures=['Perspective A','Perspective B','Perspective C'].map((title,i)=>cardTexture(title,'Source context retained','0'+(i+1)));
  const evidenceTexture=cardTexture('A finding, in context.','Quotation / interpretation / limits','E01'),argumentTexture=cardTexture('An accountable argument.','Evidence / reasoning / uncertainty','A01');
  const cards=sourceTextures.map(map=>{const material=new T.MeshStandardMaterial({map,roughness:.82,side:T.DoubleSide});const card=new T.Mesh(new T.PlaneGeometry(1.18,1.48),material);assembly.add(card);return card});
  const seedTexture=cardTexture('Start with curiosity.','What do you want to understand?','?');const seed=new T.Mesh(new T.PlaneGeometry(1.3,1.63),new T.MeshStandardMaterial({map:seedTexture,roughness:.8,side:T.DoubleSide}));seed.position.z=-.45;assembly.add(seed);
  const edgeGeometry=new T.BufferGeometry();edgeGeometry.setAttribute('position',new T.BufferAttribute(new Float32Array(18),3));const edgeMaterial=new T.LineBasicMaterial({color:0xd8c8a4,transparent:true,opacity:0});const edges=new T.LineSegments(edgeGeometry,edgeMaterial);assembly.add(edges);
  const pointsGeometry=new T.BufferGeometry(),positions=[];for(let i=0;i<(innerWidth<700?220:480);i++){const a=i*2.39996,r=2.8+(i%17)/24;positions.push(Math.cos(a)*r,Math.sin(a)*r*.65,Math.sin(i*.73)*1.2)}pointsGeometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));const particles=new T.Points(pointsGeometry,new T.PointsMaterial({color:0xded4ba,size:.013,transparent:true,opacity:.5,depthWrite:false}));assembly.add(particles);
  let frame=0,last=0,time=0,visible=true,dirty=true,px=0,py=0,tx=0,ty=0,phase=stage;
  const resize=()=>{const r=host.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/Math.max(1,r.height);camera.position.z=camera.aspect<1?12:9.4;camera.updateProjectionMatrix();dirty=true};const ro=new ResizeObserver(resize);ro.observe(host);resize();
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;dirty=true},{threshold:.05});io.observe(host);
  const pointer=e=>{if(e.pointerType!=='mouse')return;const r=host.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*.5;ty=((e.clientY-r.top)/r.height-.5)*.35;dirty=true};const leave=()=>{tx=0;ty=0;dirty=true};host.addEventListener('pointermove',pointer,{passive:true});host.addEventListener('pointerleave',leave);
  const change=()=>{dirty=true};addEventListener('rrh:motion',change);reduced.addEventListener('change',change);const mo=new MutationObserver(change);mo.observe(host.closest('.observatory-story'),{attributes:true,attributeFilter:['data-stage']});
  function tick(now){frame=requestAnimationFrame(tick);if(document.hidden||!visible||now-last<(innerWidth<700?40:33))return;const dt=Math.min((now-last)/1000,.06);last=now;if(!moving()&&!dirty)return;if(moving())time+=dt;const blend=moving()?1-Math.exp(-dt*5):1;phase+=(stage-phase)*blend;px+=((moving()?tx:0)-px)*blend;py+=((moving()?ty:0)-py)*blend;
   assembly.rotation.set(.1+py,.1+px,0);assembly.position.y=.15;
   optic.rotation.set(.16+Math.sin(time*.3)*.025,-.34+phase*.16,phase*.12);optic.position.set(phase<1?0:-.3,.18,phase<1?.25:.65);optic.scale.setScalar(phase>2?1-(phase-2)*.12:1);
   seed.visible=phase<.98;seed.scale.setScalar(Math.max(.001,1-phase*.6));
   cards.forEach((card,i)=>{const angle=i/3*Math.PI*2+.35;const spread=Math.min(1,phase),stack=Math.max(0,Math.min(1,phase-2)),examine=i===0?Math.max(0,Math.min(1,phase-1))*(1-stack):0;const cx=Math.cos(angle)*2.1,cy=Math.sin(angle)*1.4;card.position.set((cx*spread*(1-stack)+(i-1)*.7*stack)*(1-examine)-.3*examine,(cy*spread*(1-stack)+(i-1)*.15*stack)*(1-examine)+.18*examine,-.7+i*.12);card.rotation.set(-.06,Math.sin(angle)*.22*(1-stack)*(1-examine),Math.cos(angle)*.09*(1-stack)*(1-examine));card.scale.setScalar(.12+spread*.88+examine*.35);card.visible=phase>.04;const map=i===0&&stage===2?evidenceTexture:i===0&&stage===3?argumentTexture:sourceTextures[i];if(card.material.map!==map)card.material.map=map});
   const buffer=edgeGeometry.attributes.position.array;for(let i=0;i<3;i++){const a=cards[i].position,b=cards[(i+1)%3].position;buffer.set([a.x,a.y,a.z+.04,b.x,b.y,b.z+.04],i*6)}edgeGeometry.attributes.position.needsUpdate=true;edgeMaterial.opacity=Math.max(0,Math.min(.5,(phase-1)*.5));orbitA.rotation.z=-.25+time*.025;orbitB.rotation.z=time*.018;particles.rotation.z=time*.013;
   renderer.render(scene,camera);if(host.dataset.ready!=='true')host.dataset.ready='true';dirty=false;
  }frame=requestAnimationFrame(tick);
  cleanup=()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();mo.disconnect();host.removeEventListener('pointermove',pointer);host.removeEventListener('pointerleave',leave);removeEventListener('rrh:motion',change);reduced.removeEventListener('change',change);const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m))});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());labelTextures.forEach(t=>t.dispose());env.dispose();renderer.dispose();renderer.forceContextLoss()};
 }
 let lazy;
 function home(){ticket++;cleanup();cleanup=()=>{};lazy?.disconnect();captionAnimation?.cancel();stage=0;manualScroll=null;const host=document.querySelector('.observatory-model');if(!host)return;setStage(0);const currentTicket=ticket;lazy=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){lazy.disconnect();makeScene(host,currentTicket)}},{rootMargin:'250px'});lazy.observe(host)}
 /* Preserve existing forms/handlers by moving the current DOM, rather than cloning it. */
 let deskOpen=false,deskDispose=()=>{};
 function evidenceMarkup(p){if(!p.evidence.length)return '<p class="observatory-empty">Your evidence will appear here once you capture a passage or add a finding. Each note keeps its original source.</p><a href="#research/'+esc(p.id)+'/evidence">Add your first evidence note ↗</a>';return p.evidence.map((n,i)=>{const s=p.papers.find(s=>s.id===n.paperId);return `<article class="observatory-evidence"><span>E${String(i+1).padStart(2,'0')} / ${esc(n.locator||'Location not recorded')}</span><h4>${esc(s?.title||'Source not found')}</h4>${n.quote?`<blockquote>${esc(n.quote)}</blockquote>`:''}<p>${esc(n.findings)}</p>${n.limitations?`<p><strong>Limitations:</strong> ${esc(n.limitations)}</p>`:''}<button type="button" data-observe-insert="${esc(n.id)}">Append finding with source ↗</button></article>`}).join('')}
 function desk(){
  deskDispose();deskDispose=()=>{};const content=document.querySelector('.research-content'),tools=content?.querySelector('.atelier-desk-tools'),p=window.REIWorkbench?.getProject();if(!tools||!p)return;
  const room=location.hash.split('/')[2];if(!['reader','proposal'].includes(room))return;
  const toggle=document.createElement('button');toggle.type='button';toggle.className='observatory-desk-toggle';toggle.textContent='Open companion desk ↗';toggle.setAttribute('aria-pressed','false');tools.append(toggle);
  let layout=null,primary=null,companion=null,splitter=null,disposed=false,ratio=60;try{ratio=Math.max(38,Math.min(68,Number(localStorage.getItem('rei-desk-ratio'))||60))}catch{}
  const saveStatus=(text,error=false)=>{const s=companion?.querySelector('.observatory-save');if(s){s.dataset.error=String(error);s.querySelector('span:last-child').textContent=text}};
  let revision=0;
  async function saveDraft(editor){const r=++revision;p.proposal=editor.value;saveStatus('Saving…');try{await window.REIWorkbench.saveProject();if(!disposed&&r===revision)saveStatus('Saved on this device')}catch{if(!disposed&&r===revision)saveStatus('Save failed — keep this tab open',true)}}
  const updateCount=editor=>{const el=companion?.querySelector('.observatory-save span:first-child');if(el)el.textContent=(editor.value.trim()?editor.value.trim().split(/\s+/).length:0)+' words'};
  const setRatio=value=>{ratio=Math.round(Math.max(38,Math.min(68,value)));layout.style.setProperty('--desk-primary',ratio+'%');splitter.setAttribute('aria-valuenow',String(ratio));splitter.setAttribute('aria-valuetext',ratio+' percent for the main pane')};
  const remember=()=>{try{localStorage.setItem('rei-desk-ratio',String(ratio))}catch{}};
  function open(){
   deskOpen=true;toggle.textContent='Close companion desk ↙';toggle.setAttribute('aria-pressed','true');content.closest('.research-desk').classList.add('observatory-desk-active');
   layout=document.createElement('div');layout.className='observatory-workbench';primary=document.createElement('div');primary.className='observatory-primary';primary.id='observe-main-pane';
   [...content.children].filter(n=>n!==tools).forEach(n=>primary.append(n));
   splitter=document.createElement('button');splitter.type='button';splitter.className='observatory-splitter';splitter.setAttribute('role','separator');splitter.setAttribute('aria-orientation','vertical');splitter.setAttribute('aria-label','Resize research panes');splitter.setAttribute('aria-controls','observe-main-pane');splitter.setAttribute('aria-valuemin','38');splitter.setAttribute('aria-valuemax','68');
   companion=document.createElement('aside');companion.className='observatory-companion';companion.setAttribute('aria-label',room==='reader'?'Proposal companion':'Evidence companion');
   companion.innerHTML=`<div class="observatory-companion-head"><p>CONNECTED DESK / ${room==='reader'?'READ → WRITE':'EVIDENCE → ARGUMENT'}</p><h3>${room==='reader'?'Keep your argument in view.':'The evidence behind your words.'}</h3><small>${room==='reader'?'Write beside your source. Your existing proposal is saved as you type.':'Inspect your findings and their sources without leaving your draft.'}</small></div><div class="observatory-companion-body">${room==='reader'?`<label for="observe-draft">Your working proposal</label><textarea id="observe-draft" maxlength="200000" rows="13">${esc(p.proposal)}</textarea><div class="observatory-save" role="status"><span>0 words</span><span>Saved on this device</span></div><p class="observatory-empty">Quotes and interpretations stay separate in your evidence notes.</p><a href="#research/${esc(p.id)}/proposal">Open full proposal studio ↗</a>`:evidenceMarkup(p)}</div>`;
   const switches=document.createElement('div');switches.className='observatory-pane-switch';switches.setAttribute('role','group');switches.setAttribute('aria-label','Switch companion desk pane');layout.dataset.pane='primary';
   ['primary','companion'].forEach((name,i)=>{const b=document.createElement('button');b.type='button';b.textContent=room==='reader'?(i?'Proposal draft':'Read & capture'):(i?'Evidence notes':'Your proposal');b.setAttribute('aria-pressed',String(i===0));b.setAttribute('aria-controls',i?'observe-companion-pane':'observe-main-pane');b.addEventListener('click',()=>{layout.dataset.pane=name;switches.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))});switches.append(b)});companion.id='observe-companion-pane';
   layout.append(switches,primary,splitter,companion);content.append(layout);setRatio(ratio);
   const editor=companion.querySelector('#observe-draft');if(editor){updateCount(editor);editor.addEventListener('input',()=>{updateCount(editor);saveDraft(editor)})}
   splitter.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();setRatio(e.key==='Home'?38:e.key==='End'?68:ratio+(e.key==='ArrowRight'?2:-2));remember()});
   let dragging=false;splitter.addEventListener('pointerdown',e=>{dragging=true;splitter.setPointerCapture(e.pointerId)});splitter.addEventListener('pointermove',e=>{if(!dragging)return;const r=layout.getBoundingClientRect();setRatio((e.clientX-r.left)/r.width*100)});const release=()=>{dragging=false;remember()};splitter.addEventListener('pointerup',release);splitter.addEventListener('pointercancel',release);
   companion.addEventListener('click',async e=>{const b=e.target.closest('[data-observe-insert]');if(!b)return;const n=p.evidence.find(n=>n.id===b.dataset.observeInsert),s=p.papers.find(s=>s.id===n?.paperId),editor=primary.querySelector('#project-proposal');if(!n||!s||!editor)return;const source=s.doi?'https://doi.org/'+s.doi:s.url||'';editor.value+='\n\n'+n.findings+(n.relevance?'\n\n'+n.relevance:'')+'\n\nSource: '+s.title+(source?' — '+source:'')+(n.locator?' ('+n.locator+')':'');editor.dispatchEvent(new Event('input',{bubbles:true}));if(innerWidth<=900){layout.dataset.pane='primary';switches.querySelectorAll('button').forEach((x,i)=>x.setAttribute('aria-pressed',String(i===0)))}editor.focus();editor.setSelectionRange(editor.value.length,editor.value.length);editor.scrollTop=editor.scrollHeight;const a=moving()?b.animate([{background:'#ded4ba'},{background:'transparent'}],{duration:550}):null;void a;window.toast?.('Finding appended with its source. Review its place in your argument.')});
  }
  function close(){deskOpen=false;toggle.textContent='Open companion desk ↗';toggle.setAttribute('aria-pressed','false');content.closest('.research-desk').classList.remove('observatory-desk-active');if(layout){[...primary.children].forEach(n=>content.append(n));layout.remove();layout=null}companion=null}
  toggle.addEventListener('click',()=>{if(layout)close();else open()});if(deskOpen)open();
  deskDispose=()=>{disposed=true;revision++;};
 }
 function lensReadout(){const hero=document.querySelector('.dream-hero');if(!hero||hero.querySelector('.observatory-lens-readout'))return;const box=document.createElement('div');box.className='observatory-lens-readout';box.hidden=true;box.setAttribute('role','status');box.innerHTML='<span>LOOK CLOSER / KEEP THE CONTEXT</span><p>A source is more than a finding. Look at its methods, its setting, and what it cannot tell you.</p>';hero.querySelector('.dream-intro').append(box);}
 document.addEventListener('click',e=>{const b=e.target.closest('.dream-lens-controls [data-lens-action]'),box=document.querySelector('.observatory-lens-readout');if(!b||!box)return;if(b.dataset.lensAction==='inspect')box.hidden=b.getAttribute('aria-pressed')!=='true';if(b.dataset.lensAction==='reset')box.hidden=true});
 addEventListener('rrh:route',()=>{home();lensReadout()});addEventListener('rei:research-render',desk);
 addEventListener('rrh:motion',()=>{if(!moving())captionAnimation?.finish();follow()});reduced.addEventListener('change',()=>{if(!moving())captionAnimation?.finish();follow()});
 home();desk();lensReadout();
})();
