import { db } from "@/shared/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

import { FeaturesSection } from "@/app/(landing)/_components/FeaturesSection";
import { FooterSection } from "@/app/(landing)/_components/FooterSection";
import { HeroSection } from "@/app/(landing)/_components/HeroSection";
import { Navbar } from "@/app/(landing)/_components/Navbar";

export default async function Home() {
    const totalLeads = db
        ? ((await db.collection("stats").doc("leadsCounter").get()).data()?.total ?? 0)
        : 0;
    return (
        <main>
            <Navbar />
            <HeroSection usersCount={totalLeads} />
            <FeaturesSection />
            <FooterSection usersCount={totalLeads} />
        </main>
    );
}
