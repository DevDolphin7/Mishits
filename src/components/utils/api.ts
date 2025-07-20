import { Cloudinary } from "@cloudinary/url-gen";

let cloudinaryCache: Cloudinary | null = null;

export function getCloud(): Cloudinary {
  if (!cloudinaryCache) {
    cloudinaryCache = new Cloudinary({ cloud: { cloudName: "dmspa7m1k" } });
  }
  return cloudinaryCache;
}

export function getMedias(
  tag: string,
  media: string
): Promise<CloudResponse[]> {
  return fetch(
    `https://res.cloudinary.com/dmspa7m1k/${media}/list/${tag.toLowerCase()}.json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Failed to fetch image list: ", error);
      return [];
    })
    .then(({ resources }: { resources: CloudResponse[] }) => {
      return resources;
    });
}
