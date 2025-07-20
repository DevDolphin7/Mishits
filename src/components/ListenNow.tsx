import SongCardWide from "./SongCardWide.tsx";
import SongCardThin from "./SongCardThin.tsx";
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
      {songs.map((sound, index) => {
        if (device === "mobile")
          return <SongCardWide song={sound} key={index} />;
        if (device === "tablet")
          return <SongCardThin song={sound} key={index} />;
        return null;
      })}
    </section>
  );
}
