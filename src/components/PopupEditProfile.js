function PopupEditProfile() {

  return (
    <form className="popup__form" name="form-edit" noValidate>
      <input type="text" minLength="2" maxLength="40" className="popup__input popup__input_type_name" id="name" name="name" placeholder="Имя" required/>
      <span className="popup__form-error" id="name-error"></span>
      <input type="text" minLength="2" maxLength="200" className="popup__input popup__input_type_description" id="description" name="description" placeholder="Профессиональная деятельность" required/>
      <span className="popup__form-error" id="description-error"></span>
    </form>
  )
}

export default PopupEditProfile;