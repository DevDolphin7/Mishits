import { useState } from "react";
import "../styles/Menu.scss";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (location: string) => {
    console.log(location);
  };

  return (
    <>
      <div id="menu" onClick={() => handleMenuClick()}></div>
      <section
        id="menu-screen"
        className={menuOpen ? "menu-open" : "menu-closed"}
      >
        <p onClick={() => handleNavClick("home")}>Fiend Home</p>
        <p onClick={() => handleNavClick("listen")}>Fiend Listen</p>
        <p onClick={() => handleNavClick("news")}>Fiend News</p>
        <p onClick={() => handleNavClick("pics")}>Fiend Pics</p>
        <p onClick={() => handleNavClick("about")}>About Fiends</p>
      </section>
    </>
  );
}
