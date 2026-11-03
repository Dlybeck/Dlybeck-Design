/* @ds-bundle: {"format":4,"namespace":"Dly","components":[{"name":"Button"},{"name":"Field"},{"name":"Tag"},{"name":"Paper"},{"name":"TitleTab"},{"name":"Trail"},{"name":"Highlight"},{"name":"Pinned"},{"name":"PullTab"},{"name":"HoldButton"},{"name":"Deck"},{"name":"Scribble"}]} */
(function(){
"use strict";
var reduce=function(){return !!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)};

/* A calm spring: near-critically damped, so things settle without a visible bounce. */
function spring(from,to,onFrame,opts){
  opts=opts||{};var k=opts.stiffness||140,c=opts.damping||22,x=from,v=opts.velocity||0,last=performance.now(),id=0,stopped=false;
  if(reduce()){onFrame(to);opts.onDone&&opts.onDone();return function(){}}
  function tick(t){if(stopped)return;var dt=Math.min(0.032,(t-last)/1000);last=t;v+=(-k*(x-to)-c*v)*dt;x+=v*dt;onFrame(x);
    if(Math.abs(v)<0.01&&Math.abs(x-to)<0.002){onFrame(to);opts.onDone&&opts.onDone();return}id=requestAnimationFrame(tick)}
  id=requestAnimationFrame(tick);return function(){stopped=true;cancelAnimationFrame(id)};
}

/* ---------- Pinned: paper hanging from a pin, swinging from board movement ---------- */
var pinnedItems=[],loopId=0,followEl=null,lastPos=null,lastVel={x:0,y:0},boardKick={x:0,y:0};
function readPos(el){var r=el.getBoundingClientRect();return{x:r.left,y:r.top}}
function loop(){
  var ax=boardKick.x,ay=boardKick.y;boardKick.x=boardKick.y=0;
  if(followEl){var p=readPos(followEl);if(lastPos){var vx=p.x-lastPos.x,vy=p.y-lastPos.y;ax+=vx-lastVel.x;ay+=vy-lastVel.y;lastVel={x:vx,y:vy}}lastPos=p}
  var busy=!!followEl;
  for(var i=0;i<pinnedItems.length;i++){if(pinnedItems[i].step(ax,ay))busy=true}
  loopId=busy?requestAnimationFrame(loop):0;
}
function wake(){if(!loopId)loopId=requestAnimationFrame(loop)}
function Pinned(el,opts){
  opts=opts||{};
  var w=el.offsetWidth,h=el.offsetHeight,px=opts.pin?opts.pin[0]*w:w/2,py=opts.pin?opts.pin[1]*h:Math.min(14,h*0.1);
  var dx=w/2-px,dy=h/2-py,L2=dx*dx+dy*dy,I=L2+(w*w+h*h)/12;
  var rest=Math.atan2(dx,Math.max(1,dy))*180/Math.PI*0.12,s={th:rest,om:0},maxSwing=opts.maxSwing||8;
  el.classList.add("dly-pinned");el.style.transformOrigin=px+"px "+py+"px";el.style.transform="rotate("+rest+"deg)";
  if(opts.showPin!==false&&!el.querySelector(".dly-pin")){var pin=document.createElement("span");pin.className="dly-pin";pin.style.left=px+"px";pin.style.top=py+"px";if(opts.color)pin.style.setProperty("--pin",opts.color);el.appendChild(pin)}
  var item={el:el,
    step:function(ax,ay){if(reduce()){s.th=rest;s.om=0;el.style.transform="rotate("+rest+"deg)";return false}
      var t=s.th*Math.PI/180,rx=dx*Math.cos(t)-dy*Math.sin(t),ry=dx*Math.sin(t)+dy*Math.cos(t);
      s.om+=(ry*ax-rx*ay)/I*57.3*0.3-0.008*(s.th-rest)-0.07*s.om;
      s.om=Math.max(-3,Math.min(3,s.om));s.th=Math.max(rest-maxSwing,Math.min(rest+maxSwing,s.th+s.om));
      el.style.transform="rotate("+s.th+"deg)";return Math.abs(s.om)>0.01||Math.abs(s.th-rest)>0.05},
    nudge:function(v){s.om+=v;wake()}};
  var lx=null;
  el.addEventListener("pointerenter",function(e){lx=e.clientX;if(opts.inspect!==false)el.classList.add("is-inspect")});
  el.addEventListener("pointermove",function(e){if(lx===null)return;item.nudge((e.clientX-lx)*0.035);lx=e.clientX});
  el.addEventListener("pointerleave",function(){lx=null;el.classList.remove("is-inspect")});
  pinnedItems.push(item);wake();
  return{nudge:item.nudge,destroy:function(){pinnedItems=pinnedItems.filter(function(x){return x!==item})}};
}
Pinned.follow=function(boardEl){followEl=boardEl;lastPos=null;lastVel={x:0,y:0};wake()};
Pinned.unfollow=function(){followEl=null};
Pinned.bump=function(ax,ay){boardKick.x+=ax||0;boardKick.y+=ay||0;wake()};

/* ---------- PullTab: a sheet tucked in a holder, pulled out and pushed back by the same tab ---------- */
function PullTab(root,opts){
  opts=opts||{};var sheet=root.querySelector(".dly-pull-sheet"),tab=root.querySelector(".dly-pull-tab");
  var out=-(opts.distance||Math.round(sheet.offsetHeight*0.7)),y=0,stop=null,drag=null,moved=false;
  var labels={in:tab.getAttribute("data-label-in")||tab.textContent||"pull",out:tab.getAttribute("data-label-out")||"put back"};
  tab.setAttribute("role","button");tab.setAttribute("tabindex","0");
  function set(v){y=v;sheet.style.setProperty("--y",v+"px");var isOut=v<out/2;tab.textContent=isOut?labels.out:labels.in;tab.setAttribute("aria-expanded",isOut?"true":"false")}
  function settle(to){stop&&stop();stop=spring(y,to,set,{stiffness:120,damping:21,onDone:function(){opts.onChange&&opts.onChange(to===out)}})}
  tab.addEventListener("pointerdown",function(e){stop&&stop();tab.setPointerCapture(e.pointerId);drag={y0:e.clientY,s:y};moved=false});
  tab.addEventListener("pointermove",function(e){if(!drag)return;var v=drag.s+(e.clientY-drag.y0);if(Math.abs(e.clientY-drag.y0)>4)moved=true;if(v>0)v*=0.25;if(v<out)v=out+(v-out)*0.25;set(v)});
  function up(){if(!drag)return;var start=drag.s;drag=null;if(!moved){settle(start<out/2?0:out);return}
    var goingOut=start>out/2;settle(goingOut?(y<out*0.3?out:0):(y>out*0.7?0:out))}
  tab.addEventListener("pointerup",up);tab.addEventListener("pointercancel",up);
  tab.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();settle(y<out/2?0:out)}});
  set(0);
  return{open:function(){settle(out)},close:function(){settle(0)},isOpen:function(){return y<out/2}};
}

