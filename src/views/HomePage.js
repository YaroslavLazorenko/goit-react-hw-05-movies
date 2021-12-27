import { useState, useEffect } from 'react';
import fetchMovies from '../services/themoviedb-api';

export default function HomeView() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    setTrendingMovies(fetchMovies.trendingMovies());
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul></ul>
    </>
  );
}
