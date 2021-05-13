import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import Infotooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] =
    React.useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState({
    isOpen: false,
    isOk: false,
  });
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [cardToDelete, setCardToDelete] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(undefined);

  React.useEffect(() => {
    getInitialData();
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  function checkToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      api
        .getContent(token)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
            setEmail(result.data.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getInitialData() {
    api
      .getProfileInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .like(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
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
    setIsLoading(true);
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setInfoTooltipStatus({
      isOpen: false,
      isOk: false,
    });
    setSelectedCard(undefined);
    setCardToDelete(undefined);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfileInfo(data)
      .then((result) => {
        closeAllPopups();
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function onRegister(data) {
    api
      .signup(data)
      .then((result) => {
        history.push("/sign-in");
        setInfoTooltipStatus({
          isOpen: true,
          isOk: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipStatus({
          isOpen: true,
          isOk: false,
        });
      });
  }

  function onLogin(data) {
    api
      .signin(data)
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          checkToken();
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipStatus({
          isOpen: true,
          isOk: false,
        });
      });
  }

  const onSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header loggedIn={loggedIn} onLogout={onSignOut} email={email} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />

          <Route path="/sign-up">
            <Register onSubmit={onRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onSubmit={onLogin} />
          </Route>

          <Route exact path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Route path="/sign-up">
          <Infotooltip status={infoTooltipStatus} onClose={closeAllPopups} />
        </Route>
        <Route path="/sign-in">
          <Infotooltip status={infoTooltipStatus} onClose={closeAllPopups} />
        </Route>
        <Route exact path="/">
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            isOpen={isDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
            buttonText={!isLoading ? "Да" : "Удаление..."}
            isDisabled={isLoading}
            onSubmit={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
