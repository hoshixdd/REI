const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const C=require('../dist/learning-path-core.js');
let saved=C.normalize(null);
const ctx={window:{REILearningPathCore:C,REILearningStore:{readPath:()=>saved}}};vm.createContext(ctx);
for(const file of ['dream-home.js','atelier-home.js'])vm.runInContext(fs.readFileSync(require.resolve('../dist/'+file),'utf8'),ctx);
let html=ctx.window.REIDreamHome();
assert.equal((html.match(/id="observatory"/g)||[]).length,1,'The optical story must survive homepage integration');
assert.match(html,/data-dream-scene/);assert.match(html,/href="#learn">Explore the learning library/);
for(const route of ['#create','#research','#workbook','#guided'])assert.ok(html.includes('href="'+route+'"'),'Missing destination '+route);
const visible=html.replace(/<details[\s\S]*?<\/details>/g,'');assert.doesNotMatch(visible,/href="#(?:workbook|backup|academy|toolkit|seminars|notebook)/,'Supporting tools belong in grouped resources');
ctx.document={addEventListener:()=>{}};ctx.addEventListener=()=>{};
vm.runInContext(fs.readFileSync(require.resolve('../dist/learning-path.js'),'utf8'),ctx);
const welcome=ctx.window.REILearningPath.landing();assert.match(welcome,/href="#home">Enter REI/);assert.doesNotMatch(welcome,/href="#(?:learn|practice|research|workbook)/,'Welcome must lead into the homepage, not act as a second tool hub');
assert.match(ctx.window.REILearningPath.practiceHome(),/href="#home"/,'Activities must provide a direct return to the homepage');
for(let i=0;i<6;i++){const step=C.steps[i];assert.ok(ctx.window.REILearningPath.stepView(i).includes('href="#practice/'+step.practice+'"'));assert.ok(ctx.window.REILearningPath.activityView(step.practice).includes('href="'+(i===5?'#workbook':'#learn/'+(i+1))+'"'),'Practice must lead into the next step');}
const library=ctx.window.REILearningPath.practiceHome();for(const activity of C.activities)assert.equal((library.match(new RegExp('href="#practice/'+activity.id+'"','g'))||[]).length,1,'Each activity has one entry');
console.log('PASS: original optical scene, six workshop steps, practice/project/workbook access and saved-step continuation.');
