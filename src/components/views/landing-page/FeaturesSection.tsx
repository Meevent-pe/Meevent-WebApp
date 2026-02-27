import { MessageCircle, Sparkles, Star } from "lucide-react"
import { FeatureInfo } from "./FeatureInfo"
import { EventCard } from "./EventCard"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import { BadgeCarousel } from "./BadgeCarousel"
import { ReviewCard } from "./ReviewCard"

const reputationFeatureInfo = {
    badgeIcon: Star,
    badgeText: "Reputación del Organizador",
    cardTitle: "Dime quién organiza y te diré si vale la pena ir",
    cardDescription: "Creamos un sistema de reputación para los organizadores. Filtramos a los que solo quieren tu dinero de los que realmente crean experiencias increíbles.",
}

const events = [
    {
        eventImg: "/events/event_1.png",
        eventTitle: "Taller de rosas",
        eventsCount: 20,
        eventStars: 3,
        eventReviewsCount: 15,
        position: "self-start"
    },
    {
        eventImg: "/events/event_2.png",
        eventTitle: "Taller de cerámica",
        eventsCount: 8,
        eventStars: 4,
        eventReviewsCount: 5,
        position: "self-end"
    },
    {
        eventImg: "/events/event_3.png",
        eventTitle: "Escape Room ",
        eventsCount: 15,
        eventStars: 3,
        eventReviewsCount: 12,
        position: "self-start"
    },
    {
        eventImg: "/events/event_4.png",
        eventTitle: "Pintura y vino",
        eventsCount: 5,
        eventStars: 3,
        eventReviewsCount: 2,
        position: "self-end"
    },
]

const filtersFeatureInfo = {
    badgeIcon: Sparkles,
    badgeText: "Filtros por tu Vibe",
    cardTitle: "Encuentra lo que buscas, sin rodeos",
    cardDescription: "Olvídate de buscar en mil cuentas de Instagram. Todo el ecosistema de eventos en un solo lugar, filtrado por lo que realmente te interesa.",
}

const eventCategories = [
    {
        icon: "/icons_category/Performing_Arts.png",
        name: "Comedia",
        active: true,
    },
    {
        icon: "/icons_category/Microphone.png",
        name: "Conciertos",
        active: false,
    },
    {
        icon: "/icons_category/Relax.png",
        name: "Relajado",
        active: false,
    },
    {
        icon: "/icons_category/Person_Surfing.png",
        name: "Extremo",
        active: false,
    },
    {
        icon: "/icons_category/Red_Heart.png",
        name: "Romántico",
        active: true,
    },
    {
        icon: "/icons_category/Man_Dancing.png",
        name: "Fiesta",
        active: false,
    },
]

const reviewsFeatureInfo = {
    badgeIcon: MessageCircle,
    badgeText: "Calificación real del público",
    cardTitle: "La verdad sobre el evento, dicha por usuarios como tú",
    cardDescription: "¿El sonido fue malo? ¿La barra libre se acabó a la hora? Aquí las estrellas no se compran, se ganan. Lee la experiencia real antes de gastar un peso.",
}

const userReviews = [
    {
        userName: "César",
        review: "Logística impecable, la entrada fue súper rápida a pesar de la fila.",
        photo: "/people/image_650.png"
    },
    {
        userName: "Rosa",
        review: "Segundo evento y a calidad se mantiene.",
        photo: "/people/image_154.png"
    },
    {
        userName: "Esteban",
        review: "Excelente vibra. Me sentí seguro todo el tiempo.",
        photo: "/people/image_768.png"
    }
]

export const FeaturesSection = () => {
    return (
        <section className="flex flex-col bg-white py-16 px-4 gap-16">

            <h2 className="text-meevent-primary text-2xl font-medium text-center">Diseñamos una experiencia
                <span className="font-bold inline-block relative">
                    basada en la verdad
                    <span className="absolute left-0 -bottom-3 w-full h-3 bg-[url('/underline.svg')] bg-no-repeat bg-contain" />
                </span>
            </h2>

            <div className="flex flex-col gap-16">

                <div className="flex flex-col gap-8">
                    <FeatureInfo
                        badgeIcon={reputationFeatureInfo.badgeIcon} badgeText={reputationFeatureInfo.badgeText}
                        cardTitle={reputationFeatureInfo.cardTitle} cardDescription={reputationFeatureInfo.cardDescription} />

                    <div className="flex flex-col gap-6">
                        {
                            events.map(e => (
                                <EventCard
                                    key={e.eventTitle}
                                    eventImg={e.eventImg}
                                    eventTitle={e.eventTitle}
                                    eventReviewsCount={e.eventReviewsCount}
                                    eventStars={e.eventStars}
                                    eventsCount={e.eventsCount}
                                    position={e.position} />
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <FeatureInfo
                        badgeIcon={filtersFeatureInfo.badgeIcon} badgeText={filtersFeatureInfo.badgeText}
                        cardTitle={filtersFeatureInfo.cardTitle} cardDescription={filtersFeatureInfo.cardDescription} />
                    <div>
                        <BadgeCarousel categories={eventCategories.slice(0, 3)} />
                        <BadgeCarousel categories={eventCategories.slice(3, 5)} reverse />
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <FeatureInfo
                        badgeIcon={reviewsFeatureInfo.badgeIcon} badgeText={reviewsFeatureInfo.badgeText}
                        cardTitle={reviewsFeatureInfo.cardTitle} cardDescription={reviewsFeatureInfo.cardDescription} />

                    <div className="flex flex-col gap-6">

                        {
                            userReviews.map(r => (
                                <ReviewCard key={r.userName} name={r.userName} photo={r.photo} review={r.review} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
