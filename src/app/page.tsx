import { db } from "@/lib/firebaseAdmin";

import { FeaturesSection } from "@/components/views/landing-page/FeaturesSection";
import { FooterSection } from "@/components/views/landing-page/FooterSection";
import { HeroSection } from "@/components/views/landing-page/HeroSection";

export default async function Home() {
    const totalLeads = db
        ? ((await db.collection("stats").doc("leadsCounter").get()).data()?.total ?? 0)
        : 0;
    return (
        <main>
            <HeroSection usersCount={totalLeads} />
            <FeaturesSection />
            <FooterSection usersCount={totalLeads} />
        </main>
    );
}
