import { useState, useEffect } from "react";
import { getCloud } from "./api";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import Loading from "./Loading";
import type { CloudinaryImage } from "@cloudinary/url-gen/index";

export default function CloudImage({ cloudImageID }: { cloudImageID: string }) {
  const [image, setImage] = useState<CloudinaryImage>();

  useEffect(() => {
    const cloud = getCloud();

    setImage(
      cloud
        .image(cloudImageID)
        .format("auto")
        .quality("auto")
        .resize(auto().width(1980))
    );
  }, [cloudImageID]);

  return (
    <div className="cloud-photo">
      {image ? <AdvancedImage cldImg={image} /> : <Loading />}
    </div>
  );
}
