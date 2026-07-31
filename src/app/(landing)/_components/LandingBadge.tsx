interface LandingBadgeProps {
    children: React.ReactNode;
    className?: string;
}

export const LandingBadge = ({ children, className }: LandingBadgeProps) => (
    <span
        className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03] hover:shadow-md ${className}`}
    >
        {children}
    </span>
);
