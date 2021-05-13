import React from "react";
import PopupWithForm from "./PopupWithForm";
import { validationParams } from "../utils/constants";

const AddPlacePopup = React.memo((props) => {
  const [title, setTitle] = React.useState({
    content: "",
    isValid: false,
    validationMessage: "",
  });
  const [link, setLink] = React.useState({
    content: "",
    isValid: false,
    validationMessage: "",
  });
  const titleInputClassName = `form__input form__input_type_text ${
    !title.isValid &&
    title.validationMessage !== "" &&
    validationParams.inputErrorSelector
  }`;
  const titleErrorClassName = `form__validation-error ${
    !title.isValid &&
    title.validationMessage !== "" &&
    validationParams.activeErrorSelector
  }`;
  const linkInputClassName = `form__input form__input_type_text ${
    !link.isValid &&
    link.validationMessage !== "" &&
    validationParams.inputErrorSelector
  }`;
  const linkErrorClassName = `form__validation-error ${
    !link.isValid &&
    link.validationMessage !== "" &&
    validationParams.activeErrorSelector
  }`;
  const buttonText = props.isLoading ? "Сохранение..." : "Создать";

  React.useEffect(() => {
    setTitle({
      content: "",
      isValid: false,
      validationMessage: "",
    });
    setLink({
      content: "",
      isValid: false,
      validationMessage: "",
    });
  }, [props.isOpen]);

  function handleTitleChange(e) {
    setTitle({
      content: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  function handleLinkChange(e) {
    setLink({
      content: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: title.content,
      link: link.content,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isDisabled={!(title.isValid && link.isValid) || props.isLoading}
    >
      <input
        type="text"
        className={titleInputClassName}
        placeholder="Название"
        name="input-title"
        minLength="2"
        maxLength="30"
        required
        value={title.content}
        onChange={handleTitleChange}
      />
      <span className={titleErrorClassName} id="input-title-error">
        {title.validationMessage}
      </span>
      <input
        type="url"
        className={linkInputClassName}
        placeholder="Ссылка на картинку"
        name="input-link"
        required
        value={link.content}
        onChange={handleLinkChange}
      />
      <span className={linkErrorClassName} id="input-link-error">
        {link.validationMessage}
      </span>
    </PopupWithForm>
  );
});

export default AddPlacePopup;
