import { useQuery } from '@tanstack/react-query';
import { getMovieDetailsUseCase } from '@/core/di';

export const useMovieDetails = (movieId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['movies', 'details', movieId],
    queryFn: () => getMovieDetailsUseCase.execute(movieId),
    enabled: enabled && !!movieId
  });
};
export default useMovieDetails;
