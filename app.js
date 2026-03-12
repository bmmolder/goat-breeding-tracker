// Red Oak Ranch — Herd Registry
// Firestore only — photos as base64 — password-protected editing

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, deleteDoc, getDocs,
  onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfILf3nZVR5SuUlpzAcmyG-Ty2maDEz38",
  authDomain: "red-oak-ranch.firebaseapp.com",
  projectId: "red-oak-ranch",
  storageBucket: "red-oak-ranch.firebasestorage.app",
  messagingSenderId: "676841101704",
  appId: "1:676841101704:web:b488510e055dab91c0423d"
};

const app     = initializeApp(firebaseConfig);
const db      = getFirestore(app);
const ANIMALS = collection(db, 'animals');
const DELETED = collection(db, 'deleted_animals');

// ── State ─────────────────────────────────────────────────────────────────────
let animals      = [];
let isUnlocked   = false;
let filterStatus = 'all';
let tempKids     = [];
let tempPhotoB64 = null;
let tempPhotoNew = false;

// ── Auth ──────────────────────────────────────────────────────────────────────
function setAuthUI() {
  const status = document.getElementById('authStatus');
  if (!status) return;
  if (isUnlocked) {
    status.textContent = '🔓 Edit Mode — tap to lock';
    status.className   = 'auth-status unlocked';
  } else {
    status.textContent = '🔒 Read Only — tap to unlock';
    status.className   = 'auth-status locked';
  }
  document.querySelectorAll('.edit-only').forEach(el => {
    el.style.display = isUnlocked ? '' : 'none';
  });
}

function toggleAuth() {
  if (isUnlocked) {
    isUnlocked = false;
    setAuthUI();
    showBanner('🔒 Locked — read only', 'info');
  } else {
    const pw = prompt('Enter password to enable editing:');
    if (pw === 'Wagyu') {
      isUnlocked = true;
      setAuthUI();
      showBanner('🔓 Edit mode unlocked', 'success');
    } else if (pw !== null) {
      showBanner('❌ Incorrect password', 'error');
    }
  }
}

// ── Banner ────────────────────────────────────────────────────────────────────
function showBanner(msg, type = 'info') {
  const b = document.getElementById('syncBanner');
  b.textContent = msg;
  b.className = `sync-banner ${type}`;
  b.classList.remove('hidden');
  if (type !== 'error') setTimeout(() => b.classList.add('hidden'), 3000);
}

// ── Listener ──────────────────────────────────────────────────────────────────
function startListener() {
  onSnapshot(ANIMALS, snap => {
    animals = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
    animals.sort((a, b) => {
      const ga = a.status === 'kid' ? 2 : a.sex === 'M' ? 1 : 0;
      const gb = b.status === 'kid' ? 2 : b.sex === 'M' ? 1 : 0;
      if (ga !== gb) return ga - gb;
      return (a.name || '').localeCompare(b.name || '');
    });
    render();
    setAuthUI();
  }, err => {
    showBanner('⚠️ Connection issue', 'error');
    console.error(err);
  });
}

