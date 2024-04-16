import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from "react";
// import {Box} from "@mui/material";

type AnimatedPathProps = {
    svgPath: string;
};

export default function AnimatedPath(props: AnimatedPathProps) {
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
        requestAnimationFrame(animatePath);
    }, [controls]);

    return (
        <>
            {/* Static Path */}
            <motion.path
                d={props.svgPath}
                strokeWidth={3} // Adjust the stroke width as needed
                stroke={"gray"} // Adjust the color as needed
                fill="none"
                strokeLinejoin={"round"}
                strokeLinecap={"round"}
            />
            {/* Animated Path */}
            <motion.path
                d={props.svgPath}
                strokeWidth={1}
                stroke={"black"}
                fill="none"
                initial={{ strokeDasharray: "20 10", strokeDashoffset: 1000 }} // Adjust the strokeDasharray for longer lines
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
        </>
    );
}
