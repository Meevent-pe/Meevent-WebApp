"use client";
import {CldImage} from 'next-cloudinary';

export default function Login() {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      <div className="w-full lg:w-2/5 bg-blue-800 flex justify-center items-center px-4">
        <div className="bg-blue-400 shadow-2xl flex flex-col rounded-2xl w-full max-w-md p-8 gap-6">
          <div className="text-center">
            <h1 className="font-black font-mono text-5xl">MeEvent</h1>
          </div>
          <form className="space-y-4">
            <h3 className="pb-2 text-xl font-bold">Iniciar Sesión</h3>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Correo Electronico
              </label>
              <input
                id="email"
                className="w-full bg-blue-50 rounded-lg p-1 text-base focus:outline-none text-cyan-950"
                required
                type="email"
                placeholder=""
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className=" font-semibold">Contraseña</label>
              <input
                id="password"
                className="w-full bg-blue-50 rounded-lg p-2 focus:outline-none text-cyan-950"
                required
                type="password"
                placeholder=""
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="items-center flex">
                <input title='check' id="recordarme" type="checkbox" className="m-2" />
                <label className="text-sm font-medium">Recordarme</label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm underline mt-5 hover:text-blue-950"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <button className="w-full font-semibold bg-blue-950 rounded-md h-10 mt-5 hover:bg-blue-600">
              Iniciar Sesión
            </button>
            <div className="flex justify-center gap-1">
                <span className="text-sm">¿No tienes una cuenta?</span>
                <a href="#" className="text-sm underline hover:text-blue-950">
                  Regístrate
                </a>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex w-3/5 relative overflow-hidden bg-blue-400">
        <img src="/img/pexels-cottonbro-5076515.jpg" alt="Login Image" className="object-cover w-full h-full brightness-75"/>
      </div>
    </div>
  );
}
