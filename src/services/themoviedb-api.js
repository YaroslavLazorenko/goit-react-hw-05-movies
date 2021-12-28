import axios from 'axios';

export default class FetchMovies {
  constructor() {
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.KEY = 'ec0d6416fe23d598a686f5996c6cceae';
    this.GET_TRENDING_MOVIES_PARAMETERS = '/trending/movie/day';
    this.GET_MOVIE_DETAILS_PARAMETERS = '/movie';
  }

  async getTrendingMovies() {
    axios.defaults.baseURL = this.BASE_URL;
    const parameters = `${this.GET_TRENDING_MOVIES_PARAMETERS}?api_key=${this.KEY}`;

    const response = await axios.get(parameters);
    return response.data.results.map(movie => {
      return { id: movie.id, title: movie.original_title };
    });
  }

  async getMovieDetails(movieId) {
    axios.defaults.baseURL = this.BASE_URL;
    const parameters = `${this.GET_MOVIE_DETAILS_PARAMETERS}/${movieId}?api_key=${this.KEY}`;

    const response = await axios.get(parameters);
    const data = response.data;

    return {
      posterPath: data.poster_path,
      title: data.original_title,
      year: this.getReleaseYear(data.release_date),
      score: this.getUserScore(data.vote_average),
      overview: data.overview ?? 'No information',
      genres: this.getGenres(data.genres),
    };
  }

  getReleaseYear(releaseDate) {
    if (!releaseDate) return 'No information';
    return releaseDate.split('-')[0];
  }

  getUserScore(voteAverage) {
    if (!voteAverage) return 'No information';
    return Math.round(Number(voteAverage) * 10) + '%';
  }

  getGenres(genresArray) {
    if (!genresArray) return 'No information';
    return genresArray.map(genre => genre.name).join(', ');
  }
}
