import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilmPopupView from "../view/film-popup.js";
import FilmCommentView from "../view/film-comment.js";
import FilmCardView from "../view/film-card.js";

export default class FilmCard {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;
    this._filmComponent = null;
    this._filmPopup = null;
    this._filmCard = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    
  }

  init(filmCard) {
    this._filmCard = filmCard;
    const prevFilmCard = this._prevfilmCard;
    this._filmComponent = new FilmCardView(filmCard);
    this._filmPopup = new FilmPopupView(filmCard);

    this._filmComponent.setPopupOpenHandler(this._handleOpenClick);

    if (prevFilmCard === null) {
      render(this._filmsListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._filmsListContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmComponent, prevFilmCard);
    }
    remove(prevFilmCard);

  }

  destroy() {
    remove(this._prevfilmCard);

  }


  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  };

  _closePopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.body.classList.remove(`hide-overflow`);
    const allComments = document.querySelectorAll(`.film-details__comment`);
    for (let comment of allComments) {
      comment.remove();
    }
    document.body.removeChild(this._filmPopup.getElement());
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
  }

  _handleOpenClick() {
    this._openPopup()
  }

  _handleCloseClick() {
    this._closePopup()
  }

}