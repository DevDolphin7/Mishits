import Logo from "./components/Logo";
import News from "./components/News";
import "./styles/App.scss";

function App() {
  return (
    <div id="site">
      <header>
        <Logo />
      </header>
      <main>
        <News />
      </main>
    </div>
  );
}

export default App;
