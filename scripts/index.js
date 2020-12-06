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




//6 карточек
let cardElement = cardTemplate.cloneNode(true);
cardElement.querySelector('.card__image').src = 'images/dombay.png';
cardElement.querySelector('.card__image').alt = 'Домбай';
cardElement.querySelector('.card__title').textContent = 'Домбай';
elementsList.append(cardElement);

let cardElement1 = cardTemplate.cloneNode(true);
cardElement1.querySelector('.card__image').src = 'images/elbrus.png';
cardElement1.querySelector('.card__image').alt = 'Гора Эльбрус';
cardElement1.querySelector('.card__title').textContent = 'Гора Эльбрус';
elementsList.append(cardElement1);

let cardElement2 = cardTemplate.cloneNode(true);
cardElement2.querySelector('.card__image').src = 'images/karachaevsk.png';
cardElement2.querySelector('.card__image').alt = 'Карачаевск';
cardElement2.querySelector('.card__title').textContent = 'Карачаевск';
elementsList.append(cardElement2);

let cardElement3 = cardTemplate.cloneNode(true);
cardElement3.querySelector('.card__image').src = 'images/Mont-Saint-Michel.jpg';
cardElement3.querySelector('.card__image').alt = 'Мон-Сен-Мишель';
cardElement3.querySelector('.card__title').textContent = 'Мон-Сен-Мишель';
elementsList.append(cardElement3);

let cardElement4 = cardTemplate.cloneNode(true);
cardElement4.querySelector('.card__image').src = 'images/roma.jpg';
cardElement4.querySelector('.card__image').alt = 'Рим';
cardElement4.querySelector('.card__title').textContent = 'Рим';
elementsList.append(cardElement4);

let cardElement5 = cardTemplate.cloneNode(true);
cardElement5.querySelector('.card__image').src = 'images/belgique.jpg';
cardElement5.querySelector('.card__image').alt = 'Бельгия';
cardElement5.querySelector('.card__title').textContent = 'Бельгия';
elementsList.append(cardElement5);





let likeButton = document.querySelector('.card__like-button');

console.log(likeButton);




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




likeButton.addEventListener('click', function(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_active');

})
