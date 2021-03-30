import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFullImage = document.querySelector('.popup_type_view-image');
    this._popupFullImageCaption = document.querySelector('.popup__full-image-caption')
  }

  open(name, link) {
    this._popupFullImage.src = link;
    this._popupFullImage.alt = name;
    this._popupFullImageCaption.textContent = name;
    super.open();
  }
}
