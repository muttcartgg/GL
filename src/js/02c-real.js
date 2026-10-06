/* =========================================================
   02c · Real-world data: 2026 head coaches, stadiums, star players,
         plus the coaching tree (perks bought with coaching points)
   Head coaches reflect the 2026 carousel (checked against published lists).
   Ratings (OVR) are the game's own estimates. Player stat lines are 2025 numbers.
   Edit any table below to correct or extend it.
   ========================================================= */

/* ---------- head coaches: ABBR:[name, OVR, archetype] ---------- */
const REAL_HC={
 /* SEC */
 ALA:['Kalen DeBoer',91,'Tactician'],ARK:['Ryan Silverfield',76,'Developer'],AUB:['Alex Golesh',80,'Tactician'],UF:['Jon Sumrall',83,'Developer'],UGA:['Kirby Smart',97,'Recruiter'],UK:['Will Stein',76,'Tactician'],LSU:['Lane Kiffin',91,'Tactician'],MSST:['Jeff Lebby',74,'Tactician'],MIZ:['Eli Drinkwitz',82,'Tactician'],OU:['Brent Venables',83,'Developer'],MISS:['Pete Golding',80,'Developer'],SC:['Shane Beamer',79,'Recruiter'],TENN:['Josh Heupel',85,'Tactician'],TEX:['Steve Sarkisian',90,'Tactician'],TAMU:['Mike Elko',88,'Developer'],VAN:['Clark Lea',82,'Developer'],
 /* Big Ten */
 ILL:['Bret Bielema',82,'Developer'],IU:['Curt Cignetti',97,'Developer'],IOWA:['Kirk Ferentz',84,'Developer'],MD:['Mike Locksley',74,'Recruiter'],MICH:['Kyle Whittingham',90,'Developer'],MSU:['Pat Fitzgerald',78,'Developer'],MINN:['P.J. Fleck',82,'Developer'],NEB:['Matt Rhule',83,'Developer'],NW:['David Braun',77,'Developer'],OSU:['Ryan Day',92,'Tactician'],ORE:['Dan Lanning',91,'Recruiter'],PSU:['Matt Campbell',86,'Developer'],PUR:['Barry Odom',76,'Developer'],RUTG:['Greg Schiano',80,'Developer'],UCLA:['Bob Chesney',82,'Developer'],USC:['Lincoln Riley',89,'Tactician'],UW:['Jedd Fisch',78,'Tactician'],WIS:['Luke Fickell',82,'Recruiter'],
 /* Big 12 */
 ARIZ:['Brent Brennan',75,'Recruiter'],ASU:['Kenny Dillingham',84,'Tactician'],BAY:['Dave Aranda',77,'Developer'],BYU:['Kalani Sitake',84,'Developer'],CIN:['Scott Satterfield',75,'Tactician'],COLO:['Deion Sanders',82,'Recruiter'],HOU:['Willie Fritz',78,'Developer'],ISU:['Jimmy Rogers',80,'Developer'],KU:['Lance Leipold',83,'Developer'],KSU:['Collin Klein',78,'Tactician'],OKST:['Eric Morris',78,'Tactician'],TCU:['Sonny Dykes',82,'Tactician'],TTU:['Joey McGuire',84,'Recruiter'],UCF:['Scott Frost',74,'Tactician'],UTAH:['Morgan Scalley',78,'Developer'],WVU:['Rich Rodriguez',80,'Tactician'],
 /* ACC */
 BC:['Bill O\'Brien',78,'Tactician'],CAL:['Tosh Lupoi',76,'Recruiter'],CLEM:['Dabo Swinney',91,'Recruiter'],DUKE:['Manny Diaz',78,'Developer'],FSU:['Mike Norvell',80,'Tactician'],GT:['Brent Key',84,'Developer'],LOU:['Jeff Brohm',86,'Tactician'],MIA:['Mario Cristobal',88,'Recruiter'],UNC:['Bill Belichick',90,'Tactician'],NCST:['Dave Doeren',79,'Developer'],PITT:['Pat Narduzzi',80,'Developer'],SMU:['Rhett Lashlee',85,'Tactician'],STAN:['Tavita Pritchard',70,'Developer'],SYR:['Fran Brown',82,'Recruiter'],UVA:['Tony Elliott',77,'Developer'],VT:['James Franklin',87,'Recruiter'],WAKE:['Jake Dickert',78,'Developer'],
 /* American */
 ARMY:['Jeff Monken',82,'Developer'],CLT:['Tim Albin',72,'Developer'],ECU:['Blake Harrell',74,'Developer'],FAU:['Zach Kittley',70,'Tactician'],MEM:['Charles Huff',78,'Recruiter'],NAVY:['Brian Newberry',78,'Developer'],UNT:['Neal Brown',78,'Developer'],RICE:['Scott Abell',72,'Developer'],USF:['Brian Hartline',76,'Recruiter'],TEM:['K.C. Keeler',76,'Developer'],TUL:['Will Hall',74,'Tactician'],TLSA:['Tre Lamb',70,'Developer'],UAB:['Alex Mortensen',66,'Tactician'],UTSA:['Jeff Traylor',80,'Recruiter'],
 /* Sun Belt */
 APP:['Dowell Loggains',70,'Tactician'],ARST:['Butch Jones',74,'Recruiter'],CCU:['Ryan Beard',72,'Tactician'],GASO:['Clay Helton',72,'Developer'],GAST:['Dell McGee',72,'Developer'],JMU:['Billy Napier',80,'Recruiter'],ULL:['Michael Desormeaux',74,'Developer'],ULM:['Bryant Vincent',66,'Tactician'],LT:['Sonny Cumbie',72,'Tactician'],MRSH:['Tony Gibson',72,'Developer'],ODU:['Ricky Rahne',76,'Tactician'],USA:['Major Applewhite',72,'Tactician'],USM:['Blake Anderson',72,'Tactician'],TROY:['Gerad Parker',70,'Tactician'],
 /* Pac-12 */
 BOIS:['Spencer Danielson',80,'Developer'],CSU:['Jim Mora',78,'Developer'],FRES:['Matt Entz',76,'Developer'],ORST:['JaMarcus Shephard',66,'Recruiter'],SDSU:['Sean Lewis',70,'Tactician'],TXST:['G.J. Kinne',76,'Tactician'],USU:['Bronco Mendenhall',76,'Developer'],WSU:['Kirby Moore',70,'Tactician'],
 /* Mountain West */
 AF:['Troy Calhoun',78,'Developer'],HAW:['Timmy Chang',70,'Tactician'],NEV:['Jeff Choate',68,'Developer'],UNM:['Jason Eck',76,'Developer'],SJSU:['Ken Niumatalolo',74,'Developer'],UNLV:['Dan Mullen',80,'Tactician'],WYO:['Jay Sawvel',70,'Developer'],UTEP:['Scotty Walden',70,'Tactician'],NIU:['Rob Harley',64,'Developer'],NDSU:['Tim Polasek',82,'Developer'],
 /* Conference USA */
 DEL:['Ryan Carty',70,'Tactician'],FIU:['Willie Simmons',72,'Developer'],JVST:['Charles Kelly',74,'Developer'],KENN:['Jerry Mack',74,'Recruiter'],MTSU:['Derek Mason',66,'Developer'],MOST:['Casey Woods',68,'Tactician'],NMSU:['Tony Sanchez',66,'Recruiter'],SHSU:['Phil Longo',66,'Tactician'],WKU:['Tyson Helton',74,'Tactician'],
 /* MAC */
 AKR:['Joe Moorhead',66,'Tactician'],BALL:['Mike Uremovich',64,'Developer'],BGSU:['Eddie George',66,'Recruiter'],BUFF:['Pete Lembo',70,'Developer'],CMU:['Matt Drinkall',66,'Developer'],EMU:['Chris Creighton',72,'Developer'],KENT:['Mark Carney',60,'Tactician'],'M-OH':['Chuck Martin',74,'Developer'],OHIO:['John Hauser',70,'Developer'],SAC:['Alonzo Carter',66,'Recruiter'],TOL:['Mike Jacobs',76,'Developer'],MASS:['Joe Harasymiak',66,'Developer'],WMU:['Lance Taylor',68,'Tactician'],
 /* Independents */
 ND:['Marcus Freeman',90,'Recruiter'],UCON:['Jason Candle',76,'Developer']
};
/* Coaching-tree lineage (who the coach learned under) */
const REAL_LIN={UGA:'Nick Saban',ORE:'Kirby Smart',TEX:'Pete Carroll & Nick Saban',MISS:'Nick Saban',IU:'Nick Saban',MIA:'Nick Saban',MD:'Nick Saban',OSU:'Urban Meyer',OU:'Bob Stoops',USC:'Mike Leach',LSU:'Pete Carroll',TAMU:'Jimbo Fisher',UNC:'Bill Parcells'};

