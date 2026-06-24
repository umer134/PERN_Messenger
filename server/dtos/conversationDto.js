module.exports = class ConversationDto {
  constructor({
    id,
    title,
    avatar,
    isGroup,
    unreadCount,
    lastMessage,
    updatedAt,
    participantId,
    isOnline,
    lastSeen,
  }) {
    this.id = id;

    this.title = title;

    this.avatar = avatar;

    this.isGroup = isGroup;

    this.unreadCount = unreadCount;

    this.lastMessage = lastMessage;

    this.updatedAt = updatedAt;

    this.participantId = participantId;

    this.isOnline = isOnline;

    this.lastSeen = lastSeen;
  }
};
