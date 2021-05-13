import React from "react";
import successIcon from "../images/icon-success.svg";
import failIcon from "../images/icon-fail.svg";

const Infotooltip = React.memo((props) => {
  const { status, onClose } = props;
  const isOpen = status.isOpen;
  const isOk = status.isOk;

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
      className={`popup ${isOpen && "popup_opened"}`}
      aria-label="Информация"
      onMouseDown={(e) => handleOverlayClose(e, onClose)}
    >
      <div className="popup__container popup__container_type_auth">
        <img
          src={isOk ? successIcon : failIcon}
          className="popup__icon"
          alt={isOk ? "Успешная регистрация!" : "Ошибка при регистрации"}
        />
        <h2 className="popup__message">
          {isOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          className="button button_type_close popup__close-button popup__close-button_auth smoothly"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
});

export default Infotooltip;
