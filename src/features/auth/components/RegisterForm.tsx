"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/features/auth/schemas/authSchema";
import { registerUser } from "../../../shared/services/auth-service";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
const navigation = useRouter(); 

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await registerUser(data);

    if (result.success) {
      // 3. AQUÍ ESTABA EL ERROR: Debes usar el mismo nombre que definiste en la línea 12
      navigation.push("/organizer/onboarding"); 
    } else {
      alert(result.error);
    }
  };
      return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-center mb-8">
        <img src="../Header/meevent_logo.png" alt="Meevent" className="h-8" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Crear cuenta</h2>
        <p className="text-gray-500 text-sm mt-2">Únete a Meevent hoy mismo.</p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">CORREO ELECTRÓNICO</label>
        <input {...register("email")} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all" placeholder="nombre@ejemplo.com" />
        {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">CONTRASEÑA</label>
        <input type="password" {...register("password")} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all" placeholder="••••••••" />
        {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
      </div>

      {/* Confirmar Contraseña */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">CONFIRMAR CONTRASEÑA</label>
        <input type="password" {...register("confirmPassword")} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all" placeholder="••••••••" />
        {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1">{errors.confirmPassword.message}</p>}
      </div>

      {/* Botón Registrarse */}
      <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all shadow-md mt-4">
        {isSubmitting ? "REGISTRANDO..." : "Registrarse →"}
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
        ¿Ya tienes una cuenta? <a href="/login" className="text-red-600 font-bold hover:underline">Iniciar Sesión</a>
      </div>
    </form>
  );
};