import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({link, name, likes, likesAmount, id, owner, onCardClick, onCardLike}) { 

  function handleClick() {
    onCardClick({link: link, name: name});
  }  

  function handleLikeClick() {
    onCardLike(likes, id);
  }

  const testovichok = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner === testovichok._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__delete' : 'element__delete element__delete_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === testovichok._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__like element__like_active' : 'element__like'}`
  );

  return (
    <article className="element" key={id}>
      <img className="element__image" alt="" id="image" style={{ backgroundImage: `url(${link})` }} onClick={handleClick}/>
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить"></button>
      <div className="element__place">
        <h2 className="element__paragraph">{name}</h2>
        <div>
          <button type="button" className={cardLikeButtonClassName} aria-label="Класс" onClick={handleLikeClick}></button>
          <p className="element__like-amount">{likesAmount}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;