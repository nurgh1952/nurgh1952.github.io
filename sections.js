// One destination at a time; URL hashes support sharing and browser Back.
const sections=[...document.querySelector('main').children].filter(e=>e.tagName==='SECTION'||e.classList.contains('metrics'));
for(const section of sections){
  if(section.classList.contains('hero'))section.dataset.page='home';
  else if(section.classList.contains('metrics'))section.dataset.page='home';
  else {
    if(!section.id){const text=section.textContent;section.id=text.includes('METHODS & TOOLS')?'toolkit':text.includes('SCIENTIFIC COMMUNITY')?'service':'awards';}
    section.dataset.page=section.id;
  }
}
function navigateSection(){
  const requested=location.hash.slice(1)||'home';
  const page=sections.some(s=>s.dataset.page===requested)?requested:'home';
  sections.forEach(s=>s.hidden=s.dataset.page!==page);
  document.querySelectorAll('header nav a').forEach(a=>{if(a.hash==='#'+page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.title=(page==='home'?'':page[0].toUpperCase()+page.slice(1)+' · ')+'Dr. M. Nur Hasan';
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',navigateSection);navigateSection();
fetch('metrics.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(m=>{
  for(const [id,key] of [['publications','publications'],['citations','citations'],['hindex','hIndex'],['i10','i10Index']])if(Number.isInteger(m[key])&&m[key]>=0)document.getElementById('metric-'+id).textContent=m[key].toLocaleString();
  document.getElementById('metrics-updated').textContent='Google Scholar · Checked '+m.checkedAt;
}).catch(()=>{});
