import { create } from 'zustand';
import type { Movie } from '../entities';

interface MovieStoreState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStoreState>((set, get) => ({
  watchlist: [],
  addToWatchlist: (movie) => {
    const { watchlist } = get();
    if (!watchlist.some((m) => m.id === movie.id)) {
      set({ watchlist: [...watchlist, movie] });
    }
  },
  removeFromWatchlist: (movieId) => {
    const { watchlist } = get();
    set({ watchlist: watchlist.filter((m) => m.id !== movieId) });
  },
  isInWatchlist: (movieId) => {
    return get().watchlist.some((m) => m.id === movieId);
  }
}));
