import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initialCards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
/*
import {
  cardsContainerSelector,
  popupZoomCardSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  editButton,
  addCardButton,
  elementsList,
  cardTemplate,
  popupEditProfile,
  profileNameElement,
  profileInfoElement,
  popupAddCardElement,
  nameInputElement,
  statusInputElement
} from '../utils/constants.js';
*/

const validateSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonElement: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  errorSelector: '.popup__input-error'

}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  token: '4f9c484d-5393-4899-94d9-a4e16dfc1364'
});


//Selectors
const cardsContainerSelector = '.elements__list';
const popupZoomCardSelector = '.popup_type_view-image';
const popupEditProfileSelector = '.popup_type_edit-profile';
const popupAddCardSelector = '.popup_type_add-new-card';

//Elements
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card__template');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileNameElement = document.querySelector('.profile__name');
const profileInfoElement = document.querySelector('.profile__status');
const popupAddCardElement = document.querySelector('.popup_type_add-new-card');

const nameInputElement = document.querySelector('.popup__input_type_name');
const statusInputElement = document.querySelector('.popup__input_type_status');


//Validation
const editProfileFormValidation = new FormValidator (validateSelectors, '.popup__form_type_edit-profile');
const addCardFormValidation = new FormValidator (validateSelectors, '.popup__form_type_add-new-card');

const userInfoSelectors = {
  nameSelector: '.profile__name',
  infoSelector: '.profile__status'
}

//USER INFO
const userInfo = new UserInfo(userInfoSelectors);

// Create Card List Section
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.setItem(card);
  }
},
  cardsContainerSelector
)
cardList.renderElements();

//EDIT PROFILE POPUP
const editProfilePopup = new PopupWithForm({
  submitFunction: (formData) => {
    userInfo.setUserInfo(formData);
    console.log(formData);
  }}, popupEditProfileSelector);
editProfilePopup.setEventListeners();

editButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  editProfilePopup.open();
  nameInputElement.value =  userInfo.getUserInfo().name;
  statusInputElement.value = userInfo.getUserInfo().info;
  editProfilePopup.open();
  editProfileFormValidation.resetValidation();
});


//ADD CARD POPUP
const addCardPopup = new PopupWithForm({
  submitFunction: (formData) => {
    const cardFromForm = createCard({name: formData.name, link: formData.link}, cardTemplate, handleCardClick);
    cardList.prepend(cardFromForm);
    addCardPopup.close();
  }
},popupAddCardSelector);
addCardPopup.setEventListeners();

function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

addCardButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardFormValidation.resetValidation();
});


//POPUP IMG
const popupImg = new PopupWithImage(popupZoomCardSelector);
popupImg.setEventListeners();

function handleCardClick(name, link) {
  popupImg.open(name,link);
}

addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();
