import { useEffect } from "react";
import { TokenStore } from "../../shared/lib/token-store";
import { refreshSession } from "../../shared/api/refresh-manager";
import { AuthService } from "../../features/auth/services/auth.service";

export function AuthProvider({ children }) {

  useEffect(() => {
    const bootstrap = async () => {
      const refreshToken = TokenStore.getRefreshToken();

      if(!refreshToken) return;

      try {
        const auth = await refreshSession();

        AuthService.bootstrap(auth);

      } catch {
        AuthService.logout();
      }
    };

    bootstrap();
  }, []);

  return children;
}