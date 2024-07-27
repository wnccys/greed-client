import { InputFile } from "@renderer/components/ui/inputfile";
import { useState } from "react";

export function App(): JSX.Element {
  const [downloadResult, setDownloadResult] = useState<string | undefined>(undefined);

  return (
    <div id="app" className="flex">
      <div id="menu" className="container h-screen w-[22%]">
        <i>Greed Client</i>
      </div>
      <div id="main-section" className="container flex flex-col overflow-hidden p-0">
        <div className="">
          <img src="./src/assets/image.png" alt="game-cover" className=""/>
        </div>
        <div className="flex justify-center pt-5">
          <InputFile updateDownloadResult={setDownloadResult}/>
          <p className="pt-5">{downloadResult}</p>
        </div>
      </div>
    </div>
  );
}