require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const sequelize = require('./config/db');

const http = require('http'); // добавляем http
const { Server } = require('socket.io'); // импортируем socket.io

const { initSocket } = require("./socket/socket");

const userRouter = require('./routes/userRoutes');
const chatRouter = require('./routes/chatRoutes');
const messageRouter = require('./routes/messageRoutes');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;

const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-spec.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const server = http.createServer(app); 

const io = initSocket(server);

// middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// роуты
app.use('/api', userRouter);
app.use('/api', chatRouter);
app.use('/api', messageRouter);

// ошибки
app.use(errorMiddleware);

// запуск сервера
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Все таблицы успешно созданы!');

    server.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
  } catch (e) {
    console.error('Ошибка синхронизации БД:', e);
  }
};

start();
