const assert=require('node:assert/strict'),C=require('../dist/workbench-core.js');
const p={question:'Test',proposal:'Existing draft',papers:[{id:'s1',title:'First source',authors:'A',year:'2025',doi:'10.1/test'},{id:'s2',title:'Second source'}],evidence:[{id:'e1',paperId:'s1',findings:'First finding',limitations:'Small sample',locator:'page 3'},{id:'e2',paperId:'s1',findings:'Another finding'},{id:'e3',paperId:'s2',findings:'Contrasting finding',limitations:'Limited context',locator:'section 2'}]};
const w=C.normalize(p),code={id:'t',label:'Theme',definition:'Test theme',color:'#65dbff'};w.codes.push(code);C.validateWorkbench(p);C.normalize(p);assert.equal(code.conclusion,'','Older themes remain compatible');
w.coding.push({id:'1',evidenceId:'e1',codeId:'t',note:''},{id:'2',evidenceId:'e2',codeId:'t',note:''},{id:'3',evidenceId:'e3',codeId:'t',note:''});
const coverage=C.themeCoverage(p,'t');assert.equal(coverage.notes.length,3);assert.equal(coverage.sources.length,2,'Count sources, not coding assignments');assert.equal(coverage.missingLimitations.length,1);assert.equal(coverage.missingLocations.length,1);
assert.throws(()=>C.themeProposal(p,code),/interpretation/);
const values={conclusion:'A bounded interpretation.',agreement:'Some findings agree.',disagreement:'Methods may explain differences.',gaps:'Larger samples needed.'};
(async()=>{
 await assert.rejects(C.saveTheme(p,code,values,true,async()=>{throw Error('Storage full')}));assert.equal(p.proposal,'Existing draft');assert.equal(code.conclusion,'','Failed saves roll back theme and proposal');
 assert.equal(await C.saveTheme(p,code,values,true,async()=>{}),true);assert.match(p.proposal,/Existing draft/);assert.match(p.proposal,/First source — A \(2025\)/);assert.match(p.proposal,/https:\/\/doi.org\/10.1\/test/);assert.match(p.proposal,/Location: Not recorded/);assert.match(p.proposal,/Small sample/);
 const inserted=p.proposal;assert.equal(await C.saveTheme(p,code,values,true,async()=>{}),false);assert.equal(p.proposal,inserted,'Exact repeated transfers do not duplicate text');
 const restored=JSON.parse(JSON.stringify(p));C.validateWorkbench(restored);assert.equal(restored.workbench.codes[0].gaps,values.gaps,'Backup preserves conclusions');
 restored.workbench.codes[0].agreement=3;assert.throws(()=>C.validateWorkbench(restored),/conclusion/);
 p.proposal='x'.repeat(200000);await assert.rejects(C.saveTheme(p,code,{...values,conclusion:'Changed'},true,async()=>{}),/limit/);assert.equal(code.conclusion,values.conclusion);assert.equal(p.proposal.length,200000);
 console.log('PASS: distinct source coverage, old backups, conclusion validation, traceable proposal transfer, duplicate protection, limits and failed-save rollback.');
})().catch(error=>{console.error(error);process.exitCode=1});
