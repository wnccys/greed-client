import {
	CatalogIcon,
	LibraryIcon,
	DownloadIcon,
	SettingsIcon,
} from "@renderer/assets/icons";
import { RecentsLink } from "@renderer/components/ui/RecentsLink";
import { MenuLink } from "@renderer/components/ui/MenuLink";
import { MenuHeader } from "@renderer/components/ui/MenuHeader";
import { Outlet } from "react-router-dom";

export function App(): JSX.Element {
	return (
		<div id="app" className="flex select-none">
			<div
				id="menu"
				className="container flex flex-col h-screen w-[25%] 
				max-lg:min-w-56 max-w-64 ps-0 fixed z-10"
			>
				<MenuHeader />

				<h2 className="mt-[5em] text-sm font-bold ps-6">Recents</h2>
				<div className="pt-3 ps-4">
					<RecentsLink text="Baldur's Gate III" src="https://placehold.co/30" />
					<RecentsLink
						text="Baldur's Gate III THE RETURN OF GATE OF BALDUR"
						src="https://placehold.co/30"
					/>
					<RecentsLink text="Baldur's Gate III" src="https://placehold.co/30" />
				</div>

				<div
					id="links-section"
					className="ps-6 mt-[1.5em] flex flex-col gap-3 text-xs h-full max-w-sm"
				>
					<MenuLink itemName="Catalog" icon={CatalogIcon} route="catalog" />
					<MenuLink itemName="Library" icon={LibraryIcon} route="cu" />
					<MenuLink itemName="Downloads" icon={DownloadIcon} route="cu" />
				</div>

				<div className="text-xs ps-6 p-4">
					<MenuLink itemName="Settings" icon={SettingsIcon} route="settings" />
				</div>
			</div>
			<div
				id="main-section"
				className="flex flex-col p-0 ps-[16.5rem] mb-[100px] w-full"
			>
				<div id="menu-bar" className="h-[1.6rem] bg-[#171717] fixed w-full" />
				<Outlet />
			</div>
		</div>
	);
}
