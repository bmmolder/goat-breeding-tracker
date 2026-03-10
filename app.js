// ── Storage ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'goat_herd_v2';

// ── Seed Data (real herd from Goat_Log.xlsx) ─────────────────────────────────
function seedData() {
  return [
    // Bucks
    { id: 1,  name: 'Elvis',        sex: 'M', age: 'Over 4', dob: '',           breed: '', status: 'buck',     sire: '',        breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },

    // Does — Pregnant
    { id: 2,  name: 'Snowy Ears',   sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'pregnant', sire: 'Unknown', breedDate: '2025-10-15', dueDate: '2026-03-15', kids: [], notes: '', photo: null },

    // Does — Nursing with kids
    { id: 3,  name: 'Cocoa',        sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-10-01', dueDate: '2026-03-01', kids: [
        { id: 4,  name: 'Buddy', sex: 'M', dob: '2026-03-01', weight: '' },
        { id: 5,  name: 'CC',    sex: 'F', dob: '2026-03-01', weight: '' },
        { id: 6,  name: 'Belt',  sex: 'F', dob: '2026-03-01', weight: '' },
      ], notes: '', photo: null },

    { id: 7,  name: 'Sock',         sex: 'F', age: 'Unknown', dob: '',          breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-10-08', dueDate: '2026-02-28', kids: [
        { id: 8,  name: 'Drop', sex: 'F', dob: '2026-02-28', weight: '' },
      ], notes: '', photo: null },

    { id: 9,  name: 'Mocha',        sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-09-25', dueDate: '2026-02-20', kids: [
        { id: 10, name: 'Brownie', sex: 'F', dob: '2026-02-20', weight: '' },
        { id: 11, name: 'Patches', sex: 'M', dob: '2026-02-20', weight: '' },
        { id: 12, name: 'Taco',    sex: 'M', dob: '2026-02-20', weight: '' },
      ], notes: '', photo: null },

    { id: 13, name: 'Mooey',        sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-10-06', dueDate: '2026-02-28', kids: [
        { id: 14, name: 'Mosie', sex: 'F', dob: '2026-02-28', weight: '' },
        { id: 15, name: 'Dot',   sex: 'F', dob: '2026-02-28', weight: '' },
      ], notes: '', photo: null },

    { id: 16, name: 'Willow',       sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '',       dueDate: '2026-03-06', kids: [
        { id: 17, name: 'Petunia', sex: 'F', dob: '2026-03-06', weight: '' },
      ], notes: '', photo: null },

    // Does — Unknown status
    { id: 18, name: 'Gene',         sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'unknown',  sire: 'Unknown', breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },
    { id: 19, name: 'Nine Lives',   sex: 'F', age: 'Unknown', dob: '',          breed: '', status: 'unknown',  sire: 'Unknown', breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },

    // Yearlings — Waiting
    { id: 20, name: 'Ruthie',       sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },
    { id: 21, name: 'Capie',        sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },
    { id: 22, name: 'Charlamagne',  sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },
    { id: 23, name: 'Wisp',         sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },
    { id: 24, name: 'Betty Boop',   sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: '', photo: null },

    // Kids (standalone records — born to does above)
    { id: 25, name: 'Buddy',        sex: 'M', age: 'Kid',    dob: '2026-03-01', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Cocoa', photo: null },
    { id: 26, name: 'CC',           sex: 'F', age: 'Kid',    dob: '2026-03-01', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Cocoa', photo: null },
    { id: 27, name: 'Belt',         sex: 'F', age: 'Kid',    dob: '2026-03-01', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Cocoa', photo: null },
    { id: 28, name: 'Drop',         sex: 'F', age: 'Kid',    dob: '2026-02-28', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Sock', photo: null },
    { id: 29, name: 'Brownie',      sex: 'F', age: 'Kid',    dob: '2026-02-20', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Mocha', photo: null },
    { id: 30, name: 'Patches',      sex: 'M', age: 'Kid',    dob: '2026-02-20', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Mocha', photo: null },
    { id: 31, name: 'Taco',         sex: 'M', age: 'Kid',    dob: '2026-02-20', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Mocha', photo: null },
    { id: 32, name: 'Mosie',        sex: 'F', age: 'Kid',    dob: '2026-02-28', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Mooey', photo: null },
    { id: 33, name: 'Dot',          sex: 'F', age: 'Kid',    dob: '2026-02-28', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Mooey', photo: null },
    { id: 34, name: 'Petunia',      sex: 'F', age: 'Kid',    dob: '2026-03-06', breed: '', status: 'kid',      sire: 'Elvis',   breedDate: '',       dueDate: '',       kids: [], notes: 'Dam: Willow', photo: null },
  ];
}

// ── State ─────────────────────────────────────────────────────────────────────
let animals = [];
let filterStatus = 'all';
let tempKids = [];
let tempPhoto = null;

// ── Init ──────────────────────────────────────────────────────────────────────
function load() {
  const stored = localStorage.getItem(STORAGE_KEY);
  animals = stored ? JSON.parse(stored) : seedData();
  render();
}

function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(animals)); }

function nextId() { return animals.length ? Math.max(...animals.map(a => a.id)) + 1 : 1; }

// ── Date helpers ──────────────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function daysUntil(d) {
  if (!d) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(d + 'T00:00:00');
  return Math.round((target - today) / 86400000);
}

function addDays(dateStr, days) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function updateStats() {
  const does  = animals.filter(a => a.sex === 'F' && a.status !== 'kid');
  const bucks = animals.filter(a => a.sex === 'M' && a.status !== 'kid');
  const kids  = animals.filter(a => a.status === 'kid');

  document.getElementById('statTotal').textContent    = animals.length;
  document.getElementById('statDoes').textContent     = does.length;
  document.getElementById('statBucks').textContent    = bucks.length;
  document.getElementById('statPregnant').textContent = animals.filter(a => a.status === 'pregnant').length;
  document.getElementById('statNursing').textContent  = animals.filter(a => a.status === 'nursing').length;
  document.getElementById('statKids').textContent     = kids.length;

  // Due soon alert
  const dueSoon = animals.filter(a => {
    if (!a.dueDate) return false;
    const d = daysUntil(a.dueDate);
    return d !== null && d >= -3 && d <= 14;
  });
  const alertCard = document.getElementById('alertCard');
  if (dueSoon.length) {
    alertCard.classList.add('visible');
    document.getElementById('alertList').innerHTML = dueSoon.map(a => {
      const d = daysUntil(a.dueDate);
      const label = d < 0 ? `<span>${Math.abs(d)}d overdue</span>` : d === 0 ? '<span>Due TODAY</span>' : `<span>in ${d} days</span>`;
      return `<div class="alert-item">${a.name} — ${label} — ${formatDate(a.dueDate)}</div>`;
    }).join('');
  } else {
    alertCard.classList.remove('visible');
  }
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  updateStats();
  document.getElementById('todayDate').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  let filtered = animals;
  if (filterStatus !== 'all') {
    if (filterStatus === 'doe')  filtered = animals.filter(a => a.sex === 'F' && a.status !== 'kid');
    else if (filterStatus === 'buck') filtered = animals.filter(a => a.sex === 'M' && a.status !== 'kid');
    else filtered = animals.filter(a => a.status === filterStatus);
  }

  const grid = document.getElementById('goatGrid');
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state"><div class="icon">🐐</div><p>No animals found in this filter.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(a => buildCard(a)).join('');
}

function buildCard(a) {
  const d = daysUntil(a.dueDate);
  const dueLine = a.dueDate
    ? (d < 0 ? `Overdue ${Math.abs(d)}d` : d === 0 ? 'Due TODAY' : `Due in ${d}d`)
    : '';

  const kidsHtml = (a.kids && a.kids.length)
    ? `<div class="kids-section">
        <div class="kids-label">Kids (${a.kids.length})</div>
        ${a.kids.map(k => `<div class="kid-chip">${k.name || 'Kid'} <span class="sex-${k.sex?.toLowerCase()}">${k.sex || ''}</span>${k.weight ? ' · ' + k.weight : ''}</div>`).join('')}
      </div>` : '';

  const statusLabel = a.status === 'buck' ? (a.sex === 'M' ? 'Buck' : a.status) : a.status;

  return `<div class="goat-card">
    ${a.photo
      ? `<img class="card-photo" src="${a.photo}" alt="${a.name}" onclick="triggerCardPhoto(${a.id})" title="Click to change photo">`
      : `<div class="card-photo-placeholder" onclick="triggerCardPhoto(${a.id})"><div class="ph-icon">📷</div><div class="ph-label">Add Photo</div></div>`
    }
    <input type="file" id="cardPhoto_${a.id}" class="photo-upload-input" accept="image/*" onchange="handleCardPhoto(event,${a.id})">
    <div class="card-header">
      <div>
        <div class="goat-name">${a.name}</div>
        <div class="goat-id">${a.age ? a.age : ''}${a.breed ? ' · ' + a.breed : ''}</div>
      </div>
      <div class="badge-group">
        <span class="sex-badge sex-${a.sex}">${a.sex === 'F' ? '♀ Doe' : '♂ Buck'}</span>
        <span class="status-badge status-${a.status}">${statusLabel}</span>
      </div>
    </div>
    <div class="card-body">
      ${a.dob  ? `<div class="info-row"><span>Born</span><strong>${formatDate(a.dob)}</strong></div>` : ''}
      ${a.sire && a.sire !== 'Unknown' ? `<div class="info-row"><span>Sire</span><strong>${a.sire}</strong></div>` : ''}
      ${a.breedDate ? `<div class="info-row"><span>Fertilized</span><strong>${formatDate(a.breedDate)}</strong></div>` : ''}
      ${a.dueDate   ? `<div class="info-row"><span>Due / Delivered</span><strong style="color:${d !== null && d <= 7 && d >= 0 ? 'var(--rust)' : 'inherit'}">${formatDate(a.dueDate)}${dueLine ? ' · ' + dueLine : ''}</strong></div>` : ''}
      ${a.notes ? `<div class="card-note">${a.notes}</div>` : ''}
      ${kidsHtml}
    </div>
    <div class="card-actions">
      <button class="btn btn-outline btn-sm" onclick="editAnimal(${a.id})">Edit</button>
      <button class="btn btn-outline btn-sm" style="color:var(--rust);border-color:var(--rust)" onclick="deleteAnimal(${a.id})">Remove</button>
    </div>
  </div>`;
}

function filterAnimals(status, el) {
  filterStatus = status;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  render();
}

// ── Photo handlers ────────────────────────────────────────────────────────────
function handleModalPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    tempPhoto = e.target.result;
    document.getElementById('modalPhotoPreview').src = tempPhoto;
    document.getElementById('modalPhotoPreview').style.display = 'block';
    document.getElementById('modalPhotoHint').style.display = 'none';
    document.getElementById('modalPhotoRemove').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function removeModalPhoto(e) {
  e.stopPropagation();
  tempPhoto = null;
  document.getElementById('modalPhotoPreview').src = '';
  document.getElementById('modalPhotoPreview').style.display = 'none';
  document.getElementById('modalPhotoHint').style.display = 'flex';
  document.getElementById('modalPhotoRemove').style.display = 'none';
  document.getElementById('modalPhotoInput').value = '';
}

function setModalPhoto(photoData) {
  tempPhoto = photoData || null;
  const preview   = document.getElementById('modalPhotoPreview');
  const hint      = document.getElementById('modalPhotoHint');
  const removeBtn = document.getElementById('modalPhotoRemove');
  if (tempPhoto) {
    preview.src = tempPhoto;
    preview.style.display = 'block';
    hint.style.display = 'none';
    removeBtn.style.display = 'flex';
  } else {
    preview.src = '';
    preview.style.display = 'none';
    hint.style.display = 'flex';
    removeBtn.style.display = 'none';
  }
}

function triggerCardPhoto(id) {
  document.getElementById('cardPhoto_' + id).click();
}

function handleCardPhoto(event, id) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const a = animals.find(x => x.id === id);
    if (a) { a.photo = e.target.result; persist(); render(); }
  };
  reader.readAsDataURL(file);
}

// ── Add / Edit Animal ─────────────────────────────────────────────────────────
function openAddAnimal() {
  document.getElementById('goatModalTitle').textContent = 'Add Animal';
  document.getElementById('editGoatId').value = '';
  ['goatName','goatTag','goatBreed','goatAge','goatSire','goatNotes','goatBreedDate','goatDueDate'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('goatDOB').value = '';
  document.getElementById('goatSex').value = 'F';
  document.getElementById('goatStatus').value = 'open';
  tempKids = [];
  tempPhoto = null;
  setModalPhoto(null);
  renderKidsList();
  document.getElementById('goatModal').classList.remove('hidden');
}

function editAnimal(id) {
  const a = animals.find(x => x.id === id);
  if (!a) return;
  document.getElementById('goatModalTitle').textContent = 'Edit Animal';
  document.getElementById('editGoatId').value   = a.id;
  document.getElementById('goatName').value     = a.name     || '';
  document.getElementById('goatTag').value      = a.tag      || '';
  document.getElementById('goatBreed').value    = a.breed    || '';
  document.getElementById('goatAge').value      = a.age      || '';
  document.getElementById('goatDOB').value      = a.dob      || '';
  document.getElementById('goatSex').value      = a.sex      || 'F';
  document.getElementById('goatStatus').value   = a.status   || 'open';
  document.getElementById('goatSire').value     = a.sire     || '';
  document.getElementById('goatBreedDate').value = a.breedDate || '';
  document.getElementById('goatDueDate').value  = a.dueDate  || '';
  document.getElementById('goatNotes').value    = a.notes    || '';
  tempKids = JSON.parse(JSON.stringify(a.kids || []));
  setModalPhoto(a.photo || null);
  renderKidsList();
  document.getElementById('goatModal').classList.remove('hidden');
}

function saveGoat() {
  const name = document.getElementById('goatName').value.trim();
  if (!name) { alert('Please enter a name.'); return; }
  const editId = document.getElementById('editGoatId').value;

  const data = {
    name,
    tag:       document.getElementById('goatTag').value.trim(),
    sex:       document.getElementById('goatSex').value,
    breed:     document.getElementById('goatBreed').value.trim(),
    age:       document.getElementById('goatAge').value.trim(),
    dob:       document.getElementById('goatDOB').value,
    status:    document.getElementById('goatStatus').value,
    sire:      document.getElementById('goatSire').value.trim(),
    breedDate: document.getElementById('goatBreedDate').value,
    dueDate:   document.getElementById('goatDueDate').value,
    notes:     document.getElementById('goatNotes').value.trim(),
    kids:      tempKids,
    photo:     tempPhoto,
  };

  if (editId) {
    const idx = animals.findIndex(a => a.id == editId);
    animals[idx] = { ...animals[idx], ...data };
  } else {
    animals.push({ id: nextId(), ...data });
  }
  persist(); render();
  closeModal('goatModal');
}

function deleteAnimal(id) {
  const a = animals.find(x => x.id === id);
  if (!confirm(`Remove ${a.name} from the registry?`)) return;
  animals = animals.filter(x => x.id !== id);
  persist(); render();
}

// ── Kids ──────────────────────────────────────────────────────────────────────
function renderKidsList() {
  document.getElementById('kidsList').innerHTML = tempKids.map((k, i) => `
    <div class="kid-row">
      <input type="text" value="${k.name || ''}" placeholder="Name" onchange="tempKids[${i}].name=this.value">
      <select onchange="tempKids[${i}].sex=this.value">
        <option value="F" ${k.sex==='F'?'selected':''}>♀ Female</option>
        <option value="M" ${k.sex==='M'?'selected':''}>♂ Male</option>
      </select>
      <input type="text" value="${k.weight || ''}" placeholder="Weight" onchange="tempKids[${i}].weight=this.value">
      <button class="btn-icon" onclick="removeKid(${i})">×</button>
    </div>`).join('');
}

function addKidRow() {
  tempKids.push({ name: '', sex: 'F', dob: new Date().toISOString().split('T')[0], weight: '' });
  renderKidsList();
}

function removeKid(i) {
  tempKids.splice(i, 1);
  renderKidsList();
}

// ── Breeding Modal ────────────────────────────────────────────────────────────
function openAddBreeding() {
  const does = animals.filter(a => a.sex === 'F' && a.status !== 'kid');
  document.getElementById('breedDoe').innerHTML = does.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
  document.getElementById('breedSire').value  = 'Elvis';
  document.getElementById('breedDate').value  = new Date().toISOString().split('T')[0];
  document.getElementById('breedMethod').value = 'Natural';
  document.getElementById('breedNotes').value  = '';
  updateEstDue();
  document.getElementById('breedingModal').classList.remove('hidden');
}

function updateEstDue() {
  const d = document.getElementById('breedDate').value;
  document.getElementById('estDueDisplay').textContent = d ? formatDate(addDays(d, 150)) : '—';
}

function saveBreeding() {
  const doeId = parseInt(document.getElementById('breedDoe').value);
  const a = animals.find(x => x.id === doeId);
  if (!a) return;
  a.sire      = document.getElementById('breedSire').value.trim();
  a.breedDate = document.getElementById('breedDate').value;
  a.dueDate   = addDays(a.breedDate, 150);
  a.status    = 'bred';
  const notes = document.getElementById('breedNotes').value.trim();
  if (notes) a.notes = (a.notes ? a.notes + ' | ' : '') + notes;
  persist(); render();
  closeModal('breedingModal');
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('breedDate').addEventListener('change', updateEstDue);
  document.getElementById('goatBreedDate').addEventListener('change', () => {
    const d = document.getElementById('goatBreedDate').value;
    if (d && !document.getElementById('goatDueDate').value) {
      document.getElementById('goatDueDate').value = addDays(d, 150);
    }
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
load();
