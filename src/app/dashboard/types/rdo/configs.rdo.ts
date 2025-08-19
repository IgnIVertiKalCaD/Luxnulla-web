export interface GRPCSettings {
  service_name: string;
  multi_mode: string;
}

// RealitySettings
export interface RealitySettings {
  fingerprint?: string;
  public_key: string;
  server_name: string;
  short_id: string;
}

// User
export interface User {
  encryption?: string;
  id?: string;
}

// StreamSettings
export interface StreamSettings {
  network?: string;
  reality?: RealitySettings;
  security: string;
}

// Settings
export interface Settings {
  address: string;
  port: number;
  users: User[];
}

export interface XrayClientConfig {
  protocol: string;
  settings: Settings;
  stream: StreamSettings;
  name_client?: string;
}
