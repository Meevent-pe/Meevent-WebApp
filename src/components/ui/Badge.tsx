interface BadgeProps {
    children: React.ReactNode;
    className?: string; // Para permitir el color rosado específico de Meevent
}

export const Badge = ({ children, className }: BadgeProps) => (
    <span
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium hover:scale-[1.03] hover:shadow-md transition-all duration-200 cursor-pointer ${className}`}
    >
        {children}
    </span>
);
