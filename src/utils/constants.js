export const ESC = 'Escape';


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

export {
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
