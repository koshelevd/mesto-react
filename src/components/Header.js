import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header section page__header">
      <a href="/" className="header__link" target="_blank">
        <img src={logo} alt="Россия" className="header__logo smoothly" />
      </a>
    </header>
  )
}

export default Header;