import React from 'react';
import { useMovie } from '../../contexts/MovieContext';
import { getImageUrl } from '../../services/tmdbApi';
import { Play, Info, Plus } from 'lucide-react';

const Hero: React.FC = () => {
  const { state } = useMovie();
  
  const featuredMovie = state.trending[0] || state.popular[0];

  if (!featuredMovie) {
    return (
      <div className="relative h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading amazing content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(featuredMovie.backdrop_path || featuredMovie.poster_path, 'original')}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0"></div>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {featuredMovie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-green-400 font-medium">
                {Math.round(featuredMovie.vote_average * 10)}% Match
              </span>
              <span className="text-white border border-white/30 px-2 py-1 text-sm">
                {new Date(featuredMovie.release_date).getFullYear()}
              </span>
              <span className="text-white text-sm">
                {featuredMovie.adult ? '18+' : '13+'}
              </span>
              <span className="text-white text-sm">HD</span>
            </div>

            <p className="text-white text-lg mb-8 line-clamp-3">
              {featuredMovie.overview}
            </p>

            <div className="flex items-center space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-200 transition">
                <Play size={20} />
                <span>Play</span>
              </button>
              
              <button className="bg-gray-600/80 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-500/80 transition">
                <Info size={20} />
                <span>More Info</span>
              </button>
              
              <button className="bg-gray-600/80 text-white p-3 rounded-lg hover:bg-gray-500/80 transition">
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
