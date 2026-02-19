import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Movie, getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../services/tmdbApi';

interface MovieState {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  loading: boolean;
  error: string | null;
}

type MovieAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TRENDING'; payload: Movie[] }
  | { type: 'SET_POPULAR'; payload: Movie[] }
  | { type: 'SET_TOP_RATED'; payload: Movie[] }
  | { type: 'SET_UPCOMING'; payload: Movie[] };

const initialState: MovieState = {
  trending: [],
  popular: [],
  topRated: [],
  upcoming: [],
  loading: false,
  error: null,
};

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TRENDING':
      return { ...state, trending: action.payload, loading: false };
    case 'SET_POPULAR':
      return { ...state, popular: action.payload, loading: false };
    case 'SET_TOP_RATED':
      return { ...state, topRated: action.payload, loading: false };
    case 'SET_UPCOMING':
      return { ...state, upcoming: action.payload, loading: false };
    default:
      return state;
  }
};

interface MovieContextType {
  state: MovieState;
  fetchMovies: () => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const fetchMovies = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const [trending, popular, topRated, upcoming] = await Promise.all([
        getTrendingMovies(),
        getPopularMovies(),
        getTopRatedMovies(),
        getUpcomingMovies(),
      ]);

      dispatch({ type: 'SET_TRENDING', payload: trending });
      dispatch({ type: 'SET_POPULAR', payload: popular });
      dispatch({ type: 'SET_TOP_RATED', payload: topRated });
      dispatch({ type: 'SET_UPCOMING', payload: upcoming });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch movies' });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ state, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};
