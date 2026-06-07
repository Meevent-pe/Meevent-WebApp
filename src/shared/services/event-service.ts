import { Event } from "@/features/event/types/events";

export const getOrganizerEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${process.env.API_URL}/organizer/events`);
  if (!response.ok) throw new Error("Error al obtener eventos");
  return response.json();
};