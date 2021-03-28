import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js';

const popupEditProfileInfo = document.querySelector('.popup_type_edit-profile');
const popupCloseButton = popupEditProfileInfo.querySelector('.popup__close'); //close btn
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
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close'); //close btn
const popupAddCardSubmitButton = popupAddCard.querySelector('.popup__submit-button');
const formAddCard = popupAddCard.querySelector('.popup__form');
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
}

function closePopup(popup) {
   popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
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

function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function handleCardClick(name, link) {
  popupImage.src = link,
  popupZoomCardCaption.textContent = name
  openPopup(popupZoomCard)
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
popupEditProfileInfo.addEventListener('mousedown', closePopupByClick);
popupAddCard.addEventListener('mousedown', closePopupByClick);
popupZoomCard.addEventListener('mousedown', closePopupByClick);

const editProfileFormValidation = new FormValidator (validateSelectors, '.popup__form_type_edit-profile', '.profile__edit-button').enableValidation();
const addCardFormValidation = new FormValidator (validateSelectors, '.popup__form_type_add-new-card', '.profile__add-button').enableValidation();


