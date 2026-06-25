export interface EventDateCard {
    header: string;
    timeRange: string;
}

export function formatEventDateCard(startsAt: string, endsAt: string): EventDateCard {
    const startDate = new Date(startsAt);
    const endDate = new Date(endsAt);

    const weekday = new Intl.DateTimeFormat("es-PE", {
        weekday: "long",
    }).format(startDate);

    const day = startDate.getDate();

    const month = new Intl.DateTimeFormat("es-PE", {
        month: "long",
    }).format(startDate);

    const year = startDate.getFullYear();

    const header = `${capitalize(weekday)} ${day} de ${capitalize(month)} - ${year}`;

    const startTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(startDate);

    const endTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(endDate);

    return {
        header,
        timeRange: `${startTime} - ${endTime}`,
    };
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
