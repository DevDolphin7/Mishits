import CloudAudio from "./utils/CloudAudio";
import "../styles/SongCards.scss";

export default function SongCardWide({ song }: { song: Sound }) {
  return (
    <section className="song-card song-card-wide">
      <div className="hmi">
        <div className="song-info">
          <h1>{song.title}</h1>
          <h2>{song.album}</h2>
        </div>

        <CloudAudio cloudAudioID={song.audioID} />
      </div>

      <div className="artwork">{song.albumArtwork}</div>
    </section>
  );
}
