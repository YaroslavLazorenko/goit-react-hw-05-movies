import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import FetchMovies from '../services/themoviedb-api';

const fetchMovies = new FetchMovies();

export default function Cast() {
  const movieId = useOutletContext();

  const [cast, setCast] = useState([]);
  useEffect(() => {
    fetchMovies.getCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <>
      {cast.length === 0 ? (
        <p>We don't have information about cast for this movie.</p>
      ) : (
        <ul>
          {cast.map(({ name, character, profile }) => {
            return (
              <li key={name}>
                <p>{name}</p>
                <p>Character: {character}</p>
                {profile ? (
                  <img src={`https://image.tmdb.org/t/p/w342${profile}`} alt={name} />
                ) : (
                  <img
                    src="https://st3.depositphotos.com/7486768/17806/v/380/depositphotos_178065822-stock-illustration-profile-anonymous-face-icon-gray.jpg?forcejpeg=true"
                    alt={name}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
