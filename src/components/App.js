import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Logo from '../images/logo.svg';
import PopupWithForm from './PopupWithForm';
// import PopupNewPlace from './PopupNewPlace';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect } from 'react';
import api from '../utils/Api';

function App() {

  // const testovichok = useContext(CurrentUserContext);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      console.log(res);
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

    console.log(currentUser._id);
    const isLiked = likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(id, isLiked)
    .then((newCard) => {
      console.log(id, !isLiked, newCard);
      const newnewcard = {
        link: newCard.link,
        name: newCard.name,
        likes: newCard.likes,
        likesAmount: newCard.likes.length,
        id: newCard._id,
        owner: newCard.owner._id
      }
      console.log(newnewcard)
        //setCards((state) => state.map((c) => c._id === id ? newCard : c));
        setCards((state) => state.map((c) => c.id === id ? newnewcard : c));
        return true;
    })
    .then(res =>console.log(cards));
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
    .then(() => {
      setCards(cards.filter(card => card.id !== id))
    })
    .catch(err => console.log(err))
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
      const newcard = {
        link: res.link,
        name: res.name,
        likes: res.likes,
        likesAmount: res.likes.length,
        id: res._id,
        owner: res.owner._id
      }
      setCards([newcard, ...cards]);
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
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
          cards={cards} />
          <Footer name={"\u00A9 2021 Mesto Russia"}/>
          {/* <PopupWithForm id={"popup-add"} title={"Новое место"} button={"Создать"} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} > 
            <PopupNewPlace /> 
          </PopupWithForm> */}
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmitPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <PopupWithForm id={"popup-confirm"} title={"Вы уверены?"} button={"Да"} isOpen={false} onClose={closeAllPopups} > </PopupWithForm>
          <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;