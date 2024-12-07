import { cn } from "@renderer/ShadComponents/lib/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("animate-pulse bg-zinc-500", className)} {...props} />
	);
}

export { Skeleton };
