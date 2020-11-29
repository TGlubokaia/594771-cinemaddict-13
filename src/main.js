import {createUserTitleTemplate} from "./view/user-title.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createBtnShowMoreTemplate} from "./view/button-show-more.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";
import {createFilmDetailsTemplate} from "./view/film-popup.js";
import {createFilmCommentTemplate} from "./view/film-comment.js";
import {generateFilmCard} from "./mockup/film-info-mockup.js";
import {createStatisticsTemplate} from "./view/film-statistics.js";
import {getRandomNumber} from "./utils.js";
import {buttonToggle} from "./utils.js";
import {generateSortByDate} from "./mockup/sort-mockup";
import {generateSortByRating} from "./mockup/sort-mockup";





const NUMBER_OF_FILM_CARDS = getRandomNumber(15, 25);
const NUMBER_OF_EXTRA = 2;
const COUNT_PER_STEP = 5;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = new Array(NUMBER_OF_FILM_CARDS).fill().map(generateFilmCard);


const render = function (container, template, place) {
  container.insertAdjacentHTML(place, template);
}

render(siteHeaderElement, createUserTitleTemplate(), `beforeend`);
render(siteMainElement, createMenuTemplate(), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const siteFilmsListElement = document.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);


for (let i = 0; i < NUMBER_OF_FILM_CARDS; i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(films[i]), 'afterbegin');
}
const sortButtons = document.querySelectorAll(`.sort__button`);

const updateFilms = function (filmslist) {
  let filmItems = document.querySelectorAll(`.film-card`);
  filmItems.forEach(function (element) {
    element.remove();
  });
  for (let i = 0; i < NUMBER_OF_FILM_CARDS; i++) {
    render(siteFilmsListContainerElement, createFilmCardTemplate(filmslist[i]), 'afterbegin');
  };
}
const filmsDefault = Object.assign([], films);
sortButtons.forEach(function (element) {
  element.addEventListener(`click`, function (evt) {
    buttonToggle(evt, sortButtons, `sort__button--active`);
    switch (element.textContent) {
      case `Sort by date`:
        generateSortByDate(films);
        updateFilms(films);
        break;
      case `Sort by rating`:
        generateSortByRating(films)
        updateFilms(films);
        break;
      default:
        updateFilms(filmsDefault);
        break;
    }
  });
});


render(siteFilmsListContainerElement, createBtnShowMoreTemplate(), `beforeend`);
render(siteFilmsListContainerElement, createFilmsExtraTemplate(`Top rated`), `beforeend`);
render(siteFilmsListContainerElement, createFilmsExtraTemplate(`Most commented`), `beforeend`);

/*
const extraBlocks = document.querySelectorAll(`.films-list--extra`);
const renderExtra = function (blocks, extrasNumber, cardsNumber) {
  for (let i = 0; i < extrasNumber; i++) {
    render(blocks[i].querySelector(`.films-list__container`), siteFilmsListContainerElement, `beforeend`, cardsNumber);
  }
};
renderExtra(extraBlocks, NUMBER_OF_EXTRA, 2);
*/

const footerElement = document.querySelector(`.footer`);
render(footerElement, (createStatisticsTemplate(films.length)), `beforeend`);
/*
render(footerElement, createFilmDetailsTemplate(films[0]), `afterend`);
const filmCommentList = document.querySelector(`.film-details__comments-list`);

for (let i = 0; i < films[0].commentslength; i++) {
  render(filmCommentList, createFilmCommentTemplate(films[0].comments[i]), `beforeend`);
}
*/
