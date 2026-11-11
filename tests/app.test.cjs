const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const renderMath = require('katex/contrib/auto-render');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script>\s*\/\/ ===== DONNÉES =====([\s\S]*?)<\/script>/)[1];
const data = JSON.parse(fs.readFileSync(path.join(root, 'data.json'), 'utf8'));
function boot(saved) {
    const dom = new JSDOM(html, {url: 'https://example.test/bac-pc-revision/', runScripts: 'outside-only'});
    const w = dom.window;
    if (saved !== undefined) w.localStorage.setItem('bacpc_progress', saved);
    w.renderMathInElement = (element, options) => { global.document = w.document; global.Node = w.Node; renderMath(element, options); };
    w.eval(script);
    w.document.querySelectorAll('[onclick]').forEach(e => { e.onclick = w.Function('event', e.getAttribute('onclick')); });
    return w;
}
test('139 questions, données synchronisées, compteurs et schémas cohérents', () => {
    assert.equal(data.questions.length, 139);
    assert.equal(new Set(data.questions.map(q => q.id)).size,139);
    assert.deepEqual(JSON.parse(html.match(/const EMBEDDED_DATA = ([\s\S]*?);\s*\/\/ ===== INIT/)[1]),data);
    for (const chapter of data.chapters) assert.equal(chapter.questionCount,data.questions.filter(q=>q.chapter===chapter.name).length);
    for (const q of data.questions) for (const f of q.schema_files) assert.ok(fs.existsSync(path.join(root,'schemas',f)));
    assert.match(data.questions.find(q=>q.id===36).answer,/base du couple H₂CO₃\/HCO₃⁻/);
    assert.match(data.questions.find(q=>q.id===12).answer,/−ρfluide/);
});
test('les 139 fiches se rendent sans erreur KaTeX', () => {
    const w=boot();
    for(const ch of data.chapters){
        w.openChapter(ch.name);
        for(let i=0;i<ch.questionCount;i++){
            assert.equal(w.document.querySelectorAll('.katex-error').length,0,ch.name+' question '+(i+1));
            w.nextQuestion();
        }
    }
    w.close();
});
test('boutons natifs, réponse masquée et absence de retournement global avec Entrée', () => {
    const w=boot(),d=w.document;
    const chapter=d.querySelector('.chapter-card');assert.equal(chapter.tagName,'BUTTON');chapter.click();
    assert.equal(d.querySelector('.card-back').hidden,true);
    assert.equal(d.querySelector('[onclick="prevQuestion()"]').disabled,true);
    const flip=d.getElementById('flipBtn');flip.click();assert.equal(d.querySelector('.card-front').hidden,true);assert.equal(flip.getAttribute('aria-expanded'),'true');
    const review=d.querySelector('.srs-btn.good');
    const event=new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true});review.dispatchEvent(event);assert.equal(event.defaultPrevented,false);
    review.click();assert.equal(d.getElementById('questionId').textContent,'ID 36');assert.equal(d.querySelector('.card-back').hidden,true);assert.equal(d.activeElement,flip);
    w.close();
});
test('progression conservée, compteur et barres actualisés au retour',()=>{
    const w=boot(),d=w.document;
    for(let i=0;i<3;i++){w.openChapter('1. Acide-Base');w.flipCard();w.onReview('good');}
    w.goBack();assert.equal(d.getElementById('knownCount').textContent,'1');assert.match(d.querySelector('.ch-count').textContent,/6%/);
    const saved=w.localStorage.getItem('bacpc_progress');w.close();const reload=boot(saved);assert.equal(reload.document.getElementById('knownCount').textContent,'1');reload.close();
    const invalid=boot('{');assert.equal(invalid.document.querySelectorAll('.chapter-card').length,10);assert.match(invalid.document.getElementById('storageStatus').textContent,/indisponible/);invalid.close();
});
test('dialogue de schéma accessible, Échap et restauration du focus',()=>{
    const w=boot(),d=w.document;w.openChapter('1. Acide-Base');w.flipCard();
    const trigger=d.querySelector('.schema-button');trigger.focus();trigger.click();assert.equal(d.getElementById('zoomOverlay').hidden,false);assert.equal(d.activeElement.id,'zoomClose');assert.ok(d.getElementById('zoomImg').alt.length>20);
    d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(d.getElementById('zoomOverlay').hidden,true);assert.equal(d.activeElement,trigger);assert.equal(d.getElementById('questionId').textContent,'ID 19');w.close();
});
test('le post-traitement préserve les indices chimiques et échappe le texte',()=>{
    const w=boot(),e=w.document.createElement('div');e.textContent='HCO3- et NH4+ ; <img src=x onerror=alert(1)> ; pH < pKA';w.processSubscripts(e);
    assert.match(e.innerHTML,/HCO<sub>3<\/sub><sup>-<\/sup>/);assert.match(e.innerHTML,/NH<sub>4<\/sub><sup>\+<\/sup>/);assert.equal(e.querySelector('img'),null);assert.ok(e.textContent.includes('pH < pKA'));w.close();
});
