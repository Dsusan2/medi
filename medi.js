// Utility to create header portion above table
function HeaderPasien(props) {
    const section = document.createElement('div');
    section.className = 'flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3';
  
    const leftDiv = document.createElement('div');
    const title = document.createElement('h2');
    title.className = 'text-2xl font-extrabold';
    title.textContent = props.title;
    leftDiv.appendChild(title);
  
    const btnTambah = document.createElement('button');
    btnTambah.className = 'btn-tambah';
    btnTambah.setAttribute('type', 'button');
    btnTambah.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                          </svg>Tambah`;
    leftDiv.appendChild(btnTambah);
    section.appendChild(leftDiv);
  
    const rightDiv = document.createElement('div');
    rightDiv.className = 'flex gap-2 flex-wrap';
  
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Cari pasien...';
    searchInput.setAttribute('aria-label', 'Cari pasien');
    searchInput.className = 'border border-blue-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400';
    rightDiv.appendChild(searchInput);
  
    const searchBtn = document.createElement('button');
    searchBtn.type = 'button';
    searchBtn.className = 'btn-search';
    searchBtn.textContent = 'Cari';
    rightDiv.appendChild(searchBtn);
  
    section.appendChild(rightDiv);
  
    return { 
        element: section,
        btnTambah,
        searchInput,
        searchBtn
    };
}
  
// Component for the patients table
function PatientsTable(props) {
    const category = props.category;
    let dataPatients = [];
    let filteredData = []; // Array untuk menyimpan data yang sudah difilter
    let searchTerm = ''; // Menyimpan kata kunci pencarian
    
    const container = document.createElement('div');
    container.className = 'content-area';
  
    const table = document.createElement('table');
    table.setAttribute('aria-label', `Tabel data pasien ${category}`);
    table.className = 'w-full';
  
    // Create header row
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    
    ['NO', 'HARI/TGL', 'NAMA PASIEN', 'NAMA KK', 'UMUR', 'ALAMAT', 'DIAGNOSA', 'TERAPHY', 'KET', 'AKSI'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        th.className = 'text-left py-2 px-4 border-b';
        trHead.appendChild(th);
    });
    
    thead.appendChild(trHead);
    table.appendChild(thead);
  
    // Body container
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
  
    container.appendChild(table);
  
    // Load data from localStorage
    function loadData() {
        const saved = localStorage.getItem(`pasien_${category}`);
        dataPatients = saved ? JSON.parse(saved) : [];
        filteredData = [...dataPatients]; // Salin semua data ke filteredData
        render();
    }
  
    // Save data to localStorage
    function saveData() {
        localStorage.setItem(`pasien_${category}`, JSON.stringify(dataPatients));
    }
  
    // Fungsi untuk melakukan pencarian
    function performSearch(searchQuery) {
        searchTerm = searchQuery.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Jika pencarian kosong, tampilkan semua data
            filteredData = [...dataPatients];
        } else {
            // Filter data berdasarkan nama pasien
            filteredData = dataPatients.filter(patient => 
                patient.nama_pasien.toLowerCase().includes(searchTerm)
            );
        }
        
        render();
    }
  
    // Render patients rows
    function render() {
        tbody.innerHTML = '';
        
        if (filteredData.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.setAttribute('colspan', 10);
            td.className = 'text-center py-4 text-gray-500';
            td.textContent = searchTerm === '' ? 'Belum ada data pasien' : 'Tidak ada data pasien yang sesuai dengan pencarian';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }
  
        filteredData.forEach((patient, index) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50';
  
            // NO - menggunakan index asli dari dataPatients
            const tdNo = document.createElement('td');
            tdNo.className = 'py-2 px-4 border-b';
            tdNo.textContent = dataPatients.indexOf(patient) + 1;
            tr.appendChild(tdNo);
  
            // HARI/TGL
            const tdHariTgl = document.createElement('td');
            tdHariTgl.className = 'py-2 px-4 border-b';
            tdHariTgl.textContent = patient.hari_tgl;
            tr.appendChild(tdHariTgl);
  
            // NAMA PASIEN
            const tdNamaPasien = document.createElement('td');
            tdNamaPasien.className = 'py-2 px-4 border-b';
            tdNamaPasien.textContent = patient.nama_pasien;
            tr.appendChild(tdNamaPasien);
  
            // NAMA KK
            const tdNamaKK = document.createElement('td');
            tdNamaKK.className = 'py-2 px-4 border-b';
            tdNamaKK.textContent = patient.nama_kk;
            tr.appendChild(tdNamaKK);
  
            // UMUR
            const tdUmur = document.createElement('td');
            tdUmur.className = 'py-2 px-4 border-b';
            tdUmur.textContent = patient.umur;
            tr.appendChild(tdUmur);
  
            // ALAMAT
            const tdAlamat = document.createElement('td');
            tdAlamat.className = 'py-2 px-4 border-b';
            tdAlamat.textContent = patient.alamat;
            tr.appendChild(tdAlamat);
  
            // DIAGNOSA
            const tdDiagnosa = document.createElement('td');
            tdDiagnosa.className = 'py-2 px-4 border-b';
            tdDiagnosa.textContent = patient.diagnosa;
            tr.appendChild(tdDiagnosa);
  
            // TERAPHY
            const tdTeraphy = document.createElement('td');
            tdTeraphy.className = 'py-2 px-4 border-b';
            tdTeraphy.textContent = patient.teraphy;
            tr.appendChild(tdTeraphy);
  
            // KET
            const tdKet = document.createElement('td');
            tdKet.className = 'py-2 px-4 border-b';
            tdKet.textContent = patient.ket;
            tr.appendChild(tdKet);
  
            // AKSI
            const tdAksi = document.createElement('td');
            tdAksi.className = 'py-2 px-4 border-b flex gap-2';
  
            // Edit button - menggunakan index asli dari dataPatients
            const btnEdit = document.createElement('button');
            btnEdit.className = 'btn-edit';
            btnEdit.textContent = 'Edit';
            btnEdit.onclick = () => {
                // Menampilkan form edit di baris yang sama
                const originalIndex = dataPatients.indexOf(patient);
                const editForm = createEditForm(patient, originalIndex);
                tr.replaceWith(editForm);
            };
            tdAksi.appendChild(btnEdit);
  
            // Delete button - menggunakan index asli dari dataPatients
            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn-hapus';
            btnDelete.textContent = 'Hapus';
            btnDelete.onclick = () => {
                if (confirm(`Hapus data pasien ${patient.nama_pasien}?`)) {
                    const originalIndex = dataPatients.indexOf(patient);
                    dataPatients.splice(originalIndex, 1);
                    saveData();
                    performSearch(searchTerm); // Refresh dengan pencarian yang sama
                }
            };
            tdAksi.appendChild(btnDelete);
  
            tr.appendChild(tdAksi);
            tbody.appendChild(tr);
        });
    }
  
    // Create edit form
    function createEditForm(patient, index) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 10;
  
        const form = document.createElement('form');
        form.className = 'flex flex-col space-y-2';
  
        const inputHariTgl = document.createElement('input');
        inputHariTgl.type = 'date';
        inputHariTgl.value = patient.hari_tgl;
        inputHariTgl.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputNamaPasien = document.createElement('input');
        inputNamaPasien.type = 'text';
        inputNamaPasien.value = patient.nama_pasien;
        inputNamaPasien.placeholder = 'Nama Pasien';
        inputNamaPasien.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputNamaKK = document.createElement('input');
        inputNamaKK.type = 'text';
        inputNamaKK.value = patient.nama_kk;
        inputNamaKK.placeholder = 'Nama KK';
        inputNamaKK.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputUmur = document.createElement('input');
        inputUmur.type = 'text';
        inputUmur.value = patient.umur;
        inputUmur.placeholder = 'Umur';
        inputUmur.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputAlamat = document.createElement('input');
        inputAlamat.type = 'text';
        inputAlamat.value = patient.alamat;
        inputAlamat.placeholder = 'Alamat';
        inputAlamat.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputDiagnosa = document.createElement('input');
        inputDiagnosa.type = 'text';
        inputDiagnosa.value = patient.diagnosa;
        inputDiagnosa.placeholder = 'Diagnosa';
        inputDiagnosa.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputTeraphy = document.createElement('input');
        inputTeraphy.type = 'text';
        inputTeraphy.value = patient.teraphy;
        inputTeraphy.placeholder = 'Teraphy';
        inputTeraphy.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputKet = document.createElement('input');
        inputKet.type = 'text';
        inputKet.value = patient.ket;
        inputKet.placeholder = 'Ket';
        inputKet.className = 'border border-gray-300 rounded px-3 py-2';
  
        const btnSave = document.createElement('button');
        btnSave.type = 'submit';
        btnSave.className = 'btn-save';
        btnSave.textContent = 'Simpan';
  
        const btnCancel = document.createElement('button');
        btnCancel.type = 'button';
        btnCancel.className = 'btn-cancel';
        btnCancel.textContent = 'Batal';
  
        btnSave.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validasi input
            if (!inputNamaPasien.value.trim()) {
                alert('Nama pasien harus diisi!');
                return;
            }
            
            const updatedPatient = {
                hari_tgl: inputHariTgl.value,
                nama_pasien: inputNamaPasien.value,
                nama_kk: inputNamaKK.value,
                umur: inputUmur.value,
                alamat: inputAlamat.value,
                diagnosa: inputDiagnosa.value,
                teraphy: inputTeraphy.value,
                ket: inputKet.value
            };
            
            dataPatients[index] = updatedPatient;
            saveData();
            
            // Update filteredData juga
            filteredData = [...dataPatients];
            if (searchTerm) {
                filteredData = dataPatients.filter(patient => 
                    patient.nama_pasien.toLowerCase().includes(searchTerm)
                );
            }
            render();
        });
  
        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            render(); // Kembali ke tampilan normal
        });
  
        form.appendChild(inputHariTgl);
        form.appendChild(inputNamaPasien);
        form.appendChild(inputNamaKK);
        form.appendChild(inputUmur);
        form.appendChild(inputAlamat);
        form.appendChild(inputDiagnosa);
        form.appendChild(inputTeraphy);
        form.appendChild(inputKet);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex gap-2';
        buttonContainer.appendChild(btnSave);
        buttonContainer.appendChild(btnCancel);
        form.appendChild(buttonContainer);
  
        td.appendChild(form);
        tr.appendChild(td);
        return tr;
    }
  
    // Initialize adding new patient row
    function addNewPatientRow() {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 10;
  
        const form = document.createElement('form');
        form.className = 'flex flex-col space-y-2';
  
        const inputHariTgl = document.createElement('input');
        inputHariTgl.type = 'date';
        inputHariTgl.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputNamaPasien = document.createElement('input');
        inputNamaPasien.type = 'text';
        inputNamaPasien.placeholder = 'Nama Pasien';
        inputNamaPasien.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputNamaKK = document.createElement('input');
        inputNamaKK.type = 'text';
        inputNamaKK.placeholder = 'Nama KK';
        inputNamaKK.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputUmur = document.createElement('input');
        inputUmur.type = 'text';
        inputUmur.placeholder = 'Umur';
        inputUmur.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputAlamat = document.createElement('input');
        inputAlamat.type = 'text';
        inputAlamat.placeholder = 'Alamat';
        inputAlamat.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputDiagnosa = document.createElement('input');
        inputDiagnosa.type = 'text';
        inputDiagnosa.placeholder = 'Diagnosa';
        inputDiagnosa.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputTeraphy = document.createElement('input');
        inputTeraphy.type = 'text';
        inputTeraphy.placeholder = 'Teraphy';
        inputTeraphy.className = 'border border-gray-300 rounded px-3 py-2';
  
        const inputKet = document.createElement('input');
        inputKet.type = 'text';
        inputKet.placeholder = 'Ket';
        inputKet.className = 'border border-gray-300 rounded px-3 py-2';
  
        const btnSave = document.createElement('button');
        btnSave.type = 'button';
        btnSave.className = 'btn-save';
        btnSave.textContent = 'Simpan';
  
        const btnCancel = document.createElement('button');
        btnCancel.type = 'button';
        btnCancel.className = 'btn-cancel';
        btnCancel.textContent = 'Batal';
  
        btnSave.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validasi input
            if (!inputNamaPasien.value.trim()) {
                alert('Nama pasien harus diisi!');
                return;
            }
            
            const newPatient = {
              hari_tgl: inputHariTgl.value,
              nama_pasien: inputNamaPasien.value,
              nama_kk: inputNamaKK.value,
              umur: inputUmur.value,
              alamat: inputAlamat.value,
              diagnosa: inputDiagnosa.value,
              teraphy: inputTeraphy.value,
              ket: inputKet.value
            };
            
            dataPatients.push(newPatient);
            saveData();
            
            // Reset pencarian dan tampilkan semua data
            searchTerm = '';
            filteredData = [...dataPatients];
            render();
        });
  
        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            render(); // Kembali ke tampilan normal
        });
  
        form.appendChild(inputHariTgl);
        form.appendChild(inputNamaPasien);
        form.appendChild(inputNamaKK);
        form.appendChild(inputUmur);
        form.appendChild(inputAlamat);
        form.appendChild(inputDiagnosa);
        form.appendChild(inputTeraphy);
        form.appendChild(inputKet);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex gap-2';
        buttonContainer.appendChild(btnSave);
        buttonContainer.appendChild(btnCancel);
        form.appendChild(buttonContainer);
  
        td.appendChild(form);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
  
    // Initialize
    loadData();
  
    return {
        container,
        render,
        addNewPatientRow,
        saveData,
        dataPatients,
        performSearch // Expose fungsi pencarian
    };
}
  
// Main app
document.addEventListener('DOMContentLoaded', () => {
    const menuSections = {
        dashboard: document.getElementById('dashboard'),
        laki: document.getElementById('laki'),
        perempuan: document.getElementById('perempuan'),
        anak: document.getElementById('anak'),
        ibuhamil: document.getElementById('ibuhamil')
    };
  
    const tables = {};
  
    // Initialize each table
    Object.keys(menuSections).forEach(category => {
        if (category === 'dashboard') return;
        
        const section = menuSections[category];
        section.innerHTML = '';
        
        // Create header and table
        const header = HeaderPasien({
            title: category === 'laki' ? 'Pasien Laki-Laki' :
                  category === 'perempuan' ? 'Pasien Perempuan' :
                  category === 'anak' ? 'Pasien Anak-Anak' : 'Pasien Ibu Hamil'
        });
        
        const table = PatientsTable({category});
        
        // Append to section
        section.appendChild(header.element);
        section.appendChild(table.container);
        
        // Store reference
        tables[category] = table;
        
        // Set event listeners untuk tombol tambah
        header.btnTambah.addEventListener('click', () => {
            table.addNewPatientRow();
        });
  
        // Set event listeners untuk pencarian
        header.searchBtn.addEventListener('click', () => {
            const searchQuery = header.searchInput.value;
            table.performSearch(searchQuery);
        });
  
        // Set event listener untuk pencarian saat menekan Enter
        header.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchQuery = header.searchInput.value;
                table.performSearch(searchQuery);
            }
        });
  
        // Set event listener untuk pencarian real-time (opsional)
        header.searchInput.addEventListener('input', (e) => {
            const searchQuery = e.target.value;
            table.performSearch(searchQuery);
        });
    });
  
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const menu = link.dataset.menu;
            document.querySelectorAll('.menu-section').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById(menu).classList.remove('hidden');
        });
    });
  });
