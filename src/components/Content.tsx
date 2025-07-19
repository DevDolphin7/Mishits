import { useState, useEffect } from "react";
import { getDevice } from "./utils/utils";
import Attention from "./Attention";
import ListenNow from "./ListenNow";
import News from "./News";
import newsImage from "../../Plan/Plan v1.png";
import "../styles/Content.scss";

export default function Content() {
  const [device, setDevice] = useState<Device>(getDevice());

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [device]);

  const news = {
    title: "hello, world",
    body: ["info1", "info2", "info3"],
    footer: "See you there!",
    media: newsImage,
    mediaAltText: "plan v1",
  };

  return (
    <div id="content">
      {device !== "mobile" ? <Attention /> : null}
      <ListenNow device={device} />
      <News news={news} />
    </div>
  );
}
