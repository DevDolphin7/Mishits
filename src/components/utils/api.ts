import { Cloudinary } from "@cloudinary/url-gen";

let cloudinaryCache: Cloudinary | null = null;

export function getCloud(): Cloudinary {
  if (!cloudinaryCache) {
    cloudinaryCache = new Cloudinary({ cloud: { cloudName: "dmspa7m1k" } });
  }
  return cloudinaryCache;
}

export function getImages(tag: string): Promise<string[]> {
  return fetch(`https://res.cloudinary.com/dmspa7m1k/image/list/${tag}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Failed to fetch image list:", error);
      return [];
    })
    .then((data) => {
      return data.resources.map(
        (resource: { public_id: string }) => resource.public_id
      );
    });
}
