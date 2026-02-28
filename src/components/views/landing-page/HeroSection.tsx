import { EarlyAccessButton } from "@/components/ui/EarlyAccessButton";
import { MeeventLogo } from "@/components/ui/MeeventLogo";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { UserList } from "./UserList";
import AnimatedRotatingWords from "@/components/ui/AnimatedRotatingWords";

export const HeroSection = ({ usersCount }: { usersCount: number }) => {
    return (
        <section className="to-meevent-primary bg-linear-to-t from-[#AB2037] from-0% to-40% px-3.75 xl:flex xl:w-full xl:flex-col xl:items-center xl:bg-[url('/foto-hero-2_1.png')] xl:bg-cover xl:bg-center xl:bg-no-repeat xl:py-11">
            <header className="flex items-center justify-between py-4 xl:w-269">
                <MeeventLogo className="m-auto w-35 text-white xl:m-0" />
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
                        Encuentra los mejores planes con la seguridad de reseñas reales y un ranking
                        de organizadores que no miente.
                    </p>
                </div>
                <div>
                    <EarlyAccessForm />
                    <UserList usersCount={usersCount} />
                </div>
            </div>
        </section>
    );
};
