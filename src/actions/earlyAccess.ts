'use server';

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

export async function registerEarlyAccess(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string)?.toLowerCase().trim();

  const errors: any = {};
  if (!name || name.trim().length < 3) {
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
    const leadRef = db.collection("leads").doc(email);
    const docSnapshot = await leadRef.get();

    if (docSnapshot.exists) {
      return {
        success: false,
        message: "Este correo ya está registrado en nuestra lista de espera.",
      };
    }

    const batch = db.batch();
    const counterRef = db.collection("stats").doc("leadsCounter");

    batch.set(leadRef, {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      createdAt: FieldValue.serverTimestamp(),
    });

    batch.update(counterRef, {
      total: FieldValue.increment(1),
      lastUpdated: FieldValue.serverTimestamp(),
    });

    await batch.commit();
    revalidatePath("/");
    return {
      success: true,
      message: "¡Registro exitoso! Te avisaremos pronto.",
    };
  } catch (error: any) {
    console.error("Error en el registro de Early Access");

    return {
      success: false,
      message: "Error al momento de registrar.",
    };
  }
}
