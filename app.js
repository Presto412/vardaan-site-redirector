const groups=[
['Stainless steel utensils','Cookware',2,['Bulging pots','Designer parat','Fancy basin','Fancy parat']],
['Induction utensils','Cookware',3,['Induction kadai','Induction cookware','Induction base idly pot','Induction base utensils']],
['Lunch carriers','Storage',4,['Stainless steel food pack','Square food pack box','Clip lunch carrier','Square food pack']],
['Serving trays','Tableware',5,['Stainless steel oval tray','Fancy oval serving tray','Fancy tray','Stainless steel star tray']],
['Copper bottom utensils','Cookware',6,['Copper bottom wire saucepan','Copper bottom kadai','Copper bottom saucepan','Copper bottom cook & serve set']],
['Coloured fancy ware','Storage',7,['Coloured storage container','Coloured saucepan','Coloured table dish','Coloured kadai with lid']],
['Designer plates','Tableware',8,['Designer parat','Designer plate 26G','Payal plate','SS Saniya plate']],
['Stainless steel bowls','Tableware',9,['Silver touch table dish','Stew pan with lid','Fancy bowl','Stainless steel pet bowl']]];
const items=groups.flatMap(([range,category,page,names])=>names.map((name,i)=>({name,range,category,image:`assets/product-${page}-${i}.jpg`})));
// Lead with a representative selection, then show the rest of the brochure range.
const featured=['Induction base idly pot','Copper bottom kadai','Clip lunch carrier','Designer plate 26G','Coloured storage container','Stainless steel oval tray','Fancy bowl','Copper bottom wire saucepan'];
items.sort((a,b)=>(featured.includes(a.name)?featured.indexOf(a.name):99)-(featured.includes(b.name)?featured.indexOf(b.name):99));
let filter='All';const search=document.querySelector('#search');
function render(){const query=search.value.trim().toLowerCase();const results=items.filter(p=>(filter==='All'||p.category===filter)&&`${p.name} ${p.range}`.toLowerCase().includes(query));document.querySelector('#products').innerHTML=results.map(p=>`<article class="product"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" width="250" height="250"></div><p class="category">${p.range.toUpperCase()}</p><h3>${p.name}</h3><a href="https://www.indiamart.com/vardaandistributors/" target="_blank" rel="noopener" aria-label="Enquire about ${p.name}">Enquire about this product ↗</a></article>`).join('');document.querySelector('#empty').hidden=results.length!==0;document.querySelector('#result-count').textContent=`${results.length} products shown`;}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();}));search.addEventListener('input',render);render();
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});document.querySelector('#year').textContent=new Date().getFullYear();
