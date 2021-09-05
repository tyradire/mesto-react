import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

  return(
    <PopupWithForm id={"popup-confirm"} title={"Вы уверены?"} isOpen={props.isOpen} onClose={props.onClose} >
      <button type="submit" className="popup__button popup__button_confirm" onClick={props.onClick}>Да</button>
    </PopupWithForm>
  );

}

export default DeleteCardPopup;