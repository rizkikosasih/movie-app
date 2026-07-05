# Draf Proyek LinkedIn — CineGallery

Gunakan informasi berikut saat mengunggah proyek **CineGallery** ke bagian **Projects** (Proyek) di profil LinkedIn Anda.

---

## 📋 Data Proyek

### 1. Nama Proyek (Project Title)

> **CineGallery — Premium Movie Discovery Platform**

### 2. Deskripsi Proyek (Project Description)

CineGallery adalah platform penjelajah film premium berbasis web yang dirancang dengan arsitektur berlapis (**Clean Architecture**) untuk menjamin keterbacaan kode, skalabilitas, dan kemudahan pengujian. Mengadopsi estetika desain _Cinematic Midnight_ dengan aksen _Electric Amber_, aplikasi ini menyajikan pengalaman pencarian film yang sangat mulus layaknya bioskop.

**Fitur Utama:**

- **Advanced Filtering & Sorting:** Fitur penyaringan film dinamis berdasarkan multi-genre (logika OR), tahun rilis, batas rating minimum interaktif (slider), dan metode pengurutan (populer, terbaru, rating tertinggi, ulasan terbanyak).
- **Infinite Scrolling:** Navigasi konten tanpa putus yang hemat memori menggunakan Intersection Observer API (mengurangi interupsi navigasi manual).
- **Responsive Layout:** Grid responsif (2–6 kolom) yang adaptif untuk segala ukuran layar (mobile, tablet, desktop).
- **Instant Search Overlay:** Kotak pencarian responsif dengan pratinjau instan untuk kemudahan akses pengguna.
- **Robust Data Flow:** Menggunakan Zod untuk validasi skema data respons API sebelum dikirimkan ke lapisan bisnis.

**Teknologi yang Digunakan (Tech Stack):**

- React 19 & TypeScript (Vite)
- Zustand (State Management) & React Router Dom v7
- TanStack Query / React Query v5 (Data Fetching & Infinite Query Cache)
- Tailwind CSS (Styling) & Framer Motion (Mikro-animasi premium)
- TMDB (The Movie Database) API & Zod (Data Validation Schema)

### 3. Keahlian (Skills)

_(Pilih dari daftar drop-down keahlian di LinkedIn)_:

- React.js
- TypeScript
- Tailwind CSS
- State Management (Zustand)
- React Query (TanStack Query)
- Clean Architecture
- Front-End Development
- Software Design Patterns
- Zod Validation
- Framer Motion

### 4. Media URL (Project URL)

> **`https://cinematic-gallery.vercel.app`**

---

## 💡 Tips Pengunggahan Proyek di LinkedIn

1. **Posisikan di Tempat yang Tepat:** Masukkan draf ini di bagian **Accomplishments > Projects** (Pencapaian > Proyek) di profil Anda. Hubungkan proyek ini dengan posisi pekerjaan Anda saat ini agar lebih terlihat kredibel.
2. **Tambahkan Kontributor:** Jika Anda mengerjakannya bersama rekan kerja atau berpasangan, tambahkan profil mereka sebagai kontributor proyek.
3. **Optimasi Media:** Unggah tautan deploy Vercel di bagian _Media Link_. Saat tautan dimasukkan, metadata Open Graph yang telah kita pasang di `index.html` otomatis akan merender gambar thumbnail `og-image.png` yang telah kita siapkan.
