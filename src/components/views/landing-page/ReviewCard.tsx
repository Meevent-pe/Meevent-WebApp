import Image from "next/image";

interface Props {
    name: string;
    review: string;
    photo: string;
    position: string;
}

export const ReviewCard = ({ name, review, photo, position }: Props) => {
    return (
        <div
            className={`flex max-w-88 px-6 py-3 shadow border border-[#750013]/10 gap-3 items-center rounded-[16px] hover:scale-[1.03] hover:shadow-md transition-all duration-200 cursor-pointer ${position}`}
        >
            <Image
                src={photo}
                width={52}
                height={52}
                alt={name}
                className="object-cover shrink-0 w-13 h-13"
            />

            <div>
                <span className="font-bold text-sm/tight">{name}</span>
                <p className="text-sm/tight">{review}</p>
            </div>
        </div>
    );
};
