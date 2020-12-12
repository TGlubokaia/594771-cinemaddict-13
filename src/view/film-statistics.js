import Abstract from "./abstract.js";

export const createStatisticsTemplate = function (number) {
  return `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`;
};

export default class Statistics extends Abstract {
  constructor(count) {
    super();
    this._count = count;
  }
  getTemplate() {
    return createStatisticsTemplate(this._count);
  }
}
