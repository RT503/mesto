import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initialCards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';

import {
  popupConfirmDeleteSelector,
  cardsContainerSelector,
  popupZoomCardSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  editButton,
  addCardButton,
  //elementsList,
  cardTemplate,
  //popupEditProfile,
  //profileNameElement,
  //profileInfoElement,
  //popupAddCardElement,
  nameInputElement,
  statusInputElement,
  userInfoSelectors,
  validateSelectors
} from '../utils/constants.js';




const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  authorization: '4f9c484d-5393-4899-94d9-a4e16dfc1364'
});


//Validation
const editProfileFormValidation = new FormValidator (validateSelectors, '.popup__form_type_edit-profile');
const addCardFormValidation = new FormValidator (validateSelectors, '.popup__form_type_add-new-card');



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

//CONSIRM DELETE POPUP

const confirmDeletePopup = new PopupConfirm(
  (cardId) => {
    confirmDeletePopup.renderLoading(true);

    api.deleteCard(cardId)
      .then(() => {
        confirmDeletePopup.card.removeCard();
        confirmDeletePopup.renderLoading(false);
        confirmDeletePopup.close();
      })
      .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
        confirmDeletePopup.showResponseError(err);
      });
  }, popupConfirmDeleteSelector
);



//EDIT PROFILE POPUP
const editProfilePopup = new PopupWithForm({
  submitFunction: (formData) => {


    editProfilePopup.renderLoading(true);

    api.patchUserInfo(formData)
      .then(() => {
        userInfo.setUserInfo(formData);
        editProfilePopup.renderLoading(false);
        editProfilePopup.close();
      })
      .catch(err => {
        console.log(`Что то пошло не так: ${err}`);
        editProfilePopup.showResponseError(err);
      })
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
  const card = new Card(item, cardTemplate, handleCardClick, confirmDeletePopup.open, api.toggleLike);
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


Promise.all([api.fetchUserInfo(), api.fetchInitialCards()])
  .then(([userData, initialCards]) => {

    const serverUserInfo = {};
    serverUserInfo.name = userData.name;
    serverUserInfo.status = userData.about;
    serverUserInfo.avatar = userData.avatar;
    const userId = userData._id;
    userInfo.setUserInfo(serverUserInfo);

    initialCards.forEach(cardObject => {
      const data = {
        cardId: cardObject._id,
        isOwn: (cardObject.owner._id === userID) ? true : false,
        likes: cardObject.likes.length,
        isLiked: false,
        author: cardObject.owner.name,
        name: cardObject.name,
        link: cardObject.link
      };

      if (cardObject.likes.some(like => like._id === userID)) {
        data.isLiked = true;
      }

      const card = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike).generateCard();
      cardsSection.appendItem(card);
    });
  })
  .catch(err => {
    //console.log(`Что-то пошло не так: ${err}`);
  });
