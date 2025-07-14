import Logo from "../components/Logo";
import Menu from "./Menu";
import "../styles/Header.scss";

export default function Header() {
  return (
    <div id="navbar">
      <Logo />
      <Menu />
    </div>
  );
}
