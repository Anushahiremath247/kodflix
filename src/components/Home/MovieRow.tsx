import React from 'react';
import { Movie } from '../../services/tmdbApi';
import { getImageUrl } from '../../services/tmdbApi';
import { Play, Info, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="relative group">
      <h2 className="text-white text-2xl font-bold mb-4 px-4">{title}</h2>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={scrollContainer}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card flex-none w-48 md:w-56 lg:w-64 relative group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x450/1f2937/6b7280?text=No+Image';
                  }}
                />
                
                <div className="movie-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-green-400 text-sm font-medium">
                        {Math.round(movie.vote_average * 10)}%
                      </span>
                      <span className="text-white text-xs">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="bg-white text-black px-3 py-1 rounded text-sm font-medium hover:bg-gray-200 transition flex items-center space-x-1">
                        <Play size={14} />
                        <span>Play</span>
                      </button>
                      
                      <button className="bg-gray-600/80 text-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-500/80 transition flex items-center space-x-1">
                        <Info size={14} />
                        <span>Info</span>
                      </button>
                      
                      <button className="bg-gray-600/80 text-white p-1 rounded hover:bg-gray-500/80 transition">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
