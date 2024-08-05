import { InputFile } from "@renderer/components/ui/inputfile";
import GreedIcon from "@renderer/assets/icon-greed.svg";
import { useState } from "react";

export function App(): JSX.Element {
  const [downloadResult, setDownloadResult] = useState<string | undefined>(undefined);

  return (
    <div id="app" className="flex ps">
      <div id="menu" className="container flex flex-col h-screen w-[25%] max-xl:min-w-56">
        <div className="mt-5 flex w-full max-h-[50px] max-w-full items-center">
          <img src={GreedIcon} className="size-12 max-xl:size-10" alt="greed-icon" />
          <div className="font-extrabold text-sm">
            Greed Client
          </div>
        </div>

        <h2 className= "mt-[12vh] text-sm">Recents</h2>
        {/* NOTE test boilerplate to be deleted */}
        <div className="pt-3">
          <div className="flex bg-[#171717] h-14 rounded-2xl pe-1 hover:bg-zinc-800 mb-3">
            <img src="https://placehold.co/30" alt="game-cover" className="rounded-full" />
            <p className="p-2 text-xs text-">
              Baldur's Gate III
            </p>
          </div>
          <div className="flex bg-[#171717] h-14 rounded-2xl pe-1 hover:bg-zinc-800 mb-3">
            <img src="https://placehold.co/30" alt="game-cover" className="rounded-full" />
            <p className="p-2 text-xs text-">
              Baldur's Gate III
            </p>
          </div>
          <div className="flex bg-[#171717] h-14 rounded-2xl pe-1 hover:bg-zinc-800 mb-3">
            <img src="https://placehold.co/30" alt="game-cover" className="rounded-full" />
            <p className="p-2 text-xs text-">
              Baldur's Gate III
            </p>
          </div>
        </div>
      </div>

      <div id="main-section" className="container flex flex-col overflow-hidden p-0">
        <div id="menu-bar" className="h-[1.6rem] bg-[#171717]">
        </div>
          
        <div id="game-cover">
          <img src="./src/assets/image.png" alt="game-cover" className="rounded-e-md"/>
        </div>



        <div id="play-menu" className="flex justify-center pt-5">
          <div 
            className="absolute transform -translate-y-2/3 bg-[#242424] rounded-3xl text-white p-4"
          >
            <InputFile updateDownloadResult={setDownloadResult}/>
            {/* <p className={`pt-4 ${downloadResult ? '' : 'hidden p-0 m-0'}`}>{downloadResult}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}