import Image from "next/image";

interface Category {
    name: string;
    icon: string;
    active?: boolean;
}

export const BadgeCarousel = ({
    categories,
    reverse = false,
}: {
    categories: Category[];
    reverse?: boolean;
}) => {
    const items = [...categories, ...categories];

    return (
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
                className={`flex gap-3 py-2 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
            >
                {items.map((cat, idx) => (
                    <div
                        key={`${cat.name}-${idx}`}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full border border-[#750013]/10 shadow-sm shrink-0 ${
                            cat.active ? "bg-meevent-primary" : "bg-white"
                        }`}
                    >
                        <Image
                            src={cat.icon}
                            width={20}
                            height={20}
                            alt={cat.name}
                            className="shrink-0"
                        />
                        <span
                            className={`text-sm font-bold whitespace-nowrap ${
                                cat.active
                                    ? "text-white"
                                    : "text-meevent-primary"
                            }`}
                        >
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
