/* =========================================================
   02 · League data: schools, players, ratings, staff
   ========================================================= */
const PLACES=['Ashford','Blackwater','Brightwood','Caldera','Copperton','Crestview','Dunmore','Eastmarch','Fairhaven','Foxhollow','Glenrock','Harrowgate','Highmoor','Ironvale','Juniper Ridge','Kestrel Point','Lakeshire','Marrow Creek','Northgate','Oakhurst','Pinecrest','Quarry Hill','Red Mesa','Saltmarsh','Silverlake','Stonebridge','Thornfield','Valemont','Westbrook','Wildbrook','Yellowpine','Zephyr Bay'];
const MASCOTS=['Ravens','Wolves','Comets','Foxes','Stallions','Hornets','Owls','Pioneers','Bison','Falcons','Cyclones','Miners','Herons','Gators','Lynx','Rangers','Marlins','Coyotes','Phantoms','Kodiaks','Vipers','Monarchs','Sentinels','Mustangs','Badgers','Raptors','Thunderbirds','Pilots','Lumberjacks','Stingrays','Grizzlies','Jaguars'];
const C1=['#C8102E','#0057B8','#F2A900','#00843D','#6A1B9A','#FF6B00','#00A3AD','#8B0000','#1D428A','#B3A369','#E4002B','#007A33','#FFC72C','#4B2E83','#D50032','#00B5E2','#9E1B32','#FF8200','#005A43','#7BAFD4','#B9975B','#0C2340','#CE1141','#2D68C4','#F56600','#5E2750','#00338D','#A6192E','#18453B','#FDB927','#BA0C2F','#3A5DAE'];
const C2=['#FFFFFF','#111418','#C9A227','#0C2340','#9EA2A2'];
const CONFS=['Coastal','Heartland','Summit','Frontier'];
const FIRST=['Aiden','Marcus','Jalen','Tyler','Caleb','Devin','Luis','Mason','Trey','Isaiah','Cole','Darius','Ethan','Malik','Noah','Owen','Andre','Bryce','Cam','Dante','Elijah','Gavin','Hunter','Jace','Kendall','Logan','Miles','Nico','Parker','Quinn','Reid','Sam','Tre','Wyatt','Xavier','Zion','Brody','Colby','Jaylen','Rashad','Keon','Mateo','Desmond','Silas','Tobias','Amari','Bo','Carson','DeShawn','Emmett','Jamal','Kai','Luca','Omar','Roman','Tariq','Vince'];
const LAST=['Adams','Baker','Carter','Dawson','Ellis','Foster','Grant','Hayes','Irving','Jennings','Kerr','Lawson','Mercer','Nolan','Ortiz','Price','Quarles','Reyes','Sutton','Tate','Underwood','Vance','Walker','Young','Bishop','Coleman','Drake','Fletcher','Gaines','Holloway','Jefferson','Knox','McAllister','Pruitt','Rhodes','Shepherd','Thornton','Whitfield','Boone','Crawford','Okafor','Delgado','Brennan','Castillo','Mbeki','Abernathy','Beckett','Cruz','Dupree','Espinoza','Fairley','Goode','Hollis','Ivey','Kincaid','Landry','Moreau','Nakamura','Osei','Pettaway','Rivers','Stroud','Tillman','Vasquez','Wade'];
const TROPHY_A=['Golden','Iron','Copper','Silver','Bronze','Old','Brass','Granite','Cedar','Steel','Crimson','Lost'];
const TROPHY_B=['Lantern','Anvil','Compass','Spike','Canteen','Kettle','Saddle','Oar','Plow','Shovel','Horseshoe','Railroad Lamp','Mile Marker','Anchor','Pocket Watch','Wagon Wheel'];
const BOWLS=['Harbor Lights Bowl','Prairie Bowl','Evergreen Bowl','Desert Classic','Gulf Coast Bowl','Mountain Pass Bowl','Lakeshore Bowl','Canyon Bowl','Redwood Bowl','Riverboat Bowl','Copper State Bowl','Heartland Classic'];
const CFP_QF=['Sunrise Bowl','Golden Coast Bowl','Twin Rivers Bowl','Starlight Bowl'];
const CFP_SF=['Summit Bowl','Bluewater Bowl'];

