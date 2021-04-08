import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ( { submitFunction, }, popupSelector) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._buttonText = this._submitButton.textContent;
    this._buttonLoadingText = 'Сохранение...';

  }

  _getInputValues() {
    this._inputlist = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._inputsValues = {};
    this._inputlist.forEach((input) => {
      this._inputsValues[input.name] = input.value;
      console.log(this._inputsValues);
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



  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._buttonLoadingText;
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  showResponseError (err) {
    this._submitButton.textContent = err;
    this._submitButton.classList.add('popup__button_error');
  }

  hideResponseError () {
    this._submitButton.textContent = this._buttonText;
    this._submitButton.classList.remove('popup__button_error');
  }
}
