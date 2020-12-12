import Abstract from "./abstract.js";

const createFilmCommentTemplate = function (comment) {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.user}</span>
      <span class="film-details__comment-day">${comment.date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export default class FilmComment extends Abstract {
  constructor(comment) {
    super();
    this._comment = comment;
  }
  getTemplate() {
    return createFilmCommentTemplate(this._comment);
  }
}
