import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import type { Movie } from '@/domain/entities';
import MovieCard from './movieCard';
import { Spinner } from './ui/spinner';

interface MovieRowProps {
  title: string;
  category: string;
  movies?: Movie[];
  isLoading: boolean;
  onSelectMovie: (movieId: number) => void;
}

export const MovieRow = ({
  title,
  category,
  movies = [],
  isLoading,
  onSelectMovie
}: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (isDragging) {
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !rowRef.current) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll multiplier
    if (Math.abs(x - startX) > 5) {
      setIsDragging(true);
    }
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="space-y-4 py-4">
      {/* Row Header */}
      <div className="flex items-center justify-between px-6">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        {category !== 'watchlist' && category !== 'similar' && (
          <Link
            to={`/explore/${category}`}
            className="flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Row Content */}
      <div className="relative">
        {isLoading ? (
          <div className="flex h-[280px] w-full items-center justify-center">
            <Spinner size="md" />
          </div>
        ) : movies.length > 0 ? (
          <div
            ref={rowRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-none select-none cursor-grab active:cursor-grabbing"
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={(id) => !isDragging && onSelectMovie(id)}
              />
            ))}

            {/* "Lihat Semua" / View More Card at the end */}
            {category !== 'watchlist' && category !== 'similar' && (
              <Link
                to={`/explore/${category}`}
                className="flex flex-col items-center justify-center bg-zinc-900/40 dark:bg-zinc-900/20 hover:bg-zinc-900/80 dark:hover:bg-zinc-900/40 border border-dashed border-zinc-200/20 dark:border-zinc-800/50 rounded-xl w-[150px] sm:w-[180px] md:w-[200px] shrink-0 aspect-2/3 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2 text-zinc-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  <ArrowRight className="h-8 w-8 group-hover:translate-x-1.5 transition-transform duration-300" />
                  <span className="font-serif font-bold text-sm">Lihat Semua</span>
                </div>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex h-[280px] w-full items-center justify-center text-zinc-500">
            Tidak ada film ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
