import { LucideIcon } from "lucide-react";
import { LandingBadge } from "./LandingBadge";

export interface FeatureInfoProps {
    badgeIcon: LucideIcon;
    badgeText: string;
    cardTitle: string;
    cardDescription: string;
}

export const FeatureInfo = ({
    badgeIcon: Icon,
    badgeText,
    cardTitle,
    cardDescription,
}: FeatureInfoProps) => {
    return (
        <div className="flex flex-col gap-3 xl:w-109 xl:shrink-0 xl:justify-center">
            <LandingBadge className="text-meevent-primary self-start rounded-full bg-[#FFE8EB] px-4 py-3">
                <Icon size={14} strokeWidth={3} />
                <span className="text-[12px] font-bold xl:text-[16px]">{badgeText}</span>
            </LandingBadge>
            <h3 className="my-2 text-2xl font-bold xl:text-[32px]">{cardTitle}</h3>
            <p className="text-sm font-medium xl:text-[16px]">{cardDescription}</p>
        </div>
    );
};
