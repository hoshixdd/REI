/* CSS stays in dist, so relative font/image URLs retain their original base. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),manifest=require('../assets.json');
const css=manifest.styles.map(file=>{
 if(!/^[\w-]+\.css$/.test(file))throw Error('Styles must remain in dist');
 const text=fs.readFileSync(path.join(root,'dist',file),'utf8').replace(/\r\n/g,'\n');
 if(/@(?:import|charset)\b/i.test(text))throw Error('Review stylesheet directives before bundling '+file);
 return '/* '+file+' */\n'+text+'\n';
}).join('\n').trimEnd()+'\n';
const token=crypto.createHash('sha256').update(css).digest('hex').slice(0,12);
const target=path.join(root,'dist','index.html');
let html=fs.readFileSync(target,'utf8');
const scripts=[...html.matchAll(/<script src="([^?" ]+)[^"]*" defer><\/script>/g)].map(x=>x[1]);
if(JSON.stringify(scripts)!==JSON.stringify(manifest.scripts))throw Error('Review script order/defer changes against assets.json before building.');
html=html.replace(/<link rel="stylesheet"[^>]+>/g,'');
html=html.replace('</head>','<link rel="stylesheet" href="rei-bundle.css?v='+token+'"></head>');
fs.writeFileSync(path.join(root,'dist','rei-bundle.css'),css);
fs.writeFileSync(target,html);
console.log('Built '+manifest.styles.length+' stylesheets into one request; script order unchanged.');
