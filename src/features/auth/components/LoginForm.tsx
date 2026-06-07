"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/features/auth/schemas/authSchema";

export const LoginForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Iniciando sesión con:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Logo Placeholder - Asegúrate de poner tu imagen aquí */}
      <div className="flex justify-center mb-8">
        <img src="../Header/meevent_logo.png" alt="Meevent" className="h-8" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bienvenido</h2>
        <p className="text-gray-500 text-sm mt-2">Inicia sesión en tu cuenta para continuar.</p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">EMAIL O USUARIO</label>
        <div className="relative">
          <input {...register("email")} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all" placeholder="nombre@ejemplo.com" />
        </div>
        {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
      </div>

      {/* Contraseña */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">CONTRASEÑA</label>
          <a href="/forgot-password" className="text-xs text-red-600 font-bold hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
        <input type="password" {...register("password")} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all" placeholder="••••••••" />
        {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
      </div>

      {/* Botón Iniciar Sesión */}
      <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all shadow-md mt-4">
        {isSubmitting ? "ENTRANDO..." : "Iniciar Sesión →"}
      </button>

      {/* Divisor */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">o continúa con</span></div>
      </div>

      {/* Botón Google */}
      <button type="button" className="w-full py-3.5 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
        <img src="../Footer/GoogleIcon.png" alt="Google" className="w-5 h-5" /> Google
      </button>

      <div className="text-center text-xs text-gray-500 mt-6">
        ¿No tienes una cuenta? <a href="/register" className="text-red-600 font-bold hover:underline">Regístrate</a>
      </div>
    </form>
  );
};