import { Route, Routes, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import { ToastContainer } from 'react-toastify';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import './App.css';
import ApiInfo from './components/ApiInfo';
import { ROUTES } from './consts';
import Cast from './views/Cast';
import Reviews from './views/Reviews';

function App() {
  return (
    <>
      <AppBar />
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={`/${ROUTES.MOVIES}`} element={<MoviesPage />} />
        <Route path={`/${ROUTES.MOVIE_DETAILS}`} element={<MovieDetailsPage />}>
          <Route path={ROUTES.CAST} element={<Cast />} />
          <Route path={ROUTES.REVIEWS} element={<Reviews />} />
        </Route>
        <Route path="/*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
      <ApiInfo />
    </>
  );
}

export default App;
