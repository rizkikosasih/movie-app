import { useQuery } from '@tanstack/react-query';
import { searchMoviesUseCase } from '@/core/di';

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => searchMoviesUseCase.execute(query, page),
    enabled: query.trim().length > 1
  });
};
export default useSearchMovies;
