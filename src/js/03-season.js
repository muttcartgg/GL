/* =========================================================
   03 · Season: schedule, sims, polls, postseason, awards,
        weekly program upkeep, dilemmas, offseason, career
   ========================================================= */
let LG=null,SLOT=null;
const T=id=>LG.teams[id];
const WEEK_LABELS={12:'Championship Week',13:'Bowls & CFP First Round',14:'CFP Quarterfinals',15:'CFP Semifinals',16:'National Championship'};
function weekLabel(L){if(L.phase==='offseason')return 'Offseason';const w=L.weeks[L.week];return w?w.label:'Season complete'}
function weatherFor(i){const r=Math.random();if(i>=8&&r<.13)return 'Snow';if(r<.2)return 'Rain';if(r<.32)return 'Wind';return 'Clear'}
const WX_ICON={Clear:'☀︎',Rain:'☂︎',Snow:'❄︎',Wind:'⚑'};

function buildSchedule(L){
  const co=L.confOrder;const rr=[];for(let r=0;r<7;r++)rr.push([]);
  for(const ids0 of co){const arr=shuffle(ids0.slice());for(let r=0;r<7;r++){for(let i=0;i<4;i++){const a=arr[i],b=arr[7-i];rr[r].push(r%2?{h:a,a:b}:{h:b,a:a})}arr.splice(1,0,arr.pop())}}
  shuffle(rr);
  const nc=(pairs,shift)=>{const g=[];for(const [x,y] of pairs){const A=co[x],B=co[y];for(let j=0;j<8;j++){const a=A[j],b=B[(j+shift)%8];g.push((j+shift+L.season)%2?{h:a,a:b}:{h:b,a:a})}}return g};
  const sA=rint(0,7);let sB=rint(0,7);while(sB===sA)sB=rint(0,7);
  const weeks=[nc([[0,2],[1,3]],sA),nc([[0,3],[1,2]],rint(0,7)),nc([[0,1],[2,3]],rint(1,7)),...rr,nc([[0,2],[1,3]],sB),nc([[0,1],[2,3]],0)];
  L.weeks=weeks.map((w,i)=>({label:i===11?'Rivalry Week':'Week '+(i+1),kind:'reg',games:w.map(g=>({h:g.h,a:g.a,hs:null,as:null,wx:weatherFor(i),slot:pick(['Noon','Afternoon','Afternoon','Primetime']),tag:i===11?L.teams[g.h].trophy:null,rival:i===11}))}));
  L.cfp=null;L.champ=null;
  if(L.user!=null)setHomecoming(L);
}
function setHomecoming(L){const ws=[];L.weeks.forEach((w,i)=>{if(i>=1&&i<=9&&w.games.some(g=>g.h===L.user))ws.push(i)});L.hcWeek=ws.length?pick(ws):null}
function seniorDayWeek(L){let last=null;L.weeks.forEach((w,i)=>{if(w.kind==='reg'&&w.games.some(g=>g.h===L.user))last=i});return last}
const isConfGame=g=>T(g.h).conf===T(g.a).conf&&!g.post;
function gameFlags(L,g,wi){
  const f=[];const u=L.user;const home=g.h===u&&!g.neutral;
  if(g.rival)f.push(['gold','Rivalry · '+g.tag]);
  if(g.cfp)f.push(['gold',g.tag]);else if(g.bowl)f.push(['gold',g.tag]);else if(g.tag&&!g.rival)f.push(['gold',g.tag]);
  if(home&&wi===L.hcWeek)f.push(['blue','Homecoming']);
  if(home&&wi===seniorDayWeek(L)&&L.weeks[wi].kind==='reg')f.push(['blue','Senior Day']);
  if(!g.post&&isConfGame(g))f.push(['','Conference game']);
  if(g.slot==='Primetime')f.push(['hot','Primetime']);
  return f;
}