const POS_ORDER=['QB','RB','WR','TE','OL','DL','LB','CB','S','K'];
const POS_NAME={QB:'Quarterbacks',RB:'Running backs',WR:'Wide receivers',TE:'Tight ends',OL:'Offensive line',DL:'Defensive line',LB:'Linebackers',CB:'Cornerbacks',S:'Safeties',K:'Kicker'};
const POS_COUNTS={QB:3,RB:3,WR:5,TE:2,OL:7,DL:6,LB:4,CB:4,S:3,K:1};
const STARTERS={QB:1,RB:1,WR:3,TE:1,OL:5,DL:4,LB:2,CB:3,S:2,K:1};
const ROSTER_CAP=46;
const NUMS={QB:[1,19],RB:[20,39],WR:[1,19],TE:[80,89],OL:[50,79],DL:[90,99],LB:[40,59],CB:[20,39],S:[20,49],K:[1,49]};
const PATTR={QB:['thr','acc','spd','end'],RB:['spd','str','cat','end'],WR:['cat','spd','str','end'],TE:['cat','str','spd','end'],OL:['str','end','spd'],DL:['tkl','str','spd','end'],LB:['tkl','str','spd','end'],CB:['spd','tkl','cat','end'],S:['spd','tkl','cat','end'],K:['thr','acc']};
const ANAME={spd:'Speed',str:'Strength',cat:'Catching',thr:'Arm',acc:'Accuracy',tkl:'Tackling',end:'Stamina'};
const ASHORT={spd:'SPD',str:'STR',cat:'CTH',thr:'ARM',acc:'ACC',tkl:'TKL',end:'STA'};
const attrName=(pos,k)=>pos==='K'&&k==='thr'?'Leg':(pos==='CB'||pos==='S')&&k==='cat'?'Ball skills':ANAME[k];
const attrShort=(pos,k)=>pos==='K'&&k==='thr'?'LEG':(pos==='CB'||pos==='S')&&k==='cat'?'BSK':ASHORT[k];
const W8={QB:{thr:.4,acc:.35,spd:.1,end:.15},RB:{spd:.45,str:.25,cat:.1,end:.2},WR:{cat:.4,spd:.4,str:.1,end:.1},TE:{cat:.35,str:.35,spd:.2,end:.1},OL:{str:.6,end:.25,spd:.15},DL:{tkl:.3,str:.35,spd:.2,end:.15},LB:{tkl:.4,str:.2,spd:.3,end:.1},CB:{spd:.45,tkl:.2,cat:.2,end:.15},S:{spd:.35,tkl:.35,cat:.15,end:.15},K:{thr:.55,acc:.45}};
const BIAS={QB:{thr:.5,acc:.3},RB:{spd:.4,str:.2},WR:{spd:.4,cat:.3},TE:{str:.2},OL:{str:.6,spd:-.9},DL:{str:.4,spd:-.4},LB:{tkl:.3},CB:{spd:.5},S:{spd:.3,tkl:.2},K:{}};
const YR=['FR','SO','JR','SR'];
const ATTR_KEYS=['spd','str','cat','thr','acc','tkl','end'];
const newSS=()=>({gp:0,pa:0,pc:0,py:0,ptd:0,int:0,ra:0,ry:0,rtd:0,rec:0,recy:0,rectd:0,tkl:0,sck:0,dint:0,fgm:0,fga:0});

