const { Router } = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const uploadFiles = require('../middlewares/upload-messageFiles');
const ChatController = require('../controllers/ChatController');

const router = Router();

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Создать приватный чат
 *     tags:
 *       - Chats
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChatRequest'
 *     responses:
 *       200:
 *         description: Найденный или созданный чат
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 */
router.post('/chats', authMiddleware, ChatController.createChat);

/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Получить список чатов пользователя
 *     tags:
 *       - Chats
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Список чатов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 */
router.get('/chats', authMiddleware, ChatController.getUserChats);

/**
 * @swagger
 * /api/chats/{chatId}/messages:
 *   post:
 *     summary: Отправить сообщение в чат
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: chatId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/SendMessageRequest'
 *     responses:
 *       200:
 *         description: Созданное сообщение
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post('/chats/:chatId/messages', uploadFiles.array('files'), authMiddleware, ChatController.sendMessage);

/**
 * @swagger
 * /api/chats/{chatId}/messages:
 *   get:
 *     summary: Получить сообщения чата
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: chatId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: cursor
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Курсор по sent_at
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Сообщения и курсор на следующую страницу
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessagesPage'
 */
router.get('/chats/:chatId/messages', authMiddleware, ChatController.getMessages);

/**
 * @swagger
 * /api/chats/find/{userId}:
 *   get:
 *     summary: Найти приватный чат с пользователем
 *     tags:
 *       - Chats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Чат или null, если чат не найден
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Chat'
 *                 - type: 'null'
 */
router.get('/chats/find/:userId',authMiddleware, ChatController.findUserChat);

/**
 * @swagger
 * /api/chats/{chatId}/read:
 *   post:
 *     summary: Отметить сообщения чата как прочитанные
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: chatId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Количество обновлённых сообщений
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReadMessageResponse'
 */
router.post('/chats/:chatId/read', authMiddleware, ChatController.readMessage);

module.exports = router;