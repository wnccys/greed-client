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
  console.log("here!!!!!!!!!!!!!!!!!!!!!!!!!!!S");

	const selectedGames: [Dispatch<SetStateAction<number>>, Game[]] = [
		setIndex,
		gamesData.slice(index * 15, index * 15 + 15),
	];

	return selectedGames;
}

	export function useGamesImages (games: Game[]) {
    const [images, setImages] = useState<string[]>([]);

  //   useEffect(() => {
	// 	for (const game of games) {
	// 		fetch(
	// 			`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.id}/header.jpg`,
	// 		)
	// 			.then((image) => image.blob())
	// 			.then((blobImage) => {
	// 				const reader = new FileReader();
	// 				reader.onload = function () {
	// 					setImages((oldImages) => {
	// 						const updatedImages = [...oldImages, this.result as string];
	// 						return updatedImages;
	// 					});
	// 				};
	// 				reader.readAsDataURL(blobImage);
	// 			})
	// 			.catch((e) => {
	// 				console.log("Error: ", e);
	// 			});
	// 	}
  // }, [games])
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
  }, [games]);

  return images;
	}