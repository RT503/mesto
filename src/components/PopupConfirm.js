import PopupWithForm from './PopupWithForm.js';

export default class PopupConfirm extends PopupWithForm {
  constructor ( { submitFunction }, popupSelector) {
    super( { submitFunction }, popupSelector);

    this._buttonLoadingText = 'Удаление...';
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  _setEventListeners () {
    super._setEventListeners();

    this._submitButton('click', this.confirmDelete);
  }

  open(card, cardId) {
    super.open();

    this.card = card;
    this.cardId = cardId;
  }

  confirmDelete () {
    this._submitHandler(this.cardId);
  }
}
