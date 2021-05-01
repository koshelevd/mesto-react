import React from 'react';
import { handleOverlayClick, handleEscClose } from '../utils/utils'

const PopupWithForm = React.memo((props) => {
  React.useEffect(() => {
    document.addEventListener('keydown', e => handleEscClose(e, props.onClose));
    return (
      document.removeEventListener('keydown', e => handleEscClose(e, props.onClose))
    )
  }, [props.onClose]);

  return (
    <section
      className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}
      aria-label={props.title}
      onMouseDown={e => handleOverlayClick(e, props.onClose)}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`${props.name}-profile-form`} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <input type="submit" className="popup__input popup__input_type_submit smoothly" name='submit-button' value={props.buttonText} disabled={!props.isValid} />
        </form>
        <button className="button button_type_close popup__close-button smoothly" type="button"
          aria-label="Закрыть окно" onClick={props.onClose}></button>
      </div>
    </section>
  )
});

export default PopupWithForm;
