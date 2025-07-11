import ListenNow from "./ListenNow";
import News from "./News";
import "../styles/Content.scss";

export default function Content() {
  const news = {
    title: "hello, world",
  };

  return (
    <>
      <ListenNow />
      <News news={news} />
    </>
  );
}
