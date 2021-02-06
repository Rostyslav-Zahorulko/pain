const apiServise = {
  query: '',
  page: 1,
  filmsAmount: 0,
  path: 'https://api.themoviedb.org/3',
  key: 'ffddee44025dd24685ea61d637d56d24',

  setQuery(value) {
    this.query = value;
  },

  setPage(value) {
    this.page = value;
  },

  incrementPage() {
    this.page += 1;
  },

  decrementPage() {
    this.page -= 1;
  },

  resetPage() {
    this.page = 1;
  },

  setFilmsAmount(value) {
    this.filmsAmount = value;
  },

  fetchTrends() {
    return fetch(
      `${this.path}/trending/movie/day?api_key=${this.key}&page=${this.page}`,
    ).then(response => response.json());
  },

  fetchMoviesByKeyword() {
    return fetch(
      `${this.path}/search/movie?api_key=${this.key}&language=en-US&page=${this.page}&include_adult=false&query=${this.query}`,
    ).then(response => response.json());
  },
};

export default apiServise;
