import { useEffect } from "react";
import { AuthService } from "../../features/auth/services/auth.service";
import { CurrentUserService } from "../../entities/current-user/service/current-user.service";

export function AuthProvider({ children }) {

  useEffect(() => {
    const init = async () => {
      try {
        await AuthService.init();
        await CurrentUserService.fetchMe();
      } catch (e) {
        console.error(e);
      }
    };

    init();
  }, []);

  return children;
}