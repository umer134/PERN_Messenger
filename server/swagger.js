const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PERN Messenger API',
      version: '1.0.0',
      description: 'API документация для мессенджера',
      contact: {
        name: 'Umer134',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
      schemas: {
        Message: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            chat_id: { type: 'string', format: 'uuid' },
            sender_id: { type: 'string', format: 'uuid', nullable: true },
            content: { type: 'string', nullable: true },
            reply_to_id: { type: 'string', format: 'uuid', nullable: true },
            sent_at: { type: 'string', format: 'date-time' },
            edited_at: { type: 'string', format: 'date-time', nullable: true },
            deleted_at: { type: 'string', format: 'date-time', nullable: true },
            is_read: { type: 'boolean' },
          },
          required: ['id', 'chat_id', 'sent_at', 'is_read'],
        },
        EditMessageRequest: {
          type: 'object',
          properties: {
            messageId: { type: 'string', format: 'uuid' },
            newContent: { type: 'string' },
          },
          required: ['messageId', 'newContent'],
        },
        SendDirectMessageRequest: {
          type: 'object',
          properties: {
            chatId: { type: 'string', format: 'uuid', nullable: true },
            recipientId: { type: 'string', format: 'uuid', nullable: true },
            content: { type: 'string', nullable: true },
            replyToId: { type: 'string', format: 'uuid', nullable: true },
            files: {
              type: 'array',
              items: { type: 'string', format: 'binary' },
            },
          },
        },
        SendDirectMessageResponse: {
          type: 'object',
          properties: {
            conversation: { $ref: '#/components/schemas/ConversationPreview' },
            message: { $ref: '#/components/schemas/Message' },
          },
          required: ['conversation', 'message'],
        },
        DeleteMessageResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            messageId: { type: 'string', format: 'uuid' },
          },
          required: ['success', 'messageId'],
        },
        ChatMemberPreview: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            avatar: { type: 'string', nullable: true },
          },
          required: ['id', 'name'],
        },
        ChatFile: {
          type: 'object',
          properties: {
            file_path: { type: 'string' },
          },
          required: ['file_path'],
        },
        ChatMessage: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            chat_id: { type: 'string', format: 'uuid' },
            sender_id: { type: 'string', format: 'uuid', nullable: true },
            content: { type: 'string', nullable: true },
            sent_at: { type: 'string', format: 'date-time' },
            is_read: { type: 'boolean' },
          },
          required: ['id', 'chat_id', 'sent_at', 'is_read'],
        },
        ChatMessageWithRelations: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            chat_id: { type: 'string', format: 'uuid' },
            sender_id: { type: 'string', format: 'uuid', nullable: true },
            content: { type: 'string', nullable: true },
            sent_at: { type: 'string', format: 'date-time' },
            is_read: { type: 'boolean' },
            sender: { $ref: '#/components/schemas/UserPreview' },
            attachedFiles: {
              type: 'array',
              items: { $ref: '#/components/schemas/ChatFile' },
            },
          },
          required: ['id', 'chat_id', 'sent_at', 'is_read', 'sender', 'attachedFiles'],
        },
        Chat: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            is_group: { type: 'boolean' },
            group_name: { type: 'string', nullable: true },
            group_avatar: { type: 'string', nullable: true },
            created_at: { type: 'string', format: 'date-time' },
            members: {
              type: 'array',
              items: { $ref: '#/components/schemas/ChatMemberPreview' },
            },
            messages: {
              type: 'array',
              items: { $ref: '#/components/schemas/Message' },
            },
          },
          required: ['id', 'is_group', 'created_at'],
        },
        CreateChatRequest: {
          type: 'object',
          properties: {
            userId: { type: 'string', format: 'uuid' },
          },
          required: ['userId'],
        },
        ConversationPreview: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },

            title: {
              type: 'string'
            },

            avatar: {
              type: 'string',
              nullable: true
            },

            isGroup: {
              type: 'boolean'
            },

            unreadCount: {
              type: 'integer'
            },

            lastMessage: {
              type: 'string',
              nullable: true
            },

            updatedAt: {
              type: 'string',
              format: 'date-time'
            },

            participantId: {
              type: 'string',
              format: 'uuid',
              nullable: true
            },

            isOnline: {
              type: 'boolean'
            }
          },

          required: [
            'id',
            'title',
            'isGroup',
            'unreadCount',
            'updatedAt',
            'isOnline'
          ]
        },
        SendMessageRequest: {
          type: 'object',
          properties: {
            content: { type: 'string', nullable: true },
            files: {
              type: 'array',
              items: { type: 'string', format: 'binary' },
            },
            reply_to_id: { type: 'string', format: 'uuid', nullable: true},
          },
        },
        MessagesPage: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              items: { $ref: '#/components/schemas/ChatMessageWithRelations' },
            },
            nextCursor: { type: 'string', nullable: true },
          },
          required: ['messages', 'nextCursor'],
        },
        ReadMessageResponse: {
          type: 'object',
          properties: {
            updated: { type: 'integer' },
          },
          required: ['updated'],
        },
        Me: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            avatar: { type: 'string', nullable: true },
            isActivated: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'name', 'email', 'isActivated'],
        },
        UserPreview: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            avatar: {
              type: 'string',
              nullable: true
            }
          }
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
          required: ['email', 'password'],
        },
        LoginResponse: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/Me' },
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
          },
          required: ['user', 'accessToken'],
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            statusCode: { type: 'integer' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  msg: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // ← JSDoc комментарии в этих файлах
};

module.exports = swaggerJsdoc(options);