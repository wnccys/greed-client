import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import gameData from "../../../steam-games/steam-games.json";

interface Game {
	id: number;
	name: string;
}

const gamesData: Game[] = gameData as Game[];
export function useCatalogGames(): [Dispatch<SetStateAction<number>>, Game[]] {
	const [index, setIndex] = useState<number>(0);

	const selectedGames: [Dispatch<SetStateAction<number>>, Game[]] = [
		setIndex,
		gamesData.slice(index * 20, index * 20 + 20),
	];

	return selectedGames;
}

	export function useGamesImages (games: Game[], setIsImagesLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
      if (games.length === 0) return; // Early exit if no games

      const fetchImages = async () => {
        const fetchedImages: string[] = new Array(games.length).fill(''); // Initialize with empty strings

        await Promise.all(games.map(async (game, index) => {
          try {
            const response = await fetch(
              `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.id}/header.jpg`
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
        }));

        setImages(fetchedImages); // Update state once all images are fetched
      };

        fetchImages();

        return () => {
            setIsImagesLoading(false);
        }
    }, [games[1], setIsImagesLoading]);

    return images;
}