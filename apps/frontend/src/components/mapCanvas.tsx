import { useRef, useEffect } from 'react';
import axios from "axios";

type mapCanvasProps = {
    image
}

export function MapCanvas(props: mapCanvasProps) {
    const canvasRef = useRef(null);
    let xLoc: number; // Test x-coordinate for learning to use database
    axios.get("/api/map").then((res) => {
        xLoc = res.data.nodes[17].xcoord; // after data. format is array[desiredIndex].property
    });

    // Create a line on the page at the specified position
    function drawLine(startX: number, startY: number, endX: number, endY: number) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
    }

    useEffect(() => {
        const image = new Image();
        image.src = props.image;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        image.onload = () => {
            context.drawImage(image, 0, 0, 5000, 3400); // Change parameters to zoom in and pan around the image
            drawLine(xLoc, 1070, 2770, 1270);
        };
    } );


    return (
        <>
        <canvas ref={canvasRef} width={5000} height={3400} />
        </>
    );
}

export default MapCanvas;
