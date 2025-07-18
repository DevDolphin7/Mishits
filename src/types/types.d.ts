type Device = "mobile" | "tablet" | "monitor";

interface Sound {
  title: string;
  artist: string;
  album: string;
  albumArtwork: string;
  data: string;
}

interface News {
  title: string;
  body: string[];
  footer: string;
  image: string;
  imageAltText: string;
}

interface NavButtons {
  [key: string]: string;
}

interface Sizes {
  mobileMaxWidth: number;
  tabletMaxWidth: number;
}