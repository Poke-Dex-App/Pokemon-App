import "./Header.css"
import logo from "../../assets/Images/International_Pokémon_logo.svg"
import NavBar from "../NavBar/NavBar"

function Header() {
    return (
        <header>
            <div>
                <img className="logo" src={logo} />
            </div>

            <NavBar />
        </header>
    )
}

export default Header