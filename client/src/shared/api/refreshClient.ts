import axios from 'axios';
import { env } from '@/config/env';

export const refreshClient = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: true,
});