function genPlayer(pos,q,yr){
  const b=BIAS[pos]||{};const p={id:uid(),first:pick(FIRST),last:pick(LAST),pos,yr:yr||rint(1,4),num:0,tone:rint(0,3),cond:100,inj:0,injWhy:'',xp:rint(0,40),ss:newSS(),rs:false,redshirt:false,home:pick(PLACES)};
  for(const k of ATTR_KEYS)p[k]=clamp(Math.round(q+(b[k]||0)+R(-1.2,1.2)),1,5);
  return p;
}
function assignNumbers(team){
  const used=new Set(team.roster.filter(p=>p.num).map(p=>p.num));
  for(const p of team.roster){if(p.num)continue;const [a,b]=NUMS[p.pos];let n=0;for(let t=0;t<50;t++){const c=rint(a,b);if(!used.has(c)){n=c;break}}p.num=n||rint(a,b);used.add(p.num)}
}
const ovr=p=>{let s=0;const w=W8[p.pos];for(const k in w)s+=p[k]*w[k];return s};
function depth(t,pos){
  const list=t.roster.filter(p=>p.pos===pos);
  const ord=(t.dco&&t.dco[pos])||[];
  const key=p=>{const i=ord.indexOf(p.id);return i<0?1000-ovr(p):i};
  const ok=p=>p.inj<=0&&!p.redshirt;
  return list.filter(ok).sort((a,b)=>key(a)-key(b)).concat(list.filter(p=>!ok(p)).sort((a,b)=>ovr(b)-ovr(a)));
}
const starters=(t,pos)=>depth(t,pos).slice(0,STARTERS[pos]);
function unitOvr(t,list){let s=0,n=0;for(const pos of list)for(const p of starters(t,pos)){s+=ovr(p);n++}return n?s/n:3}
const offOvr=t=>unitOvr(t,['QB','RB','WR','TE','OL']);
const defOvr=t=>unitOvr(t,['DL','LB','CB','S']);
const teamOvr=t=>(offOvr(t)*1.05+defOvr(t)*.95)/2;
const teamName=t=>`${t.city} ${t.name}`;
const fullName=p=>`${p.first} ${p.last}`;
const yrStr=p=>(p.rs?'RS ':'')+YR[clamp(p.yr,1,4)-1];

/* ---------- coaching staff ---------- */
const OC_TRAITS={'Play Caller':'Receivers gain separation faster','QB Guru':'Quarterbacks earn 25% more XP','Talent Spotter':'Recruits arrive with +1 star in a key rating','Motivator':'Morale drops half as much after losses'};
const DC_TRAITS={'Physio':'Half as many injuries','Ball Hawk':'More takeaways on defense','Run Stopper':'Opponents score less often','Disciplinarian':'Fewer penalties and calmer dilemmas'};
function genStaff(kind,r){return {name:pick(FIRST)+' '+pick(LAST),r:r||clamp(Math.round(R(1,5.4)),1,5),trait:pick(Object.keys(kind==='oc'?OC_TRAITS:DC_TRAITS))}}
const staffCost=s=>s.r*4;
const hasTrait=(k,t)=>LG&&LG.staff&&LG.staff[k]&&LG.staff[k].trait===t;

