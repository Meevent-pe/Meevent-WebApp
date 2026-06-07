"use client";

import { useForm } from "react-hook-form";

export default function CreateEventPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Datos del evento a crear:", data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Evento</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg border">
        <div>
          <label className="block text-sm font-medium">Título del Evento</label>
          <input {...register("title")} className="w-full border p-2 rounded" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea {...register("description")} className="w-full border p-2 rounded" rows={4} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Fecha Inicio</label>
            <input type="datetime-local" {...register("starts_at")} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha Fin</label>
            <input type="datetime-local" {...register("ends_at")} className="w-full border p-2 rounded" />
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Guardar Evento
        </button>
      </form>
    </div>
  );
}