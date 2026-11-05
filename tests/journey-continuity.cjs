const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx={window:{},document:{addEventListener(){}},localStorage:{getItem:()=>null}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(require.resolve('../dist/seminar.js'),'utf8'),ctx);const S=ctx.window.REISeminar;
assert.equal(S.flow.length,7);assert.equal(new Set(S.flow.map(s=>s.id)).size,7);
for(const stage of S.flow){assert.match(stage.lesson,/^#library\//);assert.match(stage.write,/^#learn\/[0-5]$/);assert.ok(stage.idea&&stage.example&&stage.action);assert.equal(S.stageFor(stage.lesson).id,stage.id);assert.ok(S.journey().includes('id="flow-'+stage.id+'"'));}
assert.equal(S.stageFor('#create/question/question').id,'question');assert.equal(S.stageFor('#create/question').id,'method');assert.equal(S.stageFor('#create/papers').id,'read');assert.equal(S.stageFor('#lesson/0/example').id,'question');assert.equal(S.stageFor('#learn/4').id,'method');
assert.equal(S.stageFor('#practice/gap').id,'synthesis');assert.equal(S.stageFor('#research/p/reader').id,'read');assert.equal(S.stageFor('#resource/matrix').id,'synthesis');
assert.match(S.bridge(S.flow[0]),/href="#create\/question\/question"/);assert.match(S.bridge(S.flow[0]),/href="#library\/search"/);
assert.match(S.resources(),/href="#library\/papers"/);assert.match(S.resources(),/href="#chapters"/);
const source=fs.readFileSync(require.resolve('../dist/app.js'),'utf8'),start=source.indexOf("window.addEventListener('hashchange'"),end=source.indexOf('\nfunction download',start);assert.ok(start>=0&&end>start);
let callback,renders=0,events=[];const browser={currentRoute:'home',location:{hash:'#home/question'},document:{querySelector:()=>({}),},CustomEvent:class{constructor(type){this.type=type}},route:()=>renders++,$:()=>({focus(){}}),window:{addEventListener:(type,fn)=>callback=fn,dispatchEvent:event=>events.push(event.type),rrhNavigate:fn=>fn()}};vm.createContext(browser);vm.runInContext(source.slice(start,end),browser);
callback();assert.equal(renders,0,'Moving between journey stops must preserve the existing optical scene');assert.deepEqual(events,['rei:flow-location']);browser.location.hash='#library/question';callback();assert.equal(renders,1,'A detail lesson still uses the original route handler');
browser.currentRoute='library';browser.location.hash='#home/question';callback();assert.equal(renders,2,'Returning from a lesson rebuilds the homepage once');
console.log('PASS: seven connected stages, contextual tool/writing/next links, old detailed lessons and same-home navigation without renderer teardown.');
