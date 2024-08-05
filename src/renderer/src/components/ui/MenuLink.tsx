import { NavLink } from "react-router-dom";

interface MenuLinkProps {
	itemName: string;
	icon: string;
	route: string;
}

export function MenuLink({ itemName, icon, route }: MenuLinkProps) {
	return (
		<NavLink
			to={route}
			className={({ isActive }) => {
				return `flex gap-3 hover:text-red-500 hover:bg-zinc-900 hover:shadow-md rounded p-3
				transition-colors delay-75
				 ${isActive ? "text-red-500 bg-zinc-900" : "text-[#a5a4a4]"}`;
			}}
		>
			<img src={icon} alt={`${itemName}-icon`} className="size-5" />
			{itemName}
		</NavLink>
	);
}
