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