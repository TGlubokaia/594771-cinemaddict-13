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

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template; 
  return newElement.firstChild;
};
