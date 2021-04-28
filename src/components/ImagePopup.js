function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.card !== undefined && "popup_opened"}`} aria-label="Всплывающее изображение">
      {props.card !== undefined &&
        (<div className="popup__container popup__container_blank">
          <figure className="popup__figure">
            <img src={props.card.link} alt={`Фото_${props.card.name}`} className="popup__image" />
            <figcaption className="popup__caption">
              {props.card.name}
            </figcaption>
          </figure>
          <button className="button button_type_close popup__close-button smoothly" type="button"
            aria-label="Закрыть окно" onClick={props.onClose}></button>
        </div>)
      }
    </section>
  )
}

export default ImagePopup;
