function Card({link, name, likes, id, onCardClick}) { 

  function handleClick() {
    onCardClick({link, name});
  }  

  return (
    <article className="element" key={id}>
      <img className="element__image" alt="" id="image" style={{ backgroundImage: `url(${link})` }} onClick={handleClick}/>
      <button type="button" className="element__delete" aria-label="Удалить"></button>
      <div className="element__place">
        <h2 className="element__paragraph">{name}</h2>
        <div>
          <button type="button" className="element__like" aria-label="Класс"></button>
          <p className="element__like-amount">{likes}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;