/* ---------- HoldButton: press and hold to confirm ---------- */
function HoldButton(btn,opts){
  opts=opts||{};var ms=opts.duration||1100,p=0,id=0,holding=false,stop=null,done=false,label=btn.querySelector("span")||btn,orig=label.textContent;
  btn.classList.add("dly-hold");
  function set(v){p=v;btn.style.setProperty("--p",v);btn.classList.toggle("is-past-half",v>0.5)}
  function start(){if(done)return;holding=true;stop&&stop();var t0=performance.now(),p0=p;
    (function f(t){if(!holding)return;var v=Math.min(1,p0+(t-t0)/(reduce()?250:ms));set(v);
      if(v>=1){holding=false;done=true;btn.classList.add("is-done");label.textContent=opts.doneLabel||"Done";opts.onConfirm&&opts.onConfirm();
        setTimeout(function(){stop=spring(1,0,set,{stiffness:120,damping:20,onDone:function(){setTimeout(function(){done=false;btn.classList.remove("is-done");label.textContent=orig},opts.resetAfter||1600)}})},300);return}
      id=requestAnimationFrame(f)})(t0)}
  function end(){if(!holding)return;holding=false;cancelAnimationFrame(id);stop=spring(p,0,set,{stiffness:170,damping:24})}
  btn.addEventListener("pointerdown",function(e){btn.setPointerCapture(e.pointerId);start()});
  ["pointerup","pointercancel","pointerleave"].forEach(function(n){btn.addEventListener(n,end)});
  btn.addEventListener("keydown",function(e){if((e.key===" "||e.key==="Enter")&&!e.repeat){e.preventDefault();start()}});
  btn.addEventListener("keyup",function(e){if(e.key===" "||e.key==="Enter")end()});
  btn.addEventListener("click",function(e){e.preventDefault()});
  return{reset:function(){done=false;set(0);label.textContent=orig;btn.classList.remove("is-done")}};
}

