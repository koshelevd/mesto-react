import logo from '../images/header-logo.svg';
import React from 'react';

const Header = React.memo((props) => {
  return (
    <header className="header section page__header">
      <a href="/" className="header__link" target="_blank">
        <img src={logo} alt="Россия" className="header__logo smoothly" />
      </a>
    </header>
  )
});

export default Header;
