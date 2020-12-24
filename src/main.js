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


// ф-ия для отрисовки карточки 
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


// ф-ия для отрисовки списка фильма
const renderFilmsList = function (container, filmCards) {
  filmCards.slice(0, Math.min(filmCards.length, COUNT_PER_STEP))
  .forEach((filmCard) => renderFilmCard(siteFilmsListComponent, filmCard));

  if (filmCards.length > COUNT_PER_STEP) {
    let renderedFilmCount = COUNT_PER_STEP;
    const ShowMoreButtonComponent = new ShowMoreButton();

    render(siteFilmsElement /*`.films-list`*/, ShowMoreButtonComponent, RenderPosition.BEFOREEND);
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


render(siteHeaderElement, new UserTitle(), RenderPosition.BEFOREEND);
boardPresenter.init(films);

// render(siteMainElement, menuComponent, RenderPosition.AFTERBEGIN);
// render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
// render(siteMainElement, filmsContainerComponent, RenderPosition.BEFOREEND);
// const filmsElement = document.querySelector(`.films`);
// renderFilmsList(siteFilmsElement/*`.films-list`*/, films);
// render(filmsElement, new FilmsExtra(`Top rated`), RenderPosition.BEFOREEND);
// render(filmsElement, new FilmsExtra(`Most commented`), RenderPosition.BEFOREEND);


render(footerElement, new Statistics(films.length), RenderPosition.BEFOREEND);

