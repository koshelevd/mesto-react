export function handleOverlayClick(event, onClose) {
    // Close popup if clicked outside of the form.
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  export function handleEscClose(event, onClose) {
    // Close popup if 'Esc' is pressed.
    if (event.key === 'Escape') {
      onClose();
    }
  }
