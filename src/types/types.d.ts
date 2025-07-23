type Device = "mobile" | "tablet" | "monitor";

interface Media {
  media: React.ReactElement | null;
  mediaAltText: string;
}

interface Album {
  album: string;
  albumArtwork: React.ReactElement | null;
  albumArtworkAlt: string;
}

interface Attention extends Media {
  text?: string;
}

interface Sound extends Album {
  title: string;
  artist: string;
  data: CloudinaryVideo;
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

interface CloudResponse {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: string;
  context?: {
    custom?: {
      caption: string;
      alt: string;
      album?: string;
      [key: string]: string;
    };
  };
  [key: string]: string | Array | object | undefined;
}

interface ErrorResponse {
  errorStatus: number;
  url: string;
}

interface CloudContent {
  ListenNow: Sound[];
}
