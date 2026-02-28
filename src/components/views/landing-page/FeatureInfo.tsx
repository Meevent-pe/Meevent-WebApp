import { Badge } from "@/components/ui/Badge";
import { LucideIcon } from "lucide-react";

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
            <Badge className="rounded-full bg-[#FFE8EB] text-meevent-primary py-3 px-4 self-start">
                <Icon size={14} strokeWidth={3} />
                <span className="text-[12px] font-bold xl:text-[16px]">
                    {badgeText}
                </span>
            </Badge>
            <h3 className="text-2xl font-bold my-2 xl:text-[32px]">
                {cardTitle}
            </h3>
            <p className="text-sm font-medium xl:text-[16px]">
                {cardDescription}
            </p>
        </div>
    );
};
