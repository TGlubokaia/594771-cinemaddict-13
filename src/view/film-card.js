import Abstract from "./abstract.js";
import dayjs from "dayjs";

const generateShortDescription = function (desc) {
  if (desc.length > 140) {
    desc = desc.substring(0, 138) + `...`;
    return desc;
  } return desc;
};

const createFilmCardTemplate = function (film) {

  const {title, rating, date, duration, genre, url, description, comments, isFavorite, isToWatch, isWatched} = film;
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(date).format(`YYYY`)}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="${url}" alt="" class="film-card__poster">
  <p class="film-card__description">${generateShortDescription(description)}</p>
  <a class="film-card__comments">${!comments.length ? `` : comments.length}</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isToWatch ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._popupOpenHandler = this._popupOpenHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this); // фильтр
    this._historyClickHandler = this._historyClickHandler.bind(this); // фильтр
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this); // фильтр
  }
  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _popupOpenHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }
  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setPopupOpenHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._popupOpenHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._popupOpenHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._popupOpenHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);

  }
  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._historyClickHandler);

  }
  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);

  }
}
