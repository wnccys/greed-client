import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@renderer/ShadComponents/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
<<<<<<< HEAD
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
										<div className="translate-y-[10.5rem] h-12 absolute w-full">
											<div
												className="text-white hover:-translate-y-5 bg-zinc-950/40
												transition-all duration-300 w-full pb-[2rem] p-2 ps-5"
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
=======
import imagesData from "../../../steam-games/images.json"; // Importando o JSON com as imagens
import image1  from "../assets/carousel/394511.jpg";
import image2 from  "../assets/carousel/mdw3.jpg"
import image3 from  "../assets/carousel/image.png"
import image4 from  "../assets/carousel/reddead.jpg"
import image5 from  "../assets/carousel/palworld.png"
import image6 from  "../assets/carousel/godofwar.jpg"
import image7 from  "../assets/carousel/fifa23.jpg"
import image8 from  "../assets/carousel/resident.jpg"
import image9 from  "../assets/carousel/fallout.jpg"
import image10 from  "../assets/carousel/cyberpunk2077.jpg"
import image11 from  "../assets/carousel/blackops.jpg"
import image12 from  "../assets/carousel/thewitcher.jpg"
import image13 from  "../assets/carousel/batman.jpg"
import image14 from  "../assets/carousel/assassins.jpg"





{/*interface Image { //interface de atribuicao
    id: string; 
    link: string;
    imgSrc: string;
    title: string;
} */}


export function CustomCarousel() {
    // Array de URLs de imagens
    const [images, setImages] = React.useState([
         'https://cdn2.steamgriddb.com/hero/bb2df1ceec69185fc8559f9c41052e2f.webp', image1, image2, image3, image4, image5,
          image6, image7, image8, 
         image9, image10, image11,
         image12,image13, image14
        

    ]);

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
                {images.map((imgSrc, index) => (
                    imgSrc && ( 
                    <CarouselItem key={imgSrc + index}>
                        <div className="p-1">
                            <Card className="border-2 bg-zinc-950 cursor-pointer embla__container flex flex-col">
                                <CardContent className="flex items-center justify-center p-0 flex-grow">
                                    <img
                                        src={imgSrc}
                                        alt={`game-image-${index + 1}`}
                                        className="rounded-lg object-cover w-full h-max"
                                        style={{ height: '500px' }}
                                        
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    )
                ))}
            </CarouselContent>
        </Carousel>
    );
}
>>>>>>> d9f8664dafb3c6181e14192abd0ca8cacbab91c9
