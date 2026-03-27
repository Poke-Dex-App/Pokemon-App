import { Link } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/client";
import { onAuthStateChanged } from "firebase/auth";

function NavBar() {

    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleAddClick = (e) => {
        if (!user) {
            e.preventDefault();
            setShowModal(true);
        }
    };

    return (

        <>
            <div className="navbar">
                <nav>
                    <Link to="/"><strong>HOME</strong></Link>
                    <Link to="/about"><strong>ABOUT</strong></Link>
                    <Link to="/add" onClick={handleAddClick} ><strong>ADD </strong></Link>
                </nav>
            </div>

            {showModal && (
                <div id="delete">
                    <h2> Debes iniciar sesión para poder añadir un Pokémon. </h2>
                    <div>
                        <button onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>)}
        </>




    )
}

export default NavBar