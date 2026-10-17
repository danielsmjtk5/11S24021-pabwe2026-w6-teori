# Tuntas - Aplikasi Pengelola Tugas Mahasiswa

"Tuntas" adalah aplikasi web pengelola tugas mahasiswa berbasis sisi klien (*client-side*) yang dirancang untuk membantu mencatat, mengorganisasi, dan memantau progres tugas kuliah dengan cepat, bersih, dan efisien tanpa memerlukan backend atau database server.

## Fitur Utama & Kriteria Penerimaan (KF)
1. **KF-01 & KF-02 (Create & Read)**: Menambahkan tugas baru dan melihat daftar tugas secara *real-time*.
2. **KF-03 (Update)**: Mengedit judul atau nama tugas yang sudah ada.
3. **KF-04 (Delete)**: Menghapus tugas dari daftar.
4. **KF-05 (Toggle Complete)**: Menandai tugas menjadi selesai atau belum selesai melalui *checkbox* interaktif.
5. **KF-06 (Filtering)**: Fitur filter untuk menampilkan daftar tugas berdasarkan: *Semua Tugas*, *Belum Selesai*, dan *Sudah Selesai*.
6. **KF-07 (LocalStorage Persistence)**: Penyimpanan data berbasis *browser* sehingga data tugas tidak hilang saat halaman dimuat ulang (*refresh*).

## Teknologi yang Digunakan
- **React.js** (Inisialisasi menggunakan Vite)
- **Tailwind CSS** (Untuk styling antarmuka yang responsif dan modern)
- **React Hooks** (`useState`, `useEffect` dengan *Lazy Initialization*)
- **Bun** (Sebagai *package manager*)

## Panduan Instalasi dan Menjalankan Proyek di Lokal

Pastikan komputer Anda sudah terinstal [Node.js](https://nodejs.org/) dan [Bun](https://bun.sh/).

1. **Clone repository ini ke komputer lokal Anda:**
   ```bash
   git clone [https://github.com/danielsmjtk5/11S24021-pabwe2026-w6-teori.git](https://github.com/danielsmjtk5/11S24021-pabwe2026-w6-teori.git)
   cd 11S24021_Tuntas_ManajemenKegiatan