import UserTitle from "./view/user-title.js";
import Menu from "./view/menu.js";
import Sort from "./view/sort.js";
import FilmsContainer from "./view/films-container.js";
import FilmsListContainer from "./view/films-list.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/button-show-more.js";
import FilmsExtra from "./view/films-extra.js";
import FilmPopup from "./view/film-popup.js";
import FilmComment from "./view/film-comment.js";
import {generateFilmCard} from "./mockup/film-info-mockup.js";
import Statistics from "./view/film-statistics.js";
import {getRandomNumber} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
// import {getRandomNumber, buttonToggle, render, RenderPosition} from "./utils.js";
// import {generateSortByDate} from "./mockup/sort-mockup";
// import {generateSortByRating} from "./mockup/sort-mockup";
const NUMBER_OF_FILM_CARDS = getRandomNumber(15, 25);
const COUNT_PER_STEP = 5;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const menuComponent = new Menu();
const filmsContainerComponent = new FilmsContainer();
const siteFilmsElement = filmsContainerComponent.getElement().querySelector(`.films-list`);
// const sortButtons = document.querySelectorAll(`.sort__button`);
// const menuButtons = document.querySelectorAll(`.main-navigation__item`);
const siteFilmsListComponent = new FilmsListContainer();

export const films = new Array(NUMBER_OF_FILM_CARDS).fill().map(generateFilmCard);
// const filmsDefault = Object.assign([], films);
/*
const extraBlocks = document.querySelectorAll(`.films-list--extra`);
const renderExtra = function (blocks, extrasNumber, cardsNumber) {
  for (let i = 0; i < extrasNumber; i++) {
    render(blocks[i].querySelector(`.films-list__container`), siteFilmsListContainerElement, `beforeend`, cardsNumber);
  }
};
renderExtra(extraBlocks, NUMBER_OF_EXTRA, 2);
*/


const renderFilmCard = function (filmListElement, filmCard) {
  const filmComponent = new FilmCard(filmCard);
  const filmPopup = new FilmPopup(filmCard);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
    }
  };
  const closePopup = function () {
    document.removeEventListener(`keydown`, onEscKeyDown);
    document.body.classList.remove(`hide-overflow`);
    const allComments = document.querySelectorAll(`.film-details__comment`);
    for (let comment of allComments) {
      comment.remove();
    }
    document.body.removeChild(filmPopup.getElement());
  };

  const openPopup = function () {
    document.body.classList.add(`hide-overflow`);
    document.body.appendChild(filmPopup.getElement());
    const filmCommentList = document.querySelector(`.film-details__comments-list`);
    for (let i = 0; i < filmCard.comments.length; i++) {
      render(filmCommentList, new FilmComment(filmCard.comments[i]), RenderPosition.BEFOREEND);
    }
    document.addEventListener(`keydown`, onEscKeyDown);
    document.querySelector(`.film-details__close-btn`).addEventListener(`click`, function () {
      closePopup();
    });
  };

  filmComponent.setPopupOpenHandler(() => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmComponent.setPopupOpenHandler(() => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  filmComponent.setPopupOpenHandler(() => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};


const renderFilmsList = function (container, filmCards) {
  filmCards.slice(0, Math.min(filmCards.length, COUNT_PER_STEP))
  .forEach((filmCard) => renderFilmCard(siteFilmsListComponent, filmCard));

  if (filmCards.length > COUNT_PER_STEP) {
    let renderedFilmCount = COUNT_PER_STEP;
    const ShowMoreButtonComponent = new ShowMoreButton();

    render(siteFilmsElement, ShowMoreButtonComponent, RenderPosition.BEFOREEND);
    ShowMoreButtonComponent.setBtnClickHandler(() => {
      filmCards.slice(renderedFilmCount, renderedFilmCount + COUNT_PER_STEP).forEach((filmCard) => renderFilmCard(siteFilmsListComponent, filmCard));
      renderedFilmCount += COUNT_PER_STEP;
      if (renderedFilmCount >= filmCards.length) {
        ShowMoreButtonComponent.getElement().remove();
      }
    });
  }
  render(container, siteFilmsListComponent, RenderPosition.AFTERBEGIN);
};


// const updateFilms = function (filmslist) {
//   let filmItems = document.querySelectorAll(`.film-card`);
//   filmItems.forEach(function (element) {
//     element.remove();
//   });
//   renderFilmsList(siteFilmsElement, filmslist);
// };


// const renderSortBtn = function () {
//   const btnComponent = new Sort();
//   const sortBtn = btnComponent.getElement().querySelectorAll(`.sort__button`);

//   sortBtn.forEach(function (element) {
//     element.addEventListener(`click`, function (evt) {
//       // buttonToggle(evt, sortBtn, `sort__button--active`);
//       // switch (element.textContent) {
//       //   case `Sort by date`:
//           // generateSortByDate(films);
//           updateFilms(films);
//         //   break;
//         // case `Sort by rating`:
//         //   generateSortByRating(films);
//         //   updateFilms(films);
//         //   break;
//         // default:
//         //   updateFilms(filmsDefault);
//         //   break;
//       }
//     // }
//     );
//   });
//   render(siteMainElement, btnComponent.getElement(), RenderPosition.BEFOREEND)
// };

render(siteHeaderElement, new UserTitle(), RenderPosition.BEFOREEND);
render(siteMainElement, menuComponent, RenderPosition.AFTERBEGIN);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsContainerComponent, RenderPosition.BEFOREEND);
const filmsElement = document.querySelector(`.films`);
renderFilmsList(siteFilmsElement, films);
render(filmsElement, new FilmsExtra(`Top rated`), RenderPosition.BEFOREEND);
render(filmsElement, new FilmsExtra(`Most commented`), RenderPosition.BEFOREEND);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new Statistics(films.length), RenderPosition.BEFOREEND);

