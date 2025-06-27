import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProvideTheme } from "../contexts/Theme.tsx";

export default function MediaCard({ media }: { media: Sound }) {
  return (
    <ProvideTheme>
      <Card sx={{ display: "flex", backgroundColor: "#303030" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {media.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {media.artist}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <audio src={media.data} controls style={{ width: "fit-content" }}>
              <code> Your browser doesn't support audio tags</code>
            </audio>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/static/images/cards/live-from-space.jpg"
          alt={`${media.album} Artwork`}
        />
      </Card>
    </ProvideTheme>
  );
}
