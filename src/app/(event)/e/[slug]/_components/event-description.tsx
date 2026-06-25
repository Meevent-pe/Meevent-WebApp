import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Info } from "lucide-react";

interface Props {
    description: string;
}

export function EventDescription({ description }: Props) {
    return (
        <section className="rounded-3xl border px-6 py-2">
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h2 className="flex items-center text-xl font-semibold">
                            <Info size={20} />
                            <span className="ml-2">About the Event</span>
                        </h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-gray-700">{description}</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}
