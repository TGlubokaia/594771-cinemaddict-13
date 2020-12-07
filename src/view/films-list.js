import {createElement} from "../utils.js";

const createFilmListTemplate = function () {
  return `<div class="films-list__container"> </div>`;
};

export default class FilmsListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
