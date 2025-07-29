import { useContext } from "react";
import { DeviceContext } from "../contexts/Device.tsx";
import SongCardWide from "./SongCardWide.tsx";
import SongCardThin from "./SongCardThin.tsx";
import SongCardBasic from "./SongCardBasic.tsx";
import "../styles/ListenNow.scss";

export default function ListenNow({ songs }: { songs: Sound[] }) {
  const device = useContext(DeviceContext);

  return (
    <section className="listen-now">
      {songs.map((song, index) => {
        if (device === "mobile")
          return <SongCardWide song={song} key={index} />;
        if (device === "tablet")
          return <SongCardThin song={song} key={index} />;

        return null;
      })}
      {device === "monitor" ? (
        <section className="album-focus">
          {songs[0].albumArtwork}
          <div className="album-focus-song-cards">
            {songs.map((song, index) => (
              <SongCardBasic song={song} key={index} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
