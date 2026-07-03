import type { MovieRepository } from '@/data/repositories/movieRepository';
import type { PaginatedMovies } from '../entities';

export class GetPopularMoviesUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(page: number): Promise<PaginatedMovies> {
    return this.repository.getPopular(page);
  }
}
