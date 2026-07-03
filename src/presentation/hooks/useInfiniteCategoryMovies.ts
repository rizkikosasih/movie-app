import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getTrendingMoviesUseCase,
  getNowPlayingMoviesUseCase,
  getPopularMoviesUseCase,
  getTopRatedMoviesUseCase,
  getUpcomingMoviesUseCase
} from '@/core/di';

export const useInfiniteCategoryMovies = (category: string, enabled: boolean = true) => {
  const getUseCase = () => {
    switch (category) {
      case 'trending':
        return getTrendingMoviesUseCase;
      case 'now_playing':
        return getNowPlayingMoviesUseCase;
      case 'popular':
        return getPopularMoviesUseCase;
      case 'top_rated':
        return getTopRatedMoviesUseCase;
      case 'upcoming':
        return getUpcomingMoviesUseCase;
      default:
        return getTrendingMoviesUseCase;
    }
  };

  return useInfiniteQuery({
    queryKey: ['movies', 'infinite', category],
    queryFn: ({ pageParam = 1 }) => getUseCase().execute(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled
  });
};

export default useInfiniteCategoryMovies;
