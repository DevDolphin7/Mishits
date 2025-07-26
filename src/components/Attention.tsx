import { useState, useEffect } from "react";
import { getMedias } from "./utils/api";
import CloudImage from "./utils/CloudImage";
import CloudVideo from "./utils/CloudVideo";
import "../styles/Attention.scss";
import Loading from "./utils/Loading";

export default function Attention() {
  const [cloudMedias, setCloudMedias] = useState<CloudResponse[]>([]);

  useEffect(() => {
    getMedias("attention", "video")
      .then((videos) => {
        if ("errorStatus" in videos) return getMedias("attention", "image");

        setCloudMedias(videos);
      })
      .then((images) => {
        if (images === undefined) return;

        if ("errorStatus" in images)
          throw Error("No images or videos found with tag 'Attention'");

        setCloudMedias(images);
      })
      .catch((error) => {
        console.warn("Error fetching attention: ", error);
        console.info("Using default attention grabber");

        const defaultMedia: CloudResponse = {
          asset_folder: "Mishits/Attention",
          asset_id: "d8b47ac7464490c9079c931544419e1e0",
          created_at: "2025-07-22T19:54:50Z",
          format: "mp4",
          height: 1080,
          public_id: "6158366-hd_1920_1080_30fps_zajtef",
          type: "upload",
          version: 1753214090,
          width: 1920,
          context: {
            custom: {
              alt: "A skull chandelier in a room heavily decorated with skulls and bones",
              caption: "Swinging from the chandelier",
            },
          },
        };

        setCloudMedias([defaultMedia]);
      });
  }, []);

  return (
    <section id="attention">
      {cloudMedias.length === 0 ? (
        <Loading />
      ) : (
        cloudMedias.map((media: CloudResponse, index: number) => {
          if (["webm", "mp4", "ogv"].includes(media.format))
            return <CloudVideo cloudVideoID={media.public_id} key={index} />;
          return <CloudImage cloudImageID={media.public_id} key={index} />;
        })
      )}
    </section>
  );
}
