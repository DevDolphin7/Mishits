import { useState, useEffect } from "react";
import { getDevice } from "./utils/utils";
import sizes from "./utils/sizes";
import Logo from "../components/Logo";
import Menu from "./Menu";
import Navbar from "./Navbar";
import "../styles/Header.scss";

export default function Header() {
  const [mobile, setMobile] = useState(getDevice() === "mobile");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < sizes.mobileMaxWidth && !mobile) {
        setMobile(true);
      } else if (window.innerWidth > sizes.mobileMaxWidth && mobile) {
        setMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobile]);

  return (
    <header>
      <Logo />
      {mobile ? <Menu /> : <Navbar />}
    </header>
  );
}
