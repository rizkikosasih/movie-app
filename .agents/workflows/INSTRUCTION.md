# INSTRUCTION — Tahapan Implementasi

Aturan eksekusi: setiap step dikerjakan berurutan. Step berikutnya tidak dimulai tanpa persetujuan hasil step sebelumnya.

## Step 0 — Inisialisasi Project

1. Buat project Vite dengan template React + TypeScript.
2. Install dependency sesuai tabel tech stack pada PRD Section 3.
3. Konfigurasi `tsconfig.json` dengan path alias `@/*` → `src/*`.
4. Konfigurasi Tailwind CSS v4 dan integrasi shadcn CLI.
5. Buat file `.env` dengan variabel `VITE_TMDB_READ_ACCESS_TOKEN`.

Output step ini: project dapat dijalankan (`npm run dev`) tanpa error, tanpa fitur.

## Step 1 — Lapisan Core

1. Buat `src/core/api/tmdbClient.ts`.
2. Buat `src/core/utils/cn.ts`.
3. Buat `src/core/providers/themeProvider.tsx`.

Output step ini: klien API dan sistem tema berfungsi independen dari fitur film.

## Step 2 — Lapisan Data (Schema & Contract)

1. Buat `src/data/schemas/movieSchema.ts` (Zod schema).
2. Buat `src/domain/entities/index.ts` (interface entity).
3. Buat `src/data/mappers/movieMapper.ts`.
4. Buat kontrak `src/data/datasources/movieRemoteSource.ts`.
5. Buat kontrak `src/data/repositories/movieRepository.ts`.

Output step ini: seluruh kontrak tipe data dan skema validasi tersedia, belum ada implementasi konkrit.

## Step 3 — Lapisan Data (Implementasi Konkrit)

1. Buat `src/data/datasources/movieRemoteSourceImpl.ts`.
2. Buat `src/data/repositories/movieRepositoryImpl.ts`.

Output step ini: pemanggilan API TMDB menghasilkan entity yang tervalidasi Zod.

## Step 4 — Lapisan Domain

1. Buat seluruh usecase pada `src/domain/usecases/` (8 file sesuai daftar endpoint).
2. Buat `src/domain/store/useMovieStore.ts`.

Output step ini: logika bisnis watchlist dan pengambilan data per kategori tersedia untuk dikonsumsi presentation layer.

## Step 5 — Presentation: Komponen Dasar

1. Buat `src/presentation/components/themeToggle.tsx`.
2. Buat `src/presentation/components/ui/spinner.tsx`.
3. Setup shadcn primitive tambahan sesuai kebutuhan komponen kartu film dan overlay pencarian.

## Step 6 — Presentation: Hook Data

1. Buat `src/presentation/hooks/useTrendingMovies.ts` sebagai referensi pola.
2. Duplikasi pola untuk kategori lain (Now Playing, Popular, Top Rated, Upcoming) sesuai kebutuhan halaman Beranda.

## Step 7 — Halaman Beranda

1. Implementasi baris horizontal per kategori.
2. Implementasi kartu film dengan efek hover (elevasi + gradient overlay).
3. Integrasi routing menuju halaman Eksplorasi via tombol "Lihat Semua".

## Step 8 — Halaman Eksplorasi

1. Implementasi grid asimetris (masonry).
2. Implementasi infinite scroll menggunakan `react-intersection-observer` dan `useInfiniteQuery`.
3. Implementasi staggered fade-in pada kartu grid menggunakan `framer-motion`.

## Step 9 — Pencarian

1. Implementasi overlay pencarian full-screen dengan `backdrop-blur`.
2. Implementasi panel dua kolom (daftar hasil teks + preview poster).
3. Integrasi endpoint `/search/movie` melalui usecase `SearchMoviesUseCase`.

## Step 10 — Halaman Detail Film

1. Implementasi tampilan detail (genre, durasi, budget, revenue, status).
2. Integrasi film serupa dari `GetSimilarMoviesUseCase`.
3. Integrasi tombol tambah/hapus watchlist ke `useMovieStore`.

## Step 11 — Tema Visual & Palet Warna

1. Terapkan token warna sesuai PRD Section 6.1 pada konfigurasi Tailwind.
2. Terapkan aturan pemakaian warna aksen: hanya pada elemen interaktif.
3. Terapkan tipografi serif untuk judul film, sans-serif untuk data statistik.

## Step 12 — Responsivitas

1. Terapkan grid kolom 2 (mobile) hingga 6 (desktop) pada halaman Beranda dan Eksplorasi.
2. Verifikasi breakpoint pada seluruh halaman.

## Step 13 — Verifikasi Alur Data

1. Verifikasi setiap pemanggilan API melewati alur: `UI/Hook → UseCase → Repository → RemoteSource → Zod Schema → TMDbClient`.
2. Verifikasi tidak ada pemanggilan langsung dari presentation layer ke `TMDbClient`.
