import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ( { submitFunction }, popupSelector) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputlist = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._inputsValues = {};
    this._inputlist.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    })
    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
