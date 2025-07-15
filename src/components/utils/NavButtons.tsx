const navButtons: NavButtons = {
  home: "Home",
  listen: "Listen",
  news: "News",
  pics: "Pics",
  about: "About",
};

const handleNavClick = (location: string) => {
  console.log(location);
};

export default function NavButtons({ fiend }: { fiend: boolean }) {
  return (
    <>
      {Object.keys(navButtons).map((button, index) => (
        <h2 key={index} onClick={() => handleNavClick(button)}>
          {!fiend
            ? navButtons[button]
            : button === "about"
            ? `${navButtons[button]} Fiends`
            : `Fiend ${navButtons[button]}`}
        </h2>
      ))}
    </>
  );
}
