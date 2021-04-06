export const ESC = 'Escape';

//Selectors
const cardsContainerSelector = '.elements__list';
const popupZoomCardSelector = '.popup_type_view-image';
const popupEditProfileSelector = '.popup_type_edit-profile';
const popupAddCardSelector = '.popup_type_add-new-card';
const popupConfirmDeleteSelector = '.popup_confirm';

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



const userInfoSelectors = {
  nameSelector: '.profile__name',
  infoSelector: '.profile__status',
  avatarSelector: '.profile__avatar'
}

const validateSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonElement: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  errorSelector: '.popup__input-error'
}

export {
  popupConfirmDeleteSelector,
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
  statusInputElement,
  userInfoSelectors,
  validateSelectors
}
