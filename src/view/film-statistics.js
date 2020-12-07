import {createElement} from "../utils.js";

export const createStatisticsTemplate = function (number) {
  return `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`;
};


export default class Statistics {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._count);
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
