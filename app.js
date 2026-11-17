let items = [];
let filter = 'All';
const search = document.querySelector('#search');
const productContainer = document.querySelector('#products');
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
function render() {
  const query = search.value.trim().toLowerCase();
  const results = items.filter(p => (filter === 'All' || p.category === filter) && `${p.name} ${p.range} ${p.description || ''}`.toLowerCase().includes(query));
  productContainer.innerHTML = results.map(p => {
    const name = escapeHtml(p.name), range = escapeHtml(p.range), image = escapeHtml(p.image), description = escapeHtml(p.description);
    return `<article class="product"><div class="product-image"><img src="${image}" alt="${name}" loading="lazy" width="250" height="250"></div><p class="category">${range.toUpperCase()}</p><h3>${name}</h3>${description ? `<p class="product-description">${description}</p>` : ''}<a href="https://www.indiamart.com/vardaandistributors/" target="_blank" rel="noopener" aria-label="Enquire about ${name}">Enquire about this product →</a></article>`;
  }).join('');
  document.querySelector('#empty').hidden = results.length !== 0;
  document.querySelector('#result-count').textContent = `${results.length} products shown`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  render();
}));
search.addEventListener('input', render);
fetch('products.json').then(response => { if (!response.ok) throw new Error('Catalogue unavailable'); return response.json(); }).then(products => { if (!Array.isArray(products)) throw new Error('Invalid catalogue'); items = products; render(); }).catch(() => { productContainer.innerHTML = '<p>Our product catalogue is temporarily unavailable. Please call us for product information.</p>'; });
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});document.querySelector('#year').textContent=new Date().getFullYear();
