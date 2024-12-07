import { useState, useEffect } from "react";

export function useSearchImages(
	games: Game[],
	setIsImagesLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
	const [searchImages, setSearchImages] = useState<string[]>([]);

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

			setSearchImages(fetchedImages);
		};

		fetchImages();

		return () => {
			setTimeout(() => setIsImagesLoading(false), 300);
		};
	}, [games[1], setIsImagesLoading]);

	return searchImages;
}
