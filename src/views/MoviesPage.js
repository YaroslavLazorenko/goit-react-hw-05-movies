import { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import FetchMovies from '../services/themoviedb-api';

const fetchMovies = new FetchMovies();

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const isFirstRender = useRef(true);

  const handleSubmitSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchMovies.getMoviesByQuery(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <SearchBar onSubmitSearchQuery={handleSubmitSearchQuery} />
    </>
  );
}
