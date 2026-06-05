import { useEffect } from "react";
import { AuthService } from "../../features/auth/services/auth.service";

export function AuthProvider({ children }) {

  useEffect(() => {
    AuthService.init();
  }, []);

  return children;
}