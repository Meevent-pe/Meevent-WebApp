export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // Fondo gris claro para toda la pantalla
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
        {children}
      </div>
    </div>
  );
}