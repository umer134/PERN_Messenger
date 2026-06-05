import { useEffect } from "react"
import socket from "../../../features/socketIO/socket";

export const useMainPageBootstrap = (id: string) => {

  useEffect(() => {
    if(!id) return;

    socket.emit('jwt_chat', id);
  }, [id]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if(theme === "dark") {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);
};