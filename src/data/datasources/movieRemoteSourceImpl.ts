import { tmdbFetch } from '@/core/api/tmdbClient';
import type { MovieRemoteSource } from './movieRemoteSource';
import {
  TMDBMovieListResponseSchema,
  TMDBMovieDetailResponseSchema,
  TMDBGenreListResponseSchema
} from '../schemas/movieSchema';
import type {
  TMDBMovieListResponseDto,
  TMDBMovieDetailResponseDto,
  TMDBGenreListResponseDto,
  DiscoverMoviesParams
} from '../schemas/movieSchema';

export class MovieRemoteSourceImpl implements MovieRemoteSource {
  async getTrendingMovies(page: number): Promise<TMDBMovieListResponseDto> {
    const rawData = await tmdbFetch(`/trending/movie/day?page=${page}`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async getNowPlayingMovies(page: number): Promise<TMDBMovieListResponseDto> {
    const rawData = await tmdbFetch(`/movie/now_playing?page=${page}`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async getPopularMovies(page: number): Promise<TMDBMovieListResponseDto> {
    const rawData = await tmdbFetch(`/movie/popular?page=${page}`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async getTopRatedMovies(page: number): Promise<TMDBMovieListResponseDto> {
    const rawData = await tmdbFetch(`/movie/top_rated?page=${page}`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async getUpcomingMovies(page: number): Promise<TMDBMovieListResponseDto> {
    const rawData = await tmdbFetch(`/movie/upcoming?page=${page}`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async searchMovies(query: string, page: number): Promise<TMDBMovieListResponseDto> {
    const encodedQuery = encodeURIComponent(query);
    const rawData = await tmdbFetch(`/search/movie?query=${encodedQuery}&page=${page}`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async getMovieDetails(movieId: number): Promise<TMDBMovieDetailResponseDto> {
    const rawData = await tmdbFetch(`/movie/${movieId}`);
    return TMDBMovieDetailResponseSchema.parse(rawData);
  }

  async getSimilarMovies(movieId: number): Promise<TMDBMovieListResponseDto> {
    const rawData = await tmdbFetch(`/movie/${movieId}/similar`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async discoverMovies(
    params: DiscoverMoviesParams,
    page: number
  ): Promise<TMDBMovieListResponseDto> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...(params.with_genres && { with_genres: params.with_genres }),
      ...(params.sort_by && { sort_by: params.sort_by }),
      ...(params.release_date_gte && { 'release_date.gte': params.release_date_gte }),
      ...(params.release_date_lte && { 'release_date.lte': params.release_date_lte }),
      ...(params.vote_average_gte && {
        'vote_average.gte': params.vote_average_gte.toString()
      }),
      ...(params.vote_average_lte && {
        'vote_average.lte': params.vote_average_lte.toString()
      })
    });

    const rawData = await tmdbFetch(`/discover/movie?${queryParams.toString()}`);
    return TMDBMovieListResponseSchema.parse(rawData);
  }

  async getGenres(): Promise<TMDBGenreListResponseDto> {
    const rawData = await tmdbFetch('/genre/movie/list');
    return TMDBGenreListResponseSchema.parse(rawData);
  }
}
