  import {Config} from './Config.js';
  import Api from './Api.js';
  import {ValidationMessages} from './ValidationMessages.js';
  import Card from './Card.js';
  import CardList from './CardList.js';
  import Popup from './Popup.js';
  import UserInfo from './UserInfo.js';
  import FormValidator from './FormValidator.js';
  import "../pages/index.css"



  const popupAddNewCard = document.querySelector('.popup-add');
  const userAvatar = document.querySelector('.user-info__photo');
  const popupEditAvatar = document.querySelector('.popup-avatar');
  const inputCardName = document.querySelector('#cardName');
  const inputCardLink = document.querySelector('#cardUrl');
  const inputUserName = document.querySelector('#userName');
  const inputUserOccupation = document.querySelector('#userOccupation');
  const placesList = document.querySelector('.places-list');
  const editButton = document.querySelector('.user-info__edit-button');
  const addButton = document.querySelector('.user-info__button');
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const popUpFormEdit = document.querySelector('.popup__form-edit');
  const popUpEdit = document.querySelector('.popup-edit');
  const popUpContent = document.querySelector('.popup__content');
  const popUp = document.querySelector('.popup');
  const popUpInput = document.querySelector('.popup__input');
  const popUpForm = document.querySelector('.popup__form');
  const popUpPhoto = document.querySelector('.popup-photo');
  const popUpContentPhoto = document.querySelector('.popup__content-image');
  const createCard = (cardData) => new Card(cardData, openPopupContentPhoto);
  const cardsInPlacelist = new CardList(placesList, createCard);
  const popupAdd = new Popup(popupAddNewCard);
  const popupEdition = new Popup(popUpEdit);
  const photoPopup = new Popup(popUpPhoto);
  const avatarEditPopup = new Popup(popupEditAvatar);
  const userInfoProfile = new UserInfo(userName, userJob);
  const openingAddCardForm = new FormValidator(popUp);
  const openingEditProfileForm = new FormValidator(popUpFormEdit);
  const openAvatarEdit = new FormValidator(popupEditAvatar);
  const api = new Api(Config);
  const obj = {};

  obj.api = api;
  obj.userAvatar = userAvatar;
  obj.cardsInPlacelist = cardsInPlacelist;
  obj.eventDefinition = eventDefinition;

  function openProfileEditPopup() {
    popUpFormEdit.userName.value = userName.textContent;
    popUpFormEdit.userOccupation.value = userJob.textContent;
    popupEdition.open();
  }

  function setUserAvatar() {
    const avatar = api.getAvatar();
    avatar
      .then((result) => {
        const avatarLink = result.avatar;
        userAvatar.style.backgroundImage = `url('${avatarLink}')`;
      })
  }

  function setUserProfileInfo() {
    const info = api.getUserProfileInfo();
    info
      .then((result) => {
        const userData = {};
        userData.name = result.name;
        userData.job = result.about;
        userInfoProfile.setUserInfo(userData);
        userInfoProfile.updateUserInfo();
      })
  }

  function renderInitialCards() {
    const cards = api.getInitialCards();
    cards
      .then((result) => {
        cardsInPlacelist.render(result)
      })
  }

  function updateUserProfileInfo(event) {
    event.preventDefault();
    const userData = {};
    userData.name = inputUserName.value;
    userData.job = inputUserOccupation.value;
    popUpEdit.classList.remove('popup_is-opened');
    popUpForm.reset();
    const info = api.editUserProfile(userData);
    info
      .then((result) => {
        const userData = {};
        userData.name = result.name;
        userData.job = result.about;
        userInfoProfile.setUserInfo(userData);
        userInfoProfile.updateUserInfo();
      })
  }

  function openPopupContentPhoto(event, link) {
    if (event.toElement.classList.contains('place-card__image')) {
      popUpContentPhoto.setAttribute('src', link);
      photoPopup.open();
    }
  }

  function addNewCard(event) {
    event.preventDefault();
    isLoading(true, event);
    const cardData = {};
    cardData.name = inputCardName.value;
    cardData.link = inputCardLink.value;
    const newCard = api.postNewCard(cardData, event);
    newCard
      .then((newCard) => {
        cardsInPlacelist.addCard(newCard);
      })
      .finally(() => {
        isLoading(false, event);
        popupAdd.close();
        popUpForm.reset();
      })
  }

  export function eventDefinition(cardInfo) {
    const eventTarget = cardInfo.target;
    const id = cardInfo.data._id;
    const element = cardInfo.element;
    if (eventTarget.classList.contains('place-card__like-icon')) {
      if (eventTarget.classList.contains('place-card__like-icon_liked')) {
        eventTarget.classList.remove('place-card__like-icon_liked')
        const dislike = api.removeLike(id);
        dislike.then((result) => {
          const counter = cardInfo.target.nextSibling.nextSibling;
          counter.textContent = result.likes.length;
        })
      } else {
        eventTarget.classList.add('place-card__like-icon_liked')
        const like = api.setLike(id);
        like.then((result) => {
          const counter = cardInfo.target.nextSibling.nextSibling;
          counter.textContent = result.likes.length;
        })
      }
    } else if (eventTarget.classList.contains('place-card__delete-icon')) {
      const areYouSure = confirm('Вы уверены, что хотите удалить данный пост?')
      if (areYouSure) {
        const del = api.deleteCard(id);
        del.then((res) => {
          if (res.ok) {
            Card.prototype.remove(element)
          }
        })
      }
    }
  }

  function changingAvatar(event) {
    event.preventDefault();
    isLoading(true, event);
    const avatarLink = popupEditAvatar.querySelector('#avatarUrl').value;
    const newAvatar = api.changeAvatar(avatarLink, event);
    newAvatar.then((result) => {
      const avatarLink = result.avatar;
      userAvatar.style.backgroundImage = `url('${avatarLink}')`;
    })
      .finally(() => {
        avatarEditPopup.close();
        isLoading(false, event);
        popupEditAvatar.querySelector('.popup__form').reset();
      })
  }

  function isLoading(answer, event) {
    const form = event.target;
    const button = form.querySelector('.button')

    if (answer) {
      button.textContent = 'Загрузка...'
    } else {
      button.textContent = 'Сохранить'
    }
  }

  setUserAvatar();
  setUserProfileInfo()
  renderInitialCards();

  popupAddNewCard.addEventListener('submit', addNewCard);
  popUpEdit.addEventListener('submit', updateUserProfileInfo);
  addButton.addEventListener('click', popupAdd.open);
  editButton.addEventListener('click', openProfileEditPopup);
  userAvatar.addEventListener('click', avatarEditPopup.open);
  popupEditAvatar.addEventListener('submit', changingAvatar);