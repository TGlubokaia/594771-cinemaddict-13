const filmsToFilter = {
  all: {
    text: `All`,
    showNumber: false,
    counter: (films) => films.length,
  },
  favorites: {
    text: `Favorites`,
    showNumber: true,
    counter: (films) => films.filter((film) => film.isFavorite).length,
  },
  watchlist: {
    text: `Watchlist`,
    showNumber: true,
    counter: (films) => films.filter((film) => film.isToWatch).length,
  },
  history: {
    text: `History`,
    showNumber: true,
    counter: (films) => films.filter((film) => film.isWatched).length,
  }
};

export const generateFilter = (films) => {
  return Object.entries(filmsToFilter).map(([name, filter]) => {
    return {
      name,
      count: filter.counter(films),
      text: filter.text,
      number: filter.showNumber,
    };
  });
};
