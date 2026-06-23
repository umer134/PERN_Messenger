export const formatLastSeen = (
  timestamp?: number
) => {

  if (!timestamp)
    return "offline";

  const diff =
    Date.now() - timestamp;

  const minutes =
    Math.floor(
      diff / 1000 / 60
    );

  if (minutes < 1)
    return "last seen just now";

  if (minutes < 60)
    return `last seen ${minutes} min ago`;

  const hours =
    Math.floor(minutes / 60);

  if (hours < 24)
    return `last seen ${hours} h ago`;

  return "last seen long ago";
};