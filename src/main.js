import {createUserTitleTemplate} from "./view/user-title.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createBtnShowMoreTemplate} from "./view/button-show-more.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";
import {createFilmDetailsTemplate} from "./view/film-popup.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const NUMBER_OF_FILM_CARDS = 5;
const NUMBER_OF_EXTRA = 2;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserTitleTemplate(), `beforeend`);
render(siteMainElement, createMenuTemplate(), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const siteFilmsListElement = document.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);
const card = createFilmCardTemplate();

const renderCard = function (parent, number) {
  for (let j = 0; j < number; j++) {
    parent.insertAdjacentHTML(`beforeend`, card);
  }
};
renderCard(siteFilmsListContainerElement, NUMBER_OF_FILM_CARDS);

render(siteFilmsListContainerElement, createBtnShowMoreTemplate(), `beforeend`);
render(siteFilmsListContainerElement, createFilmsExtraTemplate(`Top rated`), `beforeend`);
render(siteFilmsListContainerElement, createFilmsExtraTemplate(`Most commented`), `beforeend`);

const extraBlocks = document.querySelectorAll(`.films-list--extra`);

const renderExtra = function (blocks, extrasNumber, cardsNumber) {
  for (let i = 0; i < extrasNumber; i++) {
    renderCard(blocks[i].querySelector(`.films-list__container`), cardsNumber);
  }
};
renderExtra(extraBlocks, NUMBER_OF_EXTRA, 2);

const footerElement = document.querySelector(`.footer`);
render(footerElement, createFilmDetailsTemplate(), `afterend`);
