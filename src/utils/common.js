export const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (elements) => {
  let element = elements[getRandomNumber(0, elements.length - 1)];
  return element;
};

export const buttonToggle = function (evt, buttons, ACTIVE_CLASS) {
  buttons.forEach(function (element) {
    element.classList.remove(ACTIVE_CLASS);
  });
  evt.target.classList.add(ACTIVE_CLASS);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const updateItem = function (items, update) {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};
