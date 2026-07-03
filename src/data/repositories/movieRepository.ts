import type { Movie, MovieDetail, PaginatedMovies } from '@/domain/entities';

export interface MovieRepository {
  getTrending(page: number): Promise<PaginatedMovies>;
  getNowPlaying(page: number): Promise<PaginatedMovies>;
  getPopular(page: number): Promise<PaginatedMovies>;
  getTopRated(page: number): Promise<PaginatedMovies>;
  getUpcoming(page: number): Promise<PaginatedMovies>;
  search(query: string, page: number): Promise<PaginatedMovies>;
  getDetails(movieId: number): Promise<MovieDetail>;
  getSimilar(movieId: number): Promise<Movie[]>;
}
