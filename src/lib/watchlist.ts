import { type Movie } from "@/lib/tmdb";

const WATCHLIST_KEY = "cineverse-watchlist";

export const getWatchlist = (): Movie[] => {
  try {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const isInWatchlist = (movieId: number): boolean => {
  return getWatchlist().some((m) => m.id === movieId);
};

export const toggleWatchlist = (movie: Movie): boolean => {
  const list = getWatchlist();
  const exists = list.some((m) => m.id === movie.id);
  const updated = exists ? list.filter((m) => m.id !== movie.id) : [...list, movie];
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("watchlist-updated"));
  return !exists; // returns true if added
};
