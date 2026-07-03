import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import { Spinner } from './ui/spinner';
import { Star, Play } from 'lucide-react';
import { Button } from './ui/button';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerProps {
  onSelectMovie: (movieId: number) => void;
}

export const Banner = ({ onSelectMovie }: BannerProps) => {
  const { data, isLoading } = useTrendingMovies(1);
  const movies = data?.movies.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="flex h-[400px] md:h-[500px] w-full items-center justify-center bg-zinc-950">
        <Spinner size="lg" />
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <div className="w-full relative bg-zinc-950">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-[400px] md:h-[500px] w-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative h-full w-full overflow-hidden">
            {/* Backdrop Image */}
            <div className="absolute inset-0 bg-zinc-900">
              {movie.backdropUrl ? (
                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover object-center transform scale-105"
                />
              ) : (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover object-center"
                />
              )}
              {/* Dark Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
            </div>

            {/* Content Info overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto max-w-7xl w-full px-6 md:px-12 flex flex-col items-start gap-4">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 rounded-md bg-amber-500 text-black px-2.5 py-1 text-xs font-bold shadow-md">
                  <Star className="h-3.5 w-3.5 fill-black text-black" />
                  <span>{movie.voteAverage.toFixed(1)}</span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl drop-shadow-lg">
                  {movie.title}
                </h2>

                {/* Overview Description */}
                <p className="text-zinc-300 text-xs md:text-sm max-w-xl line-clamp-3 leading-relaxed drop-shadow-md">
                  {movie.overview}
                </p>

                {/* Action CTA */}
                <div className="mt-2 flex items-center gap-3">
                  <Button
                    onClick={() => onSelectMovie(movie.id)}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2 px-5 py-2.5 rounded-lg shadow-lg active:scale-95 transition-all border-none"
                  >
                    <Play className="h-4 w-4 fill-black text-black" />
                    <span>Lihat Detail</span>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
