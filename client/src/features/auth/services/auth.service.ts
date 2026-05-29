import { setSession, clearSession } from '../model/authSlice';
import { TokenStore } from "../../../shared/lib/token-store";
import { AuthResponse } from "../model/auth.types";
import { store } from '../../../store/store';

export class AuthService {
  static bootstrap(auth: AuthResponse) {
    TokenStore.setTokens({
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken
    });

    store.dispatch(setSession(auth.me));
  }

  static logout() {
    TokenStore.clear();

    store.dispatch(clearSession());
  }
}