const apiServise = {
  query: '',
  page: 1,
  filmsAmount: 0,
  path: 'https://api.themoviedb.org/3',
  key: 'ffddee44025dd24685ea61d637d56d24',
  trendsUrl: '',

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
};

export default apiServise;
