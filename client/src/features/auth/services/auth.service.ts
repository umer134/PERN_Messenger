import { setSession, clearSession, setInitialized } from '../model/authSlice';
import { TokenStore } from '@/shared/lib/token-store';
import { AuthResponse } from '../model/auth.types';
import { store } from '@/app/providers/store';
import { refreshSession } from '@/shared/api/refresh-manager';

import { SocketService } from '@/shared/socket';

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

    SocketService.connect(auth.accessToken);

    store.dispatch(setSession(auth.me));
  }

  static logout() {
    SocketService.disconnect();

    TokenStore.clear();

    store.dispatch(clearSession());
  }
}