/* ---------- Deck: a stack you deal through ---------- */
function Deck(box,opts){
  opts=opts||{};var cards=[].slice.call(box.querySelectorAll(".dly-deck-card")),order=cards.map(function(_,i){return i}),drag=null,hints=0;
  var tilts=[-1,3,-4,5,-2,4];
  function layout(){order.forEach(function(ci,pos){var d=cards[ci];d.style.zIndex=String(100-pos);d.setAttribute("aria-hidden",pos===0?"false":"true");
    d.style.transform=pos===0?"translate(0,0) rotate(-1deg)":"translate("+(pos*6)+"px,"+(pos*7)+"px) rotate("+tilts[ci%tilts.length]+"deg)";d.style.pointerEvents=pos===0?"auto":"none"})}
  function deal(dir,dy){var d=cards[order[0]];d.classList.add("is-fly");d.style.transform="translate("+(dir*360)+"px,"+((dy||0)-40)+"px) rotate("+(dir*24)+"deg)";
    setTimeout(function(){d.classList.remove("is-fly");order.push(order.shift());layout();opts.onDeal&&opts.onDeal(order[0])},reduce()?0:340)}
  box.addEventListener("pointerdown",function(e){var d=cards[order[0]];if(!d.contains(e.target))return;d.setPointerCapture(e.pointerId);d.classList.add("is-drag");drag={x0:e.clientX,y0:e.clientY,d:d,dx:0,dy:0}});
  box.addEventListener("pointermove",function(e){if(!drag)return;drag.dx=e.clientX-drag.x0;drag.dy=e.clientY-drag.y0;drag.d.style.transform="translate("+drag.dx+"px,"+drag.dy+"px) rotate("+(drag.dx*0.06)+"deg)"});
  function release(){if(!drag)return;var d=drag;drag=null;d.d.classList.remove("is-drag");if(Math.abs(d.dx)>80)deal(Math.sign(d.dx),d.dy);else layout()}
  box.addEventListener("pointerup",release);box.addEventListener("pointercancel",release);
  var acc=0,lock=false,t=0;
  box.addEventListener("wheel",function(e){if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;e.preventDefault();if(lock)return;acc+=e.deltaX;
    cards[order[0]].style.transform="translate("+(-acc*0.6)+"px,0) rotate("+(-acc*0.04)+"deg)";clearTimeout(t);t=setTimeout(function(){acc=0;layout()},180);
    if(Math.abs(acc)>70){lock=true;clearTimeout(t);deal(-Math.sign(acc));acc=0;setTimeout(function(){lock=false},500)}},{passive:false});
  box.addEventListener("pointerenter",function(){if(hints>=2||drag||reduce())return;hints++;cards[order[0]].style.transform="translate(-18px,-2px) rotate(-3.5deg)";setTimeout(layout,300)});
  layout();
  return{next:function(){deal(1)},current:function(){return order[0]}};
}

/* ---------- Marker: highlights that draw on hover / focus; tap keeps one ---------- */
function Marker(scope){
  [].slice.call((scope||document).querySelectorAll(".dly-hl[data-draw]")).forEach(function(h){
    if(!h.hasAttribute("tabindex"))h.setAttribute("tabindex","0");
    var on=function(){h.classList.add("is-drawn")},off=function(){if(!h.dataset.keep)h.classList.remove("is-drawn")};
    h.addEventListener("pointerenter",on);h.addEventListener("pointerleave",off);h.addEventListener("focus",on);h.addEventListener("blur",off);
    h.addEventListener("click",function(){h.dataset.keep=h.dataset.keep?"":"1";h.classList.toggle("is-drawn",!!h.dataset.keep)});
  });
}


