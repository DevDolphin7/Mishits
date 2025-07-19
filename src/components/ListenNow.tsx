import SongCardWide from "./SongCardWide.tsx";
import SongCardThin from "./SongCardThin.tsx";
import sound from "../assets/Halloween.m4a";
import albumArt from "../../Plan/Plan v1.png";
import "../styles/ListenNow.scss";

export default function ListenNow({ device }: { device: Device }) {
  const testSound: Sound = {
    title: "Haloween - Splinter Studios",
    artist: "Mishits",
    album: "Knife Party",
    albumArtwork: albumArt,
    data: sound,
  };

  const sounds = Array(3).fill(testSound);

  return (
    <section id="listen-now">
      {sounds.map((sound, index) => {
        if (device === "mobile")
          return <SongCardWide song={sound} key={index} />;
        if (device === "tablet")
          return <SongCardThin song={sound} key={index} />;
        return null;
      })}
    </section>
  );
}
