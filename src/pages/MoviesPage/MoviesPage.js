import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import SearchBar from '../../components/SearchBar/SearchBar';
import FetchMovies from '../../services/themoviedb-api';
import { Status } from '../../consts';

const fetchMovies = new FetchMovies();

export default function MoviesPage() {
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesByQuery, setMoviesByQuery] = useState([]);
  let navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get('query');

  useEffect(() => {
    if (searchParameter) {
      setSearchQuery(searchParameter);
      setStatus(Status.PENDING);
    } else {
      setMoviesByQuery([]);
    }
  }, [searchParameter]);

  const handleSubmitSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
    navigate(`?query=${searchQuery}`);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchMovies
      .getMoviesByQuery(searchQuery)
      .then(moviesByQuery => {
        setMoviesByQuery(moviesByQuery);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  if (status === Status.PENDING) {
    return (
      <div>
        <Loader type="Puff" color="#00BFFF" height={300} width={300} />
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return <p>Error fetching data: {error.message}</p>;
  }

  if (status === Status.RESOLVED || status === Status.IDLE) {
    return (
      <>
        <SearchBar onSubmitSearchQuery={handleSubmitSearchQuery} />
        {status === Status.IDLE && <p>Please, enter your search query to find movies.</p>}
        {moviesByQuery.length === 0 && status === Status.RESOLVED && (
          <p>There are no movies was found by your search query. Please, try another request.</p>
        )}
        {moviesByQuery.length !== 0 && status === Status.RESOLVED && (
          <ul>
            {moviesByQuery.map(movie => (
              <li key={movie.id}>
                <Link to={`${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
