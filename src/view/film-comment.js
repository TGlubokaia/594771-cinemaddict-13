import SmartView from "./smart.js";
import { EMOJIS } from "../utils/common.js";

const CHECKED = false;

const createComments = function (comments) {
  return comments.map((comment) => createFilmCommentTemplate(comment));
};


const createFilmCommentTemplate = function (comment) {
  return `
  <li class="film-details__comment">
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

const createEmojiListTemplate = function () {
  return EMOJIS.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${CHECKED ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`
    ).join(``);
};

const createFilmCommentsBlockTemplate = function (comments) {

  return `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    <ul class="film-details__comments-list">
    ${createComments(comments)}
    </ul>

    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${createEmojiListTemplate()}
      </div>
    </div>
  </section>
</div>`
}


export default class FilmComment extends SmartView {
  constructor(comments) {
    super();
    // this._data = FilmComment.parseElementToData(comments);
    this._comments = comments;
    this._newComment = {
      user: "user",
      date: "date",
      emoji: null,
      text: null,
    };

    this._setInnerHandlers();

    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this)
  }

  reset(comments) {
    this.updateData(
      FilmComment.parseElementToData(comments)
    );
  }



  getTemplate() {
    return createFilmCommentsBlockTemplate(this._comments);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._descriptionInputHandler);

    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this._emojiChangeHandler);
  }

  // _addNewComment() {
  //   if (!this._newComment.text && !this._newComment.emoji) {
  //     return
  //   }
  //   this._data.comments.push(this._newComment);
  //   this.updateData({
  //     comments,
  //   });
  //   this._newComment = {};
  // }

  _descriptionInputHandler(evt) {
    evt.preventDefault();
    this._newComment = Object.assign(
      {},
      this._newComment, 
      {text: evt.target.value}
    )
    console.log(this._newComment);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this._newComment = Object.assign(
      {},
      this._newComment, 
      {emoji: evt.target.value}
    )
    console.log(this._newComment);
  }




  static parseElementToData(element) {
    return Object.assign(
      {},
      element
    )
  }
 
  parseDataToElement(data) {
    data = Object.assign({}, data);

    // if () {
    // }

    // delete data.isDueDate;


    return data;
  }
}
