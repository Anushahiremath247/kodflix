import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useMovie } from '../../contexts/MovieContext';
import Navbar from './Navbar';
import Hero from './Hero';
import MovieRow from './MovieRow';
import { Film, LogOut } from 'lucide-react';

const Home: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state: movieState } = useMovie();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="relative">
        <Hero />
        
        <div className="relative z-20 -mt-32">
          <div className="space-y-8 pb-8">
            {movieState.trending.length > 0 && (
              <MovieRow 
                title="Trending Now" 
                movies={movieState.trending}
              />
            )}
            
            {movieState.popular.length > 0 && (
              <MovieRow 
                title="Popular on Kodflex" 
                movies={movieState.popular}
              />
            )}
            
            {movieState.topRated.length > 0 && (
              <MovieRow 
                title="Top Rated" 
                movies={movieState.topRated}
              />
            )}
            
            {movieState.upcoming.length > 0 && (
              <MovieRow 
                title="Upcoming" 
                movies={movieState.upcoming}
              />
            )}
          </div>
        </div>
      </div>

      {movieState.loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="text-white text-center">
            <Film className="w-16 h-16 animate-spin mx-auto mb-4" />
            <p>Loading movies...</p>
          </div>
        </div>
      )}

      {movieState.error && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-xl font-bold mb-2">Error</h3>
            <p>{movieState.error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
