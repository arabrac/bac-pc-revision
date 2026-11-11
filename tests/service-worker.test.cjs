const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');
function worker({offline=false}={}){
    const handlers={}, deleted=[],added=[],store=new Map();
    const cache={addAll:async urls=>added.push(...urls),add:async url=>{if(url.includes('image1.png'))throw Error('image absent');added.push(url);},match:async req=>store.get(typeof req==='string'?req:req.url),put:async(req,response)=>store.set(req.url,response)};
    const self={location:{origin:'https://example.test'},addEventListener:(name,fn)=>handlers[name]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{}}};
    const context={self,URL,Promise,console,caches:{open:async()=>cache,keys:async()=>['bacpc-v1','another-app-cache'],delete:async k=>deleted.push(k)},fetch:async()=>{if(offline)throw Error('offline');return new Response('fresh',{status:200});}};
    vm.runInNewContext(source,context);return {handlers,deleted,added,store};
}
test('installation conservée si un schéma manque ; seuls les anciens caches de cette application sont supprimés',async()=>{
    const w=worker();let pending;w.handlers.install({waitUntil:p=>pending=p});await pending;
    assert.ok(w.added.includes('./index.html'));assert.ok(w.added.some(p=>p.endsWith('katex.min.js')));
    w.handlers.activate({waitUntil:p=>pending=p});await pending;assert.deepEqual(w.deleted,['bacpc-v1']);
});
test('HTML frais en ligne et repli vers la copie locale hors connexion',async()=>{
    const request={method:'GET',mode:'navigate',url:'https://example.test/bac-pc-revision/'};
    let response;const online=worker();online.handlers.fetch({request,respondWith:p=>response=p});assert.equal(await(await response).text(),'fresh');
    const offline=worker({offline:true});offline.store.set('./index.html',new Response('cached'));offline.handlers.fetch({request,respondWith:p=>response=p});assert.equal(await(await response).text(),'cached');
});
test('toutes les ressources précachées sont présentes dans le dépôt',()=>{
    const assets=source.match(/const OPTIONAL_ASSETS = ([\s\S]*?);/)[1];
    for(const asset of JSON.parse(assets))assert.ok(fs.existsSync(path.join(__dirname,'..',asset)),asset);
});
