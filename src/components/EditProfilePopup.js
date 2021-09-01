import PopupEditProfile from './PopupEditProfile';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

  return (
    <PopupWithForm id={"popup-edit"} title={"Редактировать профиль"} button={"Сохранить"} isOpen={props.isOpen} onClose={props.onClose}> 
      <PopupEditProfile /> 
    </PopupWithForm>
  )
}

export default EditProfilePopup;