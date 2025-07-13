import ListenNow from "./ListenNow";
import News from "./News";
import newsImage from "../../Plan/Plan v1.png";
import "../styles/Content.scss";

export default function Content() {
  const news = {
    title: "hello, world",
    image: newsImage,
    imageAltText: "plan v1",
  };

  return (
    <>
      <ListenNow />
      <News news={news} />
    </>
  );
}
