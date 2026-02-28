"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MeeventLogo } from "@/components/ui/MeeventLogo";
import { EarlyAccessButton } from "@/components/ui/EarlyAccessButton";

// Usamos la misma transición que tu amigo para mantener la consistencia visual
const springTransition = {
    type: "spring",
    stiffness: 450,
    damping: 35,
    mass: 1,
};

export const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={springTransition}
                    className="fixed top-0 left-0 z-50 w-full border-b border-[#750013]/5 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-md"
                >
                    <div className="mx-auto flex max-w-272 items-center justify-between xl:w-full">
                        <MeeventLogo className="text-meevent-primary w-24" />
                        <a href="#early-access-form-footer">
                            <EarlyAccessButton className="scale-90" />
                        </a>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};
