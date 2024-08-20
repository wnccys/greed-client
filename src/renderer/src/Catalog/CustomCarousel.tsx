import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@renderer/ShadComponents/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
import GameDummyImage from "@renderer/Assets/image.png";
import { useFeatured } from "@renderer/Hooks/featured";

export function CustomCarousel() {
    const featuredGames = useFeatured();

	const plugin = React.useRef(
		Autoplay({
			delay: 5000,
		}),
	);

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full hover:-translate-y-1 transition-all"
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{Array.from({ length: 3 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<CarouselItem key={index}>
						<div className="p-1">
							<Card className="border-2 bg-zinc-950 cursor-pointer embla__container">
								<CardContent className="flex items-center justify-center p-0">
									<img
										src={GameDummyImage}
										alt="game-image"
										className="rounded-lg embla__slide embla__class-names"
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}