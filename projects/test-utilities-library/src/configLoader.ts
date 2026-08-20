declare const process: any;

export interface EnvironmentConfig {
  envName: "local" | "dev" | "staging" | "prod";
  baseUrl: string;
  apiTimeout: number;
  retries: number;
  headless: boolean;
  enableTrace: boolean;
}

/**
 * Type-safe configuration loader with fallback defaults.
 */
export class ConfigLoader {
  private static readonly DEFAULTS: EnvironmentConfig = {
    envName: "local",
    baseUrl: "http://localhost:3000",
    apiTimeout: 30000,
    retries: 1,
    headless: true,
    enableTrace: false,
  };

  public static load(custom: Partial<EnvironmentConfig> = {}): EnvironmentConfig {
    const env = (process.env.TEST_ENV as EnvironmentConfig["envName"]) || "local";

    const baseByEnv: Record<EnvironmentConfig["envName"], string> = {
      local: "http://localhost:3000",
      dev: "https://dev.api.example.com",
      staging: "https://staging.api.example.com",
      prod: "https://api.example.com",
    };

    return {
      ...this.DEFAULTS,
      envName: env,
      baseUrl: process.env.BASE_URL || baseByEnv[env] || this.DEFAULTS.baseUrl,
      apiTimeout: process.env.TIMEOUT ? Number(process.env.TIMEOUT) : this.DEFAULTS.apiTimeout,
      retries: process.env.RETRIES ? Number(process.env.RETRIES) : this.DEFAULTS.retries,
      headless: process.env.HEADED === "true" ? false : this.DEFAULTS.headless,
      ...custom,
    };
  }
}
