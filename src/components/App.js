import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Logo from '../images/logo.svg';
import PopupWithForm from './PopupWithForm';
import PopupNewPlace from './PopupNewPlace';
import PopupEditAvatar from './PopupEditAvatar';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect  } from 'react';
import api from '../utils/Api';

function App() {

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});

  useEffect(() => {
    api.getUserInfo()
    .then(res => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err))
  }, []);

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

  function handleUpdateUser(info) {
    api.editUserInfo(info.name, info.about)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeAllPopups();
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header logo={Logo}/>
          <Main onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} />
          <Footer name={"\u00A9 2021 Mesto Russia"}/>
          <PopupWithForm id={"popup-add"} title={"Новое место"} button={"Создать"} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} > 
            <PopupNewPlace /> 
          </PopupWithForm>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <PopupWithForm id={"popup-confirm"} title={"Вы уверены?"} button={"Да"} isOpen={false} onClose={closeAllPopups} > </PopupWithForm>
          <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;