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

export function getContent(
  setCloudSongs: React.Dispatch<React.SetStateAction<Sound[]>>,
  setCloudNews: React.Dispatch<React.SetStateAction<News[]>>
) {
  const albumsPromise = getMedias("Album", "image")
    .then((images) => {
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
    })
    .catch((error) => {
      console.error("Error fetching album images: ", error);
    });

  const songsPromise = getMedias("Listen", "video").catch((error) => {
    console.error("Error fetching songs: ", error);
  });

  const newsPromise = getMedias("News", "image")
    .then((images) => {
      return images.map((image, index) => {
        const imageComponent = (
          <CloudImage cloudImageID={image.public_id} key={index} />
        );

        return {
          title: image.context?.custom?.caption || "Untitled News",
          body: image.context?.custom?.body
            ? image.context?.custom?.body.split("  ")
            : [],
          footer: image.context?.custom?.footer || "",
          media: imageComponent,
          mediaAltText: image.context?.custom?.alt || "News Image",
        };
      });
    })
    .catch((error) => {
      console.error("Error fetching news images: ", error);
    });

  Promise.all([albumsPromise, songsPromise, newsPromise])
    .then(
      ([albums, songs, news]: [
        Album[] | void,
        CloudResponse[] | void,
        News[] | void
      ]) => {
        if (!songs) {
          console.error("No songs data available");
          return;
        }
        if (!albums) {
          console.error("No albums data available");
          return;
        }
        if (!news) {
          console.error("No news data available");
          return;
        }

        const cloud = getCloud();

        const formattedSongs = songs.map((song) => {
          const album =
            albums.filter(
              (art) => art.album === song.context?.custom?.album
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

        setCloudNews(news);

        return formattedSongs;
      }
    )
    .catch((error) => {
      console.error("Error fetching content: ", error);
    })
    .then((songsWithData) => {
      if (songsWithData) {
        setCloudSongs(songsWithData);
      } else {
        console.error("No songs with data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching song data: ", error);
    });
}

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
      const sameAlbumSplice = () => {
        const sameAlbum = songList
          .sort((a, b) => (a.album < b.album ? -1 : 1))
          .filter((song) => song.album === songList[0].album)
          .splice(0, 3);

        sameAlbum.forEach((song) => {
          const index = songList.indexOf(song);
          songList.splice(index, index + 1);
        });

        return sameAlbum;
      };

      const upToThreeSongs =
        device === "monitor" ? sameAlbumSplice() : songList.splice(0, 3);

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
