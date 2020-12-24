import Abstract from "./abstract.js";
// import {generateSort} from "../mockup/sort-mockup.js";

// const createSortItemLink = function (sortItem) {
//   const {text} = sortItem;
//   return `<li><a href="#" class="sort__button ${text === `Sort by default` ? `sort__button--active` : ``}">${text}</a></li>`
// };

// const createSortTemplate = function () {
//   // let sorts = generateSort();
//   // return `<ul class="sort">
//   //   ${sorts.map((sort) => createSortItemLink(sort)).join(``)}
//   //   </ul>`;
// };



const createSortTemplate = function () {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;
};

export default class Sort extends Abstract {
  getTemplate() {
    return createSortTemplate();
  }
};
