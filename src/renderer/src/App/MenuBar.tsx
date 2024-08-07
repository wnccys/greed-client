import { Button } from "@renderer/ShadComponents/ui/button";
import {
	Cross1Icon,
	SquareIcon,
	MinusIcon,
	CopyIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export function MenuBar() {
    // REVIEW useEffect to update component state
	const [isMaximized, setIsMaximized] = useState<boolean>(
		window.api.isMaximized(),
	);

	const checkIsMaximized = () => {
		if (isMaximized) {
            window.api.unmaximizeWindow();
            setIsMaximized(!isMaximized);
        } else {
            window.api.maximizeWindow();
            setIsMaximized(!isMaximized);
        }
	};

	return (
		<>
			<div
				id="menu-bar"
				className="h-[1.8rem] bg-[#171717] fixed flex w-full z-10 justify-end"
			>
				<div className="p-0 m-0"> 
					<Button
						onClick={() => window.api.minimizeWindow()}
						className="hover:bg-zinc-700 bg-[#171717] delay-100 ps-3 pe-3 h-[1.8rem]"
					>
						<MinusIcon />
					</Button>
					<Button
						onClick={() => checkIsMaximized()}
						className="hover:bg-zinc-700 bg-[#171717] delay-100 ps-3 pe-3 h-[1.8rem]"
					>
						{isMaximized ? <CopyIcon /> : <SquareIcon />}
					</Button>
					<Button
						onClick={() => window.api.closeWindow()}
						className="hover:bg-zinc-700 delay-100 bg-[#171717] ps-3 pe-3 h-[1.8rem]"
					>
						<Cross1Icon />
					</Button>
				</div>
			</div>
		</>
	);
}
