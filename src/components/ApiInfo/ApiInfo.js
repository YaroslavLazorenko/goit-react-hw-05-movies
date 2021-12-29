import logo from './images/the-movie-db-logo.svg';

export default function ApiInfo() {
  return (
    <footer>
      <p>
        <span>Information about the films is provided by</span>
        <a href="https://www.themoviedb.org/">
          <img src={logo} alt="Logo of The Movie DB" width={150} />
        </a>
      </p>
    </footer>
  );
}
