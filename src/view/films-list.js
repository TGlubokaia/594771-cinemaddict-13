import Abstract from "./abstract.js";

const createFilmsListTemplate = function () {
  return `<section class="films-list"></section>`;
};

export default class FilmsList extends Abstract {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
