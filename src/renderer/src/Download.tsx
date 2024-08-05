
import GreedIcon from "@renderer/assets/icon-greed.svg";
import { BarGrid } from "./components/ui/bargrid";





export function Download(): JSX.Element {


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

      <div id="grid" className="container flex flex-col h-screen overflow-hidden p-0">
      <div className="flex-grow p-4"> {/* Adiciona padding e garante que o Grid tenha espaço */}
        <BarGrid />
      </div>
    </div>
        </div>
    
  );
}