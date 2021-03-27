export default class Card {
  constructor(data, cardTemplate) {
    this._link = data.link;
    this._title = data.name;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const elementTemplate = this._cardTemplate
    .content
    .querySelector('.card')
    .cloneNode(true)
    return elementTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.card__remove-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _like() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');

  }

  _deleteCard() {
    this._element.querySelector('.card__remove-button').parentElement.remove();
  }

  _handleCardClick() {
    const popupZoomCard = document.querySelector('.popup_type_view-image');
    const popupImage = popupZoomCard.querySelector('.popup__image');
    const popupZoomCardCaption = popupZoomCard.querySelector('.popup__imagecaption');
    const popupImageSrc = this._cardImage.src;
    const popupImageAlt = this._cardImage.alt;
    popupImage.src = popupImageSrc;
    popupZoomCardCaption.textContent = popupImageAlt;
    popupZoomCard.classList.add('popup_opened');
  }
}

