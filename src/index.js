import './sass/main.scss';
import './js/refs';
import './js/homePageRendering';
import './js/movieSearch';
import { renderHomePage } from './js/homePageRendering';
import headerTemplates from './js/components/headers-tpl';
import { listenSearchFormSubmit } from './js/movieSearch';
// import './js/modalMovie';
import './js/login-form.js';
import './js/pagination';
import './js/spinner';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './js/modal-student';
import './js/api-servise';

renderHomePage(headerTemplates.homeHeader);

listenSearchFormSubmit();
