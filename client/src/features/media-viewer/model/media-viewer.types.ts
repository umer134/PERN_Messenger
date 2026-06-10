export type MediaType =
  | "image"
  | "video"
  | "audio";

export type MediaItem = {
  id: string;

  type: MediaType;

  thumbnailUrl?: string;

  url: string;

  name?: string;
};