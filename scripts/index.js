import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupEditProfileInfo = document.querySelector('.popup_type_edit-profile');
const popupCloseButton = popupEditProfileInfo.querySelector('.popup__close');
const form = popupEditProfileInfo.querySelector('.popup__form');
const nameInput = popupEditProfileInfo.querySelector('.popup__input_type_name');
const statusInput = popupEditProfileInfo.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const editButton = document.querySelector('.profile__edit-button');

const popupZoomCard = document.querySelector('.popup_type_view-image');
const popupZoomCardCloseButton = popupZoomCard.querySelector('.popup__close_view-image');
const popupImage = popupZoomCard.querySelector('.popup__image');
const popupZoomCardCaption = popupZoomCard.querySelector('.popup__imagecaption');


const popupAddCard = document.querySelector('.popup_type_add-new-card');
const addButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');
const formAddCard = popupAddCard.querySelector('.popup__form');
const cardNameInput = popupAddCard.querySelector('.popup__input_type_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_picture-link');
const elementsList = document.querySelector('.elements__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validateSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonElement: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  errorSelector: '.popup__input-error'
}

initialCards.forEach((item) => {
  const card = new Card(item, '.card__template');
	const cardElement = card.generateCard();
	elementsList.append(cardElement);
});

function addNewCardFromForm(evt) {
  evt.preventDefault();
  const card = new Card({name: cardNameInput.value, link: cardLinkInput.value}, '.card__template', popupImage);
  const elementItem = card.generateCard();
  elementsList.prepend(elementItem);
  closePopup(popupAddCard);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  popupAddCardSubmitButton.classList.add('popup__submit-button_disabled');

}

export function openPopup(popup) {
  if (popup === popupAddCard) {
    cardNameInput.value = '';
    cardLinkInput.value = '';
  }

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);

}
/*
function resetValidation() {
  const inputs = document.querySelectorAll('.popup__input');
  const errors = document.querySelectorAll('.popup__input-error');
  const buttons = document.querySelectorAll('.popup__submit-button');
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  })
  errors.forEach((error) => {
    error.classList.remove('popup__input-error_visible');
  })
  buttons.forEach((button) => {
    button.classList.add('popup__submit-button_disabled');
  })
}
*/
function closePopup(popup) {
   popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
  FormValidator.resetValidation();
}

function showPopupEditProfileInfo() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(popupEditProfileInfo);

}

function handlePopupEditProfileInfoSubmitButton(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup(popupEditProfileInfo);
}

function closePopupByKey(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function closePopupByClick(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    closePopup(activePopup);
  }
}

editButton.addEventListener('click', showPopupEditProfileInfo);

popupCloseButton.addEventListener('click', () => closePopup(popupEditProfileInfo));
form.addEventListener('submit', handlePopupEditProfileInfoSubmitButton);
addButton.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
formAddCard.addEventListener('submit', addNewCardFromForm);
popupZoomCardCloseButton.addEventListener('click', () => closePopup(popupZoomCard));
popupEditProfileInfo.addEventListener('mousedown', closePopupByClick);
popupAddCard.addEventListener('mousedown', closePopupByClick);
form.addEventListener('mousedown', resetValidation);
popupZoomCard.addEventListener('mousedown', closePopupByClick);

const editProfileFormValidation = new FormValidator (validateSelectors, '.popup__form_type_edit-profile');
editProfileFormValidation.enableValidation();
editProfileFormValidation.resetValidation();
const addCardFormValidation = new FormValidator (validateSelectors, '.popup__form_type_add-new-card');
addCardFormValidation.enableValidation();
addCardFormValidation.resetValidation();

