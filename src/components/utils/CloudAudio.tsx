import { useState, useEffect } from "react";
import { AdvancedVideo } from "@cloudinary/react";
import Loading from "./Loading";
import { getCloud } from "./api";
import type { CloudinaryVideo } from "@cloudinary/url-gen/index";

export default function CloudVideo({ cloudAudioID }: { cloudAudioID: string }) {
  const [audio, setAudio] = useState<CloudinaryVideo>();

  useEffect(() => {
    const cloud = getCloud();

    setAudio(cloud.video(cloudAudioID).format("auto").quality("auto"));
  }, [cloudAudioID]);

  return (
    <div className="controls">
      {audio ? <AdvancedVideo cldVid={audio} controls /> : <Loading />}
    </div>
  );
}
