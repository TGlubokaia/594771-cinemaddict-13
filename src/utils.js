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
