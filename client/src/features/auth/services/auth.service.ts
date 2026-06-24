import { setSession, clearSession, setInitialized } from '../model/authSlice';
import { TokenStore } from '@/shared/lib/token-store';
import { AuthResponse } from '../model/auth.types';
import { store } from '@/app/providers/store';
import { refreshSession } from '@/shared/api/refresh-manager';
import socket from '@/shared/socket/socket';

export class AuthService {
  static async init() {
    try {
      const auth = await refreshSession();
      this.bootstrap(auth);
    } catch {
      this.logout();
    } finally {
      store.dispatch(setInitialized());
    }
  }

  static bootstrap(auth: AuthResponse) {
    TokenStore.setAccessToken(auth.accessToken);

    socket.disconnect();

    socket.auth = {
      token: auth.accessToken,
    };

    socket.connect();

    store.dispatch(setSession(auth.me));
  }

  static logout() {
    socket.disconnect();

    TokenStore.clear();

    store.dispatch(clearSession());
  }
}
