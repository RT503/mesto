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
    this._likes = item.likes;
    this._userId = item.currentUserId;
    this._ownerId = item.owner._id;
    this._cardId = item._id;

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

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _updateLikesView() {
    this._element.querySelector('.card__counter').textContent = this._likes.length;
    //if (this.isLiked()) this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');

  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._updateLikesView();
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


  id() {
    return this._cardId;
  }

  generateCard() {
    this._element = this._getTemplate();                                                //This._element decl
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._likeBtnElement = this._element.querySelector(this._likeBtnSelector);
    this._binBtnElement = this._element.querySelector(this._binBtnSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeCountElement = this._element.querySelector(this._likesCountSelector);
    this._likeCountElement.textContent = this.likes ? this.likes : 0;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;


    this._checkId();
    this._setEventListeners();

    this._updateLikesView();

    return this._element;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleCardClick(this.item));
    this._likeBtnElement.addEventListener('click', () => this._handleLikeClick(this.item));
    this._binBtnElement.addEventListener('click', () => this._handleRecycleClick(this));
  }





  deleteCard() {
    this._element.remove();
    this._element = null;
  }






}

