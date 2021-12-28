import { useState, useEffect } from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import { ROUTES } from '../consts';
import FetchMovies from '../services/themoviedb-api';
import Cast from './Cast';

const fetchMovies = new FetchMovies();

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovies.getMovieDetails(movieId).then(setMovieDetails);
  }, [movieId]);

  return (
    <>
      {movieDetails && (
        <>
          {/* <GoBackButton/>  */}
          {movieDetails.posterPath ? (
            <picture>
              <source
                srcSet={` https://image.tmdb.org/t/p/w342${movieDetails.posterPath} 1x,
                https://image.tmdb.org/t/p/w780${movieDetails.posterPath} 2x`}
                type="image/jpeg"
              />
              <img src="#" alt={movieDetails.title} />
            </picture>
          ) : (
            <img
              src="https://media.istockphoto.com/photos/single-dia-slide-35mm-film-snip-under-different-flash-light-settings-picture-id1323720288?b=1&k=20&m=1323720288&s=170667a&w=0&h=XCA6bix_4uuiWXqDj1_hsYMhAz_loXVFQ9jYx-F47qE="
              alt={movieDetails.title}
            ></img>
          )}

          <h2>
            {movieDetails.title} ({movieDetails.year})
          </h2>
          <p>User score: {movieDetails.score}</p>
          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <p>{movieDetails.genres}</p>
          <Outlet />
        </>
      )}
    </>
  );
}
