let popup = document.querySelector('.popup');
let popupTitle = popup.querySelector('.popup__title');
let popupCloseButton = popup.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
let form = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let statusInput = popup.querySelector('.popup__input_type_status');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let elementsList = document.querySelector('.elements__list');

let cardTemplate = document.querySelector('#card__template').content;

let popupAddCard = document.querySelector('.popup_type_add-new-card');
let addButton = document.querySelector('.profile__add-button');
let popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');


let formAddCard = popupAddCard.querySelector('.popup__form');
let cardNameInput = popupAddCard.querySelector('.popup__input_type_name');
let cardLinkInput = popupAddCard.querySelector('.popup__input_type_picture-link');


let buttonRemoveCard = document.querySelector('.card__remove-button');

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

initialCards.forEach(function(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_active');
  });
  cardElement.querySelector('.card__remove-button').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  });
  elementsList.append(cardElement);
})

function showPopup() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
  closePopup();
}

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  let cardElementAddedManualy = cardTemplate.cloneNode(true);
  cardElementAddedManualy.querySelector('.card__image').src = cardLinkInput.value;
  cardElementAddedManualy.querySelector('.card__title').textContent = cardNameInput.value;

  cardElementAddedManualy.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_active');
  });
  cardElementAddedManualy.querySelector('.card__remove-button').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  });
  elementsList.prepend(cardElementAddedManualy);

  closePopupAddCard();
}

function showPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', showPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);
