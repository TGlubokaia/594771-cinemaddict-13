import UserTitle from "./view/user-title.js";
import {generateFilmCard} from "./mockup/film-info-mockup.js";
import Statistics from "./view/film-statistics.js";
import {getRandomNumber} from "./utils/common.js";
import BoardPresenter from "./presenter/films-list.js";
import {render, RenderPosition} from "./utils/render.js";

const NUMBER_OF_FILM_CARDS = getRandomNumber(15, 25);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`main`);
const footerElement = document.querySelector(`.footer`);

// const menuComponent = new Menu();
// const filmsContainerComponent = new FilmsContainer();
// const siteFilmsListComponent = new FilmsListContainer();

export const films = new Array(NUMBER_OF_FILM_CARDS).fill().map(generateFilmCard);

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new UserTitle(), RenderPosition.BEFOREEND);
boardPresenter.init(films);

render(footerElement, new Statistics(films.length), RenderPosition.BEFOREEND);

