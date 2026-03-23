import { useState } from "react";
import "./HamburgerMenu.css";

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
          <li><a href="#">HOME</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">CONTACT</a></li>
        </ul>
      </nav>
    </>
  );
}

export default HamburgerMenu;