function PopupEditAvatar() {

  return (
    <form className="popup__form" name="form-update" id="popupEditAvatar" noValidate>
      <input type="url" className="popup__input popup__input_type_avatar" id="avatar" name="avatar" placeholder="Ссылка на аватар" required/>
      <span className="popup__form-error" id="avatar-error"></span>
    </form>
  )
}

export default PopupEditAvatar;