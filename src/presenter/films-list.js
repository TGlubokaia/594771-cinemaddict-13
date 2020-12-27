import MenuView from "../view/menu.js";
import SortView from "../view/sort.js";
import FilmsView from "../view/films.js";
import FilmsListView from "../view/films-list.js";
import FilmsTitleView from "../view/films-title.js";
import FilmsListContainerView from "../view/films-list-container.js";
import { updateItem } from "../utils/common.js";
import FilmsExtraView from "../view/films-extra.js";
import { render, RenderPosition } from "../utils/render.js";
import ShowMoreButtonView from "../view/button-show-more.js";

import NoFilmView from "../view/no-film.js";
import FilmCardPresenter from "./film-card.js";

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
    this._showMoreButton = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._filmCardPresenter = {};

  }

  init(boardFilms) {
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    render(this._boardContainer, this._menu, RenderPosition.AFTERBEGIN);
    this._renderBoard();
  }

  _renderFilmBox() {
    render(this._boardContainer, this._films, RenderPosition.BEFOREEND); // отрисовали элемент .films
    render(this._films, this._filmsList, RenderPosition.BEFOREEND); // отрисовали элемент .films-list
  }

  _renderSort() {
    render(this._boardContainer, this._sort, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(filmCard) {
    const filmCardPresenter = new FilmCardPresenter(this._filmsListContainer);
    filmCardPresenter.init(filmCard);
    this._filmCardPresenter[filmCard.id] = filmCardPresenter;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilmCard(boardFilm));
  }

  _clearFilmsList() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmCount = COUNT_PER_STEP;
    remove(this._showMoreButton);
  }

  _handleFilmCardChange(updatedFilmCard) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilmCard);
    this._filmCardPresenter[updatedFilmCard.id].init(updatedFilmCard);
    }

  _renderNoFilms() {
    render(this._filmsList, this._noFilm, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsList, this._showMoreButton, RenderPosition.BEFOREEND);
    this._showMoreButton.setBtnClickHandler(this._handleShowMoreButtonClick);
  }
  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + COUNT_PER_STEP);
    this._renderedFilmCount += COUNT_PER_STEP;
    if (this._renderedFilmCount >= this._boardFilms.length) {
      this._showMoreButton.getElement().remove();
    }
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, COUNT_PER_STEP));

    if (this._boardFilms.length > COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {

    if (this._boardFilms.length === 0) {
      this._renderFilmBox();
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmBox();
    render(this._filmsList, this._filmsListContainer, RenderPosition.BEFOREEND);
    this._renderFilmsList();
  }
}
