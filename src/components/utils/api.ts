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
): Promise<CloudResponse[] | ErrorResponse> {
  return fetch(
    `https://res.cloudinary.com/dmspa7m1k/${media}/list/${tag.toLowerCase()}.json`
  )
    .then((response) => {
      if (!response.ok) {
        return {
          errorStatus: response.status,
          url: response.url,
        };
      }
      return response.json();
    })
    .then(
      (formattedResponse: ErrorResponse | { resources: CloudResponse[] }) => {
        if ("errorStatus" in formattedResponse) {
          return formattedResponse;
        }
        return formattedResponse.resources;
      }
    );
}
