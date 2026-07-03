# 🎬 CineGallery

**CineGallery** adalah aplikasi galeri film modern yang dibangun menggunakan arsitektur **Clean Architecture** dengan React, TypeScript, dan Tailwind CSS v4. Aplikasi ini mengonsumsi data dari [TMDB API](https://www.themoviedb.org/documentation/api) untuk menyajikan katalog film yang kaya, interaktif, dan sinematis.

> Developed by **Rizki Kosasih**

---

## ✨ Fitur Utama

- **🏠 Beranda Sinematis** — Hero banner carousel untuk film trending, dilengkapi baris horizontal per kategori (Trending, Sedang Tayang, Populer, Rating Tertinggi, Akan Datang).
- **🔍 Pencarian Instan** — Overlay pencarian layar penuh dengan pratinjau poster real-time saat hover.
- **📖 Halaman Detail Film** — Halaman detail mandiri (`/movie/:id`) menampilkan backdrop sinematik, sinopsis, statistik lengkap (anggaran, pendapatan, durasi), dan rekomendasi film serupa.
- **🗂️ Halaman Eksplorasi** — Grid galeri responsif (2–6 kolom) dengan infinite scroll otomatis per kategori.
- **🔖 Watchlist** — Simpan film favorit ke daftar tontonan menggunakan state management Zustand.
- **🌗 Toggle Tema (Dark/Light)** — Perpindahan tema gelap & terang secara manual dengan animasi clip-path yang halus.
- **🖱️ Drag-to-Scroll** — Baris film horizontal mendukung geser klik-dan-tarik (click-and-drag) untuk pengguna mouse desktop.
- **📱 Responsif** — Tata letak yang optimal di seluruh ukuran layar (mobile, tablet, desktop).

---

## 🏗️ Arsitektur

Proyek ini mengikuti prinsip **Clean Architecture** dengan pemisahan lapisan yang ketat:

```
src/
├── core/                  # Konfigurasi global & utilitas
│   ├── api/               # TMDB API client (tmdbFetch)
│   ├── providers/         # Theme context provider
│   ├── utils/             # Helper (cn utility)
│   └── di.ts              # Dependency injection container
├── data/                  # Lapisan Data (akses eksternal)
│   ├── datasources/       # Interface & implementasi remote source
│   ├── mappers/           # DTO → Entity transformer
│   ├── repositories/      # Interface & implementasi repository
│   └── schemas/           # Zod validation schemas
├── domain/                # Lapisan Domain (logika bisnis murni)
│   ├── entities/          # Tipe data domain (Movie, MovieDetail)
│   ├── store/             # Zustand state management
│   └── usecases/          # Use case per fitur
└── presentation/          # Lapisan Presentasi (UI)
    ├── components/        # Komponen UI reusable
    │   └── ui/            # Primitives (Button, Badge, Dialog, dll)
    ├── hooks/             # React Query custom hooks
    └── pages/             # Halaman (Home, Explore, MovieDetail)
```

### Alur Data

```
TMDB API → RemoteSource → Zod Validation → Mapper → Repository → UseCase → React Query Hook → UI Component
```

---

## 🛠️ Tech Stack

| Kategori             | Teknologi                        |
| -------------------- | -------------------------------- |
| **Framework**        | React 19 + TypeScript 6          |
| **Build Tool**       | Vite 8                           |
| **Styling**          | Tailwind CSS v4 + shadcn/ui      |
| **State Management** | Zustand                          |
| **Data Fetching**    | TanStack React Query v5          |
| **Validation**       | Zod v4                           |
| **Routing**          | React Router DOM v7 (HashRouter) |
| **Animasi**          | Framer Motion                    |
| **Ikon**             | Lucide React                     |
| **Carousel**         | Swiper                           |
| **Infinite Scroll**  | react-intersection-observer      |
| **Formatter**        | Prettier                         |
| **Linter**           | Oxlint                           |

---

## 🚀 Memulai

### Prasyarat

- **Node.js** ≥ 18
- **npm** ≥ 9
- **TMDB API Read Access Token** — Dapatkan secara gratis di [themoviedb.org](https://www.themoviedb.org/settings/api)

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/rizkikosasih/movie-app.git
cd movie-app

# 2. Instal dependensi
npm install

# 3. Salin file environment dan isi token TMDB
cp .env.example .env
```

Edit berkas `.env` dan masukkan token TMDB Read Access Anda:

```env
VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token_here
```

### Menjalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

### Build Produksi

```bash
npm run build
npm run preview
```

---

## 📜 Skrip yang Tersedia

| Perintah          | Deskripsi                                     |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Menjalankan development server (Vite HMR)     |
| `npm run build`   | Kompilasi TypeScript + bundle produksi Vite   |
| `npm run preview` | Pratinjau build produksi secara lokal         |
| `npm run lint`    | Menjalankan linter Oxlint                     |
| `npm run format`  | Memformat seluruh kode sumber dengan Prettier |

---

## 🌐 Halaman & Rute

| Rute                 | Halaman     | Deskripsi                                             |
| -------------------- | ----------- | ----------------------------------------------------- |
| `/`                  | Beranda     | Hero banner + baris film per kategori                 |
| `/explore/:category` | Eksplorasi  | Grid galeri infinite scroll per kategori              |
| `/movie/:id`         | Detail Film | Halaman detail lengkap dengan statistik & rekomendasi |

---

## 📝 Atribusi

Aplikasi ini menggunakan [TMDB API](https://www.themoviedb.org/documentation/api) namun tidak didukung atau disertifikasi oleh TMDB.

<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB Logo" width="120" />

---

## 📄 Lisensi

Hak cipta © 2026 CineGallery. Developed by **Rizki Kosasih**. All rights reserved.
