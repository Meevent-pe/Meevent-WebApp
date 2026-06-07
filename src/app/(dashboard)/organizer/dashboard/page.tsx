"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrganizerEvents } from "@/shared/services/event-service";
import { EventEmptyState } from "@/shared/components/EmptyState";
import { EventCard } from "@/features/event/components/EventCard";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['organizer-events'],
    queryFn: getOrganizerEvents,
  });

  if (isLoading) return <div>Cargando eventos...</div>;
  if (error) return <div>Error al cargar.</div>;
  if (!data || data.length === 0) return <EventEmptyState />;
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mis Eventos</h1>
      {data.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}