/* ---------- league generation ---------- */
function genTeam(i,place,mascot,c1,prestige,conf){
  const suf=pick(['State','Tech','','','State','University']);
  const c2s=C2.filter(c=>Math.abs(lum(c)-lum(c1))>.3);
  const t={id:i,city:place+(suf&&suf!=='University'?' '+suf:''),name:mascot,abbr:'',c1,c2:pick(c2s.length?c2s:['#FFFFFF']),conf,prestige,roster:[],rec:null,
    rival:null,trophy:'',stadium:place+' '+pick(['Memorial Stadium','Field','Coliseum','Stadium','Bowl']),cap:Math.round((28+prestige*14+R(-6,10)))*1000,
    titles:0,ccTitles:0,bowlWins:0,playoffApps:0,dco:null,cc:false};
  const q=1.6+prestige*.55;
  for(const pos of POS_ORDER)for(let k=0;k<POS_COUNTS[pos];k++)t.roster.push(genPlayer(pos,q));
  assignNumbers(t);return t;
}
function genLeague(name){
  const places=shuffle(PLACES.slice()),masc=shuffle(MASCOTS.slice()),cols=shuffle(C1.slice());
  const prest=shuffle([5,5,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,1,1,1,1]);
  const abbrs=new Set();
  const teams=places.map((pl,i)=>{
    const t=genTeam(i,pl,masc[i],cols[i],prest[i],Math.floor(i/8));
    const letters=pl.replace(/[^A-Za-z]/g,'').toUpperCase();
    let ab=letters.slice(0,3);if(abbrs.has(ab))ab=letters[0]+letters.slice(-2);if(abbrs.has(ab))ab=letters.slice(0,2)+letters.slice(-1);if(abbrs.has(ab))ab=letters.slice(0,4);abbrs.add(ab);t.abbr=ab;
    return t;
  });
  const L={version:VERSION,name:name||'My Dynasty',season:2026,week:0,phase:'regular',user:null,teams,weeks:[],rank:[],credits:8,nil:400,history:[],
    settings:{qlen:180,diff:1,muted:false,style:'modern'},
    coach:{name:'Coach',w:0,l:0,seasons:0,natties:0,confs:0,bowls:0,playoffs:0,schools:[],security:70,coy:0},
    staff:{oc:genStaff('oc',2),dc:genStaff('dc',2)},pool:{oc:[],dc:[]},fac:{stadium:1,training:1,rehab:1},fan:60,morale:70,regime:'normal',focus:'balanced',captains:[],
    event:null,news:[],records:{},awards:[],heisman:null,potw:null,off:null,live:null,lastWeek:null,ts:newTeamStats(),cfp:null,confOrder:null,hcWeek:3,champ:null};
  L.confOrder=[0,1,2,3].map(c=>shuffle(teams.filter(t=>t.conf===c).map(t=>t.id)));
  const usedTrophies=new Set();
  for(const [a,b] of [[0,1],[2,3]])for(let j=0;j<8;j++){
    const x=teams[L.confOrder[a][j]],y=teams[L.confOrder[b][j]];x.rival=y.id;y.rival=x.id;
    let tn;do{tn='The '+pick(TROPHY_A)+' '+pick(TROPHY_B)}while(usedTrophies.has(tn));usedTrophies.add(tn);
    x.trophy=y.trophy=tn;x.holder=y.holder=pick([x.id,y.id]);
  }
  refreshStaffPool(L);
  resetRecords(L);buildSchedule(L);updateRankings(L);
  return L;
}
const newTeamStats=()=>({g:0,pf:0,pa:0,py:0,ry:0,thirdA:0,thirdC:0,rzA:0,rzTD:0,to:0,pen:0});
function refreshStaffPool(L){L.pool={oc:[genStaff('oc'),genStaff('oc')],dc:[genStaff('dc'),genStaff('dc')]}}
function resetRecords(L){for(const t of L.teams){t.rec={w:0,l:0,cw:0,cl:0,pf:0,pa:0};t.cc=false;for(const p of t.roster)p.ss=newSS()}L.ts=newTeamStats()}

/* ---------- save migration ---------- */
function migrate(L){
  if(!L||!L.teams)return null;
  if(L.version===VERSION)return L;
  if(L.version!==1)return null;
  // v1 → v3: keep schools, rosters, user team, credits, history; restart the current season with the new calendar
  for(const t of L.teams){
    for(const p of t.roster){p.str=p.str||clamp(Math.round((p.spd+p.end)/2+R(-1,1)),1,5);p.acc=p.acc||clamp(Math.round(p.thr+R(-1,1)),1,5);p.tkl=p.tkl||clamp(Math.round(p.cat+R(-1,1)),1,5);
      Object.assign(p,{cond:100,inj:0,injWhy:'',xp:0,ss:newSS(),rs:false,redshirt:false,home:pick(PLACES)})}
    for(const pos of POS_ORDER){let have=t.roster.filter(p=>p.pos===pos).length;while(have<POS_COUNTS[pos]){t.roster.push(genPlayer(pos,1.6+t.prestige*.5));have++}}
    assignNumbers(t);
    Object.assign(t,{stadium:t.city+' Stadium',cap:(30+t.prestige*14)*1000,bowlWins:0,playoffApps:0,dco:null,cc:false});
  }
  const fresh=genLeague(L.name);
  Object.assign(fresh,{teams:L.teams,user:L.user,credits:L.credits||8,season:L.season,history:(L.history||[]).map(h=>({...h})),settings:{...fresh.settings,...(L.settings||{}),style:'modern'}});
  fresh.confOrder=[0,1,2,3].map(c=>shuffle(fresh.teams.filter(t=>t.conf===c).map(t=>t.id)));
  const used=new Set();
  for(const [a,b] of [[0,1],[2,3]])for(let j=0;j<8;j++){const x=fresh.teams[fresh.confOrder[a][j]],y=fresh.teams[fresh.confOrder[b][j]];x.rival=y.id;y.rival=x.id;let tn;do{tn='The '+pick(TROPHY_A)+' '+pick(TROPHY_B)}while(used.has(tn));used.add(tn);x.trophy=y.trophy=tn;x.holder=y.holder=x.id}
  fresh.coach.name='Coach';fresh.coach.schools=[fresh.user];
  resetRecords(fresh);buildSchedule(fresh);updateRankings(fresh);
  fresh.news.unshift({t:'Your dynasty was carried over to the new version. The current season restarts with the new college calendar.'});
  return fresh;
}

