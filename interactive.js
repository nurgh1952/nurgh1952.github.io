document.getElementById('copyright-year').textContent=new Date().getFullYear();
const carousel=document.querySelector('.science-carousel'),slides=[...document.querySelectorAll('.science-slide')],pauseButton=document.getElementById('slide-pause');
let slideIndex=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,hovered=false,focused=false,timer;
function showSlide(n){slideIndex=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==slideIndex);document.getElementById('slide-position').textContent=`${String(slideIndex+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;}
function restart(){clearInterval(timer);pauseButton.textContent=paused?'Play':'Pause';pauseButton.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');if(!paused&&!hovered&&!focused&&!document.hidden)timer=setInterval(()=>showSlide(slideIndex+1),5000);}
document.getElementById('slide-prev').onclick=()=>{showSlide(slideIndex-1);restart();};document.getElementById('slide-next').onclick=()=>{showSlide(slideIndex+1);restart();};pauseButton.onclick=()=>{paused=!paused;restart();};
carousel.addEventListener('mouseenter',()=>{hovered=true;restart();});carousel.addEventListener('mouseleave',()=>{hovered=false;restart();});carousel.addEventListener('focusin',()=>{focused=true;restart();});carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){focused=false;restart();}});document.addEventListener('visibilitychange',restart);restart();
const basePublications=JSON.parse(document.getElementById('publication-data').textContent),list=document.querySelector('.papers'),search=document.getElementById('publication-search'),yearSelect=document.getElementById('publication-year'),status=document.getElementById('sync-status'),refresh=document.getElementById('refresh-publications');
const eligible=p=>['Google Scholar','ORCID'].includes(p.source)&&(p.type==='journal-article'||(p.type==='arxiv-preprint'&&/^https:\/\/arxiv\.org\/abs\//.test(p.url)));
let publications=basePublications.filter(eligible);
const typeSelect=document.getElementById('publication-type');
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
function render(){const query=search.value.toLowerCase(),year=yearSelect.value,shown=publications.filter(p=>(year==='all'||String(p.year)===year)&&(!typeSelect||typeSelect.value==='all'||p.type===typeSelect.value)&&[p.title,p.authors,p.journal].join(' ').toLowerCase().includes(query));const frag=document.createDocumentFragment();for(const p of shown){const a=el('a','','paper');try{const u=new URL(p.url);if(u.protocol!=='https:')continue;a.href=u.href;}catch{continue;}a.target='_blank';a.rel='noopener';a.append(el('span',String(p.year),'year'));const body=el('div');body.append(el('span',p.journal,'journal'),el('h3',p.title),el('p',p.authors));body.append(el('span',`${p.type==='arxiv-preprint'?'arXiv preprint · Not peer reviewed':'Journal article'} · ${p.source}`,'record-source'));a.append(body,el('span','↗','arrow'));frag.append(a);}list.replaceChildren(frag);document.getElementById('publication-total').textContent=publications.length;document.getElementById('publication-results').textContent=`Showing ${shown.length} of ${publications.length} publications`;if(!shown.length)list.append(el('p','No publications match. Try another search or year.','empty-results'));}
function updateYears(){const selected=yearSelect.value;yearSelect.replaceChildren(new Option('All years','all'));[...new Set(publications.map(p=>p.year))].sort((a,b)=>b-a).forEach(y=>yearSelect.add(new Option(String(y),String(y))));yearSelect.value=[...yearSelect.options].some(o=>o.value===selected)?selected:'all';}
typeSelect?.addEventListener('change',render);search.addEventListener('input',render);yearSelect.addEventListener('change',render);updateYears();render();
async function fetchJSON(url){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);try{const r=await fetch(url,{headers:{Accept:'application/json'},signal:controller.signal});if(!r.ok)throw Error(`HTTP ${r.status}`);return await r.json();}finally{clearTimeout(timeout);}}
async function sync(){
 refresh.disabled=true;status.textContent='Loading the latest weekly publication list…';
 try{const data=await fetchJSON('publication-updates.json');if(!Array.isArray(data.records))throw Error('Invalid bibliography');
 publications=PublicationTools.merge([],data.records.filter(eligible));updateYears();render();
 const preprints=publications.filter(p=>p.type==='arxiv-preprint').length;
 status.textContent=`${publications.length-preprints} journal articles · ${preprints} arXiv preprints · Checked ${data.checkedAt} · Weekly Monday updates`;
 }catch{status.textContent='Showing the saved bibliography. Weekly updates are temporarily unavailable.';}finally{refresh.disabled=false;}
}
refresh.onclick=sync;sync();
