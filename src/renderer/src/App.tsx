// TODO refactor icons imports
import CatalogIcon from "@renderer/assets/icon-catalog.svg";
import LibraryIcon from "@renderer/assets/icon-library.svg";
import DownloadIcon from "@renderer/assets/icon-downloads.svg";
import SettingsIcon from "@renderer/assets/icon-settings.svg"
import { RecentsLink }  from "@renderer/components/ui/RecentsLink";
import { MenuLink } from "@renderer/components/ui/MenuLink";
import { MenuHeader } from "@renderer/components/ui/MenuHeader"
import { Outlet } from 'react-router-dom';

export function App(): JSX.Element {
  return (
<<<<<<< HEAD
    <div id="app" className="flex ps">
      <div id="menu" className="container flex flex-col h-screen w-[25%] max-xl:min-w-56">
        <div className="mt-5 flex w-full max-h-[50px] max-w-full items-center">
         < img src={GreedIcon} className="size-12 max-xl:size-10" alt="greed-icon" />
          <div className="font-extrabold text-sm">
            Greed Client
          </div>
=======
    <div id="app" className="flex">
      <div id="menu" 
        className="container flex flex-col h-screen w-[25%] max-xl:min-w-56 max-w-64 ps-0"
      >
        <MenuHeader />

        <h2 className= "mt-[10vh] text-sm font-bold ps-6">Recents</h2>
        <div className="pt-3 ps-4">
          <RecentsLink text="Baldur's Gate III" src= "https://placehold.co/30" />
          <RecentsLink text="Baldur's Gate III THE RETURN OF GATE OF BALDUR" src= "https://placehold.co/30" />
          <RecentsLink text="Baldur's Gate III" src= "https://placehold.co/30" />
>>>>>>> 1c39b7d213f7ced21e12632c7ed1f2da473dfac6
        </div>

        <div id="links-section" className="ps-6 mt-[3vh] flex flex-col gap-3 text-xs h-full max-w-sm">
          <MenuLink itemName="Catalog" icon={CatalogIcon} route="catalog" />
          <MenuLink itemName="Library" icon={LibraryIcon}  route="cu"/>
          <MenuLink itemName="Downloads" icon={DownloadIcon} route="download"/>
        </div>

        <div className="text-xs ps-6 p-4">
            <MenuLink itemName="Settings" icon={SettingsIcon} route="settings" />
        </div>
      </div>
      <div id="main-section" className="container flex flex-col overflow-hidden p-0">
        <div id="menu-bar" className="h-[1.6rem] bg-[#171717]" />
        <Outlet />
      </div>
    </div>
  );
}