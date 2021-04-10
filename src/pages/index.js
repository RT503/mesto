import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';

import {
  cardsListSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupZoomCardSelector,
  popupAvatarSelector,
  popupConfirmDeleteSelector,
  buttonEditProfileElement,
  buttonAddNewCardElement,
  buttonEditAvatarElement,
  popupEditProfileNameInputElement,
  popupEditProfileAboutInputElement,
  userInfoSelectors,
  validateSelectors,
  cardSelectors,
  id
} from '../utils/constants.js';


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  authorization: '4f9c484d-5393-4899-94d9-a4e16dfc1364'
});

//Validation
const editProfileFormValidation = new FormValidator (validateSelectors, '.popup__form_type_edit-profile');
const addCardFormValidation = new FormValidator (validateSelectors, '.popup__form_type_add-new-card');
const editAvatarFormValidation = new FormValidator (validateSelectors, '.popup__form_edit-avatar');


//USER INFO

const userInfo = new UserInfo(userInfoSelectors);


// Create Card List Section

const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardList.setItem(card);
  }
}, cardsListSelector);


api.getAllData()
.then((data) => {
  const [userData, cardsData] = data;
  id.myId = userData._id;
  userInfo.setUserInfo(userData);
  cardList.renderItems(cardsData);
})
.catch((err) => {
  console.log(err);
})


//ADD CARD POPUP

const popupAddCard = new PopupWithForm({
  submitFunction: (formData) => {

    popupAddCard.renderLoading(true);

    api.postCard(formData)
    .then((cardInfo) => {
    const card = createCard(cardInfo);

    cardList.prepend(card);
    popupAddCard.close();
    popupAddCard.renderLoading(false);
    })
    .catch(err => {
      console.log(`Что-то пошло не так: ${err}`);
      popupAddCard.showResponseError(err);
    })
  }
  }, popupAddCardSelector);
  popupAddCard.setEventListeners();


  //EDIT PROFILE POPUP

const editProfilePopup = new PopupWithForm({
  submitFunction: (formData) => {


    editProfilePopup.renderLoading(true);

    api.patchUserInfo(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
        editProfilePopup.renderLoading(false);
        editProfilePopup.close();
      })
      .catch(err => {
        console.log(`Что то пошло не так: ${err}`);
        editProfilePopup.showResponseError(err);
      })
  }}, popupEditProfileSelector);
editProfilePopup.setEventListeners();


//POPUP AVATAR

const popupAvatar = new PopupWithForm({
  submitFunction: (formData) => {

    popupAvatar.renderLoading(true);

    api.updateAvatar(formData.avatar)
      .then(() => {
        userInfo.setAvatar(formData.avatar);
        popupAvatar.renderLoading(false);
        popupAvatar.close();
      })
      .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
        popupAvatar.showResponseError(err);
      });
  }}, popupAvatarSelector);
  popupAvatar.setEventListeners();


  //POPUP IMG

const popupImg = new PopupWithImage(popupZoomCardSelector);
popupImg.setEventListeners();


//POPUP CONFIRM DELETE

const confirmDeletePopup = new PopupConfirm(removeCard, popupConfirmDeleteSelector)

confirmDeletePopup.setEventListeners();


//Create card

const createCard = (cardData) => {

  const card = new Card(cardData, cardSelectors, id.myId, {
    handleCardClick,
    handleLikeClick: (cardData) => {
      //check is liked card
      const isLiked = card.isLiked() ? api.unlikeCard(cardData) : api.likeCard(cardData);
      isLiked
        .then((cardData) => {
          card.setLikes(cardData);
        })
        .catch((err) => {
          //error log
          console.log(`${err}`);
        });
    },
    handleRecycleClick
    }
  );
    return card.generateCard();
  }

function handleCardClick (cardData) {
  popupImg.open(cardData);
}

function handleRecycleClick (cardData) {
  confirmDeletePopup.open(cardData);

}

function removeCard (cardToRemove) {
  confirmDeletePopup.renderLoading(true, 'Удаление...');
  api.deleteCard(cardToRemove.item)
    .then(() => {
      cardToRemove.removeCard();
      confirmDeletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupConfirm.renderLoading(false);
    })
}
      //Enable validation

addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();


//MAIN LISTENERS

  buttonEditAvatarElement.addEventListener('click', function () {
    editAvatarFormValidation.resetValidation();
    popupAvatar.open();
})

  buttonEditProfileElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    popupEditProfileNameInputElement.value =  userInfo.getUserInfo().name;
    popupEditProfileAboutInputElement.value = userInfo.getUserInfo().info;
    editProfileFormValidation.resetValidation();
    editProfilePopup.open();
});

  buttonAddNewCardElement.addEventListener('click', () => {
    addCardFormValidation.resetValidation();
    popupAddCard.open();
  })
