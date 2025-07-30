import CloudAudio from "./utils/CloudAudio";
import "../styles/SongCards.scss";

export default function SongCardBasic({ song }: { song: Sound }) {
  return (
    <section className="song-card song-card-basic">
      <div className="song-info">
        <h1>{song.title}</h1>
        <h2>{song.album}</h2>
      </div>

      <CloudAudio cloudAudioID={song.audioID} />
    </section>
  );
}
