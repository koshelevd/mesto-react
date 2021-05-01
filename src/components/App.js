import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [cardToDelete, setCardToDelete] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    api.getProfileInfo()
      .then((result) => {
        setCurrentUser(result);
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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.like(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setIsDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen);
    setCardToDelete(card);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCard(undefined);
    setCardToDelete(undefined);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editProfileInfo(data)
      .then((result) => {
        setCurrentUser(result);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.editAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data)
      .then((result) => {
        setCards([result, ...cards]);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main 
          cards={cards}
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

        <PopupWithForm 
          title="Вы уверены?" 
          name="confirm" 
          isOpen={isDeleteConfirmPopupOpen} 
          onClose={closeAllPopups} 
          buttonText="Да" 
          isValid={true} 
          onSubmit={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
