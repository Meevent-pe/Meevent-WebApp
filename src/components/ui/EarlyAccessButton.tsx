type EarlyAccessButtonProps = {
  variant?: "header" | "form"
  type?: "button" | "submit"
  className?: string
}

export const EarlyAccessButton = ({
  variant = "header",
  type = "button",
  className = "",
}: EarlyAccessButtonProps) => {
  const base = "bg-black font-bold text-white rounded-full"

  const variants = {
    header: "py-3.5 px-10 text-[14px] xl:text-[18px] xl:px-16",
    form: "w-full py-4 text-xl xl:w-auto xl:text-[18px] xl:px-15",
  }

  return (
    <button
      type={type}
      aria-label="Solicitar acceso anticipado a Meevent"
      className={`${base} ${variants[variant]} ${className}`}
    >
      Acceso anticipado
    </button>
  )
}