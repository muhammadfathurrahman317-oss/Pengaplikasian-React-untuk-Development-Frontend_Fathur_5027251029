# Pengaplikasian React Router, Tailwind CSS & Dashboard (Tugas 4)

Proyek ini merupakan pengembangan tingkat lanjut dari aplikasi **Manajemen Produk** pada penugasan Praktikum Pemrograman Web (PWeb). Pada **Tugas 4**, antarmuka telah dikembangkan menjadi aplikasi multi-halaman berbasis **React Router DOM**, antarmuka **Dashboard** responsif dengan **Tailwind CSS**, dynamic routing untuk **Detail Produk**, serta integrasi layanan REST API ke backend **Express.js + Prisma ORM**.

---

## 👤 Identitas Mahasiswa
- **Nama:** Muhammad Rifqi Fathurrahman
- **NRP:** 5027251029
- **Kelas:** A
- **Mata Kuliah:** Pemrograman Web (PWeb)
- **Tugas:** Tugas 4 - Styling & Integrasi Project React dengan Project ExpressJS

---

## 🌟 Fitur Utama & Pokok Bahasan Tugas 4

1. **Arsitektur Layout Bersama (Shared Layout & Outlet):**
   - Menggunakan `<RootLayout />` dengan komponen `<Sidebar />` tetap dan `<Outlet />` untuk menampilkan konten halaman secara dinamis mengikuti rute URL.
   - Menggunakan `NavLink` dengan status aktif (`isActive`) yang memberikan umpan balik visual jelas tanpa memuat ulang (*reload*) halaman.

2. **Navigasi Multi-Halaman (React Router DOM):**
   - `/` atau `/dashboard`: **Halaman Dashboard** ikhtisar dengan statistik metrik (Total Produk, Nilai Total Inventaris, Rata-rata Harga, Status Database), sorotan produk, dan ringkasan tabel produk terkini.
   - `/products`: **Halaman Daftar Produk** lengkap dengan pencarian real-time, counter jumlah produk, dan modal pop-up interaktif (Tambah, Edit, Hapus).
   - `/products/:id`: **Halaman Detail Produk Dinamis** menggunakan hook `useParams()` untuk menampilkan informasi mendalam mengenai spesifikasi barang.
   - `*`: **Halaman 404 Not Found** dengan pesan informatif dan tombol navigasi kembali ke dashboard.

3. **Integrasi REST API Backend & Resilience (Fall-back Otomatis):**
   - Layanan API client modular (`src/services/api.js`) berkomunikasi langsung dengan backend Express.js (`http://localhost:3000`).
   - Dilengkapi deteksi status backend otomatis (*Online/Offline*) dan mekanisme fallback ke cache lokal (*resilience*) sehingga aplikasi tetap dapat berjalan mulus baik saat backend aktif maupun berdiri sendiri.

4. **Desain Antarmuka Dashboard Modern (Tailwind CSS):**
   - Desain tata letak responsif (*mobile-friendly* dengan drawer sidebar dan tampilan desktop terstruktur).
   - Indikator status koneksi API real-time pada header.
   - Notifikasi Toast interaktif untuk setiap aksi penambahan, pembaruan, dan penghapusan produk.

---

## 📁 Struktur Direktori
```text
Pengaplikasian-React-untuk-Development-Frontend_Fathur_5027251029/
├── evidence/                       # Tangkapan layar bukti pengujian antarmuka
│   ├── 01_halaman_dashboard.png
│   ├── 02_halaman_daftar_produk.png
│   ├── 03_halaman_detail_produk.png
│   ├── 04_modal_tambah_produk.png
│   ├── 05_modal_edit_produk.png
│   ├── 06_modal_hapus_produk.png
│   └── 07_halaman_404_not_found.png
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Header atas dengan status koneksi API
│   │   ├── ProductCard.jsx         # Komponen kartu produk dengan link detail
│   │   ├── ProductModals.jsx       # Modal dialog interaktif (Tambah, Edit, Hapus)
│   │   ├── Sidebar.jsx             # Sidebar navigasi bersama dengan NavLink
│   │   └── Toast.jsx               # Komponen toast feedback notifikasi
│   ├── data/
│   │   └── initialProducts.js      # Data seed awal & helper format Rupiah
│   ├── layouts/
│   │   └── RootLayout.jsx          # Layout bersama dengan Sidebar & Outlet
│   ├── pages/
│   │   ├── DashboardPage.jsx       # Halaman Dashboard (/ atau /dashboard)
│   │   ├── NotFoundPage.jsx        # Halaman 404 Not Found (*)
│   │   ├── ProductDetailPage.jsx   # Halaman Detail Produk (/products/:id)
│   │   └── ProductsPage.jsx        # Halaman Daftar Produk (/products)
│   ├── services/
│   │   └── api.js                  # Service fetch API client ke ExpressJS
│   ├── App.jsx                     # Konfigurasi BrowserRouter & Routes
│   ├── index.css                   # Direktif Tailwind CSS & styling dasar
│   └── main.jsx                    # Entry point React DOM
├── index.html                      # HTML template
├── package.json                    # Konfigurasi dependensi
├── vite.config.js                  # Konfigurasi Vite & proxy backend
└── README.md                       # Dokumentasi lengkap proyek
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat
- **Node.js** (v18 atau lebih baru)
- **npm**

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser pada alamat `http://localhost:5173`.

### 4. Build untuk Produksi
```bash
npm run build
npm run preview
```

---

## 📋 Matriks Bukti Pengujian Antarmuka & Navigasi (Tugas 4)

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Bukti Tangkapan Layar |
|:--:|---|---|:---:|:---:|
| 1 | Membuka halaman Dashboard (`/`) | Menampilkan statistik metrik inventaris, total produk, sorotan harga, dan ringkasan tabel pada layout bersama | **Sesuai** | `evidence/01_halaman_dashboard.png` |
| 2 | Membuka halaman Daftar Produk (`/products`) | Menampilkan seluruh kartu produk, fitur pencarian, dan tombol navigasi detail | **Sesuai** | `evidence/02_halaman_daftar_produk.png` |
| 3 | Memilih salah satu produk (Detail `/products/:id`) | Menampilkan halaman detail spesifik produk (ID 2: Buku Tulis) menggunakan dynamic route `useParams()` | **Sesuai** | `evidence/03_halaman_detail_produk.png` |
| 4 | Membuka modal Tambah Produk | Pop-up modal input nama dan harga tampil dengan validasi harga $> 0$ | **Sesuai** | `evidence/04_modal_tambah_produk.png` |
| 5 | Membuka modal Edit Produk | Pop-up modal menampilkan data produk yang dipilih (ID 2: Buku Tulis) siap diedit | **Sesuai** | `evidence/05_modal_edit_produk.png` |
| 6 | Membuka modal konfirmasi Hapus Produk | Pop-up modal peringatan tampil menampilkan detail produk yang akan dihapus | **Sesuai** | `evidence/06_modal_hapus_produk.png` |
| 7 | Mengakses rute yang tidak terdaftar (`/rute-salah`) | Halaman 404 Not Found ditampilkan dengan tautan navigasi kembali ke dashboard | **Sesuai** | `evidence/07_halaman_404_not_found.png` |