/* ---------- CPU sims + player stat lines ---------- */
function simScore(h,a,neutral){
  const rh=teamOvr(T(h)),ra=teamOvr(T(a));const edge=neutral?0:2.5;const m=(rh-ra)*9+edge;
  const pts=x=>{x=Math.max(0,x);const td=Math.max(0,Math.round(x/7*.85+R(-.6,.6)));const fg=Math.max(0,Math.round((x-td*7)/3));return td*7+fg*3};
  let hs=pts(24+m/2+R(-11,11)),as=pts(24-m/2+R(-11,11));
  if(hs===as){if(Math.random()<.5+m/40)hs+=pick([3,6,7,8]);else as+=pick([3,6,7,8])}
  return [hs,as];
}
function simStats(t,pts){
  const qb=starters(t,'QB')[0],rb=starters(t,'RB')[0],wr=starters(t,'WR'),te=starters(t,'TE')[0],k=starters(t,'K')[0];
  if(!qb||!rb)return;
  const tds=Math.floor(pts/7),ptd=Math.round(tds*R(.45,.7)),rtd=Math.max(0,tds-ptd);
  const py=Math.max(60,Math.round(R(110,190)+pts*4+(qb.thr+qb.acc-6)*18)),att=Math.round(py/R(6.5,9));
  Object.assign(qb.ss,{gp:qb.ss.gp+1,pa:qb.ss.pa+att,pc:qb.ss.pc+Math.round(att*R(.52,.72)),py:qb.ss.py+py,ptd:qb.ss.ptd+ptd,int:qb.ss.int+(Math.random()<.45?rint(1,2):0)});
  const ry=Math.round(R(50,150)+(rb.spd+rb.str-6)*12);rb.ss.gp++;rb.ss.ra+=Math.round(ry/R(3.8,5.6));rb.ss.ry+=ry;rb.ss.rtd+=rtd;
  const recs=[...wr,te].filter(Boolean),sh=[.36,.26,.18,.2];
  recs.forEach((r,i)=>{r.ss.gp++;const y=Math.round(py*sh[i]*R(.7,1.3));r.ss.recy+=y;r.ss.rec+=Math.max(0,Math.round(y/R(9,15)))});
  for(let i=0;i<ptd;i++){const r=recs[Math.min(recs.length-1,Math.floor(Math.random()**1.4*recs.length))];r.ss.rectd++}
  for(const p of starters(t,'LB'))p.ss.tkl+=rint(4,9);for(const p of starters(t,'S'))p.ss.tkl+=rint(2,6);for(const p of starters(t,'CB'))p.ss.tkl+=rint(1,4);
  for(const p of starters(t,'DL')){p.ss.tkl+=rint(1,4);if(Math.random()<.22)p.ss.sck++}
  if(Math.random()<.35){const db=pick([...starters(t,'CB'),...starters(t,'S')]);if(db)db.ss.dint++}
  if(k){const fga=Math.round((pts%7)/3)+(Math.random()<.3?1:0);k.ss.fga+=fga;k.ss.fgm+=Math.max(0,fga-(Math.random()<.25?1:0))}
  for(const p of [...starters(t,'OL'),...starters(t,'DL')])p.ss.gp++;
}
function recordGame(L,g){
  const H=L.teams[g.h],A=L.teams[g.a];const conf=!g.post&&H.conf===A.conf;
  H.rec.pf+=g.hs;H.rec.pa+=g.as;A.rec.pf+=g.as;A.rec.pa+=g.hs;
  if(g.hs>g.as){H.rec.w++;A.rec.l++;if(conf){H.rec.cw++;A.rec.cl++}}else{A.rec.w++;H.rec.l++;if(conf){A.rec.cw++;H.rec.cl++}}
}
const winner=g=>g.hs>g.as?g.h:g.a, loser=g=>g.hs>g.as?g.a:g.h;

/* ---------- polls ---------- */
function updateRankings(L){
  const winp=t=>{const g=t.rec.w+t.rec.l;return g?t.rec.w/g:.5};
  const opps={};L.teams.forEach(t=>opps[t.id]=[]);
  for(const w of L.weeks)for(const g of w.games)if(g.hs!=null){opps[g.h].push(g.a);opps[g.a].push(g.h)}
  const sos=t=>{const o=opps[t.id];return o.length?o.reduce((s,id)=>s+winp(L.teams[id]),0)/o.length:.5};
  const sc={};for(const t of L.teams)sc[t.id]=winp(t)*60+(teamOvr(t)-1)*5+t.prestige*2.2-t.rec.l*3.5+sos(t)*14+(t.cc?6:0)+Math.random()*.01;
  L.rank=L.teams.map(t=>t.id).sort((a,b)=>sc[b]-sc[a]);
}
const rankOf=id=>{const i=LG.rank.indexOf(id);return i>=0&&i<25?i+1:null};
const rankTag=id=>{const r=rankOf(id);return r?`#${r} `:''};
const pollName=L=>L.phase==='offseason'?'Final poll':L.week===0?'Preseason poll':L.week>=9?'CFP rankings':'Media poll';
function h2h(L,a,b){for(const w of L.weeks)for(const g of w.games)if(g.hs!=null&&!g.post&&((g.h===a&&g.a===b)||(g.h===b&&g.a===a)))return winner(g)===a?-1:1;return 0}
function confStandings(L,c){
  return L.teams.filter(t=>t.conf===c).sort((a,b)=>(b.rec.cw-b.rec.cl)-(a.rec.cw-a.rec.cl)||h2h(L,a.id,b.id)||(b.rec.w-b.rec.l)-(a.rec.w-a.rec.l)||L.rank.indexOf(a.id)-L.rank.indexOf(b.id));
}

