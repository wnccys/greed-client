interface MenuLinkProps {
    itemName: string,
    icon: string, 
}

export function MenuLink({itemName, icon}: MenuLinkProps) {
    return (
        <div className="hover:cursor-pointer flex gap-3">
            <img src={icon} alt={`${itemName}-icon`} className="size-5"/>
            <h3>{itemName}</h3>
        </div>
    )
}