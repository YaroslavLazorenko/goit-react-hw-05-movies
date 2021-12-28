import { Route, Routes, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import './App.css';
import ApiInfo from './components/ApiInfo';
import { ROUTES } from './consts';
import Cast from './views/Cast';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={`/${ROUTES.MOVIES}`} element={<MoviesPage />} />
        <Route path={`/${ROUTES.MOVIE_DETAILS}`} element={<MovieDetailsPage />}>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
        </Route>
        {/* <Route path="/movies/:movieId/reviews" element={<Reviews />} /> */}
        {/* <NavigateToHomePage /> */}
        <Route path="/*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
      <ApiInfo />
    </>
  );
}

export default App;
