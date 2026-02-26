'use client'

import { useActionState } from "react"
import { registerEarlyAccess, FormState } from "@/actions/earlyAccess"
import { EarlyAccessButton } from "./ui/EarlyAccessButton"

const initialState: FormState = {
  success: false,
  message: "",
}

export const EarlyAccessForm = () => {
    const [state, formAction, isPending] = useActionState(
        registerEarlyAccess,
        initialState
    )

    return (
        <form 
            action={formAction}
            className="flex flex-col gap-4 mt-10 xl:mt-14"
        >
            <fieldset className="flex flex-col gap-4 xl:flex-row">
                <legend className="sr-only">Formulario de acceso anticipado</legend>

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="sr-only">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        required
                        disabled={isPending}
                        autoComplete="name"
                        className={`bg-white rounded-2xl w-full text-black p-4 xl:w-70 xl:px-6 outline-none border-2 transition-all ${
                            state.errors?.name ? 'border-red-500' : 'border-transparent focus:border-black'
                        }`}
                    />
                    {state.errors?.name && (
                        <span className="text-red-500 text-xs px-2">{state.errors.name[0]}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="sr-only">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Correo"
                        required
                        disabled={isPending}
                        autoComplete="email"
                        className={`bg-white rounded-2xl w-full text-black p-4 xl:w-70 xl:px-6 outline-none border-2 transition-all ${
                            state.errors?.email ? 'border-red-500' : 'border-transparent focus:border-black'
                        }`}
                    />
                    {state.errors?.email && (
                        <span className="text-red-500 text-xs px-2">{state.errors.email[0]}</span>
                    )}
                </div>

                <EarlyAccessButton 
                    variant="form" 
                    type="submit" 
                    disabled={isPending}
                />
            </fieldset>

            {state.message && (
                <p className={`text-sm font-semibold mt-2 ${state.success ? 'text-green-500' : 'text-white'}`}>
                    {state.message}
                </p>
            )}
        </form>
    )
}