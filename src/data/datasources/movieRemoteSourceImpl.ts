import { tmdbFetch } from '@/core/api/tmdbClient';
import type { MovieRemoteSource } from './movieRemoteSource';
import {
  TMDBMovieListResponseSchema,
  TMDBMovieDetailResponseSchema
} from '../schemas/movieSchema';
import type {
  TMDBMovieListResponseDto,
  TMDBMovieDetailResponseDto
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
}
