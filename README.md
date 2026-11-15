# Pengaplikasian React untuk Development Frontend (Manajemen Produk)

Proyek ini merupakan implementasi antarmuka web modern untuk **Manajemen Produk** menggunakan **React**, **Vite**, dan **Tailwind CSS**. Aplikasi ini dibangun secara modular dengan memisahkan komponen kartu produk dan modal dialog interaktif, mendukung fitur CRUD pada antarmuka (Create, Read, Update, Delete), serta fitur pencarian produk secara real-time.

---

## 👤 Identitas Mahasiswa
- **Nama:** Muhammad Rifqi Fathurrahman
- **NRP:** 5027251029
- **Mata Kuliah:** Pemrograman Web (PWeb)
- **Tugas:** Tugas 3 - Pengaplikasian React untuk Development Frontend

---

## 🌟 Fitur Utama
1. **Daftar Produk Dinamis:**
   - Menampilkan daftar produk awal sesuai spesifikasi (Pulpen, Buku Tulis, Spidol, Penggaris, Penghapus).
   - Menampilkan label ID, nama produk, dan harga dengan pemformatan mata uang Rupiah (`id-ID`).
   - Counter produk dinamis dan informasi jumlah produk yang ditampilkan.
2. **Pencarian Real-Time:**
   - Input pencarian interaktif untuk memfilter produk berdasarkan nama produk secara instan.
3. **Modal Pop-Up Tambah Produk:**
   - Form modal untuk menambahkan produk baru dengan validasi nama produk dan harga harus lebih dari 0.
4. **Modal Pop-Up Edit Produk:**
   - Form modal untuk memperbarui informasi produk yang dipilih secara presisi.
5. **Modal Pop-Up Konfirmasi Hapus Produk:**
   - Dialog konfirmasi dengan ikon peringatan sebelum produk dihapus secara permanen dari daftar.

---

## 📁 Struktur Direktori
```text
Pengaplikasian-React-untuk-Development-Frontend_Fathur_5027251029/
├── evidence/                       # Tangkapan layar bukti pengujian antarmuka
│   ├── 01_halaman_utama.png
│   ├── 02_pencarian_produk.png
│   ├── 03_modal_tambah.png
│   ├── 04_modal_edit.png
│   └── 05_modal_hapus.png
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx         # Komponen kartu produk modular
│   │   └── ProductModals.jsx       # Komponen modal dialog (Tambah, Edit, Hapus)
│   ├── data/
│   │   └── initialProducts.js      # Data seed awal & helper format Rupiah
│   ├── App.jsx                     # Komponen utama & state management
│   ├── index.css                   # Direktif Tailwind CSS & styling dasar
│   └── main.jsx                    # Entry point React DOM
├── index.html                      # HTML template
├── package.json                    # Konfigurasi dependensi
├── vite.config.js                  # Konfigurasi bundler Vite & Tailwind plugin
└── README.md                       # Dokumentasi proyek
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat
- **Node.js** (v18 atau lebih baru)
- **npm** atau package manager sejenis

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

## 📋 Bukti Pengujian Antarmuka

| No | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Bukti Tangkapan Layar |
|:--:|---|---|:---:|:---:|
| 1 | Membuka halaman utama daftar produk | Seluruh produk awal (5 produk) ditampilkan dalam grid kartu beserta badge counter "5 produk" | Sesuai | `evidence/01_halaman_utama.png` |
| 2 | Melakukan pencarian nama produk ("Buku") | Daftar produk terfilter secara dinamis menampilkan "Buku Tulis" dan counter "1 produk" | Sesuai | `evidence/02_pencarian_produk.png` |
| 3 | Membuka modal Tambah Produk | Pop-up modal input nama dan harga tampil dengan validasi harga > 0 | Sesuai | `evidence/03_modal_tambah.png` |
| 4 | Membuka modal Edit Produk | Pop-up modal menampilkan data produk yang dipilih (ID 2: Buku Tulis) siap diedit | Sesuai | `evidence/04_modal_edit.png` |
| 5 | Membuka modal konfirmasi Hapus Produk | Pop-up modal peringatan tampil menampilkan detail produk yang akan dihapus | Sesuai | `evidence/05_modal_hapus.png` |
