export default class FormValidator {
  constructor (selectors, formElement) {
      this._formSelector = selectors.formSelector;
      this._inputSelector = selectors.inputSelector;
      this._buttonElement = selectors.buttonElement;
      this._inactiveButtonClass = selectors.inactiveButtonClass;
      this._inputErrorClass = selectors.inputErrorClass;
      this._errorClass = selectors.errorClass;
      this._formElement = document.querySelector(formElement);
      this._errorSelector = selectors.errorSelector;
      this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
      this._buttonElement = this._formElement.querySelector('.popup__submit-button');
  }

  _setEventListeners(formElement) {
    const handleFormSubmit = (evt) => {
      evt.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      };

      inputElement.addEventListener('input', handleInput);
    };
    this._inputList.forEach(inputListIterator);
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  _showInputError(inputElement, errorMessage, formElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState(inputList, buttonElement) {
      const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
      const hasNotValidInput = this._inputList.some(findAtLeastOneNotValid);
      if (hasNotValidInput) {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass);
      } else {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass);
      }
    };

  _deleteFormErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  resetValidation(){
    this._deleteFormErrors();
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }


  enableValidation() {
    this._setEventListeners(this._formElement);
   };
}


