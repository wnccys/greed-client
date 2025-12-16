import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@renderer/ShadComponents/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
import BaldurImage from "@renderer/Assets/library_hero_bald.jpg";
import EldenImage from "@renderer/Assets/library_hero_elden.jpg";
import CyberImage from "@renderer/Assets/library_hero_cyber.jpg";
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
		<Carousel plugins={[plugin.current]} onMouseLeave={plugin.current.reset}>
			<CarouselContent>
				{imagesArr.map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<CarouselItem key={index}>
						<Link
							to={`../selected-game/${imagesArrId[index]}/${imagesArrName[index]}`}
						>
							<div className="">
								<Card className="bg-zinc-950 cursor-pointer embla__container rounded-none border-none">
									<CardContent className="flex items-center justify-center p-0">
										<img
											src={imagesArr[index]}
											alt="game-image"
											className="rounded-none embla__slide embla__class-names hover:scale-105 
											transition-all duration-300"
										/>
										<div className="bottom-0 h-[35px] absolute w-full">
											<div
												className="text-white hover:-translate-y-5 bg-zinc-950/40
												transition-all duration-300 w-full pb- p-2 ps-5"
											>
												<p className="">{imagesArrName[index]}</p>
												<p className="text-xs">{"<GameData>"}</p>
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
