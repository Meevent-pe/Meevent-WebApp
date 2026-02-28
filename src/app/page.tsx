import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { MeeventLogo } from "@/components/MeeventLogo";
import { EarlyAccessButton } from "@/components/ui/EarlyAccessButton";
import { UserList } from "@/components/UserList";
import { FeaturesSection } from "@/components/views/landing-page/FeaturesSection";
import { FooterSection } from "@/components/views/landing-page/FooterSection";
import { db } from "@/lib/firebaseAdmin";

export default async function Home() {
    const totalLeads = db
        ? ((await db.collection("stats").doc("leadsCounter").get()).data()
              ?.total ?? 0)
        : 0;
    return (
        <main>
            <section
                className="
                px-3.75 bg-linear-to-t from-[#AB2037] from-0% to-meevent-primary to-40% 
                xl:w-full xl:bg-[url('/foto-hero-2_1.png')] xl:bg-cover xl:bg-no-repeat xl:bg-center xl:flex xl:flex-col xl:py-11 xl:items-center
            "
            >
                <header
                    className="
                    flex justify-between items-center py-4
                    xl:w-269
                "
                >
                    <MeeventLogo className="text-white w-25" />
                    <EarlyAccessButton variant="header" type="submit" className="hidden" />
                </header>

                <div className="py-10 flex flex-col gap-10 xl:w-269 xl">
                    <div>
                        <h1
                            className="
                        font-semibold text-white text-[32px]/10 text-center 
                        xl:text-[44px]/14 xl:text-start xl:w-207
                        "
                        >
                            No vuelvas a desperdiciar un fin de semana en un mal{" "}
                            <span className="font-black inline-block relative">
                                evento
                                <span className="absolute left-0 -bottom-3 w-full h-3 bg-[url('/vector_1.svg')] bg-no-repeat bg-contain" />
                            </span>
                        </h1>
                        <h2 className="sr-only">
                            Plataforma para descubrir eventos confiables con
                            reseñas reales en Perú
                        </h2>
                        <p
                            className="
                        font-medium text-center text-white text-[18px] mt-10
                        xl:text-[24px] xl:text-start xl:w-170
                        "
                        >
                            Encuentra los mejores planes con la seguridad de
                            reseñas reales y un ranking de organizadores que no
                            miente.
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
