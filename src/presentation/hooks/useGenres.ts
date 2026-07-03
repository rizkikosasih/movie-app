import { useQuery } from '@tanstack/react-query';
import { getGenresUseCase } from '@/core/di';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => getGenresUseCase.execute(),
    staleTime: 1000 * 60 * 60 * 24 // 24 hours
  });
};

export default useGenres;
