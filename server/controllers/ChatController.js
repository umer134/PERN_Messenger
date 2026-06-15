const ApiError = require('../exceptions/api-error');
//const { ChatModel, MessageModel, ChatMemberModel } = require('../models')
const chatService = require("../service/chat-service");

class ChatController {

    async createChat (req, res, next) {
        try {
            const { recipientId } = req.body;
            const senderId = user.id;
            
            const chatData = await chatService.createChat(recipientId, senderId);
            return res.json(chatData);
        } catch (e) {
            next(e);
        }
    }
    async getUserChats (req, res, next) {
        try {
            const userId = req.user.id;
            const usersData = await chatService.getUserChats(userId);
            console.log(usersData);
            return res.json(usersData);
        } catch(e) {
            next(e);
        }s
    }
    async findUserChat(req, res, next) {
        try {
            const {userId: rawUserId} = req.params;
            const senderId = req.user.id;

            const userId = rawUserId;
            const chat = await chatService.findUserChat(senderId, userId);
            return res.json(chat);
        } catch(e) {
            next(e);
        }
    }
    async sendMessage (req, res, next) {
        try {
            const {chatId} = req.params;
            const {content, replyToId} = req.body;
            const files = req.files;
            const senderId = req.user.id;
            if(!content && !files) {
                throw ApiError.BadRequest('Empty message');
            }
            const sendResult = await chatService.sendMessage(chatId, content, files, senderId, replyToId);
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
            const chatId = rawChatId;

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