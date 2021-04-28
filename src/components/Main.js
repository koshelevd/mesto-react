import React from 'react';
import api from './api';
import defaultAvatar from '../images/profile-avatar.jpg';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(defaultAvatar);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo()
      .then((result) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content page__content">
      <section className="profile section">
        <figure className="user-info">
          <div className="user-info__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}></div>
          <figcaption className="user-info__caption">
            <div className="user-info__header">
              <h1 className="user-info__name">{userName}</h1>
              <button className="button button_type_edit user-info__button" type="button"
                aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
            </div>
            <p className="user-info__description">{userDescription}</p>
          </figcaption>
        </figure>
        <button className="button button_type_add profile__button smoothly" type="button"
          aria-label="Добавить фото" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards section" aria-label="Фотогалерея">
        {cards.map((card, i) => (
          <Card card={card} key={card._id} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main;
