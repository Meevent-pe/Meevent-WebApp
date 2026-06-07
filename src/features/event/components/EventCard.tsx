import { Event } from "../types/events";

const statusStyles: Record<Event['status'], string> = {
  DRAFT: 'bg-gray-100 text-gray-600 border-gray-200',
  PUBLISHED: 'bg-green-50 text-green-700 border-green-200',
  CANCELLED: 'bg-red-50 text-red-700 border-red-200',
  CLOSED: 'bg-black text-white border-black',
};

export const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500">Fecha: {new Date(event.start_date).toLocaleDateString()}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[event.status]}`}>
          {event.status}
        </span>
        
        <button className="text-sm text-blue-600 hover:underline">Gestionar</button>
      </div>
    </div>
  );
};