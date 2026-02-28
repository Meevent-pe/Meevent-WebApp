"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const DEFAULT_WORDS = ["evento", "taller", "concierto", "feria", "curso"];

export default function AnimatedRotatingWords({
    words = DEFAULT_WORDS,
    intervalMs = 2500,
}: AnimatedRotatingWordsProps) {
    const safeWords = useMemo(() => {
        return Array.isArray(words) && words.length > 0 ? words : DEFAULT_WORDS;
    }, [words]);

    const [index, setIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIndex(0);
    }, [safeWords]);

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

    const currentWord = safeWords[index];

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
                    className="absolute -bottom-3 left-0 h-3 w-full bg-[url('/vector_1.svg')] bg-size-[100%_100%] bg-no-repeat"
                />
            </motion.span>
        </span>
    );
}
