import { Link } from "react-router-dom"
import "./NavBar.css"

function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <Link to="/"><strong>HOME</strong></Link>
                <Link to="/about"><strong>ABOUT</strong></Link>
                <Link to="/contact"><strong>CONTACT</strong></Link>
            </nav>  
        </div>

    )
}

export default NavBar