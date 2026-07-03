import type {
  TMDBMovieListResponseDto,
  TMDBMovieDetailResponseDto
} from '../schemas/movieSchema';

export interface MovieRemoteSource {
  getTrendingMovies(page: number): Promise<TMDBMovieListResponseDto>;
  getNowPlayingMovies(page: number): Promise<TMDBMovieListResponseDto>;
  getPopularMovies(page: number): Promise<TMDBMovieListResponseDto>;
  getTopRatedMovies(page: number): Promise<TMDBMovieListResponseDto>;
  getUpcomingMovies(page: number): Promise<TMDBMovieListResponseDto>;
  searchMovies(query: string, page: number): Promise<TMDBMovieListResponseDto>;
  getMovieDetails(movieId: number): Promise<TMDBMovieDetailResponseDto>;
  getSimilarMovies(movieId: number): Promise<TMDBMovieListResponseDto>;
}
