import { useState, useEffect } from "react";
import { getDevice, getContent, organiseContent } from "./utils/utils";
import Loading from "./utils/Loading";
import Attention from "./Attention";
import "../styles/Content.scss";

export default function Content() {
  const [cloudSongs, setCloudSongs] = useState<Sound[]>([]);
  const [cloudNews, setCloudNews] = useState<News[]>([]);
  const [device, setDevice] = useState<Device>(getDevice());

  useEffect(() => {
    getContent(setCloudSongs, setCloudNews);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [device]);

  return (
    <main>
      {device !== "mobile" ? <Attention /> : null}
      {cloudSongs.length === 0 ? (
        <Loading />
      ) : (
        organiseContent(cloudSongs, cloudNews, device)
      )}
    </main>
  );
}
