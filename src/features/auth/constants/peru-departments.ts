export interface PeruDepartment {
    id: number;
    name: string;
    slug: string;
}

/**
 * Catálogo temporal alineado con
 * V20260114163452__remove_cities_and_add_departments.sql.
 *
 * El backend todavía recibe estos IDs mediante el campo `city_id`.
 * Reemplazar por GET /api/v1/public/departments cuando esté disponible.
 */
export const PERU_DEPARTMENTS: readonly PeruDepartment[] = [
    { id: 1, name: "Lima", slug: "lima" },
    { id: 2, name: "Arequipa", slug: "arequipa" },
    { id: 3, name: "Cusco", slug: "cusco" },
    { id: 4, name: "Piura", slug: "piura" },
    { id: 5, name: "La Libertad", slug: "la-libertad" },
    { id: 6, name: "Loreto", slug: "loreto" },
    { id: 7, name: "San Martín", slug: "san-martin" },
    { id: 8, name: "Ucayali", slug: "ucayali" },
    { id: 9, name: "Puno", slug: "puno" },
    { id: 10, name: "Tacna", slug: "tacna" },
    { id: 11, name: "Moquegua", slug: "moquegua" },
    { id: 12, name: "Apurímac", slug: "apurimac" },
    { id: 13, name: "Ayacucho", slug: "ayacucho" },
    { id: 14, name: "Huancavelica", slug: "huancavelica" },
    { id: 15, name: "Junín", slug: "junin" },
    { id: 16, name: "Huánuco", slug: "huanuco" },
    { id: 17, name: "Cajamarca", slug: "cajamarca" },
    { id: 18, name: "Amazonas", slug: "amazonas" },
    { id: 19, name: "Ica", slug: "ica" },
    { id: 20, name: "Callao", slug: "callao" },
    { id: 21, name: "Tumbes", slug: "tumbes" },
    { id: 22, name: "Ancash", slug: "ancash" },
    { id: 23, name: "Pasco", slug: "pasco" },
    { id: 24, name: "Madre de Dios", slug: "madre-de-dios" },
] as const;
