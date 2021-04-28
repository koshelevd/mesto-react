function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <figure className="card">
      <img src={props.card.link} alt={`Фото_${props.card.name}`} className="card__image" onClick={handleClick}/>
      <button className="button button_type_delete card__delete" type="button" aria-label="Удалить"></button>
      <figcaption className="card__caption">
        <h2 className="card__header">{props.card.name}</h2>
        <div className="card__like">
          <button className="button button_type_like card__like-button" type="button" aria-label="Нравится"></button>
          <span className="card__like-counter card__like-counter_active">{props.card.likes.length}</span>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card;
