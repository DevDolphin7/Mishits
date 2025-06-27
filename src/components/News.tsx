import MediaCard from "./MediaCard.tsx";
import sound from "../assets/Halloween.m4a";
import "../styles/News.scss";

export default function News() {
  const testSound: Sound = {
    title: "Haloween - Splinter Studios",
    artist: "Mishits",
    album: "Knife Party",
    albumArtwork: "Awesome artwork here",
    data: sound,
  };

  console.log(sound);

  return (
    <>
      <p>hello, world!</p>
      <MediaCard media={testSound} />
    </>
  );
}
