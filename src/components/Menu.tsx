import { useState, useEffect } from "react";
import NavButtons from "./utils/NavButtons";
import "../styles/Menu.scss";

export default function Menu() {
  const [menuRenderCount, setMenuRenderCount] = useState(0);
  const menuOpen = menuRenderCount % 2 === 1;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 430 && menuRenderCount !== 0) {
        setMenuRenderCount(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuRenderCount]);

  const handleMenuClick = () => {
    setMenuRenderCount(menuRenderCount + 1);
  };

  return (
    <>
      <div id="menu" onClick={() => handleMenuClick()}></div>
      <section
        id="menu-screen"
        className={
          menuOpen
            ? "menu-open"
            : menuRenderCount === 0
            ? "menu-initial-state"
            : "menu-closed"
        }
      >
        <NavButtons fiend={true} />
      </section>
    </>
  );
}
