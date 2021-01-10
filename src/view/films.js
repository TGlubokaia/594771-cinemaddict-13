import Abstract from "./abstract.js";

const createFilmsTemplate = function () {
  return `<section class="films"></section>`;
};

export default class Films extends Abstract {
  getTemplate() {
    return createFilmsTemplate();
  }
}
