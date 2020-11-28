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
import {ratings} from "./data-mockup.js"


const generateDescription = function () {
  let description = [];
  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    description.push(getRandomElement(descriptionSentences));
  }
  return description;
};

const generateComment = function () {
  return {
    emoji: getRandomElement(emojis),
    text: getRandomElement(commentTexts),
    user: getRandomElement(users),
    date: getRandomElement(releaseDate)
  };
};

const generateComments = function () {
  let comments = [];
  for (let i = 0; i < getRandomNumber(0, 5); i++) {
    comments.push(generateComment());
  }
  return comments;
};

export const generateFilmCard = function () {
   return {
    title: getRandomElement(titles), 
    rating: getRandomElement(ratings), 
    date: getRandomElement(releaseDate), 
    duration: getRandomElement(duration), 
    genre: getRandomElement(genres), 
    url: getRandomElement(postersUrls), 
    description: generateDescription(), 
    comments: generateComments().length,
  }
};