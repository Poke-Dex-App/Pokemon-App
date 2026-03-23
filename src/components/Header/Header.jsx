import "./Header.css"
import logo from "../../assets/Images/International_Pokémon_logo.svg"
import NavBar from "../NavBar/NavBar"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"

function Header() {
    return (
        <header>
            
            <NavBar />

            <HamburgerMenu />

            <div>
                <img className="logo" src={logo} />
            </div>

            <div className="buscador">
                <input placeholder="Buscar por nombre" /><span>🔍</span>
            </div>
        </header>
    )
}

export default Header