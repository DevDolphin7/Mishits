import { useState, useEffect } from "react";
import { getMedias } from "./utils/api";
import CloudImage from "./utils/CloudImage";
import "../styles/Attention.scss";
import Loading from "./utils/Loading";

export default function Attention() {
  const [cloudImageIDs, setCloudImageIDs] = useState<string[]>([]);

  useEffect(() => {
    getMedias("attention", "image")
      .then((images) => {
        setCloudImageIDs(images.map((image) => image.public_id));
      })
      .catch((error) => {
        console.error("Error fetching images: ", error);
      });
  }, []);

  return (
    <section id="attention">
      {cloudImageIDs.length === 0 ? (
        <Loading />
      ) : (
        cloudImageIDs.map((imageID: string, index: number) => (
          <CloudImage cloudImageID={imageID} key={index} />
        ))
      )}
    </section>
  );
}
