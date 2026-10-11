/* Original optical instruments. Built with the existing local Three.js renderer. */
window.REIOpticalModel=function(T,group,index){
 const steel=new T.MeshPhysicalMaterial({color:0xc8cfd9,metalness:.94,roughness:.22,clearcoat:1,envMapIntensity:1.4});
 const dark=new T.MeshStandardMaterial({color:0x202733,metalness:.8,roughness:.36});
 const glass=new T.MeshPhysicalMaterial({color:0xc5dce5,metalness:.15,roughness:.16,transparent:true,opacity:.5,depthWrite:false,clearcoat:1,iridescence:.25});
 const mesh=(geometry,material=steel,parent=group)=>{const m=new T.Mesh(geometry,material);parent.add(m);return m};
 const ring=(r,t=.045,parent=group)=>mesh(new T.TorusGeometry(r,t,12,64),steel,parent);
 const bar=(a,b,r=.035)=>{const start=new T.Vector3(...a),end=new T.Vector3(...b),rod=mesh(new T.CylinderGeometry(r,r,start.distanceTo(end),10));rod.position.copy(start.clone().add(end).multiplyScalar(.5));rod.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),end.sub(start).normalize());return rod};
 const ball=(position,r=.19,material=steel)=>{const m=mesh(new T.SphereGeometry(r,20,14),material);m.position.set(...position);return m};
 const k=Math.max(0,Math.min(8,index));
 if(k===0){ring(1.35,.085);ring(1.13,.028);const lens=mesh(new T.SphereGeometry(1.08,32,20),glass);lens.scale.z=.17;for(let i=0;i<8;i++){const a=i*Math.PI/4,m=mesh(new T.BoxGeometry(.32,.05,.07),dark);m.position.set(Math.cos(a)*1.35,Math.sin(a)*1.35,.04);m.rotation.z=a}ring(.47,.035).rotation.y=.5;ball([0,0,.2],.32)}
 if(k===1||k===7){for(let i=0;i<5;i++){const sheet=mesh(new T.BoxGeometry(k===7?1.7:2.15,k===7?2.05:1.4,.04),i%2?glass:steel);sheet.position.set((i-2)*.14,(i-2)*.1,(i-2)*.23);sheet.rotation.y=(i-2)*.12;const edge=mesh(new T.BoxGeometry(1.2,.028,.035),dark,sheet);edge.position.set(-.1,.36,.03)}group.rotation.z=k===7?-.15:.14}
 if(k===2){const prism=mesh(new T.CylinderGeometry(1.2,1.2,.65,3),glass);prism.rotation.x=Math.PI/2;for(let i=0;i<3;i++){const a=i*Math.PI*2/3;ball([Math.sin(a)*1.2,Math.cos(a)*1.2,0],.14);const r=ring(.52,.035);r.position.set(Math.sin(a)*.5,Math.cos(a)*.5,.42)}ring(1.55,.025)}
 if(k===3){ball([0,0,0],.4,glass);const points=[[-1.1,.75,.25],[1.1,.75,-.3],[-.8,-.95,-.3],[.95,-.7,.5]];points.forEach(a=>{ball(a,.23);bar([0,0,0],a,.045)});ring(.54,.04).rotation.y=.8}
 if(k===4){mesh(new T.TorusKnotGeometry(.86,.095,100,12,2,3));const inner=mesh(new T.SphereGeometry(.49,24,16),glass);inner.scale.y=1.25;ring(1.42,.025).rotation.x=.7;ring(1.42,.025).rotation.y=.7}
 if(k===5){bar([-1.3,.45,0],[1.3,.45,0],.055);bar([0,-1.2,0],[0,1.05,0],.055);ball([0,.45,0],.16);for(const x of [-1.05,1.05]){bar([x,.45,0],[x,-.55,0],.025);const tray=mesh(new T.CylinderGeometry(.42,.3,.11,40),glass);tray.position.set(x,-.6,0);const r=ring(.43,.04);r.rotation.x=Math.PI/2;r.position.set(x,-.55,0)}const base=mesh(new T.CylinderGeometry(.65,.75,.13,40),dark);base.position.y=-1.23}
 if(k===6){for(let i=0;i<3;i++){const r=ring(1.24+i*.05,.045);r.rotation.x=i*.7;r.rotation.y=i*.85}ball([0,0,0],.36,glass);ball([1.27,0,0],.14);ball([0,1.28,0],.14);bar([-1.45,0,0],[1.45,0,0],.025)}
 if(k===8){ring(1.32,.07);ring(1.17,.025);for(let i=0;i<8;i++){const a=i*Math.PI/4,b=mesh(new T.BoxGeometry(.72,.28,.045));b.position.set(Math.cos(a)*.69,Math.sin(a)*.69,i*.007);b.rotation.z=a+.7}ball([0,0,-.2],.38,glass)}
 group.rotation.x=.3;group.rotation.y=-.4;group.userData.optical=true;
};
