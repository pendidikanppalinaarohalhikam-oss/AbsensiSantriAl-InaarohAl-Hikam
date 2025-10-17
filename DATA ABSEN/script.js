// Data Storage
        let users = JSON.parse(localStorage.getItem('users')) || [
            { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator', registeredAt: new Date().toISOString() }
        ];
        let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];
        let currentUser = null;
        let selectedActivity = null;
        let html5QrCode = null;

        // Google Apps Script Web App URL - GANTI DENGAN URL ANDA
        const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyws0adYm77AlBhtPky70fa8DIEUbBH1Tgif0H-olFCFciVEXdCXPmbxp_VUa-5mHu4/exec';

        // Sample santri data (in real app, this would come from database)
        const santriData = {
        
        // Data Santri Putra Lama
        'ID-1230': { name: 'Ahmad Wildanul Maryansyah', nis: 'ID-1230' },
        'ID-1231': { name: 'Abdullah Ghauts Assiroji', nis: 'ID-1231' },
        'ID-1232': { name: 'Achmad Farid', nis: 'ID-1232' },
        'ID-1233': { name: 'Ade Firmansyah', nis: 'ID-1233' },
        'ID-1234': { name: 'Ade Inayatullah', nis: 'ID-1234' },
        'ID-1235': { name: 'Adha Ananda Salam', nis: 'ID-1235' },
        'ID-1236': { name: 'Adib Rofi\'uddin', nis: 'ID-1236' },
        'ID-1237': { name: 'Ahmad Addin Alhaq', nis: 'ID-1237' },
        'ID-1238': { name: 'Ahmad Ali Haikal', nis: 'ID-1238' },
        'ID-1239': { name: 'Ahmad Azka Rachman', nis: 'ID-1239' },
        'ID-12310': { name: 'Ahmad Baihaqi', nis: 'ID-12310' },
        'ID-12311': { name: 'Ahmad Baihaqi', nis: 'ID-12311' },
        'ID-12312': { name: 'Ahmad Baliya', nis: 'ID-12312' },
        'ID-12313': { name: 'Ahmad Dafiansyah', nis: 'ID-12313' },
        'ID-12314': { name: 'Ahmad Dwi Sugiarto', nis: 'ID-12314' },
        'ID-12315': { name: 'Ahmad Fahmi Afrizal', nis: 'ID-12315' },
        'ID-12316': { name: 'Ahmad Faisal', nis: 'ID-12316' },
        'ID-12317': { name: 'Ahmad Faisal irfani', nis: 'ID-12317' },
        'ID-12318': { name: 'Ahmad Fajar', nis: 'ID-12318' },
        'ID-12319': { name: 'Ahmad Faruq Izzuddin', nis: 'ID-12319' },
        'ID-12320': { name: 'Ahmad Labib Irfany', nis: 'ID-12320' },
        'ID-12321': { name: 'Ahmad Miftakhul Ilmi', nis: 'ID-12321' },
        'ID-12322': { name: 'Ahmad Naelul Author', nis: 'ID-12322' },
        'ID-12323': { name: 'Ahmad Ramadani Sidik', nis: 'ID-12323' },
        'ID-12324': { name: 'Ahmad Zaenul Faqih', nis: 'ID-12324' },
        'ID-12325': { name: 'Ahmad Zanjabil', nis: 'ID-12325' },
        'ID-12326': { name: 'Ahsan Haris Maulana', nis: 'ID-12326' },
        'ID-12327': { name: 'Akmal Zaki Ilham', nis: 'ID-12327' },
        'ID-12328': { name: 'Aldo Hartanto', nis: 'ID-12328' },
        'ID-12329': { name: 'Anton Amar Albara', nis: 'ID-12329' },
        'ID-12330': { name: 'Anwar Maulana', nis: 'ID-12330' },
        'ID-12331': { name: 'Aprisal Aditia', nis: 'ID-12331' },
        'ID-12332': { name: 'Arman Al-Rasyidi', nis: 'ID-12332' },
        'ID-12333': { name: 'Arrafa Okta Pratama', nis: 'ID-12333' },
        'ID-12334': { name: 'Azriel Afdhal Asykurullah', nis: 'ID-12334' },
        'ID-12335': { name: 'Badar Muhammad Badrudduja', nis: 'ID-12335' },
        'ID-12336': { name: 'Bagus Ariffianto', nis: 'ID-12336' },
        'ID-12337': { name: 'Bunyamin', nis: 'ID-12337' },
        'ID-12338': { name: 'Cahya Kurniawan', nis: 'ID-12338' },
        'ID-12339': { name: 'Choirul Huda Alfarizi', nis: 'ID-12339' },
        'ID-12340': { name: 'Daffa Meydi Khadafi', nis: 'ID-12340' },
        'ID-12341': { name: 'Fachri Akbar', nis: 'ID-12341' },
        'ID-12342': { name: 'Fachrul Anam', nis: 'ID-12342' },
        'ID-12343': { name: 'Facrul Fanani', nis: 'ID-12343' },
        'ID-12344': { name: 'Faiq Rausyan Azama', nis: 'ID-12344' },
        'ID-12345': { name: 'Faqih Faizul Haq', nis: 'ID-12345' },
        'ID-12346': { name: 'Farel Al Aydrus', nis: 'ID-12346' },
        'ID-12347': { name: 'Fatih Barnamaj Heekam', nis: 'ID-12347' },
        'ID-12348': { name: 'Fatih Fauzan', nis: 'ID-12348' },
        'ID-12349': { name: 'Fayyad Zildjan Yusahhil', nis: 'ID-12349' },
        'ID-12350': { name: 'Faza Dhiyaulhaq Maulana', nis: 'ID-12350' },
        'ID-12351': { name: 'Gherry Al Khodri', nis: 'ID-12351' },
        'ID-12352': { name: 'Gilbran Fahrama Rizal', nis: 'ID-12352' },
        'ID-12353': { name: 'Guinandra Ario Abisatyo', nis: 'ID-12353' },
        'ID-12354': { name: 'Haidzar rafie Abdullah', nis: 'ID-12354' },
        'ID-12355': { name: 'Hanif Abidin Alim', nis: 'ID-12355' },
        'ID-12356': { name: 'Hasan Jamaludin', nis: 'ID-12356' },
        'ID-12357': { name: 'Ibnu Bagus Mulyana', nis: 'ID-12357' },
        'ID-12358': { name: 'Ilham Syafiq Aldiansyah', nis: 'ID-12358' },
        'ID-12359': { name: 'Imam Syakiib', nis: 'ID-12359' },
        'ID-12360': { name: 'Iqbal Maulana Yusuf', nis: 'ID-12360' },
        'ID-12361': { name: 'Irsyahruddin', nis: 'ID-12361' },
        'ID-12362': { name: 'Ismetullah', nis: 'ID-12362' },
        'ID-12363': { name: 'Jajat Jatnika', nis: 'ID-12363' },
        'ID-12364': { name: 'Kenang Budi Syahputra', nis: 'ID-12364' },
        'ID-12365': { name: 'Khoiruh Shodiq Jamil', nis: 'ID-12365' },
        'ID-12366': { name: 'Khoerul Muhsinin', nis: 'ID-12366' },
        'ID-12367': { name: 'Luthfi Arthawan', nis: 'ID-12367' },
        'ID-12368': { name: 'Muhammad arifin Ilham', nis: 'ID-12368' },
        'ID-12369': { name: 'Muhammad Fadlan Ardiansyah', nis: 'ID-12369' },
        'ID-12370': { name: 'Muhammad Gilang Rabbani', nis: 'ID-12370' },
        'ID-12371': { name: 'Muhammad Nubhan Irfany', nis: 'ID-12371' },
        'ID-12372': { name: 'Muhammad Rusli Hadi', nis: 'ID-12372' },
        'ID-12373': { name: 'Muhammad Gilang Al fatih', nis: 'ID-12373' },
        'ID-12374': { name: 'Maulana Yusuf', nis: 'ID-12374' },
        'ID-12375': { name: 'Mohamed Syerhabil Zeelias Zidane Darmawan', nis: 'ID-12375' },
        'ID-12376': { name: 'Muhammad Abdul Ghani', nis: 'ID-12376' },
        'ID-12377': { name: 'Muhammad Abi Yahya', nis: 'ID-12377' },
        'ID-12378': { name: 'Muhammad Afrizal', nis: 'ID-12378' },
        'ID-12379': { name: 'Muhammad Arif Bilhaq', nis: 'ID-12379' },
        'ID-12380': { name: 'Muhammad Arif Dzul Ilmi', nis: 'ID-12380' },
        'ID-12381': { name: 'Muhammad Arkan Alzena', nis: 'ID-12381' },
        'ID-12382': { name: 'Muhammad Azmi Pahlevi', nis: 'ID-12382' },
        'ID-12383': { name: 'Muhammad Dany Suganda', nis: 'ID-12383' },
        'ID-12384': { name: 'Muhammad Dhiyauddin Fuadi', nis: 'ID-12384' },
        'ID-12385': { name: 'Muhammad Djaki Pratama', nis: 'ID-12385' },
        'ID-12386': { name: 'Muhammad Fachry Albana', nis: 'ID-12386' },
        'ID-12387': { name: 'Muhammad Faqih', nis: 'ID-12387' },
        'ID-12388': { name: 'Muhammad Fitrah Al Farisi', nis: 'ID-12388' },
        'ID-12389': { name: 'Muhammad Haruman', nis: 'ID-12389' },
        'ID-12390': { name: 'Muhammad Husain Al-Idrus', nis: 'ID-12390' },
        'ID-12391': { name: 'Muhammad Husni Azrif Nawawi', nis: 'ID-12391' },
        'ID-12392': { name: 'Muhammad Ilham', nis: 'ID-12392' },
        'ID-12393': { name: 'Muhammad Marvel Khoirullah', nis: 'ID-12393' },
        'ID-12394': { name: 'Muhammad Muji Setiawan', nis: 'ID-12394' },
        'ID-12395': { name: 'Muhammad Nabil Fahrillah', nis: 'ID-12395' },
        'ID-12396': { name: 'Muhammad Nizar Firman', nis: 'ID-12396' },
        'ID-12397': { name: 'Muhammad Rauf Raihan', nis: 'ID-12397' },
        'ID-12398': { name: 'Muhammad Ridwan', nis: 'ID-12398' },
        'ID-12399': { name: 'Muhammad Sahlul Hikmah', nis: 'ID-12399' },
        'ID-123100': { name: 'Nabiliy Asyifa', nis: 'ID-123100' },
        'ID-123101': { name: 'Nuroniyah', nis: 'ID-123101' },
        'ID-123102': { name: 'Naufal Amrullah', nis: 'ID-123102' },
        'ID-123103': { name: 'Nurholis', nis: 'ID-123103' },
        'ID-123104': { name: 'Radia Rifki Alghifari', nis: 'ID-123104' },
        'ID-123105': { name: 'Rafathul Qorib', nis: 'ID-123105' },
        'ID-123106': { name: 'Rafki Aditia', nis: 'ID-123106' },
        'ID-123107': { name: 'Rafki Setiawan', nis: 'ID-123107' },
        'ID-123108': { name: 'Rezky Wira Wicaksana', nis: 'ID-123108' },
        'ID-123109': { name: 'Ridho Surya', nis: 'ID-123109' },
        'ID-123110': { name: 'Rizik Karim', nis: 'ID-123110' },
        'ID-123111': { name: 'Rizkuallah Alfiandu', nis: 'ID-123111' },
        'ID-123112': { name: 'Rizki Mukti', nis: 'ID-123112' },
        'ID-123113': { name: 'Satria Argya Yudhistira', nis: 'ID-123113' },
        'ID-123114': { name: 'Satrio Wiguna', nis: 'ID-123114' },
        'ID-123115': { name: 'Setya Adi Nugroho', nis: 'ID-123115' },
        'ID-123116': { name: 'Shihran Aqila Ardan', nis: 'ID-123116' },
        'ID-123117': { name: 'Sholahudin Ayub', nis: 'ID-123117' },
        'ID-123118': { name: 'Tubagus Muhammad Hasyim Al Muhtady', nis: 'ID-123118' },
        'ID-123119': { name: 'Wildan Ali Riyadi', nis: 'ID-123119' },
        'ID-123120': { name: 'Yuda Pratama', nis: 'ID-123120' },
        'ID-123121': { name: 'Zacky Ramadhan', nis: 'ID-123121' },
        'ID-123122': { name: 'Zahir Ali Kosasih', nis: 'ID-123122' },
        'ID-123123': { name: 'Zaki Riandy', nis: 'ID-123123' },
        'ID-123124': { name: 'Zaky Naufal Abdillah', nis: 'ID-123124' },
        'ID-123125': { name: 'Zidna Irfan Maulana Azrif', nis: 'ID-123125' },
        'ID-123126': { name: 'Muhammad Naufal Abdurrasyid', nis: 'ID-123126' },
        'ID-123127': { name: 'Muslim Pirza', nis: 'ID-123127' },
        'ID-123128': { name: 'Zidan Zafran', nis: 'ID-123128' },
        'ID-123129': { name: 'Bagus Putra Nur Dwi Wibowo', nis: 'ID-123129' },
        'ID-123130': { name: 'Muhammad Nafis Salim', nis: 'ID-123130' },
        'ID-123131': { name: 'Muhammad Khilmi', nis: 'ID-123131' },
        'ID-123132': { name: 'Arya Wirahadikusuma', nis: 'ID-123132' },

        // Data Santri Putra Baru
        'ID-123133': { name: 'Abdur Roykhan', nis: 'ID-123133' },
        'ID-123134': { name: 'Aditiya Saputra', nis: 'ID-123134' },
        'ID-123135': { name: 'Adjie Bayu Segara', nis: 'ID-123135' },
        'ID-123136': { name: 'Ahmad Bahrul Ulum', nis: 'ID-123136' },
        'ID-123137': { name: 'Ahmad Fauzan', nis: 'ID-123137' },
        'ID-123138': { name: 'Ahmad Fauzan', nis: 'ID-123138' },
        'ID-123139': { name: 'Akhmad Adriyan Nawafi Imtiyazi', nis: 'ID-123139' },
        'ID-123140': { name: 'Akhmad Rofi Darojati', nis: 'ID-123140' },
        'ID-123141': { name: 'Alif Zhafran Pratama', nis: 'ID-123141' },
        'ID-123142': { name: 'Azy Himawan', nis: 'ID-123142' },
        'ID-123143': { name: 'Dzenoby Yusuf Ramadhan', nis: 'ID-123143' },
        'ID-123144': { name: 'Fadil Ramdani', nis: 'ID-123144' },
        'ID-123145': { name: 'Faiz Huzain Muazam', nis: 'ID-123145' },
        'ID-123146': { name: 'Fajar Peratama', nis: 'ID-123146' },
        'ID-123147': { name: 'Falahuddin Al Muayyad', nis: 'ID-123147' },
        'ID-123148': { name: 'Fatih Guru Salam', nis: 'ID-123148' },
        'ID-123149': { name: 'Hafidz Nur Adnan', nis: 'ID-123149' },
        'ID-123150': { name: 'Hasanuddin', nis: 'ID-123150' },
        'ID-123151': { name: 'Hazim Mujtaba', nis: 'ID-123151' },
        'ID-123152': { name: 'Iqbal Maulana Yusuf', nis: 'ID-123152' },
        'ID-123153': { name: 'Khamdan Maulana', nis: 'ID-123153' },
        'ID-123154': { name: 'M. Nashif Ilmany Melfiansyah', nis: 'ID-123154' },
        'ID-123155': { name: 'Mohammad Dzakki', nis: 'ID-123155' },
        'ID-123156': { name: 'Mudhofar Al Fadli Hakam M', nis: 'ID-123156' },
        'ID-123157': { name: 'Muhammad Adnan Ramadan', nis: 'ID-123157' },
        'ID-123158': { name: 'Muhammad Aenur Ridho', nis: 'ID-123158' },
        'ID-123159': { name: 'Muhammad Al Fatih', nis: 'ID-123159' },
        'ID-123160': { name: 'Muhammad Aliwafa', nis: 'ID-123160' },
        'ID-123161': { name: 'Muhammad Arif Billah', nis: 'ID-123161' },
        'ID-123162': { name: 'Muhammad Dzulfahmi', nis: 'ID-123162' },
        'ID-123163': { name: 'Muhammad Fahmi Irfani', nis: 'ID-123163' },
        'ID-123164': { name: 'Muhammad Khafid Al Farizi', nis: 'ID-123164' },
        'ID-123165': { name: 'Muhammad Nanda Apriansyah', nis: 'ID-123165' },
        'ID-123166': { name: 'Muhammad Rizky Anugrah', nis: 'ID-123166' },
        'ID-123167': { name: 'Muhammad Salman Widad', nis: 'ID-123167' },
        'ID-123168': { name: 'Nanditho', nis: 'ID-123168' },
        'ID-123169': { name: 'Naufal Azka Adz Dzaki', nis: 'ID-123169' },
        'ID-123170': { name: 'Rafa Jamal Lulael', nis: 'ID-123170' },
        'ID-123171': { name: 'Tubagus Muhammad Rayyan Mandura Raja', nis: 'ID-123171' },
        'ID-123172': { name: 'Zhafran Achfas', nis: 'ID-123172' },
        'ID-123': { name: 'Ade', nis: 'ID-123' },
        };

        // Page Navigation
        function showPage(pageId) {
            document.querySelectorAll('[id$="Page"]').forEach(page => page.classList.add('hidden'));
            document.getElementById(pageId).classList.remove('hidden');
        }

        // Authentication
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                currentUser = user;
                document.getElementById('userInfo').textContent = `${user.name} (${user.role})`;
                showDashboard();
            } else {
                alert('Username atau password salah!');
            }
        });

        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const role = document.getElementById('regRole').value;
            
            if (users.find(u => u.username === username)) {
                alert('Username sudah digunakan!');
                return;
            }
            
            const newUser = {
                username,
                password,
                role,
                name,
                registeredAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Send user data to spreadsheet
            sendUserToSpreadsheet(newUser);
            
            alert('Akun berhasil dibuat! Silakan login.');
            showPage('loginPage');
            document.getElementById('registerForm').reset();
        });

        // Show/Hide Register
        document.getElementById('showRegister').addEventListener('click', () => showPage('registerPage'));
        document.getElementById('showLogin').addEventListener('click', () => showPage('loginPage'));

        // Dashboard
        function showDashboard() {
            showPage('dashboardPage');
            
            if (currentUser.role === 'admin') {
                document.getElementById('adminPanel').classList.remove('hidden');
                loadUsersList();
            } else if (currentUser.role === 'pengurus') {
                document.getElementById('activityPanel').classList.remove('hidden');
            }
            
            loadAttendanceRecords();
        }

        // Admin Panel
        function loadUsersList() {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = '';
            
            users.filter(u => u.role !== 'admin').forEach(user => {
                const row = document.createElement('tr');
                row.className = 'border-b border-gray-100';
                row.innerHTML = `
                    <td class="px-4 py-3">${user.name}</td>
                    <td class="px-4 py-3">${user.username}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${user.role === 'pengurus' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                            ${user.role}
                        </span>
                    </td>
                    <td class="px-4 py-3">${new Date(user.registeredAt).toLocaleDateString('id-ID')}</td>
                    <td class="px-4 py-3">
                        <div class="flex space-x-2">
                            <button onclick="editUser('${user.username}')" class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition duration-200">
                                Edit
                            </button>
                            <button onclick="deleteUser('${user.username}')" class="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition duration-200">
                                Hapus
                            </button>
                        </div>
                    </td>
                `;
                usersList.appendChild(row);
            });
        }

        // Activity Selection
        document.querySelectorAll('.activity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                selectedActivity = this.dataset.activity;
                document.getElementById('selectedActivity').textContent = this.textContent.trim();
                document.getElementById('activityPanel').classList.add('hidden');
                document.getElementById('scannerPanel').classList.remove('hidden');
                startQRScanner();
            });
        });

        document.getElementById('backToActivity').addEventListener('click', function() {
            stopQRScanner();
            document.getElementById('scannerPanel').classList.add('hidden');
            document.getElementById('activityPanel').classList.remove('hidden');
            selectedActivity = null;
        });

        // QR Scanner
        function startQRScanner() {
            html5QrCode = new Html5Qrcode("qr-reader");
            
            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                (decodedText, decodedResult) => {
                    processQRCode(decodedText);
                },
                (errorMessage) => {
                    // Handle scan error silently
                }
            ).catch(err => {
                console.error("Error starting QR scanner:", err);
                alert("Tidak dapat mengakses kamera. Pastikan browser memiliki izin kamera.");
            });
        }

        function stopQRScanner() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    html5QrCode.clear();
                }).catch(err => {
                    console.error("Error stopping QR scanner:", err);
                });
            }
        }

        function processQRCode(qrData) {
            const santri = santriData[qrData];
            const today = new Date().toDateString();
            const now = new Date();
            
            if (!santri) {
                showScanResult('QR Code tidak valid!', 'error');
                return;
            }
            
            // Check if already scanned for this activity today
            const existingRecord = attendanceData.find(record => 
                record.nis === santri.nis && 
                record.activity === selectedActivity && 
                new Date(record.timestamp).toDateString() === today
            );
            
            if (existingRecord) {
                showScanResult(`${santri.name} sudah absen untuk kegiatan ${selectedActivity} hari ini!`, 'warning');
                return;
            }
            
            // Add attendance record
            const attendanceRecord = {
                name: santri.name,
                nis: santri.nis,
                activity: selectedActivity,
                status: 'Hadir',
                timestamp: now.toISOString(),
                recordedBy: currentUser.name
            };
            
            attendanceData.push(attendanceRecord);
            localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
            
            // Send to Google Spreadsheet
            sendToSpreadsheet(attendanceRecord);
            
            showScanResult(`✅ ${santri.name} berhasil absen untuk ${selectedActivity}!`, 'success');
            loadAttendanceRecords();
        }

        function showScanResult(message, type) {
            const resultDiv = document.getElementById('scanResult');
            const messageDiv = document.getElementById('scanMessage');
            
            resultDiv.className = `mt-4 p-4 rounded-lg ${
                type === 'success' ? 'bg-green-100 border border-green-300' :
                type === 'warning' ? 'bg-yellow-100 border border-yellow-300' :
                'bg-red-100 border border-red-300'
            }`;
            
            messageDiv.className = `text-center font-medium ${
                type === 'success' ? 'text-green-800' :
                type === 'warning' ? 'text-yellow-800' :
                'text-red-800'
            }`;
            
            messageDiv.textContent = message;
            resultDiv.classList.remove('hidden');
            
            setTimeout(() => {
                resultDiv.classList.add('hidden');
            }, 3000);
        }

        // Attendance Records
        function loadAttendanceRecords() {
            const attendanceList = document.getElementById('attendanceList');
            const today = new Date().toDateString();
            
            const todayRecords = attendanceData.filter(record => 
                new Date(record.timestamp).toDateString() === today
            );
            
            attendanceList.innerHTML = '';
            
            if (todayRecords.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                        Belum ada data absensi hari ini
                    </td>
                `;
                attendanceList.appendChild(row);
                return;
            }
            
            todayRecords.forEach(record => {
                const row = document.createElement('tr');
                row.className = 'border-white border-white';
                row.innerHTML = `
                    <td class="px-4 py-3 text-white">${record.name}</td>
                    <td class="px-4 py-3 text-white">${record.nis}</td>
                    <td class="px-4 py-3 text-white">
                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ${record.activity}
                        </span>
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ${record.status}
                        </span>
                    </td>
                    <td class="px-4 py-3 text-white">${new Date(record.timestamp).toLocaleTimeString('id-ID')}</td>
                `;
                attendanceList.appendChild(row);
            });
        }

        // Google Spreadsheet Functions
        async function sendToSpreadsheet(data) {
            try {
                const response = await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'addAttendance',
                        data: data
                    })
                });
                
                console.log('Data berhasil dikirim ke spreadsheet');
            } catch (error) {
                console.error('Error mengirim data ke spreadsheet:', error);
                // Data tetap tersimpan lokal meskipun gagal kirim ke spreadsheet
            }
        }

        async function sendUserToSpreadsheet(userData) {
            try {
                const response = await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'addUser',
                        data: userData
                    })
                });
                
                console.log('Data user berhasil dikirim ke spreadsheet');
            } catch (error) {
                console.error('Error mengirim data user ke spreadsheet:', error);
            }
        }

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            if (confirm('Yakin ingin logout?')) {
                stopQRScanner();
                currentUser = null;
                selectedActivity = null;
                document.getElementById('adminPanel').classList.add('hidden');
                document.getElementById('activityPanel').classList.add('hidden');
                document.getElementById('scannerPanel').classList.add('hidden');
                showPage('loginPage');
                document.getElementById('loginForm').reset();
            }
        });

        // User Management Functions
        function editUser(username) {
            const user = users.find(u => u.username === username);
            if (!user) return;
            
            document.getElementById('editUsername').value = user.username;
            document.getElementById('editName').value = user.name;
            document.getElementById('editUsernameField').value = user.username;
            document.getElementById('editPassword').value = '';
            document.getElementById('editRole').value = user.role;
            
            document.getElementById('editUserModal').classList.remove('hidden');
        }

        function deleteUser(username) {
            if (confirm(`Yakin ingin menghapus user "${username}"?`)) {
                users = users.filter(u => u.username !== username);
                localStorage.setItem('users', JSON.stringify(users));
                loadUsersList();
                alert('User berhasil dihapus!');
            }
        }

        function closeEditModal() {
            document.getElementById('editUserModal').classList.add('hidden');
            document.getElementById('editUserForm').reset();
        }

        // Edit User Form Handler
        document.getElementById('editUserForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const originalUsername = document.getElementById('editUsername').value;
            const newName = document.getElementById('editName').value;
            const newUsername = document.getElementById('editUsernameField').value;
            const newPassword = document.getElementById('editPassword').value;
            const newRole = document.getElementById('editRole').value;
            
            // Check if new username already exists (except for current user)
            if (newUsername !== originalUsername && users.find(u => u.username === newUsername)) {
                alert('Username sudah digunakan!');
                return;
            }
            
            // Find and update user
            const userIndex = users.findIndex(u => u.username === originalUsername);
            if (userIndex !== -1) {
                users[userIndex].name = newName;
                users[userIndex].username = newUsername;
                users[userIndex].role = newRole;
                
                // Update password only if provided
                if (newPassword.trim()) {
                    users[userIndex].password = newPassword;
                }
                
                localStorage.setItem('users', JSON.stringify(users));
                
                // Send updated user data to spreadsheet
                sendUserToSpreadsheet(users[userIndex]);
                
                closeEditModal();
                loadUsersList();
                alert('User berhasil diupdate!');
            }
        });

        // Initialize
        showPage('loginPage');
        
    function logout() {
    currentUser = null;
    selectedActivity = null;
    
    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    
    // Hide dashboards
    pengurusDashboard.classList.add('hidden');
    tamuDashboard.classList.add('hidden');
    
    // Show auth page
    authPage.classList.remove('hidden');
    
    // Reset panels ke posisi awal
    loginPanel.classList.remove('slide-left');
    loginPanel.style.transform = 'translateX(0)';
    registerPanel.classList.add('slide-right');
    registerPanel.style.transform = 'translateX(100%)';
    
    // Reset scanner view
    document.getElementById('qrScanner').classList.add('hidden');
    document.getElementById('selectActivity').classList.remove('hidden');
    
    // Stop scanner if running
    stopQRScanner();
    
    // Clear messages
    const messages = document.querySelectorAll('.message-success, .message-error, .message-loading');
    messages.forEach(msg => msg.remove());
}