import { InputFile } from "@renderer/components/ui/inputfile";
import GreedIcon from "@renderer/assets/greed-icon.svg";
import { useState } from "react";

export function App(): JSX.Element {
  const [downloadResult, setDownloadResult] = useState<string | undefined>(undefined);

  return (
    <div id="app" className="flex">
      <div id="menu" className="container flex flex-row h-screen w-[25%] ps-3">
        <div className="mt-5 flex w-full max-h-[50px] items-center text-md font-extrabold">
          <img src={GreedIcon} className="size-14" alt="greed-icon" />
          <div className="text-center">
            Greed Client
          </div>
        </div>

        <div>

        </div>
      </div>

      <div id="main-section" className="container flex flex-col overflow-hidden p-0">
        <div id="menu-bar" className="h-[1.6rem] bg-[#171717]">

        </div>

        <div id="game-cover">
          <img src="./src/assets/image.png" alt="game-cover" className="rounded-e-md"/>
        </div>

        <div className="flex justify-center pt-5">
          <div 
            className="absolute transform -translate-y-2/3 bg-[#242424] rounded-3xl text-white p-4"
          >
            <InputFile updateDownloadResult={setDownloadResult}/>
            <p className={`pt-4 ${downloadResult ? '' : 'hidden'}`}>{downloadResult}</p>
          </div>
        </div>
      </div>
    </div>
  );
}