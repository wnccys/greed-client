import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@renderer/ShadComponents/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
import imagesData from "../../../steam-games/images.json"; // Importando o JSON com as imagens

interface Image { //interface de atribuicao
    id: string; 
    link: string;
    imgSrc: string;
    title: string;
}

export function CustomCarousel() {
    const [images, setImages] = React.useState<Image[]>([]);
    const plugin = React.useRef(
        Autoplay({
            delay: 5000,
        }),
    );

    React.useEffect(() => {
        setImages(imagesData);
    }, []);

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full hover:-translate-y-1 transition-all"
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={image.id}> {/* Usar id como uniqueKey*/}
                        <div className="p-1">
                            <Card className="border-2 bg-zinc-950 cursor-pointer embla__container">
                                <CardContent className="flex items-center justify-center p-0">
                                    <img
                                        src={image.imgSrc}
                                       // alt={`game-image-${image.title}`}
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
