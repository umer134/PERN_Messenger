module.exports = function getPreviewText(message) {
  if (!message) {
    return "";
  }

  if (message.content?.trim()) {
    return message.content;
  }

  const file = message.attachedFiles?.[0];

  if (!file) {
    return "";
  }

  switch (file.type) {
    case "voice":
      return "🎤 Голосовое сообщение";

    case "image":
      return "🖼️ Фото";

    case "video":
      return "🎬 Видео";

    case "audio":
      return "🎵 Аудио";

    default:
      return "📎 Вложение";
  }
}