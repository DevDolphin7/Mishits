import { getMedias } from "./api";
import CloudImage from "./CloudImage";
import ListenNow from "../ListenNow";
import News from "../News";
import sizes from "./sizes";
import type { ReactElement } from "react";

export function getDevice(): Device {
  if (window.innerWidth < sizes.mobileMaxWidth) return "mobile";
  if (window.innerWidth < sizes.tabletMaxWidth) return "tablet";
  return "monitor";
}

const getAlbums = () => {
  return getMedias("Album", "image").then((images) => {
    if ("errorStatus" in images) throw Error("No album artwork found");

    return images.map((image, index) => {
      const imageComponent = (
        <CloudImage cloudImageID={image.public_id} key={index} />
      );
      return {
        album: image.context?.custom?.album || "Unknown Album",
        albumArtwork: imageComponent,
        albumArtworkAlt: image.context?.custom?.alt || "Album Artwork",
      };
    });
  });
};

const getNews = () => {
  return getMedias("News", "image").then((news) => {
    if ("errorStatus" in news) throw Error("No news items found");

    return news.map((newsItem, index) => {
      const imageComponent = (
        <CloudImage cloudImageID={newsItem.public_id} key={index} />
      );

      return {
        title: newsItem.context?.custom?.caption || "Untitled News",
        body: newsItem.context?.custom?.body
          ? newsItem.context?.custom?.body.split("  ")
          : [],
        footer: newsItem.context?.custom?.footer || "",
        media: imageComponent,
        mediaAltText: newsItem.context?.custom?.alt || "News Image",
      };
    });
  });
};

const formatSongs = (songs: CloudResponse[], albums: Album[]) => {
  return songs.map((song) => {
    const album =
      albums.filter(
        (album) => album.album === song.context?.custom?.album
      )[0] || null;

    return {
      title: song.context?.custom?.caption || "Untitled",
      artist: "Mishits",
      album: song.context?.custom?.album || "Unknown Album",
      albumArtwork: album.albumArtwork || null,
      albumArtworkAlt: album.albumArtworkAlt || "Album Artwork",
      audioID: song.public_id,
    };
  });
};

export function getContent(
  setCloudSongs: React.Dispatch<React.SetStateAction<Sound[]>>,
  setCloudNews: React.Dispatch<React.SetStateAction<News[]>>
) {
  const albumsPromise = getAlbums();

  const songsPromise = getMedias("Listen", "video").then((songs) => {
    if ("errorStatus" in songs) throw Error("No songs found");

    return songs;
  });

  const newsPromise = getNews();

  Promise.all([albumsPromise, songsPromise, newsPromise])
    .then(([albums, songs, news]: [Album[], CloudResponse[], News[]]) => {
      setCloudNews(news);

      setCloudSongs(formatSongs(songs, albums));
    })
    .catch((error) => {
      console.warn(`Error fetching content: ${error}`);
    });
}

const spliceSameAlbumOnly = (songsCopy: Sound[]) => {
  const songListCopy = [...songsCopy];

  const sameAlbum = songListCopy
    .sort((a, b) => (a.album < b.album ? -1 : 1))
    .filter((song) => song.album === songsCopy[0].album)
    .splice(0, 3);

  sameAlbum.forEach((song) => {
    const index = songsCopy.indexOf(song);
    // songsCopy intentionally mutated as recursive step - it is already a copy of the React State variable.
    songsCopy.splice(index, index + 1);
  });

  return sameAlbum;
};

export function organiseContent(
  songs: Sound[],
  news: News[],
  device: Device
): ReactElement[] {
  const songsCopy = [...songs];
  const newsCopy = [...news];
  const output = [] as ReactElement[];

  const organiseThreeToOne = (
    songList: Sound[],
    newsList: News[]
  ): ReactElement[] => {
    if (songList.length === 0 && newsList.length === 0) return output;

    if (songList.length !== 0) {
      const upToThreeSongs =
        device === "monitor"
          ? spliceSameAlbumOnly(songList)
          : songList.splice(0, 3);

      output.push(<ListenNow songs={upToThreeSongs} key={output.length} />);
    }

    if (newsList.length !== 0) {
      const newsItem = newsList.pop();
      if (newsItem) output.push(<News news={newsItem} key={output.length} />);
    }

    return organiseThreeToOne(songList, newsList);
  };

  return organiseThreeToOne(songsCopy, newsCopy);
}
