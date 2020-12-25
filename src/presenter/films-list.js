import MenuView from "../view/menu.js";
import SortView from "../view/sort.js";
import FilmsView from "../view/films.js";
import FilmsListView from "../view/films-list.js";
import FilmsTitleView from "../view/films-title.js";
import FilmsListContainerView from "../view/films-list-container.js";
import FilmCardView from "../view/film-card.js";
import FilmsExtraView from "../view/films-extra.js";
import { render, RenderPosition } from "../utils/render.js";
import ShowMoreButtonView from "../view/button-show-more.js";
import FilmPopupView from "../view/film-popup.js";
import FilmCommentView from "../view/film-comment.js";
import NoFilmView from "../view/no-film.js";

const COUNT_PER_STEP = 5;


export default class Board {
  constructor(boardContainer) {
    this._renderedFilmCount = COUNT_PER_STEP;
    this._boardContainer = boardContainer /* <main> */;


    this._menu = new MenuView();
    this._sort = new SortView();
    this._films = new FilmsView();
    this._filmsList = new FilmsListView();
    this._filmsTitle = new FilmsTitleView();
    this._filmsListContainer = new FilmsListContainerView();
    this._filmsExtra = new FilmsExtraView();
    this._noFilm = new NoFilmView();

  }

  init(boardFilms) {
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    render(this._boardContainer, this._menu, RenderPosition.AFTERBEGIN); // отрисовали меню

    this._renderBoard();
  }

  _renderFilmBox() {
    // Метод для рендеринга контейнера для списка
    render(this._boardContainer, this._films, RenderPosition.BEFOREEND); // отрисовали элемент .films
    render(this._films, this._filmsList, RenderPosition.BEFOREEND); // отрисовали элемент .films-list
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._boardContainer, this._sort, RenderPosition.AFTERBEGIN);
  }

  _renderFilmCard(filmCard) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
    const filmComponent = new FilmCardView(filmCard);
    const filmPopup = new FilmPopupView(filmCard);

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
        render(filmCommentList, new FilmCommentView(filmCard.comments[i]), RenderPosition.BEFOREEND);
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

    render(this._filmsListContainer, filmComponent, RenderPosition.BEFOREEND);

  }

  _renderFilms(from, to) {
    // Метод для рендеринга N-задач за раз
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilmCard(boardFilm));
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
    render(this._filmsList, this._noFilm, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js

    let renderedFilmCount = COUNT_PER_STEP;
    const ShowMoreButtonComponent = new ShowMoreButtonView();

    render(this._filmsList, ShowMoreButtonComponent, RenderPosition.BEFOREEND);
    ShowMoreButtonComponent.setBtnClickHandler(() => {
      this._boardFilms.slice(renderedFilmCount, renderedFilmCount + COUNT_PER_STEP).forEach((filmCard) => this._renderFilmCard(filmCard));
      renderedFilmCount += COUNT_PER_STEP;
      if (renderedFilmCount >= this._boardFilms.length) {
        ShowMoreButtonComponent.getElement().remove();
      }
    });
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, COUNT_PER_STEP));

    if (this._boardFilms.length > COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    if (this._boardFilms.length === 0) {
      this._renderFilmBox();
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmBox();
    this._renderFilmsList();
  }
}
