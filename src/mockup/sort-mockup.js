export const generateSortByDate = function (items) {
  items.sort((a, b) => {
    return parseFloat(a.releaseyear) - parseFloat(b.releaseyear);
  });
};

export const generateSortByRating = function (items) {
  items.sort((a, b) => {
    return parseFloat(a.rating) - parseFloat(b.rating);
  });
};


// const filmsToSort = {
//   default: {
//     text: `Sort by default`,
//   },
//   date: {
//     text: `Sort by date`,
//   },
//   rating: {
//     text: `Sort by rating`,
//   }
// }

// export const generateSort = () => {
//   return Object.entries(filmsToSort).map(([, sort]) => {
//     return {
//       text: sort.text,
//     };
//   });
// };