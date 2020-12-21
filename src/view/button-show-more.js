import Abstract from "./abstract.js";

const createBtnShowMoreTemplate = function () {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton extends Abstract {
  constructor() {
    super();
    this._btnClickHandler = this._btnClickHandler.bind(this);
  }
  getTemplate() {
    return createBtnShowMoreTemplate();
  }

  _btnClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setBtnClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._btnClickHandler);
  }
}
