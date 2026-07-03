export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  overview: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
  genres: string[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
}

export interface PaginatedMovies {
  page: number;
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}

export * from './genre';
