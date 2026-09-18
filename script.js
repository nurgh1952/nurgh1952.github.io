const svg=document.getElementById('spin-diagram');
const ns='http://www.w3.org/2000/svg';
function shape(tag,attrs){const el=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs))el.setAttribute(key,value);svg.appendChild(el);return el;}
const points=[];
for(let row=0;row<5;row++){points[row]=[];for(let col=0;col<6;col++){points[row][col]={x:66+col*57+row*11,y:90+row*44-col*5};}}
for(let row=0;row<5;row++)for(let col=0;col<6;col++){const p=points[row][col];for(const q of [points[row][col+1],points[row+1]?.[col]])if(q)shape('line',{x1:p.x,y1:p.y,x2:q.x,y2:q.y,stroke:'#43658a','stroke-width':1,opacity:.55});}
for(let row=0;row<5;row++)for(let col=0;col<6;col++){const p=points[row][col],angle=(-34+col*12+row*8)*Math.PI/180;const x=p.x+Math.sin(angle)*26,y=p.y-Math.cos(angle)*26;const color=col<3?'#77b8ff':'#a5e0e1';shape('circle',{cx:p.x,cy:p.y,r:4,fill:'#355b85'});shape('line',{x1:p.x,y1:p.y,x2:x,y2:y,stroke:color,'stroke-width':2.3,'stroke-linecap':'round'});const ax=x-Math.sin(angle)*8,ay=y+Math.cos(angle)*8;shape('polyline',{points:`${ax-Math.cos(angle)*4},${ay-Math.sin(angle)*4} ${x},${y} ${ax+Math.cos(angle)*4},${ay+Math.sin(angle)*4}`,fill:'none',stroke:color,'stroke-width':2.3,'stroke-linecap':'round','stroke-linejoin':'round'});}
document.getElementById('copyright-year').textContent=new Date().getFullYear();
