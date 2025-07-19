import { getCloud } from "./utils";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

export default function CloudImage() {
  const cloud = getCloud();

  const image = cloud
    .image("pexels-moklebust-11178916_zi7kxp.jpg")
    .format("auto")
    .quality("auto")
    .resize(auto().width(1980));

  return (
    <div className="cloud-photo">
      <AdvancedImage cldImg={image} />
    </div>
  );
}
