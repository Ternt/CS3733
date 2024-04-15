import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from "react";

type AnimatedPathProps = {
    svgPath: string,
}

export default function AnimatedPath({ props:  }) {
    const controls = useAnimation();

    useEffect(() => {
        const animatePath = async () => {
            await controls.start({
                strokeDashoffset: -1000, // Adjust this value for longer lines
                transition: {
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                }
            });
        };
        animatePath();
    }, [controls]);

    return (
        <motion.svg
            style={{ width: "80%", height: "80%" }}
            viewBox="0 0 480 480"
        >
            {/* Static Path */}
            <motion.path
                d={svgPath}
                strokeWidth={8} // Adjust the stroke width as needed
                stroke={"gray"} // Adjust the color as needed
                fill="none"
            />
            {/* Animated Path */}
            <motion.path
                d={svgPath}
                strokeWidth={4}
                stroke={"black"}
                fill="none"
                initial={{ strokeDasharray: "20 10", strokeDashoffset: 1000 }} // Adjust the strokeDasharray for longer lines
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
        </motion.svg>
    );
}
