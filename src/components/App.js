import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Logo from '../images/logo.svg';
import PopupWithForm from './PopupWithForm';
import PopupNewPlace from './PopupNewPlace';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from './PopupEditProfile';
import ImagePopup from './ImagePopup';
import React, { useState } from 'react';

function App() {

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setSelectedCard(false);
  } 

  return (
    <div className="page">
      <div className="page__content">
        <Header logo={Logo}/>
        <Main onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} />
        <Footer name={"\u00A9 2021 Mesto Russia"}/>
        <PopupWithForm id={"popup-add"} title={"Новое место"} button={"Создать"} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} > 
          <PopupNewPlace /> 
        </PopupWithForm>
        <PopupWithForm id={"popup-update"} title={"Обновить аватар"} button={"Сохранить"} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} > 
          <PopupEditAvatar /> 
        </PopupWithForm>
        <PopupWithForm id={"popup-edit"} title={"Редактировать профиль"} button={"Сохранить"} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} > 
          <PopupEditProfile /> 
        </PopupWithForm>
        <PopupWithForm id={"popup-confirm"} title={"Вы уверены?"} button={"Да"} isOpen={false} onClose={closeAllPopups} > </PopupWithForm>
        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;