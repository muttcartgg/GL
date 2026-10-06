/* =========================================================
   04b · Coaching tab: head coach profile, coaching points, perk tree
   ========================================================= */
function hubCoach(){
  const c=ensureCoach(LG.coach),u=T(LG.user);
  const owned=PERKS.filter(p=>c.perks[p.id]).length;
  const prof=`<div class="card hero"><div class="eyebrow">Head coach${c.real?' · real-life coach':''}</div>
    <div class="h2">${esc(c.name)} ${ovBadge(c.ovr||70)}</div>
    <div class="tags"><span class="tag gold">${esc(c.arch)}</span>${c.lin?`<span class="tag">Coaching tree: ${esc(c.lin)}</span>`:''}<span class="tag">${c.w}–${c.l} here</span><span class="tag ${(c.cp||0)>0?'ok':''}">${c.cp||0} coaching points</span></div>
    <p class="note">Coaching points come from wins (2 each, 1 for a loss), ranked and rivalry upsets, and big seasons. Spend them to unlock perks. Each branch has four tiers and you must unlock a tier before the next one. Head coach overall also nudges your team's strength and recruiting.</p>
    <div class="kv"><span>Perks unlocked</span><b>${owned}/${PERKS.length}</b></div></div>`;
  const branch=k=>{const [name,sub]=BRANCH[k];
    return `<div class="card"><div class="eyebrow">${esc(sub)}</div><div class="h2">${name}</div><div class="list">${PERKS.filter(p=>p.b===k).map(p=>{
      const st=perkState(c,p);
      const btn=st==='own'?'<span class="tag ok">Unlocked</span>':st==='locked'?'<span class="tag">Locked</span>':`<button class="btn sm ${st==='poor'?'ghost':''}" id="perk-${p.id}" ${st==='poor'?'disabled':''}>${p.cost} CP</button>`;
      return `<div class="lrow"><span class="l"><span class="num">T${p.t}</span><span><b>${esc(p.name)}</b><br><small class="note">${esc(p.d)}</small></span></span>${btn}</div>`}).join('')}</div></div>`};
  const staff=(k,s)=>`<div class="lrow"><span class="l"><span class="tag">${k.toUpperCase()}</span><span><b>${esc(s.name)}</b> ${starStr(s.r)}<br><small class="note">${esc(s.trait)}</small></span></span></div>`;
  return prof+`<div class="grid2">${branch('rec')}${branch('dev')}</div><div class="grid2">${branch('tac')}<div class="card"><div class="h2">Coordinators</div><div class="list">${staff('oc',LG.staff.oc)}${staff('dc',LG.staff.dc)}</div><p class="note">Hire coordinators on the Program tab with coaching credits.</p></div></div>`;
}
function bindCoach(){
  if(typeof TAB==='undefined'||TAB!=='coach')return;
  PERKS.forEach(p=>on('perk-'+p.id,()=>{if(buyPerk(p.id)){saveNow();rerender();toast(p.name+' unlocked')}}));
}
/* Pick whether to coach as the school's real head coach or create your own */
function openCoachChoice(id){
  const L=SETUP.L,t=L.teams[id],hc=t.hc;
  if(!hc)return startDynasty(id,false);
  openModal(`<div class="eyebrow">Choose your coach</div><div class="h2">${esc(teamName(t))}</div>
    <div class="lrow"><span class="l"><span><b>${esc(hc.name)}</b> ${ovBadge(hc.ovr)}<br><small class="note">${hc.real?'Current head coach':'Fictional head coach'} · ${esc(hc.arch)}${hc.lin?' · Coaching tree: '+esc(hc.lin):''}</small></span></span></div>
    <p class="note">Play as ${esc(hc.name)} and start with the ${esc(hc.arch)} perks already unlocked and their coach overall. Or build your own coach and choose where your first 3 coaching points go.</p>
    <div class="btns"><button class="btn" id="asHC">Play as ${esc(hc.name)}</button><button class="btn ghost" id="asNew">Create my own coach</button><button class="btn ghost" id="ccX">Back</button></div>`);
  on('asHC',()=>startDynasty(id,true));on('asNew',()=>startDynasty(id,false));on('ccX',()=>openTeamDetail(id));
}
