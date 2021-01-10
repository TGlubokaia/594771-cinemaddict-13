import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilmPopupView from "../view/film-popup.js";
import FilmCommentView from "../view/film-comment.js";
import FilmCardView from "../view/film-card.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN`
};

export default class FilmCard {
  constructor(filmsListContainer, changeData, changeMode) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmPopup = null;
    this._filmCard = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this); // фильтр
    this._handleHistoryClick = this._handleHistoryClick.bind(this); // фильтр
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this); // фильтр

  }

  init(filmCard) {
    this._filmCard = filmCard;
    const prevFilmCard = this._filmComponent;
    this._filmComponent = new FilmCardView(filmCard);
    this._filmPopup = new FilmPopupView(filmCard);

    this._filmComponent.setPopupOpenHandler(this._handleOpenClick);

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick); // фильтр
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick); // фильтр
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick); // фильтр

    if (!prevFilmCard) {
      render(this._filmsListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmCard);
    }
    remove(prevFilmCard);
  }

  destroy() {
    remove(this._filmComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _closePopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.body.classList.remove(`hide-overflow`);
    const allComments = document.querySelectorAll(`.film-details__comment`);
    for (let comment of allComments) {
      comment.remove();
    }
    document.body.removeChild(this._filmPopup.getElement());
    this._mode = Mode.DEFAULT;
  }

  _openPopup() {
    document.body.classList.add(`hide-overflow`);
    document.body.appendChild(this._filmPopup.getElement());
    const filmCommentList = document.querySelector(`.film-details__comments-list`);
    for (let i = 0; i < this._filmCard.comments.length; i++) {
      render(filmCommentList, new FilmCommentView(this._filmCard.comments[i]), RenderPosition.BEFOREEND);
    }
    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._handleCloseClick);
    this._changeMode();
    this._mode = Mode.OPEN;
  }

  _handleOpenClick() {
    this._openPopup();
  }

  _handleCloseClick(film) {
    this._closePopup();
    this._changeData(film);
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isFavorite: !this._filmCard.isFavorite
            }
        )
    );
  }

  _handleHistoryClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isWatched: !this._filmCard.isWatched
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isToWatch: !this._filmCard.isToWatch
            }
        )
    );
  }
}
