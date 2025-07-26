import { useState, useEffect } from "react";
import { getDevice } from "./utils/utils";
import NavButtons from "./utils/NavButtons";
import sizes from "./utils/sizes";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [fiend, setFiend] = useState(getDevice() === "monitor");

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