/* ---------- Scribble: seeded pen strokes. Same seed, same stroke; different seeds, different strokes. ---------- */
function rng(seed){var a=0,str=String(seed);for(var i=0;i<str.length;i++)a=(a*31+str.charCodeAt(i))|0;
  return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function f1(n){return n.toFixed(1)}
function smooth(p,closed){var d="M"+f1(p[0][0])+" "+f1(p[0][1]);for(var i=0;i<p.length-1;i++){var p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;
  d+=" C"+f1(p1[0]+(p2[0]-p0[0])/6)+" "+f1(p1[1]+(p2[1]-p0[1])/6)+", "+f1(p2[0]-(p3[0]-p1[0])/6)+" "+f1(p2[1]-(p3[1]-p1[1])/6)+", "+f1(p2[0])+" "+f1(p2[1])}return d}
function jit(r,p,a){return p.map(function(q){return[q[0]+(r()-.5)*2*a,q[1]+(r()-.5)*2*a]})}
function arrowHead(r,tip,from){var ang=Math.atan2(tip[1]-from[1],tip[0]-from[0]),style=Math.floor(r()*3),L=9+r()*6,s1=.38+r()*.25,s2=.38+r()*.25,k=.8+r()*.4;
  var a=[tip[0]-L*Math.cos(ang-s1),tip[1]-L*Math.sin(ang-s1)],b=[tip[0]-L*k*Math.cos(ang+s2),tip[1]-L*k*Math.sin(ang+s2)];
  if(style===1)return"M"+f1(a[0])+" "+f1(a[1])+" Q"+f1(tip[0]-1)+" "+f1(tip[1]+1)+" "+f1(tip[0])+" "+f1(tip[1])+" M"+f1(tip[0])+" "+f1(tip[1])+" Q"+f1(tip[0]-2)+" "+f1(tip[1]+2)+" "+f1(b[0])+" "+f1(b[1]);
  var d="M"+f1(a[0])+" "+f1(a[1])+" L"+f1(tip[0])+" "+f1(tip[1])+" L"+f1(b[0])+" "+f1(b[1]);
  if(style===2)d+=" L"+f1(a[0]+(b[0]-a[0])*.15)+" "+f1(a[1]+(b[1]-a[1])*.15+1);return d}
var SHAPES={
  "arrow-curve":function(r){var bend=4+r()*30,end=[84+r()*30,10+r()*20],sy=40+r()*18,p=jit(r,[[6+r()*10,sy],[30+r()*10,sy-14-bend*.6],[60+r()*10,16-bend*.25+r()*8],end],4);
    return{vb:"0 0 124 64",w:112,h:58,d:[smooth(p),arrowHead(r,end,p[p.length-2])]}},
  "arrow-straight":function(r){var y0=24+r()*18,end=[86+r()*28,14+r()*24],p=jit(r,[[6+r()*12,y0],[40,y0-4+r()*8],[72,(y0+end[1])/2+r()*8-4],end],3);
    return{vb:"0 0 124 50",w:112,h:45,d:[smooth(p),arrowHead(r,end,p[2])]}},
  "check":function(r){var a=[6+r()*12,24+r()*14],b=[20+r()*12,44+r()*8],c=[50+r()*18,2+r()*14];
    return{vb:"0 0 70 56",w:56,h:45,d:[smooth(jit(r,[a,[(a[0]+b[0])/2,(a[1]+b[1])/2+r()*3],b,[(b[0]+c[0])/2+r()*8-2,(b[1]+c[1])/2+r()*6-3],c],2.2))]}},
  "star":function(r){var p=[],cx=32,cy=33,R=25+r()*4,ri=R*(.36+r()*.16),rot=-Math.PI/2+(r()-.5)*.5;
    for(var i=0;i<=10;i++){var rad=(i%2?ri:R)*(.78+r()*.4),t=rot+i*Math.PI/5+(r()-.5)*.14;p.push([cx+rad*Math.cos(t)+(r()-.5)*5,cy+rad*Math.sin(t)+(r()-.5)*5])}
    p[10]=[p[10][0]+(r()-.5)*7,p[10][1]+(r()-.5)*7];var o=p[1],k=.2+r()*.35;p.push([p[10][0]+(o[0]-p[10][0])*k,p[10][1]+(o[1]-p[10][1])*k]);
    var d="M"+f1(p[0][0])+" "+f1(p[0][1]);for(var j=1;j<p.length;j++){d+=" Q"+f1((p[j][0]+p[j-1][0])/2+(r()-.5)*6)+" "+f1((p[j][1]+p[j-1][1])/2+(r()-.5)*6)+" "+f1(p[j][0])+" "+f1(p[j][1])}
    return{vb:"0 0 64 64",w:52,h:52,d:[d]}}
};
/* underline and circle are drawn to fit a real element's box */
function underlinePath(r,w){
  if(r()<.35){var y=6+r()*2;return smooth(jit(r,[[0,y+r()*2],[w*.35,y-1.5+r()*3],[w*.7,y-1+r()*2],[w,y-2-r()*3]],0.8))}
  var n=2+Math.floor(r()*2),amp=1+r()*1.3,p=[];for(var i=0;i<=n*2;i++)p.push([i*(w/(n*2)),6+(i%2?-amp:amp)+(r()-.5)*.8+i*(r()-.5)*.25]);return smooth(p)}
function circlePath(r,w,h,padX,padY){
  var cx=w/2+padX,cy=h/2+padY,rx=w/2*1.1+padX*.85,ry=h/2*1.2+padY*.75,start=r()*Math.PI*2,turns=1.06+r()*.08,N=26,tilt=(r()-.5)*.05,p=[];
  for(var i=0;i<=N;i++){var t=start+i/N*turns*Math.PI*2,k=1+(r()-.5)*.03+(i/N)*.025,x=rx*k*Math.cos(t),y=ry*k*Math.sin(t);
    p.push([cx+x*Math.cos(tilt)-y*Math.sin(tilt),cy+x*Math.sin(tilt)+y*Math.cos(tilt)])}return smooth(p)}
function svgOf(vb,w,h,paths,sw,style){return '<svg class="dly-scribble" viewBox="'+vb+'" width="'+w+'" height="'+h+'" fill="none" stroke="currentColor" stroke-width="'+sw+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"'+(style?' style="'+style+'"':'')+'>'+paths.map(function(d){return '<path d="'+d+'"/>'}).join("")+'</svg>'}
function Scribble(kind,seed,opts){opts=opts||{};var r=rng(kind+"|"+(seed==null?"":seed)),sw=(opts.weight||(1.8+r()*1.2)).toFixed(2),s=SHAPES[kind](r),sc=opts.scale||1;
  return svgOf(s.vb,Math.round(s.w*sc),Math.round(s.h*sc),s.d,sw)}
Scribble.mark=function(el,kind,opts){opts=opts||{};var seed=opts.seed!=null?opts.seed:(el.textContent||"").trim();
  if(getComputedStyle(el).position==="static")el.style.position="relative";if(getComputedStyle(el).display==="inline")el.style.display="inline-block";
  function draw(){var old=el.querySelector(":scope > .dly-scribble");old&&old.remove();var w=el.offsetWidth,h=el.offsetHeight,r=rng(kind+"|"+seed),sw=(1.8+r()*.9).toFixed(2),html;
    if(kind==="underline")html=svgOf("0 0 "+w+" 12",w,12,[underlinePath(r,w)],sw,"position:absolute;left:0;bottom:-9px;overflow:visible;pointer-events:none");
    else{var px=Math.max(14,h*.5),py=Math.max(8,h*.32);html=svgOf("0 0 "+(w+px*2)+" "+(h+py*2),w+px*2,h+py*2,[circlePath(r,w,h,px,py)],sw,"position:absolute;left:"+(-px)+"px;top:"+(-py)+"px;overflow:visible;pointer-events:none")}
    el.insertAdjacentHTML("beforeend",html)}
  draw();if(window.ResizeObserver)new ResizeObserver(draw).observe(el);
};
Scribble.rng=rng;

window.Dly={Scribble:Scribble,Pinned:Pinned,PullTab:PullTab,HoldButton:HoldButton,Deck:Deck,Marker:Marker,spring:spring,
  Button:"dly-btn",Field:"dly-field",Tag:"dly-tag",Paper:"dly-paper",TitleTab:"dly-titletab",Trail:"dly-trail",Highlight:"dly-hl"};
})();