/* ---------- postseason: conference title games, 12-team playoff, bowls ---------- */
function postGame(h,a,extra){return Object.assign({h,a,hs:null,as:null,post:true,neutral:true,wx:'Clear',slot:'Primetime'},extra)}
function buildPost(L){
  const i=L.week;
  if(i===12){L.weeks[12]={label:WEEK_LABELS[12],kind:'ccg',games:[0,1,2,3].map(c=>{const s=confStandings(L,c);return postGame(s[0].id,s[1].id,{tag:confName(c)+' Championship',ccg:true,conf:c})})}}
  if(i===13){
    const champs=L.teams.filter(t=>t.cc).map(t=>t.id);
    const field=champs.slice();for(const id of L.rank){if(field.length>=12)break;if(!field.includes(id))field.push(id)}
    const seeds=field.sort((a,b)=>L.rank.indexOf(a)-L.rank.indexOf(b));
    L.cfp={seeds,r1:[],qf:[],sf:[],final:null};
    seeds.forEach(id=>L.teams[id].playoffApps=(L.teams[id].playoffApps||0));
    const games=[];
    for(let k=0;k<4;k++){const hi=seeds[4+k],lo=seeds[11-k];const g=postGame(hi,lo,{cfp:true,neutral:false,tag:`CFP First Round · #${5+k} vs #${12-k}`,seedH:5+k,seedA:12-k,wx:weatherFor(13)});games.push(g);L.cfp.r1.push(g)}
    const elig=L.rank.filter(id=>!seeds.includes(id)&&L.teams[id].rec.w>=6);
    const names=shuffle(BOWLS.slice());
    for(let k=0;k+1<elig.length&&k/2<names.length;k+=2)games.push(postGame(elig[k],elig[k+1],{bowl:true,tag:names[k/2]}));
    L.weeks[13]={label:WEEK_LABELS[13],kind:'cfp1',games};
  }
  if(i===14){const s=L.cfp.seeds,r=L.cfp.r1.map(winner);const pairs=[[s[0],r[3],1,'8/9'],[s[1],r[2],2,'7/10'],[s[2],r[1],3,'6/11'],[s[3],r[0],4,'5/12']];
    L.cfp.qf=pairs.map(([a,b,sd],k)=>postGame(a,b,{cfp:true,tag:`CFP Quarterfinal · ${CFP_QF[k]}`,seedH:sd,seedA:s.indexOf(b)+1}));L.weeks[14]={label:WEEK_LABELS[14],kind:'qf',games:L.cfp.qf}}
  if(i===15){const q=L.cfp.qf.map(winner),s=L.cfp.seeds;L.cfp.sf=[postGame(q[0],q[3],{cfp:true,tag:'CFP Semifinal · '+CFP_SF[0],seedH:s.indexOf(q[0])+1,seedA:s.indexOf(q[3])+1}),postGame(q[1],q[2],{cfp:true,tag:'CFP Semifinal · '+CFP_SF[1],seedH:s.indexOf(q[1])+1,seedA:s.indexOf(q[2])+1})];L.weeks[15]={label:WEEK_LABELS[15],kind:'sf',games:L.cfp.sf}}
  if(i===16){const f=L.cfp.sf.map(winner),s=L.cfp.seeds;L.cfp.final=postGame(f[0],f[1],{cfp:true,tag:'National Championship',seedH:s.indexOf(f[0])+1,seedA:s.indexOf(f[1])+1});L.weeks[16]={label:WEEK_LABELS[16],kind:'final',games:[L.cfp.final]}}
}
function userGameThisWeek(){const w=LG.weeks[LG.week];if(!w||LG.phase!=='regular')return null;return w.games.find(g=>(g.h===LG.user||g.a===LG.user)&&g.hs==null)||null}

/* ---------- Heisman + awards ---------- */
function prodScore(p){const s=p.ss;return s.py/25+s.ptd*4-s.int*3+s.ry/10+s.rtd*6+s.recy/11+s.rectd*5+s.tkl*.25+s.sck*3+s.dint*5}
function heismanScore(L,t,p){if(!['QB','RB','WR','TE'].includes(p.pos))return 0;const g=t.rec.w+t.rec.l;const wp=g?t.rec.w/g:.5;return prodScore(p)*(.55+wp*.7)+ovr(p)*4}
function heismanTop(L,n){const all=[];for(const t of L.teams)for(const p of t.roster){const s=heismanScore(L,t,p);if(s>0)all.push({p,t,s})}return all.sort((a,b)=>b.s-a.s).slice(0,n)}
const statLine=p=>{const s=p.ss;if(p.pos==='QB')return `${s.py} pass yds · ${s.ptd} TD · ${s.int} INT`;if(p.pos==='RB')return `${s.ry} rush yds · ${s.rtd} TD`;if(p.pos==='WR'||p.pos==='TE')return `${s.rec} rec · ${s.recy} yds · ${s.rectd} TD`;if(p.pos==='K')return `${s.fgm}/${s.fga} FG`;return `${s.tkl} tackles · ${s.sck} sacks · ${s.dint} INT`};
function awardHeisman(L){
  const top=heismanTop(L,3);if(!top.length)return;const w=top[0];
  L.heisman={season:L.season,pid:w.p.id,name:fullName(w.p),pos:w.p.pos,team:w.t.id,line:statLine(w.p),finalists:top.map(x=>({name:fullName(x.p),team:x.t.id,pos:x.p.pos}))};
  if(w.t.id===L.user){L.fan=clamp(L.fan+10,0,100);L.morale=clamp(L.morale+8,0,100);L.news.unshift({t:`${fullName(w.p)} wins the Heisman Trophy! Recruits across the country noticed.`,good:true});w.p.heisman=(w.p.heisman||0)+1}
  else L.news.unshift({t:`${fullName(w.p)} (${w.t.city}) wins the Heisman Trophy.`});
}
function computeAwards(L){
  const score=(t,p)=>ovr(p)*10+prodScore(p)*.6;
  const team=(teams,filter)=>{const out=[];for(const pos of POS_ORDER){const c=[];for(const t of teams)for(const p of t.roster)if(p.pos===pos&&(!filter||filter(p)))c.push({p,t,s:score(t,p)});c.sort((a,b)=>b.s-a.s).slice(0,STARTERS[pos]).forEach(x=>out.push({pid:x.p.id,name:fullName(x.p),pos,team:x.t.id}))}return out};
  const u=L.teams[L.user];
  const allAm=team(L.teams),allConf=team(L.teams.filter(t=>t.conf===u.conf)),frosh=team(L.teams,p=>p.yr===1);
  let coy=null,best=-99;for(const t of L.teams){const exp=3.5+t.prestige*1.4;const d=t.rec.w-exp+(t.cc?1:0)+(L.champ===t.id?2:0);if(d>best){best=d;coy=t.id}}
  if(coy===L.user)L.coach.coy++;
  return {allAm,allConf,frosh,coy,heisman:L.heisman};
}