/* ---------- conference names + team packs ---------- */
const confName=(c,L)=>{L=L||LG||(typeof SETUP!=='undefined'&&SETUP&&SETUP.L);return (L&&L.confNames&&L.confNames[c])||CONFS[c]};
/* Optional real-programs pack for personal play. Order = conference blocks of 8 (conf 0,1,2,3).
   Cross-conference rivals line up by index; badges use text abbreviations, not official logos. */
const REAL_PACK={conferences:['SEC','ACC','Big Ten','Big 12'],teams:[
 {school:'Alabama',mascot:'Crimson Tide',abbr:'ALA',primary:'#9E1B32',secondary:'#FFFFFF',prestige:5,stadium:'Bryant–Denny Stadium'},
 {school:'Georgia',mascot:'Bulldogs',abbr:'UGA',primary:'#BA0C2F',secondary:'#000000',prestige:5,stadium:'Sanford Stadium',rival:15,trophy:'Clean, Old-Fashioned Hate'},
 {school:'LSU',mascot:'Tigers',abbr:'LSU',primary:'#461D7C',secondary:'#FDD023',prestige:4,stadium:'Tiger Stadium'},
 {school:'Texas',mascot:'Longhorns',abbr:'TEX',primary:'#BF5700',secondary:'#FFFFFF',prestige:5,stadium:'DKR–Texas Memorial Stadium'},
 {school:'Tennessee',mascot:'Volunteers',abbr:'TENN',primary:'#FF8200',secondary:'#FFFFFF',prestige:4,stadium:'Neyland Stadium'},
 {school:'Ole Miss',mascot:'Rebels',abbr:'MISS',primary:'#CE1126',secondary:'#14213D',prestige:4,stadium:'Vaught–Hemingway Stadium'},
 {school:'Florida',mascot:'Gators',abbr:'UF',primary:'#0021A5',secondary:'#FA4616',prestige:3,stadium:'Ben Hill Griffin Stadium',rival:9,trophy:'Sunshine Showdown'},
 {school:'Auburn',mascot:'Tigers',abbr:'AUB',primary:'#0C2340',secondary:'#E87722',prestige:3,stadium:'Jordan–Hare Stadium'},
 {school:'Clemson',mascot:'Tigers',abbr:'CLEM',primary:'#F56600',secondary:'#522D80',prestige:4,stadium:'Memorial Stadium'},
 {school:'Florida State',mascot:'Seminoles',abbr:'FSU',primary:'#782F40',secondary:'#CEB888',prestige:4,stadium:'Doak Campbell Stadium',rival:6,trophy:'Sunshine Showdown'},
 {school:'Miami',mascot:'Hurricanes',abbr:'MIA',primary:'#F47321',secondary:'#005030',prestige:4,stadium:'Hard Rock Stadium'},
 {school:'SMU',mascot:'Mustangs',abbr:'SMU',primary:'#C8102E',secondary:'#0033A0',prestige:3,stadium:'Gerald J. Ford Stadium'},
 {school:'Louisville',mascot:'Cardinals',abbr:'LOU',primary:'#AD0000',secondary:'#000000',prestige:3,stadium:'L&N Federal Credit Union Stadium'},
 {school:'North Carolina',mascot:'Tar Heels',abbr:'UNC',primary:'#7BAFD4',secondary:'#13294B',prestige:2,stadium:'Kenan Stadium'},
 {school:'Virginia Tech',mascot:'Hokies',abbr:'VT',primary:'#630031',secondary:'#CF4420',prestige:2,stadium:'Lane Stadium'},
 {school:'Georgia Tech',mascot:'Yellow Jackets',abbr:'GT',primary:'#B3A369',secondary:'#003057',prestige:2,stadium:'Bobby Dodd Stadium',rival:1,trophy:'Clean, Old-Fashioned Hate'},
 {school:'Ohio State',mascot:'Buckeyes',abbr:'OSU',primary:'#BB0000',secondary:'#666666',prestige:5,stadium:'Ohio Stadium'},
 {school:'Michigan',mascot:'Wolverines',abbr:'MICH',primary:'#00274C',secondary:'#FFCB05',prestige:5,stadium:'Michigan Stadium'},
 {school:'Penn State',mascot:'Nittany Lions',abbr:'PSU',primary:'#041E42',secondary:'#FFFFFF',prestige:4,stadium:'Beaver Stadium'},
 {school:'Oregon',mascot:'Ducks',abbr:'ORE',primary:'#154733',secondary:'#FEE123',prestige:5,stadium:'Autzen Stadium'},
 {school:'USC',mascot:'Trojans',abbr:'USC',primary:'#990000',secondary:'#FFC72C',prestige:4,stadium:'LA Memorial Coliseum',rival:31,trophy:'Jeweled Shillelagh'},
 {school:'Wisconsin',mascot:'Badgers',abbr:'WIS',primary:'#C5050C',secondary:'#FFFFFF',prestige:3,stadium:'Camp Randall Stadium'},
 {school:'Iowa',mascot:'Hawkeyes',abbr:'IOWA',primary:'#000000',secondary:'#FFCD00',prestige:3,stadium:'Kinnick Stadium',rival:29,trophy:'Cy-Hawk Trophy'},
 {school:'Nebraska',mascot:'Cornhuskers',abbr:'NEB',primary:'#E41C38',secondary:'#FFFFFF',prestige:3,stadium:'Memorial Stadium',rival:28,trophy:'Buffalo Head Trophy'},
 {school:'Utah',mascot:'Utes',abbr:'UTAH',primary:'#CC0000',secondary:'#FFFFFF',prestige:3,stadium:'Rice–Eccles Stadium'},
 {school:'Kansas State',mascot:'Wildcats',abbr:'KSU',primary:'#512888',secondary:'#FFFFFF',prestige:3,stadium:'Bill Snyder Family Stadium'},
 {school:'Oklahoma State',mascot:'Cowboys',abbr:'OKST',primary:'#FF7300',secondary:'#000000',prestige:3,stadium:'Boone Pickens Stadium'},
 {school:'BYU',mascot:'Cougars',abbr:'BYU',primary:'#002E5D',secondary:'#FFFFFF',prestige:3,stadium:'LaVell Edwards Stadium'},
 {school:'Colorado',mascot:'Buffaloes',abbr:'COLO',primary:'#000000',secondary:'#CFB87C',prestige:3,stadium:'Folsom Field',rival:23,trophy:'Buffalo Head Trophy'},
 {school:'Iowa State',mascot:'Cyclones',abbr:'ISU',primary:'#C8102E',secondary:'#F1BE48',prestige:3,stadium:'Jack Trice Stadium',rival:22,trophy:'Cy-Hawk Trophy'},
 {school:'Arizona State',mascot:'Sun Devils',abbr:'ASU',primary:'#8C1D40',secondary:'#FFC627',prestige:4,stadium:'Mountain America Stadium'},
 {school:'Notre Dame',mascot:'Fighting Irish',abbr:'ND',primary:'#0C2340',secondary:'#C99700',prestige:5,stadium:'Notre Dame Stadium',rival:20,trophy:'Jeweled Shillelagh'}
]};
function applyTeamPack(L,pack,opts){
  const list=Array.isArray(pack)?pack:pack&&pack.teams;if(!Array.isArray(list)||!list.length)throw new Error('not a pack');
  if(!Array.isArray(pack)&&Array.isArray(pack.conferences))L.confNames=pack.conferences.slice(0,4).map(x=>String(x).slice(0,18));
  const hex=/^#[0-9a-f]{6}$/i;
  list.slice(0,32).forEach((e,i)=>{const t=L.teams[i];if(!t||!e)return;
    if(e.school)t.city=String(e.school).slice(0,22);if(e.mascot)t.name=String(e.mascot).slice(0,18);if(e.abbr)t.abbr=String(e.abbr).toUpperCase().slice(0,4);
    if(hex.test(e.primary||''))t.c1=e.primary;if(hex.test(e.secondary||''))t.c2=e.secondary;if(e.stadium)t.stadium=String(e.stadium).slice(0,34);
    const pr=parseInt(e.prestige);if(pr>=1&&pr<=5&&pr!==t.prestige){t.prestige=pr;t.cap=Math.round(28+pr*14+R(-6,10))*1000;
      if(opts&&opts.regen&&t.id!==L.user){t.roster=[];for(const pos of POS_ORDER)for(let k=0;k<POS_COUNTS[pos];k++)t.roster.push(genPlayer(pos,1.6+pr*.55));assignNumbers(t);t.dco=null}}
    if(Array.isArray(e.roster)&&e.roster.length)t.roster=rosterFromPack(e.roster,t.prestige);t.dco=null;});
  // line up cross-conference rivals named in the pack
  const has=list.some(e=>e&&Number.isInteger(e.rival));
  if(has){for(const [a,b] of [[0,1],[2,3]]){
    const A=L.teams.filter(t=>t.conf===a).map(t=>t.id),B=L.teams.filter(t=>t.conf===b).map(t=>t.id),oa=[],ob=[];
    for(const id of A){const r=list[id]&&list[id].rival;if(Number.isInteger(r)&&B.includes(r)&&!ob.includes(r)){oa.push(id);ob.push(r)}}
    for(const id of A)if(!oa.includes(id))oa.push(id);for(const id of B)if(!ob.includes(id))ob.push(id);
    L.confOrder[a]=oa;L.confOrder[b]=ob;
    for(let j=0;j<8;j++){const x=L.teams[oa[j]],y=L.teams[ob[j]];x.rival=y.id;y.rival=x.id;const tr=(list[x.id]&&list[x.id].rival===y.id&&list[x.id].trophy)||x.trophy;x.trophy=y.trophy=tr;x.holder=y.holder=pick([x.id,y.id])}
  }if(L.phase==='regular'&&L.week===0)buildSchedule(L)}
  updateRankings(L);
}

