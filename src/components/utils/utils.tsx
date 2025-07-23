import { getMedias, getCloud } from "./api";
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
  const cloud = getCloud();

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
      data: cloud.video(song.public_id).format("auto"),
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

      return formatSongs(songs, albums);
    })
    .then((songsWithData) => {
      setCloudSongs(songsWithData);
    })
    .catch((error) => {
      console.warn(`Error fetching content: ${error}`);
    });
}

const spliceSameAlbumOnly = (songList: Sound[]) => {
  const songListCopy = [...songList];

  const sameAlbum = songListCopy
    .sort((a, b) => (a.album < b.album ? -1 : 1))
    .filter((song) => song.album === songList[0].album)
    .splice(0, 3);

  sameAlbum.forEach((song) => {
    const index = songList.indexOf(song);
    // songList intentionally mutated as recursive step
    // (songList is already a copy of the input - songs)
    songList.splice(index, index + 1);
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

      output.push(
        <ListenNow device={device} songs={upToThreeSongs} key={output.length} />
      );
    }

    if (newsList.length !== 0) {
      const newsItem = newsList.pop();
      if (newsItem) output.push(<News news={newsItem} key={output.length} />);
    }

    return organiseThreeToOne(songList, newsList);
  };

  return organiseThreeToOne(songsCopy, newsCopy);
}
