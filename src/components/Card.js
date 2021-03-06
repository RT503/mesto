export default class Card {
  constructor(item, selectors, id, { handleCardClick, handleLikeClick, handleRecycleClick }) {
    this._id = id;

    this.item = item;
    this._ownerId = this.item.owner._id;
    this._title = item.name;
    this._image = item.link;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRecycleClick = handleRecycleClick;

    this._templateSelector = selectors.templateSelector;
    this._cardSelector = selectors.cardSelector;
    this._titleSelector = selectors.titleSelector;
    this._imageSelector = selectors.imageSelector;
    this._binBtnSelector = selectors.binBtnSelector;
    this._likeBtnSelector = selectors.likeBtnSelector;
    this._likesCountSelector = selectors.likesCountSelector;
    this._likedClass = selectors.likedClass;

    }

    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector(this._cardSelector)
        .cloneNode(true);
      return cardElement;
    }

    _removeElement(element) {
      element.remove();
      element = null;
    }

    _addLikedClass() {
      this._likeBtnElement.classList.add(this._likedClass);
    }

    _removeLikedClass() {
      this._likeBtnElement.classList.remove(this._likedClass);
    }

    _checkId() {
      if (this._ownerId !== this._id) {
        this._removeElement(this._binBtnElement);
      }
    }


  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._likeBtnElement = this._element.querySelector(this._likeBtnSelector);
    this._binBtnElement = this._element.querySelector(this._binBtnSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeCountElement = this._element.querySelector(this._likesCountSelector);

    this._titleElement.textContent = this._title;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;

    this.setLikes(this.item);
    this._checkId();
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleCardClick(this.item));
    this._likeBtnElement.addEventListener('click', () => this._handleLikeClick(this.item));
    this._binBtnElement.addEventListener('click', () => this._handleRecycleClick(this));
  }

  isLiked() {
    return this._isLiked;
  }

  setLikes(cardData) {
    this._likeCountElement.textContent = cardData.likes.length;
    this._isLiked = cardData.likes.some((item) => {return item._id === this._id});
    if (this._isLiked) {
      this._addLikedClass();
    }
    else {
      this._removeLikedClass();
    }
  }

  removeCard() {
    this._removeElement(this._element);
  }

}

