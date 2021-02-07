const popupEditProfileInfo = document.querySelector('.popup_type_edit-profile');
const popupCloseButton = popupEditProfileInfo.querySelector('.popup__close');
const popupZoomCard = document.querySelector('.popup_type_view-image');
const popupZoomCardClose = popupZoomCard.querySelector('.popup__close_view-image');
const popupImage = popupZoomCard.querySelector('.popup__image');
const popupZoomCardCaption = popupZoomCard.querySelector('.popup__imagecaption');
const popupZoomCardCloseButton = popupZoomCard.querySelector('.popup__close_view-image');
const editButton = document.querySelector('.profile__edit-button');
const form = popupEditProfileInfo.querySelector('.popup__form');
const nameInput = popupEditProfileInfo.querySelector('.popup__input_type_name');
const statusInput = popupEditProfileInfo.querySelector('.popup__input_type_status');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function removeCard(evt) {
  evt.target.parentElement.remove();
}

function getCardElement(link, name) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardRemoveButton = cardElement.querySelector('.card__remove-button');
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardImage.addEventListener('click', showPopupZoomCard);
  cardLikeButton.addEventListener('click', toggleLike);
  cardRemoveButton.addEventListener('click', removeCard);
  return cardElement;
}

initialCards.forEach(function(card) {
  const newCard = getCardElement(card.link, card.name);
  elementsList.append(newCard);
})

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

function addNewCardFromForm(evt) {
  evt.preventDefault();
  const cardElementAddedManually = getCardElement(cardLinkInput.value, cardNameInput.value);
  elementsList.prepend(cardElementAddedManually);
  closePopup(popupAddCard);
}

function showPopupZoomCard(evt) {
  const cardName = evt.target.closest('.card').querySelector('.card__title');
  const cardImage = evt.target.closest('.card__image');
  popupImage.src = cardImage.src;
  popupImage.alt = cardName.textContent;
  popupZoomCardCaption.textContent = cardName.textContent;
  openPopup(popupZoomCard);
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
popupZoomCard.addEventListener('mousedown', closePopupByClick);

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
