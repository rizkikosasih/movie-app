import type { MovieRepository } from '@/data/repositories/movieRepository';
import type { PaginatedMovies } from '../entities';

export class SearchMoviesUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(query: string, page: number): Promise<PaginatedMovies> {
    return this.repository.search(query, page);
  }
}
