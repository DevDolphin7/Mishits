import { useState, useEffect } from "react";
import { getImages } from "./utils/api";
import CloudImage from "./utils/CloudImage";
import "../styles/Attention.scss";

export default function Attention() {
  const [cloudImageIDs, setCloudImageIDs] = useState<string[]>([]);

  useEffect(() => {
    getImages("attention")
      .then((imageIDs) => {
        console.log("Fetched images:", imageIDs);
        setCloudImageIDs(imageIDs);
      })
      .catch((error) => {
        console.error("Error fetching images: ", error);
      });
  }, []);

  return (
    <section id="attention">
      {cloudImageIDs.map((imageID: string, index: number) => (
        <CloudImage cloudImageID={imageID} key={index} />
      ))}
    </section>
  );
}
