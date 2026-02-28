"use client";

import { useActionState, useState } from "react";
import { registerEarlyAccess, FormState } from "@/actions/earlyAccess";
import { EarlyAccessButton } from "../../ui/EarlyAccessButton";

const initialState: FormState = {
    success: false,
    message: "",
};

function validateName(value: string) {
    if (!value.trim()) return "Ingresa tu nombre";
    if (value.trim().length < 3) return "Debe tener al menos 3 caracteres";
    return "";
}

function validateEmail(value: string) {
    if (!value.trim()) return "Ingresa tu correo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Correo no válido";
    return "";
}

export const EarlyAccessForm = () => {
    const [state, formAction, isPending] = useActionState(registerEarlyAccess, initialState);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;

        const nErr = validateName(name);
        const eErr = validateEmail(email);

        setNameError(nErr);
        setEmailError(eErr);

        if (nErr === "Ingresa tu nombre") setTimeout(() => setNameError(""), 3000);
        if (eErr === "Ingresa tu correo") setTimeout(() => setEmailError(""), 3000);

        if (nErr || eErr) {
            e.preventDefault();
        }
    };

    const serverNameError = state.errors?.name?.[0];
    const serverEmailError = state.errors?.email?.[0];

    return (
        <form
            action={formAction}
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <fieldset className="flex flex-col gap-4 xl:flex-row xl:items-start">
                <legend className="sr-only">Formulario de acceso anticipado</legend>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="sr-only">
                        Nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        disabled={isPending}
                        autoComplete="name"
                        onChange={() => setNameError("")}
                        aria-describedby={nameError || serverNameError ? "name-error" : undefined}
                        className={`w-full rounded-2xl border-2 bg-white p-4 text-black transition-all outline-none xl:w-70 xl:px-6 ${
                            nameError || serverNameError
                                ? "border-red-400"
                                : "border-transparent focus:border-black"
                        }`}
                    />
                    <p
                        id="name-error"
                        role="alert"
                        className="flex h-2 items-center gap-1 px-2 text-sm font-medium text-white/90"
                    >
                        {(nameError || serverNameError) && (
                            <>
                                <span aria-hidden>⚠</span> {nameError || serverNameError}
                            </>
                        )}
                    </p>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="sr-only">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Correo"
                        disabled={isPending}
                        autoComplete="email"
                        onChange={() => setEmailError("")}
                        aria-describedby={
                            emailError || serverEmailError ? "email-error" : undefined
                        }
                        className={`w-full rounded-2xl border-2 bg-white p-4 text-black transition-all outline-none xl:w-70 xl:px-6 ${
                            emailError || serverEmailError
                                ? "border-red-400"
                                : "border-transparent focus:border-black"
                        }`}
                    />
                    <p
                        id="email-error"
                        role="alert"
                        className="flex h-2 items-center gap-1 px-2 text-sm font-medium text-white/90"
                    >
                        {(emailError || serverEmailError) && (
                            <>
                                <span aria-hidden>⚠</span> {emailError || serverEmailError}
                            </>
                        )}
                    </p>
                </div>

                <div className="flex flex-col gap-1.5 xl:self-start">
                    <EarlyAccessButton variant="form" type="submit" disabled={isPending} />
                    <p
                        role="status"
                        className={`flex h-3 items-center gap-1 px-2 text-sm font-medium ${state.success ? "text-green-300" : "text-white/90"}`}
                    >
                        {state.message && !state.errors && !nameError && !emailError && (
                            <>
                                <span aria-hidden>{state.success ? "✓" : "⚠"}</span> {state.message}
                            </>
                        )}
                    </p>
                </div>
            </fieldset>
        </form>
    );
};
