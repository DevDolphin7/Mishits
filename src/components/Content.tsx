import { useState, useEffect } from "react";
import { getMedias, getCloud } from "./utils/api";
import { getDevice } from "./utils/utils";
import Loading from "./utils/Loading";
import CloudImage from "./utils/CloudImage";
import Attention from "./Attention";
import ListenNow from "./ListenNow";
import News from "./News";
import "../styles/Content.scss";

export default function Content() {
  const [cloudSongs, setCloudSongs] = useState<Sound[]>([]);
  const [cloudNews, setCloudNews] = useState<News[]>([]);
  const [device, setDevice] = useState<Device>(getDevice());

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [device]);

  return (
    <div id="content">
      {device !== "mobile" ? <Attention /> : null}
      {cloudSongs.length === 0 ? (
        <Loading />
      ) : (
        <ListenNow device={device} songs={cloudSongs} />
      )}
      {cloudNews.length === 0 ? (
        <Loading />
      ) : (
        cloudNews.map((newsItem, index) => <News news={newsItem} key={index} />)
      )}
    </div>
  );
}
