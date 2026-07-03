import { useQuery } from '@tanstack/react-query';
import { getNowPlayingMoviesUseCase } from '@/core/di';

export const useNowPlayingMovies = (page: number) => {
  return useQuery({
    queryKey: ['movies', 'now_playing', page],
    queryFn: () => getNowPlayingMoviesUseCase.execute(page)
  });
};
