import axios from 'axios';
import { env } from '@/config/env';

export const refreshClient = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
