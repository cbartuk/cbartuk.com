import { urlFor } from "@/sanity";
import { ImageSource } from "@/typings";

export const getImageUrl = (image?: ImageSource): string => {
  if (!image) {
    return "";
  }

  if (typeof image === "string") {
    return image;
  }

  try {
    return urlFor(image).url();
  } catch {
    return "";
  }
};
