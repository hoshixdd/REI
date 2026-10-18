const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),C=require('../dist/workbench-core.js');
const handlers={},p={id:'fictional',title:'Test',question:'Question',papers:[],evidence:[],edges:[],proposal:''};C.normalize(p);
let reject=true,clears=0;const messages=[];
const context={window:{REICore:C},document:{addEventListener:(name,fn)=>(handlers[name]??=[]).push(fn),querySelector:()=>null},addEventListener(){},structuredClone,crypto:{randomUUID:()=> 'record-'+Math.random()},FormData:class{constructor(f){return Object.entries(f.data)}},sessionStorage:{removeItem:()=>clears++},toast:x=>messages.push(x),location:{hash:'#research/fictional/claims'},confirm:()=>true};
vm.createContext(context);vm.runInContext(fs.readFileSync(require.resolve('../dist/save-policy.js'),'utf8'),context);vm.runInContext(fs.readFileSync(require.resolve('../dist/workbench.js'),'utf8'),context);
context.window.REIWorkbench.connect({get:()=>p,save:async target=>{assert.equal(target,p);if(reject)throw Error('Storage full')},render(){}});
const form=(kind,data)=>({dataset:{wbForm:kind},data,matches:()=>true,querySelector:()=>({disabled:false})});
const submit=f=>handlers.submit[0]({target:f,preventDefault(){}});
(async()=>{
 for(const [kind,data,list] of [['claim',{text:'Fictional claim'},'claims'],['decision',{text:'Fictional decision'},'decisions'],['search',{query:'Fictional query'},'searches'],['reviewAction',{text:'Review this',area:'design'},'reviewActions']]){
  const f=form(kind,data);await submit(f);assert.equal(p.workbench[list].length,0,kind+' rolls back');assert.deepEqual(f.data,data);assert.equal(f.dataset.saving,undefined);assert.equal(clears,0);
  reject=false;await submit(f);assert.equal(p.workbench[list].length,1,kind+' retries once');reject=true;clears=0;
 }
 const claim=p.workbench.claims[0];const button={dataset:{wb:'claim-remove',value:claim.id}};await handlers.click[0]({target:{closest:()=>button}});assert.equal(p.workbench.claims.length,1,'Failed delete restores claim');assert.equal(button.dataset.saving,undefined);
 assert.ok(messages.some(x=>/Storage full/.test(x)));console.log('PASS: failed claim, decision, search and action saves retain drafts, retry once, and restore failed claim deletion.');
})().catch(e=>{console.error(e);process.exitCode=1});
