"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Transition } from "motion/react";

const springTransition: Transition = {
    type: "spring",
    stiffness: 450,
    damping: 35,
    mass: 1,
};

interface AnimatedRotatingWordsProps {
    words?: string[];
    intervalMs?: number;
}

const DEFAULT_WORDS = ["evento", "taller", "concierto", "curso"];

export default function AnimatedRotatingWords({
    words = DEFAULT_WORDS,
    intervalMs = 1500,
}: AnimatedRotatingWordsProps) {
    const safeWords = words.length > 0 ? words : DEFAULT_WORDS;

    const [index, setIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (safeWords.length <= 1) return;

        const tick = () => {
            setIndex((prev) => (prev + 1) % safeWords.length);
        };

        const start = () => {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(tick, intervalMs);
            }
        };

        const stop = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const handleVisibility = () => {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        };

        start();
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            stop();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [safeWords, intervalMs]);

    const currentWord = safeWords[index % safeWords.length];

    return (
        <span className="relative inline-block align-bottom font-black">
            <span className="sr-only">{currentWord}</span>

            <motion.span
                layout
                transition={springTransition}
                aria-hidden="true"
                className="relative inline-flex flex-col items-center justify-center"
            >
                <motion.span
                    layout
                    transition={springTransition}
                    className="relative inline-flex overflow-hidden"
                >
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={currentWord}
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-100%" }}
                            transition={springTransition}
                            className="inline-block whitespace-nowrap"
                        >
                            {currentWord}
                        </motion.span>
                    </AnimatePresence>
                </motion.span>

                <motion.span
                    layout
                    transition={springTransition}
                    className="absolute -bottom-3 left-0 h-3 w-full bg-[url('/ui/vector_1.svg')] bg-size-[100%_100%] bg-no-repeat"
                />
            </motion.span>
        </span>
    );
}
