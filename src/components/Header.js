function Header(props) {
  
  return (
    <header className="header">
      <img src={props.logo} alt="Логотип" className="header__logo"/>
    </header>
  )
}

export default Header;