import { useState, useEffect } from "react";
import NavButtons from "./utils/NavButtons";
import sizes from "./utils/sizes";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [fiend, setFiend] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > sizes.tabletMaxWidth && !fiend) {
        setFiend(true);
      } else if (window.innerWidth < sizes.tabletMaxWidth && fiend) {
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
