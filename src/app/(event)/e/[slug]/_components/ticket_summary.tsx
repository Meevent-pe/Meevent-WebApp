export function TicketSummaryCard() {
    return (
        <div className="bg-card rounded-3xl border p-8 shadow-sm">
            <div className="mb-8">
                <p className="text-muted-foreground text-sm">Starting from</p>
                <p className="text-4xl font-bold">S/ 99</p>
            </div>

            <button className="bg-primary text-primary-foreground w-full rounded-xl px-4 py-3 font-semibold">
                Get Tickets
            </button>
        </div>
    );
}
