import Abstract from "./abstract.js";

const createFilmsContainerTemplate = function () {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  </section>`;
};

export default class FilmsContainer extends Abstract {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
