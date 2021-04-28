function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`} aria-label={props.title}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`${props.name}-profile-form`} noValidate>
          {props.children}
          <input type="submit" className="popup__input popup__input_type_submit smoothly" name='submit-button' value={props.buttonText} disabled />
        </form>
        <button className="button button_type_close popup__close-button smoothly" type="button"
          aria-label="Закрыть окно" onClick={props.onClose}></button>
      </div>
    </section>
  )
}

export default PopupWithForm;
