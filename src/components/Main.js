import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {

  const [userName, setuserName] = useState('');
  const [userDescription, setuserDescription] = useState('');
  const [userAvatar, setuserAvatar] = useState('');
  const [cards, setCards] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getUserInfo()
    .then(res => {
      setuserName(res.name);
      setuserDescription(res.about);
      setuserAvatar(res.avatar);
    })
    .catch(err => console.log(err))
    api.getInitialCards()
    .then(res => {
      console.log(res);
      const arr = res.map((item) => {
        return {
          link: item.link,
          name: item.name,
          likes: item.likes.length,
          id: item._id
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
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
          <div className="profile__avatar-button"></div>
        </div>  
        <div className="profile__info">
          <div className="profile__name-with-button">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать"></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
      </div>
      <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить"></button>
    </section>
    <section className="elements">
       {isLoading ? '' : cards.map((card) => {
        return <Card name={card.name} link={card.link} likes={card.likes} key={card.id} onCardClick={props.onCardClick} />
      })} 
    </section>
  </main>
  )
}

export default Main;