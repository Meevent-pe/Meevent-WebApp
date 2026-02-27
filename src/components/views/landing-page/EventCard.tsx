import { Star } from "lucide-react";
import Image from "next/image";

interface Props {
    eventImg: string;
    eventTitle: string;
    eventsCount: number;
    eventStars: number;
    eventReviewsCount: number;
    position: string
}

export const EventCard = ({ eventImg, eventTitle, eventsCount, eventStars, eventReviewsCount, position }: Props) => {
    return (
        <div className={`w-70 flex items-center justify-start rounded-3xl  border border-[#750013]/10 px-5 py-4 gap-2 shadow ${position}`}>
            <Image src={eventImg} width={64} height={64} alt={eventTitle} className="object-cover shrink-0" />
            <div>
                <span className="font-bold text-sm">{eventTitle}</span>
                <p className="text-sm leading-3">{eventsCount} eventos</p>

                <div className="flex items-center gap-2 w-36 mt-1">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => {
                            const isFilled = index < eventStars;
                            return (
                                <Star
                                    key={index}
                                    size={12}
                                    className={isFilled
                                        ? "text-meevent-primary fill-meevent-primary" // Rojo/Primario
                                        : "text-gray-300 fill-gray-300"               // Gris
                                    }
                                />
                            );
                        })}
                    </div>
                    <span className="text-[12px]">{eventReviewsCount} reseñas</span>
                </div>
            </div>
        </div>
    )
}
