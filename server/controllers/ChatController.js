const ApiError = require('../exceptions/api-error');
//const { ChatModel, MessageModel, ChatMemberModel } = require('../models')
const chatService = require("../service/chat-service");

class ChatController {

    async createChat (req, res, next) {
        try {
            const { userId } = req.body;
            const currentUser = user.id;
            
            const chatData = await chatService.createChat(userId, currentUser);
            return res.json(chatData);
        } catch (e) {
            next(e);
        }
    }
    async getUserChats (req, res, next) {
        try {
            const userId = req.user.id;
            const usersData = await chatService.getUserChats(userId);
            return res.json(usersData);
        } catch(e) {
            next(e);
        }
    }
    async findUserChat(req, res, next) {
        try {
            const {userId: rawUserId} = req.params;
            const senderId = req.user.id;

            const userId = parseInt(rawUserId);
            if (isNaN(userId)) {
              throw ApiError.BadRequest("Invalid chat ID");
            }

            const chat = await chatService.findUserChat(senderId, userId);
            return res.json(chat);
        } catch(e) {
            next(e);
        }
    }
    async sendMessage (req, res, next) {
        try {
            const {chatId} = req.params;
            const {content} = req.body;
            const files = req.files;
            const senderId = req.user.id;
            if(!content && !files) {
                throw ApiError.BadRequest('Empty message');
            }
            const sendResult = await chatService.sendMessage(chatId, content, files, senderId);
            return res.json(sendResult);
        } catch(e) {
            next(e);
        }
    }
    async getMessages (req, res, next) {
        try {
            const { chatId: rawChatId } = req.params;
            const userId = req.user.id;
            const { cursor, limit: rawLimit } = req.query;
            
            // Валидация chatId
            const chatId = parseInt(rawChatId);
            if (isNaN(chatId)) {
              throw ApiError.BadRequest("Invalid chat ID");
            }
            const limit = Math.min(parseInt(rawLimit) || 50, 100);
            const messageData = await chatService.getMessages(chatId, userId, cursor, limit);
            
            return res.json(messageData);
        } catch(e) {
            next(e);
        }
    }
     async readMessage (req, res, next) {
        try {
            const chatId = req.params.chatId;
            const senderId = req.user.id;
            const messageData = await chatService.readMessage(chatId, senderId);

            return res.json(messageData);
        } catch (e) {
            next(e)
        }
    }

    
}

module.exports = new ChatController();