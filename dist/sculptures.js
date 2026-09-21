/* REI particle fields and glass brand mark. One shared WebGL context paints visible illustrations.
   The semantic UI does not depend on WebGL. Motion follows the user's preference. */
(async()=>{
 let T;try{T=await import('./vendor/three.module.js')}catch{return}
 let renderer;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{return}
 renderer.setPixelRatio(1);renderer.setClearColor(0,0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
 // A locally drawn studio environment supplies broad reflections, without network assets.
 const env=document.createElement('canvas');env.width=1024;env.height=512;const ec=env.getContext('2d');ec.fillStyle='#121a31';ec.fillRect(0,0,1024,512);
 const bands=[[80,100,'#d6f4ff'],[360,70,'#90a8ff'],[600,130,'#ffffff'],[890,40,'#ffcfb0']];bands.forEach(([x,w,c])=>{const g=ec.createLinearGradient(x,0,x+w,0);g.addColorStop(0,'#121a31');g.addColorStop(.5,c);g.addColorStop(1,'#121a31');ec.fillStyle=g;ec.fillRect(x,30,w,450)});
 const texture=new T.CanvasTexture(env);texture.mapping=T.EquirectangularReflectionMapping;texture.colorSpace=T.SRGBColorSpace;const pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromEquirectangular(texture).texture;texture.dispose();pmrem.dispose();
 const models=new Map();
 function model(kind){if(kind!=='logo')kind='field';if(models.has(kind))return models.get(kind);const scene=new T.Scene();scene.environment=environment;const camera=new T.PerspectiveCamera(36,1,.1,50);camera.position.z=7.5;const object=new T.Group();scene.add(object);scene.add(new T.HemisphereLight(0xddeeff,0x1e2340,2));const light=new T.DirectionalLight(0xffffff,4);light.position.set(3,4,5);scene.add(light);const rim=new T.DirectionalLight(0xb3a2ff,3);rim.position.set(-3,-2,2);scene.add(rim);
 const color=['#b5e7ff','#bbb2ff','#e3bfaa'][Number(kind)||0];const material=new T.MeshPhysicalMaterial({color,metalness:.72,roughness:.13,clearcoat:1,iridescence:.65,envMapIntensity:1.8});const glass=new T.MeshPhysicalMaterial({color:0xdcecff,metalness:.12,roughness:.08,transmission:.65,thickness:.65,ior:1.45,clearcoat:1,envMapIntensity:2});
 const add=(g,m=material)=>{const mesh=new T.Mesh(g,m);object.add(mesh);return mesh};
 if(kind==='logo'){add(new T.TorusKnotGeometry(1,.36,128,24,2,3),glass);const inner=add(new T.TorusKnotGeometry(.98,.12,100,16,2,3));inner.rotation.z=.1;camera.position.z=5.7;}
 else{
 const count=16000,seeds=new Float32Array(count*3);let seed=91;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};for(let i=0;i<count;i++){seeds[i*3]=i/count;seeds[i*3+1]=random();seeds[i*3+2]=random()}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(new Float32Array(count*3),3));geometry.setAttribute('aSeed',new T.BufferAttribute(seeds,3));
 const particles=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uTime:{value:0},uKind:{value:0},uResolution:{value:400},uPointer:{value:new T.Vector2()},uForce:{value:0},uBurst:{value:0}},vertexShader:`
 attribute vec3 aSeed;uniform float uTime,uKind,uResolution,uForce,uBurst;uniform vec2 uPointer;varying vec3 vColor;varying float vAlpha;
 #define PI 3.14159265
 void main(){float u=aSeed.x,v=aSeed.y,w=aSeed.z,t=uTime,k=mod(uKind,12.),variation=floor(uKind/12.);float a=u*PI*2.;vec3 p;
 if(k<.5){float x=(u-.5)*4.2;float band=(v-.5)*.65;p=vec3(x,sin(x*1.8+t*.45)*.65+band*cos(x+t*.2),band*sin(x+t*.2)+(w-.5)*.24);}
 else if(k<1.5){float r=.18+pow(u,.65)*1.95;float angle=floor(v*5.)*PI*.4+r*2.8+t*.1+(w-.5)*.38;p=vec3(cos(angle)*r,(fract(v*5.)-.5)*.15,sin(angle)*r);p.yz=mat2(.67,-.74,.74,.67)*p.yz;}
 else if(k<2.5){float phi=acos(1.-2.*u),theta=v*2.*PI;float r=1.45+.18*sin(phi*7.+theta*3.+t*.45);p=vec3(sin(phi)*cos(theta),cos(phi),sin(phi)*sin(theta))*r;}
 else if(k<3.5){float x=(u-.5)*3.8,z=(v-.5)*2.7;p=vec3(x,sin(x*2.+t*.5)*.36+cos(z*2.+t*.3)*.3,z);p.yz=mat2(.82,-.57,.57,.82)*p.yz;}
 else if(k<4.5){float theta=u*PI*6.+floor(v*2.)*PI+t*.1;p=vec3(cos(theta)*.9+(w-.5)*.18,(u-.5)*3.4,sin(theta)*.9+(fract(v*2.)-.5)*.2);}
 else if(k<5.5){float r=.18+u*1.65,theta=v*PI*2.+u*9.+t*.3;p=vec3(cos(theta)*r,(1.-u)*1.1-.5,sin(theta)*r);p.yz=mat2(.8,-.6,.6,.8)*p.yz;}
 else if(k<6.5){float theta=v*PI*2.,r=1.18+.3*cos(theta);p=vec3(cos(a)*r,sin(theta)*.3+sin(a*3.+t*.3)*.3,sin(a)*r);}
 else if(k<7.5){float width=(v-.5)*.28;p=vec3(sin(a)*1.75, sin(a*2.+t*.2)*.65+width,cos(a)*width+(w-.5)*.22);}
 else if(k<8.5){float theta=v*PI*2.;p=vec3(cos(theta)*u*1.65,(u-.45)*3.,sin(theta)*u*1.65);p.y+=sin(theta*4.+t*.45)*u*.25;}
 else if(k<9.5){float layer=floor(v*8.);p=vec3((u-.5)*3.8,(layer-3.5)*.22+sin(u*7.+layer*.3+t*.35)*.4,(fract(v*8.)-.5)*.4+(w-.5)*.1);}
 else if(k<10.5){float cluster=floor(u*6.),phi=acos(1.-2.*v),theta=w*PI*2.;vec3 center=vec3(cos(cluster*PI/3.)*1.15,sin(cluster*PI/3.)*1.05,sin(cluster*2.)*.4);p=center+vec3(sin(phi)*cos(theta),cos(phi),sin(phi)*sin(theta))*.35;}
 else{float strand=floor(v*3.),theta=u*PI*3.+strand*2.09;p=vec3(cos(theta)*(1.+u*.3),sin(theta*.7+t*.3)*.6+(strand-1.)*.25,(u-.5)*3.2);}
 p.y+=sin(p.x*2.+t*.4+variation)*.07*variation;
 float shimmer=.8+.2*sin(u*30.+t*.65);vColor=mix(vec3(.17,.48,.86),vec3(.55,1.,1.),smoothstep(-1.6,1.6,p.y));vColor=mix(vColor,vec3(.73,.57,1.),mod(uKind,3.)*.15*w);
 vec4 mv=modelViewMatrix*vec4(p,1.);vec2 delta=mv.xy-uPointer;float d=length(delta);float force=exp(-d*d*2.8)*uForce;mv.xy+=normalize(delta+vec2(.001))*(force*.85+uBurst*exp(-d*d*.8)*.8);mv.z+=sin(u*130.+v*41.)*force*.65;mv.xy+=vec2(sin(v*85.),cos(w*91.))*force*.2;
 gl_Position=projectionMatrix*mv;gl_PointSize=clamp((1.7+w*1.4)*(uResolution/440.)*6./-mv.z,1.15,4.);vAlpha=(.55+w*.45)*shimmer*(.65+.35*smoothstep(-1.8,1.8,p.z));
 }`,fragmentShader:`varying vec3 vColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vColor,pow(1.-d*2.,1.15)*vAlpha);}`});
 const cloud=new T.Points(geometry,particles);cloud.frustumCulled=false;object.add(cloud);object.userData.particles=particles;
 }
 const data={scene,camera,object};models.set(kind,data);return data;}
 let pointer={x:-1,y:-1};addEventListener('pointermove',e=>{pointer={x:e.clientX,y:e.clientY}},{passive:true});addEventListener('pointerout',e=>{if(!e.relatedTarget)pointer={x:-1,y:-1}});addEventListener('pointerdown',e=>{for(const h of hosts){const r=h.el.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)h.burst=1;}},{passive:true});
 let hosts=[],dirty=true,last=0,time=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const paused=()=>reduced.matches||document.documentElement.dataset.motion==='off';
 const scan=()=>{hosts=[...document.querySelectorAll('[data-sculpture]')].map(el=>({el,canvas:el.querySelector('canvas'),kind:el.dataset.sculpture})).filter(h=>h.canvas);dirty=true;};
 const observer=new MutationObserver(scan);observer.observe(document.querySelector('#main'),{childList:true,subtree:true});scan();
 addEventListener('resize',()=>dirty=true);addEventListener('scroll',()=>dirty=true,{passive:true});addEventListener('rrh:motion',()=>dirty=true);reduced.addEventListener('change',()=>dirty=true);
 function frame(now){requestAnimationFrame(frame);if(document.hidden||now-last<33||paused()&&!dirty)return;const dt=Math.min((now-last)/1000,.1);last=now;if(!paused())time+=dt;
 for(const h of hosts){if(!h.el.isConnected)continue;const r=h.el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width||!r.height)continue;const size=h.kind==='logo'?96:Math.min(520,Math.round(r.width*devicePixelRatio));const height=Math.max(1,Math.round(size*r.height/r.width));const m=model(h.kind);m.camera.aspect=size/height;m.camera.position.z=h.kind==='logo'?5.7:7.8/Math.min(1,m.camera.aspect);m.camera.updateProjectionMatrix();if(m.object.userData.particles){m.object.userData.particles.uniforms.uTime.value=time;m.object.userData.particles.uniforms.uResolution.value=size;}m.object.rotation.y=h.kind==='logo'?.35+Math.sin(time*.3)*.35:Math.sin(time*.12)*.18;const over=pointer.x>=r.left&&pointer.x<=r.right&&pointer.y>=r.top&&pointer.y<=r.bottom;const targetX=over&&!paused()?(pointer.y-r.top-r.height/2)/r.height*.3:0;const targetY=over&&!paused()?(pointer.x-r.left-r.width/2)/r.width*.4:0;h.tiltX=(h.tiltX||0)+(targetX-(h.tiltX||0))*.12;h.tiltY=(h.tiltY||0)+(targetY-(h.tiltY||0))*.12;m.object.rotation.x=h.tiltX;m.object.rotation.y+=h.tiltY;if(m.object.userData.particles){const uniforms=m.object.userData.particles.uniforms;h.force=(h.force||0)+((over&&!paused()?1:0)-(h.force||0))*.12;h.burst=paused()?0:(h.burst||0)*.87;const half=m.camera.position.z*Math.tan(18*Math.PI/180);uniforms.uPointer.value.set(((pointer.x-r.left)/r.width-.5)*2*half*m.camera.aspect,-((pointer.y-r.top)/r.height-.5)*2*half);uniforms.uForce.value=paused()?0:h.force;uniforms.uBurst.value=h.burst;uniforms.uKind.value=Number(h.kind)||0;}m.object.rotation.z=Math.sin(time*.3)*.06;m.object.position.y=Math.sin(time*.6)*.055;renderer.setSize(size,height,false);renderer.render(m.scene,m.camera);if(h.canvas.width!==size||h.canvas.height!==height){h.canvas.width=size;h.canvas.height=height}const ctx=h.canvas.getContext('2d');ctx.clearRect(0,0,size,height);ctx.drawImage(renderer.domElement,0,0);h.el.classList.add('sculpture-ready');}
 dirty=false;}requestAnimationFrame(frame);
})();
