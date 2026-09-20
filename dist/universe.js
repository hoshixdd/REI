/* An original GPU particle atlas. One scene at a time, with route disposal. */
(()=>{
 let generation=0,cleanup=()=>{},activeHost=null;const library=import('./vendor/three.module.js');
 const paused=()=>document.documentElement.dataset.motion==='off';
 window.stopUniverse=()=>{generation++;cleanup();cleanup=()=>{};activeHost=null};
 window.startUniverse=async()=>{
 const host=document.querySelector('#universe')||document.querySelector('.lesson-visual')||document.querySelector('.destination-scene');if(!host||host===activeHost)return;
 window.stopUniverse();activeHost=host;const ticket=generation,hero=host.id==='universe';let canvas=host.querySelector('canvas');if(!canvas){canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');host.append(canvas)}
 let T;try{T=await library}catch{if(ticket===generation)fallback(host,canvas);return}if(ticket!==generation||!host.isConnected)return;
 let renderer;try{renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'})}catch{fallback(host,canvas);return}
 canvas.dataset.renderer='webgl';renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.35:1.65));renderer.setClearColor(0,0);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(40,1,.1,100);camera.position.z=8.5;
 const count=hero?(innerWidth<700?14000:26000):10000,geometry=new T.BufferGeometry(),positions=new Float32Array(count*3),seeds=new Float32Array(count*3);let seed=91;const rand=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};
 for(let i=0;i<count;i++){seeds[i*3]=i/count;seeds[i*3+1]=rand();seeds[i*3+2]=rand()}
 geometry.setAttribute('position',new T.BufferAttribute(positions,3));geometry.setAttribute('aSeed',new T.BufferAttribute(seeds,3));
 const uniforms={uTime:{value:0},uPhase:{value:0},uPointer:{value:new T.Vector2()},uPixel:{value:renderer.getPixelRatio()},uScroll:{value:0}};
 const material=new T.ShaderMaterial({uniforms,transparent:true,depthWrite:false,blending:T.AdditiveBlending,vertexShader:`
 attribute vec3 aSeed;uniform float uTime,uPhase,uPixel,uScroll;uniform vec2 uPointer;varying vec3 vColor;varying float vAlpha;
 #define PI 3.14159265
 void main(){
 float t=uTime;float u=aSeed.x;float v=aSeed.y;float w=aSeed.z;
 float phi=acos(1.0-2.0*u);float theta=2.39996323*floor(u*26000.0);
 float ripple=1.0+.10*sin(phi*8.0+theta*3.0+t*.7)+.06*cos(theta*5.0-t*.5);
 vec3 sphere=vec3(sin(phi)*cos(theta),cos(phi),sin(phi)*sin(theta))*1.85*ripple;
 float arm=floor(v*4.0);float radius=.25+pow(u,.65)*2.4;float angle=arm*PI*.5+radius*1.8+t*.08+(w-.5)*.32;
 vec3 galaxy=vec3(cos(angle)*radius,(v*4.0-arm-.5)*.32+sin(radius*3.0+t)*.08,sin(angle)*radius);
 galaxy.yz=mat2(.75,-.66,.66,.75)*galaxy.yz;
 float spiral=u*PI*7.0;float tube=.18+v*.3;vec3 helix=vec3(cos(spiral)*(.95+tube*cos(w*PI*2.0)),(u-.5)*4.0+sin(w*PI*2.0)*tube,sin(spiral)*(.95+tube*cos(w*PI*2.0)));
 helix.xy=mat2(.94,-.34,.34,.94)*helix.xy;
 vec3 p=mix(sphere,galaxy,clamp(uPhase,0.0,1.0));p=mix(p,helix,clamp(uPhase-1.0,0.0,1.0));
 vec3 terrain=vec3((u-.5)*5.0,0.0,(v-.5)*4.0);terrain.y=sin(terrain.x*2.0+t*.35)*.3+cos(terrain.z*2.2+t*.25)*.4+sin(terrain.x+terrain.z+t*.2)*.4;terrain.yz=mat2(.85,-.53,.53,.85)*terrain.yz;p=mix(p,terrain,clamp(uPhase-2.0,0.0,1.0));
 vec3 lattice=vec3((floor(u*30.0)/29.0-.5)*3.4,(floor(v*30.0)/29.0-.5)*3.4,(floor(w*30.0)/29.0-.5)*3.4);lattice*=.9+.05*sin(length(lattice)*3.0-t);lattice.xy=mat2(.94,-.34,.34,.94)*lattice.xy;p=mix(p,lattice,clamp(uPhase-3.0,0.0,1.0));
 float rot=t*.065+uPointer.x*.22+uScroll*.28;p.xz=mat2(cos(rot),-sin(rot),sin(rot),cos(rot))*p.xz;
 float dist=length(p.xy-uPointer*2.5);p.xy+=(p.xy-uPointer*2.5)*exp(-dist*dist*2.5)*.13;
 p.y+=sin(t*.35)*.045;p.yz=mat2(cos(uPointer.y*.1),-sin(uPointer.y*.1),sin(uPointer.y*.1),cos(uPointer.y*.1))*p.yz;
 vec3 mint=vec3(.50,1.0,.78),violet=vec3(.54,.35,1.0),cyan=vec3(.25,.72,1.0),gold=vec3(1.0,.66,.38);
 vColor=mix(violet,mint,smoothstep(-1.4,1.3,p.y));vColor=mix(vColor,mix(cyan,mint,w),clamp(uPhase,0.0,1.0));vColor=mix(vColor,mix(gold,vec3(.92,.9,.8),u),clamp(uPhase-1.0,0.0,1.0));
 vColor=mix(vColor,mix(vec3(.35,.75,1.),vec3(.7,.45,1.),v),clamp(uPhase-2.0,0.0,1.0));
 vec4 mv=modelViewMatrix*vec4(p,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp((1.9+w*1.4)*uPixel*(7.0/-mv.z),1.0,5.0);vAlpha=(.3+w*.5)*smoothstep(-2.4,.8,p.z);
 }`,fragmentShader:`varying vec3 vColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=pow(1.0-d*2.0,1.5)*vAlpha;gl_FragColor=vec4(vColor,a);}`});
 const cloud=new T.Points(geometry,material);cloud.frustumCulled=false;scene.add(cloud);
 // Fine elliptical orbital trails establish depth without obstructing the interface.
 const rings=new T.Group();scene.add(rings);for(let j=0;j<3;j++){const pts=[];for(let i=0;i<=200;i++){const a=i/200*Math.PI*2;pts.push(new T.Vector3(Math.cos(a)*(2.5+j*.12),Math.sin(a)*(2.5+j*.12),0))}const line=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:[0xa4ffd5,0x6d7ad9,0x8bc1d8][j],transparent:true,opacity:.10}));line.rotation.set(.8+j*.35,.3+j*.2,j*.6);rings.add(line)}
 const starGeo=new T.BufferGeometry(),stars=new Float32Array(600*3);for(let i=0;i<600;i++){stars[i*3]=(rand()-.5)*13;stars[i*3+1]=(rand()-.5)*9;stars[i*3+2]=-rand()*5}starGeo.setAttribute('position',new T.BufferAttribute(stars,3));const starfield=new T.Points(starGeo,new T.PointsMaterial({color:0xb3cde6,size:.011,transparent:true,opacity:.48,depthWrite:false}));scene.add(starfield);
 let raf=0,time=0,last=performance.now(),visible=true,dirty=true,tx=0,ty=0,px=0,py=0,targetPhase=hero?0:Math.floor(Number(location.hash.split('/')[1]||0)/3),phase=targetPhase,scroll=0;targetPhase=host.dataset.scene?Number(host.dataset.scene):targetPhase;phase=targetPhase;
 const resize=()=>{const r=host.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();dirty=true};const ro=new ResizeObserver(resize);ro.observe(host);resize();
 const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;dirty=true});io.observe(host);
 const move=e=>{const r=host.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=-((e.clientY-r.top)/r.height-.5)*2;dirty=true},leave=()=>{tx=ty=0;dirty=true};const surface=host.closest('.discovery-stage')||host;surface.addEventListener('pointermove',move,{passive:true});surface.addEventListener('pointerleave',leave);
 const change=()=>{dirty=true},select=e=>{targetPhase=e.detail.phase;dirty=true},onScroll=()=>{scroll=Math.max(-1,Math.min(1,host.getBoundingClientRect().top/innerHeight));dirty=true};window.addEventListener('rrh:motion',change);window.addEventListener('rrh:phase',select);window.addEventListener('scroll',onScroll,{passive:true});
 const frame=now=>{raf=requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.04);last=now;if(!visible||document.hidden)return;if(paused()&&!dirty)return;if(!paused()){time+=dt;px+=(tx-px)*.035;py+=(ty-py)*.035;phase+=(targetPhase-phase)*Math.min(1,dt*2.5)}else phase=targetPhase;
 uniforms.uTime.value=time;uniforms.uPhase.value=phase;uniforms.uPointer.value.set(px,py);uniforms.uScroll.value=paused()?0:scroll;rings.rotation.y=time*.035;rings.rotation.z=phase*.25;renderer.render(scene,camera);dirty=false};raf=requestAnimationFrame(frame);
 cleanup=()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();surface.removeEventListener('pointermove',move);surface.removeEventListener('pointerleave',leave);window.removeEventListener('rrh:motion',change);window.removeEventListener('rrh:phase',select);window.removeEventListener('scroll',onScroll);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose()});renderer.dispose();renderer.forceContextLoss()};
 };
 function fallback(host,canvas){canvas.remove();host.classList.add('atlas-fallback');host.insertAdjacentHTML('beforeend','<div class="fallback-orb" aria-hidden="true"></div>');cleanup=()=>host.querySelector('.fallback-orb')?.remove()}
 window.addEventListener('rrh:route',()=>window.startUniverse());window.startUniverse();
})();
