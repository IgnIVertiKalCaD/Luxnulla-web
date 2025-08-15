interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly PATH_API_URL: string;
  readonly PRODUCTION: string;
}
