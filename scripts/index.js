import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js';

const popupEditProfileInfo = document.querySelector('.popup_type_edit-profile');
const popupCloseButton = popupEditProfileInfo.querySelector('.popup__close'); //close btn
const form = popupEditProfileInfo.querySelector('.popup__form');  // Profile form
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
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close'); //close btn
const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');
const formAddCard = popupAddCard.querySelector('.popup__form'); // Add card Form
const cardNameInput = popupAddCard.querySelector('.popup__input_type_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_picture-link');
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card__template');

const validateSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonElement: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  errorSelector: '.popup__input-error'

}

const editProfileFormValidation = new FormValidator (validateSelectors, '.popup__form_type_edit-profile');
const addCardFormValidation = new FormValidator (validateSelectors, '.popup__form_type_add-new-card');

//CARD CREATE

function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
   const cardElement = createCard(item);
   elementsList.append(cardElement);
});

function addNewCardFromForm(evt) {
  evt.preventDefault();
  const elementItem = createCard({name: cardNameInput.value, link: cardLinkInput.value}, cardTemplate, handleCardClick);
  elementsList.prepend(elementItem);
  closePopup(popupAddCard);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  popupAddCardSubmitButton.classList.add('popup__submit-button_disabled');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
  popup.addEventListener('mousedown', closePopupByClick);
}

function showPopupEditProfileInfo() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(popupEditProfileInfo);
  editProfileFormValidation.resetValidation();
}

function handleCardClick(name, link) {
  popupImage.src = link,
  popupImage.alt = name,
  popupZoomCardCaption.textContent = name,
  openPopup(popupZoomCard)
}



//POPUP CLOSERS

function closePopupByClick(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    closePopup(activePopup);
  }
}

function closePopup(popup) {
  popupWithFormCloseHandler();
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
  popup.removeEventListener('mousedown', closePopupByClick);
}

function popupWithFormCloseHandler() {
  addCardFormValidation.resetValidation();
  editProfileFormValidation.resetValidation();
}

function closePopupByKey(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function handlePopupEditProfileInfoSubmitButton(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  editProfileFormValidation.resetValidation();
  closePopup(popupEditProfileInfo);
}


//opener profile popup
editButton.addEventListener('click', showPopupEditProfileInfo);

popupCloseButton.addEventListener('click', () => closePopup(popupEditProfileInfo));
form.addEventListener('submit', handlePopupEditProfileInfoSubmitButton);

//opener addCard popup
addButton.addEventListener('click', () => openPopup(popupAddCard));


popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
formAddCard.addEventListener('submit', addNewCardFromForm);
popupZoomCardCloseButton.addEventListener('click', () => closePopup(popupZoomCard));


addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();


