import { useEffect, useState } from "react";
import "./HamburgerMenu.css";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/client";
import { onAuthStateChanged } from "firebase/auth";

function HamburgerMenu() {
  const [active, setActive] = useState(false);
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
      <div
        className={`hamburger ${active ? "is-active" : ""}`}
        onClick={() => setActive(!active)}
      >
        <div className="_layer -top"></div>
        <div className="_layer -mid"></div>
        <div className="_layer -bottom"></div>
      </div>

      <nav className={`menuppal ${active ? "is_active" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setActive(false)}>HOME  </Link></li>
          <li><Link to="/about" onClick={() => setActive(false)} >ABOUT</Link></li>
          {user
            ? <li><Link to="/add" onClick={() => setActive(false)}>ADD</Link></li>
            : <li><Link to="/add" onClick={handleAddClick}>ADD</Link></li>
          }
        </ul>
      </nav>

      {showModal && (
        <div id="delete">
          <h2> Debes iniciar sesión para poder añadir un Pokémon. </h2>
          <div>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>)}
    </>
  );
}

export default HamburgerMenu;