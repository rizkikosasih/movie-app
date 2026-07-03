import type { MovieRepository } from '@/data/repositories/movieRepository';
import type { MovieDetail } from '../entities';

export class GetMovieDetailsUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(movieId: number): Promise<MovieDetail> {
    return this.repository.getDetails(movieId);
  }
}
