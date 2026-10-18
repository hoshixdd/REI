const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const project={id:'fictional',papers:[]},results={innerHTML:''},search={disabled:false};
const form={querySelector:()=>search};const section={querySelector:s=>s==='form'?form:results};
let reject=true,calls=0;
const context={window:{REIWorkbench:{getProject:()=>project,saveProject:async p=>{assert.equal(p,project);calls++;if(reject)throw Error('Storage full')}}},document:{querySelector:s=>s==='.wb-tools'?{before(){}}:null,createElement:()=>section},location:{hash:'#research/fictional/library'},addEventListener(){},crypto:{randomUUID:()=> 'source'},FormData:class{get(){return 'fictional query'}},fetch:async()=>({ok:true,json:async()=>({results:[]})}),AbortSignal,encodeURIComponent,decodeURIComponent};
vm.runInNewContext(fs.readFileSync(require.resolve('../dist/discovery.js'),'utf8'),context);
const button={dataset:{save:encodeURIComponent(JSON.stringify({title:'Fictional source',doi:'',year:'',authors:'',url:'',venue:''}))},disabled:false};
const click=()=>results.onclick({target:{closest:()=>button}});
(async()=>{await click();assert.equal(project.papers.length,0);assert.equal(button.disabled,false);assert.match(button.textContent,/retry/);reject=false;await click();assert.equal(project.papers.length,1);assert.equal(button.disabled,true);assert.equal(calls,2);await click();assert.equal(calls,2);await form.onsubmit({preventDefault(){}});assert.equal(search.disabled,false);console.log('PASS: OpenAlex failed save rolls back one source, allows retry, captures destination and prevents duplicate clicks.');})().catch(e=>{console.error(e);process.exitCode=1});
