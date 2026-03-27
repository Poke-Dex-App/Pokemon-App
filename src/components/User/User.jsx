import "./User.css"


function User() {
    return (
        <div className="user-menu">
            <p>👤</p>
            <div className="dropdown">
                <button>Iniciar sesión</button>
                <button>Log out</button>
                <button>Favoritos</button>
            </div>
        </div>
    )
}

export default User