import { EarlyAccessForm } from "@/components/views/landing-page/EarlyAccessForm";
import Image from "next/image";
import { UserList } from "./UserList";

export const FooterSection = ({ usersCount }: { usersCount: number }) => {
    return (
        <section
            id="early-access-form-footer"
            className="relative flex justify-center px-4 pt-10 pb-5 xl:pb-0"
        >
            <div className="bg-footer-banner relative z-20 flex flex-col gap-6 rounded-[36px] bg-cover bg-center bg-no-repeat px-6 py-13 xl:w-272 xl:items-center xl:rounded-b-none xl:pt-14 xl:pb-22">
                <div className="flex flex-col gap-6 xl:max-w-175">
                    <h3 className="relative text-center text-[24px] font-bold text-white xl:text-4xl">
                        ¿Quieres que tu próximo evento valga cada céntimo?
                    </h3>
                    <p className="text-center text-base font-medium text-white xl:text-[18px]">
                        Únete a la lista de espera. Te avisamos dónde está la verdadera fiesta y
                        quiénes son los organizadores que sí cumplen lo que prometen.
                    </p>
                </div>
                <div className="relative z-10 xl:flex xl:flex-col xl:items-center">
                    <EarlyAccessForm />
                    <UserList usersCount={usersCount} />
                </div>
            </div>

            {/* UI */}
            <div className="absolute -top-4 right-0 z-40 xl:top-15">
                <Image
                    src={"/ui/hand.png"}
                    width={146}
                    height={200}
                    alt="hand"
                    className="xl:w-78"
                />
            </div>

            <div className="absolute -top-2 right-8 z-40 xl:top-15 xl:right-12">
                <Image
                    src={"/ui/lightning.svg"}
                    width={18}
                    height={32}
                    alt="hand"
                    className="xl:w-11"
                />
            </div>

            <div className="absolute right-0 bottom-0 left-0">
                <Image
                    src="/ui/vectors_bg_footer.svg"
                    width={400}
                    height={400}
                    alt="vector"
                    className="w-full xl:h-168"
                />
            </div>
        </section>
    );
};
