import SmartView from "./smart.js";
import { EMOJIS } from "../utils/common.js";
import FilmNewComment from "./film-new-comment.js";
import {render, RenderPosition} from "../utils/render.js";

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

const createEmojiListTemplate = function (selectedEmoji) {
  return Object.keys(EMOJIS).map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${emoji !== selectedEmoji ? `` : `checked`}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>`
  ).join(``);
};

const createFilmCommentsBlockTemplate = function (comments, selectedEmoji, emojiComponent) {

  return `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    <ul class="film-details__comments-list">
    ${createComments(comments)}
    </ul>

    <div class="film-details__new-comment">
      ${emojiComponent.getTemplate()}

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${createEmojiListTemplate(selectedEmoji)}
      </div>
    </div>
  </section>
</div>`
}


export default class FilmComment extends SmartView {
  constructor(comments) {
    super();
    this._comments = comments;
    this._data = FilmComment.parseElementToData(comments); // backup
    this._selectedEmoji = null;
    this._emojiComponent = new FilmNewComment(this._selectedEmoji);
    this._emojiData = Object.assign({}, this._emojiComponent); // backup
   
    // this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._setInnerHandlers();
  }

  // reset(comments) {
  //   this.updateData(
  //     FilmComment.parseElementToData(comments)
  //   );
  // }

  getTemplate() {
    return createFilmCommentsBlockTemplate(this._comments, this._selectedEmoji, this._emojiComponent);
  }

  _setInnerHandlers() {
    // this.getElement()
    //   .querySelector(`.film-details__comment-input`)
    //   .addEventListener(`input`, this._descriptionInputHandler);

    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this._emojiChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
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

  // _descriptionInputHandler(evt) {
  //   evt.preventDefault();
  //   this._newComment = Object.assign(
  //     {},
  //     this._newComment, 
  //     {text: evt.target.value}
  //   )
  //   console.log(this._newComment);
  // }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    const radio = Array.from(this.getElement().querySelectorAll(`.film-details__emoji-item`)).find((item) => item.checked);
    this._selectedEmoji = radio.value;

    this._emojiComponent.updateData({_selectedEmoji: this._selectedEmoji}, this._emojiData);

  }

  static parseElementToData(element) {
    return Object.assign(
      {},
      element
    )
  }

  // parseDataToElement(data) {
  //   data = Object.assign({}, data);
  //   // if () {
  //   // }
  //   // delete data.isDueDate;
  //   return data;
  // }
}
