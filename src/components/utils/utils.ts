import { Cloudinary } from "@cloudinary/url-gen";
import sizes from "./sizes";

let cloudinaryCache: Cloudinary | null = null;

const getDevice = (): Device => {
  if (window.innerWidth < sizes.mobileMaxWidth) return "mobile";
  if (window.innerWidth < sizes.tabletMaxWidth) return "tablet";
  return "monitor";
};

const getCloud = (): Cloudinary => {
  if (!cloudinaryCache) {
    cloudinaryCache = new Cloudinary({ cloud: { cloudName: "dmspa7m1k" } });
  }
  return cloudinaryCache;
};

export { getDevice, getCloud };
