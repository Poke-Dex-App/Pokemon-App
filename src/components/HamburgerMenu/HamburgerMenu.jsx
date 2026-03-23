import { useState } from "react";
import "./HamburgerMenu.css";
import { Link } from "react-router-dom";

function HamburgerMenu() {
  const [active, setActive] = useState(false);

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
          <li><Link to="/contact" onClick={() => setActive(false)}>CONTACT</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default HamburgerMenu;