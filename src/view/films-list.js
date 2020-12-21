import Abstract from "./abstract.js";

const createFilmListTemplate = function () {
  return `<div class="films-list__container"> </div>`;
};

export default class FilmsListContainer extends Abstract {
  getTemplate() {
    return createFilmListTemplate();
  }
}
