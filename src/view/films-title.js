import Abstract from "./abstract.js";

const createFilmsTitleTemplate = function () {
  return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
};

export default class FilmsTitle extends Abstract {
  getTemplate() {
    return createFilmsTitleTemplate();
  }
} 