import React from "react";

const ImagePopup = React.memo((props) => {
  const {card, onClose} = props;

  React.useEffect(() => {
    if (card === undefined) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [card, onClose]);

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && card !== undefined) {
      onClose();
    }
  };

  return (
    <section
      className={`popup popup_type_image ${
        props.card !== undefined && "popup_opened"
      }`}
      aria-label="Всплывающее изображение"
      onMouseDown={(e) => handleOverlayClose(e, props.onClose)}
    >
      {props.card !== undefined && (
        <div className="popup__container popup__container_type_blank">
          <figure className="popup__figure">
            <img
              src={props.card.link}
              alt={`Фото_${props.card.name}`}
              className="popup__image"
            />
            <figcaption className="popup__caption">
              {props.card.name}
            </figcaption>
          </figure>
          <button
            className="button button_type_close popup__close-button smoothly"
            type="button"
            aria-label="Закрыть окно"
            onClick={props.onClose}
          ></button>
        </div>
      )}
    </section>
  );
});

export default ImagePopup;
