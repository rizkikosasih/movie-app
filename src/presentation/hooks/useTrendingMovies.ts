import { useQuery } from '@tanstack/react-query';
import { getTrendingMoviesUseCase } from '@/core/di';

export const useTrendingMovies = (page: number) => {
  return useQuery({
    queryKey: ['movies', 'trending', page],
    queryFn: () => getTrendingMoviesUseCase.execute(page)
  });
};
