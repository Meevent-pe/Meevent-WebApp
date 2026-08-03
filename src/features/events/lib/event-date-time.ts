const EVENT_TIME_ZONE = "America/Lima";

export function toPeruDateTimeInput(value: string | Date) {
    const date = typeof value === "string" ? new Date(value) : value;
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: EVENT_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(date);
    const getPart = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? "";

    return `${getPart("year")}-${getPart("month")}-${getPart("day")}T${getPart("hour")}:${getPart("minute")}`;
}
