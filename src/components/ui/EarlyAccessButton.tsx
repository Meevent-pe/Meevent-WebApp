type EarlyAccessButtonProps = {
  variant?: "header" | "form"
  type?: "button" | "submit"
  className?: string
  disabled?: boolean
}

export const EarlyAccessButton = ({
  variant = "header",
  type = "button",
  className = "",
  disabled = false,
}: EarlyAccessButtonProps) => {
  const base = "bg-black font-bold text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    header: "py-3.5 px-10 text-[14px] xl:text-[18px] xl:px-16",
    form: "w-full py-4 text-xl xl:w-auto xl:text-[18px] xl:px-15",
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label="Solicitar acceso anticipado a Meevent"
      className={`${base} ${variants[variant]} ${className}`}
    >
      {disabled ? "Enviando..." : "Acceso anticipado"}
    </button>
  )
}