/* ---------- real stadiums: ABBR:[name, capacity] ---------- */
const STADIUMS={
 ALA:['Bryant–Denny Stadium',100077],ARK:['Razorback Stadium',76412],AUB:['Jordan–Hare Stadium',88043],UF:['Ben Hill Griffin Stadium',88548],UGA:['Sanford Stadium',93033],UK:['Kroger Field',61000],LSU:['Tiger Stadium',102321],MSST:['Davis Wade Stadium',60311],MIZ:['Faurot Field',62621],OU:['Oklahoma Memorial Stadium',80126],MISS:['Vaught–Hemingway Stadium',64038],SC:['Williams–Brice Stadium',77559],TENN:['Neyland Stadium',101915],TEX:['Darrell K Royal Stadium',100119],TAMU:['Kyle Field',102733],VAN:['FirstBank Stadium',40350],
 ILL:['Memorial Stadium',60670],IU:['Memorial Stadium',52626],IOWA:['Kinnick Stadium',69250],MD:['SECU Stadium',51802],MICH:['Michigan Stadium',107601],MSU:['Spartan Stadium',75005],MINN:['Huntington Bank Stadium',50805],NEB:['Memorial Stadium',85458],NW:['Ryan Field',35000],OSU:['Ohio Stadium',102780],ORE:['Autzen Stadium',54000],PSU:['Beaver Stadium',106572],PUR:['Ross–Ade Stadium',57236],RUTG:['SHI Stadium',52454],UCLA:['Rose Bowl',89702],USC:['LA Memorial Coliseum',77500],UW:['Husky Stadium',50000],WIS:['Camp Randall Stadium',80321],
 ARIZ:['Arizona Stadium',50782],ASU:['Mountain America Stadium',53599],BAY:['McLane Stadium',45140],BYU:['LaVell Edwards Stadium',63725],CIN:['Nippert Stadium',40000],COLO:['Folsom Field',50183],HOU:['TDECU Stadium',40000],ISU:['Jack Trice Stadium',61500],KU:['David Booth Memorial Stadium',47233],KSU:['Bill Snyder Family Stadium',50000],OKST:['Boone Pickens Stadium',55509],TCU:['Amon G. Carter Stadium',50000],TTU:['Jones AT&T Stadium',60454],UCF:['FBC Mortgage Stadium',44206],UTAH:['Rice–Eccles Stadium',51444],WVU:['Milan Puskar Stadium',60000],
 BC:['Alumni Stadium',44500],CAL:['California Memorial Stadium',62467],CLEM:['Memorial Stadium (Death Valley)',81500],DUKE:['Wallace Wade Stadium',40004],FSU:['Doak Campbell Stadium',79560],GT:['Bobby Dodd Stadium',55000],LOU:['L&N Federal Credit Union Stadium',60800],MIA:['Hard Rock Stadium',64767],UNC:['Kenan Memorial Stadium',50500],NCST:['Carter–Finley Stadium',57583],PITT:['Acrisure Stadium',68400],SMU:['Gerald J. Ford Stadium',32000],STAN:['Stanford Stadium',50424],SYR:['JMA Wireless Dome',49250],UVA:['Scott Stadium',61500],VT:['Lane Stadium',66233],WAKE:['Allegacy Federal Credit Union Stadium',31500],
 ND:['Notre Dame Stadium',77622],ARMY:['Michie Stadium',38000],NAVY:['Navy–Marine Corps Memorial Stadium',34000],BOIS:['Albertsons Stadium',36387],USA:['Hancock Whitney Stadium',25450],JMU:['Bridgeforth Stadium',25000],APP:['Kidd Brewer Stadium',40168],MEM:['Simmons Bank Liberty Stadium',58325],TUL:['Yulman Stadium',30000],UNT:['DATCU Stadium',30850],USF:['Raymond James Stadium',65618],UNLV:['Allegiant Stadium',65000],FRES:['Valley Children\'s Stadium',40727],SDSU:['Snapdragon Stadium',35000],HAW:['Clarence T.C. Ching Complex',15194],UCON:['Pratt & Whitney Stadium',40000],TXST:['UFCU Stadium',30000],UTSA:['Alamodome',65000],ECU:['Dowdy–Ficklen Stadium',50000],ODU:['S.B. Ballard Stadium',22130],WSU:['Martin Stadium',32952],ORST:['Reser Stadium',36820],USU:['Maverik Stadium',25513],TROY:['Veterans Memorial Stadium',30000],LIB:['Williams Stadium',25000],WKU:['Houchens Industries–L.T. Smith Stadium',22113],
 NDSU:['Fargodome',18700]
};

