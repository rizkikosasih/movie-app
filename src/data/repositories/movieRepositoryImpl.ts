import type { MovieRepository } from './movieRepository';
import type { MovieRemoteSource } from '../datasources/movieRemoteSource';
import { mapToMovie, mapToMovieDetail } from '../mappers/movieMapper';
import type { Movie, MovieDetail, PaginatedMovies } from '@/domain/entities';

export class MovieRepositoryImpl implements MovieRepository {
  private remoteSource: MovieRemoteSource;

  constructor(remoteSource: MovieRemoteSource) {
    this.remoteSource = remoteSource;
  }

  async getTrending(page: number): Promise<PaginatedMovies> {
    const dto = await this.remoteSource.getTrendingMovies(page);
    return {
      page: dto.page,
      movies: dto.results.map(mapToMovie),
      totalPages: dto.total_pages,
      totalResults: dto.total_results
    };
  }

  async getNowPlaying(page: number): Promise<PaginatedMovies> {
    const dto = await this.remoteSource.getNowPlayingMovies(page);
    return {
      page: dto.page,
      movies: dto.results.map(mapToMovie),
      totalPages: dto.total_pages,
      totalResults: dto.total_results
    };
  }

  async getPopular(page: number): Promise<PaginatedMovies> {
    const dto = await this.remoteSource.getPopularMovies(page);
    return {
      page: dto.page,
      movies: dto.results.map(mapToMovie),
      totalPages: dto.total_pages,
      totalResults: dto.total_results
    };
  }

  async getTopRated(page: number): Promise<PaginatedMovies> {
    const dto = await this.remoteSource.getTopRatedMovies(page);
    return {
      page: dto.page,
      movies: dto.results.map(mapToMovie),
      totalPages: dto.total_pages,
      totalResults: dto.total_results
    };
  }

  async getUpcoming(page: number): Promise<PaginatedMovies> {
    const dto = await this.remoteSource.getUpcomingMovies(page);
    return {
      page: dto.page,
      movies: dto.results.map(mapToMovie),
      totalPages: dto.total_pages,
      totalResults: dto.total_results
    };
  }

  async search(query: string, page: number): Promise<PaginatedMovies> {
    const dto = await this.remoteSource.searchMovies(query, page);
    return {
      page: dto.page,
      movies: dto.results.map(mapToMovie),
      totalPages: dto.total_pages,
      totalResults: dto.total_results
    };
  }

  async getDetails(movieId: number): Promise<MovieDetail> {
    const dto = await this.remoteSource.getMovieDetails(movieId);
    return mapToMovieDetail(dto);
  }

  async getSimilar(movieId: number): Promise<Movie[]> {
    const dto = await this.remoteSource.getSimilarMovies(movieId);
    return dto.results.map(mapToMovie);
  }
}
