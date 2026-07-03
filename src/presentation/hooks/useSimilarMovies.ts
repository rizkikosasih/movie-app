import { useQuery } from '@tanstack/react-query';
import { getSimilarMoviesUseCase } from '@/core/di';

export const useSimilarMovies = (movieId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['movies', 'similar', movieId],
    queryFn: () => getSimilarMoviesUseCase.execute(movieId),
    enabled: enabled && !!movieId
  });
};
export default useSimilarMovies;
