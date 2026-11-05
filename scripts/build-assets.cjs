/* Ordered classic bundles stay in dist to preserve relative import URLs. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),manifest=require('../assets.json'),vm=require('node:vm');
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
const split=manifest.scripts.indexOf('app.js');if(split<0)throw Error('Missing application entry');
const bundles=[['rei-core.js',manifest.scripts.slice(0,split)],['rei-app.js',manifest.scripts.slice(split)]];
if(JSON.stringify(scripts)!==JSON.stringify(manifest.scripts)&&JSON.stringify(scripts)!==JSON.stringify(bundles.map(x=>x[0])))throw Error('Review script order against assets.json before building.');
const outputs=bundles.map(([name,files])=>{const source=files.map(file=>{if(!/^[\w-]+\.js$/.test(file))throw Error('Scripts must remain in dist');return ';\n/* '+file+' */\n'+fs.readFileSync(path.join(root,'dist',file),'utf8').replace(/\r\n/g,'\n')+'\n;';}).join('\n');new vm.Script(source,{filename:name});return {name,source,token:crypto.createHash('sha256').update(source).digest('hex').slice(0,12)}});
html=html.replace(/<link rel="stylesheet"[^>]+>/g,'');
html=html.replace('</head>','<link rel="stylesheet" href="rei-bundle.css?v='+token+'"></head>');
fs.writeFileSync(path.join(root,'dist','rei-bundle.css'),css);
html=html.replace(/<script src="[^"]+" defer><\/script>/g,'').replace('</body>',outputs.map(x=>'<script src="'+x.name+'?v='+x.token+'" defer></script>').join('')+'</body>');
for(const output of outputs)fs.writeFileSync(path.join(root,'dist',output.name),output.source);
fs.writeFileSync(target,html);
console.log('Built '+manifest.styles.length+' stylesheets and '+manifest.scripts.length+' scripts into one CSS and two ordered JS requests.');
