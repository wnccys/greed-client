import { useLibrary } from "@renderer/Hooks/library";
import { Button } from "@renderer/ShadComponents/ui/button";
import { Card } from "@renderer/ShadComponents/ui/card";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@renderer/ShadComponents/ui/tooltip"

export function Library() {
    const library = useLibrary();
    console.log("library: ", library);

    function DeleteToolTip({ gameId }) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button variant="outline" 
                    className="hover:bg-red-500 transition-all duration-300 border-none rounded-none"
                    onClick={() => window.api.removeGamePath(gameId)}
                    > 
                        <Cross1Icon color="black" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Remove from library</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return (
        <div className="min-h-screen mt-[4rem] flex gap-2 flex-col">
            {(library.map((libraryItem, index) => {
                return (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div className="ms-10 flex" key={index}>
                        <Card className="ps-4 h-fit flex w-[73vw] items-center border-2
                        bg-white text-black transition-all duration-300 cursor-pointer 
                        shadow-lg shadow-black hover:shadow-xl hover:shadow-black rounded-none"
                            onClick={() => window.api.execGamePath(libraryItem.execPath)}
                        >
                            <img src={libraryItem.icon} className="max-h-8 rounded-none pe-8" alt="game-icon" />
                            {libraryItem.gameName}
                        </Card>
                        <div className="self-end flex justify-end gap-2 h-full ms-4">
                            <DeleteToolTip gameId={libraryItem.id} />
                            {/* <Button 
                            className="absolute rounded-sm hover:-translate-y-1
                            transition-all duration-300 bg-zinc-800 hover:bg-red-700 z-50"
                            onClick={() => window.api.removeGamePath(libraryItem.id)}
                            >
                            </Button> */}
                        </div>
                    </div>
                )
            }))}
        </div>
    )
}