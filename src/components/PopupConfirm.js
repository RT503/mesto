import PopupWithForm from './PopupWithForm.js';

export default class PopupConfirm extends PopupWithForm {


  constructor( popupSelector) {


    //this._buttonLoadingText = 'Удаление...';
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');

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
<<<<<<< HEAD
    removeCard(this._cardData);

=======
    this._submit(this._cardData);
    this._form.removeEventListener('submit', this._submitEvtHandler);
>>>>>>> parent of f884069 (1 reviev)
  }



}
