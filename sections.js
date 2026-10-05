// One destination at a time; URL hashes support sharing and browser Back.
const sections=[...document.querySelector('main').children].filter(e=>e.tagName==='SECTION'||e.classList.contains('metrics'));

for(const section of sections){
  if(section.classList.contains('hero')) section.dataset.page='home';
  else if(section.classList.contains('metrics')) section.dataset.page='home';
  else {
    if(!section.id){
      const text=section.textContent;
      section.id=text.includes('METHODS & TOOLS')?'toolkit':
                 text.includes('SERVICE & ACTIVITY')?'activity':'awards';
    }
    section.dataset.page=section.id;
  }
}

function closeNavGroups(){
  document.querySelectorAll('.nav-group.is-open').forEach(group=>{
    group.classList.remove('is-open');
    group.querySelector('.nav-parent')?.setAttribute('aria-expanded','false');
  });
}

document.querySelectorAll('.nav-parent').forEach(button=>{
  button.addEventListener('click',event=>{
    event.stopPropagation();
    const group=button.closest('.nav-group');
    const wasOpen=group.classList.contains('is-open');
    closeNavGroups();
    if(!wasOpen){
      group.classList.add('is-open');
      button.setAttribute('aria-expanded','true');
    }
  });
});
document.addEventListener('click',event=>{
  if(!event.target.closest('.nav-group')) closeNavGroups();
});

function navigateSection(){
  const requested=location.hash.slice(1)||'home';
  const page=sections.some(s=>s.dataset.page===requested)?requested:'home';

  sections.forEach(s=>s.hidden=s.dataset.page!==page);

  document.querySelectorAll('header nav a').forEach(a=>{
    if(a.hash==='#'+page) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });

  document.querySelectorAll('.nav-group').forEach(group=>{
    const pages=(group.dataset.pages||'').split(/\s+/).filter(Boolean);
    group.classList.toggle('is-active',pages.includes(page));
  });

  closeNavGroups();
  document.title=(page==='home'?'':page[0].toUpperCase()+page.slice(1)+' · ')+'Dr. M. Nur Hasan';
  window.scrollTo({top:0,behavior:'instant'});
}

window.addEventListener('hashchange',navigateSection);
navigateSection();

fetch('metrics.json',{cache:'no-cache'})
  .then(r=>{if(!r.ok)throw Error();return r.json();})
  .then(m=>{
    for(const [id,key] of [['publications','publications'],['citations','citations'],['hindex','hIndex'],['i10','i10Index']]){
      if(Number.isInteger(m[key])&&m[key]>=0){
        const el=document.getElementById('metric-'+id);
        if(el) el.textContent=m[key].toLocaleString();
      }
    }
    const updated=document.getElementById('metrics-updated');
    if(updated && /^\d{4}-\d{2}-\d{2}$/.test(m.checkedAt)){
      const date=new Date(m.checkedAt+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
      updated.textContent='Google Scholar · Checked '+date;
    }
  })
  .catch(()=>{});
