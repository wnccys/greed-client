import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@renderer/ShadComponents/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
import BaldurImage from "@renderer/Assets/library_hero_bald.jpg";
import EldenImage from "@renderer/Assets/library_hero_elden.jpg"
import CyberImage from "@renderer/Assets/library_hero_cyber.jpg"
import { Link } from "react-router-dom";

const imagesArr = [BaldurImage, EldenImage, CyberImage];
const imagesArrId = [1086940, 1245620, 1091500];
const imagesArrName = ["Baldur's Gate 3", "Elden Ring", "Cyberpunk: 2077"];

export function CustomCarousel() {
	const plugin = React.useRef(
		Autoplay({
			delay: 4000,
		}),
	);

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full hover:-translate-y-1 transition-all"
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{imagesArr.map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<CarouselItem key={index}>
						<Link to={`../selected-game/${imagesArrId[index]}/${imagesArrName[index]}`}>
							<div className="p-1">
								<Card className="border-2 bg-zinc-950 cursor-pointer embla__container">
									<CardContent className="flex items-center justify-center p-0">
										<img
											src={imagesArr[index]}
											alt="game-image"
											className="rounded-lg embla__slide embla__class-names"
										/>
										<div className="ms-8 translate-y-[11.5rem] h-300 absolute 
										z-30 bg-zinc-300 w-full">
											<div className={`text-white absolute z-20
											${!(imagesArrName[index].length > 24) ? 
												"-translate-y-[2.5rem] hover:-translate-y-[4.2rem]" :
												"-translate-y-[3.6rem] hover:-translate-y-[5.7rem]"} 
											bg-zinc-950/40 transition-all duration-300 w-full`}
											>
												<p className="p-2 z-10">{imagesArrName[index]}</p>
												<p className="text-xs p-3 pt-0 ps-2">{"<GameData>"}</p>
											</div>
										</div>
										</CardContent>
								</Card>
							</div>
						</Link>
						</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
