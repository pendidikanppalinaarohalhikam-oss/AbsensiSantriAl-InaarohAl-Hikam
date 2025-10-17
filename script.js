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
        'IDSA-11111': { name: 'Abdullah Ghauts Assiroji', nis: 'IDSA-11111' },
        'IDSA-11112': { name: 'Abdur Roykhan', nis: 'IDSA-11112' },
        'IDSA-11113': { name: 'Abdurrahman Sudes', nis: 'IDSA-11113' },
        'IDSA-11114': { name: 'Achmad Farid', nis: 'IDSA-11114' },
        'IDSA-11115': { name: 'Ade Firmansyah', nis: 'IDSA-11115' },
        'IDSA-11116': { name: 'Ade Inayatullah', nis: 'IDSA-11116' },
        'IDSA-11117': { name: 'Adha Ananda Salam', nis: 'IDSA-11117' },
        'IDSA-11118': { name: 'Adib Rofiuddin', nis: 'IDSA-11118' },
        'IDSA-11119': { name: 'Aditiya Saputra', nis: 'IDSA-11119' },
        'IDSA-11120': { name: 'Adjie Bayu Segara', nis: 'IDSA-11120' },
        'IDSA-11121': { name: 'Ahmad Addin Alhaq', nis: 'IDSA-11121' },
        'IDSA-11122': { name: 'Ahmad Al Fatih', nis: 'IDSA-11122' },
        'IDSA-11123': { name: 'Ahmad Ali Haikal', nis: 'IDSA-11123' },
        'IDSA-11124': { name: 'Ahmad Azka Rachman', nis: 'IDSA-11124' },
        'IDSA-11125': { name: 'Ahmad Bahrul Ulum', nis: 'IDSA-11125' },
        'IDSA-11126': { name: 'Ahmad Baihaqi', nis: 'IDSA-11126' },
        'IDSA-11127': { name: 'Ahmad Baihaqi Al-Farizi', nis: 'IDSA-11127' },
        'IDSA-11128': { name: 'Ahmad Baliya', nis: 'IDSA-11128' },
        'IDSA-11129': { name: 'Ahmad Dafiansyah', nis: 'IDSA-11129' },
        'IDSA-11130': { name: 'Ahmad Dwi Sugiarto', nis: 'IDSA-11130' },
        'IDSA-11131': { name: 'Ahmad Fahmi Afrizal', nis: 'IDSA-11131' },
        'IDSA-11132': { name: 'Ahmad Faisal', nis: 'IDSA-11132' },
        'IDSA-11133': { name: 'Ahmad Faisal irfani', nis: 'IDSA-11133' },
        'IDSA-11134': { name: 'Ahmad Fajar', nis: 'IDSA-11134' },
        'IDSA-11135': { name: 'Ahmad Faruq Izzuddin', nis: 'IDSA-11135' },
        'IDSA-11136': { name: 'Ahmad Fauzan', nis: 'IDSA-11136' },
        'IDSA-11137': { name: 'Ahmad Fauzan', nis: 'IDSA-11137' },
        'IDSA-11138': { name: 'Ahmad Kenang Budi Saputra', nis: 'IDSA-11138' },
        'IDSA-11139': { name: 'Ahmad Labiib Irfaany', nis: 'IDSA-11139' },
        'IDSA-11140': { name: 'Ahmad Miftakhul Ilmi', nis: 'IDSA-11140' },
        'IDSA-11141': { name: 'Ahmad Muhammad Zanatul Rohim', nis: 'IDSA-11141' },
        'IDSA-11142': { name: 'Ahmad Ramadani Sidik', nis: 'IDSA-11142' },
        'IDSA-11143': { name: 'Ahmad Wildanul Maryansyah', nis: 'IDSA-11143' },
        'IDSA-11144': { name: 'Ahmad Zaenul Faqih', nis: 'IDSA-11144' },
        'IDSA-11145': { name: 'Ahmad Zanjabil', nis: 'IDSA-11145' },
        'IDSA-11146': { name: 'Ahsan Haris Maulana', nis: 'IDSA-11146' },
        'IDSA-11147': { name: 'Akhmad Adriyan Nawafi Imtiyazi', nis: 'IDSA-11147' },
        'IDSA-11148': { name: 'Akhmad Rofi Darojati', nis: 'IDSA-11148' },
        'IDSA-11149': { name: 'Akmal Zaki Ilham', nis: 'IDSA-11149' },
        'IDSA-11150': { name: 'Aldo Hartanto', nis: 'IDSA-11150' },
        'IDSA-11151': { name: 'Alif Zhafran Pratama', nis: 'IDSA-11151' },
        'IDSA-11152': { name: 'Anton Amar Albara', nis: 'IDSA-11152' },
        'IDSA-11153': { name: 'Aprisal Aditia', nis: 'IDSA-11153' },
        'IDSA-11154': { name: 'Arman Al-Rasyidi', nis: 'IDSA-11154' },
        'IDSA-11155': { name: 'Ayyasy Mubarok', nis: 'IDSA-11155' },
        'IDSA-11156': { name: 'Azriel Afdhal Asykurullah', nis: 'IDSA-11156' },
        'IDSA-11157': { name: 'Azy Himawan', nis: 'IDSA-11157' },
        'IDSA-11158': { name: 'Bagus Ariffianto', nis: 'IDSA-11158' },
        'IDSA-11159': { name: 'Bagus Putra Nur Dwi Wibowo', nis: 'IDSA-11159' },
        'IDSA-11160': { name: 'Bunyamin', nis: 'IDSA-11160' },
        'IDSA-11161': { name: 'Cahya Kurniawan', nis: 'IDSA-11161' },
        'IDSA-11162': { name: 'Choirul Huda Al-Farizi', nis: 'IDSA-11162' },
        'IDSA-11163': { name: 'Daffa Meydi Khadafi', nis: 'IDSA-11163' },
        'IDSA-11164': { name: 'Dzenoby Yusuf Ramadhan', nis: 'IDSA-11164' },
        'IDSA-11165': { name: 'Fachrul Anam', nis: 'IDSA-11165' },
        'IDSA-11166': { name: 'Fachrul Fanani', nis: 'IDSA-11166' },
        'IDSA-11167': { name: 'Fadil Ramdani', nis: 'IDSA-11167' },
        'IDSA-11168': { name: 'Faiq Rausyan Azama', nis: 'IDSA-11168' },
        'IDSA-11169': { name: 'Faiz Huzain Muazam', nis: 'IDSA-11169' },
        'IDSA-11170': { name: 'Fajar Peratama', nis: 'IDSA-11170' },
        'IDSA-11171': { name: 'Falahuddin Al Muayyad', nis: 'IDSA-11171' },
        'IDSA-11172': { name: 'Faqih Faizul Haq', nis: 'IDSA-11172' },
        'IDSA-11173': { name: 'Farel Al Aydrus', nis: 'IDSA-11173' },
        'IDSA-11174': { name: 'Fathian Ibrahim Azami', nis: 'IDSA-11174' },
        'IDSA-11175': { name: 'Fatih Barnamaj Hikam', nis: 'IDSA-11175' },
        'IDSA-11176': { name: 'Fatih Fauzan Al-Mahiri', nis: 'IDSA-11176' },
        'IDSA-11177': { name: 'Fatih Guru Salam', nis: 'IDSA-11177' },
        'IDSA-11178': { name: 'Fayyad zildjian Yusahhil', nis: 'IDSA-11178' },
        'IDSA-11179': { name: 'Faza Dihyaulhaq Maulana', nis: 'IDSA-11179' },
        'IDSA-11180': { name: 'Gherry Al Khodri', nis: 'IDSA-11180' },
        'IDSA-11181': { name: 'Gilbran Fahrama Rizal', nis: 'IDSA-11181' },
        'IDSA-11182': { name: 'Giri Mustopa', nis: 'IDSA-11182' },
        'IDSA-11183': { name: 'Guinandra Ario Abisatyo', nis: 'IDSA-11183' },
        'IDSA-11184': { name: 'Guntur', nis: 'IDSA-11184' },
        'IDSA-11185': { name: 'Hafidz Nur Adnan', nis: 'IDSA-11185' },
        'IDSA-11186': { name: 'Haidzar rafie Abdullah', nis: 'IDSA-11186' },
        'IDSA-11187': { name: 'Hanif abidin Alim', nis: 'IDSA-11187' },
        'IDSA-11188': { name: 'Hasanuddin', nis: 'IDSA-11188' },
        'IDSA-11189': { name: 'Hazim Mujtaba', nis: 'IDSA-11189' },
        'IDSA-11190': { name: 'Ibnu Bagus Mulyana', nis: 'IDSA-11190' },
        'IDSA-11191': { name: 'Ilham Syafiq Aldiansyah', nis: 'IDSA-11191' },
        'IDSA-11192': { name: 'Imam Syakiib', nis: 'IDSA-11192' },
        'IDSA-11193': { name: 'Iqbal Maulana Yusuf', nis: 'IDSA-11193' },
        'IDSA-11194': { name: 'Irsyahruddin', nis: 'IDSA-11194' },
        'IDSA-11195': { name: 'Ismetullah', nis: 'IDSA-11195' },
        'IDSA-11196': { name: 'Jajat Jatnika', nis: 'IDSA-11196' },
        'IDSA-11197': { name: 'Khaeruh Shodiq Jamil', nis: 'IDSA-11197' },
        'IDSA-11198': { name: 'Khamdan Maulana', nis: 'IDSA-11198' },
        'IDSA-11199': { name: 'Khoerul Muhsinin', nis: 'IDSA-11199' },
        'IDSA-11200': { name: 'Luthfi Arthawan', nis: 'IDSA-11200' },
        'IDSA-11201': { name: 'Maulana Yusuf', nis: 'IDSA-11201' },
        'IDSA-11202': { name: 'Mohamed Syerhabil Zeelias Zidane Darmawan', nis: 'IDSA-11202' },
        'IDSA-11203': { name: 'Mohammad Dzakki', nis: 'IDSA-11203' },
        'IDSA-11204': { name: 'Mudhofar Al Fadli Hakam M', nis: 'IDSA-11204' },
        'IDSA-11205': { name: 'Muhammad Abdul Ghani', nis: 'IDSA-11205' },
        'IDSA-11206': { name: 'Muhammad Abi Yahya', nis: 'IDSA-11206' },
        'IDSA-11207': { name: 'Muhammad Adnan Ramadan', nis: 'IDSA-11207' },
        'IDSA-11208': { name: 'Muhammad Aenur Ridho', nis: 'IDSA-11208' },
        'IDSA-11209': { name: 'Muhammad Afrizal', nis: 'IDSA-11209' },
        'IDSA-11210': { name: 'Muhammad Aliwafa', nis: 'IDSA-11210' },
        'IDSA-11211': { name: 'Muhammad Arif Bilhaq', nis: 'IDSA-11211' },
        'IDSA-11212': { name: 'Muhammad Arif Billah', nis: 'IDSA-11212' },
        'IDSA-11213': { name: 'Muhammad Arif Dzul Ilmi', nis: 'IDSA-11213' },
        'IDSA-11214': { name: 'Muhammad Arifin Ilham', nis: 'IDSA-11214' },
        'IDSA-11215': { name: 'Muhammad Azam Pratama', nis: 'IDSA-11215' },
        'IDSA-11216': { name: 'Muhammad Azmi Pahlevi', nis: 'IDSA-11216' },
        'IDSA-11217': { name: 'Muhammad Dany Suganda', nis: 'IDSA-11217' },
        'IDSA-11218': { name: 'Muhammad Diyauddin Fuady', nis: 'IDSA-11218' },
        'IDSA-11219': { name: 'Muhammad Djaki Pratama', nis: 'IDSA-11219' },
        'IDSA-11220': { name: 'Muhammad Dzulfahmi', nis: 'IDSA-11220' },
        'IDSA-11221': { name: 'Muhammad Fachry Albana', nis: 'IDSA-11221' },
        'IDSA-11222': { name: 'Muhammad Fadlan Ardiansyah', nis: 'IDSA-11222' },
        'IDSA-11223': { name: 'Muhammad Fahmi Irfani', nis: 'IDSA-11223' },
        'IDSA-11224': { name: 'Muhammad Fitrah Al Farisi', nis: 'IDSA-11224' },
        'IDSA-11225': { name: 'Muhammad Gilang Al fatih', nis: 'IDSA-11225' },
        'IDSA-11226': { name: 'Muhammad Gilang Rabbani', nis: 'IDSA-11226' },
        'IDSA-11227': { name: 'Muhammad Haruman', nis: 'IDSA-11227' },
        'IDSA-11228': { name: 'Muhammad Husni Azrif Nawawi', nis: 'IDSA-11228' },
        'IDSA-11229': { name: 'Muhammad Ilham', nis: 'IDSA-11229' },
        'IDSA-11230': { name: 'Muhammad Indra Blorgi', nis: 'IDSA-11230' },
        'IDSA-11231': { name: 'Muhammad Irfan Maulana', nis: 'IDSA-11231' },
        'IDSA-11232': { name: 'Muhammad Khafid Al Farizi', nis: 'IDSA-11232' },
        'IDSA-11233': { name: 'Muhammad Khilmi', nis: 'IDSA-11233' },
        'IDSA-11234': { name: 'Muhammad Marvel Khoirullah', nis: 'IDSA-11234' },
        'IDSA-11235': { name: 'Muhammad Muji Setiawan', nis: 'IDSA-11235' },
        'IDSA-11236': { name: 'Muhammad Nafis Salim', nis: 'IDSA-11236' },
        'IDSA-11237': { name: 'Muhammad Nanda Apriansyah', nis: 'IDSA-11237' },
        'IDSA-11238': { name: 'Muhammad Nashif Ilmany Melfiansyah', nis: 'IDSA-11238' },
        'IDSA-11239': { name: 'Muhammad Naufal abdurrasyid', nis: 'IDSA-11239' },
        'IDSA-11240': { name: 'Muhammad Nizar Firman', nis: 'IDSA-11240' },
        'IDSA-11241': { name: 'Muhammad Nubhan Irfany', nis: 'IDSA-11241' },
        'IDSA-11242': { name: 'Muhammad Rauf Raihan', nis: 'IDSA-11242' },
        'IDSA-11243': { name: 'Muhammad Rizky Anugrah', nis: 'IDSA-11243' },
        'IDSA-11244': { name: 'Muhammad Rusli Hadi', nis: 'IDSA-11244' },
        'IDSA-11245': { name: 'Muhammad Sahlul Hikmah', nis: 'IDSA-11245' },
        'IDSA-11246': { name: 'Muhammad Salman Widad', nis: 'IDSA-11246' },
        'IDSA-11247': { name: 'Muhammad Zammi Arrasyid', nis: 'IDSA-11247' },
        'IDSA-11248': { name: 'Muslim Pirza', nis: 'IDSA-11248' },
        'IDSA-11249': { name: 'Nabiliy Asyifa', nis: 'IDSA-11249' },
        'IDSA-11250': { name: 'Nanditho', nis: 'IDSA-11250' },
        'IDSA-11251': { name: 'Nashiruddin Albani', nis: 'IDSA-11251' },
        'IDSA-11252': { name: 'Naufal Azka Adz Dzaki', nis: 'IDSA-11252' },
        'IDSA-11253': { name: 'Nurholis', nis: 'IDSA-11253' },
        'IDSA-11254': { name: 'Opa Muhammad Fathurrachman', nis: 'IDSA-11254' },
        'IDSA-11255': { name: 'Raditya Rifki Al-Ghiffari', nis: 'IDSA-11255' },
        'IDSA-11256': { name: 'Rafa Jamal Lulael', nis: 'IDSA-11256' },
        'IDSA-11257': { name: 'Rafathul Qorib', nis: 'IDSA-11257' },
        'IDSA-11258': { name: 'Rafi Ahmad', nis: 'IDSA-11258' },
        'IDSA-11259': { name: 'Rafki Setiawan', nis: 'IDSA-11259' },
        'IDSA-11260': { name: 'Rafqi Aditia', nis: 'IDSA-11260' },
        'IDSA-11261': { name: 'Rezky Wira Wicaksana', nis: 'IDSA-11261' },
        'IDSA-11262': { name: 'Ridho Surya', nis: 'IDSA-11262' },
        'IDSA-11263': { name: 'Rizik Karim', nis: 'IDSA-11263' },
        'IDSA-11264': { name: 'Rizki Mukti', nis: 'IDSA-11264' },
        'IDSA-11265': { name: 'Rizkullah Alfiandu', nis: 'IDSA-11265' },
        'IDSA-11266': { name: 'Satria Argya Yudira', nis: 'IDSA-11266' },
        'IDSA-11267': { name: 'Satriyo Wiguna', nis: 'IDSA-11267' },
        'IDSA-11268': { name: 'Setya Adi Nugroho', nis: 'IDSA-11268' },
        'IDSA-11269': { name: 'Shihran Aqila Ardan', nis: 'IDSA-11269' },
        'IDSA-11270': { name: 'Sholahudin Ayub', nis: 'IDSA-11270' },
        'IDSA-11271': { name: 'Tb. M. Rayyan Mandura Raja', nis: 'IDSA-11271' },
        'IDSA-11272': { name: 'Wildan Ali Riyadi', nis: 'IDSA-11272' },
        'IDSA-11273': { name: 'Yasril Anya ramadhan', nis: 'IDSA-11273' },
        'IDSA-11274': { name: 'Yuda Pratama', nis: 'IDSA-11274' },
        'IDSA-11275': { name: 'Zacky Ramadhan', nis: 'IDSA-11275' },
        'IDSA-11276': { name: 'Zahir Ali Kosasih', nis: 'IDSA-11276' },
        'IDSA-11277': { name: 'Zaki Riandy', nis: 'IDSA-11277' },
        'IDSA-11278': { name: 'Zaky Naufal Abdillah', nis: 'IDSA-11278' },
        'IDSA-11279': { name: 'Zhafran Achfas', nis: 'IDSA-11279' },
        'IDSA-11280': { name: 'Zidan Zafran', nis: 'IDSA-11280' },
        'IDSA-11281': { name: 'Zidna Irfan Maulana Azrif', nis: 'IDSA-11281' },
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