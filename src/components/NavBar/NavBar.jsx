import { Link } from "react-router-dom"
import "./NavBar.css"

function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT</Link>
                <Link to="/conact">CONTACT</Link>
            </nav>  
        </div>

    )
}

export default NavBar