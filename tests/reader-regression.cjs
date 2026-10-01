/* Regression for persisted page location and repeatable PDF cleanup. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').join(__dirname,'../dist/workbench.js'),'utf8');
const start=source.indexOf('async function disposePDF('),end=source.indexOf('async function openPDF(',start);
const saved=new Map(),elements={
 '#wb-pdf-status':{textContent:''},'#wb-pdf-text':{textContent:''},'#wb-page':{value:0},
 '#wb-pdf-canvas':{parentElement:{clientWidth:600},getContext:()=>({})}
};
const context=vm.createContext({sessionStorage:{setItem:(k,v)=>saved.set(k,v)},document:{querySelector:s=>elements[s]},get:()=>({id:'project-qa'}),readerNotes:()=>{},readerToken:0,pageNumber:1,pdfTask:null,pdfPaper:'paper-qa',selectedQuote:'',pdfDoc:{numPages:3,getPage:async()=>({getViewport:({scale})=>({width:600*scale,height:800*scale}),render:()=>({promise:Promise.resolve(),cancel:()=>{}}),getTextContent:async()=>({items:[{str:'Fictional fixture',hasEOL:true}]})})}});
vm.runInContext(source.slice(start,end),context);
(async()=>{
 await context.renderPage(99);
 assert.equal(saved.get('rei-pdf-page-project-qa-paper-qa'),'3');
 assert.equal(elements['#wb-page'].value,3);
 assert.equal(elements['#wb-pdf-status'].textContent,'Page 3 of 3 · Local PDF');
 assert.equal(elements['#wb-pdf-text'].textContent,'Fictional fixture\n');
 let disposed=0;
 await context.disposePDF({destroy:async()=>disposed++});
 await context.disposePDF({loadingTask:{destroy:async()=>disposed++}});
 await context.disposePDF({cleanup:async()=>disposed++});
 await context.disposePDF(null);
 assert.equal(disposed,3);
 console.log('PASS: PDF page persistence, page bounds, extracted text and cleanup variants.');
})().catch(err=>{console.error(err);process.exitCode=1});
