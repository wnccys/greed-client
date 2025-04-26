/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_STEAM_GAMES_DETAILS: string;
	readonly VITE_API_GAME_IMAGE: string;
	readonly VITE_API_GAME_ICON: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
