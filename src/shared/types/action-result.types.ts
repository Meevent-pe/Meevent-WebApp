export interface ActionResult {
    success: boolean;
    message: string;
    fieldErrors?: Record<string, string>;
    traceId?: string;
    redirectTo?: string;
}
