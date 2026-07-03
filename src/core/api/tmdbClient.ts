const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const TMDB_POSTER_SIZE = 'w500';
export const TMDB_BACKDROP_SIZE = 'w1280';

const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const tmdbFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${TMDB_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers);
  if (token && token !== 'YOUR_TMDB_READ_ACCESS_TOKEN_HERE') {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Accept', 'application/json');

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`TMDB API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
