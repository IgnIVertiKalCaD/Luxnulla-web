export interface User {
  encryption?: string;
  id?: string;
}

export interface Settings {
  address: string;
  port: number;
}

export interface ConfigRdo {
  protocol: string;
  settings: Settings;
  users: User[];
}