/* Roster entries: {name, pos, num?, yr? ('FR'..'SR' or 1-4), ovr? (1-5 stars), spd?, str?, cat?, thr?, acc?, tkl?, end?}
   Missing ratings are generated around the player's overall; open spots are filled with walk-ons. */
function rosterFromPack(list,prestige){
  const out=[];const posMap={OT:'OL',OG:'OL',IOL:'OL',C:'OL',G:'OL',T:'OL',DE:'DL',DT:'DL',EDGE:'DL',NT:'DL',OLB:'LB',ILB:'LB',MLB:'LB',DB:'CB',FS:'S',SS:'S',SAF:'S',PK:'K',P:'K',HB:'RB',FB:'RB',ATH:'WR'};
  for(const e of list.slice(0,ROSTER_CAP)){if(!e||!e.name)continue;let pos=String(e.pos||'').toUpperCase();pos=POS_ORDER.includes(pos)?pos:posMap[pos];if(!pos)continue;
    const q=parseFloat(e.ovr);const p=genPlayer(pos,q>=1&&q<=5?q:1.6+prestige*.55);const nm=String(e.name).trim().split(/\s+/);p.first=nm.shift().slice(0,16);p.last=(nm.join(' ')||'').slice(0,20);
    const yr=typeof e.yr==='string'?['FR','SO','JR','SR'].indexOf(e.yr.toUpperCase().replace(/^RS\s*/,''))+1:parseInt(e.yr);if(yr>=1&&yr<=4)p.yr=yr;if(/^RS/i.test(String(e.yr||'')))p.rs=true;
    const n=parseInt(e.num);if(n>=0&&n<=99)p.num=n;for(const k of ATTR_KEYS){const v=parseInt(e[k]);if(v>=1&&v<=5)p[k]=v}out.push(p)}
  for(const pos of POS_ORDER){let have=out.filter(p=>p.pos===pos).length;while(have<POS_COUNTS[pos]){out.push(genPlayer(pos,1.4+prestige*.5));have++}}
  const t={roster:out};assignNumbers(t);return out;
}