/* ---------- weekly flow ---------- */
function weeklyUpkeep(L){
  const u=L.teams[L.user];const rec=12+6*L.fac.rehab;
  for(const p of u.roster){p.cond=Math.min(100,p.cond+rec);if(p.inj>0){if(p.injNew)p.injNew=false;else{p.inj--;if(p.inj<=0){p.inj=0;p.injWhy=''}}}}
  L.morale=clamp(L.morale+(65-L.morale)*.08+(captainsHealthy(L)?1:0),0,100);
}
const captainsHealthy=L=>L.captains.length>0&&L.captains.every(id=>{const p=L.teams[L.user].roster.find(x=>x.id===id);return p&&p.inj<=0});
function finishWeek(L){
  const w=L.weeks[L.week];const pre=L.rank.slice();const rk=id=>{const i=pre.indexOf(id);return i>=0&&i<25?i+1:null};
  for(const g of w.games){
    if(g.hs==null){const [hs,as]=simScore(g.h,g.a,g.neutral);g.hs=hs;g.as=as;recordGame(L,g);simStats(L.teams[g.h],hs);simStats(L.teams[g.a],as)}
    const wi=winner(g),lo=loser(g);if(rk(lo)&&(!rk(wi)||rk(wi)-rk(lo)>=8))g.upset=true;
    if(g.rival){const t1=L.teams[g.h],t2=L.teams[g.a];t1.holder=t2.holder=wi}
    if(g.bowl)L.teams[wi].bowlWins++;
    if(g.ccg){L.teams[wi].cc=true;L.teams[wi].ccTitles++}
  }
  if(w.kind==='cfp1')for(const id of L.cfp.seeds)L.teams[id].playoffApps++;
  if(w.kind==='final'){const c=winner(w.games[0]);L.teams[c].titles++;L.champ=c}
  if(w.kind==='reg')weeklyUpkeep(L);else weeklyUpkeep(L);
  updateRankings(L);
  L.lastWeek={label:w.label,games:w.games.map(g=>({h:g.h,a:g.a,hs:g.hs,as:g.as,tag:g.tag,upset:g.upset,rh:rk(g.h),ra:rk(g.a)}))};
  pickPOTW(L,w);
  L.heismanWatch=heismanTop(L,5).map(x=>({pid:x.p.id,name:fullName(x.p),pos:x.p.pos,team:x.t.id,line:statLine(x.p)}));
  if(w.kind==='ccg')awardHeisman(L);
  for(const g of w.games)if(g.upset&&L.news.length<40)L.news.unshift({t:`Upset: ${T(winner(g)).city} beats ${rankTag(loser(g))||'#'+rk(loser(g))+' '}${T(loser(g)).city}, ${Math.max(g.hs,g.as)}–${Math.min(g.hs,g.as)}.`});
  L.news=L.news.slice(0,30);
  L.week++;
  if(L.week>=12&&L.week<=16)buildPost(L);
  if(L.week>=17||(L.week>=13&&!L.weeks[L.week]))return startOffseason(L);
  if(L.week<12&&Math.random()<.4)L.event=genEvent(L);
}
function pickPOTW(L,w){
  const u=L.teams[L.user];const conf=u.conf;let best=null;
  for(const g of w.games){if(g.post)continue;const t=L.teams[winner(g)];if(t.conf!==conf)continue;for(const pos of ['QB','RB','WR']){const p=starters(t,pos)[0];if(!p)continue;const s=ovr(p)+Math.random()*2+(t.id===L.user&&L.lastUserPOG===p.id?3:0);if(!best||s>best.s)best={p,t,s}}}
  if(best){L.potw={name:fullName(best.p),pos:best.p.pos,team:best.t.id,week:w.label};if(best.t.id===L.user){L.morale=clamp(L.morale+2,0,100);best.p.xp+=10}}
}

