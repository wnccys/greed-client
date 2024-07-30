interface RecentsLinkProps {
    text: string,
    src: string,
}

export function RecentsLink({text, src}: RecentsLinkProps) {
    return (
        <div 
            className="flex bg-[#171717] h-11 rounded-2xl pe-1 
            hover:bg-zinc-800 mb-3 cursor-pointer"
        >
            <img src={src} alt="game-cover" className="ms-2 p-1 rounded-full" />
            <p className="p-2 text-xs text-wrap truncate">
                {text} 
            </p>
        </div>
    )
}