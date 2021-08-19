function Card(props) {

  function handleClick() {
    props.onCardClick(props.link);
  }  

  return (
    <article className="element" key={props.i}>
      <img className="element__image" alt="" id="image" style={{ backgroundImage: `url(${props.link})` }} onClick={handleClick}/>
      <button type="button" className="element__delete" aria-label="Удалить"></button>
      <div className="element__place">
        <h2 className="element__paragraph">{props.name}</h2>
        <div>
          <button type="button" className="element__like" aria-label="Класс"></button>
          <p className="element__like-amount">{props.likes}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;