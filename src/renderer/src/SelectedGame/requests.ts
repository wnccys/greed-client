import axios from "axios";

export const getGameInfo = async (gameId: string) => {
	try {
		const response = (
			await axios.get<SteamDetailsT>(
				`${import.meta.env.VITE_API_STEAM_GAMES_DETAILS}${gameId}`,
			)
		).data;

		return response?.[gameId].data;
	} catch (e) {
		console.log("error on game details fetch: ", e);
		return "";
	}
};

export const getGameImage = async (gameId: string) => {
	try {
		const res = (
			await axios.get(
				`${import.meta.env.VITE_API_GAME_IMAGE}/${gameId}/library_hero.jpg`,
				{ responseType: "blob" },
			)
		).data;

		return URL.createObjectURL(res);
	} catch (e) {
		console.log("error on image fetch: ", e);
		return "";
	}
};

export const getGameIcon = async (gameId: string) => {
	try {
		const res = (
			await axios.get(
				`${import.meta.env.VITE_API_GAME_ICON}/${gameId}/logo.png`,
				{ responseType: "blob" },
			)
		).data;

		return URL.createObjectURL(res);
	} catch (e) {
		console.log("error on icon fetch: ", e);
		return "";
	}
};
