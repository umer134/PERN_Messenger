import { MessageAttachmentVM } from "../model/message.types";

export function resolveAttachmentTypeFromPath(
  path: string
): MessageAttachmentVM["type"] {
  const fileName = path.split("/").pop()?.toLowerCase() ?? "";

  if (fileName.startsWith("voice-")) {
    return "voice";
  }

  const ext = fileName.split(".").pop();

  if (!ext) return "file";

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return "image";
  }

  if (["mp4", "mov"].includes(ext)) {
    return "video";
  }

  if (ext === "webm") {
    return "video";
  }

  if (["mp3", "wav", "ogg", "m4a", "aac"].includes(ext)) {
    return "audio";
  }

  return "file";
}

export function resolveAttachmentTypeFromFile(
  file: File
): MessageAttachmentVM["type"] {
  if (file.name.startsWith("voice-")) {
    return "voice";
  }

  if (file.type.startsWith("image/")) {
    return "image";
  }

  if (file.type.startsWith("video/")) {
    return "video";
  }

  if (file.type.startsWith("audio/")) {
    return file.name.startsWith("voice-") ? "voice" : "audio";
  }

  return "file";
}
