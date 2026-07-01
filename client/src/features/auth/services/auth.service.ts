import { TokenStore } from '@/shared/lib/token-store';
import { AuthResponse } from '../model/auth.types';
import { refreshSession } from '@/shared/api/refresh-manager';

import { SocketService } from '@/shared/socket';

export class AuthService {
  static async init() {
    try {
      const auth = await refreshSession();

      return this.bootstrap(auth.accessToken);
    } catch {
      this.logout();

      return false;
    }
  }

  static bootstrap(accessToken: string) {
    TokenStore.setAccessToken(accessToken);

    SocketService.connect(accessToken);

    return true;
  }

  static logout() {
    SocketService.disconnect();

    TokenStore.clear();
  }
}
