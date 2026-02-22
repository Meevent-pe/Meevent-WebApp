'use client'

export const EarlyAccessForm = () => {
    return (
        <form className="flex flex-col gap-4 mt-10 xl:mt-14" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="flex flex-col gap-4 xl:flex-row">
                <legend className="sr-only">Formulario de acceso anticipado</legend>

                <div className="flex flex-col">
                    <label htmlFor="name" className="sr-only">
                        Nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        required
                        autoComplete="name"
                        className="bg-white rounded-2xl w-full text-black p-4 xl:w-70 xl:px-6"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="sr-only">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Correo"
                        required
                        autoComplete="email"
                        className="bg-white rounded-2xl w-full text-black p-4 xl:w-70 xl:px-6"
                    />
                </div>

                <button
                    type="submit"
                    aria-label="Solicitar acceso anticipado a Meevent"
                    className="bg-black w-full py-4 font-bold text-white text-xl rounded-full xl:px-15 xl:text-[18px] xl:w-auto"
                >
                    Acceso anticipado
                </button>
            </fieldset>
        </form>
    )
}
