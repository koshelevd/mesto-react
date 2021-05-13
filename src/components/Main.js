import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile section">
        <figure className="user-info">
          <div
            className="user-info__avatar"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <figcaption className="user-info__caption">
            <div className="user-info__header">
              <h1 className="user-info__name">{currentUser.name}</h1>
              <button
                className="button button_type_edit user-info__button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="user-info__description">{currentUser.about}</p>
          </figcaption>
        </figure>
        <button
          className="button button_type_add profile__button smoothly"
          type="button"
          aria-label="Добавить фото"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section
        className="cards section"
        aria-label="Фотогалерея"
      >
        {props.cards.map((card, i) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
