import ListenNow from "./ListenNow";
import News from "./News";
import newsImage from "../../Plan/Plan v1.png";
import "../styles/Content.scss";

export default function Content() {
  const news = {
    title: "hello, world",
    body: ["info1", "info2", "info3"],
    footer: "See you there!",
    image: newsImage,
    imageAltText: "plan v1",
  };

  return (
    <div id="content">
      <ListenNow />
      <News news={news} />
    </div>
  );
}
