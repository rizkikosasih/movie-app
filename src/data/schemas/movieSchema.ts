import { z } from 'zod';

export const TMDBMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  release_date: z.string().optional().default(''),
  vote_average: z.number(),
  vote_count: z.number().optional().default(0),
  overview: z.string().optional().default('')
});

export const TMDBMovieListResponseSchema = z.object({
  page: z.number(),
  results: z.array(TMDBMovieSchema),
  total_pages: z.number(),
  total_results: z.number()
});

export const TMDBGenreSchema = z.object({
  id: z.number(),
  name: z.string()
});

export const TMDBMovieDetailResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  release_date: z.string().optional().default(''),
  vote_average: z.number(),
  overview: z.string().optional().default(''),
  genres: z.array(TMDBGenreSchema).optional().default([]),
  runtime: z.number().nullable().optional().default(0),
  budget: z.number().optional().default(0),
  revenue: z.number().optional().default(0),
  status: z.string().optional().default('')
});

export type TMDBMovieDto = z.infer<typeof TMDBMovieSchema>;
export type TMDBMovieListResponseDto = z.infer<typeof TMDBMovieListResponseSchema>;
export type TMDBMovieDetailResponseDto = z.infer<typeof TMDBMovieDetailResponseSchema>;
