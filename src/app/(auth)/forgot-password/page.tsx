"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/features/auth/schemas/authSchema';

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log("Enviando correo de recuperación a:", data.email);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6 w-full max-w-sm mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h2>
            <p className="text-sm text-gray-500 mt-2">Te enviaremos un enlace para restablecerla</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              {...register("email")}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="ejemplo@correo.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600 font-medium">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>
      </div>
    </main>
  );
}