import dayjs from "dayjs";
import {getRandomNumber} from "../utils.js";
import {getRandomElement} from "../utils.js";
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

const generateDescription = function () {
  let description = [];
  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    description.push(getRandomElement(descriptionSentences));
  }
  return description;
};

const generateShortDescription = function () {
  let description = generateDescription().join(` `);
  if (description.length > 140) {
    return description = description.substring(0, 138) + `...`;
  } return description
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
  for (let i = 1; i < getRandomNumber(1, 3); i++) {
    genresArr.push(getRandomElement(genres));
  }
  return genresArr;
};

export const generateFilmCard = function () {
  let commentsArr = generateComments();
   return {
    title: getRandomElement(titles), 
    originaltitle: getRandomElement(originalTitles),
    rating: getRandomElement(ratings), 
    agerating: getRandomElement(ageRating),
    releaseyear: dayjs(getRandomElement(releaseDate)).format('YYYY'),
    date: getRandomElement(releaseDate), 
    commentdate: getRandomElement(commentDate),
    duration: getRandomElement(duration), 
    genre: generateGenres()[0], 
    genrepopup: generateGenres(),
    url: getRandomElement(postersUrls), 
    shortdescription: generateShortDescription(),
    description: generateDescription().join(` `), 
    commentslength: commentsArr.length,
    comments: commentsArr,
    country: getRandomElement(country),
    director: getRandomElement(directors),
    writters: getRandomElement(writters),
    actors: getRandomElement(actors),
  }
}