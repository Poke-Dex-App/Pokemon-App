import "./Header.css"
import logo from "../../assets/Images/International_Pokémon_logo.svg"

function Header ()  {
    return(
        <header>
                <img className="logo" src={logo}/>         
        </header>
    )
}

export default Header