import dayjs from "dayjs";
import {getRandomNumber} from "../utils/common.js";
import {getRandomElement} from "../utils/common.js";
import {descriptionSentences} from "./data-mockup.js";
import {titles} from "./data-mockup.js";
import {originalTitles} from "./data-mockup.js";
import {directors} from "./data-mockup.js";
import {writters} from "./data-mockup.js";
import {actors} from "./data-mockup.js";
import {releaseDate} from "./data-mockup.js";
import {duration} from "./data-mockup.js";
import {country} from "./data-mockup.js";
import {genres} from "./data-mockup.js";
import {postersUrls} from "./data-mockup.js";
import {commentTexts} from "./data-mockup.js";
import {emojis} from "./data-mockup.js";
import {users} from "./data-mockup.js";
import {ratings} from "./data-mockup.js";
import {ageRating} from "./data-mockup.js";
import {commentDate} from "./data-mockup.js";


const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDescription = function () {
  let description = [];
  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    description.push(getRandomElement(descriptionSentences));
  }
  return description.join(` `);
};

const generateComment = function () {
  return {
    emoji: getRandomElement(emojis),
    text: getRandomElement(commentTexts),
    user: getRandomElement(users),
    date: getRandomElement(releaseDate)
  };
};

export const generateComments = function () {
  let comments = [];
  for (let i = 0; i < getRandomNumber(0, 5); i++) {
    comments.push(generateComment());
  }
  return comments;
};

const generateGenres = function () {
  let genresArr = [];
  for (let i = 0; i < 3; i++) {
    genresArr.push(getRandomElement(genres));
  }
  return genresArr;
};

export const generateFilmCard = function () {
  return {
    id: generateId(),
    title: getRandomElement(titles),
    originaltitle: getRandomElement(originalTitles),
    rating: getRandomElement(ratings),
    agerating: getRandomElement(ageRating),
    releaseyear: dayjs(getRandomElement(releaseDate)).format(`YYYY`),
    date: getRandomElement(releaseDate),
    commentdate: getRandomElement(commentDate),
    duration: getRandomElement(duration),
    genre: generateGenres(),
    genrepopup: generateGenres(),
    url: getRandomElement(postersUrls),
    description: generateDescription(),
    comments: generateComments(),
    country: getRandomElement(country),
    director: getRandomElement(directors),
    writters: getRandomElement(writters),
    actors: getRandomElement(actors),
    isFavorite: !!getRandomNumber(0, 1),
    isToWatch: !!getRandomNumber(0, 1),
    isWatched: !!getRandomNumber(0, 1),
  };
};
