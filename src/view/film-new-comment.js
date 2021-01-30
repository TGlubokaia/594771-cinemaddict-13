import SmartView from "./smart.js";

const createEmojiTemplate = function (data) {
  const { _selectedEmoji } = data
  return `<div class="film-details__add-emoji-label">${_selectedEmoji ? `<img src="images/emoji/${_selectedEmoji}.png" width="55" height="55" alt="emoji-${_selectedEmoji}"></img>` : ``}
  </div>`
}

export default class FilmNewComment extends SmartView {
  constructor(selectedEmoji) {
    super();
    this._data = FilmNewComment.parseElementToData(selectedEmoji);
  }

  // reset(selectedEmoji) {
  //   this.updateData(
  //     FilmNewComment.parseElementToData(selectedEmoji, this._emojiData);
  //   );
  // }
  restoreHandlers() {
    return;
  }

  getTemplate() {
    return createEmojiTemplate(this._data);
  }

  setNewData(selectedEmoji) {
    this._data = FilmNewComment.parseElementToData(selectedEmoji);
  }

  static parseElementToData(element) {
    return Object.assign(
      {},
      {_selectedEmoji: element}
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
 