/* ---------- real players: [name, pos, class(1-4), OVR, jersey|null, 2025 line, redshirted?, hometown] ---------- */
const REAL_PLAYERS={
 ALA:[['Bray Hubbard','S',4,91,18,'79 tkl · 4.5 TFL · 2 sck · 4 INT · 6 PBU · 3 FF · All-American',false,'Ocean Springs, MS']],
 TEX:[['Arch Manning','QB',3,93,16,'3,163 pass yds · 26 TD · 7 INT · 399 rush yds · 10 rush TD',true,'New Orleans, LA']],
 OSU:[['Julian Sayin','QB',2,93,12,'3,610 pass yds · 32 TD · 8 INT · 77% comp',true,'Carlsbad, CA'],['Jeremiah Smith','WR',3,99,4,'87 rec · 1,243 yds · 12 TD · unanimous All-American',false,'Miami, FL']],
 ORE:[['Dante Moore','QB',4,94,5,'3,565 pass yds · 30 TD · 10 INT · 71.8% comp',false,'Detroit, MI']],
 MISS:[['Trinidad Chambliss','QB',4,92,null,'3,937 pass yds · 22 TD · 3 INT · 527 rush yds · 8 rush TD',true,'']],
 UGA:[['Gunner Stockton','QB',4,89,null,'2,894 pass yds · 24 TD · 5 INT · 462 rush yds · 10 rush TD',false,'Tennille, GA']],
 ND:[['CJ Carr','QB',3,92,null,'2,741 pass yds · 24 TD · 6 INT · 66.6% comp',true,'Saline, MI']],
 MIA:[['Darian Mensah','QB',3,94,null,'3,973 pass yds · 34 TD · 6 INT (at Duke) · 2nd-team All-ACC',true,'']],
 USC:[['Jayden Maiava','QB',4,90,null,'3,711 pass yds · 24 TD · 6 rush TD · 65.8% comp',false,'']],
 TAMU:[['Marcel Reed','QB',4,89,null,'3,169 pass yds · 493 rush yds · 31 total TD',false,'']],
 OKST:[['Drew Mestemaker','QB',3,88,null,'4,129 pass yds, most in the FBS (at North Texas)',false,'']],
 UW:[['Demond Williams Jr.','QB',3,86,null,'3,000+ pass yds',false,'']],
 OU:[['John Mateer','QB',3,90,null,'1,215 pass yds in first 4 games before a hand injury',false,'']]
};

