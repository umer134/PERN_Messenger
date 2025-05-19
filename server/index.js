require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
const http = require('http'); // добавляем http
const { Server } = require('socket.io'); // импортируем socket.io

const userRouter = require('./routes/userRoutes');
const chatRouter = require('./routes/chatRoutes');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app); // создаём http-сервер вручную

const io = new Server(server, {
  pingTimeout: 30000,  // Ждём 30 сек перед разрывом "мертвого" соединения
  pingInterval: 5000,  // Пинг каждые 5 сек для проверки активности
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

// Socket.IO логика
io.on('connection', (socket) => {
  console.log('Новое подключение:', socket.id);

  socket.on('join_chat', (userId) => {
    socket.join(userId);
    console.log(`Пользователь ${userId} присоединился`);
  });

  socket.on('send_message', ({ toUserId, message }) => {
    io.to(toUserId).emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('Отключение сокета:', socket.id);
  });
});

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
