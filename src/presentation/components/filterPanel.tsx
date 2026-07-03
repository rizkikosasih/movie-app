import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, RotateCcw, Star, ChevronDown } from 'lucide-react';
import { useGenres } from '../hooks/useGenres';
import type { DiscoverMoviesParams } from '@/data/schemas/movieSchema';
import { Button } from './ui/button';
import { cn } from '@/core/utils/cn';

interface FilterPanelProps {
  activeParams: DiscoverMoviesParams;
  onFilterChange: (params: DiscoverMoviesParams) => void;
  onReset: () => void;
}

export const FilterPanel = ({
  activeParams,
  onFilterChange,
  onReset
}: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: genres = [], isLoading: isLoadingGenres } = useGenres();

  // Parse active genres from comma/pipe-separated string
  const activeGenreIds = activeParams.with_genres
    ? activeParams.with_genres.split('|').map(Number)
    : [];

  const handleGenreToggle = (genreId: number) => {
    let newGenreIds: number[];
    if (activeGenreIds.includes(genreId)) {
      newGenreIds = activeGenreIds.filter((id) => id !== genreId);
    } else {
      newGenreIds = [...activeGenreIds, genreId];
    }

    onFilterChange({
      ...activeParams,
      with_genres: newGenreIds.length > 0 ? newGenreIds.join('|') : undefined
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({
      ...activeParams,
      sort_by: sortBy || undefined
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...activeParams,
      vote_average_gte: rating > 0 ? rating : undefined
    });
  };

  const handleYearChange = (year: string) => {
    if (!year) {
      onFilterChange({
        ...activeParams,
        release_date_gte: undefined,
        release_date_lte: undefined
      });
      return;
    }

    // Set range for the entire selected year (e.g. 2026-01-01 to 2026-12-31)
    onFilterChange({
      ...activeParams,
      release_date_gte: `${year}-01-01`,
      release_date_lte: `${year}-12-31`
    });
  };

  // Extract active year if set
  const activeYear = activeParams.release_date_gte
    ? activeParams.release_date_gte.substring(0, 4)
    : '';

  // Generate years list (from 2026 down to 2000)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  const hasActiveFilters = Object.values(activeParams).some((val) => val !== undefined);

  return (
    <div className="w-full bg-zinc-950/40 dark:bg-zinc-950/20 border border-zinc-200/20 dark:border-zinc-800/40 rounded-2xl p-4 backdrop-blur-md space-y-4">
      {/* Header Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 border border-zinc-200/30 dark:border-zinc-800/30 text-zinc-850 dark:text-zinc-100 transition-all duration-200 focus:outline-none"
        >
          <SlidersHorizontal
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              isOpen && 'text-amber-500 dark:text-amber-400 rotate-90'
            )}
          />
          <span>Filter Lanjutan</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200 opacity-60',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Quick controls shown when collapsed */}
        {!isOpen && (
          <div className="flex flex-wrap items-center gap-3">
            {activeGenreIds.length > 0 && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {activeGenreIds.length} Genre Terpilih
              </span>
            )}
            {activeParams.vote_average_gte !== undefined && (
              <span className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-lg">
                <Star className="h-3 w-3 fill-current" />
                Rating {activeParams.vote_average_gte}+
              </span>
            )}
            {activeYear && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-lg">
                Tahun {activeYear}
              </span>
            )}
          </div>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-zinc-550 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filter
          </Button>
        )}
      </div>

      {/* Expandable Advanced Filters Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden space-y-5 pt-2 border-t border-zinc-200/10 dark:border-zinc-800/20"
          >
            {/* Grid of sorting & numeric filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sort By Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Urutkan Berdasarkan
                </label>
                <select
                  value={activeParams.sort_by || 'popularity.desc'}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="h-10 px-3 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/30 dark:border-zinc-800/30 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                >
                  <option value="popularity.desc">Terpopuler</option>
                  <option value="vote_average.desc">Rating Tertinggi</option>
                  <option value="release_date.desc">Terbaru</option>
                  <option value="vote_count.desc">Ulasan Terbanyak</option>
                </select>
              </div>

              {/* Release Year Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Tahun Rilis
                </label>
                <select
                  value={activeYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="h-10 px-3 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/30 dark:border-zinc-800/30 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                >
                  <option value="">Semua Tahun</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Range Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Rating Minimum
                  </label>
                  <span className="flex items-center gap-1 text-sm font-bold text-amber-500 dark:text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {activeParams.vote_average_gte || '0'}+
                  </span>
                </div>
                <div className="flex items-center gap-4 h-10">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={activeParams.vote_average_gte || 0}
                    onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
                    className="flex-1 accent-amber-500 dark:accent-amber-400 cursor-pointer bg-zinc-250 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Genres Selection (Toggles) */}
            <div className="flex flex-col gap-2 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Pilih Genre (Klik untuk memilih lebih dari satu)
              </label>

              {isLoadingGenres ? (
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-900 animate-pulse border border-zinc-200/10 dark:border-zinc-800/10"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {genres.map((genre) => {
                    const isActive = activeGenreIds.includes(genre.id);
                    return (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreToggle(genre.id)}
                        className={cn(
                          'px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 select-none cursor-pointer focus:outline-none',
                          isActive
                            ? 'bg-amber-500/15 border-amber-500 text-amber-500 dark:bg-amber-400/10 dark:border-amber-400 dark:text-amber-400 shadow-md shadow-amber-500/5'
                            : 'bg-zinc-100 hover:bg-zinc-200/70 border-zinc-200/50 dark:bg-zinc-900/60 dark:hover:bg-zinc-900/90 dark:border-zinc-800/40 text-zinc-650 dark:text-zinc-350'
                        )}
                      >
                        {genre.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
