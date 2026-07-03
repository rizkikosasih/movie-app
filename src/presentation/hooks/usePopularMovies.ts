import { useQuery } from '@tanstack/react-query';
import { getPopularMoviesUseCase } from '@/core/di';

export const usePopularMovies = (page: number) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopularMoviesUseCase.execute(page)
  });
};
