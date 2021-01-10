import Abstract from "./abstract.js";

const createFilmListContainerTemplate = function () {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsListContainer extends Abstract {
  getTemplate() {
    return createFilmListContainerTemplate();
  }
}
