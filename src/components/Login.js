import React from "react";

function Login(props) {
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
          <h1 className="form__auth-header">Вход</h1>
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
              value="Войти"
            />
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
