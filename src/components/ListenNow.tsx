import SongCardWide from "./SongCardWide.tsx";
import sound from "../assets/Halloween.m4a";
import albumArt from "../../Plan/Plan v1.png";
import "../styles/News.scss";

export default function ListenNow() {
  const testSound: Sound = {
    title: "Haloween - Splinter Studios",
    artist: "Mishits",
    album: "Knife Party",
    albumArtwork: albumArt,
    data: sound,
  };

  return (
    <>
      <SongCardWide song={testSound} />
      <SongCardWide song={testSound} />
      <SongCardWide song={testSound} />
    </>
  );
}
