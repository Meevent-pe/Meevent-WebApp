import { TicketSummaryCard } from "./ticket_summary";

export function EventSidebar() {
    return (
        <aside className="lg:col-span-4">
            <div className="sticky top-24">
                <TicketSummaryCard />
            </div>
        </aside>
    );
}
