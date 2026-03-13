/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BACKEND_SERVICE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
