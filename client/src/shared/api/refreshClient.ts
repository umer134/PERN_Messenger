import axios from 'axios';
import { env } from '@/config/env.config';

export const refreshClient = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
});
