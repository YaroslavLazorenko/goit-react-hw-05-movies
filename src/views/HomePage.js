import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FetchMovies from '../services/themoviedb-api';
import { ROUTES } from '../consts';

const fetchMovies = new FetchMovies();

export default function HomeView() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    fetchMovies.getTrendingMovies().then(setTrendingMovies);
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {trendingMovies.length !== 0 && (
        <ul>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`${ROUTES.MOVIES}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
