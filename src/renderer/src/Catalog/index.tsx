import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/Assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames, useGamesImages } from "@renderer/Hooks/games";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useMemo, useReducer, useState } from "react";
import { Skeleton } from "@renderer/ShadComponents/ui/skeleton";

type PaginationAction<T = number> = { type: 'PREV_PAGE', payload: T } | { type: 'NEXT_PAGE', payload: T }
type PaginationState = { cursor: number, direction: Direction };

const handlePagination = (state: PaginationState, action: PaginationAction): PaginationState => {
    switch (action.type) {
        case 'PREV_PAGE':
            return {
                cursor: action.payload,
                direction: 'BACKWARD'
            }
        case 'NEXT_PAGE':
            return {
                cursor: action.payload,
                direction: 'FORWARD'
            }
        default:
            return state
    }
}

// Should keep an internal state :: <T> & :: bool (text / loadintg state)
// When user types, should start and delay event (300 ms) (setTimeInterval)
//  => if user re-types => return loading state
//  => if complete => return [T] so be searched by preload event
// Should return [text, loading state]
// Should be consumed by (?)
//
function useDebounce<T>(text: T): [T, boolean] {
    const [debouncedValue, setDebouncedValue] = useState(text);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const handler = setTimeout(() => {
            setDebouncedValue(text)
            setIsLoading(false)
        }, 300);

        return () => clearInterval(handler);
    }, [text])

    return [debouncedValue, isLoading];
}

export function Catalog() {
    // -- SEARCH --
    const [query, setQuery] = useState('');
    const [debounce, _] = useDebounce(query);

    // -- PAGINATION --
    //
    // Starts with initial state idx = 0
    // click previous_btn => [disabled when 0] get last game id (current games[0].appid) and pass it with 'backward' parameter
    // click next_btn => [disabled when games is empty or len < 20] get latest game id (current games[-1].appid) and pass it with 'forward'
    //
    const [pagination, dispatch] = useReducer(handlePagination, { cursor: 0, direction: 'FORWARD' });

    // -- GAMES DATA (Info, Images) --
	const [games] = useCatalogGames(pagination.cursor, pagination.direction, debounce);
	const images = useGamesImages(games);

    useEffect(() => {
        if (query === '') {
            dispatch({ payload: 0, type: 'NEXT_PAGE'})
        }
    }, [query])

	return (
		<div className="bg-[#171717] mx-5">
			<div className="flex justify-between mt-10 me-10">
				<div className="ms-10 flex self-center">
					<h1 className="text-2xl font-bold">Explore</h1>
				</div>{" "}
				<div
					className="rounded-md bg-zinc-800 flex p-2 ps-4 items-center"
				>
					<img src={SearchIcon} alt="search-icon" className="size-4" />
					<Input
						className="max-w-[12vw] max-h-8 border-none focus:border-none focus:ring-0 focus:ring-offset-0 focus-visible:shadow-none transition-[max-width]
						focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:max-w-[14vw] ease-[cubic-bezier(0.4,0,0.2,1)] duration-200"
						type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
						placeholder="Search Games"
					/>
				</div>
			</div>

			<div className="mt-[2rem] bg-[#171717]">
                <CardSection
                    games={games}
                    images={images}
                />
                <div className="sticky bottom-0 z-20 w-full mt-6">
                    <div className="flex justify-between w-full bg-zinc-900 h-10 border-zinc-800 border-2 border-primary-foreground items-center border-x-0">
                            <Button
                                onClick={() => {
                                    dispatch({ payload: games.at(0)?.appid || 0, type: 'PREV_PAGE' });
                                }}

                                {...pagination.cursor < 30 && { disabled: true }}
                                className="bg-transparent duration-300 transition-all hover:bg-zinc-950"
                            >
                                Previous Page
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch({ payload: games.at(-1)?.appid || 0, type: 'NEXT_PAGE' });
                                }}
                                className="bg-transparent duration-300 transition-all hover:bg-zinc-950"
                            >
                                Next Page
                            </Button>
                    </div>
                </div>
			</div>
		</div>
    )
}

function CardSection({
	games,
	images,
}: {
	games: Game[];
	images: {
		data: (string | undefined)[];
		pending: boolean[];
	};
}) {
	return (
		<div className="h-full">
			<div
				id="games-section"
				className="grid grid-cols-4 justify-between justify-items-center gap-0"
			>
				{games.map((_, key) => {
					if (!images.pending[key]) {
						return (
							<GameCard
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={key}
								gameId={games[key].appid}
								gameName={games[key].name}
								gameImage={images.data[key]}
							/>
						);
					}

					return <Skeleton
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={key}
						className="w-[16rem] mt-8 h-32 rounded-lg shadow-lg
						shadow-black bg-zinc-800"
					/>
				})}
			</div>
		</div>
	);
}