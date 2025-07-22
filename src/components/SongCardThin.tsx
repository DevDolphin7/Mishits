import { AdvancedVideo } from "@cloudinary/react";
import Loading from "./utils/Loading";
import "../styles/SongCards.scss";

export default function SongCardWide({ song }: { song: Sound }) {
  return (
    <section id="song-card-thin" className="song-card">
      <div id="song-info">
        <h4>{song.title}</h4>
        <h5>{song.album}</h5>
      </div>

      <div id="artwork">{song.albumArtwork}</div>

      <div id="controls">
        {song.data ? (
          <AdvancedVideo
            cldVid={song.data}
            controls
            className="cloudinary-advanced-video"
          />
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
