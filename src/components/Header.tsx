import { useContext } from "react";
import { DeviceContext } from "../contexts/Device";
import Logo from "../components/Logo";
import Menu from "./Menu";
import Navbar from "./Navbar";
import "../styles/Header.scss";

export default function Header() {
  const mobile = useContext(DeviceContext) === "mobile";

  return (
    <header>
      <Logo />
      {mobile ? <Menu /> : <Navbar />}
    </header>
  );
}
