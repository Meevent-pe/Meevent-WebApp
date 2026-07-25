export type UserRole = "ATTENDEE" | "ORGANIZER" | "ADMIN";
export type AuthProvider = "LOCAL" | "GOOGLE";

export interface AuthActionResult {
    success: boolean;
    message: string;
    fieldErrors?: Record<string, string>;
}
