export const generateSortByDate = function (items) {
  items.sort((a, b) => {
    return parseFloat(a.releaseyear) - parseFloat(b.releaseyear);
  });
};

export const generateSortByRating = function (items) {
  items.sort((a, b) => {
    return parseFloat(a.rating) - parseFloat(b.rating);
  });
}