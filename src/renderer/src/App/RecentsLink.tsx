interface RecentLinkProps {
	text: string;
	src: string;
}

export function RecentsLink({ text, src }: RecentLinkProps) {
	return (
		<div
			className="flex bg-[#171717] pe-1 gap-1 h-fit self-center rounded-sm
            hover:bg-zinc-800 mb-3 cursor-pointer transition-colors hover:shadow-lg hover:shadow-black"
		>
			<img src={src} alt="game-cover" className="ms-2 size-8 m-1 self-center" />
			<p className="p-2 text-xs text-wrap truncate mb-1">{text}</p>
		</div>
	);
}
