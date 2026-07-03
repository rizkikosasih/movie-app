import { useQuery } from '@tanstack/react-query';
import { getUpcomingMoviesUseCase } from '@/core/di';

export const useUpcomingMovies = (page: number) => {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => getUpcomingMoviesUseCase.execute(page)
  });
};
