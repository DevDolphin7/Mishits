import CloudAudio from "./utils/CloudAudio";
import "../styles/SongCards.scss";

export default function SongCardBasic({ song }: { song: Sound }) {
  return (
    <section className="song-card song-card-basic">
      <div className="song-info">
        <h4>{song.title}</h4>
        <h5>{song.album}</h5>
      </div>

      <CloudAudio cloudAudioID={song.audioID} />
    </section>
  );
}
