import { PERU_DEPARTMENTS } from "@/shared/constants/peru-departments";

const DEPARTMENT_ALIASES: Readonly<Record<string, string>> = {
    "provincia constitucional del callao": "callao",
    "provincia de lima": "lima",
    "region lima": "lima",
    "departamento de lima": "lima",
};

function normalizeName(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function findDepartmentIdByGoogleName(value: string | undefined) {
    if (!value) {
        return null;
    }

    const normalized = normalizeName(value);
    const alias = DEPARTMENT_ALIASES[normalized];
    const comparable = alias ?? normalized.replace(/^(departamento|region|provincia) de /, "");
    const department = PERU_DEPARTMENTS.find(
        (candidate) => normalizeName(candidate.name) === comparable || candidate.slug === comparable
    );

    return department?.id ?? null;
}
