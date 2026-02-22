import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { MeeventLogo } from "@/components/MeeventLogo";
import { UserList } from "@/components/UserList";

export default function Home() {
    return (
        <main className="px-3.75 xl:flex xl:flex-col xl:px-42 xl:py-11 bg-linear-to-t from-[#AB2037] from-0% to-meevent-primary to-40% xl:bg-[url('/foto-hero-2_1.png')] xl:bg-cover xl:bg-no-repeat xl:bg-center">
            <header className="flex justify-between items-center py-4">
                <MeeventLogo className="text-white w-25"/>
                <button aria-label="Solicitar acceso anticipado a Meevent" className="bg-black py-3.5 px-10 font-bold text-white text-[14px] xl:text-[18px] xl:px-16 rounded-full">Acceso anticipado</button>
            </header>
            <section className="py-10 xl:w-217">
                <h1 className="font-semibold text-white text-[32px]/10 text-center xl:text-[44px]/14 xl:text-start xl:w-207">No vuelvas a desperdiciar un fin de semana en un mal{" "}
                    <span className="font-black inline-block relative">evento
                        <span className="absolute left-0 -bottom-3 w-full h-3 bg-[url('/vector_1.svg')] bg-no-repeat bg-contain" />
                    </span>
                </h1>
                <h2 className="sr-only">
                    Plataforma para descubrir eventos confiables con reseñas reales en Perú
                </h2>
                <p className="font-medium text-center text-white text-[18px] mt-10 xl:text-[24px] xl:text-start  xl:w-160">Encuentra los mejores planes con la seguridad de reseñas reales y un ranking de organizadores que no miente. </p>

                <EarlyAccessForm />

                <UserList />

            </section>
        </main>
    );
}


