import Logo from "../components/Logo";
import Menu from "./Menu";
import Navbar from "./Navbar";
import "../styles/Header.scss";

export default function Header() {
  return (
    <div id="header">
      <Logo />
      <Navbar />
      <Menu />
    </div>
  );
}
