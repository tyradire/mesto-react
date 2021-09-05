import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Logo from '../images/logo.svg';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect } from 'react';
import api from '../utils/Api';

function App() {

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setisDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idDeletedCard, setIdDeletedCard] = useState('');

  useEffect(() => {
    api.getUserInfo()
    .then(res => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    api.getInitialCards()
    .then(res => {
      const arr = res.map((item) => {
        return {
          link: item.link,
          name: item.name,
          likes: item.likes,
          likesAmount: item.likes.length,
          id: item._id,
          owner: item.owner._id
        }
      });
      setCards(arr);
      setIsLoading(false);
    })
    .catch(err => console.log(err))
  }, []);

  function handleCardLike(likes, id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(id, isLiked)
    .then((Card) => {
      const newCard = {
        link: Card.link,
        name: Card.name,
        likes: Card.likes,
        likesAmount: Card.likes.length,
        id: Card._id,
        owner: Card.owner._id
      }
        setCards((state) => state.map((c) => c.id === id ? newCard : c));
        return true;
    })
    .catch(err => console.log(err))
  }

  function handleCardDelete() {
    api.deleteCard(idDeletedCard)
    .then(() => {
      setCards(cards.filter(card => card.id !== idDeletedCard))
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeAllPopups();
    })
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleDeleteCardConfirmClick(id) {
    setIdDeletedCard(id);
    setisDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisDeleteCardPopupOpen(false);
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

  function handleUpdateAvatar(info) {
    api.editUserAvatar(info.avatar)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeAllPopups();
    })
  }

  function handleAddPlaceSubmit(name, link) {
    api.postNewCard(name, link)
    .then((res) => {
      const newCard = {
        link: res.link,
        name: res.name,
        likes: res.likes,
        likesAmount: res.likes.length,
        id: res._id,
        owner: res.owner._id
      }
      setCards([newCard, ...cards]);
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
          <Main 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick}
          onDeleteCofirm={handleDeleteCardConfirmClick}
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
          cards={cards} />
          <Footer name={"\u00A9 2021 Mesto Russia"}/>
          <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onSubmitPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} />
          <DeleteCardPopup 
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onClick={handleCardDelete} />
          <ImagePopup 
          isOpen={selectedCard} 
          onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;