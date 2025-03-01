import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

/** Get available games from DB dinamically */
export function useCatalogGames(): [Game[], Dispatch<SetStateAction<number>>] {
	const [index, setIndex] = useState<number>(0);
	const [catalogGames, setCatalogGames] = useState<Game[]>([]);

	useEffect(() => {
		window.api.getGamesRange(index).then((games) => {
			console.log("games: ", games);
			setCatalogGames(games);
		});
	}, [index]);

	return [catalogGames, setIndex];
}

export function useGamesImages(
	games: Game[],
	setIsImagesLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		if (games.length === 0) return;

		const fetchImages = async () => {
			const fetchedImages: string[] = new Array(games.length).fill("");

			await Promise.all(
				games.map(async (game, index) => {
					try {
						const response = await fetch(
							`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.id}/header.jpg`,
						);
						const blobImage = await response.blob();
						const reader = new FileReader();
						return new Promise<void>((resolve) => {
							reader.onload = () => {
								fetchedImages[index] = reader.result as string;
								resolve();
							};
							reader.readAsDataURL(blobImage);
						});
					} catch (e) {
						console.log("Error fetching image: ", e);
					}
				}),
			);

			setImages(fetchedImages);
		};

		fetchImages();

		return () => {
			setTimeout(() => setIsImagesLoading(false), 400);
		};
	}, [games[1], setIsImagesLoading]);

	return images;
}
