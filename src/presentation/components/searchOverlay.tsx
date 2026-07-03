import { useState, useEffect } from 'react';
import { useUiStore } from '@/domain/store/useUiStore';
import { X, Search, Star, Film } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useSearchMovies } from '../hooks/useSearchMovies';
import type { Movie } from '@/domain/entities';
import { Spinner } from './ui/spinner';
import { AnimatePresence, motion } from 'framer-motion';

interface SearchOverlayProps {
  onSelectMovie: (movieId: number) => void;
}

export const SearchOverlay = ({ onSelectMovie }: SearchOverlayProps) => {
  const { isSearchOpen, setIsSearchOpen } = useUiStore();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading } = useSearchMovies(debouncedQuery, 1);
  const results = data?.movies || [];

  // Reset hovered movie when search results change
  useEffect(() => {
    if (results.length > 0) {
      setHoveredMovie(results[0]);
    } else {
      setHoveredMovie(null);
    }
  }, [results]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-lg px-6 py-6"
      >
        {/* Search Header */}
        <div className="mx-auto max-w-4xl w-full flex items-center justify-between gap-4 pb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            <Input
              type="text"
              placeholder="Cari film..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 h-12 w-full bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-xl focus-visible:ring-amber-500 focus-visible:border-amber-500 text-lg"
              autoFocus
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsSearchOpen(false);
              setQuery('');
            }}
            className="h-12 w-12 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Search Body (Two Column Layout) */}
        <div className="mx-auto max-w-4xl w-full flex-1 grid grid-cols-1 md:grid-cols-5 gap-8 overflow-hidden pt-4">
          {/* Left Column: Results List */}
          <div className="md:col-span-3 flex flex-col overflow-y-auto pr-2 scrollbar-none h-[75vh]">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Spinner size="md" />
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((movie) => (
                  <div
                    key={movie.id}
                    onMouseEnter={() => setHoveredMovie(movie)}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuery('');
                      onSelectMovie(movie.id);
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                      hoveredMovie?.id === movie.id
                        ? 'bg-zinc-900 border-amber-500/30 text-amber-400'
                        : 'border-transparent text-zinc-300 hover:bg-zinc-900/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Film className="h-4 w-4 shrink-0 opacity-70" />
                      <span className="font-medium text-base line-clamp-1">
                        {movie.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-semibold shrink-0">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
                      <span>{movie.voteAverage.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : query.trim().length > 1 ? (
              <div className="text-zinc-500 text-center py-12">
                Tidak ada hasil ditemukan untuk "{debouncedQuery}"
              </div>
            ) : (
              <div className="text-zinc-500 text-center py-12">
                Ketik minimal 2 karakter untuk mencari film...
              </div>
            )}
          </div>

          {/* Right Column: Instant Poster Preview */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden p-6 h-[75vh]">
            {hoveredMovie ? (
              <motion.div
                key={hoveredMovie.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                {hoveredMovie.posterUrl ? (
                  <img
                    src={hoveredMovie.posterUrl}
                    alt={hoveredMovie.title}
                    className="w-full max-w-[220px] aspect-[2/3] object-cover rounded-xl shadow-2xl border border-zinc-800"
                  />
                ) : (
                  <div className="w-[220px] aspect-[2/3] flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500">
                    No Poster Image
                  </div>
                )}
                <div>
                  <h4 className="font-serif text-lg font-bold text-zinc-100">
                    {hoveredMovie.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {hoveredMovie.releaseDate
                      ? new Date(hoveredMovie.releaseDate).getFullYear()
                      : 'N/A'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="text-zinc-650 text-sm">
                Arahkan kursor ke film untuk melihat pratinjau
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchOverlay;
