import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = React.memo((props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `button button_type_delete card__delete ${isOwn && 'card__delete_active'}`
  );
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `button button_type_like card__like-button ${isLiked && 'button_type_like-active'}`
  );
  const hasAnyLikes = props.card.likes.length > 0;
  const cardLikesCounterClassName = (
    `card__like-counter ${hasAnyLikes && 'card__like-counter_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  } 

  return (
    <figure className="card">
      <img src={props.card.link} alt={`Фото_${props.card.name}`} className="card__image" onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
      <figcaption className="card__caption">
        <h2 className="card__header">{props.card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
          <span className={cardLikesCounterClassName}>{props.card.likes.length}</span>
        </div>
      </figcaption>
    </figure>
  )
});

export default Card;
