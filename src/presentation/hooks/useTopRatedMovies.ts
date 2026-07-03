import { useQuery } from '@tanstack/react-query';
import { getTopRatedMoviesUseCase } from '@/core/di';

export const useTopRatedMovies = (page: number) => {
  return useQuery({
    queryKey: ['movies', 'top_rated', page],
    queryFn: () => getTopRatedMoviesUseCase.execute(page)
  });
};
