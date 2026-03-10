// ─────────────────────────────────────────────────────────────────────────────
// Herd Registry — app.js
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'goat_herd_v3';

// ── Seed Data ─────────────────────────────────────────────────────────────────
function seedData() {
  return [
    // ── Buck ──────────────────────────────────────────────────────────────
    { id: 1,  name: 'Elvis',       sex: 'M', age: 'Over 4', dob: '',           breed: '', status: 'buck',     sire: '',        breedDate: '',           dueDate: '',           kids: [], notes: '',            photo: null, weights: [], vet: [] },

    // ── Pregnant ──────────────────────────────────────────────────────────
    { id: 2,  name: 'Snowy Ears',  sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'pregnant', sire: 'Unknown', breedDate: '2025-10-15', dueDate: '2026-03-15', kids: [], notes: '',            photo: null, weights: [], vet: [] },

    // ── Nursing ───────────────────────────────────────────────────────────
    { id: 3,  name: 'Cocoa',       sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-10-01', dueDate: '2026-03-01',
      kids: [
        { name: 'Buddy',   sex: 'M', dob: '2026-03-01', weight: '' },
        { name: 'CC',      sex: 'F', dob: '2026-03-01', weight: '' },
        { name: 'Belt',    sex: 'F', dob: '2026-03-01', weight: '' },
      ], notes: '', photo: null, weights: [], vet: [] },

    { id: 4,  name: 'Sock',        sex: 'F', age: 'Unknown', dob: '',          breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-10-08', dueDate: '2026-02-28',
      kids: [
        { name: 'Drop', sex: 'F', dob: '2026-02-28', weight: '' },
      ], notes: '', photo: null, weights: [], vet: [] },

    { id: 5,  name: 'Mocha',       sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-09-25', dueDate: '2026-02-20',
      kids: [
        { name: 'Brownie', sex: 'F', dob: '2026-02-20', weight: '' },
        { name: 'Patches', sex: 'M', dob: '2026-02-20', weight: '' },
        { name: 'Taco',    sex: 'M', dob: '2026-02-20', weight: '' },
      ], notes: '', photo: null, weights: [], vet: [] },

    { id: 6,  name: 'Mooey',       sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '2025-10-06', dueDate: '2026-02-28',
      kids: [
        { name: 'Mosie', sex: 'F', dob: '2026-02-28', weight: '' },
        { name: 'Dot',   sex: 'F', dob: '2026-02-28', weight: '' },
      ], notes: '', photo: null, weights: [], vet: [] },

    { id: 7,  name: 'Willow',      sex: 'F', age: 'Over 4', dob: '',           breed: '', status: 'nursing',  sire: 'Unknown', breedDate: '',           dueDate: '2026-03-06',
      kids: [
        { name: 'Petunia', sex: 'F', dob: '2026-03-06', weight: '' },
      ], notes: '', photo: null, weights: [], vet: [] },

    // ── Unknown ───────────────────────────────────────────────────────────
    { id: 8,  name: 'Gene',        sex: 'F', age: 'Over 4',  dob: '',          breed: '', status: 'unknown',  sire: 'Unknown', breedDate: '', dueDate: '', kids: [], notes: '', photo: null, weights: [], vet: [] },
    { id: 9,  name: 'Nine Lives',  sex: 'F', age: 'Unknown', dob: '',          breed: '', status: 'unknown',  sire: 'Unknown', breedDate: '', dueDate: '', kids: [], notes: '', photo: null, weights: [], vet: [] },

    // ── Waiting (yearlings) ───────────────────────────────────────────────
    { id: 10, name: 'Ruthie',      sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '', dueDate: '', kids: [], notes: '', photo: null, weights: [], vet: [] },
    { id: 11, name: 'Capie',       sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '', dueDate: '', kids: [], notes: '', photo: null, weights: [], vet: [] },
    { id: 12, name: 'Charlamagne', sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '', dueDate: '', kids: [], notes: '', photo: null, weights: [], vet: [] },
    { id: 13, name: 'Wisp',        sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Unknown', breedDate: '', dueDate: '', kids: [], notes: '', photo: null, weights: [], vet: [] },
    { id: 14, name: 'Betty Boop',  sex: 'F', age: '1 yr',   dob: '2025-03-01', breed: '', status: 'waiting',  sire: 'Elvis',   breedDate: '', dueDate: '', kids: [], notes: '', photo: null, weights: [], vet: [] },

    // ── Kids ──────────────────────────────────────────────────────────────
    { id: 15, name: 'Buddy',       sex: 'M', age: 'Kid', dob: '2026-03-01', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Cocoa',  photo: null, weights: [], vet: [] },
    { id: 16, name: 'CC',          sex: 'F', age: 'Kid', dob: '2026-03-01', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Cocoa',  photo: null, weights: [], vet: [] },
    { id: 17, name: 'Belt',        sex: 'F', age: 'Kid', dob: '2026-03-01', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Cocoa',  photo: null, weights: [], vet: [] },
    { id: 18, name: 'Drop',        sex: 'F', age: 'Kid', dob: '2026-02-28', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Sock',   photo: null, weights: [], vet: [] },
    { id: 19, name: 'Brownie',     sex: 'F', age: 'Kid', dob: '2026-02-20', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Mocha',  photo: null, weights: [], vet: [] },
    { id: 20, name: 'Patches',     sex: 'M', age: 'Kid', dob: '2026-02-20', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Mocha',  photo: null, weights: [], vet: [] },
    { id: 21, name: 'Taco',        sex: 'M', age: 'Kid', dob: '2026-02-20', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Mocha',  photo: null, weights: [], vet: [] },
    { id: 22, name: 'Mosie',       sex: 'F', age: 'Kid', dob: '2026-02-28', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Mooey',  photo: null, weights: [], vet: [] },
    { id: 23, name: 'Dot',         sex: 'F', age: 'Kid', dob: '2026-02-28', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Mooey',  photo: null, weights: [], vet: [] },
    { id: 24, name: 'Petunia',     sex: 'F', age: 'Kid', dob: '2026-03-06', breed: '', status: 'kid', sire: 'Elvis', breedDate: '', dueDate: '', kids: [], notes: 'Dam: Willow', photo: null, weights: [], vet: [] },
  ];
}

// ── State ─────────────────────────────────────────────────────────────────────
let animals = [];
let filterStatus = 'all';
let tempKids     = [];
let tempPhoto    = null;

// ── Persistence ───────────────────────────────────────────────────────────────
function load() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    animals = JSON.parse(stored);
    // Migrate older records that lack weights/vet arrays
    animals.forEach(a => {
      if (!a.weights) a.weights = [];
      if (!a.vet)     a.vet     = [];
    });
  } else {
    animals = seedData();
  }
  render();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
}

function nextId() {
  return animals.length ? Math.max(...animals.map(a => a.id)) + 1 : 1;
}

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

function today() {
  return new Date().toISOString().split('T')[0];
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('statTotal').textContent    = animals.length;
  document.getElementById('statDoes').textContent     = animals.filter(a => a.sex === 'F' && a.status !== 'kid').length;
  document.getElementById('statBucks').textContent    = animals.filter(a => a.sex === 'M' && a.status !== 'kid').length;
  document.getElementById('statKids').textContent     = animals.filter(a => a.status === 'kid').length;
  document.getElementById('statPregnant').textContent = animals.filter(a => a.status === 'pregnant').length;
  document.getElementById('statNursing').textContent  = animals.filter(a => a.status === 'nursing').length;

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
      const label = d < 0
        ? `<span>${Math.abs(d)}d overdue</span>`
        : d === 0 ? '<span>Due TODAY</span>'
        : `<span>in ${d} days</span>`;
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
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });

  let list = animals;
  if (filterStatus !== 'all') {
    if      (filterStatus === 'doe')  list = animals.filter(a => a.sex === 'F' && a.status !== 'kid');
    else if (filterStatus === 'buck') list = animals.filter(a => a.sex === 'M' && a.status !== 'kid');
    else                              list = animals.filter(a => a.status === filterStatus);
  }

  const grid = document.getElementById('goatGrid');
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state"><div class="icon">🐐</div><p>No animals in this category.</p></div>`;
    return;
  }
  grid.innerHTML = list.map(buildCard).join('');
}

function buildCard(a) {
  const d       = daysUntil(a.dueDate);
  const urgentDue = d !== null && d >= 0 && d <= 7;
  const dueLine = a.dueDate
    ? (d < 0  ? `Overdue ${Math.abs(d)}d`
    : d === 0 ? 'Due TODAY'
    : `Due in ${d}d`)
    : '';

  // Last weight
  const lastW = a.weights && a.weights.length
    ? [...a.weights].sort((x,y) => x.date < y.date ? 1 : -1)[0]
    : null;

  // Last vet
  const lastV = a.vet && a.vet.length
    ? [...a.vet].sort((x,y) => x.date < y.date ? 1 : -1)[0]
    : null;

  const kidsHtml = (a.kids && a.kids.length)
    ? `<div class="kids-section">
        <div class="kids-label">Kids (${a.kids.length})</div>
        ${a.kids.map(k => `<div class="kid-chip">${k.name || 'Kid'} <span class="sex-${k.sex?.toLowerCase()}">${k.sex || ''}</span></div>`).join('')}
      </div>`
    : '';

  return `<div class="goat-card">
    ${a.photo
      ? `<img class="card-photo" src="${a.photo}" alt="${a.name}" onclick="triggerCardPhoto(${a.id})" title="Tap to change photo">`
      : `<div class="card-photo-placeholder" onclick="triggerCardPhoto(${a.id})"><div class="ph-icon">📷</div><div class="ph-label">Add Photo</div></div>`
    }
    <input type="file" id="cardPhoto_${a.id}" class="photo-upload-input" accept="image/*" capture="environment" onchange="handleCardPhoto(event,${a.id})">

    <div class="card-header">
      <div>
        <div class="goat-name">${a.name}</div>
        <div class="goat-id">${[a.age, a.breed].filter(Boolean).join(' · ') || '—'}</div>
      </div>
      <div class="badge-group">
        <span class="sex-badge sex-${a.sex}">${a.sex === 'F' ? '♀' : '♂'}</span>
        <span class="status-badge status-${a.status}">${a.status}</span>
      </div>
    </div>

    <div class="card-body">
      ${a.dob       ? `<div class="info-row"><span>Born</span><strong>${formatDate(a.dob)}</strong></div>` : ''}
      ${a.sire && a.sire !== 'Unknown' ? `<div class="info-row"><span>Sire</span><strong>${a.sire}</strong></div>` : ''}
      ${a.breedDate ? `<div class="info-row"><span>Fertilized</span><strong>${formatDate(a.breedDate)}</strong></div>` : ''}
      ${a.dueDate   ? `<div class="info-row"><span>Due/Delivered</span><strong style="color:${urgentDue ? 'var(--rust)' : 'inherit'}">${formatDate(a.dueDate)}${dueLine ? ' · ' + dueLine : ''}</strong></div>` : ''}
      ${a.notes     ? `<div class="card-note">${a.notes}</div>` : ''}
      ${kidsHtml}
      <div style="display:flex;flex-wrap:wrap;gap:0;margin-top:2px">
        ${lastW ? `<div class="weight-pill">⚖️ ${lastW.value} lbs <span style="opacity:.6;font-size:10px">· ${formatDate(lastW.date)}</span></div>` : ''}
        ${lastV ? `<div class="vet-pill">🩺 ${lastV.type} <span style="opacity:.6;font-size:10px">· ${formatDate(lastV.date)}</span></div>` : ''}
      </div>
    </div>

    <div class="card-actions">
      <button class="btn btn-outline btn-sm" onclick="editAnimal(${a.id})">✏️ Edit</button>
      <button class="btn btn-outline btn-sm" onclick="openWeightModal(${a.id})">⚖️ Weight</button>
      <button class="btn btn-outline btn-sm" onclick="openVetModal(${a.id})">🩺 Vet</button>
      <button class="btn btn-outline btn-sm btn-danger" onclick="deleteAnimal(${a.id})">🗑️</button>
    </div>
  </div>`;
}

function filterAnimals(status, el) {
  filterStatus = status;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  render();
}

// ── Photo ─────────────────────────────────────────────────────────────────────
function handleModalPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  resizeImage(file, 800, result => {
    tempPhoto = result;
    document.getElementById('modalPhotoPreview').src = result;
    document.getElementById('modalPhotoPreview').style.display = 'block';
    document.getElementById('modalPhotoHint').style.display   = 'none';
    document.getElementById('modalPhotoRemove').style.display = 'flex';
  });
}

function removeModalPhoto(e) {
  e.stopPropagation();
  tempPhoto = null;
  document.getElementById('modalPhotoPreview').src            = '';
  document.getElementById('modalPhotoPreview').style.display  = 'none';
  document.getElementById('modalPhotoHint').style.display     = 'flex';
  document.getElementById('modalPhotoRemove').style.display   = 'none';
  document.getElementById('modalPhotoInput').value            = '';
}

function setModalPhoto(data) {
  tempPhoto = data || null;
  const prev = document.getElementById('modalPhotoPreview');
  const hint = document.getElementById('modalPhotoHint');
  const rem  = document.getElementById('modalPhotoRemove');
  if (tempPhoto) {
    prev.src = tempPhoto; prev.style.display = 'block';
    hint.style.display = 'none'; rem.style.display = 'flex';
  } else {
    prev.src = ''; prev.style.display = 'none';
    hint.style.display = 'flex'; rem.style.display = 'none';
  }
}

function triggerCardPhoto(id) { document.getElementById('cardPhoto_' + id).click(); }

function handleCardPhoto(event, id) {
  const file = event.target.files[0];
  if (!file) return;
  resizeImage(file, 800, result => {
    const a = animals.find(x => x.id === id);
    if (a) { a.photo = result; persist(); render(); }
  });
}

// Resize image before storing to keep localStorage usage low
function resizeImage(file, maxWidth, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width  = img.width  * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ── Add / Edit Animal ─────────────────────────────────────────────────────────
function openAddAnimal() {
  document.getElementById('goatModalTitle').textContent = 'Add Animal';
  document.getElementById('editGoatId').value = '';
  ['goatName','goatTag','goatBreed','goatAge','goatSire','goatNotes','goatBreedDate','goatDueDate']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('goatDOB').value    = '';
  document.getElementById('goatSex').value    = 'F';
  document.getElementById('goatStatus').value = 'open';
  tempKids = []; tempPhoto = null;
  setModalPhoto(null);
  renderKidsList();
  document.getElementById('goatModal').classList.remove('hidden');
}

function editAnimal(id) {
  const a = animals.find(x => x.id === id);
  if (!a) return;
  document.getElementById('goatModalTitle').textContent   = 'Edit — ' + a.name;
  document.getElementById('editGoatId').value             = a.id;
  document.getElementById('goatName').value               = a.name      || '';
  document.getElementById('goatTag').value                = a.tag       || '';
  document.getElementById('goatBreed').value              = a.breed     || '';
  document.getElementById('goatAge').value                = a.age       || '';
  document.getElementById('goatDOB').value                = a.dob       || '';
  document.getElementById('goatSex').value                = a.sex       || 'F';
  document.getElementById('goatStatus').value             = a.status    || 'open';
  document.getElementById('goatSire').value               = a.sire      || '';
  document.getElementById('goatBreedDate').value          = a.breedDate || '';
  document.getElementById('goatDueDate').value            = a.dueDate   || '';
  document.getElementById('goatNotes').value              = a.notes     || '';
  tempKids  = JSON.parse(JSON.stringify(a.kids || []));
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
    // Preserve weights and vet logs on edit
    animals[idx] = { ...animals[idx], ...data };
  } else {
    animals.push({ id: nextId(), ...data, weights: [], vet: [] });
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
        <option value="F" ${k.sex==='F'?'selected':''}>♀ F</option>
        <option value="M" ${k.sex==='M'?'selected':''}>♂ M</option>
      </select>
      <input type="text" value="${k.weight||''}" placeholder="lbs" onchange="tempKids[${i}].weight=this.value">
      <button class="btn-icon" onclick="removeKid(${i})">×</button>
    </div>`).join('');
}

function addKidRow() {
  tempKids.push({ name: '', sex: 'F', dob: today(), weight: '' });
  renderKidsList();
}

function removeKid(i) {
  tempKids.splice(i, 1);
  renderKidsList();
}

// ── Breeding ──────────────────────────────────────────────────────────────────
function openAddBreeding() {
  const does = animals.filter(a => a.sex === 'F' && a.status !== 'kid');
  document.getElementById('breedDoe').innerHTML   = does.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
  document.getElementById('breedSire').value      = 'Elvis';
  document.getElementById('breedDate').value      = today();
  document.getElementById('breedMethod').value    = 'Natural';
  document.getElementById('breedNotes').value     = '';
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

// ── Weight Log ────────────────────────────────────────────────────────────────
function openWeightModal(id) {
  const a = animals.find(x => x.id === id);
  if (!a) return;
  document.getElementById('weightAnimalId').value  = id;
  document.getElementById('weightModalName').textContent = a.name;
  document.getElementById('weightDate').value       = today();
  document.getElementById('weightValue').value      = '';
  document.getElementById('weightNote').value       = '';
  renderWeightTable(a);
  document.getElementById('weightModal').classList.remove('hidden');
}

function renderWeightTable(a) {
  const entries = [...(a.weights || [])].sort((x,y) => x.date < y.date ? 1 : -1);
  const tbody   = document.getElementById('weightTableBody');
  const empty   = document.getElementById('weightEmpty');

  if (!entries.length) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  tbody.innerHTML = entries.map((w, i) => `
    <tr>
      <td>${formatDate(w.date)}</td>
      <td><strong>${w.value} lbs</strong></td>
      <td>${w.note || '—'}</td>
      <td><button class="del-btn" onclick="deleteWeightEntry(${a.id}, ${i})">🗑</button></td>
    </tr>`).join('');
}

function saveWeightEntry() {
  const id  = parseInt(document.getElementById('weightAnimalId').value);
  const val = parseFloat(document.getElementById('weightValue').value);
  const dt  = document.getElementById('weightDate').value;
  if (!dt || isNaN(val) || val <= 0) { alert('Please enter a valid date and weight.'); return; }

  const a = animals.find(x => x.id === id);
  if (!a.weights) a.weights = [];
  a.weights.push({ date: dt, value: val, note: document.getElementById('weightNote').value.trim() });
  persist(); renderWeightTable(a); render();
  document.getElementById('weightValue').value = '';
  document.getElementById('weightNote').value  = '';
}

function deleteWeightEntry(animalId, index) {
  const a = animals.find(x => x.id === animalId);
  if (!a) return;
  const sorted = [...a.weights].sort((x,y) => x.date < y.date ? 1 : -1);
  const entry  = sorted[index];
  a.weights = a.weights.filter(w => w !== entry);
  persist(); renderWeightTable(a); render();
}

// ── Vet / Treatment Log ───────────────────────────────────────────────────────
function openVetModal(id) {
  const a = animals.find(x => x.id === id);
  if (!a) return;
  document.getElementById('vetAnimalId').value         = id;
  document.getElementById('vetModalName').textContent  = a.name;
  document.getElementById('vetDate').value             = today();
  document.getElementById('vetType').value             = 'Vaccine';
  document.getElementById('vetTreatment').value        = '';
  renderVetTable(a);
  document.getElementById('vetModal').classList.remove('hidden');
}

function renderVetTable(a) {
  const entries = [...(a.vet || [])].sort((x,y) => x.date < y.date ? 1 : -1);
  const tbody   = document.getElementById('vetTableBody');
  const empty   = document.getElementById('vetEmpty');

  if (!entries.length) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  tbody.innerHTML = entries.map((v, i) => `
    <tr>
      <td>${formatDate(v.date)}</td>
      <td><span class="status-badge status-bred" style="font-size:9px">${v.type}</span></td>
      <td>${v.treatment || '—'}</td>
      <td><button class="del-btn" onclick="deleteVetEntry(${a.id}, ${i})">🗑</button></td>
    </tr>`).join('');
}

function saveVetEntry() {
  const id        = parseInt(document.getElementById('vetAnimalId').value);
  const dt        = document.getElementById('vetDate').value;
  const type      = document.getElementById('vetType').value;
  const treatment = document.getElementById('vetTreatment').value.trim();
  if (!dt) { alert('Please select a date.'); return; }

  const a = animals.find(x => x.id === id);
  if (!a.vet) a.vet = [];
  a.vet.push({ date: dt, type, treatment });
  persist(); renderVetTable(a); render();
  document.getElementById('vetTreatment').value = '';
}

function deleteVetEntry(animalId, index) {
  const a = animals.find(x => x.id === animalId);
  if (!a) return;
  const sorted = [...a.vet].sort((x,y) => x.date < y.date ? 1 : -1);
  const entry  = sorted[index];
  a.vet = a.vet.filter(v => v !== entry);
  persist(); renderVetTable(a); render();
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
