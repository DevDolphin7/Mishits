import "../styles/SongCards.scss";

export default function SongCardWide({ song }: { song: Sound }) {
  return (
    <section id="song-card-thin" className="song-card">
      <div id="song-info">
        <h4>{song.title}</h4>
      </div>

      <div id="artwork">
        <img src={song.albumArtwork} alt={`${song.album} Artwork`} />
      </div>

      <div id="controls">
        <audio src={song.data} controls style={{ width: "100%" }}>
          <code> Your browser doesn't support audio tags</code>
        </audio>
      </div>
    </section>
  );
}
