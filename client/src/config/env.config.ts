interface EnvConfig {
  readonly baseUrl: string;
  readonly apiUrl: string;
  readonly nodeEnv: 'development' | 'production' | 'test';
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
}

class EnvironmentConfig {
  private static instance: EnvironmentConfig;

  public readonly config: EnvConfig;

  private constructor() {
    this.config = {
      baseUrl: import.meta.env.VITE_BASE_URL || '',
      apiUrl: import.meta.env.VITE_API_URL || '',
      nodeEnv:
        (import.meta.env.MODE as 'development' | 'production' | 'test') ||
        'development',
      isProduction: import.meta.env.PROD,
      isDevelopment: import.meta.env.DEV,
    };
  }

  static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  static get config() {
    return EnvironmentConfig.getInstance().config;
  }
}

export const env = EnvironmentConfig.config;
