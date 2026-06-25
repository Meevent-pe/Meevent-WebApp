import Image from "next/image";

interface Props {
    title: string;
    bannerUrl: string;
}

export function EventBanner({ title, bannerUrl }: Props) {
    return (
        <section>
            <div className="relative h-[210px] lg:h-[420px] overflow-hidden rounded-3xl">
                <Image src={bannerUrl} alt={title} fill priority className="object-cover" />ejemplo
            </div>
        </section>
    );
}
