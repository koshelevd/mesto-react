import React from "react";
import PopupWithForm from "./PopupWithForm";
import { validationParams } from "../utils/constants";

const EditAvatarPopup = React.memo((props) => {
  const avatarRef = React.useRef();
  const [inputValidity, setInputValidity] = React.useState({
    isValid: false,
    validationMessage: "",
  });
  const inputClassName = `form__input form__input_type_text 
     ${
       !inputValidity.isValid &&
       inputValidity.validationMessage !== "" &&
       validationParams.inputErrorSelector
     }`;
  const errorClassName = `form__validation-error 
     ${
       !inputValidity.isValid &&
       inputValidity.validationMessage !== "" &&
       validationParams.activeErrorSelector
     }`;
  const buttonText = props.isLoading ? "Сохранение..." : "Сохранить";

  React.useEffect(() => {
    setInputValidity({
      isValid: false,
      validationMessage: "",
    });
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChange(e) {
    setInputValidity({
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isDisabled={!inputValidity.isValid || props.isLoading}
    >
      <input
        type="url"
        ref={avatarRef}
        className={inputClassName}
        placeholder="Ссылка на картинку"
        name="input-picture-link"
        required
        onChange={handleChange}
      />
      <span className={errorClassName} id="input-picture-link-error">
        {inputValidity.validationMessage}
      </span>
    </PopupWithForm>
  );
});

export default EditAvatarPopup;
