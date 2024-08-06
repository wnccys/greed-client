import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@renderer/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@renderer/components/ui/card";
import GameDummyImage from "@renderer/assets/image.png";

export function CustomCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
    
    return (
        <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        >
        <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CarouselItem key={index}>
                <div className="p-1">
                <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img src={GameDummyImage} alt="game-image" className="rounded-lg" />
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
    );
}