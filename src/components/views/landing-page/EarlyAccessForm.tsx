"use client";

import { useActionState, useEffect, useState } from "react";
import { registerEarlyAccess, FormState } from "@/actions/earlyAccess";
import { EarlyAccessButton } from "../../ui/EarlyAccessButton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

    useEffect(() => {
        if (state.success) {
            toast.custom(
                (t) => (
                    <div className="flex w-full items-center justify-center gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl xl:max-w-300 xl:px-10">
                        <div className="border-meevent-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4">
                            <svg
                                className="text-meevent-primary h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>

                        <p className="w-full text-start text-[18px] leading-[1.1] font-bold tracking-tight text-black">
                            Felicidades, ya estás registrado
                        </p>
                    </div>
                ),
                {
                    duration: 3000,
                    position: "top-center",
                    className: "xl:!w-[400px]",
                }
            );
        }
    }, [state.success]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;

        const nErr = validateName(name);
        const eErr = validateEmail(email);

        setNameError(nErr);
        setEmailError(eErr);

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
            <fieldset className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
                <legend className="sr-only">Formulario de acceso anticipado</legend>

                {/* NOMBRE */}
                <div className="relative flex flex-col gap-1.5 pb-6">
                    <label htmlFor="name" className="sr-only">
                        Nombre
                    </label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        disabled={isPending}
                        autoComplete="name"
                        onChange={() => setNameError("")}
                        className={`h-auto w-full rounded-2xl border-2 bg-white p-4 text-black transition-all outline-none xl:w-60 xl:px-6 ${
                            nameError || serverNameError
                                ? "border-red-600 focus-visible:ring-red-400"
                                : "focus-visible:ring-meevent-primary border-transparent focus-visible:ring-1"
                        }`}
                    />
                    <p className="absolute bottom-1 left-2 flex items-center gap-1 text-[12px] font-medium text-white/90">
                        {(nameError || serverNameError) && (
                            <>
                                <span>⚠</span> {nameError || serverNameError}
                            </>
                        )}
                    </p>
                </div>

                {/* EMAIL */}
                <div className="relative flex flex-col gap-1.5 pb-6">
                    <label htmlFor="email" className="sr-only">
                        Correo electrónico
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Correo"
                        disabled={isPending}
                        autoComplete="email"
                        onChange={() => setEmailError("")}
                        className={`h-auto w-full rounded-2xl border-2 bg-white p-4 text-black transition-all outline-none xl:w-80 xl:px-6 ${
                            emailError || serverEmailError
                                ? "border-red-600 focus-visible:ring-red-400"
                                : "focus-visible:ring-meevent-primary border-transparent focus-visible:ring-1"
                        }`}
                    />
                    <p className="absolute bottom-1 left-2 flex items-center gap-1 text-[12px] font-medium text-white/90">
                        {(emailError || serverEmailError) && (
                            <>
                                <span>⚠</span> {emailError || serverEmailError}
                            </>
                        )}
                    </p>
                </div>

                <div className="relative flex flex-col gap-1.5 xl:self-start">
                    <EarlyAccessButton variant="form" type="submit" disabled={isPending} />
                </div>
            </fieldset>
        </form>
    );
};
