import { Button } from "@renderer/ShadComponents/ui/button"
import { Cross1Icon, SquareIcon,  MinusIcon } from "@radix-ui/react-icons";

export function MenuBar() {
 return (
    <>
        <div id="menu-bar" className="h-[1.8rem] bg-[#171717] fixed flex w-screen z-10 justify-end">
            <div className="group-hover:bg-red-300">
                <Button onClick={() => window.api.minimizeWindow()}
                className="hover:bg-zinc-700"
                >
                    <MinusIcon />
                </Button>
                <Button onClick={() => window.api.maximizeWindow()}
                className="hover:bg-zinc-700" >
                    <SquareIcon />
                </Button>
                <Button onClick={() => window.api.closeWindow()} 
                className="hover:bg-red-500">
                    <Cross1Icon />
                </Button>
            </div>
        </div>
    </>
 );
}