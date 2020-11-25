const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup__title');
const popupContent = document.querySelector('.popup__content');
const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('popup__form');
let nameInput = document.querySelector('popup__input_type_name');
let statusInput = document.querySelector('popup__input_type_status');

function showPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
  evt.preventDefault();
}
