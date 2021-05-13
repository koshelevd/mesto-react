import logo from "../images/header-logo.svg";
import React from "react";
import { Link, Route } from "react-router-dom";

const Header = React.memo((props) => {
  return (
    <header className="header section page__header">
      <Link to="/" className="header__link">
        <img src={logo} alt="Россия" className="header__logo smoothly" />
      </Link>
      <nav className="top-menu">
        <ul className="top-menu__list">
          {props.loggedIn && (
            <>
              <li className="top-menu__item">
                {props.email}
              </li>
              <li className="top-menu__item">
                <button
                  onClick={() => props.onLogout()}
                  className="top-menu__button link smoothly"
                >
                  Выйти
                </button>
              </li>
            </>
          )}

          <Route path="/sign-up">
            <li className="top-menu__item">
              <Link to="/sign-in" className="link smoothly">
                Войти
              </Link>
            </li>
          </Route>
          <Route path="/sign-in">
            <li className="top-menu__item">
              <Link to="/sign-up" className="link smoothly">
                Регистрация
              </Link>
            </li>
          </Route>
        </ul>
      </nav>
    </header>
  );
});

export default Header;
