import {
  paginateFilms,
  startListeningOnPaginationContainerClick,
  stopListeningOnPaginationContainerClick,
} from './pagination';
import { showSpinner, hideSpinner } from './spinner';
import apiServise from './api-servise';
import updateFilmsGalleryMarkup from './films-gallery';

const refs = {
  filmsGallery: document.querySelector('#films-gallery'),
};

function listenSearchFormSubmit() {
  const searchFormRef = document.querySelector('#search-form');
  // console.log('searchFormRef: ', searchFormRef);

  searchFormRef.addEventListener('submit', handleSearchFormSubmit);
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  stopListeningOnPaginationContainerClick();

  refs.filmsGallery.removeAttribute('data-feature');
  // console.log(refs.filmsGallery);

  apiServise.resetPage();
  // console.log('apiServise.page: ', apiServise.page);

  const noticeRef = document.querySelector('.header-search-warning-show');
  // console.log('noticeRef: ', noticeRef);

  noticeRef.classList.add('is-hidden');

  const form = event.currentTarget;
  const input = form.elements.query;

  if (input.value === '') {
    noticeRef.classList.remove('is-hidden');
    noticeRef.textContent =
      'Unable to make a search query. Please enter any text!';

    return;
  }

  apiServise.setQuery(input.value);
  // console.log('apiServise.query: ', apiServise.query);

  showSpinner();

  renderFilmsByKeywordPagination().catch(console.log).finally(hideSpinner);

  startListeningOnPaginationContainerClick();

  form.reset();
}

function renderFilmsByKeywordPagination() {
  return renderFilmsByKeywordGallery().then(() => {
    paginateFilms(apiServise.filmsAmount);
  });
}

function renderFilmsByKeywordGallery() {
  return apiServise
    .fetchMoviesByKeyword()
    .then(({ results, total_results }) => {
      // console.log(results);
      // console.log(total_results);

      const noticeRef = document.querySelector('.header-search-warning-show');
      // console.log('noticeRef: ', noticeRef);

      if (results.length === 0) {
        noticeRef.classList.remove('is-hidden');
        noticeRef.textContent =
          'Your search did not match any films. Please clarify the request!';

        return;
      }

      refs.filmsGallery.innerHTML = '';

      updateFilmsGalleryMarkup(results);

      apiServise.setFilmsAmount(total_results);

      console.log('apiServise.filmsAmount: ', apiServise.filmsAmount);

      return;
    });
}

export { listenSearchFormSubmit, renderFilmsByKeywordGallery };
