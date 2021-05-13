import React from "react";

const PopupWithForm = React.memo((props) => {
  const {
    title,
    name,
    isOpen,
    onClose,
    isDisabled,
    onSubmit,
    buttonText,
    children,
  } = props;
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <section
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      aria-label={title}
      onMouseDown={(e) => handleOverlayClose(e, onClose)}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="form"
          name={`${name}-profile-form`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <input
            type="submit"
            className="form__input form__input_type_submit smoothly"
            name="submit-button"
            value={buttonText}
            disabled={isDisabled}
          />
        </form>
        <button
          className="button button_type_close popup__close-button smoothly"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
});

export default PopupWithForm;
