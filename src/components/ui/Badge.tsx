interface BadgeProps {
    children: React.ReactNode;
    className?: string; // Para permitir el color rosado específico de Meevent
}

export const Badge = ({ children, className }: BadgeProps) => (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${className}`}>
        {children}
    </span>
);