import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { validationParams } from "../utils/constants";

const EditProfilePopup = React.memo((props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState({
    content: "",
    isValid: false,
    validationMessage: "",
  });
  const [description, setDescription] = React.useState({
    content: "",
    isValid: false,
    validationMessage: "",
  });
  const nameInputClassName = `form__input form__input_type_text ${
    !name.isValid &&
    name.validationMessage !== "" &&
    validationParams.inputErrorSelector
  }`;
  const nameErrorClassName = `form__validation-error ${
    !name.isValid &&
    name.validationMessage !== "" &&
    validationParams.activeErrorSelector
  }`;
  const descriptionInputClassName = `form__input form__input_type_text ${
    !description.isValid &&
    description.validationMessage !== "" &&
    validationParams.inputErrorSelector
  }`;
  const descriptionErrorClassName = `form__validation-error ${
    !description.isValid &&
    description.validationMessage !== "" &&
    validationParams.activeErrorSelector
  }`;
  const buttonText = props.isLoading ? "Сохранение..." : "Сохранить";

  React.useEffect(() => {
    setName({
      content: currentUser.name,
      isValid: true,
      validationMessage: "",
    });
    setDescription({
      content: currentUser.about,
      isValid: true,
      validationMessage: "",
    });
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName({
      content: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  function handleDescriptionChange(e) {
    setDescription({
      content: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name.content,
      about: description.content,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isDisabled={!(name.isValid && description.isValid) || props.isLoading}
    >
      <input
        type="text"
        className={nameInputClassName}
        placeholder="Имя Фамилия"
        name="input-name"
        minLength="2"
        maxLength="40"
        required
        value={name.content}
        onChange={handleNameChange}
      />
      <span className={nameErrorClassName} id="input-name-error">
        {name.validationMessage}
      </span>
      <input
        type="text"
        className={descriptionInputClassName}
        placeholder="О себе"
        name="input-description"
        minLength="2"
        maxLength="200"
        required
        value={description.content}
        onChange={handleDescriptionChange}
      />
      <span className={descriptionErrorClassName} id="input-description-error">
        {description.validationMessage}
      </span>
    </PopupWithForm>
  );
});

export default EditProfilePopup;
