import Abstract from "./abstract.js";

const createFilmsExtraTemplate = function (name) {
  return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${name}</h2>
      <div class="films-list__container">
      </div>
    </section>
  </section>`;
};

export default class FilmsExtra extends Abstract {
  constructor(name) {
    super();
    this._name = name;
  }
  getTemplate() {
    return createFilmsExtraTemplate(this._name);
  }
}
