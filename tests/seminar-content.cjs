const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
let last=null;const ctx={window:{REILearningStore:{snapshot:()=>({resume:null})}},document:{addEventListener(){}},localStorage:{getItem:()=>last}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(require.resolve('../dist/seminar.js'),'utf8'),ctx);const S=ctx.window.REISeminar;
for(const bad of ['https://example.com','#research/../../private','#learn/7','#lesson/200/write','#library/<script>','#tools/unknown']){last=bad;assert.equal(S.resume(),'#learn','Only validated internal study routes can be resumed');}
for(const good of ['#library/ethics','#lesson/2/write','#learn/4','#workbook','#research/project-1/proposal','#create/search']){last=good;assert.equal(S.resume(),good);}
ctx.localStorage.getItem=()=>{throw Error('Storage blocked')};assert.equal(S.resume(),'#learn');
const recap=S.render(['recap']);assert.equal((recap.match(/<strong>Now do this:/g)||[]).length,6);assert.match(recap,/fictional/);
const chapter=S.render(['chapters']);for(let i=1;i<=4;i++)assert.ok(chapter.includes('Chapter '+i+':'));assert.equal((chapter.match(/<dt>Common mistake<\/dt>/g)||[]).length,4);assert.match(chapter,/Never invent results/);
const ethics=S.render(['library','ethics']);for(const term of ['APA 7','paraphrase','consent','withdrawal','AI','not graded or saved'])assert.ok(ethics.includes(term));
assert.match(S.templateText('peer'),/Next revision/);assert.match(S.templateText('pitch'),/2:40–3:00/);assert.match(S.workbookIntro(),/data-recovery-export/);assert.match(S.workbookIntro(),/Clearing browser data/);
const root=path.resolve(__dirname,'..'),manifest=require('../assets.json'),html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');assert.equal((html.match(/<script src=/g)||[]).length,2);
for(const name of ['rei-core.js','rei-app.js'])new vm.Script(fs.readFileSync(path.join(root,'dist',name),'utf8'));
const scripts=manifest.scripts,split=scripts.indexOf('app.js');assert.ok(scripts.indexOf('seminar.js')<split);assert.equal(scripts.at(-1),'seminar-shell.js');
const source=fs.readFileSync(path.join(root,'dist/seminar-shell.js'),'utf8');assert.match(source,/id="note-count"/,'Repeated navigation must retain the counter required by the router');
assert.match(html,/og:image/);const image=fs.readFileSync(path.join(root,'dist/share-preview.png'));assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);
console.log('PASS: safe resume routes, storage failure fallback, recap/chapter/ethics coverage, templates, complete backup entry, ordered two-bundle syntax and share-image dimensions.');
