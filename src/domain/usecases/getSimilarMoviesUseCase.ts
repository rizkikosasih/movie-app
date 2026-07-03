import type { MovieRepository } from '@/data/repositories/movieRepository';
import type { Movie } from '../entities';

export class GetSimilarMoviesUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(movieId: number): Promise<Movie[]> {
    return this.repository.getSimilar(movieId);
  }
}
