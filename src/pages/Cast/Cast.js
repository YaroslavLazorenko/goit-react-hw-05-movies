import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import FetchMovies from '../../services/themoviedb-api';
import { Status } from '../../consts';
import Styles from './Cast.module.css';

const fetchMovies = new FetchMovies();

export default function Cast() {
  const [status, setStatus] = useState(Status.PENDING);
  const [error, setError] = useState(null);
  const movieId = useOutletContext();

  const [cast, setCast] = useState([]);
  useEffect(() => {
    fetchMovies
      .getCast(movieId)
      .then(cast => {
        setCast(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

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

  if (status === Status.RESOLVED) {
    return (
      <>
        {cast.length === 0 ? (
          <p>We don't have information about cast for this movie.</p>
        ) : (
          <ul>
            {cast.map(({ name, character, profile }) => {
              return (
                <li className={Styles['list-item']} key={name}>
                  <p className={Styles.name}>{name}</p>
                  <p className={Styles.character}>Character: {character}</p>
                  {profile ? (
                    <img
                      className={Styles.image}
                      src={`https://image.tmdb.org/t/p/w342${profile}`}
                      alt={name}
                    />
                  ) : (
                    <img
                      className={Styles.image}
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
}
