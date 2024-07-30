import { InputFile } from "@renderer/components/ui/inputfile";
// TODO refactor icons imports
import CatalogIcon from "@renderer/assets/icon-catalog.svg";
import LibraryIcon from "@renderer/assets/icon-library.svg";
import DownloadIcon from "@renderer/assets/icon-downloads.svg";
import { RecentsLink }  from "@renderer/components/ui/RecentsLink";
import { MenuLink } from "@renderer/components/ui/MenuLink";
import { MenuHeader } from "@renderer/components/ui/MenuHeader"
import { useState } from "react";

export function App(): JSX.Element {
  const [downloadResult, setDownloadResult] = useState<string | undefined>(undefined);

  return (
    <div id="app" className="flex">
      <div id="menu" 
        className="container flex flex-col h-screen w-[25%] max-xl:min-w-56 max-w-64 ps-0"
      >
        <MenuHeader />

        <h2 className= "mt-[10vh] text-sm font-bold ps-6">Recents</h2>
        <div className="pt-3 ps-4">
          <RecentsLink text="Baldur's Gate III" src= "https://placehold.co/30" />
          <RecentsLink text="TESTLASJFSL;DFJS;ALKFSAD;LFKJsfasf" src= "https://placehold.co/30" />
          <RecentsLink text="Baldur's Gate III" src= "https://placehold.co/30" />
        </div>

        <div id="links-section" className="ps-6 mt-[4vh] flex flex-col gap-6 text-xs">
          <MenuLink itemName="Catalog" icon={CatalogIcon} />
          <MenuLink itemName="Library" icon={LibraryIcon} />
          <MenuLink itemName="Downloads" icon={DownloadIcon} />
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