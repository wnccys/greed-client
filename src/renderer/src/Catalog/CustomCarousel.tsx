import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@renderer/ShadComponents/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
import imagesData from "../../../steam-games/images.json"; // Importando o JSON com as imagens
import image1  from "../assets/carousel/394511.jpg";
import image2 from  "../assets/carousel/mdw3.jpg"
import image3 from  "../assets/carousel/image.png"


{/*interface Image { //interface de atribuicao
    id: string; 
    link: string;
    imgSrc: string;
    title: string;
} */}


export function CustomCarousel() {
    // Array de URLs de imagens
    const [images, setImages] = React.useState([
         'https://cdn2.steamgriddb.com/hero/bb2df1ceec69185fc8559f9c41052e2f.webp',
         image1,
         image2,
         image3

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