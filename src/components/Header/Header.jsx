import "./Header.css"
import logo from "../../assets/Images/International_Pokémon_logo.svg"
import NavBar from "../NavBar/NavBar"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"
import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom"
import ThemeToggle from "../ThemeToggle/ThemeToggle"

function Header() {

    return (
        <header>

            <NavBar />

            <HamburgerMenu />

            <Link to={"/"}>
                <div>
                    <img className="logo" src={logo} />
                </div>
            </Link>

            <ThemeToggle/>

        </header>
    )
}

export default Header