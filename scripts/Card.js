import { openPopup } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const elementTemplate = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)
    return elementTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
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
    const popupImageSrc = this._element.querySelector('.card__image').src;
    const popupImageAlt = this._element.querySelector('.card__image').alt;
    popupImage.src = popupImageSrc;
    popupZoomCardCaption.textContent = popupImageAlt;
    openPopup(popupZoomCard);
  }

}

