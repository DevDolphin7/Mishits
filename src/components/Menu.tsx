import { useState } from "react";
import "../styles/Menu.scss";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div id="menu" onClick={() => handleMenuClick()}></div>
      {menuOpen ? <section id="menu-screen"></section> : null}
    </>
  );
}
