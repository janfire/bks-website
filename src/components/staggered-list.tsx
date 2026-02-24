"use client";

import { motion } from "framer-motion";
import React from "react";

interface StaggeredListProps {
    children: React.ReactNode;
    className?: string;
    staggerDuration?: number;
}

export const StaggeredList = ({
    children,
    className,
    staggerDuration = 0.1,
}: StaggeredListProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDuration,
                    },
                },
            }}
            className={className}
        >
            {React.Children.map(children, (child) => (
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};
