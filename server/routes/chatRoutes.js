const { Router } = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const ChatController = require('../controllers/ChatController');

const router = Router();

router.post('/chats', authMiddleware, ChatController.createChat);
router.get('/chats', authMiddleware, ChatController.getUserChats);
router.post('/chats/:chatId/messages', authMiddleware, ChatController.sendMessage);
router.get('/chats/:chatId/messages', authMiddleware, ChatController.getMessages);
router.get('/chats/find/:userId',authMiddleware, ChatController.findUserChat);
router.post('/chats/:chatId/read', authMiddleware, ChatController.readMessage);

module.exports = router;