/* ---------- player helpers ---------- */
function fitOvr(p,target){for(let i=0;i<40;i++){const d=target-ovr(p);if(Math.abs(d)<.015)break;for(const k in W8[p.pos])p[k]=clamp(Math.round((p[k]+d)*10)/10,1,5)}}
function placeReal(t,e){
  const [name,pos,yr,o,num,prev,rs,home]=e;
  const best=t.roster.filter(p=>p.pos===pos).sort((a,b)=>ovr(b)-ovr(a))[0];if(best)t.roster.splice(t.roster.indexOf(best),1);
  const p=genPlayer(pos,fromOV(o),yr);const nm=name.split(' ');p.first=nm.shift();p.last=nm.join(' ');
  p.yr=yr;p.rs=!!rs;fitOvr(p,fromOV(o));p.real=true;p.prev=prev?{y:2025,l:prev}:null;p.home=home||'—';
  if(num){const clash=t.roster.find(x=>x.num===num);if(clash)clash.num=0;p.num=num}else p.num=0;
  t.roster.push(p);assignNumbers(t);
}
function genHC(t){const pr=(t&&t.prestige)||3;return {name:pick(FIRST)+' '+pick(LAST),ovr:clamp(Math.round(52+pr*6+R(-6,8)),50,90),arch:pick(['Recruiter','Developer','Tactician']),real:false,lin:''}}
function applyRealData(L){
  const by={};for(const t of L.teams)by[t.abbr]=t;
  for(const ab in REAL_HC){const t=by[ab];if(!t)continue;const [name,o,arch]=REAL_HC[ab];t.hc={name,ovr:o,arch,real:true,lin:REAL_LIN[ab]||''}}
  for(const ab in STADIUMS){const t=by[ab];if(t){t.stadium=STADIUMS[ab][0];t.cap=STADIUMS[ab][1]}}
  for(const ab in REAL_PLAYERS){const t=by[ab];if(t)for(const e of REAL_PLAYERS[ab])placeReal(t,e)}
  invalidate();
}
function stadiumLine(g){
  if(g.neutral)return 'Neutral site'+(g.tag?' · '+g.tag:'');
  const h=T(g.h);return `${h.stadium} · ${(h.cap||0).toLocaleString()} seats`;
}

