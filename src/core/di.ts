import { MovieRemoteSourceImpl } from '@/data/datasources/movieRemoteSourceImpl';
import { MovieRepositoryImpl } from '@/data/repositories/movieRepositoryImpl';
import { GetTrendingMoviesUseCase } from '@/domain/usecases/getTrendingMoviesUseCase';
import { GetNowPlayingMoviesUseCase } from '@/domain/usecases/getNowPlayingMoviesUseCase';
import { GetPopularMoviesUseCase } from '@/domain/usecases/getPopularMoviesUseCase';
import { GetTopRatedMoviesUseCase } from '@/domain/usecases/getTopRatedMoviesUseCase';
import { GetUpcomingMoviesUseCase } from '@/domain/usecases/getUpcomingMoviesUseCase';
import { SearchMoviesUseCase } from '@/domain/usecases/searchMoviesUseCase';
import { GetMovieDetailsUseCase } from '@/domain/usecases/getMovieDetailsUseCase';
import { GetSimilarMoviesUseCase } from '@/domain/usecases/getSimilarMoviesUseCase';
import { DiscoverMoviesUseCase } from '@/domain/usecases/discoverMoviesUseCase';
import { GetGenresUseCase } from '@/domain/usecases/getGenresUseCase';

const remoteSource = new MovieRemoteSourceImpl();
export const movieRepository = new MovieRepositoryImpl(remoteSource);

export const getTrendingMoviesUseCase = new GetTrendingMoviesUseCase(movieRepository);
export const getNowPlayingMoviesUseCase = new GetNowPlayingMoviesUseCase(movieRepository);
export const getPopularMoviesUseCase = new GetPopularMoviesUseCase(movieRepository);
export const getTopRatedMoviesUseCase = new GetTopRatedMoviesUseCase(movieRepository);
export const getUpcomingMoviesUseCase = new GetUpcomingMoviesUseCase(movieRepository);
export const searchMoviesUseCase = new SearchMoviesUseCase(movieRepository);
export const getMovieDetailsUseCase = new GetMovieDetailsUseCase(movieRepository);
export const getSimilarMoviesUseCase = new GetSimilarMoviesUseCase(movieRepository);
export const discoverMoviesUseCase = new DiscoverMoviesUseCase(movieRepository);
export const getGenresUseCase = new GetGenresUseCase(movieRepository);
