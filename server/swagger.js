const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PERN Messenger API",
      version: "1.0.0",
      description: "API документация для мессенджера",
      contact: {
        name: "Umer134",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        CookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            statusCode: { type: "integer" },
          },
        },

        UserPreview: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },

            username: {
              type: "string",
            },

            avatar: {
              type: "string",
              nullable: true,
            },

            lastSeen: {
              type: "string",
              nullable: true,
            },
          },

          required: ["id", "username"],
        },

        Me: {
          type: "object",

          properties: {
            id: {
              type: "string",
              format: "uuid",
            },

            name: {
              type: "string",
            },

            email: {
              type: "string",
              format: "email",
            },

            avatar: {
              type: "string",
              nullable: true,
            },

            isActivated: {
              type: "boolean",
            },
          },

          required: ["id", "name", "email", "isActivated"],
        },

        LoginRequest: {
          type: "object",

          required: ["email", "password"],

          properties: {
            email: {
              type: "string",
            },

            password: {
              type: "string",
            },
          },
        },

        LoginResponse: {
          type: "object",

          properties: {
            accessToken: {
              type: "string",
            },

            refreshToken: {
              type: "string",
            },

            user: {
              $ref: "#/components/schemas/Me",
            },
          },

          required: ["accessToken", "user"],
        },

        CreateChatRequest: {
          type: "object",

          required: ["recipientId"],

          properties: {
            recipientId: {
              type: "string",
              format: "uuid",
            },
          },
        },

        Conversation: {
          type: "object",

          properties: {
            id: {
              type: "string",
              format: "uuid",
            },

            title: {
              type: "string",
            },

            avatar: {
              type: "string",
              nullable: true,
            },

            isGroup: {
              type: "boolean",
            },

            unreadCount: {
              type: "integer",
            },

            lastMessage: {
              type: "string",
              nullable: true,
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },

            participantId: {
              type: "string",
              format: "uuid",
              nullable: true,
            },

            isOnline: {
              type: "boolean",
            },

            lastSeen: {
              type: "string",
              nullable: true,
            },
          },

          required: [
            "id",
            "title",
            "isGroup",
            "unreadCount",
            "updatedAt",
            "isOnline",
          ],
        },

        MessageFile: {
          type: "object",

          properties: {
            file_path: {
              type: "string",
            },

            type: {
              type: "string",
            },
          },

          required: ["file_path"],
        },

        ReplyMessage: {
          type: "object",

          properties: {
            id: {
              type: "string",
              format: "uuid",
            },

            senderId: {
              type: "string",
              format: "uuid",
            },

            senderName: {
              type: "string",
            },

            content: {
              type: "string",
              nullable: true,
            },

            attachedFiles: {
              type: "array",
              items: {
                $ref: "#/components/schemas/MessageFile",
              },
            },
          },
        },

        Message: {
          type: "object",

          properties: {
            id: {
              type: "string",
              format: "uuid",
            },

            chat_id: {
              type: "string",
              format: "uuid",
            },

            sender_id: {
              type: "string",
              format: "uuid",
            },

            content: {
              type: "string",
              nullable: true,
            },

            reply_to_id: {
              type: "string",
              format: "uuid",
              nullable: true,
            },

            sent_at: {
              type: "string",
              format: "date-time",
            },

            edited_at: {
              type: "string",
              nullable: true,
            },

            deleted_at: {
              type: "string",
              nullable: true,
            },

            is_read: {
              type: "boolean",
            },

            sender: {
              $ref: "#/components/schemas/UserPreview",
            },

            replyTo: {
              nullable: true,
              allOf: [
                {
                  $ref: "#/components/schemas/ReplyMessage",
                },
              ],
            },

            attachedFiles: {
              type: "array",

              items: {
                $ref: "#/components/schemas/MessageFile",
              },
            },
          },
        },

        MessagesPage: {
          type: "object",

          properties: {
            messages: {
              type: "array",

              items: {
                $ref: "#/components/schemas/Message",
              },
            },

            previousCursor: {
              type: "string",
              nullable: true,
            },
          },

          required: ["messages", "previousCursor"],
        },

        SendMessageRequest: {
          type: "object",

          properties: {
            chatId: {
              type: "string",
              format: "uuid",
            },

            recipientId: {
              type: "string",
              format: "uuid",
            },

            content: {
              type: "string",
            },

            replyToId: {
              type: "string",
              format: "uuid",
            },

            files: {
              type: "array",

              items: {
                type: "string",
                format: "binary",
              },
            },
          },
        },

        EditMessageRequest: {
          type: "object",

          required: ["messageId", "newContent"],

          properties: {
            messageId: {
              type: "string",
              format: "uuid",
            },

            newContent: {
              type: "string",
            },
          },
        },

        DeleteMessageResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",
            },
          },
        },

        ReadMessageResponse: {
          type: "object",

          properties: {
            updated: {
              type: "integer",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // ← JSDoc комментарии в этих файлах
};

module.exports = swaggerJsdoc(options);
