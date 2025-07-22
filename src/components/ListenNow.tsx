import SongCardWide from "./SongCardWide.tsx";
import SongCardThin from "./SongCardThin.tsx";
import SongCardBasic from "./SongCardBasic.tsx";
import "../styles/ListenNow.scss";

export default function ListenNow({
  device,
  songs,
}: {
  device: Device;
  songs: Sound[];
}) {
  return (
    <section id="listen-now">
      {songs.map((song, index) => {
        if (device === "mobile")
          return <SongCardWide song={song} key={index} />;
        if (device === "tablet")
          return <SongCardThin song={song} key={index} />;

        return null;
      })}
      {device === "monitor" ? (
        <section id="album-focus">
          {songs[0].albumArtwork}
          <div id="album-focus-song-cards">
            {songs.map((song, index) => (
              <SongCardBasic song={song} key={index} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