// ── Dates ─────────────────────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}
function daysUntil(d) {
  if (!d) return null;
  const t = new Date(); t.setHours(0,0,0,0);
  return Math.round((new Date(d + 'T00:00:00') - t) / 86400000);
}
function addDays(ds, n) {
  if (!ds) return '';
  const d = new Date(ds + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}
function today() { return new Date().toISOString().split('T')[0]; }
function genId()  { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

// ── Stats ─────────────────────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('statTotal').textContent    = animals.length;
  document.getElementById('statDoes').textContent     = animals.filter(a=>a.sex==='F'&&a.status!=='kid').length;
  document.getElementById('statBucks').textContent    = animals.filter(a=>a.sex==='M'&&a.status!=='kid').length;
  document.getElementById('statKids').textContent     = animals.filter(a=>a.status==='kid').length;
  document.getElementById('statPregnant').textContent = animals.filter(a=>a.status==='pregnant').length;
  document.getElementById('statNursing').textContent  = animals.filter(a=>a.status==='nursing').length;
  const dueSoon = animals.filter(a => { const d=daysUntil(a.dueDate); return d!==null&&d>=-3&&d<=14; });
  const alertCard = document.getElementById('alertCard');
  if (dueSoon.length) {
    alertCard.classList.add('visible');
    document.getElementById('alertList').innerHTML = dueSoon.map(a => {
      const d = daysUntil(a.dueDate);
      const lbl = d<0?`${Math.abs(d)}d overdue`:d===0?'Due TODAY':`in ${d} days`;
      return `<div class="alert-item">${a.name} — <span>${lbl}</span> — ${formatDate(a.dueDate)}</div>`;
    }).join('');
  } else { alertCard.classList.remove('visible'); }
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  updateStats();
  let list = animals;
  if (filterStatus !== 'all') {
    if      (filterStatus==='doe')  list = animals.filter(a=>a.sex==='F'&&a.status!=='kid');
    else if (filterStatus==='buck') list = animals.filter(a=>a.sex==='M'&&a.status!=='kid');
    else                            list = animals.filter(a=>a.status===filterStatus);
  }
  const grid = document.getElementById('goatGrid');
  grid.innerHTML = list.length ? list.map(buildCard).join('')
    : `<div class="empty-state"><div class="icon">🐐</div><p>No animals in this category.</p></div>`;
}

function buildCard(a) {
  const d = daysUntil(a.dueDate);
  const urgentDue = d!==null&&d>=0&&d<=7;
  const dueLine = a.dueDate?(d<0?`Overdue ${Math.abs(d)}d`:d===0?'Due TODAY':`Due in ${d}d`):'';
  const lastW = (a.weights||[]).length?[...a.weights].sort((x,y)=>x.date<y.date?1:-1)[0]:null;
  const lastV = (a.vet||[]).length?[...a.vet].sort((x,y)=>x.date<y.date?1:-1)[0]:null;
  const kidsHtml = (a.kids||[]).length
    ? `<div class="kids-section"><div class="kids-label">Kids (${a.kids.length})</div>
       ${a.kids.map(k=>`<div class="kid-chip">${k.name||'Kid'} <span class="sex-${(k.sex||'').toLowerCase()}">${k.sex||''}</span></div>`).join('')}
       </div>` : '';
  return `<div class="goat-card">
    ${a.photo
      ? `<img class="card-photo" src="${a.photo}" alt="${a.name}" onclick="triggerCardPhoto('${a.firestoreId}')">`
      : `<div class="card-photo-placeholder" onclick="triggerCardPhoto('${a.firestoreId}')"><div class="ph-icon">📷</div><div class="ph-label">Add Photo</div></div>`}
    <input type="file" id="cardPhoto_${a.firestoreId}" class="photo-upload-input" accept="image/*" capture="environment" onchange="handleCardPhoto(event,'${a.firestoreId}')">
    <div class="card-header">
      <div><div class="goat-name">${a.name}</div>
      <div class="goat-id">${[a.age,a.breed].filter(Boolean).join(' · ')||'—'}</div></div>
      <div class="badge-group">
        <span class="sex-badge sex-${a.sex}">${a.sex==='F'?'♀':'♂'}</span>
        <span class="status-badge status-${a.status}">${a.status}</span>
      </div>
    </div>
    <div class="card-body">
      ${a.dob?`<div class="info-row"><span>Born</span><strong>${formatDate(a.dob)}</strong></div>`:''}
      ${a.sire&&a.sire!=='Unknown'?`<div class="info-row"><span>Sire</span><strong>${a.sire}</strong></div>`:''}
      ${a.breedDate?`<div class="info-row"><span>Fertilized</span><strong>${formatDate(a.breedDate)}</strong></div>`:''}
      ${a.dueDate?`<div class="info-row"><span>Due/Delivered</span><strong style="color:${urgentDue?'var(--rust)':'inherit'}">${formatDate(a.dueDate)}${dueLine?' · '+dueLine:''}</strong></div>`:''}
      ${a.notes?`<div class="card-note">${a.notes}</div>`:''}
      ${kidsHtml}
      <div style="display:flex;flex-wrap:wrap;gap:0;margin-top:2px">
        ${lastW?`<div class="weight-pill">⚖️ ${lastW.value} lbs <span style="opacity:.6;font-size:10px">· ${formatDate(lastW.date)}</span></div>`:''}
        ${lastV?`<div class="vet-pill">🩺 ${lastV.type} <span style="opacity:.6;font-size:10px">· ${formatDate(lastV.date)}</span></div>`:''}
      </div>
    </div>
    <div class="card-actions">
      <button class="btn btn-outline btn-sm edit-only" onclick="editAnimal('${a.firestoreId}')">✏️ Edit</button>
      <button class="btn btn-outline btn-sm edit-only" onclick="openWeightModal('${a.firestoreId}')">⚖️ Weight</button>
      <button class="btn btn-outline btn-sm edit-only" onclick="openVetModal('${a.firestoreId}')">🩺 Vet</button>
      <button class="btn btn-outline btn-sm btn-danger edit-only" onclick="deleteAnimal('${a.firestoreId}','${a.name}')">🗑️</button>
    </div>
  </div>`;
}

function filterAnimals(status, el) {
  filterStatus = status;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  render();
}

// ── Photos ────────────────────────────────────────────────────────────────────
function resizeToBase64(file, maxWidth, quality, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth/img.width);
      const canvas = document.createElement('canvas');
      canvas.width=Math.round(img.width*scale); canvas.height=Math.round(img.height*scale);
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      callback(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function handleModalPhoto(event) {
  const file = event.target.files[0]; if (!file) return;
  resizeToBase64(file, 900, 0.72, b64 => {
    tempPhotoB64=b64; tempPhotoNew=true;
    document.getElementById('modalPhotoPreview').src=b64;
    document.getElementById('modalPhotoPreview').style.display='block';
    document.getElementById('modalPhotoHint').style.display='none';
    document.getElementById('modalPhotoRemove').style.display='flex';
  });
}
function removeModalPhoto(e) {
  e.stopPropagation(); tempPhotoB64=null; tempPhotoNew=true;
  document.getElementById('modalPhotoPreview').src='';
  document.getElementById('modalPhotoPreview').style.display='none';
  document.getElementById('modalPhotoHint').style.display='flex';
  document.getElementById('modalPhotoRemove').style.display='none';
  document.getElementById('modalPhotoInput').value='';
}
function setModalPhoto(b64) {
  tempPhotoB64=b64||null; tempPhotoNew=false;
  const prev=document.getElementById('modalPhotoPreview'),hint=document.getElementById('modalPhotoHint'),rem=document.getElementById('modalPhotoRemove');
  if (b64){prev.src=b64;prev.style.display='block';hint.style.display='none';rem.style.display='flex';}
  else{prev.src='';prev.style.display='none';hint.style.display='flex';rem.style.display='none';}
}
function triggerCardPhoto(firestoreId) {
  if (!isUnlocked) { showBanner('🔒 Unlock to add photos','info'); return; }
  document.getElementById('cardPhoto_'+firestoreId).click();
}
function handleCardPhoto(event, firestoreId) {
  const file=event.target.files[0]; if (!file) return;
  showBanner('📷 Processing photo…','info');
  resizeToBase64(file,900,0.72,async b64=>{
    try {
      await setDoc(doc(db,'animals',firestoreId),{photo:b64,updatedAt:serverTimestamp()},{merge:true});
      showBanner('✅ Photo saved!','success');
    } catch(err){showBanner('❌ Photo save failed','error');console.error(err);}
  });
}

// ── Add / Edit ────────────────────────────────────────────────────────────────
function openAddAnimal() {
  document.getElementById('goatModalTitle').textContent='Add Animal';
  document.getElementById('editGoatId').value='';
  ['goatName','goatTag','goatBreed','goatAge','goatSire','goatNotes','goatBreedDate','goatDueDate']
    .forEach(id=>document.getElementById(id).value='');
  document.getElementById('goatDOB').value='';
  document.getElementById('goatSex').value='F';
  document.getElementById('goatStatus').value='open';
  tempKids=[]; setModalPhoto(null); renderKidsList();
  document.getElementById('goatModal').classList.remove('hidden');
}
function editAnimal(firestoreId) {
  const a=animals.find(x=>x.firestoreId===firestoreId); if (!a) return;
  document.getElementById('goatModalTitle').textContent='Edit — '+a.name;
  document.getElementById('editGoatId').value=a.firestoreId;
  document.getElementById('goatName').value=a.name||'';
  document.getElementById('goatTag').value=a.tag||'';
  document.getElementById('goatBreed').value=a.breed||'';
  document.getElementById('goatAge').value=a.age||'';
  document.getElementById('goatDOB').value=a.dob||'';
  document.getElementById('goatSex').value=a.sex||'F';
  document.getElementById('goatStatus').value=a.status||'open';
  document.getElementById('goatSire').value=a.sire||'';
  document.getElementById('goatBreedDate').value=a.breedDate||'';
  document.getElementById('goatDueDate').value=a.dueDate||'';
  document.getElementById('goatNotes').value=a.notes||'';
  tempKids=JSON.parse(JSON.stringify(a.kids||[]));
  setModalPhoto(a.photo||null); renderKidsList();
  document.getElementById('goatModal').classList.remove('hidden');
}
async function saveGoat() {
  const name=document.getElementById('goatName').value.trim();
  if (!name){alert('Please enter a name.');return;}
  const btn=document.getElementById('saveGoatBtn'); btn.disabled=true; btn.textContent='Saving…';
  try {
    const editId=document.getElementById('editGoatId').value;
    const firestoreId=editId||genId();
    const existing=editId?animals.find(x=>x.firestoreId===editId):null;
    const photo=tempPhotoNew?(tempPhotoB64||null):(existing?.photo||null);
    const data={name,tag:document.getElementById('goatTag').value.trim(),
      sex:document.getElementById('goatSex').value,breed:document.getElementById('goatBreed').value.trim(),
      age:document.getElementById('goatAge').value.trim(),dob:document.getElementById('goatDOB').value,
      status:document.getElementById('goatStatus').value,sire:document.getElementById('goatSire').value.trim(),
      breedDate:document.getElementById('goatBreedDate').value,dueDate:document.getElementById('goatDueDate').value,
      notes:document.getElementById('goatNotes').value.trim(),kids:tempKids,photo,
      weights:existing?.weights||[],vet:existing?.vet||[],updatedAt:serverTimestamp()};
    if (!editId) data.createdAt=serverTimestamp();
    await setDoc(doc(db,'animals',firestoreId),data,{merge:!!editId});
    showBanner(`✅ ${name} saved!`,'success'); closeModal('goatModal');
  } catch(err){showBanner('❌ Save failed','error');console.error(err);}
  finally{btn.disabled=false;btn.textContent='Save';}
}
async function deleteAnimal(firestoreId, name) {
  if (!confirm(`Move ${name} to the Recycle Bin?`)) return;
  try {
    const a=animals.find(x=>x.firestoreId===firestoreId); if (!a) return;
    const{firestoreId:_,...data}=a;
    await setDoc(doc(db,'deleted_animals',firestoreId),{...data,originalId:firestoreId,deletedAt:serverTimestamp()});
    await deleteDoc(doc(db,'animals',firestoreId));
    showBanner(`🗑️ ${name} moved to Recycle Bin`,'info');
  } catch(err){showBanner('❌ Delete failed','error');}
}

// ── Kids ──────────────────────────────────────────────────────────────────────
function renderKidsList() {
  document.getElementById('kidsList').innerHTML=tempKids.map((k,i)=>`
    <div class="kid-row">
      <input type="text" value="${k.name||''}" placeholder="Name" oninput="tempKids[${i}].name=this.value">
      <select onchange="tempKids[${i}].sex=this.value">
        <option value="F" ${k.sex==='F'?'selected':''}>♀ F</option>
        <option value="M" ${k.sex==='M'?'selected':''}>♂ M</option>
      </select>
      <input type="text" value="${k.weight||''}" placeholder="lbs" oninput="tempKids[${i}].weight=this.value">
      <button class="btn-icon" onclick="removeKid(${i})">×</button>
    </div>`).join('');
}
function addKidRow(){tempKids.push({name:'',sex:'F',dob:today(),weight:''});renderKidsList();}
function removeKid(i){tempKids.splice(i,1);renderKidsList();}

// ── Breeding ──────────────────────────────────────────────────────────────────
function openAddBreeding() {
  const does=animals.filter(a=>a.sex==='F'&&a.status!=='kid');
  document.getElementById('breedDoe').innerHTML=does.map(a=>`<option value="${a.firestoreId}">${a.name}</option>`).join('');
  document.getElementById('breedSire').value='Elvis';
  document.getElementById('breedDate').value=today();
  document.getElementById('breedMethod').value='Natural';
  document.getElementById('breedNotes').value='';
  updateEstDue();
  document.getElementById('breedingModal').classList.remove('hidden');
}
function updateEstDue(){const d=document.getElementById('breedDate').value;document.getElementById('estDueDisplay').textContent=d?formatDate(addDays(d,150)):'—';}
async function saveBreeding() {
  const firestoreId=document.getElementById('breedDoe').value;
  const a=animals.find(x=>x.firestoreId===firestoreId); if (!a) return;
  const breedDate=document.getElementById('breedDate').value;
  const notes=document.getElementById('breedNotes').value.trim();
  const update={sire:document.getElementById('breedSire').value.trim(),breedDate,dueDate:addDays(breedDate,150),status:'bred',updatedAt:serverTimestamp()};
  if (notes) update.notes=(a.notes?a.notes+' | ':'')+notes;
  try{await setDoc(doc(db,'animals',firestoreId),update,{merge:true});showBanner(`✅ Breeding recorded for ${a.name}`,'success');closeModal('breedingModal');}
  catch(err){showBanner('❌ Save failed','error');}
}

// ── Weight Log ────────────────────────────────────────────────────────────────
function openWeightModal(firestoreId) {
  const a=animals.find(x=>x.firestoreId===firestoreId); if (!a) return;
  document.getElementById('weightAnimalId').value=firestoreId;
  document.getElementById('weightModalName').textContent=a.name;
  document.getElementById('weightDate').value=today();
  document.getElementById('weightValue').value='';
  document.getElementById('weightNote').value='';
  renderWeightTable(a);
  document.getElementById('weightModal').classList.remove('hidden');
}
function renderWeightTable(a) {
  const entries=[...(a.weights||[])].sort((x,y)=>x.date<y.date?1:-1);
  const tbody=document.getElementById('weightTableBody'),empty=document.getElementById('weightEmpty');
  if (!entries.length){tbody.innerHTML='';empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  tbody.innerHTML=entries.map((w,i)=>`<tr><td>${formatDate(w.date)}</td><td><strong>${w.value} lbs</strong></td><td>${w.note||'—'}</td><td><button class="del-btn" onclick="deleteWeightEntry('${a.firestoreId}',${i})">🗑</button></td></tr>`).join('');
}
async function saveWeightEntry() {
  const firestoreId=document.getElementById('weightAnimalId').value;
  const val=parseFloat(document.getElementById('weightValue').value);
  const dt=document.getElementById('weightDate').value;
  if (!dt||isNaN(val)||val<=0){alert('Please enter a valid date and weight.');return;}
  const a=animals.find(x=>x.firestoreId===firestoreId);
  const weights=[...(a.weights||[]),{date:dt,value:val,note:document.getElementById('weightNote').value.trim()}];
  try{await setDoc(doc(db,'animals',firestoreId),{weights,updatedAt:serverTimestamp()},{merge:true});
    document.getElementById('weightValue').value='';document.getElementById('weightNote').value='';
    showBanner('✅ Weight saved','success');}
  catch(err){showBanner('❌ Save failed','error');}
}
async function deleteWeightEntry(firestoreId,sortedIdx) {
  const a=animals.find(x=>x.firestoreId===firestoreId);
  const sorted=[...(a.weights||[])].sort((x,y)=>x.date<y.date?1:-1);
  const entry=sorted[sortedIdx];
  const weights=(a.weights||[]).filter(w=>!(w.date===entry.date&&w.value===entry.value));
  await setDoc(doc(db,'animals',firestoreId),{weights,updatedAt:serverTimestamp()},{merge:true});
}

// ── Vet Log ───────────────────────────────────────────────────────────────────
function openVetModal(firestoreId) {
  const a=animals.find(x=>x.firestoreId===firestoreId); if (!a) return;
  document.getElementById('vetAnimalId').value=firestoreId;
  document.getElementById('vetModalName').textContent=a.name;
  document.getElementById('vetDate').value=today();
  document.getElementById('vetType').value='Vaccine';
  document.getElementById('vetTreatment').value='';
  renderVetTable(a);
  document.getElementById('vetModal').classList.remove('hidden');
}
function renderVetTable(a) {
  const entries=[...(a.vet||[])].sort((x,y)=>x.date<y.date?1:-1);
  const tbody=document.getElementById('vetTableBody'),empty=document.getElementById('vetEmpty');
  if (!entries.length){tbody.innerHTML='';empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  tbody.innerHTML=entries.map((v,i)=>`<tr><td>${formatDate(v.date)}</td><td><span class="status-badge status-bred" style="font-size:9px">${v.type}</span></td><td>${v.treatment||'—'}</td><td><button class="del-btn" onclick="deleteVetEntry('${a.firestoreId}',${i})">🗑</button></td></tr>`).join('');
}
async function saveVetEntry() {
  const firestoreId=document.getElementById('vetAnimalId').value;
  const dt=document.getElementById('vetDate').value,type=document.getElementById('vetType').value;
  const treatment=document.getElementById('vetTreatment').value.trim();
  if (!dt){alert('Please select a date.');return;}
  const a=animals.find(x=>x.firestoreId===firestoreId);
  const vet=[...(a.vet||[]),{date:dt,type,treatment}];
  try{await setDoc(doc(db,'animals',firestoreId),{vet,updatedAt:serverTimestamp()},{merge:true});
    document.getElementById('vetTreatment').value='';showBanner('✅ Vet record saved','success');}
  catch(err){showBanner('❌ Save failed','error');}
}
async function deleteVetEntry(firestoreId,sortedIdx) {
  const a=animals.find(x=>x.firestoreId===firestoreId);
  const sorted=[...(a.vet||[])].sort((x,y)=>x.date<y.date?1:-1);
  const entry=sorted[sortedIdx];
  const vet=(a.vet||[]).filter(v=>!(v.date===entry.date&&v.type===entry.type&&v.treatment===entry.treatment));
  await setDoc(doc(db,'animals',firestoreId),{vet,updatedAt:serverTimestamp()},{merge:true});
}

// ── Recycle Bin ───────────────────────────────────────────────────────────────
async function openRecycleBin() {
  const snap=await getDocs(DELETED);
  const deleted=snap.docs.map(d=>({id:d.id,...d.data()}));
  const list=document.getElementById('recycleBinList');
  if (!deleted.length){
    list.innerHTML='<div class="log-empty" style="display:block;padding:20px;text-align:center;color:var(--oak)">Recycle Bin is empty.</div>';
  } else {
    deleted.sort((a,b)=>(b.deletedAt?.seconds||0)-(a.deletedAt?.seconds||0));
    list.innerHTML=deleted.map(a=>`
      <div class="recycle-item">
        <div class="recycle-info">
          <div class="recycle-name">${a.name}</div>
          <div class="recycle-meta">${a.sex==='F'?'♀ Doe':'♂ Buck'} · ${a.status} · Deleted ${a.deletedAt?new Date(a.deletedAt.seconds*1000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'—'}</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="restoreAnimal('${a.id}','${a.name}')">↩ Restore</button>
        <button class="btn btn-outline btn-sm btn-danger" onclick="permanentDelete('${a.id}','${a.name}')">✕ Forever</button>
      </div>`).join('');
  }
  document.getElementById('recycleBinModal').classList.remove('hidden');
}
async function restoreAnimal(deletedId, name) {
  try {
    const snap=await getDocs(DELETED);
    const d=snap.docs.find(x=>x.id===deletedId); if (!d) return;
    const{deletedAt,originalId,...data}=d.data();
    data.updatedAt=serverTimestamp();
    await setDoc(doc(db,'animals',deletedId),data);
    await deleteDoc(doc(db,'deleted_animals',deletedId));
    showBanner(`✅ ${name} restored!`,'success');
    openRecycleBin();
  } catch(err){showBanner('❌ Restore failed','error');console.error(err);}
}
async function permanentDelete(deletedId, name) {
  if (!confirm(`Permanently delete ${name}? This cannot be undone.`)) return;
  try{await deleteDoc(doc(db,'deleted_animals',deletedId));showBanner(`🗑️ ${name} permanently deleted`,'info');openRecycleBin();}
  catch(err){showBanner('❌ Delete failed','error');}
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function closeModal(id){document.getElementById(id).classList.add('hidden');}

// Expose to HTML
window.filterAnimals    = filterAnimals;
window.openAddAnimal    = openAddAnimal;
window.editAnimal       = editAnimal;
window.saveGoat         = saveGoat;
window.deleteAnimal     = deleteAnimal;
window.openAddBreeding  = openAddBreeding;
window.saveBreeding     = saveBreeding;
window.updateEstDue     = updateEstDue;
window.closeModal       = closeModal;
window.addKidRow        = addKidRow;
window.removeKid        = removeKid;
window.handleModalPhoto = handleModalPhoto;
window.removeModalPhoto = removeModalPhoto;
window.triggerCardPhoto = triggerCardPhoto;
window.handleCardPhoto  = handleCardPhoto;
window.openWeightModal  = openWeightModal;
window.saveWeightEntry  = saveWeightEntry;
window.deleteWeightEntry= deleteWeightEntry;
window.openVetModal     = openVetModal;
window.saveVetEntry     = saveVetEntry;
window.deleteVetEntry   = deleteVetEntry;
window.openRecycleBin   = openRecycleBin;
window.restoreAnimal    = restoreAnimal;
window.permanentDelete  = permanentDelete;
window.toggleAuth       = toggleAuth;

// ── Boot ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('breedDate').addEventListener('change', updateEstDue);
  document.getElementById('goatBreedDate').addEventListener('change', () => {
    const d=document.getElementById('goatBreedDate').value;
    if (d&&!document.getElementById('goatDueDate').value)
      document.getElementById('goatDueDate').value=addDays(d,150);
  });
  setAuthUI();
  startListener();
});
