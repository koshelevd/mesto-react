import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page__container">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="edit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
        <input type="text" className="popup__input popup__input_type_text" placeholder="Имя Фамилия" name="input-name" minLength="2" maxLength="40" required />
        <span className="popup__validation-error" id="input-name-error"></span>
        <input type="text" className="popup__input popup__input_type_text" placeholder="О себе" name="input-description" minLength="2" maxLength="200" required />
        <span className="popup__validation-error" id="input-description-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="add" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
        <input type="text" className="popup__input popup__input_type_text" placeholder="Название" name="input-title" minLength="2" maxLength="30" required />
        <span className="popup__validation-error" id="input-title-error">Вы пропустили это поле.</span>
        <input type="url" className="popup__input popup__input_type_text" placeholder="Ссылка на картинку" name="input-link" required />
        <span className="popup__validation-error" id="input-link-error">Введите адрес сайта.</span>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
        <input type="url" className="popup__input popup__input_type_text" placeholder="Ссылка на картинку" name="input-picture-link" required />
        <span className="popup__validation-error" id="input-picture-link-error">Введите адрес сайта.</span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="confirm" isOpen={false} onClose={closeAllPopups}>
        <input type="submit" className="popup__input popup__input_type_submit popup__input_confirm smoothly" value="Да" />
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
