export interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly MODE: 'development' | 'production' | 'test';
  readonly PROD: boolean;
  readonly DEV: boolean;
}
