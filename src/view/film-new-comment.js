import SmartView from "./smart.js";

const createEmojiTemplate = function (selectedEmoji) {
  return `<div class="film-details__add-emoji-label">${selectedEmoji ? `<img src="images/emoji/${selectedEmoji}.png" width="55" height="55" alt="emoji-${selectedEmoji}"></img>` : ``}
  </div>`
}

export default class FilmNewComment extends SmartView {
  constructor(selectedEmoji) {
    super();
    this._selectedEmoji = selectedEmoji;
    
    // this._emojiData = FilmNewComment.parseElementToData(this._selectedEmoji);
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
    return createEmojiTemplate(this._selectedEmoji);
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
 