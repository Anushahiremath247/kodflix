import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
  searchMovies,
  getImageUrl,
} from '../tmdbApi';

vi.mock('axios');

const mockedAxios = vi.mocked(axios);

describe('TMDB API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTrendingMovies', () => {
    it('should fetch trending movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              title: 'Movie 1',
              overview: 'Overview 1',
              poster_path: '/poster1.jpg',
              backdrop_path: '/backdrop1.jpg',
              release_date: '2023-01-01',
              vote_average: 8.5,
              genre_ids: [1, 2],
            },
          ],
        },
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await getTrendingMovies();

      expect(result).toEqual(mockResponse.data.results);
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: '2ac243714eb51a261560fde07afdfaf1',
        },
      });
    });

    it('should handle errors when fetching trending movies', async () => {
      const mockError = new Error('Network error');
      
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(mockError),
      } as any);

      await expect(getTrendingMovies()).rejects.toThrow('Network error');
    });
  });

  describe('getPopularMovies', () => {
    it('should fetch popular movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 2,
              title: 'Popular Movie',
              overview: 'Popular Overview',
              poster_path: '/popular.jpg',
              backdrop_path: '/popular_backdrop.jpg',
              release_date: '2023-02-01',
              vote_average: 9.0,
              genre_ids: [3, 4],
            },
          ],
        },
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await getPopularMovies();

      expect(result).toEqual(mockResponse.data.results);
    });
  });

  describe('getTopRatedMovies', () => {
    it('should fetch top rated movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 3,
              title: 'Top Rated Movie',
              overview: 'Top Rated Overview',
              poster_path: '/toprated.jpg',
              backdrop_path: '/toprated_backdrop.jpg',
              release_date: '2023-03-01',
              vote_average: 9.5,
              genre_ids: [5, 6],
            },
          ],
        },
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await getTopRatedMovies();

      expect(result).toEqual(mockResponse.data.results);
    });
  });

  describe('getUpcomingMovies', () => {
    it('should fetch upcoming movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 4,
              title: 'Upcoming Movie',
              overview: 'Upcoming Overview',
              poster_path: '/upcoming.jpg',
              backdrop_path: '/upcoming_backdrop.jpg',
              release_date: '2024-01-01',
              vote_average: 7.5,
              genre_ids: [7, 8],
            },
          ],
        },
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await getUpcomingMovies();

      expect(result).toEqual(mockResponse.data.results);
    });
  });

  describe('getMovieDetails', () => {
    it('should fetch movie details successfully', async () => {
      const mockResponse = {
        data: {
          id: 5,
          title: 'Detailed Movie',
          overview: 'Detailed Overview',
          poster_path: '/detailed.jpg',
          backdrop_path: '/detailed_backdrop.jpg',
          release_date: '2023-04-01',
          vote_average: 8.0,
          genre_ids: [9, 10],
          genres: [
            { id: 9, name: 'Action' },
            { id: 10, name: 'Adventure' },
          ],
          runtime: 120,
          tagline: 'Amazing Movie Tagline',
        },
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await getMovieDetails(5);

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 6,
              title: 'Search Result Movie',
              overview: 'Search Result Overview',
              poster_path: '/search.jpg',
              backdrop_path: '/search_backdrop.jpg',
              release_date: '2023-05-01',
              vote_average: 7.0,
              genre_ids: [11, 12],
            },
          ],
        },
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await searchMovies('test query');

      expect(result).toEqual(mockResponse.data.results);
    });
  });

  describe('getImageUrl', () => {
    it('should return correct image URL with default size', () => {
      const path = '/test_image.jpg';
      const expectedUrl = 'https://image.tmdb.org/t/p/w500/test_image.jpg';
      
      expect(getImageUrl(path)).toBe(expectedUrl);
    });

    it('should return correct image URL with custom size', () => {
      const path = '/test_image.jpg';
      const size = 'original';
      const expectedUrl = 'https://image.tmdb.org/t/p/original/test_image.jpg';
      
      expect(getImageUrl(path, size)).toBe(expectedUrl);
    });

    it('should handle empty path', () => {
      const path = '';
      const expectedUrl = 'https://image.tmdb.org/t/p/w500';
      
      expect(getImageUrl(path)).toBe(expectedUrl);
    });
  });

  describe('API Configuration', () => {
    it('should use correct API key', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: { results: [] } }),
      } as any);

      getTrendingMovies();

      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: '2ac243714eb51a261560fde07afdfaf1',
        },
      });

      consoleSpy.mockRestore();
    });

    it('should use correct base URL', () => {
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: { results: [] } }),
      } as any);

      getTrendingMovies();

      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'https://api.themoviedb.org/3',
        })
      );
    });
  });

  describe('Data Validation', () => {
    it('should validate movie data structure', async () => {
      const mockMovie = {
        id: 7,
        title: 'Validation Movie',
        overview: 'Validation Overview',
        poster_path: '/validation.jpg',
        backdrop_path: '/validation_backdrop.jpg',
        release_date: '2023-06-01',
        vote_average: 8.2,
        genre_ids: [13, 14],
      };

      const mockResponse = {
        data: {
          results: [mockMovie],
        },
      };

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await getTrendingMovies();

      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('overview');
      expect(result[0]).toHaveProperty('poster_path');
      expect(result[0]).toHaveProperty('backdrop_path');
      expect(result[0]).toHaveProperty('release_date');
      expect(result[0]).toHaveProperty('vote_average');
      expect(result[0]).toHaveProperty('genre_ids');
      expect(Array.isArray(result[0].genre_ids)).toBe(true);
    });
  });
});
