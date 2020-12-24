import Abstract from "./abstract.js";
import {films} from "../main.js";
import {generateFilter} from "../mockup/menu-mockup";

const createMenuItemLink = function (filter) {
  const {name, count, text, number} = filter;
  return `<a href="#${name}" class="main-navigation__item">${text} ${number ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

const createMenuTemplate = function () {
  let filters = generateFilter(films);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filters.map((filter) => createMenuItemLink(filter)).join(``)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Menu extends Abstract {
  getTemplate() {
    return createMenuTemplate();
  }
}
