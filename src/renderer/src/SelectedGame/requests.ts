
import axios from "axios";
import {NotFoundException, BadRequestException} from "@renderer/exceptions/globalHandlerExceptions";

export const getGameInfo = async (gameId: string) => {
	try {
		const response = (
			await axios.get<SteamDetailsT>(
				`${import.meta.env.VITE_API_STEAM_GAMES_DETAILS}${gameId}`,
			)
		).data;

		return response?.[gameId].data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response?.status === 404) {
				throw new NotFoundException("Game not found");
			}
		}
		console.error("error on game details fetch: ", e);
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
	} catch (error) { 

		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw new NotFoundException("Image not found");
		}

		console.error("error on image fetch: ", error);
		return ""; 
	}
};
}

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
		if (axios.isAxiosError(e)) {
			if (e.response?.status === 403) {
				throw new BadRequestException("Icon not found");
			}
		}
		if (axios.isAxiosError(e)) {
			if (e.response?.status === 404) {
				throw new NotFoundException("Icon not found");
			}
		}
		if (axios.isAxiosError(e)) {	
		console.error("error on icon fetch: ", e);
		return "";
	}
}
};
