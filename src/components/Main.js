import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const testovichok = React.useContext(CurrentUserContext);

  // const [userName, setuserName] = useState('');
  // const [userDescription, setuserDescription] = useState('');
  // const [userAvatar, setuserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleCardLike(likes, id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    console.log(likes);
    const isLiked = likes.some(i => i._id === testovichok._id);
    console.log(isLiked);
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

  useEffect(() => {
    // api.getUserInfo()
    // .then(res => {
    //   setuserName(res.name);
    //   setuserDescription(res.about);
    //   setuserAvatar(res.avatar);
    // })
    // .catch(err => console.log(err))
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

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__editable">
        <div className="profile__avatar-cover" onClick={props.onEditAvatar}>
          <div className="profile__avatar" style={{ backgroundImage: `url(${testovichok.avatar})` }}></div>
          <div className="profile__avatar-button"></div>
        </div>  
        <div className="profile__info">
          <div className="profile__name-with-button">
            <h1 className="profile__title">{testovichok.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать"></button>
          </div>
          <p className="profile__subtitle">{testovichok.about}</p>
        </div>
      </div>
      <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить"></button>
    </section>
    <section className="elements">
       {isLoading ? '' : cards.map((card) => {
        return <Card key={card.id} {...card} onCardClick={props.onCardClick} onCardLike={handleCardLike} /> // name={card.name} link={card.link} likes={card.likes} key={card.id}
      })} 
    </section>
  </main>
  )
}

export default Main;