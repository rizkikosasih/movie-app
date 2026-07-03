import type { MovieRepository } from '@/data/repositories/movieRepository';
import type { Genre } from '../entities';

export class GetGenresUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Genre[]> {
    return this.repository.getGenres();
  }
}
