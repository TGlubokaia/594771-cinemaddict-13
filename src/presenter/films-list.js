import MenuView from "../view/menu.js";
import SortView from "../view/sort.js";
import FilmsView from "../view/films.js";
import FilmsListView from "../view/films-list.js";
import FilmsTitleView from "../view/films-title.js";
import FilmsListContainerView from "../view/films-list-container.js";
// import FilmCard from "../view/film-card.js";
import FilmsExtraView  from "../view/films-extra.js";
// import {render, RenderPosition} from "../utils/render.js";
// import ShowMoreButtonView  from "../view/button-show-more.js";
// import FilmPopupView  from "../view/film-popup.js";
// import FilmCommentView  from "../view/film-comment.js";
import NoFilmView from "../view/no-film.js";

const COUNT_PER_STEP = 5;





export default class Board {
  constructor(boardContainer) {
    this._renderedFilmCount = COUNT_PER_STEP;
    this._boardContainer = boardContainer /* <main> */;


    this.menu = new MenuView();
    this._sort = new SortView();
    this._films = new FilmsView();
    this._filmsList = new FilmsListView();
    this._filmsTitle = new FilmsTitleView();
    this._filmsListContainer = new FilmsListContainerView();
    this._filmsExtra = new FilmsExtraView();
    this._noFilm = new NoFilmView();

  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js

    render(this._boardContainer /* <main> */, this.menu, RenderPosition.AFTERBEGIN); // отрисовали меню
    render(this._boardContainer /* <main> */, this._films, RenderPosition.BEFOREEND); // отрисовали элемент .films
    render(this._films /* <main> */, this._filmsList, RenderPosition.BEFOREEND); // отрисовали элемент .films-list

    this._renderBoard();
  }
  _renderMenu() {
    // Метод для рендеринга меню
  }
  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilmCard() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderFilmsList(from, to) {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoFilms() {
    render(this._filmsList /* <main> */, this._noFilm, RenderPosition.BEFOREEND); // отрисовали отсутствие карточек
    // Метод для рендеринга заглушки
  }

  _renderShowMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmsList();

    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
