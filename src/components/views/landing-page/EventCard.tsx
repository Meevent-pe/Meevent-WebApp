import { Star } from "lucide-react";
import Image from "next/image";

interface Props {
    eventImg: string;
    eventTitle: string;
    eventsCount: number;
    eventStars: number;
    eventReviewsCount: number;
    position: string;
}

export const EventCard = ({
    eventImg,
    eventTitle,
    eventsCount,
    eventStars,
    eventReviewsCount,
    position,
}: Props) => {
    return (
        <div
            className={`flex max-w-70 cursor-pointer items-center justify-start gap-2 rounded-3xl border border-[#750013]/10 px-5 py-4 shadow transition-all duration-200 hover:scale-[1.03] hover:shadow-md ${position}`}
        >
            <Image
                src={eventImg}
                width={64}
                height={64}
                alt={eventTitle}
                className="shrink-0 object-cover"
            />
            <div>
                <span className="text-sm font-bold">{eventTitle}</span>
                <p className="text-sm leading-3">{eventsCount} eventos</p>

                <div className="mt-1 flex max-w-37 items-center gap-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => {
                            const isFilled = index < eventStars;
                            return (
                                <Star
                                    key={index}
                                    size={12}
                                    className={
                                        isFilled
                                            ? "text-meevent-primary fill-meevent-primary" // Rojo/Primario
                                            : "fill-gray-300 text-gray-300" // Gris
                                    }
                                />
                            );
                        })}
                    </div>
                    <span className="text-[12px]">{eventReviewsCount} reseñas</span>
                </div>
            </div>
        </div>
    );
};
