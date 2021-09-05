import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm id={"popup-update"} title={"Обновить аватар"} isOpen={props.isOpen} onClose={props.onClose} > 
      <form className="popup__form" name="form-update" id="popupEditAvatar" onSubmit={handleSubmit} noValidate>
        <input ref={avatarRef} type="url" className="popup__input popup__input_type_avatar" id="avatar" name="avatar" placeholder="Ссылка на аватар" required/>
        <span className="popup__form-error" id="avatar-error"></span>
        <button type="submit" className="popup__button">Сохранить</button>
      </form>
    </PopupWithForm>
)
}

export default EditAvatarPopup;