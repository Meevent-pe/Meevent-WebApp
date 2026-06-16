interface Props {
    description: string;
}

export function EventDescription({ description }: Props) {
    return (
        <section className="rounded-3xl border p-8">
            <h2 className="mb-6 text-2xl font-semibold">About the Event</h2>

            <p className="leading-8 text-gray-700">{description}</p>
        </section>
    );
}
