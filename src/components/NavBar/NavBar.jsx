import "./NavBar.css"

function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <h3>HOME</h3>
                <h3>ABOUT</h3>
            </nav>  
            <div className="buscador">
                <span><strong>BUSCAR: </strong></span><input className="buscador" placeholder="Buscar por nombre" /><span>🔍</span>
            </div>
        </div>

    )
}

export default NavBar