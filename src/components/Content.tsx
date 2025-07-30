import { useState, useEffect, useContext } from "react";
import { DeviceContext } from "../contexts/Device";
import { getContent, organiseContent } from "./utils/utils";
import Loading from "./utils/Loading";
import Attention from "./Attention";
import "../styles/Content.scss";

export default function Content() {
  const [cloudSongs, setCloudSongs] = useState<Sound[]>([]);
  const [cloudNews, setCloudNews] = useState<News[]>([]);
  const device = useContext(DeviceContext);

  useEffect(() => {
    getContent(setCloudSongs, setCloudNews);
  }, []);

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