/* ---------- dilemma events (front office) ---------- */
const EVENTS=[
  {text:p=>`${fullName(p)} (${p.pos}) skipped film study this week.`,opts:[['Discipline him',(L,p)=>{L.morale-=hasTrait('dc','Disciplinarian')?0:2;p.xp=Math.max(0,p.xp-15);return 'He loses 15 XP. The team sees you hold the line.'}],['Let it slide',(L,p)=>{L.morale+=2;L.fan-=2;return 'Players like the leeway. Some fans grumble (−2 fan approval).'}]]},
  {text:p=>`Local TV wants a sit-down interview with ${fullName(p)}.`,opts:[['Do the interview',(L,p)=>{L.fan+=6;p.cond=Math.max(20,p.cond-5);return 'Fans love it (+6 fan approval).'}],['Keep the focus on football',(L,p)=>{L.morale+=2;return 'The locker room appreciates it (+2 morale).'}]]},
  {text:()=>`A booster offers a donation, but wants more say in the depth chart.`,opts:[['Take the money',L=>{L.credits+=5;L.morale-=4;return '+5 coaching credits. Players are uneasy (−4 morale).'}],['Decline politely',L=>{L.morale+=3;L.fan+=1;return 'The team rallies around you (+3 morale).'}]]},
  {text:p=>`${fullName(p)} asks for extra reps after practice.`,opts:[['Approve',(L,p)=>{p.xp+=30;p.cond=Math.max(20,p.cond-15);return '+30 XP, but he’s more tired this week.'}],['Make him rest',(L,p)=>{p.cond=Math.min(100,p.cond+15);return 'Fresh legs for Saturday.'}]]},
  {text:()=>`The seniors want to host a team dinner.`,opts:[['Pay for it (2 CC)',L=>{if(L.credits<2){L.morale-=2;return 'You can’t cover it right now (−2 morale).'}L.credits-=2;L.morale+=8;return 'Great night for team chemistry (+8 morale).'}],['Not this week',L=>{L.morale-=3;return 'Disappointed seniors (−3 morale).'}]]},
  {text:p=>`${fullName(p)} posted something controversial online.`,opts:[['Suspend him one game',(L,p)=>{p.inj=1;p.injNew=true;p.injWhy='Suspended';L.fan+=3;L.morale-=2;return 'He sits out the next game.'}],['Back him publicly',L=>{L.morale+=4;L.fan-=6;return 'The team appreciates it. The press doesn’t (−6 fan approval).'}]]},
  {text:()=>`The student section is petitioning for a blackout night game.`,opts:[['Make it happen (1 CC)',L=>{if(L.credits<1)return 'Not enough credits this week.';L.credits-=1;L.fan+=7;return 'Electric atmosphere next home game (+7 fan approval).'}],['Not this season',L=>{L.fan-=2;return 'Students are let down (−2 fan approval).'}]]},
  {text:p=>`Trainers flag fatigue in ${fullName(p)}.`,opts:[['Sit him a week',(L,p)=>{p.inj=1;p.injNew=true;p.injWhy='Rest';p.cond=100;return 'He’ll be fully fresh after a week off.'}],['Play through it',(L,p)=>{p.cond=Math.max(20,p.cond-10);return 'He plays, but at reduced condition.'}]]},
  {text:()=>`A rival coach took a shot at your program in a press conference.`,opts:[['Fire back',L=>{L.fan+=5;L.morale+=3;return 'Fans love the fire (+5 fan, +3 morale).'}],['Stay classy',L=>{L.morale+=1;return 'You keep the high road.'}]]},
  {text:p=>`${fullName(p)} is falling behind in class and needs a tutor.`,opts:[['Hire a tutor (3 CC)',(L,p)=>{if(L.credits<3){p.inj=1;p.injNew=true;p.injWhy='Academic';return 'Not enough credits. He’s academically ineligible for a week.'}L.credits-=3;p.xp+=10;L.morale+=3;return 'He stays eligible (+3 morale).'}],['He’ll figure it out',(L,p)=>{p.inj=1;p.injNew=true;p.injWhy='Academic';L.morale-=2;return 'He’s ineligible for the next game.'}]]},
];
function genEvent(L){const u=L.teams[L.user];const pool=POS_ORDER.flatMap(pos=>starters(u,pos)).filter(p=>p.inj<=0);if(!pool.length)return null;return {k:rint(0,EVENTS.length-1),pid:pick(pool).id}}

