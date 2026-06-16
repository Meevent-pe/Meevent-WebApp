interface Props {
    venueName: string;
    address: string;
    city: string;
}

export function EventLocation({ venueName, address, city }: Props) {
    return (
        <section className="bg-card rounded-3xl border p-8">
            <h2 className="mb-6 text-3xl font-semibold">Location</h2>

            <div className="overflow-hidden rounded-2xl border">
                <div className="bg-muted h-[350px]" />
            </div>

            <div className="mt-6 space-y-2">
                <p className="font-semibold">{venueName}</p>

                <p className="text-muted-foreground">{address}</p>

                <p className="text-muted-foreground">{city}</p>
            </div>
        </section>
    );
}
