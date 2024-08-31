import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import gameData from "../../../steam-games/steam-games.json";

interface Game {
	id: number;
	name: string;
	clientIcon: string;
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

export function useGamesImages(games: Game[], setLoading: (loading: boolean) => void) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
      if (games.length === 0) return;

      setLoading(true);

      const fetchImages = async () => {
          const fetchedImages: string[] = new Array(games.length).fill('');

          await Promise.all(
              games.map(async (game, index) => {
                  try {
                      const response = await fetch(
                          `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.id}/header.jpg`
                      );
                      const blobImage = await response.blob();
                      const reader = new FileReader();
                      reader.onload = () => {
                          fetchedImages[index] = reader.result as string;
                      };
                      reader.readAsDataURL(blobImage);
                  } catch (e) {
                      console.log("Error fetching image: ", e);
                  }
              })
          );

          setImages(fetchedImages);
          setLoading(false); // Set loading to false only after all images are loaded
      };

      fetchImages();
  }, [games]); // Only depend on 'games' so that it only triggers on page change

  return images;
}