import logo from './images/the-movie-db-logo.svg';

export default function ApiInfo() {
  return (
    <footer>
      <p>
        <span>Information about films by</span>
        <a href="https://www.themoviedb.org/">
          <img src={logo} alt="Logo of the movie db" width={150} />
        </a>
        <span>API</span>
      </p>
    </footer>
  );
}
