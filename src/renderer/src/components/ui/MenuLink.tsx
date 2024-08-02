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
				return `flex gap-3 ${isActive ? "text-red-400" : "text-[#a5a4a4]"}`;
			}}
		>
			<img src={icon} alt={`${itemName}-icon`} className="size-5" />
			{itemName}
		</NavLink>
	);
}
