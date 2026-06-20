const { Router } = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const uploadFiles = require('../middlewares/upload-messageFiles');
const MessageController = require('../controllers/MessageController');

const router = Router();

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Отправить сообщение в чат или пользователю
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/SendDirectMessageRequest'
 *     responses:
 *       200:
 *         description: Созданное сообщение и идентификатор чата
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullMessage'
 */
router.post('/messages', uploadFiles.array('files'), authMiddleware, MessageController.sendMessage);

router.patch('/messages/read/:chatId', authMiddleware, MessageController.markAsRead)

/**
 * @swagger
 * /api/messages:
 *   put:
 *     summary: Редактировать сообщение
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditMessageRequest'
 *     responses:
 *       200:
 *         description: Обновлённое сообщение
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullMessage'
 */
router.put('/messages', authMiddleware, MessageController.editMessage);

/**
 * @swagger
 * /api/messages/{messageId}:
 *   delete:
 *     summary: Удалить сообщение
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: messageId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Результат удаления
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteMessageResponse'
 */
router.delete('/messages/:messageId', authMiddleware, MessageController.deleteMessage);

module.exports = router;
