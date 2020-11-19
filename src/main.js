import {createUserTitleTemplate} from "./view/user-title.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCard} from "./view/film-card.js";
import {createBtnShowMore} from "./view/button-show-more.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const NUMBER_OF_FILM_CARDS = 5;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserTitleTemplate(), `beforeend`);
render(siteMainElement, createMenuTemplate(), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const siteFilmsListElement = document.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);

const fragment = document.createDocumentFragment();
const renderCard = function () {
  for (let j = 0; j < NUMBER_OF_FILM_CARDS; j++) {
    const card = createFilmCard();
    const cardElement = card.cloneNode(true);
    fragment.appendChild(cardElement);
  }
  siteFilmsListContainerElement.insertAdjacentHTML(`beforeend`, fragment);
};
renderCard();



render(siteFilmsListContainerElement, createBtnShowMore(), `beforeend`);




