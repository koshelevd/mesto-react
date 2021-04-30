import React from 'react';
import PopupWithForm from './PopupWithForm';
import { validationParams } from '../utils/constants'

const EditAvatarPopup = React.memo((props) => {
  const avatarRef = React.useRef()
  let isValid = (avatarRef === undefined) ? avatarRef.current.validity.valid : false;
  let validationMessage = (avatarRef === undefined) ? avatarRef.current.validationMessage : '';
  const inputClassName = (
    `popup__input popup__input_type_text ${(!isValid && validationMessage !== '') && validationParams.inputErrorSelector}`
  );
  const errorClassName = (
    `popup__validation-error ${(!isValid && validationMessage !== '') && validationParams.activeErrorSelector}`
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  function handleChange(e) {
    isValid = e.target.validity.valid;
    validationMessage = e.target.validationMessage;
  }

  return (
    <PopupWithForm 
      title="Обновить аватар" 
      name="avatar" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit} 
      buttonText="Сохранить"
      isValid={isValid}>

      <input type="url"
        ref={avatarRef}
        className={inputClassName}
        placeholder="Ссылка на картинку"
        name="input-picture-link"
        required
        onChange={handleChange}/>
      <span className={errorClassName} id="input-picture-link-error">
        {validationMessage}
      </span>
    </PopupWithForm>
  );
});

export default EditAvatarPopup;
