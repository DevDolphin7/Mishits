type Device = "mobile" | "tablet" | "monitor";

interface Media {
  media: string;
  mediaAltText: string;
}

interface Attention extends Media {
  text?: string;
}

interface Sound {
  title: string;
  artist: string;
  album: string;
  albumArtwork: string;
  data: string;
}

interface News extends Media {
  title: string;
  body: string[];
  footer: string;
}

interface NavButtons {
  [key: string]: string;
}

interface Sizes {
  mobileMaxWidth: number;
  tabletMaxWidth: number;
}
