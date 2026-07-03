# AGENTS — Peran dan Tugas AI Agent

Pembagian peran mengikuti batas lapisan Clean Architecture pada blueprint. Setiap agent hanya boleh mengubah file dalam lingkup direktori yang ditentukan.

## 1. Architect Agent

**Lingkup:** `src/core/`, `tsconfig.json`, konfigurasi Vite/Tailwind.

**Tugas:**
- Inisialisasi struktur project dan path alias.
- Implementasi `tmdbClient.ts`, `themeProvider.tsx`, `cn.ts`.
- Menjaga konsistensi konfigurasi build antar environment.

**Batasan:** tidak mengimplementasikan logika bisnis atau komponen UI.

## 2. Data Layer Agent

**Lingkup:** `src/data/`.

**Tugas:**
- Implementasi Zod schema (`schemas/`).
- Implementasi datasource konkrit (`datasources/`).
- Implementasi repository konkrit (`repositories/`).
- Implementasi mapper DTO → entity (`mappers/`).

**Batasan:** tidak mengakses `src/presentation/`. Interaksi keluar hanya melalui interface yang didefinisikan di `src/data/repositories/*.ts` dan `src/data/datasources/*.ts`.

## 3. Domain Layer Agent

**Lingkup:** `src/domain/`.

**Tugas:**
- Implementasi usecase per fitur (`usecases/`).
- Implementasi store Zustand (`store/`).
- Definisi entity (`entities/`).

**Batasan:** usecase hanya bergantung pada interface `MovieRepository`, tidak pada implementasi konkrit repository atau datasource.

## 4. Presentation Agent

**Lingkup:** `src/presentation/`.

**Tugas:**
- Implementasi komponen UI (kartu film, overlay pencarian, grid, toggle tema).
- Implementasi custom hook yang mengonsumsi usecase melalui `@tanstack/react-query`.
- Implementasi halaman (Beranda, Eksplorasi, Pencarian, Detail).
- Implementasi motion/animasi sesuai spesifikasi PRD Section 6.3.

**Batasan:** tidak memanggil `TMDbClient` atau datasource secara langsung. Seluruh pengambilan data melalui usecase.

## 5. Visual Design Agent

**Lingkup:** konfigurasi Tailwind theme, token warna, tipografi.

**Tugas:**
- Menerapkan palet warna "Cinematic Midnight & Electric Amber" (PRD Section 6.1).
- Menerapkan aturan pemakaian warna aksen pada elemen interaktif.
- Menetapkan skala tipografi serif/sans-serif.
- Menetapkan breakpoint grid responsif (2–6 kolom).

**Batasan:** tidak mengubah logika data atau state management.

## 6. QA/Verification Agent

**Lingkup:** lintas layer, read-only terhadap kode.

**Tugas:**
- Verifikasi alur data sesuai diagram PRD Section 4 (Data Flow Diagram pada blueprint Section 10).
- Verifikasi tidak ada pelanggaran batas antar layer (contoh: presentation memanggil datasource langsung).
- Verifikasi validasi Zod dijalankan pada setiap respons API sebelum masuk ke domain layer.
- Verifikasi kesesuaian implementasi UI dengan spesifikasi visual PRD Section 6.

**Batasan:** tidak melakukan implementasi fitur baru, hanya identifikasi ketidaksesuaian.

## Aturan Kolaborasi Antar Agent

1. Urutan kerja mengikuti `INSTRUCTION.md`: Core → Data (contract) → Data (impl) → Domain → Presentation → Visual.
2. Agent tidak boleh melompati step tanpa hasil step sebelumnya disetujui.
3. Perubahan kontrak interface (`MovieRepository`, `MovieRemoteSource`) memerlukan koordinasi antara Data Layer Agent dan Domain Layer Agent sebelum implementasi berjalan.
4. QA/Verification Agent dijalankan setelah setiap step pada `INSTRUCTION.md` selesai, bukan hanya di akhir project.
