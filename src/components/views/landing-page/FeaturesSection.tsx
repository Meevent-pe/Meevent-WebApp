import { FeatureInfo } from "./FeatureInfo";
import { EventCard } from "./EventCard";
import Image from "next/image";
import { BadgeCarousel } from "./BadgeCarousel";
import { ReviewCard } from "./ReviewCard";
import {
    FEATURE_CATEGORIES,
    FEATURE_EVENTS,
    FEATURE_USER_REVIEWS,
    FILTERS_FEATURE,
    REPUTATION_FEATURE,
    REVIEWS_FEATURE,
} from "@/constants/landing-features";

export const FeaturesSection = () => {
    return (
        <section className="relative z-10 flex flex-col gap-16 bg-white px-4 py-16">
            <h2 className="text-meevent-primary text-center text-2xl font-medium xl:text-[40px]">
                Diseñamos una experiencia {` `}
                <span className="relative inline-block font-bold">
                    basada en la verdad
                    <span className="absolute -bottom-3 left-0 h-3 w-full bg-[url('/underline.svg')] bg-contain bg-no-repeat" />
                </span>
            </h2>

            <div className="flex flex-col gap-16 xl:items-center xl:justify-center">
                <div className="flex flex-col gap-8 xl:w-270 xl:flex-row xl:gap-15">
                    <FeatureInfo
                        badgeIcon={REPUTATION_FEATURE.badgeIcon}
                        badgeText={REPUTATION_FEATURE.badgeText}
                        cardTitle={REPUTATION_FEATURE.cardTitle}
                        cardDescription={REPUTATION_FEATURE.cardDescription}
                    />

                    <div className="flex flex-col gap-6 xl:h-70 xl:flex-row xl:flex-wrap">
                        {FEATURE_EVENTS.map((e) => (
                            <EventCard
                                key={e.eventTitle}
                                eventImg={e.eventImg}
                                eventTitle={e.eventTitle}
                                eventReviewsCount={e.eventReviewsCount}
                                eventStars={e.eventStars}
                                eventsCount={e.eventsCount}
                                position={e.position}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-8 xl:w-270 xl:flex-row-reverse xl:items-center xl:gap-15">
                    <FeatureInfo
                        badgeIcon={FILTERS_FEATURE.badgeIcon}
                        badgeText={FILTERS_FEATURE.badgeText}
                        cardTitle={FILTERS_FEATURE.cardTitle}
                        cardDescription={FILTERS_FEATURE.cardDescription}
                    />

                    <div className="xl:hidden">
                        <BadgeCarousel categories={FEATURE_CATEGORIES.slice(0, 3)} />
                        <BadgeCarousel categories={FEATURE_CATEGORIES.slice(3, 5)} reverse />
                    </div>

                    <div className="hidden items-center gap-3 xl:grid xl:h-45 xl:w-155 xl:grid-cols-6">
                        {FEATURE_CATEGORIES.map((cat, index) => {
                            const colSpan =
                                index < 3 ? "col-span-2" : index < 5 ? "col-span-3" : "col-span-6";

                            return (
                                <div
                                    key={cat.name}
                                    className={`flex h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-full border border-[#750013]/10 px-11 shadow-sm ${colSpan} justify-self-center ${cat.active ? "bg-meevent-primary" : "bg-white"} `}
                                >
                                    <Image
                                        src={cat.icon}
                                        width={20}
                                        height={20}
                                        alt={cat.name}
                                        className="shrink-0"
                                    />
                                    <span
                                        className={`text-sm font-bold whitespace-nowrap ${
                                            cat.active ? "text-white" : "text-meevent-primary"
                                        }`}
                                    >
                                        {cat.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-5 xl:w-270 xl:flex-row xl:gap-30">
                    <FeatureInfo
                        badgeIcon={REVIEWS_FEATURE.badgeIcon}
                        badgeText={REVIEWS_FEATURE.badgeText}
                        cardTitle={REVIEWS_FEATURE.cardTitle}
                        cardDescription={REVIEWS_FEATURE.cardDescription}
                    />

                    <div className="flex flex-col gap-6 xl:w-131 xl:gap-8">
                        {FEATURE_USER_REVIEWS.map((r) => (
                            <ReviewCard
                                key={r.userName}
                                name={r.userName}
                                photo={r.photo}
                                review={r.review}
                                position={r.position}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
