export default class FormValidator {
  constructor (selectors, formElement) {
      this._formSelector = selectors.formSelector;
      this._inputSelector = selectors.inputSelector;
      this._buttonElement = selectors.buttonElement;
      this._inactiveButtonClass = selectors.inactiveButtonClass;
      this._inputErrorClass = selectors.inputErrorClass;
      this._errorClass = selectors.errorClass;
      this._formElement = formElement;
  }

  _setEventListeners(formElement) {
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
      };
      formElement.addEventListener("submit", handleFormSubmit);
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._buttonElement);
      const inputListIterator = (inputElement) => {
        const handleInput = () => {
          this._checkInputValidity(formElement, inputElement);
          this._toggleButtonState(inputList, buttonElement);
        };
        inputElement.addEventListener("input", handleInput);
      };
      inputList.forEach(inputListIterator);
      this._toggleButtonState(inputList, buttonElement);
  }

  _showInputError(inputElement, errorMessage, formElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
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
      const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

      if (hasNotValidInput) {
        buttonElement.disabled = true;
        buttonElement.classList.add(this._inactiveButtonClass);


      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._inactiveButtonClass);
      }
    };

  enableValidation() {
    const formElement = document.querySelector(this._formElement);
    this._setEventListeners(formElement);
    console.log(formElement);
   };

}
