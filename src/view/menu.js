const createMenuItemLink = function (filter) {
  const {name, count, text, number} = filter;
  return `<a href="#${name}" class="main-navigation__item">${text} ${number ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

export const createMenuTemplate = function (filterArr) {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterArr.map((filter) => createMenuItemLink(filter)).join(``)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
