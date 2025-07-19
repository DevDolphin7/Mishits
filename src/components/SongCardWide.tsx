import "../styles/SongCards.scss";

export default function SongCardWide({ song }: { song: Sound }) {
  return (
    <section id="song-card-wide" className="song-card">
      <div id="hmi">
        <div id="song-info">
          <h4>{song.title}</h4>
          <h5>{song.artist}</h5>
        </div>

        <div id="controls">
          <audio src={song.data} controls style={{ width: "100%" }}>
            <code> Your browser doesn't support audio tags</code>
          </audio>
        </div>
      </div>

      <div id="artwork">
        <img src={song.albumArtwork} alt={`${song.album} Artwork`} />
      </div>
    </section>
  );
}
