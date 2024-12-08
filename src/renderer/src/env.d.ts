/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_STEAM_GAMES_DETAILS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}