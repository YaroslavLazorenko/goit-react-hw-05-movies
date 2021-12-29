import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import FetchMovies from '../../services/themoviedb-api';
import { Status } from '../../consts';

const fetchMovies = new FetchMovies();

export default function Reviews() {
  const [status, setStatus] = useState(Status.PENDING);
  const [error, setError] = useState(null);
  const movieId = useOutletContext();

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchMovies
      .getReviews(movieId)
      .then(reviews => {
        setReviews(reviews);
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
        {reviews.length === 0 ? (
          <p>We don't have any reviews for this movie.</p>
        ) : (
          <ul>
            {reviews.map(({ author, content }, idx) => {
              return (
                <li key={idx}>
                  <p>Author: {author}</p>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }
}
