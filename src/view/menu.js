import {createElement} from "../utils.js";
import {films} from "../main.js";
import {generateFilter} from "../mockup/menu-mockup";

const createMenuItemLink = function (filter) {
  const {name, count, text, number} = filter;
  return `<a href="#${name}" class="main-navigation__item">${text} ${number ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

const createMenuTemplate = function () {
  let filterArr = generateFilter(films);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterArr.map((filter) => createMenuItemLink(filter)).join(``)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};


export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate();
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
