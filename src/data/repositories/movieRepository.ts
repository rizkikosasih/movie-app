import type { Movie, MovieDetail, PaginatedMovies, Genre } from '@/domain/entities';
import type { DiscoverMoviesParams } from '../schemas/movieSchema';

export interface MovieRepository {
  getTrending(page: number): Promise<PaginatedMovies>;
  getNowPlaying(page: number): Promise<PaginatedMovies>;
  getPopular(page: number): Promise<PaginatedMovies>;
  getTopRated(page: number): Promise<PaginatedMovies>;
  getUpcoming(page: number): Promise<PaginatedMovies>;
  search(query: string, page: number): Promise<PaginatedMovies>;
  getDetails(movieId: number): Promise<MovieDetail>;
  getSimilar(movieId: number): Promise<Movie[]>;
  discover(params: DiscoverMoviesParams, page: number): Promise<PaginatedMovies>;
  getGenres(): Promise<Genre[]>;
}
