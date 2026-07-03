# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Ringkasan Produk

Aplikasi katalog film berbasis TMDB API dengan konsep "The Virtual Gallery & Interactive Showcase". Fokus produk: penyajian konten visual (poster) sebagai elemen utama, dengan struktur navigasi tiga tahap: Beranda, Eksplorasi, Pencarian.

## 2. Target Pengguna

Pengguna yang mencari referensi film melalui eksplorasi visual (grid poster) dan pencarian cepat, bukan melalui daftar teks statis.

## 3. Tech Stack

| Kategori          | Pustaka                     | Versi           |
| ----------------- | --------------------------- | --------------- |
| Core Library      | React                       | 19.0.0          |
| Language          | TypeScript                  | Kompilator      |
| Build Tool        | Vite                        | ^5.0.0          |
| State Management  | Zustand                     | ^5.0.0          |
| Data Fetching     | @tanstack/react-query       | ^5.66.0         |
| Data Validation   | Zod                         | ^3.24.0         |
| Styling Engine    | Tailwind CSS                | ^4.1.12         |
| Styling Utilities | clsx & tailwind-merge       | ^2.1.1 / ^3.0.1 |
| UI Primitives     | shadcn                      | CLI / Radix     |
| Icons             | lucide-react                | ^0.475.0        |
| Routing           | react-router-dom            | ^7.8.0          |
| Animation         | framer-motion               | ^12.23.12       |
| Scroll Detection  | react-intersection-observer | ^9.15.0         |

## 4. Arsitektur

Clean Architecture, 4 lapisan:

1. **Core** — API client (`tmdbClient.ts`), providers (`themeProvider.tsx`), utils (`cn.ts`).
2. **Data** — datasources, mappers, repositories, schemas (Zod).
3. **Domain** — entities, usecases, store (Zustand).
4. **Presentation** — components, hooks, pages.

Alur data: `UI/Hook → UseCase → Repository → RemoteSource → Zod Schema → TMDbClient → TMDB API`.

## 5. Fitur Fungsional

### 5.1 Beranda

- Baris horizontal per kategori: Trending, Now Playing, Popular, Top Rated, Upcoming.
- Kartu film dengan efek hover: elevasi + gradient overlay.

### 5.2 Eksplorasi

- Diakses dari tombol "Lihat Semua" pada tiap kategori Beranda.
- Grid asimetris (masonry).
- Transisi staggered fade-in saat render kartu.
- Infinite scroll: pemuatan halaman berikutnya saat scroll mencapai batas bawah (menggunakan `react-intersection-observer` + `useInfiniteQuery`).

### 5.3 Pencarian

- Overlay layar penuh dengan `backdrop-blur`.
- Panel dua kolom: kiri daftar hasil (judul + rating), kanan preview poster instan.
- Sumber data: endpoint `/search/movie`.

### 5.4 Detail Film

- Endpoint `/movie/{movie_id}`.
- Menampilkan genre, durasi, budget, revenue, status.
- Menampilkan film serupa dari endpoint `/movie/{movie_id}/similar`.

### 5.5 Watchlist

- Tambah/hapus film ke watchlist melalui Zustand store (`useMovieStore`).
- Status watchlist per film dicek melalui `isInWatchlist`.

### 5.6 Tema (Dark/Light)

- Toggle tema melalui `ThemeProvider`, tersimpan di localStorage.
- Efek transisi clip-path pada toggle.

## 6. Spesifikasi Visual

### 6.1 Palet Warna — "Cinematic Midnight & Electric Amber"

| Elemen       | Dark Mode | Light Mode |
| ------------ | --------- | ---------- |
| Background   | `#050505` | `#FAFAFA`  |
| Surface/Card | `#0F0F0F` | `#FFFFFF`  |
| Accent       | `#FFBF00` | `#D97706`  |

Aturan pemakaian aksen: warna amber hanya dipakai pada elemen interaktif (tombol watchlist, badge rating, border pencarian). Elemen non-interaktif tidak menggunakan warna aksen.

### 6.2 Tipografi

- Judul film: font serif.
- Data statistik/rating: font sans-serif.

### 6.3 Motion

- Pustaka: `framer-motion`.
- Efek: clip-path pada theme toggle, parallax zoom-in pada kartu film, staggered transition pada grid Eksplorasi.

### 6.4 Responsivitas

- Mobile-first.
- Grid kolom: 2 kolom (mobile) hingga 6 kolom (desktop).

## 7. Kontrak Data (DTO → Entity)

Endpoint TMDB yang dikonsumsi:

| Endpoint                    | Fungsi                     |
| --------------------------- | -------------------------- |
| `/trending/movie/day`       | Data Beranda — Trending    |
| `/movie/now_playing`        | Data Beranda — Now Playing |
| `/movie/popular`            | Data Beranda — Popular     |
| `/movie/top_rated`          | Data Beranda — Top Rated   |
| `/movie/upcoming`           | Data Beranda — Upcoming    |
| `/search/movie`             | Pencarian                  |
| `/movie/{movie_id}`         | Detail film                |
| `/movie/{movie_id}/similar` | Rekomendasi film serupa    |

Validasi respons: Zod schema (`MovieListResponseSchema`, `MovieDetailsResponseSchema`).
Transformasi ke entity internal: `mapToEntity()` (`src/data/mappers/movieMapper.ts`).

## 8. Non-Functional Requirements

- Validasi runtime pada seluruh respons API menggunakan Zod sebelum data masuk ke layer domain.
- Pemisahan strict antar layer: presentation tidak boleh memanggil datasource/API client secara langsung.
- Path alias `@/*` mengarah ke `src/*`.
- Environment variable `VITE_TMDB_READ_ACCESS_TOKEN` untuk autentikasi TMDB API.

## 9. Out of Scope

- Autentikasi pengguna (login/register).
- Backend/server custom di luar TMDB API.
- Persistensi watchlist ke database (state watchlist hanya di memori runtime, sesuai `useMovieStore`).
