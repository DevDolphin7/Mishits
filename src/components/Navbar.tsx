import { useContext } from "react";
import { DeviceContext } from "../contexts/Device";
import NavButtons from "./utils/NavButtons";
import "../styles/Navbar.scss";

export default function Navbar() {
  const device = useContext(DeviceContext);

  return (
    <div id="navbar">
      <NavButtons fiend={device === "monitor"} />
    </div>
  );
}