/* ---------- user game bookkeeping: credits, morale, XP, injuries, records ---------- */
const REGIMES={light:{x:.75,c:-4,i:.6,label:'Light'},normal:{x:1,c:0,i:1,label:'Normal'},hard:{x:1.35,c:5,i:1.5,label:'Hard'}};
function addXP(p,x,list){p.xp+=x;let n=0;while(p.xp>=100&&n<4){n++;p.xp-=100;const ks=PATTR[p.pos].filter(k=>p[k]<5);if(!ks.length){p.xp=0;break}ks.sort((a,b)=>p[a]-p[b]);const k=Math.random()<.6?ks[0]:pick(ks);p[k]++;list&&list.push({id:p.id,name:fullName(p),pos:p.pos,attr:attrName(p.pos,k),to:p[k]})}}
const gameXP=s=>s?Math.min(80,s.py/8+s.ptd*12+s.ry/5+s.rtd*12+s.recy/5+s.rectd*12+s.rec*2):0;
function processUserGame(L,g,info){
  const u=L.teams[L.user],opp=L.teams[g.h===L.user?g.a:g.h],home=g.h===L.user&&!g.neutral,wi=L.week;
  let cc=info.won?3:1;if(home)cc+=L.fac.stadium-1+(L.fan>70?1:0);if(info.won&&rankOf(opp.id))cc+=1;L.credits+=cc;
  let fan=info.won?4:-5;if(info.won&&rankOf(opp.id)&&rankOf(opp.id)<=10)fan+=4;if(g.rival)fan+=info.won?6:-6;if(home&&wi===L.hcWeek)fan+=info.won?3:-2;if(info.storm)fan+=8;L.fan=clamp(L.fan+fan,0,100);
  let mor=info.won?5:-(hasTrait('oc','Motivator')?3:6);if(captainsHealthy(L))mor+=info.won?1:2;L.morale=clamp(L.morale+mor,0,100);
  if(info.won)L.coach.w++;else L.coach.l++;
  if(info.simmed)simStats(u,info.us);
  else{const pst=info.pst||{};for(const p of u.roster){const s=pst[p.id];if(!s)continue;p.ss.gp++;for(const k in s)if(k in p.ss)p.ss[k]+=s[k]}}
  simStats(opp,info.them);
  const dxp=info.dxp||{};for(const p of u.roster){const d=dxp[p.id];if(d){p.ss.tkl+=d.tkl||0;p.ss.sck+=d.sck||0;p.ss.dint+=d.dint||0}}
  const reg=REGIMES[L.regime],trainM=1+.2*(L.fac.training-1),lev=[],inj=[];
  const st=POS_ORDER.flatMap(pos=>starters(u,pos));const sd=home&&wi===seniorDayWeek(L)&&L.weeks[wi]&&L.weeks[wi].kind==='reg';
  for(const p of st){let x=12+gameXP((info.pst||{})[p.id])+((dxp[p.id]&&dxp[p.id].xp)||0);if(info.simmed)x+=8;if(p.pos==='QB'&&hasTrait('oc','QB Guru'))x*=1.25;if(sd&&p.yr===4)x+=15;addXP(p,x*reg.x*trainM,lev)}
  for(const p of u.roster)if(!st.includes(p))addXP(p,4*trainM,lev);
  for(const p of st){if(p.pos==='K')continue;p.cond=clamp(p.cond-(R(8,14)+reg.c),20,100);if(Math.random()<.028*reg.i*(hasTrait('dc','Physio')?.5:1)){p.inj=Math.max(1,rint(1,5)-Math.floor(L.fac.rehab/2));p.injNew=true;p.injWhy=pick(['Ankle sprain','Hamstring','Shoulder','Concussion protocol','Knee bruise','Wrist']);inj.push({name:fullName(p),pos:p.pos,wk:p.inj,why:p.injWhy})}}
  const ts=L.ts,s=info.stats||{};ts.g++;ts.pf+=info.us;ts.pa+=info.them;ts.py+=s.passYds||0;ts.ry+=s.rushYds||0;ts.thirdA+=s.thirdA||0;ts.thirdC+=s.thirdC||0;ts.rzA+=s.rzA||0;ts.rzTD+=s.rzTD||0;ts.to+=(s.int||0);ts.pen+=s.pen||0;
  updateGameRecords(L,info,opp);
  return {cc,fan,mor,lev,inj};
}
function seedRecords(L){
  const yr=()=>L.season-rint(3,40),nm=()=>pick(FIRST)+' '+pick(LAST);
  L.records={gPass:{label:'Passing yards, game',v:rint(390,520),who:nm(),season:yr()},gRush:{label:'Rushing yards, game',v:rint(215,300),who:nm(),season:yr()},gRec:{label:'Receiving yards, game',v:rint(200,270),who:nm(),season:yr()},gPts:{label:'Points, game',v:rint(56,70),who:L.teams[L.user].city,season:yr()},
    sPass:{label:'Passing yards, season',v:rint(3300,4600),who:nm(),season:yr()},sRush:{label:'Rushing yards, season',v:rint(1450,2050),who:nm(),season:yr()},sRec:{label:'Receiving yards, season',v:rint(1250,1700),who:nm(),season:yr()},sTD:{label:'Total TDs, season',v:rint(24,38),who:nm(),season:yr()},sWins:{label:'Wins, season',v:rint(12,14),who:L.teams[L.user].city,season:yr()}};
}
function setRecord(L,key,label,v,who,extra){const r=L.records[key];if(!r||v>r.v){L.records[key]={label,v,who,season:L.season,extra};return true}return false}
function updateGameRecords(L,info,opp){
  if(info.simmed)return;const u=L.teams[L.user],pst=info.pst||{};const out=[];
  for(const p of u.roster){const s=pst[p.id];if(!s)continue;
    if(s.py&&setRecord(L,'gPass','Passing yards, game',s.py,fullName(p),'vs '+opp.city))out.push('passing yards in a game');
    if(s.ry&&setRecord(L,'gRush','Rushing yards, game',s.ry,fullName(p),'vs '+opp.city))out.push('rushing yards in a game');
    if(s.recy&&setRecord(L,'gRec','Receiving yards, game',s.recy,fullName(p),'vs '+opp.city))out.push('receiving yards in a game')}
  if(setRecord(L,'gPts','Points, game',info.us,u.city,'vs '+opp.city))out.push('points in a game');
  info.records=out;
}
function updateSeasonRecords(L){const u=L.teams[L.user];for(const p of u.roster){const s=p.ss;setRecord(L,'sPass','Passing yards, season',s.py,fullName(p));setRecord(L,'sRush','Rushing yards, season',s.ry,fullName(p));setRecord(L,'sRec','Receiving yards, season',s.recy,fullName(p));setRecord(L,'sTD','Total TDs, season',s.ptd+s.rtd+s.rectd,fullName(p))}setRecord(L,'sWins','Wins, season',u.rec.w,u.city)}

