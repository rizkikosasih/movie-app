import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
  return (
    <div className="space-y-4 py-4">
      {/* Row Header */}
      <div className="flex items-center justify-between px-6">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <Link
          to={`/explore/${category}`}
          className="flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Row Content */}
      <div className="relative">
        {isLoading ? (
          <div className="flex h-[280px] w-full items-center justify-center">
            <Spinner size="md" />
          </div>
        ) : movies.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-none">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
            ))}
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
