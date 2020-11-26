let popup = document.querySelector('.popup');
let popupTitle = document.querySelector('.popup__title');
let popupContent = document.querySelector('.popup__content');
let popupCloseButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let statusInput = document.querySelector('.popup__input_type_status');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

function showPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSubmitButton.addEventListener('click', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup();
}
