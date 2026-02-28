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
            className={`flex max-w-88 cursor-pointer items-center gap-3 rounded-[16px] border border-[#750013]/10 px-6 py-3 shadow transition-all duration-200 hover:scale-[1.03] hover:shadow-md ${position}`}
        >
            <Image
                src={photo}
                width={52}
                height={52}
                alt={name}
                className="h-13 w-13 shrink-0 object-cover"
            />

            <div>
                <span className="text-sm/tight font-bold">{name}</span>
                <p className="text-sm/tight">{review}</p>
            </div>
        </div>
    );
};
