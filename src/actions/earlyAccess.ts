"use server";

import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
    };
};

type FormErrors = NonNullable<FormState["errors"]>;

type ErrorWithCode = { code?: string | number };

export async function registerEarlyAccess(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.toLowerCase().trim();

    const errors: FormErrors = {};
    if (!name || name.length < 3) {
        errors.name = ["El nombre debe tener al menos 3 caracteres."];
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.email = ["Introduce un correo electrónico válido."];
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Revisa los campos del formulario.",
            errors,
        };
    }

    try {
        if (!db) {
            return { success: false, message: "Base de datos no disponible." };
        }

        const leadRef = db.collection("leads").doc(email);
        const counterRef = db.collection("stats").doc("leadsCounter");

        const batch = db.batch();

        batch.create(leadRef, {
            name,
            email,
            createdAt: FieldValue.serverTimestamp(),
        });

        batch.set(
            counterRef,
            {
                total: FieldValue.increment(1),
                lastUpdated: FieldValue.serverTimestamp(),
            },
            { merge: true }
        );

        await batch.commit();
        revalidatePath("/");
        return {
            success: true,
            message: "¡Registro exitoso! Te avisaremos pronto.",
        };
    } catch (error: unknown) {
        const code = hasCodeError(error) ? error.code : undefined;

        if (code === 6 || code === "already-exists") {
            return {
                success: false,
                message: "Este correo ya está registrado.",
            };
        }

        console.error("EarlyAccess Error:", error);

        return {
            success: false,
            message: "Error al registrar. Inténtalo más tarde.",
        };
    }
}

function hasCodeError(error: unknown): error is ErrorWithCode {
    return typeof error === "object" && error !== null && "code" in error;
}
