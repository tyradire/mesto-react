function PopupNewPlace() {

  return (
    <form className="popup__form" name="form-add" id="popupAddForm" noValidate>
      <input type="text" minLength="2" maxLength="30" className="popup__input popup__input_type_place" id="place" name="place" placeholder="Название" required/>
      <span className="popup__form-error" id="place-error"></span>
      <input type="url" className="popup__input popup__input_type_link" id="link" name="link" placeholder="Ссылка на картинку" required/>
      <span className="popup__form-error" id="link-error"></span> 
    </form>
  )
}

export default PopupNewPlace;