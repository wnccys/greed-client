import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@renderer/ShadComponents/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
import GameDummyImage from "@renderer/assets/image.png";

export function CustomCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })
    );
    
    return (
        <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        >
        <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CarouselItem key={index}>
                <div className="p-1">
                <Card className="border-2 bg-zinc-950">
                    <CardContent className="flex items-center justify-center p-0">
                        <img src={GameDummyImage} alt="game-image" className="rounded-lg" />
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
    );
}