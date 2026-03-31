async function fetchJson(url, opts){
  const r = await fetch(url, opts);
  if(!r.ok) throw new Error('Network error');
  return r.json();
}

async function loadAll(){
  const anns = await fetchJson('/api/announcements');
  document.getElementById('announcements').innerHTML = anns.map(a=>`<div><strong>${a.title}</strong> — ${a.createdAt}<div>${a.body||''}</div></div>`).join('');

  const sched = await fetchJson('/api/schedule');
  document.getElementById('schedule').innerHTML = sched.map(s=>`<div>${s.date} — ${s.person}</div>`).join('');

  const reps = await fetchJson('/api/reports');
  document.getElementById('reports').innerHTML = reps.map(r=>`<div><strong>${r.title}</strong> from ${r.from} — ${r.createdAt}<div>${r.description||''}</div></div>`).join('');
}

document.getElementById('postAnn').onclick = async ()=>{
  const title = document.getElementById('annTitle').value;
  const body = document.getElementById('annBody').value;
  await fetchJson('/api/announcements', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({title, body, author:'web'})});
  await loadAll();
}

document.getElementById('postSched').onclick = async ()=>{
  const date = document.getElementById('schedDate').value;
  const person = document.getElementById('schedPerson').value;
  await fetchJson('/api/schedule', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({date, person})});
  await loadAll();
}

document.getElementById('postReport').onclick = async ()=>{
  const from = document.getElementById('repFrom').value;
  const title = document.getElementById('repTitle').value;
  const description = document.getElementById('repDesc').value;
  await fetchJson('/api/reports', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({from, title, description})});
  await loadAll();
}

loadAll().catch(e=>console.error(e));
