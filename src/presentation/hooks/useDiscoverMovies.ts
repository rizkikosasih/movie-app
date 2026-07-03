import { useInfiniteQuery } from '@tanstack/react-query';
import { discoverMoviesUseCase } from '@/core/di';
import type { DiscoverMoviesParams } from '@/data/schemas/movieSchema';

export const useDiscoverMovies = (
  params: DiscoverMoviesParams,
  enabled: boolean = true
) => {
  return useInfiniteQuery({
    queryKey: ['movies', 'discover', params],
    queryFn: ({ pageParam = 1 }) => discoverMoviesUseCase.execute(params, pageParam),
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

export default useDiscoverMovies;

