const selectorsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonElement: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, selectorsList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorsList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsList.errorClass);
}

const hideInputError = (formElement, inputElement, selectorsList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorsList.inputErrorClass);
  errorElement.classList.remove(selectorsList.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, selectorsList) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, selectorsList);
  } else {
      hideInputError(formElement, inputElement, selectorsList);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, selectorsList) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(selectorsList.inactiveButtonClass);
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(selectorsList.inactiveButtonClass);
  }

}
const setEventListeners = (formElement, selectorsList) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorsList.inputSelector));
  const buttonElement = formElement.querySelector(selectorsList.buttonElement);
  toggleButtonState(inputList, buttonElement, selectorsList);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, selectorsList);
          toggleButtonState(inputList, buttonElement, selectorsList);
      })
  })
}

const enableValidation = (selectorsList) => {
  const formList = Array.from(document.querySelectorAll(selectorsList.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
      })
      setEventListeners(formElement, selectorsList);
  })
}

enableValidation(selectorsList);
