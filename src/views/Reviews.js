import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import FetchMovies from '../services/themoviedb-api';

const fetchMovies = new FetchMovies();

export default function Reviews() {
  const movieId = useOutletContext();

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchMovies.getReviews(movieId).then(setReviews);
  }, [movieId]);

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
