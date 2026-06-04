import { MessageCircle, Sparkles, Star, LucideIcon } from "lucide-react";

interface FeatureData {
    badgeIcon: LucideIcon;
    badgeText: string;
    cardTitle: string;
    cardDescription: string;
}

interface EventData {
    eventImg: string;
    eventTitle: string;
    eventsCount: number;
    eventStars: number;
    eventReviewsCount: number;
    position: string;
}

interface CategorieData {
    icon: string;
    name: string;
    active: boolean;
}

interface ReviewsData {
    userName: string;
    review: string;
    photo: string;
    position: string;
}

export const REPUTATION_FEATURE: FeatureData = {
    badgeIcon: Star,
    badgeText: "Reputación del Organizador",
    cardTitle: "Dime quién organiza y te diré si vale la pena ir",
    cardDescription:
        "Creamos un sistema de reputación para los organizadores. Filtramos a los que solo quieren tu dinero de los que realmente crean experiencias increíbles.",
};

export const FEATURE_EVENTS: EventData[] = [
    {
        eventImg: "/events/event_1.png",
        eventTitle: "Taller de rosas",
        eventsCount: 20,
        eventStars: 3,
        eventReviewsCount: 15,
        position: "self-start",
    },
    {
        eventImg: "/events/event_2.png",
        eventTitle: "Taller de cerámica",
        eventsCount: 8,
        eventStars: 4,
        eventReviewsCount: 5,
        position: "self-end",
    },
    {
        eventImg: "/events/event_3.png",
        eventTitle: "Escape Room ",
        eventsCount: 15,
        eventStars: 3,
        eventReviewsCount: 12,
        position: "self-start",
    },
    {
        eventImg: "/events/event_4.png",
        eventTitle: "Pintura y vino",
        eventsCount: 5,
        eventStars: 3,
        eventReviewsCount: 2,
        position: "self-end",
    },
];

export const FILTERS_FEATURE: FeatureData = {
    badgeIcon: Sparkles,
    badgeText: "Filtros por tu Vibe",
    cardTitle: "Encuentra lo que buscas, sin rodeos",
    cardDescription:
        "Olvídate de buscar en mil cuentas de Instagram. Todo el ecosistema de eventos en un solo lugar, filtrado por lo que realmente te interesa.",
};

export const FEATURE_CATEGORIES: CategorieData[] = [
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
];

export const REVIEWS_FEATURE: FeatureData = {
    badgeIcon: MessageCircle,
    badgeText: "Calificación real del público",
    cardTitle: "La verdad sobre el evento, dicha por usuarios como tú",
    cardDescription:
        "¿El sonido fue malo? ¿La barra libre se acabó a la hora? Aquí las estrellas no se compran, se ganan. Lee la experiencia real antes de gastar un centimo.",
};

export const FEATURE_USER_REVIEWS: ReviewsData[] = [
    {
        userName: "César",
        review: "Logística impecable, la entrada fue súper rápida a pesar de la fila.",
        photo: "/people/image_650.png",
        position: "xl:self-start",
    },
    {
        userName: "Rosa",
        review: "Segundo evento y la calidad se mantiene.",
        photo: "/people/image_154.png",
        position: "xl:self-end",
    },
    {
        userName: "Esteban",
        review: "Excelente vibra. Me sentí seguro todo el tiempo.",
        photo: "/people/image_768.png",
        position: "xl:self-start",
    },
];
