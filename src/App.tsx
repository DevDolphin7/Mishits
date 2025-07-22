import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./styles/App.scss";

export default function App() {
  return (
    <div id="site">
      <header>
        <Header />
      </header>
      <main>
        <Content />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
