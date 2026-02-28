import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { MeeventLogo } from "@/components/MeeventLogo";
import AnimatedRotatingWords from "@/components/ui/AnimatedRotatingWords";
import { EarlyAccessButton } from "@/components/ui/EarlyAccessButton";
import { UserList } from "@/components/UserList";
import { FeaturesSection } from "@/components/views/landing-page/FeaturesSection";
import { FooterSection } from "@/components/views/landing-page/FooterSection";
import { db } from "@/lib/firebaseAdmin";

export default async function Home() {
    const totalLeads = db
        ? ((await db.collection("stats").doc("leadsCounter").get()).data()?.total ?? 0)
        : 0;
    return (
        <main>
            <section className="to-meevent-primary bg-linear-to-t from-[#AB2037] from-0% to-40% px-3.75 xl:flex xl:w-full xl:flex-col xl:items-center xl:bg-[url('/foto-hero-2_1.png')] xl:bg-cover xl:bg-center xl:bg-no-repeat xl:py-11">
                <header className="flex items-center justify-between py-4 xl:w-269">
                    <MeeventLogo className="w-25 text-white" />
                    <EarlyAccessButton variant="header" type="submit" className="hidden" />
                </header>

                <div className="flex flex-col gap-10 py-10 xl:w-269">
                    <div>
                        <h1 className="text-center text-[32px]/10 font-semibold text-white xl:w-207 xl:text-start xl:text-[44px]/14">
                            No vuelvas a desperdiciar un fin de semana en un mal{" "}
                            <AnimatedRotatingWords />
                        </h1>
                        <h2 className="sr-only">
                            Plataforma para descubrir eventos confiables con reseñas reales en Perú
                        </h2>
                        <p className="mt-10 text-center text-[18px] font-medium text-white xl:w-170 xl:text-start xl:text-[24px]">
                            Encuentra los mejores planes con la seguridad de reseñas reales y un
                            ranking de organizadores que no miente.
                        </p>
                    </div>
                    <div>
                        <EarlyAccessForm />
                        <UserList usersCount={totalLeads} />
                    </div>
                </div>
            </section>

            <FeaturesSection />

            <FooterSection usersCount={totalLeads} />
        </main>
    );
}
