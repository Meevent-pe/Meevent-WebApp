import { EarlyAccessForm } from "@/components/EarlyAccessForm"
import { UserList } from "@/components/UserList"
import Image from 'next/image';

export const FooterSection = ({ usersCount }: { usersCount: number }) => {
    return (

        <div className="px-4 pt-10 pb-5 relative flex justify-center xl:pb-0">

            <div className="bg-footer-banner relative bg-cover bg-center bg-no-repeat px-6 py-13 rounded-[36px] z-20 flex flex-col gap-6 xl:w-272 xl:items-center xl:rounded-b-none xl:pt-14 xl:pb-22">
                <div className="flex flex-col gap-6 xl:max-w-175">
                    <h3 className="text-[24px] font-bold text-white relative text-center xl:text-4xl">
                        ¿Quieres que tu próximo evento valga cada sol?
                    </h3>
                    <p className="text-white text-base font-medium text-center xl:text-[18px]">
                        Únete a la lista de espera. Te avisamos dónde está la verdadera fiesta y quiénes son los organizadores que sí cumplen lo que prometen.
                    </p>
                </div>
                <div className="relative z-10 xl:flex xl:flex-col xl:items-center">
                    <EarlyAccessForm />
                    <UserList usersCount={usersCount} />
                </div>
            </div >

            {/* UI */}
            <div className="absolute z-40 right-0 -top-4 xl:top-15">
                <Image src={'/ui/hand.png'} width={146} height={200} alt="hand" className="xl:w-78" />
            </div>

            <div className="absolute z-40 right-8 -top-2 xl:top-15 xl:right-12">
                <Image src={'/ui/lightning.svg'} width={18} height={32} alt="hand" className="xl:w-11"/>
            </div>

            <div className="absolute z-10 bottom-0">
                <Image src="/ui/vectors_bg_footer.svg" width={400} height={400} alt="vector" className="w-full"/>
            </div>
        </div>
    )
}
