export default class Card {
  constructor(item, selectors, id, { handleCardClick, handleLikeClick, handleRecycleClick }) {
    this._id = id;
    this.item = item;
    this._ownerId = this.item.owner._id;
    this._link = item.link;
    this._title = item.name;
    this.isLiked = item.isLiked;
    this.id = item.cardId;
    this._isOwn = item.isOwn;
    this.likes = item.likes;

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
    .cloneNode(true)
    return cardElement;
  }

  _removeElement(element) {
    element.remove();
    element = null;
  }


  //compare id card
  _checkId() {
    if (this._ownerId !== this._id) {
      this._removeElement(this._binBtnElement);
    }
  }

  isLiked() {
    return this._isLiked;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._likeBtnElement = this._element.querySelector(this._likeBtnSelector);
    this._binBtnElement = this._element.querySelector(this._binBtnSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeCountElement = this._element.querySelector(this._likesCountSelector);
    //this._likeCountElement.textContent = this.likes ? this.likes : 0;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;


    this._checkId();
    this._setEventListeners();

    return this._element;
  }

  _addLikedClass() { ///CHECk
    this._likeBtnElement.classList.add(this._likedClass);
  }

  _removeLikedClass() {///CHECk
    this._likeBtnElement.classList.remove(this._likedClass);
  }




  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleCardClick(this.item));
    this._likeBtnElement.addEventListener('click', () => this._handleLikeClick(this.item));
    this._binBtnElement.addEventListener('click', () => this._handleRecycleClick(this));
  }

  setLikes(cardData) {
    this._likeCountElement.textContent = cardData.likes.length;
    this._isLiked = cardData.likes.filter((item) => {return item._id === this._id}).length > 0;
    if (this._isLiked) {
      this._like();
    }
    else {
      this._removeLikedClass();
    }
  }



  _like() {
    this._likeBtnElement.classList.toggle('card__like-button_active');
  }



  _deleteCard() {
    this._element.remove();
    this._element = null;
  }






}

