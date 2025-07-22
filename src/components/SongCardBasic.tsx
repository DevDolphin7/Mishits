import { AdvancedVideo } from "@cloudinary/react";
import Loading from "./utils/Loading";
import "../styles/SongCards.scss";

export default function SongCardBasic({ song }: { song: Sound }) {
  return (
    <section id="song-card-basic" className="song-card">
      <div id="song-info">
        <h4>{song.title}</h4>
        <h5>{song.album}</h5>
      </div>

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
