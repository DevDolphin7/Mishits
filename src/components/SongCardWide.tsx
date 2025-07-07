import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProvideTheme } from "../contexts/Theme.tsx";
import "../styles/SongCard.scss";

export default function SongCardWide({ song }: { song: Sound }) {
  return (
    <div id="song-card-wide">
      <ProvideTheme>
        <Card
          sx={{
            display: "flex",
            width: "100%",
            height: 180,
            backgroundColor: "#303030",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {song.title}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {song.artist}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <audio src={song.data} controls style={{ width: "100%" }}>
                <code> Your browser doesn't support audio tags</code>
              </audio>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151, height: "100%" }}
            image={song.albumArtwork}
            alt={`${song.album} Artwork`}
          />
        </Card>
      </ProvideTheme>
    </div>
  );
}
