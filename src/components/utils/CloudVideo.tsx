import { useState, useEffect } from "react";
import { AdvancedVideo } from "@cloudinary/react";
import Loading from "./Loading";
import { getCloud } from "./api";
import type { CloudinaryVideo } from "@cloudinary/url-gen/index";

export default function CloudVideo({ cloudVideoID }: { cloudVideoID: string }) {
  const [video, setVideo] = useState<CloudinaryVideo>();

  useEffect(() => {
    const cloud = getCloud();

    setVideo(cloud.video(cloudVideoID).format("auto").quality("auto"));
  }, [cloudVideoID]);

  return (
    <div className="cloud-video">
      {video ? (
        <AdvancedVideo
          cldVid={video}
          className="cloudinary-advanced-video"
          muted
          autoPlay
          loop
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
