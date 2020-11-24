import {createUserTitleTemplate} from "./view/user-title.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createBtnShowMoreTemplate} from "./view/button-show-more.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";
import {createFilmDetailsTemplate} from "./view/film-popup.js";
import {createFilmCommentTemplate} from "./view/film-comment.js"

const render = (container, template, place, number) => {
  for (let i = 0; i < number; i++) {
    container.insertAdjacentHTML(place, template);
  }
};
const NUMBER_OF_FILM_CARDS = 5;
const NUMBER_OF_EXTRA = 2;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserTitleTemplate(), `beforeend`, 1);
render(siteMainElement, createMenuTemplate(), `afterbegin`, 1);
render(siteMainElement, createSortTemplate(), `beforeend`, 1);
render(siteMainElement, createFilmsListTemplate(), `beforeend`, 1);

const siteFilmsListElement = document.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);
const card = createFilmCardTemplate();

render(siteFilmsListContainerElement, card, `beforeend`, NUMBER_OF_FILM_CARDS);

render(siteFilmsListContainerElement, createBtnShowMoreTemplate(), `beforeend`, 1);
render(siteFilmsListContainerElement, createFilmsExtraTemplate(`Top rated`), `beforeend`, 1);
render(siteFilmsListContainerElement, createFilmsExtraTemplate(`Most commented`), `beforeend`, 1);

const extraBlocks = document.querySelectorAll(`.films-list--extra`);

const renderExtra = function (blocks, extrasNumber, cardsNumber) {
  for (let i = 0; i < extrasNumber; i++) {
    render(blocks[i].querySelector(`.films-list__container`), siteFilmsListContainerElement, `beforeend`, cardsNumber);
  }
};
renderExtra(extraBlocks, NUMBER_OF_EXTRA, 2);

const footerElement = document.querySelector(`.footer`);
render(footerElement, createFilmDetailsTemplate(), `afterend`, 1);

const filmCommentList = document.querySelector(`.film-details__comments-list`);
render(filmCommentList, createFilmCommentTemplate(), `beforeend`, 5);
