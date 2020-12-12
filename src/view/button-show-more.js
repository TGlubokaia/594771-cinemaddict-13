import Abstract from "./abstract.js";

const createBtnShowMoreTemplate = function () {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton extends Abstract {
  getTemplate() {
    return createBtnShowMoreTemplate();
  }
}
