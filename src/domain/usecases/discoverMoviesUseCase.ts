import type { MovieRepository } from '@/data/repositories/movieRepository';
import type { DiscoverMoviesParams } from '@/data/schemas/movieSchema';
import type { PaginatedMovies } from '../entities';

export class DiscoverMoviesUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(params: DiscoverMoviesParams, page: number): Promise<PaginatedMovies> {
    return this.repository.discover(params, page);
  }
}
