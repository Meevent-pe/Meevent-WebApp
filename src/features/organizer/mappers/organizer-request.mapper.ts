import type { OrganizerOnboardingFormValues } from "@/features/organizer/schemas/organizer.schemas";
import type { OnboardOrganizerRequestDto } from "@/features/organizer/types/organizer-api.types";

function optionalValue(value: string) {
    return value === "" ? undefined : value;
}

export function toOnboardOrganizerRequestDto(
    values: OrganizerOnboardingFormValues
): OnboardOrganizerRequestDto {
    return {
        legalName: values.legalName,
        displayName: values.displayName,
        ruc: optionalValue(values.ruc),
        contactPhone: optionalValue(values.contactPhone),
        bio: optionalValue(values.bio),
    };
}
