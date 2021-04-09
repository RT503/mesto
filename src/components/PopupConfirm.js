import PopupWithForm from './PopupWithForm.js';

export default class PopupConfirm extends PopupWithForm {


  constructor({submitFunction}, popupSelector) {
    super({submitFunction}, popupSelector);

    this._buttonLoadingText = 'Удаление...';
    this._form = this._popup.querySelector('.popup__form');
    this._submit = submitFunction;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitEvtHandler();
    });
  }

  open(cardData) {
    super.open();
    this._cardData = cardData;
  }

  _submitEvtHandler() {
    this._submit(this._cardData);
    this._form.removeEventListener('submit', this._submitEvtHandler);
  }
}
