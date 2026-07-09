import { env } from '@/config/env';

export function resolveMediaUrl(path?: string | null): string {
  if (!path) return '';

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;

  return `${env.API_URL}${normalized}`;
}