/* ---------- coaching tree ---------- */
const BRANCH={rec:['Recruiter','Win the offseason'],dev:['Developer','Grow your players'],tac:['Tactician','Win on Saturdays']};
const PERKS=[
 {id:'r1',b:'rec',t:1,cost:1,name:'Pitch Perfect',d:'+6 to every recruit\'s interest.'},
 {id:'r2',b:'rec',t:2,cost:2,name:'Pipeline',d:'+2 recruiting points each offseason.'},
 {id:'r3',b:'rec',t:3,cost:3,name:'Portal Hunter',d:'Transfer portal players cost 25% less NIL.'},
 {id:'r4',b:'rec',t:4,cost:4,name:'The Closer',d:'Official visits add 35% interest instead of 20%.'},
 {id:'d1',b:'dev',t:1,cost:1,name:'Film Junkie',d:'+10% XP for every player.'},
 {id:'d2',b:'dev',t:2,cost:2,name:'Position Coaches',d:'Backups earn double XP from games.'},
 {id:'d3',b:'dev',t:3,cost:3,name:'Iron Man Program',d:'35% fewer injuries and faster weekly recovery.'},
 {id:'d4',b:'dev',t:4,cost:4,name:'Breakout Camp',d:'Preseason camp gives double XP.'},
 {id:'t1',b:'tac',t:1,cost:1,name:'Game Plan',d:'Your players are 1.5% faster on game day.'},
 {id:'t2',b:'tac',t:2,cost:2,name:'Film Room',d:'Opponents score less on their possessions.'},
 {id:'t3',b:'tac',t:3,cost:3,name:'QB Whisperer',d:'Throwing error drops 12%.'},
 {id:'t4',b:'tac',t:4,cost:4,name:'Clutch Calls',d:'Kicks are 15% easier and no false starts in the 4th quarter.'}
];
const ARCH_START={Recruiter:['r1','r2'],Developer:['d1','d2'],Tactician:['t1','t2']};
const perk=id=>!!(typeof LG!=='undefined'&&LG&&LG.coach&&LG.coach.perks&&LG.coach.perks[id]);
const visitBonus=()=>perk('r4')?35:20;
function ensureCoach(c){if(c.cp==null)c.cp=0;if(!c.perks)c.perks={};if(c.ovr==null)c.ovr=70;if(!c.arch)c.arch='Custom';return c}
function initCoachTree(c,arch){c.perks={};c.cp=arch&&ARCH_START[arch]?2:3;c.arch=arch||'Custom';if(arch&&ARCH_START[arch])for(const id of ARCH_START[arch])c.perks[id]=1}
function perkState(c,p){if(c.perks[p.id])return 'own';const prev=PERKS.find(x=>x.b===p.b&&x.t===p.t-1);if(prev&&!c.perks[prev.id])return 'locked';return (c.cp||0)>=p.cost?'ready':'poor'}
function buyPerk(id){const c=ensureCoach(LG.coach),p=PERKS.find(x=>x.id===id);if(!p)return false;const s=perkState(c,p);if(s!=='ready')return false;c.cp-=p.cost;c.perks[id]=1;return true}
