export interface ApiFieldErrorDto {
    field: string;
    message: string;
}

export interface ApiErrorDto {
    code: string;
    message: string;
    traceId?: string;
    fieldErrors?: ApiFieldErrorDto[];
}
