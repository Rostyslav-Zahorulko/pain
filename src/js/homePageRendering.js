import headerTemplates from './components/headers-tpl';
import {
  paginateFilms,
  startListeningOnPaginationContainerClick,
  stopListeningOnPaginationContainerClick,
} from './pagination';
import { showSpinner, hideSpinner } from './spinner';
import apiServise from './api-servise';
import {
  getUserWatchedFromDatabase,
  getUserQueueFromDatabase,
} from './userLibrary';
import { currentUserId } from './login-form';
import updateFilmsGalleryMarkup from './films-gallery';

const refs = {
  header: document.querySelector('.header-container-js'),
  filmsGallery: document.querySelector('#films-gallery'),
  libraryBtn: document.querySelector('.navigation-list-item-link-my-library'),
  paginationContainer: document.querySelector('#pagination'),
  homeLink: document.querySelector('.navigation-list-item-link-home'),
};

function renderHomePage(headerTpl) {
  stopListeningOnPaginationContainerClick();
  refs.filmsGallery.setAttribute('data-feature', 'trends');
  console.log(refs.filmsGallery);

  apiServise.resetPage();
  showSpinner();
  updateHeaderMarkup(headerTpl);
  renderTrendsPagination().catch(console.log).finally(hideSpinner);
  startListeningOnPaginationContainerClick();
}

function updateHeaderMarkup(headerTpl) {
  refs.header.innerHTML = '';
  refs.header.insertAdjacentHTML('beforeend', headerTpl);
  refs.libraryBtn.addEventListener('click', libraryHandleClick);
}

function renderTrendsPagination() {
  return renderTrendsGallery().then(() => {
    paginateFilms();
  });
}

function renderTrendsGallery() {
  return apiServise.fetchTrends().then(({ results, total_results }) => {
    // console.log('results: ', results);
    // console.log('total_results: ', total_results);

    refs.filmsGallery.innerHTML = '';

    updateFilmsGalleryMarkup(results);

    apiServise.setFilmsAmount(total_results);
    console.log('apiServise.filmsAmount: ', apiServise.filmsAmount);

    return;
  });
}

//--------------ОТРИСОВКА БИБЛИОТЕКИ ПОЛЬЗОВАТЕЛЯ----------------
function libraryHandleClick(event) {
  event.preventDefault();
  refs.homeLink.classList.remove('current');
  refs.libraryBtn.classList.add('current');
  const watchedFilms = getUserWatchedFromDatabase(currentUserId);
  const queuedFilms = getUserQueueFromDatabase(currentUserId);
  updateHeaderMarkup(headerTemplates.myLibraryHeader);

  if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
  }

  const watchedBtn = document.querySelector('.header-button-watched');
  const queueBtn = document.querySelector('.header-button-queue');

  refs.filmsGallery.innerHTML = '';
  refs.paginationContainer.style.display = 'none';
  updateFilmsLibraryMarkup(watchedFilms);
  // renderMyLibraryWatched(watchedBtn, queueBtn, watchedFilms);

  function onLibraryButtonsClick(activeBtn, inactiveBtn, films) {
    activeBtn.addEventListener('click', event => {
      event.preventDefault();
      updateFilmsLibraryMarkup(films);
      inactiveBtn.classList.remove('is-active-btn');
      activeBtn.classList.add('is-active-btn');
    });
  }

  onLibraryButtonsClick(queueBtn, watchedBtn, queuedFilms);
  onLibraryButtonsClick(watchedBtn, queueBtn, watchedFilms);

  function updateFilmsLibraryMarkup(localStorageFilms) {
    refs.filmsGallery.innerHTML = '';
    localStorageFilms.map(
      ({ id, poster_path, title, release_date, genres, vote_average }) => {
        const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${genres.join(
    ', ',
  )} | ${release_date}<span class="modal-info-vote-average library">${vote_average}</span></p>
</li>
`;
        refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
      },
    );
  }
  //========================Zoe Dobavila=======================
  function renderMyLibraryWatched(activeBtn, inactiveBtn, films) {
    updateFilmsLibraryMarkup(films);
    inactiveBtn.classList.remove('is-active-btn');
    activeBtn.classList.add('is-active-btn');
  }
}

//-------------------------------------------------------------

export { renderHomePage, renderTrendsGallery };
