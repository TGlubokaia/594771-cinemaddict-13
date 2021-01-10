import dayjs from "dayjs";

export const sortByDate = (film1, film2) => {
  return dayjs(film2.date).diff(dayjs(film1.date));
};

export const sortByRating = function (a, b) {
  return parseFloat(b.rating) - parseFloat(a.rating);
};
