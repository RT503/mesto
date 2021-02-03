const popup = document.querySelector('.popup');
const popupTitle = popup.querySelector('.popup__title');
const popupCloseButton = popup.querySelector('.popup__close');

const popupZoomCard = document.querySelector('.popup_type_view-image');
const popupZoomCardClose = popupZoomCard.querySelector('.popup__close_view-image');
const popupImage = popupZoomCard.querySelector('.popup__image');
const popupZoomCardCaption = popupZoomCard.querySelector('.popup__imagecaption');
const popupZoomCardCloseButton = popupZoomCard.querySelector('.popup__close_view-image');

const editButton = document.querySelector('.profile__edit-button');
const form = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const statusInput = popup.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const elementsList = document.querySelector('.elements__list');

const cardTemplate = document.querySelector('#card__template').content;

const popupAddCard = document.querySelector('.popup_type_add-new-card');
const addButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');


const formAddCard = popupAddCard.querySelector('.popup__form');
const cardNameInput = popupAddCard.querySelector('.popup__input_type_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_picture-link');


const buttonRemoveCard = document.querySelector('.card__remove-button');

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



  cardElement.querySelector('.card__image').addEventListener('click', function(evt){
    showPopupZoomCard();
    const cardName = evt.target.closest('.card').querySelector('.card__title');
    const cardImage = evt.target.closest('.card__image');
    popupImage.src = cardImage.src;
    popupImage.alt = cardName.textContent;
    popupZoomCardCaption.textContent = cardName.textContent;
  });




  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_active');
  });
  cardElement.querySelector('.card__remove-button').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  });

  elementsList.append(cardElement);
})



/** Попап Редактирование информации */


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

/**Попап добавления новой карточки */

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  let cardElementAddedManualy = cardTemplate.cloneNode(true);
  cardElementAddedManualy.querySelector('.card__image').src = cardLinkInput.value;
  cardElementAddedManualy.querySelector('.card__title').textContent = cardNameInput.value;


  cardElementAddedManualy.querySelector('.card__image').addEventListener('click', function(evt){
    showPopupZoomCard();
    const cardName = evt.target.closest('.card').querySelector('.card__title');
    const cardImage = evt.target.closest('.card__image');
    popupImage.src = cardImage.src;
    popupImage.alt = cardName.textContent;
    popupZoomCardCaption.textContent = cardName.textContent;
  });


  cardElementAddedManualy.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_active');
  });
  cardElementAddedManualy.querySelector('.card__remove-button').addEventListener('click', function(evt){
    evt.target.parentElement.remove();
  });


  elementsList.prepend(cardElementAddedManualy);

  closePopupAddCard();
}

/**Показать, спрятать попап добавления карточки */


function showPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
}

/**Попап увеличения карточки*/

function showPopupZoomCard() {
  popupZoomCard.classList.add('popup_opened');
}

function closePopupZoomCard() {
  popupZoomCard.classList.remove('popup_opened');
}




editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', showPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

popupZoomCardCloseButton.addEventListener('click', closePopupZoomCard);

