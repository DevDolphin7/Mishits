import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { ProvideDevice } from "./contexts/DeviceProvider";
import "./styles/App.scss";

export default function App() {
  return (
    <ProvideDevice>
      <Header />
      <Content />
      <Footer />
    </ProvideDevice>
  );
}
