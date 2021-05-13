import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [inputValues, setInputValues] = React.useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setInputValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(inputValues);
  }

  return (
    <>
      <main className="content page__content">
        <form
          className="form form_auth"
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1 className="form__auth-header">Регистрация</h1>
          <input
            type="email"
            className="form__input form__input_type_text form__input_theme_dark"
            placeholder="Email"
            name="email"
            autoComplete="off"
            required
            onChange={handleInputChange}
            value={inputValues["email"]}
          />
          <input
            type="password"
            className="form__input form__input_type_text form__input_theme_dark"
            placeholder="Пароль"
            name="password"
            required
            onChange={handleInputChange}
            value={inputValues["password"]}
          />
          <div className="form__auth-submit-group">
            <input
              type="submit"
              className="form__input form__input_type_auth-submit smoothly"
              name="submit-button"
              value="Зарегистрироваться"
            />
            <p className="form__auth-tips">
              Уже зарегистрированы?{" "}
              <Link to="/sign-in" className="link smoothly">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </main>
    </>
  );
}

export default Register;
