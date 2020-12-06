import UserTitle from "./view/user-title.js";
import Menu from "./view/menu.js";
import Sort from "./view/sort.js";
import FilmsList from "./view/films-list.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/button-show-more.js";
import FilmsExtra from "./view/films-extra.js";
import FilmPopup from "./view/film-popup.js";
import FilmComment from "./view/film-comment.js";
import {generateFilmCard} from "./mockup/film-info-mockup.js";
import Statistics from "./view/film-statistics.js";
import {getRandomNumber, buttonToggle, render, RenderPosition} from "./utils.js";
import {generateSortByDate} from "./mockup/sort-mockup";
import {generateSortByRating} from "./mockup/sort-mockup";

const NUMBER_OF_FILM_CARDS = getRandomNumber(15, 25);
const COUNT_PER_STEP = 5;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

export const films = new Array(NUMBER_OF_FILM_CARDS).fill().map(generateFilmCard);

const menuComponent = new Menu();
const filmsListComponent = new FilmsList();
const ShowMoreButtonComponent = new ShowMoreButton();

render(siteHeaderElement, new UserTitle().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, menuComponent.getElement(), RenderPosition.AFTERBEGIN); 
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const siteFilmsElement = document.querySelector(`.films`);
const siteFilmsListElement = document.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);



const updateFilms = function (filmslist) {
  let filmItems = document.querySelectorAll(`.film-card`);
  filmItems.forEach(function (element) {
    element.remove();
  });
  for (let i = 0; i < NUMBER_OF_FILM_CARDS; i++) {
    render(siteFilmsListContainerElement,  new FilmCard(filmslist[i]).getElement(), RenderPosition.AFTERBEGIN);
  }
};

const filmsDefault = Object.assign([], films);
const sortButtons = document.querySelectorAll(`.sort__button`);
const menuButtons = document.querySelectorAll(`.main-navigation__item`);

sortButtons.forEach(function (element) {
  element.addEventListener(`click`, function (evt) {
    buttonToggle(evt, sortButtons, `sort__button--active`);
    switch (element.textContent) {
      case `Sort by date`:
        generateSortByDate(films);
        updateFilms(films);
        break;
      case `Sort by rating`:
        generateSortByRating(films);
        updateFilms(films);
        break;
      default:
        updateFilms(filmsDefault);
        break;
    }
  });
});

menuButtons.forEach(function (element) {
  element.addEventListener(`click`, function (evt) {
    buttonToggle(evt, menuButtons, `main-navigation__item--active`);
    switch (element.textContent) {
      case `Sort by date`:
        generateSortByDate(films);
        updateFilms(films);
        break;
      case `Sort by rating`:
        generateSortByRating(films);
        updateFilms(films);
        break;
      default:
        updateFilms(filmsDefault);
        break;
    }
  });
});




if (films.length > COUNT_PER_STEP) {
  let renderedFilmCount = COUNT_PER_STEP;
  render(siteFilmsElement, ShowMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  ShowMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedFilmCount, renderedFilmCount + COUNT_PER_STEP).forEach((film) => render(siteFilmsListContainerElement,  new FilmCard(film).getElement(), RenderPosition.BEFOREEND));
    renderedFilmCount += COUNT_PER_STEP;
    if (renderedFilmCount >= films.length) {
      ShowMoreButtonComponent.getElement().remove();
    }
  });
}

/*
const extraBlocks = document.querySelectorAll(`.films-list--extra`);
const renderExtra = function (blocks, extrasNumber, cardsNumber) {
  for (let i = 0; i < extrasNumber; i++) {
    render(blocks[i].querySelector(`.films-list__container`), siteFilmsListContainerElement, `beforeend`, cardsNumber);
  }
};
renderExtra(extraBlocks, NUMBER_OF_EXTRA, 2);
*/

render(siteFilmsElement, new FilmsExtra(`Top rated`).getElement(), RenderPosition.BEFOREEND);
render(siteFilmsElement, new FilmsExtra(`Most commented`).getElement(), RenderPosition.BEFOREEND);
const footerElement = document.querySelector(`.footer`);
render(footerElement, (new Statistics(films.length).getElement()), RenderPosition.BEFOREEND);


const onEscKeyDown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};

const closePopup = function (film) {
  document.removeEventListener('keydown', onEscKeyDown);
  new FilmPopup(film).removeElement();
}

const openPopup = function (film) {
  document.body.classList.add(`hide-overflow`);
  document.addEventListener('keydown', onEscKeyDown);
  render(footerElement, new FilmPopup(film).getElement(),RenderPosition.BEFOREEND);
  new FilmPopup(film).getElement().querySelector(`film-details__close-btn`).addEventListener(`click`, function(film){
    closePopup(film);
  })
};


for (let i = 0; i < Math.min(films.length, COUNT_PER_STEP); i++) {
  console.log(new FilmCard(films[i]).getElement().querySelector(`img`));
  render(siteFilmsListContainerElement, new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
  new FilmCard(films[i]).getElement().querySelector(`img`).addEventListener(`click`, function() {
    openPopup(films[i]);
  })
}
