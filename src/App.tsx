import Logo from "./components/Logo";
import Content from "./components/Content";
import "./styles/App.scss";

function App() {
  return (
    <div id="site">
      <header>
        <Logo />
      </header>
      <main>
        <Content />
      </main>
    </div>
  );
}

export default App;
