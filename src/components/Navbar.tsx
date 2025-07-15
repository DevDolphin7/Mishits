import { useState, useEffect } from "react";
import NavButtons from "./utils/NavButtons";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [fiend, setFiend] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000 && !fiend) {
        setFiend(true);
      } else if (window.innerWidth < 1000 && fiend) {
        setFiend(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fiend]);

  return (
    <div id="navbar">
      <NavButtons fiend={fiend} />
    </div>
  );
}
