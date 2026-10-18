const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../dist/research.js'),'utf8');
const start=source.indexOf(" document.addEventListener('submit',async ev=>{const f=ev.target;");
const end=source.indexOf(" document.addEventListener('input',ev=>",start);
let handler,reject=true,duringSave=null,clears=0,renders=0,errors=0;
const context={window:{REIWorkbench:{history(){},normalize:p=>p.workbench}},structuredClone,location:{hash:''},document:{addEventListener:(type,fn)=>handler=fn},FormData:class{constructor(f){return Object.entries(f.data)}},persist:async()=>{duringSave?.();if(reject)throw Error('Storage full')},clearFormDraft:()=>clears++,render:()=>renders++,statusError:()=>errors++,toast(){},id:()=> 'created',doi:s=>s||'',unsaved:new Map(),projects:[],projectTemplates:{blank:{question:''}}};
vm.createContext(context);vm.runInContext(fs.readFileSync(require.resolve('../dist/save-policy.js'),'utf8'),context);
vm.runInContext("let current=null;"+source.slice(start,end)+";globalThis.set=p=>current=p;globalThis.get=()=>current;",context);
const original={id:'original',title:'Old',question:'Question',papers:[],evidence:[],edges:[],proposal:'Draft',workbench:{}};
const form=(id,data)=>({id,data,dataset:{},isConnected:true,querySelector:()=>({disabled:false})});
const submit=f=>handler({target:f,preventDefault(){}});
(async()=>{
 context.set(original);const edit=form('project-edit',{title:'New',question:'Question'});duringSave=()=>original.proposal='Concurrent writing';await submit(edit);assert.equal(original.title,'Old');assert.equal(original.proposal,'Concurrent writing');assert.equal(edit.data.title,'New');assert.equal(clears,0);assert.equal(edit.dataset.saving,undefined);
 const create=form('project-create',{title:'New project',question:'',template:'blank'});duringSave=null;await submit(create);assert.equal(context.get(),original,'Failed create restores prior current project');
 const paper=form('paper-add',{title:'Fictional source',doi:'',year:'',collection:''});await submit(paper);assert.equal(original.papers.length,0);assert.equal(paper.data.title,'Fictional source');assert.equal(clears,0);
 reject=false;await submit(paper);assert.equal(original.papers.length,1);assert.equal(clears,1);assert.equal(renders,1);
 const other={id:'other',proposal:'Keep this'};reject=true;duringSave=()=>context.set(other);await submit(edit);assert.equal(context.get(),other);assert.equal(other.proposal,'Keep this');assert.equal(original.title,'Old');
 assert.equal(errors,4);console.log('PASS: failed create/edit/add retain form text, retry succeeds, route changes and concurrent writing survive.');
})().catch(e=>{console.error(e);process.exitCode=1});
