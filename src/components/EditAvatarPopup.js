import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
  return (
    <PopupWithForm id={"popup-update"} title={"Обновить аватар"} isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups} > 
      <form className="popup__form" name="form-update" id="popupEditAvatar" noValidate>
        <input type="url" className="popup__input popup__input_type_avatar" id="avatar" name="avatar" placeholder="Ссылка на аватар" required/>
        <span className="popup__form-error" id="avatar-error"></span>
        <button type="submit" className="popup__button">Сохранить</button>
      </form>
    </PopupWithForm>
)
}

export default EditAvatarPopup;