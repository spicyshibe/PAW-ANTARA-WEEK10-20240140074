# KONTEKS PROJECT
Kamu adalah asisten AI Full-Stack Developer. Saat ini kita sedang mengerjakan tugas mata kuliah Pengembangan Aplikasi Web (PAW) Week 10[cite: 2].
Project ini adalah API layanan Customer Service Bot berbasis Express.js, Sequelize, dan Gemini API[cite: 2].
Tugas utamanya adalah menambahkan fitur "Message History" (riwayat percakapan) pada halaman Chat with AI beserta tampilan UI-nya menggunakan HTML/CSS dan Tailwind.

# TARGET PENGUMPULAN
Hasil akhir akan diunggah ke repository GitHub dengan nama folder/repo: PAW-ANTARA-WEEK10-20240140074.

# INSTRUKSI UTAMA (DOs)
1. BUAT TAMPILAN UI (FRONTEND):
   - Buat file HTML/CSS untuk halaman "Chat with AI".
   - Gunakan framework Tailwind CSS untuk styling halaman agar responsif dan modern.
   - Tambahkan elemen UI berupa Checkbox/Toggle Button untuk meminta persetujuan (consent) dari pengguna: "Simpan riwayat percakapan ini".
   - Buat area UI untuk menampilkan riwayat pesan (Message History) yang diambil dari database.

2. KEMBANGKAN MODEL DATABASE:
   - Buat model baru di dalam folder `models/` untuk menyimpan riwayat chat (misalnya `history.model.js` atau `message.model.js`)[cite: 2].
   - Pastikan model memiliki atribut untuk menyimpan pesan user, respons AI, timestamp, dan penanda sesi jika diperlukan.
   - Jangan lupa daftarkan model tersebut ke dalam `models/index.js`[cite: 1, 2].

3. LENGKAPI LOGIC CONTROLLER & ROUTE:
   - Tambahkan fungsi/logic di dalam `controllers/chat.controller.js` (atau controller baru) untuk menangani dua endpoint baru[cite: 1, 2].
   - **Endpoint Create:** Menyimpan pesan ke database HANYA JIKA user menyetujui penyimpanan riwayat (variabel boolean consent dari frontend = true)[cite: 2].
   - **Endpoint Read:** Menampilkan kembali data riwayat percakapan yang sudah tersimpan di database[cite: 2].
   - Pastikan endpoint mengikuti standar *response* yang ada di `utils/response.js`[cite: 1, 2].

# LARANGAN & BATASAN (DON'Ts)
1. DILARANG MENGUBAH STRUKTUR DASAR: Jangan memodifikasi file di dalam folder `config/`, `middlewares/`, dan setup autentikasi (auth) yang sudah ada[cite: 2]. Fokus hanya pada `models/`, `controllers/`, dan file UI/Frontend[cite: 2].
2. DILARANG MENGUBAH SYSTEM PROMPT GEMINI: Jangan mengubah instruksi keamanan utama atau guardrail yang sudah ada di `services/gemini.service.js`[cite: 1, 2].
3. DILARANG MEMBUAT ENDPOINT REGISTER ADMIN: Sesuai prinsip keamanan project awal, pembuatan admin hanya boleh melalui seeders, jangan buat route untuk register admin baru[cite: 2].
4. DILARANG MENYIMPAN HISTORY TANPA IZIN: Endpoint `create` sama sekali tidak boleh melakukan operasi `INSERT` ke tabel history jika status consent dari user bernilai `false`.