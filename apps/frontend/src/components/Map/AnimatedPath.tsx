import { motion} from 'framer-motion';
import React from "react";
// import {Box} from "@mui/material";

type AnimatedPathProps = {
    svgPath: string;
};

export default function AnimatedPath(props: AnimatedPathProps) {

    return (
        <>
            {/* Static Path */}
            <motion.path
                d={props.svgPath}
                strokeWidth={3} // Adjust the stroke width as needed
                stroke={"#f6bd38"} // Adjust the color as needed
                fill="none"
                strokeLinejoin={"round"}
                strokeLinecap={"round"}
                style={{
                  filter: "drop-shadow(1px 1px 2px #000)"
                }}
            />
            {/* Animated Path */}
            <motion.path
                d={props.svgPath}
                strokeWidth={1}
                stroke={"#012d5a"}
                fill="none"
                strokeLinecap={"round"}
                initial={{
                  strokeDasharray: "3",
                  strokeDashoffset: 0
                }} // Adjust the strokeDasharray for longer lines
                animate={{
                  strokeDashoffset: 6,
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity
                }}
            />
        </>
    );
}
