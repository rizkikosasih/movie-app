import {
  TMDB_IMAGE_BASE_URL,
  TMDB_POSTER_SIZE,
  TMDB_BACKDROP_SIZE
} from '@/core/api/tmdbClient';
import type { TMDBMovieDto, TMDBMovieDetailResponseDto } from '../schemas/movieSchema';
import type { Movie, MovieDetail } from '@/domain/entities';

const getFullImageUrl = (path: string | null | undefined, size: string): string => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const mapToMovie = (dto: TMDBMovieDto): Movie => {
  return {
    id: dto.id,
    title: dto.title,
    posterUrl: getFullImageUrl(dto.poster_path, TMDB_POSTER_SIZE),
    backdropUrl: getFullImageUrl(dto.backdrop_path, TMDB_BACKDROP_SIZE),
    releaseDate: dto.release_date || '',
    voteAverage: dto.vote_average,
    voteCount: dto.vote_count || 0,
    overview: dto.overview || ''
  };
};

export const mapToMovieDetail = (dto: TMDBMovieDetailResponseDto): MovieDetail => {
  return {
    id: dto.id,
    title: dto.title,
    posterUrl: getFullImageUrl(dto.poster_path, TMDB_POSTER_SIZE),
    backdropUrl: getFullImageUrl(dto.backdrop_path, TMDB_BACKDROP_SIZE),
    releaseDate: dto.release_date || '',
    voteAverage: dto.vote_average,
    overview: dto.overview || '',
    genres: dto.genres ? dto.genres.map((g) => g.name) : [],
    runtime: dto.runtime || 0,
    budget: dto.budget || 0,
    revenue: dto.revenue || 0,
    status: dto.status || ''
  };
};
