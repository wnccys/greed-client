import {
	CatalogIcon,
	LibraryIcon,
	DownloadIcon,
	SettingsIcon,
} from "@renderer/Assets/icons";
import { RecentsLink } from "@renderer/App/RecentsLink";
import { MenuLink } from "@renderer/App/MenuLink";
import { MenuHeader } from "@renderer/App/MenuHeader";
import { Outlet } from "react-router-dom";
import { MenuBar } from "@renderer/App/MenuBar";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@renderer/ShadComponents/ui/sonner";
import BaldIcon from "@renderer/Assets/bald.ico";

export function App(): JSX.Element {
	useEffect(() => {
		window.electron.ipcRenderer.on("torrentDownloadComplete", () => {
			toast.success("Done", {
				description: "Torrent Download Complete.",
			});
		});
	});

	return (
		<>
			<Toaster className="bg-slate-950 drop-shadow-xl" />
			<div id="app" className="flex select-none">
				<div className="flex">
					<MenuBar />
					<div
						id="menu"
						className="container flex flex-col h-screen w-[16.5rem] ps-0 z-50"
					>
						<MenuHeader />

						<h2 className="mt-[5em] text-sm font-bold ps-6">Recents</h2>
						<div className="pt-3 ps-4">
							<RecentsLink text="Baldur's Gate III" src={BaldIcon} />
							<RecentsLink
								text="Baldur's Gate II: The Return Of Bald"
								src={BaldIcon}
							/>
							<RecentsLink text="Baldur's Gate I" src={BaldIcon} />
						</div>

						<div
							id="links-section"
							className="ps-6 mt-[1.5em] flex flex-col gap-3 text-xs h-full max-w-sm"
						>
							<MenuLink itemName="Catalog" icon={CatalogIcon} route="catalog" />
							<MenuLink itemName="Library" icon={LibraryIcon} route="library" />
							<MenuLink
								itemName="Downloads"
								icon={DownloadIcon}
								route="downloads"
							/>
						</div>

						<div className="text-xs ps-6 p-4 no-drag">
							<MenuLink
								itemName="Settings"
								icon={SettingsIcon}
								route="settings"
							/>
						</div>
					</div>
				</div>
				<div id="main-section" className="flex flex-col p-0 w-screen">
					<div className="h-screen overflow-y-scroll">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
