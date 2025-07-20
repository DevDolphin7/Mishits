import { useState, useEffect } from "react";
import { getMedias, getCloud } from "./utils/api";
import { getDevice } from "./utils/utils";
import Loading from "./utils/Loading";
import CloudImage from "./utils/CloudImage";
import Attention from "./Attention";
import ListenNow from "./ListenNow";
import News from "./News";
import newsImage from "../../Plan/Plan v1.png";
import "../styles/Content.scss";

export default function Content() {
  const [cloudContents, setCloudContents] = useState<Sound[]>([]);
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

    Promise.all([albumsPromise, songsPromise])
      .then(([albums, songs]: [Album[] | void, CloudResponse[] | void]) => {
        if (!songs) {
          console.error("No songs data available");
          return;
        }
        if (!albums) {
          console.error("No albums data available");
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

        return formattedSongs;
      })
      .catch((error) => {
        console.error("Error fetching content: ", error);
      })
      .then((songsWithData) => {
        if (songsWithData) {
          console.log("Songs with data:", songsWithData);
          setCloudContents(songsWithData);
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

  const news = {
    title: "hello, world",
    body: ["info1", "info2", "info3"],
    footer: "See you there!",
    media: newsImage,
    mediaAltText: "plan v1",
  };

  return (
    <div id="content">
      {device !== "mobile" ? <Attention /> : null}
      {cloudContents.length === 0 ? (
        <Loading />
      ) : (
        <>
          <ListenNow device={device} songs={cloudContents} />
          <News news={news} />
        </>
      )}
    </div>
  );
}
