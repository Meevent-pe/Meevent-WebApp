"use server";

import { cookies } from "next/headers";
import { RegisterFormValues } from "../../features/auth/schemas/authSchema";

export const registerUser = async (data: RegisterFormValues) => {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) return { error: "Error en el registro" };

    const { token } = await response.json();

    const cookieStore = await cookies(); 
    
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true };
 } catch (error) {
    console.error("Error de red:", error);
    return { error: "No se pudo conectar con el servidor" };
  }
};