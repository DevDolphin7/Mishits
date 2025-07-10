import "../styles/SongCard.scss";

export default function SongCardWide({ song }: { song: Sound }) {
  return (
    <div id="song-card-wide">
      <div id="info">
        {song.title}
        {song.artist}
      </div>

      <audio src={song.data} controls style={{ width: "100%" }}>
        <code> Your browser doesn't support audio tags</code>
      </audio>

      <img src={song.albumArtwork} alt={`${song.album} Artwork`} />
    </div>
  );
}