/* ---------- offseason ---------- */
const adTarget=t=>Math.round(3.5+t.prestige*1.4);
function startOffseason(L){
  L.phase='offseason';L.event=null;const u=L.teams[L.user];L.coach.seasons++;
  const madePO=!!(L.cfp&&L.cfp.seeds.includes(L.user)),champ=L.champ===L.user;
  let bowl=null;for(const w of L.weeks)for(const g of w.games)if(g.bowl&&(g.h===L.user||g.a===L.user))bowl={name:g.tag,won:winner(g)===L.user};
  if(madePO)L.coach.playoffs++;if(champ)L.coach.natties++;if(u.cc)L.coach.confs++;if(bowl&&bowl.won)L.coach.bowls++;
  const target=adTarget(u);const delta=Math.round((u.rec.w-target)*7+(madePO?8:0)+(champ?20:0)+(u.cc?6:0));L.coach.security=clamp(L.coach.security+delta,0,100);
  const aw=computeAwards(L);L.awards.unshift({season:L.season,...aw});L.awards=L.awards.slice(0,10);
  updateSeasonRecords(L);
  L.history.push({season:L.season,w:u.rec.w,l:u.rec.l,rank:rankOf(L.user),cc:u.cc,champ,madePO,seed:madePO?L.cfp.seeds.indexOf(L.user)+1:null,bowl,champName:L.champ!=null?teamName(L.teams[L.champ]):'—',heisman:L.heisman&&L.heisman.name,team:L.user});
  L.off={stage:'recap',target,delta,madePO,champ,bowl};
}
function departures(L){
  const draftPool=[],user=L.teams[L.user],out={grads:[],declares:[],portalOut:[],drafted:[]};L.off.portalPool=[];
  for(const t of L.teams){
    const keep=[];
    for(const p of t.roster){
      const leave=p.yr>=4&&!(p.redshirt&&p.ss.gp<=4&&!p.rs);
      const declare=!leave&&p.yr===3&&ovr(p)>=4.2&&Math.random()<.55;
      const portal=!leave&&!declare&&p.ss.gp<3&&ovr(p)>=(t.id===L.user?3.2:2.9)&&Math.random()<(t.id===L.user?(L.morale>75?.15:.3):.12);
      if(leave||declare){draftPool.push({p,t,declare});if(t.id===L.user)(declare?out.declares:out.grads).push({name:fullName(p),pos:p.pos,ovr:ovr(p)})}
      else if(portal){if(t.id===L.user)out.portalOut.push({name:fullName(p),pos:p.pos,ovr:ovr(p)});L.off.portalPool.push({...p,from:t.id})}
      else keep.push(p);
    }
    t.roster=keep;
    if(t.dco)for(const pos in t.dco)t.dco[pos]=t.dco[pos].filter(id=>keep.some(p=>p.id===id));
  }
  draftPool.sort((a,b)=>ovr(b.p)-ovr(a.p));
  draftPool.slice(0,7*32).forEach((x,i)=>{if(x.t.id===L.user)out.drafted.push({name:fullName(x.p),pos:x.p.pos,round:Math.floor(i/32)+1,pick:i+1})});
  L.captains=L.captains.filter(id=>user.roster.some(p=>p.id===id));
  L.off.dep=out;
}
function jobOffers(L){
  const u=L.teams[L.user],o=L.off;const fired=L.coach.security<=10&&L.coach.seasons>=2;
  let pool;
  if(fired)pool=L.teams.filter(t=>t.id!==L.user&&t.prestige<=2);
  else if(u.rec.w>=o.target+2||o.champ||o.madePO)pool=L.teams.filter(t=>t.id!==L.user&&t.prestige>u.prestige);
  else pool=[];
  o.fired=fired;o.offers=shuffle(pool.slice()).slice(0,fired?3:rint(1,3)).map(t=>t.id);
}
function takeJob(L,id){
  const old=L.user;L.teams[old].dco=null;L.user=id;L.coach.schools.push(id);L.coach.security=65;
  const t=L.teams[id];L.fac={stadium:clamp(t.prestige-1,1,5),training:clamp(t.prestige-1,1,5),rehab:clamp(t.prestige-2,1,5)};L.captains=[];L.fan=55;L.morale=65;
  L.news.unshift({t:`You are the new head coach of ${teamName(t)}.`,good:true});seedRecords(L);
}
const portalCost=p=>[0,40,90,180,320,520][clamp(Math.round(ovr(p)),1,5)];
function buildPortal(L){
  const pool=(L.off.portalPool||[]).filter(p=>p.from!==L.user);
  while(pool.length<14){const t=pick(L.teams.filter(x=>x.id!==L.user));const pos=pick(POS_ORDER.filter(p=>p!=='K'));const p=genPlayer(pos,1.4+t.prestige*.55,rint(1,3));pool.push({...p,from:t.id})}
  L.off.portal=pool.sort((a,b)=>ovr(b)-ovr(a)).slice(0,16).map(p=>({...p,signed:false}));
}
function recruitInterest(L,stars){const u=L.teams[L.user];return clamp(Math.round(48+u.prestige*11-stars*10+(L.fan-50)/4+(L.coach.natties?6:0)+R(-14,14)),5,96)}
function buildRecruits(L){
  const u=L.teams[L.user];const need=POS_ORDER.flatMap(p=>Array(POS_COUNTS[p]).fill(p));
  const spot=hasTrait('oc','Talent Spotter');
  L.off.recruits=Array.from({length:22},()=>{const pos=pick(need);const st=clamp(Math.round(R(1,3.4)+u.prestige*.35),1,5);const p=genPlayer(pos,st+.3,1);if(spot){const k=PATTR[pos][0];p[k]=Math.min(5,p[k]+1)}return {...p,stars:st,interest:recruitInterest(L,st),offered:false,visit:false}}).sort((a,b)=>b.stars-a.stars);
  const ph=L.history[L.history.length-1]||{};
  L.off.rp=10+u.prestige*2+(ph.madePO?3:0)+(ph.champ?3:0)+(L.heisman&&L.heisman.team===L.user?2:0);L.off.nilBoost=0;
}
const recruitCost=p=>p.stars*2-1;
function signingDay(L){
  const u=L.teams[L.user];const res=[];
  for(const r of L.off.recruits){if(!r.offered)continue;const ch=r.interest+(r.visit?20:0);const ok=Math.random()*100<ch;res.push({name:fullName(r),pos:r.pos,stars:r.stars,ok});
    if(ok&&u.roster.length<ROSTER_CAP){const p={...r};['stars','interest','offered','visit'].forEach(k=>delete p[k]);p.isNew=true;p.ss=newSS();u.roster.push(p)}}
  const classes=L.teams.map(t=>({id:t.id,s:t.id===L.user?sum(res.filter(r=>r.ok).map(r=>r.stars**1.5)):t.prestige*R(5,9)+R(0,8)})).sort((a,b)=>b.s-a.s);
  L.off.signing={res,classRank:classes.findIndex(c=>c.id===L.user)+1,top:classes.slice(0,5).map(c=>c.id)};
}
function startNewSeason(L){
  const u=L.teams[L.user];const camp=[];const trainM=1+.2*(L.fac.training-1);
  for(const t of L.teams){
    const g=t.rec.w;
    if(t.id===L.user){const h=L.history[L.history.length-1];if(h.champ||g>=10||h.madePO)t.prestige=Math.min(5,t.prestige+1);else if(g<=4)t.prestige=Math.max(1,t.prestige-1)}
    else if(Math.random()<.35)t.prestige=clamp(t.prestige+(g>=9?1:g<=3?-1:0),1,5);
    for(const p of t.roster){
      if(p.isNew){delete p.isNew;continue}
      if(p.redshirt&&p.ss.gp<=4&&!p.rs){p.rs=true}else p.yr=Math.min(4,p.yr+1);
      p.redshirt=false;
      const ch=[0,.35,.25,.15,.08][p.yr-1]||.08;for(const k of PATTR[p.pos])if(Math.random()<ch)p[k]=Math.min(5,p[k]+1);
      p.cond=100;p.inj=0;p.injWhy='';
    }
    for(const pos of POS_ORDER){let have=t.roster.filter(p=>p.pos===pos).length;while(have<POS_COUNTS[pos]){t.roster.push(genPlayer(pos,t.id===L.user?1.5:1.3+t.prestige*.5,1));have++}}
    assignNumbers(t);
  }
  for(const p of u.roster)addXP(p,20*trainM,camp);
  const h=L.history[L.history.length-1];
  L.nil+=300+u.prestige*150+L.fan*4+(h.champ?400:0)+(h.madePO?200:0);
  if(!L.captains.length)L.captains=u.roster.filter(p=>p.yr>=3).sort((a,b)=>ovr(b)-ovr(a)).slice(0,2).map(p=>p.id);
  L.season++;L.week=0;L.phase='regular';L.off=null;L.lastWeek=null;L.heisman=null;L.heismanWatch=null;L.potw=null;L.event=null;
  refreshStaffPool(L);resetRecords(L);buildSchedule(L);updateRankings(L);
  L.news.unshift({t:`Fall camp is done. ${camp.length} rating upgrades from spring practice and camp.`,good:true});
  return camp;
}
