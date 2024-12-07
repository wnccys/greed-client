import { CardTitle, CardDescription } from "@renderer/ShadComponents/ui/card";

interface CardHeaderProps {
	title?: string;
	description?: string;
}

export function CardHeader({ title, description }: CardHeaderProps) {
	return (
		<div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
			<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
				{title && <CardTitle>{title}</CardTitle>}
				{description && <CardDescription>{description}</CardDescription>}
			</div>
		</div>
	);
}
