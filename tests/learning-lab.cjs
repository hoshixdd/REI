const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const C=require('../dist/learning-lab-core.js');
for(const c of Object.values(C.cases)){
 assert.equal(c.stages.length,9);
 assert.equal(c.sources.length,3);
 for(const s of c.sources)assert.match(s.method,/Invented/);
 for(const s of c.stages)for(const k of ['draft','reason','limit'])assert.ok(s[k].length>40);
}
assert.equal(C.practice.flat().length,27);
for(let stage=0;stage<9;stage++)for(let n=0;n<3;n++){
 const q=C.practice[stage][n];assert.equal(q.why.length,3);
 for(let choice=0;choice<3;choice++){
  const f=C.feedback(stage,n,choice);assert.equal(f.correct,choice===q.correct);assert.ok(f.text.length>30);
 }
 assert.equal(C.feedback(stage,n,7),null);
}
assert.deepEqual([0,3,8].map(i=>C.support(i,'auto')),['guided','hints','independent']);
assert.equal(C.support(8,'guided'),'guided');
const normalized=C.normalize({case:'bad',support:'bad',attempts:{0:{choices:[2,8,'1'],submitted:[1,8,2],reflection:'A reason',compared:true},9:{reflection:'outside'},evil:{reflection:'bad'}}});
assert.equal(normalized.case,'qualitative');assert.equal(normalized.support,'auto');
assert.deepEqual(normalized.attempts[0].choices,[2,null,null]);
assert.deepEqual(normalized.attempts[0].submitted,[null,null,null]);
assert.deepEqual(Object.keys(normalized.attempts),['0']);
assert.equal(C.normalize({attempts:{1:{reflection:' '.repeat(2),compared:true}}}).attempts[1].compared,false);
assert.equal(C.normalize({attempts:{1:{reflection:'x'.repeat(100001)}}}).attempts[1].reflection.length,100000);
for(const goal of ['experience','association','effect'])for(const collection of ['interview','survey','trial'])for(const sampling of ['volunteer','structured']){
 const d=C.decide(goal,collection,sampling);assert.equal(d.fit,{experience:'interview',association:'survey',effect:'trial'}[goal]===collection);
 assert.ok(d.need&&d.analysis&&d.claim&&d.reach&&d.explanation);
}
assert.match(C.decide('effect','survey','structured').claim,/does not establish an effect/);
assert.match(C.decide('effect','trial','volunteer').claim,/under a valid design/);
// Exercise the actual app startup, sanitize, save and export state, rather than a duplicate storage implementation.
const app=fs.readFileSync(path.join(root,'dist/app.js'),'utf8');
const boundary=app.indexOf('function nextLesson()');assert.ok(boundary>0);
const initial={version:2,notes:[],completed:[0],drafts:{0:'Keep my real draft'},quiz:{0:1},checks:[],learningLab:{case:'quantitative',support:'hints',attempts:{3:{choices:[1,2,0],submitted:[1,2,0],reflection:'Compare the measurements.',compared:true}}}};
let stored=JSON.stringify(initial),reject=false;
const context=vm.createContext({window:{REILearningLab:C},localStorage:{getItem:k=>k==='rrh-v2'?stored:null,setItem:(k,v)=>{if(reject)throw Error('quota');stored=v}},crypto:{randomUUID:()=> 'test-id'},document:{querySelector:()=>null},setTimeout,clearTimeout});
vm.runInContext(app.slice(0,boundary),context);
assert.equal(context.window.REILearningStore.read().case,'quantitative');
assert.equal(context.window.REILearningStore.read().attempts[3].reflection,'Compare the measurements.');
const updated=context.window.REILearningStore.read();updated.attempts[3].reflection='Revised explanation';
assert.equal(context.window.REILearningStore.write(updated),true);
assert.equal(JSON.parse(stored).drafts[0],'Keep my real draft');
assert.equal(JSON.parse(stored).completed[0],0);
assert.equal(JSON.parse(stored).learningLab.attempts[3].reflection,'Revised explanation');
const restored=vm.runInContext('sanitize(JSON.parse(localStorage.getItem("rrh-v2")))',context);
assert.equal(restored.learningLab.attempts[3].reflection,'Revised explanation');
// Old backups must reset new practice, not silently inherit the workspace being replaced.
context.oldBackup={version:2,notes:[],completed:[],drafts:{0:'Older draft'},quiz:{}};
assert.deepEqual(Object.keys(vm.runInContext('sanitize(oldBackup).learningLab.attempts',context)),[]);
assert.equal(vm.runInContext('sanitize(oldBackup).drafts[0]',context),'Older draft');
// A failed write retains the response in the current exported workspace without claiming persistence.
vm.runInContext('toast=()=>{}',context);reject=true;
updated.attempts[3].reflection='Keep this response when storage fails';
assert.equal(context.window.REILearningStore.write(updated),false);
assert.equal(context.window.REILearningStore.read().attempts[3].reflection,'Keep this response when storage fails');
assert.equal(JSON.parse(vm.runInContext('JSON.stringify(state)',context)).learningLab.attempts[3].reflection,'Keep this response when storage fails');
assert.equal(JSON.parse(stored).learningLab.attempts[3].reflection,'Revised explanation');
console.log('learning-lab: connected cases, 27 explanations, decision fit, backup compatibility and failed-storage preservation passed');
