import socket from './socket';

export class SocketService {
  static connect(token: string) {
    socket.auth = {
      token,
    };

    if (!socket.connected) {
      socket.connect();
    }
  }

  static updateToken(token: string) {
    socket.auth = {
      token,
    };

    // if (socket.connected) {
    //   socket.disconnect();
    // }

    // if (!socket.connected) {
    //   socket.connect();
    // }
  }

  static disconnect() {
    if (socket.connected) {
      socket.disconnect();
    }
  }
}
